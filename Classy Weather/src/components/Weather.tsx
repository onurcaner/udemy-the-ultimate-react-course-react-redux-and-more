import React from 'react';

import { WeatherAttributes } from '../fetch/getWeather';

import { getWeatherIcon } from '../utils/getWeatherIcon';
import { formatDay } from '../utils/formatDay';

export interface WeatherProps {
  weather: WeatherAttributes;
}

export class Weather extends React.Component<WeatherProps> {
  render(): React.ReactNode {
    const {
      weather: { temperatures, unit },
    } = this.props;
    return (
      <ul className="weather">
        {temperatures.map(({ dateString, max, min, weatherCode }) => (
          <li className="day" key={dateString}>
            <span aria-label="Weather icon">{getWeatherIcon(weatherCode)}</span>
            <p>{formatDay(dateString)}</p>
            <p>
              {`${Math.floor(min)}${unit}`} &mdash; {`${Math.ceil(max)}${unit}`}
            </p>
          </li>
        ))}
      </ul>
    );
  }
}
