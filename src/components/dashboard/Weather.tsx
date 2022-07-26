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
  createTheme,
  ThemeProvider,
} from '@mui/material'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'
import grey from '@mui/material/colors/grey'
// Redux
import { useGetWeatherQuery } from '../../store/features/weather/weather.api'
import { usePersistentStorageValue } from '../../hooks/use-persistentStorageValue'

const FIREBASE_ERRORS: { [code: number]: { message: string } } = {}
FIREBASE_ERRORS[1003] = { message: 'City must have a value' }
FIREBASE_ERRORS[1006] = { message: 'No matching location found' }

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    large: true
    medium: true
    small: true
    extraLarge: true
  }
}

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'extraLarge' },
          style: {
            display: 'block',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            fontSize: 40,
            '& span': {
              fontSize: 20,
            },
          },
        },
        {
          props: { variant: 'large' },
          style: {
            display: 'block',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            fontSize: 20,
            '& span': {
              fontSize: 12,
            },
          },
        },
        {
          props: { variant: 'medium' },
          style: {
            display: 'block',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            fontSize: 16,
          },
        },
        {
          props: { variant: 'small' },
          style: {
            display: 'block',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            fontSize: 12,
          },
        },
      ],
    },
  },
})

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

  const { data, error, isLoading, isFetching, isError } = useGetWeatherQuery(location, {
    refetchOnFocus: true,
  })

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
              error={isError}
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
            <ThemeProvider theme={theme}>
              <Box textAlign='center'>
                <img
                  src={`${process.env.PUBLIC_URL}icons/weather/${data.current.condition.code}${
                    data.current.is_day === 1 ? '_day' : '_night'
                  }.svg`}
                  alt='Weather status img'
                  style={{ height: 80, width: 80, margin: '16px 0', userSelect: 'none' }}
                />
              </Box>
              <Box>
                <Typography variant='extraLarge'>
                  {data.current.temp_c}
                  <span>&deg;C</span>
                </Typography>
              </Box>
              <Box>
                <Typography variant='medium'>
                  {data.location.name}, {data.location.region}
                </Typography>
              </Box>
              <Grid container spacing={1} columns={{ xs: 12 }} sx={{ marginTop: '8px' }}>
                <Grid item xs={4}>
                  <Box>
                    <Typography variant='small'>Wind now</Typography>
                    <Typography variant='large'>
                      {data.current.wind_kph}
                      <span className='small-text'>km/h</span>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Typography variant='small'>Humidity</Typography>
                    <Typography variant='large'>
                      {data.current.humidity}
                      <span className='small-text'>%</span>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Typography variant='small'>Precipitation</Typography>
                    <Typography variant='large'>
                      {data.current.precip_mm}
                      <span className='small-text'>mm</span>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </ThemeProvider>
          )}
        </Paper>
      )}
    </>
  )
}
