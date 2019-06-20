export interface IActualWeatherInfo {
  cnt: number;
  list: IActualForecast[];
}
export interface IActualForecast {
  coord: {
    lon: number,
    lat: number
  };
  weather: [{
    id: number,
    main: string,
    description: string,
    icon: string
  }];
  base: string;
  main: {
    temp: number,
    pressure: number,
    humidity: number,
    temp_min: number,
    temp_max: number,
  };
  wind: {
    speed: number,
    deg: number
  };
  clouds: {
    all: number
  };
  rain: {
    '3h': number;
  };
  dt: number;
  sys: {
    type: number,
    id: number,
    message: number,
    country: string,
    sunrise: number,
    sunset: number
  };
  id: number;
  name: string;
  cod: number;
}

export interface IFiveDayForecast {
  cod: string;
  cnt: number;
  city: {
    id: number,
    name: string,
    coord: {
      lon: number,
      lat: number
    },
    country: string;
    timezone: number
  };
  list: [{
    clouds: {
      all: number;
    },
    dt: any,
    dt_txt: any,
    main: {
      temp: number,
      temp_min: number,
      temp_max: number,
      temp_kf: number,
      pressure: number,
      humidity: number,
      sea_level: number,
      grnd_level: number
    },
    sys: {
      pod: string
    },
    weather: [{
      id: number,
      main: string,
      description: string,
      icon: string
    }],
    wind: {
      speed: number,
      deg: number
    }
  }];
}
