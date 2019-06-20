export interface ICityList extends Array<ICityModel> { }

export interface ICityModel {
  id: number;
  name: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
}

