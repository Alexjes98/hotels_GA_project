import { Button, Card, CardActionArea, CardActions, CardContent, Checkbox, Grid, Input, TextField } from '@mui/material'
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
        if(!editMode) setExpanded(true)
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
    //TODO Optimize this view
    return (
        <Fragment>
            <form action="PUT" onSubmit={handleSubmit}>
                <Card sx={{ padding: 0, marginY: 5 }}>
                    <CardContent>
                        <Grid container>
                            <Grid id='name' item xs={true}>
                                {editMode ? <TextField sx={{ width: "100%" }} type='text' defaultValue={hotel.name}></TextField > : <h2>{hotel.name}</h2>}
                            </Grid>
                            <Grid id='stars' item xs={6}>
                                {editMode ? <TextField sx={{ width: "100%" }} type="number" defaultValue={hotel.hotel_stars}></TextField > : <StarsRating rating={hotel.hotel_stars} />}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={true}>
                                {editMode ? <TextField sx={{ width: "100%" }} type='number' defaultValue={hotel.global_score}></TextField> : <div>Score: {hotel.global_score}</div>}
                            </Grid>
                            <Grid item xs={true}>
                                {editMode ? <TextField sx={{ width: "100%" }} type='number' defaultValue={hotel.price}></TextField> : <div>Price: {hotel.price}$</div>}
                            </Grid>
                            <Grid item xs={true}>
                                {editMode ? <TextField sx={{ width: "100%" }} type='text' defaultValue={hotel.category}></TextField> : <div>Category: {hotel.category}</div>}
                            </Grid>
                            <Grid item xs={true}>
                                {editMode ? <TextField sx={{ width: "100%" }} type='text' defaultValue={hotel.service_type}></TextField> : <div>Type: {hotel.service_type}</div>}
                            </Grid>
                        </Grid>
                        {editMode ? <TextField sx={{ width: "100%" }} type='text' defaultValue={hotel.geolocation}></TextField> : <h4>Geolocation Coordinates: {hotel.geolocation}</h4>}
                        {expanded && <Fragment>
                            <h4>Benefits</h4>
                            <Grid container>
                                <Grid item xs={true}>
                                    {editMode ? <Checkbox defaultChecked={hotel.accept_cash}></Checkbox > : <div>Accept Cash:<br/>{hotel.accept_cash ? 'Si' : 'No'}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <Checkbox defaultChecked={hotel.accept_pay_cards}></Checkbox > : <div>Accept Paycards:<br/>{hotel.accept_pay_cards ? 'Si' : 'No'}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <Checkbox defaultChecked={hotel.english}></Checkbox > : <div>English:<br/>{hotel.english ? 'Si' : 'No'}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <Checkbox defaultChecked={hotel.includes_breakfast}></Checkbox > : <div>Includes Breakfast:<br />{hotel.includes_breakfast ? 'Si' : 'No'}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <Checkbox defaultChecked={hotel.security_cameras}></Checkbox > : <div>Security Cameras:<br/>{hotel.security_cameras ? 'Si' : 'No'}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <Checkbox defaultChecked={hotel.sustainable_trip}></Checkbox > : <div>Sustainable Trip:<br/>{hotel.sustainable_trip ? 'Si' : 'No'}</div>}
                                </Grid>
                            </Grid>
                            <h4>Scores</h4>
                            <Grid container>
                                <Grid item xs={true}>
                                    {editMode ? <TextField sx={{ width: "100%" }} type='number' label="Confort" defaultValue={hotel.confort_score}></TextField> : <div>Confort:<br/>{hotel.confort_score}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <TextField sx={{ width: "100%" }} type='number' label="Free Wi-Fi" defaultValue={hotel.free_wifi_score}></TextField> : <div>Free WiFi:<br/>{hotel.free_wifi_score}</div>}

                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <TextField sx={{ width: "100%" }} type='number' label="Instalations" defaultValue={hotel.instalations_score}></TextField> : <div>Instalations:<br/>{hotel.instalations_score}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <TextField sx={{ width: "100%" }} type='number' label="Personal" defaultValue={hotel.personal_score}></TextField> : <div>Personal:<br/>{hotel.personal_score}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <TextField sx={{ width: "100%" }} type='number' label="Cleanliness" defaultValue={hotel.cleanliness_score}></TextField> : <div>Cleanness:<br/>{hotel.cleanliness_score}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <TextField sx={{ width: "100%" }} type='number' label="Location" defaultValue={hotel.location_score}></TextField> : <div>Location:<br/>{hotel.location_score}</div>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <TextField sx={{ width: "100%" }} type='number' label="Price/Quality" defaultValue={hotel.price_quality_score}></TextField> : <div>Price/Quality:<br/>{hotel.price_quality_score}</div>}
                                </Grid>
                            </Grid>
                            <h4>Distances</h4>
                            <Grid container>
                                <Grid item xs={true}>
                                    {editMode ? <TextField sx={{ width: "100%" }} type='number' defaultValue={hotel.distance_to_beach}></TextField> : <p>To Beach: {hotel.distance_to_beach}</p>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <TextField sx={{ width: "100%" }} type='number' defaultValue={hotel.distance_to_historical_center}></TextField> : <p>To Historical Center: {hotel.distance_to_historical_center}</p>}
                                </Grid>
                                <Grid item xs={true}>
                                    {editMode ? <TextField sx={{ width: "100%" }} type='number' defaultValue={hotel.distance_to_port_and_tourism_police_point}></TextField> : <p>To Port Tourism Police: {hotel.distance_to_port_and_tourism_police_point}</p>}
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