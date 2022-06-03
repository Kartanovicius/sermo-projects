import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';

function WeatherContent() {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('http://api.weatherapi.com/v1/current.json?key=7e5f31b0cc614140aeb121648220306&q=Vilnius&aqi=no')
    .then((response) => response.json())
    .then((actualData) => {
      setData(actualData);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setData(null);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [])
  
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >{loading && <p>...Loading</p>}
    {error && <p>{`There is a problem fetching the post data - ${error}`}</p>}
    {data && 
    <div>
      <img src={data.current.condition.icon} alt="" />
      <p>{data.current.condition.text}</p>
      <p>{data.location.name}</p>
    </div>
    }
      <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a>
    </Paper>
  );
}

export default function Weather() {
  return <WeatherContent />;
}