import { Button, useMediaQuery, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, FormLabel, Grid, Stack, TextField, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { invalidNumber } from '../../utils/validator'
import { generateHotelBenefits, generateMapURL } from '../../utils/hotel_field_generator'
import assets from '../../assets'

import LoadingSpinner from '../../components/common/LoadingSpinner'
import StarsRating from '../../components/hotel/StarsRating'
import BenefitsDisplay from '../../components/hotel/BenefitsDisplay'

import { RootState } from '../../redux/store'

import { getRecommendation } from '../../api/hotels.api'

const RecommendationFormPage = () => {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [formError, setFormError] = useState(false)
    const [numRecommendations, setNumRecommendations] = useState(0)
    const [hotels, setHotels] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [dataRetrieved, setDataRetrieved] = useState(false)

    const selectedZoneName = useSelector((state: RootState) => state.selectedZone.selectedZoneName);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (invalidNumber(numRecommendations.toString())) return setFormError(true)
        setLoading(true)
        setDataRetrieved(false)
        getRecommendation(numRecommendations).then(res => {
            setLoading(false)
            setHotels(sortHotels(res.data.hotels))
            setDataRetrieved(true)
        }).catch(err => {
            setLoading(false)
            console.log(err)
        }
        )
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (invalidNumber(e.target.value)) {
            return setFormError(true)
        }
        setFormError(false)
        console.log(numRecommendations)
        return setNumRecommendations(parseInt(e.target.value))
    }

    const sortHotels = (hotels: any[]) => {
        return hotels.sort((a, b) => {
            if (a.global_score > b.global_score) return -1
            if (a.global_score < b.global_score) return 1
            return 0
        })
    }

    return (
        <div>
            <h1>Recomendación de Hoteles en {selectedZoneName}</h1>
            <h3>Select your preferences</h3>
            <form action="GET" onSubmit={handleSubmit}>
                <Card sx={{ padding: '40px' }}>
                    <Stack spacing={2}>
                        <FormLabel>Number of recommendations</FormLabel>
                        <TextField
                            id='num_recommendations'
                            name='num_recommendations'
                            helperText={formError ? 'Please enter a valid number' : ''}
                            onChange={handleChange}
                            type='number'
                            error={formError}
                        >
                        </TextField>
                        <Button
                            sx={{ margin: '10px 0px 0px 0px' }}
                            type='submit' variant='contained'
                            disabled={loading}>
                            Send
                        </Button>
                    </Stack>
                </Card>
            </form>
            <LoadingSpinner show={loading} ></LoadingSpinner>
            {dataRetrieved && <div>
                <Divider sx={{ padding: '5px 0px' }} />
                <h3>Best options in {selectedZoneName}</h3>
                <Grid container rowSpacing={5} columnSpacing={5} columns={isSmallScreen ? 1 : 12} alignContent='center'>
                    {hotels.map((hotel, index) => (
                        <Grid key={index} item xs={4} sx={{ maxWidth: 500, maxHeight: 'auto' }}>
                            <Card key={index} sx={{ maxWidth: 500, height: 500 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={assets.images.hotels[index].src}
                                        alt={`${hotel.name}`}
                                    />
                                    <CardContent>
                                        <Grid height={70} container alignContent="space-between" justifyContent="stretch">
                                            <Grid id='name' item xs={6} >
                                                <h2>{hotel.name}</h2>
                                            </Grid>
                                            <Grid id='stars' item xs={6}>
                                                <StarsRating rating={hotel.hotel_stars} />
                                            </Grid>
                                        </Grid>
                                        <BenefitsDisplay attributes={generateHotelBenefits(hotel)} />
                                        <h2>Score: {hotel.global_score}</h2>
                                        <h3>Average Price: {hotel.price}$</h3>
                                        <h4>Average Category: {hotel.category}</h4>
                                        <h4>Service: {hotel.service_type}</h4>
                                        {/* <Benefits /> */}


                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <a href={generateMapURL(hotel.geolocation)} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
                                    <Button size="small" color="primary">
                                        Share
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
            }
        </div>
    )
}

export default RecommendationFormPage