import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const WeatherContext = createContext<any|null>(null);

export default function AuthProvider({children}: any) {
  const [data, setData] = useState<object | null>();
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [manualSelect, setManualSelect] = useState<boolean>(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${position.coords.latitude},${position.coords.longitude}&aqi=no`)
      .then(res => {
        const result = res.data;
        setData(result);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
        setManualSelect(false);
      });
    },
    function(error) {
      if (error.code === error.PERMISSION_DENIED) {
        setLoading(false);
        setManualSelect(true);
      }
    });
  }, [])
  
  const value = {
    data,
    setData,
    error,
    setError,
    loading,
    setLoading,
    manualSelect,
    setManualSelect
  }

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  )
}

export function useWeather() {
  return useContext(WeatherContext)
}