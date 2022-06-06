import { useRef } from 'react';
import { styled } from '@mui/material/styles';
import ReactLoading from 'react-loading';
import { TextField, Grid, Paper, Button, Alert, Typography } from '@mui/material';
import { useWeather } from '../../context/weatherContext';

const Item = styled(Paper)(() => ({
  textAlign: 'center',
  boxShadow: 'none',
  fontSize: 11,
}));

const LoaderContainer = styled(Paper)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  boxShadow: 'none',
  padding: '16px 0'
}));

const Link = styled(Paper)(() => ({
  textAlign: 'right',
  boxShadow: 'none',
  fontSize: 12,
}));

function WeatherContent() {

  const cityRef = useRef<HTMLInputElement | null>(null)
  const { 
    data,
    setData,
    error,
    setError,
    loading,
    setLoading,
    manualSelect,
    setManualSelect
   } = useWeather()


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

  return (
    <Paper
      sx={{
        p: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {loading && 
        <LoaderContainer>
        <ReactLoading type='spinningBubbles' color='#1875d2' height={'15%'} width={'15%'}/>
        </LoaderContainer>
      }
      <Link><a href="https://www.weatherapi.com/" title="Weather API" >WeatherAPI.com</a></Link>
      {error && <Alert severity="error" sx={{margin: '16px 0'}}>{`${error}`}</Alert>}
      {manualSelect && 
        <>
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
        </>
      }
      {data && 
        <>
          <Item>
            <img 
              src={`${process.env.PUBLIC_URL}icons/weather/${data.current.condition.code}${data.current.is_day === 1 ? "_day" : "_night" }.svg`} 
              alt="Weather status img" 
              style={{ height: 80, width: 80, margin: "16px 0", userSelect: 'none' }}
            />
          </Item>
          <Item>
            <Typography variant='h4'>
              {data.current.temp_c}&#176;
            </Typography>
          </Item>
          <Item>
            <Typography variant='body1'>
              {data.location.name}, {data.location.region}
            </Typography>
          </Item>
          <Grid container spacing={1} columns={{ xs: 12}} sx={{marginTop: "8px"}}>
            <Grid item xs={4}>
              <Item>
                <Typography variant='body2'>
                  Wind now
                </Typography>
                <Typography variant='body1'>
                  {data.current.wind_kph}km/h
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Typography variant='body2'>
                  Humidity
                </Typography>
                <Typography variant='body1'>
                  {data.current.humidity}%  
                </Typography>       
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Typography variant='body2'>
                  Precipitation
                </Typography>
                <Typography variant='body1'>
                  {data.current.precip_mm}mm
                </Typography>
              </Item>
            </Grid>
          </Grid>
        </>
      }
    </Paper>
  );
}

export default function Weather() {
  return <WeatherContent />;
}
