import { GetWeatherApiArg, GetWeatherAPIData } from '@/Interfaces/city'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWeather } from './api'

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: baseQueryWeather,
  tagTypes: [],
  keepUnusedDataFor: 0,
  endpoints: build => ({
    /* Auth API end points */
    getWeather: build.query<GetWeatherAPIData, GetWeatherApiArg>({
      query: queryArg => ({
        url: '/onecall',
        params: queryArg.params,
      }),
    }),
  }),
})

export const { useGetWeatherQuery } = weatherApi
