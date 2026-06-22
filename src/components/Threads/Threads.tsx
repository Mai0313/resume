import { useEffect, useRef, type HTMLAttributes } from "react";
import { Renderer, Program, Mesh, Triangle, Color } from "ogl";

type ThreadsProps = Omit<HTMLAttributes<HTMLDivElement>, "color"> & {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
};

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 20;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

// Defer non-critical work to idle time, falling back to setTimeout on browsers
// (e.g. older Safari) that lack requestIdleCallback.
function requestIdle(cb: () => void): number {
  const w = window as IdleWindow;

  return typeof w.requestIdleCallback === "function"
    ? w.requestIdleCallback(cb, { timeout: 2000 })
    : window.setTimeout(cb, 200);
}

function cancelIdle(handle: number): void {
  const w = window as IdleWindow;

  if (typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(handle);
  else window.clearTimeout(handle);
}

export default function Threads({
  color = [1, 1, 1],
  amplitude = 1,
  distance = 0,
  className = "",
  ...rest
}: ThreadsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Cap the backing-store resolution: the fragment shader cost scales with
    // pixel count, and this is a faint ambient backdrop, so a low dpr is
    // visually indistinguishable but far cheaper on the GPU.
    const dpr = Math.min(window.devicePixelRatio || 1, 1);

    // WebGL can be unavailable (blocked, GPU blocklisted, context limit). Bail
    // gracefully so the static gradient backdrop stands in instead of crashing
    // the whole page.
    let renderer: Renderer;

    try {
      renderer = new Renderer({ alpha: true, dpr });
    } catch {
      return;
    }
    const gl = renderer.gl;

    if (!gl) return;

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height,
          ),
        },
        uColor: { value: new Color(color[0], color[1], color[2]) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    // Respect prefers-reduced-motion: draw a single static frame instead of
    // running the animation loop.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ~30fps is plenty for an ambient backdrop and halves the per-second cost
    // versus 60fps.
    const frameInterval = 1000 / 30;
    let lastRenderTime = 0;
    let running = false;
    // The loop only runs once it is idle-started AND visible AND on-screen.
    let idleReady = false;
    let isIntersecting = false;

    const resize = () => {
      const { clientWidth, clientHeight } = container;

      renderer.setSize(clientWidth, clientHeight);
      program.uniforms.iResolution.value.r = clientWidth;
      program.uniforms.iResolution.value.g = clientHeight;
      program.uniforms.iResolution.value.b = clientWidth / clientHeight;

      // Nothing repaints automatically while the loop is paused (or under
      // reduced motion), so render a frame here to keep the canvas in sync.
      if (!running || prefersReducedMotion) {
        renderer.render({ scene: mesh });
      }
    };

    const update = (t: number) => {
      if (!running) return;
      animationFrameId.current = requestAnimationFrame(update);

      if (t - lastRenderTime < frameInterval) return;
      lastRenderTime = t;
      program.uniforms.iTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };

    const start = () => {
      if (running || prefersReducedMotion) return;
      if (!idleReady || document.hidden || !isIntersecting) return;
      running = true;
      lastRenderTime = 0;
      animationFrameId.current = requestAnimationFrame(update);
    };

    const stop = () => {
      running = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = undefined;
      }
    };

    window.addEventListener("resize", resize);
    resize();

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    document.addEventListener("visibilitychange", onVisibility);

    // Pause the loop while the hero is scrolled out of view, resume on return.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) start();
        else stop();
      },
      { threshold: 0 },
    );

    observer.observe(container);

    // Defer the first start until idle so it never competes with FCP/LCP.
    const idleHandle = requestIdle(() => {
      idleReady = true;
      start();
    });

    return () => {
      stop();
      cancelIdle(idleHandle);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);

      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [color, amplitude, distance]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      {...rest}
    />
  );
}
