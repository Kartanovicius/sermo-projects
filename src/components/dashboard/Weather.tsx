import { useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import { TextField, Grid, Paper, Button, Alert, Typography, Skeleton } from '@mui/material'
import { useGetWeatherQuery } from '../../store/features/weather/weather.api'
import { usePersistentStorageValue } from '../../hooks/use-persistentStorageValue'

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  boxShadow: 'none',
  fontSize: 11,
}))

const Link = styled(Paper)(({ theme }) => ({
  textAlign: 'right',
  boxShadow: 'none',
  fontSize: 12,
  '& a': {
    color: theme.palette.text.secondary,
  },
}))

export default function Weather() {
  const cityRef = useRef<HTMLInputElement | null>(null)
  const [location, setLocation] = usePersistentStorageValue('location', '')
  const [skip, setSkip] = useState(location !== '""' ? true : false)

  const { data, error, isLoading } = useGetWeatherQuery(location, {skip})

  function confirmEventHandler() {
    if (cityRef.current) {
      const city = cityRef.current.value
      setLocation(city)
      setSkip(false)
    }
  }

  return (
    <>
     {isLoading ? <Skeleton variant="rectangular" height={272}/> :
     <Paper
       sx={{
         p: 1,
         display: 'flex',
         flexDirection: 'column',
         backgroundImage: 'none'
       }}
     >
       <Link><a href='https://www.weatherapi.com/' title='Weather API' >WeatherAPI.com</a></Link>
       {error && <Alert severity='error' sx={{margin: '16px 0'}}>{
        JSON.stringify(error).includes('"code":1003') ? 'City must have a value' :
        JSON.stringify(error).includes('"code":1006') ? 'No matching location found' : ''
       }</Alert>}
       {(location === '""' || error) && 
        <>
          <TextField fullWidth 
            id='city' 
            label='City'
            variant='outlined' 
            type='text'
            sx={{marginBottom: '16px'}}
            inputRef={cityRef}
           />
          <Button fullWidth variant='contained' disableElevation onClick={(e) => confirmEventHandler()}>
            Confirm
          </Button>
        </>
      }
       {data && 
         <>
           <Item>
             <img 
               src={`${process.env.PUBLIC_URL}icons/weather/${data.current.condition.code}${data.current.is_day === 1 ? '_day' : '_night' }.svg`} 
               alt='Weather status img' 
               style={{ height: 80, width: 80, margin: '16px 0', userSelect: 'none' }}
             />
           </Item>
           <Item>
             <Typography variant='h4'>
               {data.current.temp_c}&deg;C
             </Typography>
           </Item>
           <Item>
             <Typography variant='body1'>
               {data.location.name}, {data.location.region}
             </Typography>
           </Item>
           <Grid container spacing={1} columns={{ xs: 12}} sx={{marginTop: '8px'}}>
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
     }
   </>
  )

  // function confirmEventHandler() {
  //   const city = cityRef.current?.value

  //   let url = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}&aqi=no`
  //   fetch(url)
  //   .then((response) => 
  //     {if (response.status >= 200 && response.status <= 299) {
  //       return response.json()
  //     } else {
  //       return response.json().then((e) => {throw Error(e.error.code)})
  //     }}
  //   )
  //   .then((actualData) => {
  //     setData(actualData)
  //     setError(null)
  //     setManualSelect(false)
  //   })
  //   .catch((e) => {
  //     if (e.toString().includes('1003')) {
  //       setError('City must have a value')
  //     }  
  //     if (e.toString().includes('1006')) {
  //       setError('No matching location found')
  //     }
  //   })
  // }


}
