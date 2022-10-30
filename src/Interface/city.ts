export interface BaseResponse<T> {
  status: number
  message: string
  data: T
}

export interface GetCityAPIData {
  Record: Record[]
  pageToken: null
  totalPages: number
  currentPage: number
  previousPage: null
}

export interface Record {
  _id: string
  id: number
  name: string
  state: string
  country: string
  coord: Coord
}

export interface Coord {
  lon: number
  lat: number
}

export interface GetWeatherAPIData {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  daily: Daily[]
}

export interface Daily {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  temp: Temp
  feels_like: FeelsLike
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: Weather[]
  clouds: number
  pop: number
  uvi: number
}

export interface FeelsLike {
  day: number
  night: number
  eve: number
  morn: number
}

export interface Temp {
  day: number
  min: number
  max: number
  night: number
  eve: number
  morn: number
}

export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export type GetCityApiResponse = BaseResponse<GetCityAPIData>
export type GetCityApiArg = {
  params: {
    page: number
    search: string
  }
}
export type GetWeatherApiArg = {
  params: {
    lat: number
    lon: number
    appid: string
    units: string
    exclude: string
  }
}
