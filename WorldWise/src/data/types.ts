export interface CountryAttributes {
  country: string;
  emoji: string;
}

export interface CityAttributes extends CountryAttributes {
  cityName: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: number;
}
