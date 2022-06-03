import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

interface IData {
  current: {
    temp_c: number,
    wind_kph: number,
    humidity: number,
    precip_mm: number,
    condition: {
      icon: string,
    }
  },
  location: {
    name: string,
    region: string,
  }
}

function WeatherContent() {
  const [data, setData] = useState<IData | null>();
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('https://api.weatherapi.com/v1/current.json?key=7e5f31b0cc614140aeb121648220306&q=Vilnius&aqi=no')
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

  const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    boxShadow: 'none',
    fontSize: 13,
    [theme.breakpoints.down('md')]: {
      fontSize: 11,
    },
  }));

  const Link = styled(Paper)(({ theme }) => ({
    textAlign: 'right',
    boxShadow: 'none',
    fontSize: 12,
  }));
  
  return (
    <Paper
      sx={{
        p: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {loading && <p>...Loading</p>}
      {error && <p>{`There is a problem fetching the post data - ${error}`}</p>}
      {data && 
      <div>
        <Link><a href="https://www.weatherapi.com/" title="Weather API" >WeatherAPI.com</a></Link>
        <Item>
          <img src={data.current.condition.icon} alt="Weather status img" />
        </Item>
        <Item>
          {data.current.temp_c}&#176;
        </Item>
        <Item>
          {data.location.name}, {data.location.region}
        </Item>
        <Grid container spacing={1} columns={{ xs: 12}} sx={{marginTop: "8px"}}>
          <Grid item xs={4}>
            <Item>
              Wind now<br/>
              {data.current.wind_kph}km/h
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              Humidity<br/>
              {data.current.humidity}%         
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              Precipitation<br/>
              {data.current.precip_mm}mm
            </Item>
          </Grid>
        </Grid>
      </div>
      }
    </Paper>
  );
}

export default function Weather() {
  return <WeatherContent />;
}