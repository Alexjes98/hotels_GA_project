import { ImageList, ImageListItem, ImageListItemBar, useMediaQuery, useTheme } from '@mui/material'
import Image from 'mui-image'
import { Link } from 'react-router-dom'

import { useDispatch} from 'react-redux';
import { setSelectedZone } from '../../redux/features/selectedZone';

import assets from '../../assets'
const ZonesPage = () => {
  const itemData: any[] = assets.images.zones
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xl'));

  const cols = isSmallScreen ? 1 : 4;

  const dispatch = useDispatch();

  const handleClick = (zone: string ) => {
    console.log(zone)
    dispatch(setSelectedZone(zone));
  };

  return (
    <div>
      <h3>Select your destination</h3>
      <ImageList sx={{ width: 'auto' }} cols={cols} rowHeight={300}>
        {itemData.map((item,index) => (
          <Link key={index} to={'/recommendation/' + item.link}  onClick={() => handleClick(item.name)} >
            <ImageListItem key={item.img}>
              <Image src={item.src}></Image>
              <ImageListItemBar title={item.name ?? ''}></ImageListItemBar>
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
    </div>
  )
}

export default ZonesPage