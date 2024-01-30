import { ImageList, ImageListItem, ImageListItemBar, useMediaQuery, useTheme } from '@mui/material'
import Image from 'mui-image'
import { Link } from 'react-router-dom'

import { useDispatch} from 'react-redux';
import { setSelectedZone } from '../../redux/features/selectedZone';

import assets from '../../assets'
import {ZoneImgDTO} from '../../dto/zones/ZoneDTO';


type ZonePageProps = {
  destiny: string,
}

const ZonesPage = (props: ZonePageProps) => {
  const itemData: ZoneImgDTO[] = assets.images.zones
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xl'));

  const cols = isSmallScreen ? 1 : 4;

  const dispatch = useDispatch();

  const handleClick = (zone: string ) => {
    dispatch(setSelectedZone(zone));
  };

  return (
    <div>
      <h3>Select your destination</h3>
      <ImageList sx={{ width: 'auto' }} cols={cols} rowHeight={300}>
        {itemData.map((item,index) => (
          <Link key={index} to={`/${props.destiny}/` + item.link}  onClick={() => handleClick(item.name)} >
            <ImageListItem key={item.link+item.name}>
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