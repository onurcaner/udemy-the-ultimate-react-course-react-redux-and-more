import React from 'react';

import { Header } from './components/Header';
import { Search } from './components/Search';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { Location, LocationAttributes } from './components/Location';
import { Weather } from './components/Weather';

import { getGeocoding } from './fetch/getGeodata';
import { WeatherAttributes, getWeather } from './fetch/getWeather';

import { convertCountryCodeToFlag } from './utils/convertCountryCodeToFlag';

interface AppState {
  query: string;
  timeoutId: number;
  isLoading: boolean;
  error: Error | null;
  abortController: AbortController | null;
  location: LocationAttributes | null;
  weather: WeatherAttributes | null;
}

export class App extends React.Component<object, AppState> {
  state: AppState = {
    query: '',
    timeoutId: 0,
    isLoading: false,
    error: null,
    abortController: null,
    location: null,
    weather: null,
  };

  componentDidUpdate(_: object, previousState: Readonly<AppState>): void {
    const isQueryChanged = previousState.query !== this.state.query;
    const isQueryLongEnough = this.state.query.length >= 3;

    if (isQueryChanged) clearTimeout(this.state.timeoutId);
    if (isQueryChanged && isQueryLongEnough) this.fetchWeather();
  }

  fetchWeather(): void {
    clearTimeout(this.state.timeoutId);
    const timeoutId = setTimeout(() => {
      this.state.abortController?.abort();

      const abortController = new AbortController();
      this.setState({
        abortController,
        isLoading: true,
        error: null,
      });

      getGeocoding(this.state.query, { signal: abortController.signal })
        .then((geoData) => {
          const { countryCode, name } = geoData;
          const flag = convertCountryCodeToFlag(countryCode);
          this.setState({ location: { flag, name } });
          return getWeather(geoData, { signal: abortController.signal });
        })
        .then((weather) => {
          this.setState({
            weather,
            error: null,
          });
        })
        .catch((error: Error) => {
          if (error.name === 'AbortError') return;
          this.setState({ error });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }, 500);

    this.setState({ timeoutId });
  }

  handleChangeOfQuery(query: string): void {
    this.setState({ query });
  }

  render(): React.ReactNode {
    const { query, isLoading, error, location, weather } = this.state;
    const hasError = Boolean(error);
    return (
      <div className="app">
        <Header />
        <Search query={query} onChange={this.handleChangeOfQuery.bind(this)} />
        {isLoading && <Loader />}
        {hasError && <ErrorMessage error={error} />}
        {!isLoading && !hasError && location && weather && (
          <div>
            {<Location location={location} />}
            {<Weather weather={weather} />}
          </div>
        )}
      </div>
    );
  }
}
