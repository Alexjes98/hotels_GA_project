import { Button, Card, CardActionArea, CardActions, CardContent, Checkbox, Grid, TextField } from '@mui/material'
import { Fragment, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'

import StarsRating from '../hotel/StarsRating'
import HotelDTO from '../../dto/hotels/HotelDTO'
import { deleteHotel, postHotel, putHotel } from '../../api/hotels.api'

type Props = {
    hotel: HotelDTO,
    zone_id: string,
    new_hotel: boolean
}

const HotelAdminForm = (props: Props) => {
    const { hotel, zone_id, new_hotel } = props
    const [expanded, setExpanded] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [sending, setSending] = useState(false)

    const handleEditClick = () => {
        setEditMode(!editMode)
        if (!editMode) setExpanded(true)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const generateHotelDTO = (formData: FormData): HotelDTO => {
        const formDataArray = Array.from(formData.entries());
        const formDataObject = Object.fromEntries(formDataArray);
        const hotelDTO: HotelDTO = {
            id: hotel.id,
            accept_cash: Boolean(formDataObject.accept_cash),
            accept_pay_cards: Boolean(formDataObject.accept_pay_cards),
            category: String(formDataObject.category),
            cleanliness_score: String(formDataObject.cleanliness_score),
            confort_score: String(formDataObject.confort_score),
            distance_to_beach: String(formDataObject.distance_to_beach),
            distance_to_historical_center: String(formDataObject.distance_to_historical_center),
            distance_to_port_and_tourism_police_point: String(formDataObject.distance_to_port_and_tourism_police_point),
            english: Boolean(formDataObject.english),
            free_wifi_score: String(formDataObject.free_wifi_score),
            geolocation: String(formDataObject.geolocation),
            global_score: String(formDataObject.global_score),
            hotel_stars: String(formDataObject.hotel_stars),
            includes_breakfast: Boolean(formDataObject.includes_breakfast),
            instalations_score: String(formDataObject.instalations_score),
            location_score: String(formDataObject.location_score),
            name: String(formDataObject.name),
            personal_score: String(formDataObject.personal_score),
            price: String(formDataObject.price),
            price_quality_score: String(formDataObject.price_quality_score),
            security_cameras: Boolean(formDataObject.security_cameras),
            service_type: String(formDataObject.service_type),
            sustainable_trip: Boolean(formDataObject.sustainable_trip),
        }
        return hotelDTO
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSending(true)
        const formData = new FormData(event.currentTarget);
        const formDataObject = generateHotelDTO(formData)

        const send = { hotel: formDataObject, zone_id: zone_id }
        if (new_hotel) {
            postHotel(send).catch(err => {
                console.log(err)
            }
            )
        } else {
            putHotel(send).catch(err => {
                console.log(err)
            }
            )
        }
        window.location.reload()
    }

    const handleDelete = () => {
        deleteHotel({ hotel_id: hotel.id, zone_id: zone_id }).catch(err => {
            console.log(err)
        }
        )
        window.location.reload()
    }
    //TODO Optimize this view
    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <Card sx={{ padding: 0, marginY: 5 }}>
                    <CardContent>
                        <Grid container>
                            <Grid id='name' item xs={true}>
                                {editMode ? <TextField label="Name" name='name' sx={{ width: "100%" }} type='text' defaultValue={hotel.name}></TextField > : <h2>{hotel.name}</h2>}
                            </Grid>
                            <Grid id='stars' item xs={6}>
                                {editMode ? <TextField label="Stars" name='hotel_stars' sx={{ width: "100%" }} type="number" defaultValue={hotel.hotel_stars}></TextField > : <StarsRating rating={hotel.hotel_stars} />}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={true}>
                                {editMode ? <TextField label="Score" name='global_score' sx={{ width: "100%" }} type='number' defaultValue={hotel.global_score}></TextField> : <div>Score: {hotel.global_score}</div>}
                            </Grid>
                            <Grid item xs={true}>
                                {editMode ? <TextField label="Price" name='price' sx={{ width: "100%" }} type='number' defaultValue={hotel.price}></TextField> : <div>Price: {hotel.price}$</div>}
                            </Grid>
                            <Grid item xs={true}>
                                {editMode ? <TextField label="Category" name='category' sx={{ width: "100%" }} type='text' defaultValue={hotel.category}></TextField> : <div>Category: {hotel.category}</div>}
                            </Grid>
                            <Grid item xs={true}>
                                {editMode ? <TextField label="Type" name='service_type' sx={{ width: "100%" }} type='text' defaultValue={hotel.service_type}></TextField> : <div>Type: {hotel.service_type}</div>}
                            </Grid>
                        </Grid>
                        {editMode ? <TextField label="Geolocation" name='geolocation' sx={{ width: "100%" }} type='text' defaultValue={hotel.geolocation}></TextField> : <h4>Geolocation Coordinates: {hotel.geolocation}</h4>}
                        {expanded && <Fragment>
                            <h4>Benefits</h4>
                            <Grid container>
                                <Grid item xs={true}>

                                    {editMode ? <Checkbox name='accept_cash' value={hotel.accept_cash ? true : false} defaultChecked={hotel.accept_cash}></Checkbox > : <div>Accept Cash:<br />{hotel.accept_cash ? 'Si' : 'No'}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <Checkbox name='accept_pay_cards' value={hotel.accept_pay_cards ? true : false} defaultChecked={hotel.accept_pay_cards}></Checkbox > : <div>Accept Paycards:<br />{hotel.accept_pay_cards ? 'Si' : 'No'}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <Checkbox name='english' value={hotel.english ? true : false} defaultChecked={hotel.english}></Checkbox > : <div>English:<br />{hotel.english ? 'Si' : 'No'}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <Checkbox name='includes_breakfast' value={hotel.includes_breakfast ? true : false} defaultChecked={hotel.includes_breakfast}></Checkbox > : <div>Includes Breakfast:<br />{hotel.includes_breakfast ? 'Si' : 'No'}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <Checkbox name='security_cameras' value={hotel.security_cameras ? true : false} defaultChecked={hotel.security_cameras}></Checkbox > : <div>Security Cameras:<br />{hotel.security_cameras ? 'Si' : 'No'}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <Checkbox name='sustainable_trip' value={hotel.sustainable_trip ? true : false} defaultChecked={hotel.sustainable_trip}></Checkbox > : <div>Sustainable Trip:<br />{hotel.sustainable_trip ? 'Si' : 'No'}</div>}
                                </Grid>
                            </Grid>
                            <h4>Scores</h4>
                            <Grid container>
                                <Grid item xs={true}>
                                    {editMode ? <TextField name='confort_score' sx={{ width: "100%" }} type='number' label="Confort" defaultValue={hotel.confort_score}></TextField> : <div>Confort:<br />{hotel.confort_score}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <TextField name='free_wifi_score' sx={{ width: "100%" }} type='number' label="Free Wi-Fi" defaultValue={hotel.free_wifi_score}></TextField> : <div>Free WiFi:<br />{hotel.free_wifi_score}</div>}

                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <TextField name='instalations_score' sx={{ width: "100%" }} type='number' label="Instalations" defaultValue={hotel.instalations_score}></TextField> : <div>Instalations:<br />{hotel.instalations_score}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <TextField name='personal_score' sx={{ width: "100%" }} type='number' label="Personal" defaultValue={hotel.personal_score}></TextField> : <div>Personal:<br />{hotel.personal_score}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <TextField name='cleanliness_score' sx={{ width: "100%" }} type='number' label="Cleanliness" defaultValue={hotel.cleanliness_score}></TextField> : <div>Cleanness:<br />{hotel.cleanliness_score}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <TextField name='location_score' sx={{ width: "100%" }} type='number' label="Location" defaultValue={hotel.location_score}></TextField> : <div>Location:<br />{hotel.location_score}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <TextField name='price_quality_score' sx={{ width: "100%" }} type='number' label="Price/Quality" defaultValue={hotel.price_quality_score}></TextField> : <div>Price/Quality:<br />{hotel.price_quality_score}</div>}
                                </Grid>
                            </Grid>
                            <h4>Distances</h4>
                            <Grid container>
                                <Grid item xs={true}>
                                    {editMode ? <TextField label='To Beach' name='distance_to_beach' sx={{ width: "100%" }} type='number' defaultValue={hotel.distance_to_beach}></TextField> : <p>To Beach: {hotel.distance_to_beach}</p>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <TextField label='To Historical Center' name='distance_to_historical_center' sx={{ width: "100%" }} type='number' defaultValue={hotel.distance_to_historical_center}></TextField> : <p>To Historical Center: {hotel.distance_to_historical_center}</p>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <TextField label='To Port' name='distance_to_port_and_tourism_police_point' sx={{ width: "100%" }} type='number' defaultValue={hotel.distance_to_port_and_tourism_police_point}></TextField> : <p>To Port Tourism Police: {hotel.distance_to_port_and_tourism_police_point}</p>}
                                </Grid>
                            </Grid>
                        </Fragment>
                        }
                    </CardContent>
                    <CardActionArea>
                        <CardActions>
                            <Button variant="outlined" onClick={handleExpandClick} startIcon={<OpenInFullIcon />}>
                                Expand
                            </Button>
                            <Button variant="outlined" onClick={handleEditClick} startIcon={<EditIcon />}>
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleDelete}
                                color='error'
                                startIcon={<DeleteIcon />}>
                                Delete
                            </Button>
                            {editMode && <Button variant="outlined"
                                type='submit'
                                disabled={sending}
                                startIcon={<SendIcon />}
                            >
                                Send
                            </Button>
                            }
                        </CardActions>
                    </CardActionArea>
                </Card>
            </form>
        </Fragment>
    )

}
export default HotelAdminForm