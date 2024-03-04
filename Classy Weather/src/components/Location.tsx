import React from 'react';

export interface LocationAttributes {
  name: string;
  flag: string;
}

export interface LocationProps {
  location: LocationAttributes;
}

export class Location extends React.Component<LocationProps> {
  render(): React.ReactNode {
    const { flag, name } = this.props.location;
    return (
      <h2>
        Weather from {name} {flag}
      </h2>
    );
  }
}
