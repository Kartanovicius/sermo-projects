import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IWeather } from './weather.types'

export const weatherApi = createApi({
  reducerPath: 'api/weather',
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.weatherapi.com/v1` }),
  endpoints: (build) => ({
    getWeather: build.query<IWeather, string>({
      query: (location) =>
        `/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}&aqi=no`,
    }),
  }),
})

export const { useGetWeatherQuery } = weatherApi
