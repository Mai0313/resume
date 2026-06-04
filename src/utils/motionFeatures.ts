// Async feature bundle for LazyMotion. Loaded with a dynamic import so the
// animation engine stays out of the initial bundle; m.* components render
// statically until it arrives. domMax (not domAnimation) because the navbar
// tab pill animates via layoutId, which needs layout-projection features.
export { domMax as default } from "framer-motion";
