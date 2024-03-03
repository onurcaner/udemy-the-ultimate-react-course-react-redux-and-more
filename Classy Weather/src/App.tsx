import React from 'react';

import { Header } from './components/Header';
import { Search } from './components/Search';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';

import { getGeocoding } from './fetch/getGeodata';
import { getWeather } from './fetch/getWeather';

import { convertCountryCodeToFlag } from './utils/convertCountryCodeToFlag';

interface AppState {
  timeoutId: number;
  isLoading: boolean;
  error: Error | null;
  abortController: AbortController | null;
  location: { name: string; flag: string };
}

export class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      timeoutId: 0,
      isLoading: false,
      error: null,
      abortController: null,
      location: { name: '', flag: '' },
    };
  }

  fetchWeather(location: string): void {
    clearTimeout(this.state.timeoutId);
    if (location.length < 3) {
      return;
    }

    const timeoutId = setTimeout(() => {
      this.state.abortController?.abort();

      const abortController = new AbortController();
      this.setState({
        abortController,
        isLoading: true,
        error: null,
      });

      getGeocoding(location, { signal: abortController.signal })
        .then((geoData) => {
          const { countryCode, name } = geoData;
          const flag = convertCountryCodeToFlag(countryCode);
          this.setState({ location: { flag, name } });
          return getWeather(geoData, { signal: abortController.signal });
        })
        .then((weather) => {
          console.log(weather);
        })
        .catch((error: Error) => {
          if (error.name === 'AbortError') return;
          this.setState({ error });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }, 1);

    this.setState({ timeoutId });
  }

  render(): React.ReactNode {
    const hasError = Boolean(this.state.error);
    const { isLoading } = this.state;
    console.log(this.state.isLoading, hasError);
    return (
      <div className="app">
        <Header />
        <Search onChange={this.fetchWeather.bind(this)} />
        {isLoading && <Loader />}
        {hasError && <ErrorMessage error={this.state.error} />}
        {!isLoading && !hasError && (
          <>
            <p>{this.state.location.flag}</p>
            <p>{this.state.location.name}</p>
          </>
        )}
      </div>
    );
  }
}
