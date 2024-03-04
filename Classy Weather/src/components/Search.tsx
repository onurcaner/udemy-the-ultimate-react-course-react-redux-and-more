import React from 'react';

export interface SearchProps {
  query: string;
  onChange: (query: string) => void;
}

export class Search extends React.Component<SearchProps> {
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    this.props.onChange(value);
  }

  render(): React.ReactNode {
    const { query } = this.props;
    return (
      <form>
        <input
          type="text"
          placeholder="Search from location"
          aria-label="Search from location"
          value={query}
          onChange={this.handleChange.bind(this)}
        />
      </form>
    );
  }
}
