import React from 'react';

export interface ErrorMessageProps {
  error: Error | null;
}

export class ErrorMessage extends React.Component<ErrorMessageProps> {
  render(): React.ReactNode {
    const { error } = this.props;
    return (
      <p className="error">{error ? error.message : 'Something went wrong'}</p>
    );
  }
}
