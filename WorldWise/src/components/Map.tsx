import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

import { useCitiesContext } from '../contexts/useCitiesContext';
import { Position } from '../data/types';
import { useGeolocation } from '../hooks/useGeolocation';
import { useUrlPosition } from '../hooks/useUrlPosition';
import { FORM } from '../routes';
import { Button } from './Button';
import styles from './Map.module.css';

export function Map(): JSX.Element {
  const [center, setCenter] = useState<Position>({ lat: 0, lng: 0 });
  const [lastMarkerPosition, setLastMarkerPosition] = useState<Position | null>(
    null,
  );
  const {
    cities: { cities },
  } = useCitiesContext();
  const {
    position: geoLocationPosition,
    isLoading: isLoadingGeolocation,
    error: errorGeolocation,
    startGeolocation,
  } = useGeolocation();

  const position = useUrlPosition();

  useEffect(() => {
    if (!position) return;

    setCenter(position);
  }, [position]);

  useEffect(() => {
    if (!geoLocationPosition) return;

    setCenter(geoLocationPosition);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={center}
        zoom={8}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map<JSX.Element>((city) => (
          <Marker position={city.position} key={city.id}>
            <Popup>
              <span role="img" aria-label="City emoji">
                {city.emoji}
              </span>{' '}
              <span>{city.notes || 'No note added to this city'}</span>
            </Popup>
          </Marker>
        ))}

        {lastMarkerPosition && <Marker position={lastMarkerPosition}></Marker>}

        <ChangeCenter position={center} />
        <OnClick setLastMarkerPosition={setLastMarkerPosition} />
        <OnDragEnd setCenter={setCenter} />
      </MapContainer>

      {center !== geoLocationPosition && (
        <Button
          functionType="position"
          onClick={startGeolocation}
          isDisabled={isLoadingGeolocation}
          type="button"
        >
          {isLoadingGeolocation && 'Loading...'}
          {errorGeolocation?.message}
          {!isLoadingGeolocation && !errorGeolocation && 'Use my location'}
        </Button>
      )}
    </div>
  );
}

function ChangeCenter({ position }: { position: Position }): JSX.Element {
  const map = useMap();
  map.setView(position, undefined, {
    animate: true,
    duration: 0.5,
  });
  return <></>;
}

function OnClick({
  setLastMarkerPosition,
}: {
  setLastMarkerPosition: Dispatch<SetStateAction<Position | null>>;
}): JSX.Element {
  const navigate = useNavigate();

  useMapEvent('click', (e) => {
    const { lat, lng } = e.latlng;
    setLastMarkerPosition({ lat, lng });
    navigate(`${FORM}?lat=${lat}&lng=${lng}`);
  });

  return <></>;
}

function OnDragEnd({
  setCenter,
}: {
  setCenter: Dispatch<SetStateAction<Position>>;
}): JSX.Element {
  const map = useMap();

  useMapEvent('dragend', () => {
    const { lat, lng } = map.getCenter();
    setCenter({ lat, lng });
  });

  return <></>;
}
