import { Position } from './types';
import { ReverseGeocoding } from './types';

export async function getAddressFromGeocoding(
  requestInit?: RequestInit,
): Promise<{
  position: Position;
  address: string;
}> {
  const {
    coords: { latitude, longitude },
  } = await getPosition();
  const position: Position = { latitude, longitude };

  const reverseGeocoding = await fetchReverseGeocoding(position, requestInit);
  const address = formatAddress(reverseGeocoding);

  return { position, address };
}

function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchReverseGeocoding(
  { latitude, longitude }: Position,
  requestInit?: RequestInit,
): Promise<ReverseGeocoding> {
  const response = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
    requestInit,
  );
  if (!response.ok) throw Error('Failed fetching address');

  const data = (await response.json()) as ReverseGeocoding;
  if (!data.countryName)
    throw Error('No country existing in provided coordinates.');

  return data;
}

function formatAddress({
  city,
  countryName,
  locality,
  postcode,
}: ReverseGeocoding): string {
  return `${locality}, ${city} ${postcode}, ${countryName}`;
}
