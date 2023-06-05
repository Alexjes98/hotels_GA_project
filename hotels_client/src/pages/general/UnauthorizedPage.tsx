import { Box, Button, Typography } from "@mui/material"
import { Fragment } from "react"

const UnauthorizedPage = () => {
    return (
        <Fragment>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <Box textAlign="center">
                    <Typography variant="h4" gutterBottom>
                        403 Unauthorized
                    </Typography>
                    <Button variant="contained" color="primary" href="/">
                        Go to Home
                    </Button>
                </Box>
            </Box>
        </Fragment>
    )
}

export default UnauthorizedPage