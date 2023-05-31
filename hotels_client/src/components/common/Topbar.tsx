import { AppBar, Toolbar, Typography } from "@mui/material"

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
      }}
    >
      <Toolbar sx={{alignContent: "space-between"}}>
        <Link to={"/"}>
          <Typography variant="h6">
            Hotel Recommendation
          </Typography>
        </Link>
        <Link to={"/admin_dashboard"}>
        <Typography variant="h6">
          Admin
        </Typography>
        </Link>

      </Toolbar>

    </AppBar>
  )
}

export default Topbar