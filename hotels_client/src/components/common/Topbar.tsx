import { AppBar, Toolbar, Typography } from "@mui/material"

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
      }}
    >
      <Toolbar>
        <Typography variant="h6">
          Hotel Recommendation
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar