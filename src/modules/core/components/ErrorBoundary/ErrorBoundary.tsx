import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    let errorContent = `Error: ${error.message}`;

    if (info.componentStack) {
      errorContent += `\nComponent stack: ${info.componentStack}`;
    }

    console.error(errorContent);
  }

  public render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}

export default ErrorBoundary;
