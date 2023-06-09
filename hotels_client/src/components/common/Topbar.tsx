import { AppBar, Avatar, Box, Container, IconButton, Toolbar, Tooltip, Typography } from "@mui/material"

import sizeConfigs from "../../configs/sizeConfigs"
import colorConfigs from "../../configs/colorConfigs"

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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={() => { }} sx={{ p: 0 }}>
                <Avatar alt="A" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Topbar