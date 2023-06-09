import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Grid } from '@mui/material';

type Props = {
    rating: string
}

const StarsRating = (props: Props) => {
    const stars = Array(5).fill(0)
    const rating = isNaN(parseInt(props.rating)) ? 0 : parseInt(props.rating)
    return (

        <Grid container justifyContent='end' sx={{padding: '9px 0'}}>
            {stars.map((star, index) => {
                if (index < rating) {
                    return (
                        <Grid item key={index}>
                            <StarIcon key={`${star} + ${index}`}></StarIcon>
                        </Grid>
                    )
                }
                return (<Grid item key={index}><StarBorderIcon key={`${star} + ${index}`}></StarBorderIcon></Grid>)
            })}

        </Grid>

    )
}

export default StarsRating