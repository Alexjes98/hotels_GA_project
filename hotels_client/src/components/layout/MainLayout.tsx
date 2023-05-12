import { Outlet } from 'react-router-dom'
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import Topbar from '../common/Topbar'
import Sidebar from '../common/Sidebar'

import sizeConfigs from '../../configs/sizeConfigs'
import colorConfigs from '../../configs/colorConfigs'

const MainLayout = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xl'));

    const screenSize = isSmallScreen ? `calc(100%)` : `calc(100% - ${sizeConfigs.sidebar.width})`

    return (
        <Box
            sx={{ display: "flex" }}>
            <Topbar screenSize={screenSize} />
            {!isSmallScreen && <Box
                component="nav"
                sx={{
                    width: sizeConfigs.sidebar.width,
                    flexShrink: 0,
                }}
            >
                <Sidebar />
            </Box>
            }
            <Box
                component="main"
                sx={{
                    floexGrow: 1,
                    p: 3,
                    width: screenSize,
                    minHeight: "100vh",
                    backgroundColor: colorConfigs.background.main,
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    )
}

export default MainLayout