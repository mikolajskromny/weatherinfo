export interface CityList extends Array<CityModel> { }

export interface CityModel {
  id: number;
  name: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
}
