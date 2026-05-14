import { Component, ReactNode, ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for debugging
    console.error("Error Boundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[60vh] items-center justify-center px-6 py-24">
          <div className="w-full max-w-2xl rounded-lg border border-border bg-surface p-8">
            <div className="label-mono mb-4 text-fg-subtle">Error</div>
            <h2 className="font-display mb-4 text-3xl leading-tight text-fg">
              Something went wrong
            </h2>
            <p className="mb-8 leading-relaxed text-fg-muted">
              An unexpected error occurred while rendering this page.
            </p>

            {this.state.error && (
              <div className="mb-8 rounded-lg border border-border bg-bg p-4">
                <h3 className="label-mono mb-3 text-fg-subtle">
                  Error Details
                </h3>
                <p className="break-all rounded bg-elevated p-3 font-mono text-[13px] text-fg">
                  {this.state.error.toString()}
                </p>
                {import.meta.env.DEV && this.state.errorInfo && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-medium text-fg-muted">
                      Stack Trace
                    </summary>
                    <pre className="mt-3 max-h-48 overflow-auto rounded bg-elevated p-3 text-xs text-fg-muted">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                className="rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
                type="button"
                onClick={this.handleReset}
              >
                Try Again
              </button>
              <button
                className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-elevated"
                type="button"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
