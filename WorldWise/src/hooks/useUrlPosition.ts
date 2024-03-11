import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Position } from '../data/types';

export function useUrlPosition(): Position | null {
  const [position, setPosition] = useState<Position | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const queryLat = searchParams.get('lat');
    const queryLng = searchParams.get('lng');
    if (!queryLat || !queryLng) return;

    setPosition({
      lat: +queryLat,
      lng: +queryLng,
    });
  }, [searchParams]);

  return position;
}
