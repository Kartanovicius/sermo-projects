import { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import ReactLoading from 'react-loading';
import { TextField, Grid, Paper, Button, Alert } from '@mui/material';

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
  const [loading, setLoading] = useState<boolean>(true);
  const [manualSelect, setManualSelect] = useState<boolean>(false);
  const cityRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    let url = '';
    navigator.geolocation.getCurrentPosition(async function (position) {
      url = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${position.coords.latitude},${position.coords.longitude}&aqi=no`;
      fetch(url)
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

  function confirmEventHandler() {
    const city = cityRef.current?.value
    let url = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}&aqi=no`;
    fetch(url)
    .then((response) => 
      {if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        return response.json().then((e) => {throw Error(e.error.code)});
      }}
    )
    .then((actualData) => {
      setData(actualData);
      setError(null);
      setManualSelect(false);
    })
    .catch((e) => {
      if (e.toString().includes('1003')) {
        setError('City must have a value');
      }  
      if (e.toString().includes('1006')) {
        setError('No matching location found');
      }
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    boxShadow: 'none',
    fontSize: 11,
    [theme.breakpoints.up('md')]: {
      fontSize: 12,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 13,
    },
  }));

  const LoaderContainer = styled(Paper)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    boxShadow: 'none',
    padding: '16px 0'
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
      {loading && <LoaderContainer><ReactLoading type='spinningBubbles' color='#1875d2' height={'15%'} width={'15%'}/></LoaderContainer>}
      <Link><a href="https://www.weatherapi.com/" title="Weather API" >WeatherAPI.com</a></Link>
      {error && <Alert severity="error" sx={{margin: '16px 0'}}>{`${error}`}</Alert>}
      {manualSelect && 
      <div>
        <TextField fullWidth 
          id="city" 
          label="City"
          variant="outlined" 
          type="text"
          sx={{marginBottom: '16px'}}
          inputRef={cityRef}
         />
        <Button fullWidth variant="contained" disableElevation onClick={confirmEventHandler}>
          Confirm
        </Button>
      </div>
      }
      {data && 
      <div>
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