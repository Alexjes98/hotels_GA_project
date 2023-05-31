import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RootState } from "../../redux/store"
import { useSelector } from "react-redux"

import { getZoneContent } from "../../api/hotels.api"

import LoadingSpinner from "../../components/common/LoadingSpinner"
import HotelDTO from "../../dto/hotels/HotelDTO"
import { Button, Card, CardActionArea, CardActions, Grid } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { KeyboardArrowDown } from "@mui/icons-material"
import { Add } from "@mui/icons-material"
import StarsRating from "../../components/hotel/StarsRating"

const ZoneInfoPage = () => {
  const zone_id = useParams().zoneId

  const [zoneInfo, setZoneInfo] = useState()
  const [loading, setLoading] = useState(true)
  const [hotels, setHotels] = useState<HotelDTO[]>([])
  const selectedZoneName = useSelector((state: RootState) => state.selectedZone.selectedZoneName);

  useEffect(() => {
    { console.log(zone_id) }
    fetchData()
  }, []);

  const fetchData = async () => {
    getZoneContent({ zone_id: zone_id }).then((res: any) => {
      console.log(res)
      setHotels(res.data.hotels)
      setZoneInfo(res.data)
      setLoading(false)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <Fragment>
      <h2>Zone {selectedZoneName} Info Page</h2>
      <Button variant="outlined" startIcon={<Add />}>
        Add hotel
      </Button>
      <LoadingSpinner show={loading} ></LoadingSpinner>
      {zoneInfo && <Fragment>
        {
          hotels.map((hotel, index) => (
            <Card key={index} sx={{ padding: 5, marginY: 5 }}>
              <CardActionArea>
                <Grid container alignContent='center' rowSpacing={5}>
                  <Grid id='name' item xs={6}>
                    <h2>{hotel.name}</h2>
                  </Grid>
                  <Grid id='stars' item xs={6}>
                    <StarsRating rating={hotel.hotel_stars} />
                  </Grid>
                </Grid>
                <div>{hotel.geolocation}</div>
              </CardActionArea>
              <CardActions>
                <Button variant="outlined" startIcon={<EditIcon />}>
                  Edit
                </Button>
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </CardActions>
              <Grid container justifyContent="center">
                <KeyboardArrowDown/>
              </Grid>
            </Card>
          ))}
      </Fragment>
      }
    </Fragment>
  )
}

export default ZoneInfoPage