export interface Weather {
  temperatures: {
    min: number;
    max: number;
    weatherCode: number;
    dateString: string;
  }[];
  unit: string;
}

export async function getWeather(
  geoData: {
    latitude: number;
    longitude: number;
    timezone: string;
  },
  requestInit?: RequestInit
): Promise<Weather> {
  const { latitude, longitude, timezone } = geoData;

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?` +
    [
      `latitude=${latitude}`,
      `longitude=${longitude}`,
      `timezone=${timezone}`,
      `daily=weathercode,temperature_2m_max,temperature_2m_min`,
    ].join('&');
  const response = await fetch(url, requestInit);
  if (!response.ok)
    throw new Error(
      `ERROR(${response.status}): at response of getWeather(${latitude}, ${longitude})`
    );

  const data = (await response.json()) as WeatherData;
  const weather = parseWeatherData(data);
  return weather;
}

function parseWeatherData(weatherData: WeatherData): Weather {
  const { temperature_2m_max, temperature_2m_min, time, weathercode } =
    weatherData.daily;

  const temperatures: Weather['temperatures'] = time.map((_, i) => ({
    dateString: time[i],
    max: temperature_2m_max[i],
    min: temperature_2m_min[i],
    weatherCode: weathercode[i],
  }));

  return {
    temperatures,
    unit: weatherData.daily_units.temperature_2m_max,
  };
}

interface WeatherData {
  daily: {
    temperature_2m_min: number[];
    temperature_2m_max: number[];
    time: string[];
    weathercode: number[];
  };
  daily_units: {
    temperature_2m_min: string;
    temperature_2m_max: string;
  };
}
