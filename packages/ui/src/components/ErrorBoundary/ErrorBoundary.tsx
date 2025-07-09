import * as React from "react";

type FallbackRenderProps = {
  onClearError: () => void;
};

type Props = {
  children?: React.ReactNode;
  fallbackRender: ({ onClearError }: FallbackRenderProps) => React.ReactNode;
};

export class ErrorBoundary extends React.Component<Props> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  reset = () => {
    this.setState({ hasError: false });
  };

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallbackRender({ onClearError: this.reset });
    }
    return this.props.children;
  }
}
