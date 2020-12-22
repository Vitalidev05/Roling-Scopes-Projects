import { LngLat } from 'mapbox-gl';

export interface ICovid {
  updated: number;
  country: string;
  countryInfo: ICountryInfo;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
}

export interface ICountryInfo {
  _id: number;
  iso2: string;
  iso3: string;
  lat: number;
  long: number;
  flag: string;
}

export interface ICategory {
  name: string;
  id: string;
  checked: boolean;
}

export type LngLatLike =
  | [number, number]
  | LngLat
  | { lng: number; lat: number }
  | { lon: number; lat: number }
  | [number, number];

export interface MapCovid<Geometry, GeoJsonProperties> {
  type: string;
  geometry: Geometry;
  properties: GeoJsonProperties;
}

export interface Geometry {
  type: string;
  coordinates: [number, number];
}

export interface GeoJsonProperties {
  id: number;
  country: string;
  cases: number;
  deaths: number;
  iso: string;
}
