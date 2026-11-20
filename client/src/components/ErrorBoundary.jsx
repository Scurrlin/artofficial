import React from 'react';
import { useLocation } from 'react-router-dom';

class Boundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Render error:', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div role="alert" className="flex flex-col items-start gap-4 max-w-7xl mx-auto">
        <h1 className="font-extrabold text-[#10131f] text-[32px]">Something went wrong</h1>
        <p className="text-[#10131f] text-[16px]">This page hit an error. Reloading usually fixes it.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="font-medium bg-[#10131f] text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Reload
        </button>
      </div>
    );
  }
}

// Keyed by path so navigating away from a crashed page clears the error
const ErrorBoundary = ({ children }) => {
  const { pathname } = useLocation();
  return <Boundary key={pathname}>{children}</Boundary>;
};

export default ErrorBoundary;
