import React, { Component } from "react";

class MyErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Error caught by error boundary:", error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Customize the error message to display to the user
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

export default MyErrorBoundary;
