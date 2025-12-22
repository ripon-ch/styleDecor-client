import React from "react";
import Icon from "./AppIcon.jsx";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,        // ✅ store error
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="text-center p-8 max-w-md">
            
            {/* ICON */}
            <div className="flex justify-center items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="42px" height="42px" viewBox="0 0 32 33" fill="none">
                <path d="M16 28.5C22.6274 28.5 28 23.1274 28 16.5C28 9.87258 22.6274 4.5 16 4.5C9.37258 4.5 4 9.87258 4 16.5C4 23.1274 9.37258 28.5 16 28.5Z" stroke="#343330" strokeWidth="2" />
                <path d="M11.5 15.5C12.3284 15.5 13 14.8284 13 14C13 13.1716 12.3284 12.5 11.5 12.5C10.6716 12.5 10 13.1716 10 14C10 14.8284 10.6716 15.5 11.5 15.5Z" fill="#343330" />
                <path d="M20.5 15.5C21.3284 15.5 22 14.8284 22 14C22 13.1716 21.3284 12.5 20.5 12.5C19.6716 12.5 19 13.1716 19 14C19 14.8284 19.6716 15.5 20.5 15.5Z" fill="#343330" />
                <path d="M21 22.5C19.9625 20.7062 18.2213 19.5 16 19.5C13.7787 19.5 12.0375 20.7062 11 22.5" stroke="#343330" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* TEXT */}
            <h1 className="text-2xl font-medium text-neutral-800">
              Something went wrong
            </h1>

            <p className="text-neutral-600 text-sm mt-2">
              {this.state.error?.message}
            </p>

            {/* STACK TRACE (VERY IMPORTANT) */}
            <pre className="mt-4 text-left text-xs text-red-600 bg-red-50 p-3 rounded overflow-auto max-h-40">
              {this.state.errorInfo?.componentStack}
            </pre>

            {/* BUTTON */}
            <div className="flex justify-center items-center mt-6">
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded flex items-center gap-2"
              >
                <Icon name="ArrowLeft" size={18} color="#fff" />
                Reload
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
