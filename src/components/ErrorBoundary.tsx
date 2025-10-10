import { Component, ReactNode, ErrorInfo } from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";

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

      // Default error UI
      return (
        <div className="flex justify-center items-center min-h-[50vh] px-4">
          <Card className="max-w-2xl w-full">
            <CardBody className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Something Went Wrong
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  An unexpected error occurred. We apologize for the
                  inconvenience.
                </p>
              </div>

              {this.state.error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                    Error Details:
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300 font-mono bg-red-100 dark:bg-red-800/30 p-2 rounded break-all">
                    {this.state.error.toString()}
                  </p>
                  {process.env.NODE_ENV === "development" &&
                    this.state.errorInfo && (
                      <details className="mt-3">
                        <summary className="cursor-pointer text-sm font-medium text-red-800 dark:text-red-200">
                          Stack Trace
                        </summary>
                        <pre className="mt-2 text-xs text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-800/30 p-2 rounded overflow-auto max-h-48">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </details>
                    )}
                </div>
              )}

              <div className="flex justify-center gap-4">
                <Button color="primary" onPress={this.handleReset}>
                  Try Again
                </Button>
                <Button
                  variant="bordered"
                  onPress={() => window.location.reload()}
                >
                  Reload Page
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
