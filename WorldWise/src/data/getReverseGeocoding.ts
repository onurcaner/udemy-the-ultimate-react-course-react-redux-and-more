import { getGeneric } from './getGeneric';
import { CityAttributes, Position } from './types';

export interface ReverseGeocoding {
  city: string;
  locality: string;
  countryCode: string;
  countryName: string;
}

export async function getReverseGeocoding(
  { lat, lng }: Position,
  requestInit: RequestInit,
): Promise<Pick<CityAttributes, 'cityName' | 'country' | 'emoji'>> {
  const url =
    `https://api.bigdatacloud.net/data/reverse-geocode-client` +
    `?latitude=${lat}&longitude=${lng}`;
  const data = await getGeneric<ReverseGeocoding>(url, requestInit);

  if (!data.countryCode)
    throw new Error('Reverse Geocoding has no countryCode');

  return {
    cityName: data.city || data.locality,
    country: data.countryName,
    emoji: convertToEmoji(data.countryCode),
  };
}

function convertToEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
