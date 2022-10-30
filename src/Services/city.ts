import { GetCityApiArg, GetCityApiResponse } from '@/Interface/city'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithInterceptor } from './api'

export const cityApi = createApi({
  reducerPath: 'cityApi',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: [],
  keepUnusedDataFor: 0,
  endpoints: build => ({
    /* Auth API end points */
    getCity: build.query<GetCityApiResponse, GetCityApiArg>({
      query: queryArg => ({
        url: '/app/user/get-city-list',
        params: queryArg.params,
      }),
    }),
  }),
})

export const { useGetCityQuery } = cityApi
