import { useEffect, useState } from 'react';

import { CityAttributes } from '../data/types';

export function useGeolocation() {
  const [position, setPosition] = useState<CityAttributes['position'] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<GeolocationPositionError | Error | null>(
    null,
  );

  useEffect(startGeolocation, []);

  function startGeolocation() {
    setIsLoading(true);
    setError(null);

    if (!('geolocation' in navigator)) {
      setIsLoading(false);
      setError(Error('Geolocation is not supported in your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setPosition({ lat, lng });
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      },
    );
  }

  return { position, isLoading, error, startGeolocation };
}
