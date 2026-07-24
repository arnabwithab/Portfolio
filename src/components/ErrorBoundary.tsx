import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-black" role="alert">
          <div className="max-w-md rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center">
            <h2 className="text-xl font-semibold text-slate-200">Something went wrong</h2>
            <p className="mt-2 text-slate-400">
              The page encountered an unexpected error. Try refreshing.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-lg bg-teal-300 px-6 py-2 text-sm font-medium text-teal-900 transition hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              Refresh page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
