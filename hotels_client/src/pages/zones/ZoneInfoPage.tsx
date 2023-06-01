import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Button} from "@mui/material"
import { Add } from "@mui/icons-material"

import { RootState } from "../../redux/store"

import { getZoneContent } from "../../api/hotels.api"
import HotelDTO from "../../dto/hotels/HotelDTO"
import { getEmptyHotel } from "../../utils/empty_objects"
import LoadingSpinner from "../../components/common/LoadingSpinner"
import HotelAdminForm from "../../components/hotel_admin_form/HotelAdminForm"

const ZoneInfoPage = () => {
  const zone_id = useParams().zoneId

  const emptyHotel = getEmptyHotel()

  const [zoneInfo, setZoneInfo] = useState()
  const [loading, setLoading] = useState(true)
  const [hotels, setHotels] = useState<HotelDTO[]>([])

  const [addHotel, setAddHotel] = useState(false)

  const selectedZoneName = useSelector((state: RootState) => state.selectedZone.selectedZoneName);

  const handleAddHotel = () => {
    setAddHotel(!addHotel)
  }
  
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
      <Button variant="outlined" onClick={handleAddHotel} startIcon={<Add />}>
        Add hotel
      </Button>
      {addHotel && <HotelAdminForm hotel={emptyHotel}/>}
      <LoadingSpinner show={loading} ></LoadingSpinner>
      {zoneInfo && <Fragment>
        {
          hotels.map((hotel, index) => (
            <HotelAdminForm key={index} hotel={hotel}/>
          ))}
      </Fragment>
      }
    </Fragment>
  )
}

export default ZoneInfoPage