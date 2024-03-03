import React from 'react';

export interface SearchProps {
  onChange: (query: string) => void;
}

interface SearchState {
  query: string;
}

export class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { query: '' };
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    this.props.onChange(value);
    this.setState((state) => ({ ...state, query: value }));
  }

  render(): React.ReactNode {
    return (
      <form>
        <input
          type="text"
          placeholder="Search from location"
          aria-label="Search from location"
          value={this.state.query}
          onChange={this.handleChange.bind(this)}
        />
        <div>
          <button type="submit">Get weather</button>
        </div>
      </form>
    );
  }
}
