export interface Geocoding {
  countryCode: string;
  latitude: number;
  longitude: number;
  name: string;
  timezone: string;
}

export async function getGeocoding(
  location: string,
  requestInit?: RequestInit
): Promise<Geocoding> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${location}`;
  const response = await fetch(url, requestInit);
  if (!response.ok)
    throw new Error(
      `ERROR(${response.status}): at response of getGeoData(${location})`
    );

  const data = (await response.json()) as { results?: GeocodingData[] };
  if (!data.results) throw new Error('Location not found');

  const geocodes = data.results.map(parseGeocodingData);
  return geocodes[0];
}

function parseGeocodingData(geocodingData: GeocodingData): Geocoding {
  return {
    countryCode: geocodingData.country_code,
    latitude: geocodingData.latitude,
    longitude: geocodingData.longitude,
    name: geocodingData.name,
    timezone: geocodingData.timezone,
  };
}

interface GeocodingData {
  country_code: string;
  latitude: number;
  longitude: number;
  name: string;
  timezone: string;
}
