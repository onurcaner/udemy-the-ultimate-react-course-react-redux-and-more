export interface CountryAttributes {
  country: string;
  emoji: string;
}

export interface CityAttributes extends CountryAttributes {
  cityName: string;
  date: string;
  notes: string;
  position: Position;
  id: string;
}

export interface Position {
  lat: number;
  lng: number;
}
