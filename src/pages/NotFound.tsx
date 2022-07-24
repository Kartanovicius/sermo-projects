import React, { useEffect, useState } from 'react'
// Material-UI
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  CssBaseline,
  Typography,
} from '@mui/material'
// Router dom
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

interface IMeme {
  postLink: string
  subreddit: string
  title: string
  url: string
  nsfw: boolean
  spoiler: boolean
  author: string
  ups: number
  preview: string[]
}

export default function NotFound() {
  const navigate = useNavigate()
  const [meme, setMeme] = useState<IMeme>()

  useEffect(() => {
    return () => {
      fetch('https://meme-api.herokuapp.com/gimme')
        .then((response) => response.json())
        .then((data: IMeme) => {
          setMeme(data)
        })
    }
  }, [])

  return (
    <>
      <CssBaseline />
      {meme && (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ maxWidth: 400, mt: 8 }}>
            <CardHeader title={meme?.title} />
            <CardMedia component='img' height='auto' image={meme?.preview[2]} alt='Paella dish' />
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                {"Looks like page is missing but don't worry we have meme for you instead"}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button onClick={() => navigate(ROUTES.MAIN)}>Go to MainPage</Button>
            </CardActions>
          </Card>
        </Container>
      )}
    </>
  )
}
