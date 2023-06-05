import { AppBar, Container, Toolbar, Typography } from "@mui/material"

import sizeConfigs from "../../configs/sizeConfigs"
import colorConfigs from "../../configs/colorConfigs"
import { Link } from "react-router-dom"

type Props = {
  screenSize: string,
}

const Topbar = (props: Props) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: props.screenSize,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.background,
        color: colorConfigs.topbar.color,
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography 
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              color: colorConfigs.topbar.color,
              textDecoration: 'none',
              fontFamily: 'monospace',
              mr: 2,
            }}>
            Home
          </Typography>
          <Typography 
          variant="h6" 
          noWrap 
          component="a" 
          href="/admin_dashboard"
          sx={{
            color: colorConfigs.topbar.color,
            textDecoration: 'none',
            fontFamily: 'monospace',
            mr: 2,
          }}>
            Admin
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Topbar