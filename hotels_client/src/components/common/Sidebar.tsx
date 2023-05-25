
import { List, Drawer, Toolbar, Stack, Avatar} from '@mui/material'

import sizeConfigs from '../../configs/sizeConfigs'
import assets from '../../assets'
import colorConfigs from '../../configs/colorConfigs'
import appRoutes from '../../routes/appRoutes'
import SidebarItem from './SidebarItem'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sizeConfigs.sidebar.width,
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: colorConfigs.sidebar.background,
          color: colorConfigs.sidebar.color,
        }
      }}
    >
      <List disablePadding>
        <Toolbar>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="center"
          >
            <Link to='/'>
            <Avatar sx={{margin: '20px 0px', padding: '20px', width: '150px', height: '150px', backgroundColor: colorConfigs.background.main }} src={assets.images.logo}></Avatar>
            </Link>
          </Stack>
        </Toolbar>
        {appRoutes.map((route, index) => (
          route.sidebarProps ? (
            <SidebarItem item={route} key={index} />
          ) : null
        )
        )
        }
      </List>

    </Drawer>
  )
}

export default Sidebar