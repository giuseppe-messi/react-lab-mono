import * as React from "react";
import { ErrorPage } from "../ErrorPage/ErrorPage";

type Props = {
  children?: React.ReactNode;
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
      return <ErrorPage onClearError={this.reset} />;
    }
    return this.props.children;
  }
}
