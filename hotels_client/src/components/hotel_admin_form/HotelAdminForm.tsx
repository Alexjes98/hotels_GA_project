import { Button, Card, CardActionArea, CardActions, CardContent, Grid, Input } from '@mui/material'
import { Fragment, useState } from 'react'
import StarsRating from '../hotel/StarsRating'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import HotelDTO from '../../dto/hotels/HotelDTO'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SendIcon from '@mui/icons-material/Send';

type Props = {
    hotel: HotelDTO
}

const HotelAdminForm = (props: Props) => {
    const { hotel } = props
    const [expanded, setExpanded] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [sending, setSending] = useState(false)

    const handleEditClick = () => {
        setEditMode(!editMode)
        setExpanded(!expanded)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    //TODO: handle submit and modify firebase informatio for the selected hotel
    const handleSubmit = () => {
        setSending(true)
    }

    //TODO: handle delete and remove firebase informatio for the selected hotel
    const handleDelete = () => {
        setSending(true)
    }

    return (
        <Fragment>
            <form action="PUT" onSubmit={handleSubmit}>
                <Card sx={{ padding: 0, marginY: 5 }}>
                    <CardContent>
                        <Grid container alignContent="space-between" justifyContent="stretch">
                            <Grid id='name' item xs={6}>
                                {editMode ? <input type='text' defaultValue={hotel.name}></input> : <h2>{hotel.name}</h2>}
                            </Grid>
                            <Grid id='stars' item xs={6}>
                                {editMode ? <input type="number" defaultValue={hotel.hotel_stars}></input> : <StarsRating rating={hotel.hotel_stars} />}
                            </Grid>
                        </Grid>
                        <Grid container columnSpacing={2}>
                            <Grid item xs={true}>
                                {editMode ? <input type='number' defaultValue={hotel.global_score}></input> : <div>Score: {hotel.global_score}</div>}
                            </Grid>
                            <Grid item xs={true}>
                                {editMode ? <input type='number' defaultValue={hotel.price}></input> : <div>Price: {hotel.price}$</div>}
                            </Grid>
                            <Grid item xs={true}>
                                {editMode ? <input type='text' defaultValue={hotel.category}></input> : <div>Category: {hotel.category}</div>}
                            </Grid>
                            <Grid item xs={true}>
                                {editMode ? <input type='text' defaultValue={hotel.service_type}></input> : <div>Type: {hotel.service_type}</div>}
                            </Grid>
                        </Grid>
                        {editMode ? <input type='text' defaultValue={hotel.geolocation}></input> : <h4>Geolocation Coordinates: {hotel.geolocation}</h4>}
                        {expanded && <Fragment>
                            <h4>Benefits</h4>
                            {editMode ? <input type='checkbox' defaultChecked={hotel.accept_cash}></input> : <p>Accept Cash: {hotel.accept_cash == true ? 'Si' : 'No'}</p>}
                            {editMode ? <input type='checkbox' defaultChecked={hotel.accept_pay_cards}></input> : <p>Accept Paycards: {hotel.accept_pay_cards == true ? 'Si' : 'No'}</p>}
                            {editMode ? <input type='checkbox' defaultChecked={hotel.english}></input> : <p>English: {hotel.english == true ? 'Si' : 'No'}</p>}
                            {editMode ? <input type='checkbox' defaultChecked={hotel.includes_breakfast}></input> : <p>Includes Breakfast: {hotel.includes_breakfast == true ? 'Si' : 'No'}</p>}
                            {editMode ? <input type='checkbox' defaultChecked={hotel.security_cameras}></input> : <p>Security Cameras: {hotel.security_cameras == true ? 'Si' : 'No'}</p>}
                            {editMode ? <input type='checkbox' defaultChecked={hotel.sustainable_trip}></input> : <p>Sustainable Trip: {hotel.sustainable_trip == true ? 'Si' : 'No'}</p>}
                            <h4>Scores</h4>
                            {editMode ? <input type='number' defaultValue={hotel.confort_score}></input> : <p>Confort: {hotel.confort_score}</p>}
                            {editMode ? <input type='number' defaultValue={hotel.free_wifi_score}></input> : <p>Free WiFi: {hotel.free_wifi_score}</p>}
                            {editMode ? <input type='number' defaultValue={hotel.instalations_score}></input> : <p>Instalations: {hotel.instalations_score}</p>}
                            {editMode ? <input type='number' defaultValue={hotel.personal_score}></input> : <p>Personal: {hotel.personal_score}</p>}
                            {editMode ? <input type='number' defaultValue={hotel.cleanliness_score}></input> : <p>Cleanness: {hotel.cleanliness_score}</p>}
                            {editMode ? <input type='number' defaultValue={hotel.location_score}></input> : <p>Location: {hotel.location_score}</p>}
                            {editMode ? <input type='number' defaultValue={hotel.price_quality_score}></input> : <p>Price/Quality: {hotel.price_quality_score}</p>}
                            <h4>Distances</h4>
                            {editMode ? <input type='number' defaultValue={hotel.distance_to_beach}></input> : <p>To Beach: {hotel.distance_to_beach}</p>}
                            {editMode ? <input type='number' defaultValue={hotel.distance_to_historical_center}></input> : <p>To Historical Center: {hotel.distance_to_historical_center}</p>}
                            {editMode ? <input type='number' defaultValue={hotel.distance_to_port_and_tourism_police_point}></input> : <p>To Port Tourism Police: {hotel.distance_to_port_and_tourism_police_point}</p>}
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