import React, { useRef, useState } from 'react'
// Material-UI
import {
  TextField,
  Grid,
  Paper,
  Button,
  Typography,
  Skeleton,
  Box,
  styled,
  IconButton,
  Divider,
  Collapse,
} from '@mui/material'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'
import grey from '@mui/material/colors/grey'
// Redux
import { useGetWeatherQuery } from '../../store/features/weather/weather.api'
import { usePersistentStorageValue } from '../../hooks/use-persistentStorageValue'

const FIREBASE_ERRORS: { [code: number]: { message: string } } = {}
FIREBASE_ERRORS[1003] = { message: 'City must have a value' }
FIREBASE_ERRORS[1006] = { message: 'No matching location found' }

const Item = styled(Paper)(() => ({
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
  const cityRef = useRef<HTMLInputElement>()
  const [location, setLocation] = usePersistentStorageValue('location', 'Vilnius')
  const [edit, setEdit] = useState(false)

  const { data, error, isLoading, isFetching, isError } = useGetWeatherQuery(location)

  function confirmEventHandler() {
    if (cityRef.current) {
      const city = cityRef.current.value
      setLocation(city)
      setEdit(false)
    }
  }

  return (
    <>
      {isLoading ? (
        <Skeleton variant='rectangular' height={272} />
      ) : (
        <Paper
          sx={{
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundImage: 'none',
          }}
        >
          <Box sx={{ display: 'inline-flex', justifyContent: 'space-between', mb: 1 }}>
            <Link sx={{ display: 'flex', alignItems: 'center' }}>
              <a href='https://www.weatherapi.com/' title='Weather API'>
                WeatherAPI.com
              </a>
            </Link>
            <IconButton aria-label='delete' size='small' onClick={() => setEdit(!edit)}>
              <TuneRoundedIcon fontSize='small' sx={{ color: grey[500] }} />
            </IconButton>
          </Box>

          <Collapse in={edit || isError || isLoading || isFetching}>
            <TextField
              fullWidth
              id='weather-city'
              label='City, Country, Region'
              variant='filled'
              size='small'
              type='text'
              sx={{ marginBottom: '16px' }}
              defaultValue={data ? data.location.name : ''}
              inputRef={cityRef}
              error={!!error}
              helperText={
                error
                  ? JSON.stringify(error).includes('"code":1003')
                    ? FIREBASE_ERRORS[1003].message
                    : JSON.stringify(error).includes('"code":1006')
                    ? FIREBASE_ERRORS[1006].message
                    : ''
                  : ''
              }
            />
            <Button
              fullWidth
              size='small'
              variant='contained'
              onClick={() => confirmEventHandler()}
            >
              Confirm
            </Button>
            <Divider sx={{ py: 1, display: data ? 'block' : 'none' }} />
          </Collapse>

          {data && (
            <>
              <Item>
                <img
                  src={`${process.env.PUBLIC_URL}icons/weather/${data.current.condition.code}${
                    data.current.is_day === 1 ? '_day' : '_night'
                  }.svg`}
                  alt='Weather status img'
                  style={{ height: 80, width: 80, margin: '16px 0', userSelect: 'none' }}
                />
              </Item>
              <Item>
                <Typography variant='h4'>{data.current.temp_c}&deg;C</Typography>
              </Item>
              <Item>
                <Typography variant='body1'>
                  {data.location.name}, {data.location.region}
                </Typography>
              </Item>
              <Grid container spacing={1} columns={{ xs: 12 }} sx={{ marginTop: '8px' }}>
                <Grid item xs={4}>
                  <Item>
                    <Typography variant='body2' fontSize={12}>
                      Wind now
                    </Typography>
                    <Typography variant='body1'>{data.current.wind_kph}km/h</Typography>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <Typography variant='body2' fontSize={12}>
                      Humidity
                    </Typography>
                    <Typography variant='body1'>{data.current.humidity}%</Typography>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <Typography variant='body2' fontSize={12}>
                      Precipitation
                    </Typography>
                    <Typography variant='body1'>{data.current.precip_mm}mm</Typography>
                  </Item>
                </Grid>
              </Grid>
            </>
          )}
        </Paper>
      )}
    </>
  )
}
