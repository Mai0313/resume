import { Component, ReactNode, ErrorInfo } from "react";
import { Button, Card } from "@heroui/react";

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
          <Card className="w-full max-w-2xl">
            <Card.Header>
              <Card.Title>Something went wrong</Card.Title>
              <Card.Description>
                An unexpected error occurred while rendering this page.
              </Card.Description>
            </Card.Header>

            {this.state.error && (
              <Card.Content>
                <p className="break-all rounded-lg bg-default p-3 font-mono text-xs text-foreground">
                  {this.state.error.toString()}
                </p>
                {import.meta.env.DEV && this.state.errorInfo && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-medium text-muted">
                      Stack Trace
                    </summary>
                    <pre className="mt-3 max-h-48 overflow-auto rounded-lg bg-default p-3 text-xs text-muted">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </Card.Content>
            )}

            <Card.Footer className="flex flex-wrap gap-3">
              <Button onPress={this.handleReset}>Try Again</Button>
              <Button
                variant="secondary"
                onPress={() => window.location.reload()}
              >
                Reload Page
              </Button>
            </Card.Footer>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
