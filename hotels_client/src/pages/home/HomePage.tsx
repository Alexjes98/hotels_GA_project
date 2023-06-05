import Image from 'mui-image'
import { Button, Grid } from '@mui/material'
import assets from '../../assets'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Image src={assets.images.home}></Image>
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={{ margin: '20px', textAlign: 'start', justifyContent: 'center' }}>
            <h2>An online tool to get better trip recommendation</h2>
            <p>based on user data and user preferences you can get a more precise recommendation</p>
            <Button component={Link} to={'/zones_link'} variant="contained">
              Get Started
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xl={12}>
          <div style={{ margin: '20px', textAlign: 'start', justifyContent: 'center' }}>
            <h2>Generate a better hotel recommendation based on multiobjetive genetic algorithm</h2>
            <p>You can get a better hotel recommendation based on stars, general score, price and the distance from important turistic sites</p>
          </div>
        </Grid>
      </Grid>



    </div>
  )
}

export default HomePage