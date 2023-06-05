import { Button, Card, Grid, TextField } from '@mui/material'
import React, { Fragment, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SendIcon from '@mui/icons-material/Send';
import { deleteZone, postZone, putZone } from '../../api/hotels.api';

type Props = {
    zone_id: string,
    doc_id: string,
    new_zone: boolean
}

const ZoneAdminForm = (props: Props) => {
    const { zone_id: zone, new_zone: new_zone, doc_id: doc_id} = props
    const [editMode, setEditMode] = useState(new_zone)
    const [zoneId, setZoneId] = useState(zone)

    const handleDelete = () => {
        deleteZone({zone_id: doc_id})
        window.location.reload();        
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZoneId(event.target.value);
                
    }

    const handleEdit = () => {
        setEditMode(!editMode)
    }

    const handleSubmit = () => {
        const data = {"zone_id": zoneId}
        if(new_zone){
            postZone(data)
        }else{
            putZone(data)
        }
        setEditMode(false)
        window.location.reload();
    }

    return (
        <Fragment>
                <Card sx={{margin: '10px 0'}}>
                    <Grid container px={3} py={2} justifyContent="space-between" alignItems='center'>
                        <Grid item>
                            { editMode ? <TextField onChange={handleOnChange} name='zone_id' defaultValue={zone}></TextField> :<h3>{zone}</h3>}
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={handleEdit} startIcon={<EditIcon />}>
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleDelete}
                                color='error'
                                startIcon={<DeleteIcon />}>
                                Delete
                            </Button>
                            {editMode && <Button onClick={() => handleSubmit()} variant="outlined" startIcon={<SendIcon />}>Send</Button>}
                        </Grid>
                    </Grid>
                </Card>
        </Fragment>
    )
}

export default ZoneAdminForm