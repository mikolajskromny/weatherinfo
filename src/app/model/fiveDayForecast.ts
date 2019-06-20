export interface IGroupedFiveDayForecast extends Array<IFiveDayForecast> {
}

export interface IFiveDayForecast {
  clouds: {
    all: number;
  };
  dt: any;
  dt_txt: any;
  main: {
    temp: number,
    temp_min: number,
    temp_max: number,
    temp_kf: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number
  };
  sys: {
    pod: string
  };
  weather: [{
    id: number,
    main: string,
    description: string,
    icon: string
  }];
  wind: {
    speed: number,
    deg: number
  };
}

export interface IAllCityForecast {
  results: Array<IAverageTemperature>;
  city_name: string;
  which_data: boolean;
}

export interface IAverageTemperature {
  date: string;
  temp: number;
  icon: string;
  wind_speed: number;
}
