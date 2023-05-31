import { Button, useMediaQuery, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, FormLabel, Grid, Stack, TextField, useTheme, Checkbox } from '@mui/material'
import { CreditCard, FreeBreakfast, Language, Recycling, Security, Payments } from '@mui/icons-material';
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'

import { invalidNumber } from '../../utils/validator'
import { generateHotelBenefits, generateMapURL } from '../../utils/hotel_field_generator'
import assets from '../../assets'

import LoadingSpinner from '../../components/common/LoadingSpinner'
import StarsRating from '../../components/hotel/StarsRating'
import BenefitsDisplay from '../../components/hotel/BenefitsDisplay'

import { RootState } from '../../redux/store'

import { getRecommendation } from '../../api/hotels.api'

import HotelDTO from '../../dto/hotels/HotelDTO';
import { useParams } from 'react-router-dom';

const RecommendationFormPage = () => {

    const zone_id = useParams().zoneId

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [formError, setFormError] = useState(false)
    const [numRecommendations, setNumRecommendations] = useState(0)
    const [selectedBenefits, setSelectedBenefits] = useState({
        accept_pay_cards: false,
        includes_breakfast: false,
        english: false,
        sustainable_trip: false,
        security_cameras: false,
        accept_cash: false,
    })

    const [hotels, setHotels] = useState<HotelDTO[]>([])

    const [loading, setLoading] = useState(false)
    const [dataRetrieved, setDataRetrieved] = useState(false)

    const selectedZoneName = useSelector((state: RootState) => state.selectedZone.selectedZoneName);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()        
        if (invalidNumber(numRecommendations.toString())) return setFormError(true)
        setLoading(true)
        setDataRetrieved(false)
        getRecommendation({...selectedBenefits,'num_recommendations': numRecommendations,'zone_id': zone_id}).then(res => {
            if(res.status !== 200) return console.log(res)
            setLoading(false)
            setHotels(sortHotels(res.data.hotels))
            setDataRetrieved(true)
        }).catch(err => {
            setLoading(false)
            console.log(err)
        }
        )
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSelectedBenefits({ ...selectedBenefits, [e.target.name]: e.target.checked })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (invalidNumber(e.target.value)) return setFormError(true)
        setFormError(false)
        return setNumRecommendations(parseInt(e.target.value))
    }
    
    const sortHotels = (hotels: HotelDTO[]) => {
        return hotels.sort((a, b) => {
            if (a.global_score > b.global_score) return -1
            if (a.global_score < b.global_score) return 1
            return 0
        })
    }

    return (
        <Fragment>
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
                    <Stack spacing={2} sx={{}}>
                        <h3>Preferences</h3>
                        <Divider sx={{ padding: '5px 0px' }} />
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Checkbox onChange={handleCheckboxChange} name='accept_pay_cards' icon={<CreditCard />} checkedIcon={<CreditCard />} />
                            </Grid>
                            <Grid item >
                                <Checkbox onChange={handleCheckboxChange} name='includes_breakfast' icon={<FreeBreakfast />} checkedIcon={<FreeBreakfast />} />
                            </Grid>
                            <Grid item>
                                <Checkbox onChange={handleCheckboxChange} name='english' icon={<Language />} checkedIcon={<Language />} />
                            </Grid>
                            <Grid item >
                                <Checkbox onChange={handleCheckboxChange} name='sustainable_trip' icon={<Recycling />} checkedIcon={<Recycling />} />
                            </Grid>
                            <Grid item >
                                <Checkbox onChange={handleCheckboxChange} name='security_cameras' icon={<Security />} checkedIcon={<Security />} />
                            </Grid>
                            <Grid item>
                                <Checkbox onChange={handleCheckboxChange} name='accept_cash' icon={<Payments />} checkedIcon={<Payments />} />
                            </Grid>
                        </Grid>
                    </Stack>
                </Card>
            </form>
            <LoadingSpinner show={loading} ></LoadingSpinner>
            {dataRetrieved && <Fragment>
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
            </Fragment>
            }
        </Fragment>
    )
}

export default RecommendationFormPage