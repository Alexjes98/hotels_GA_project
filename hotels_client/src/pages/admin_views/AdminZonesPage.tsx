import { Fragment, useState, useEffect } from "react"
import { Button} from "@mui/material"
import { Add } from "@mui/icons-material"

import LoadingSpinner from "../../components/common/LoadingSpinner"
import { getZones } from "../../api/hotels.api"
import ZoneAdminForm from "../../components/zone_admin_form/ZoneAdminForm"
import ZoneDTO from "../../dto/zones/ZoneDTO"


const AdminZonesPage = () => {

    const [loading, setLoading] = useState(true)    
    const [zones, setZones] = useState<ZoneDTO[]>([])
    
    const [addHotel, setAddHotel] = useState(false)

    const handleAddHotel = () => {
        setAddHotel(!addHotel)
    }

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        getZones().then((response) => {
            setZones(response.data.zones)
            setLoading(false)
        }
        )
    }

    return (
        <Fragment>
            <h2>Zones Info Page</h2>
            <Button variant="outlined" onClick={handleAddHotel} startIcon={<Add />}>
                Add zone
            </Button>
            <LoadingSpinner show={loading} ></LoadingSpinner>
            {addHotel && <ZoneAdminForm doc_id="" zone_id="" new_zone={true} />}
            {zones && zones.map((zone) => (
                <ZoneAdminForm key={zone.doc_id} zone_id={zone.name} doc_id={zone.doc_id} new_zone={false} />                
            ))}
        </Fragment>
    )
}

export default AdminZonesPage