import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Grid } from '@mui/material';

type Props = {
    rating: number
}

const StarsRating = (props: Props) => {
    const stars = Array(5).fill(0)
    return (

        <Grid container justifyContent='end' sx={{padding: '9px 0'}}>
            {stars.map((star, index) => {
                if (index < props.rating) {
                    return (
                        <Grid item>
                            <StarIcon key={`${star} + ${index}`}></StarIcon>
                        </Grid>
                    )
                }
                return (<Grid item><StarBorderIcon key={`${star} + ${index}`}></StarBorderIcon></Grid>)
            })}

        </Grid>

    )
}

export default StarsRating