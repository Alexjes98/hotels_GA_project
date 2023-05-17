
import { CreditCard, FreeBreakfast, Language, Recycling, Security, Payments } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';

type Props = {
    attributes: any
}

const BenefitsDisplay = (props: Props) => {
    // How to display the name of the preference when hover (optional)

    const icons = [
        {
            icon: <IconButton sx={{ "&:hover": { color: "blue" } }} onClick={() => { }}>
                <CreditCard />
            </IconButton>,
            active: props.attributes.creditCard,
        },
        {
            icon: <IconButton onClick={() => { }}>
                <Language />
            </IconButton>,
            active: props.attributes.english,
        },
        {
            icon: <IconButton> <Recycling /></IconButton>,
            active: props.attributes.sustainable_trip,
        },
        {
            icon: <IconButton><FreeBreakfast /></IconButton>,
            active: props.attributes.includes_breakfast,
        },
        {
            icon: <IconButton><Security /></IconButton>,
            active: props.attributes.security_cameras,
        },
        {
            icon: <IconButton><Payments /></IconButton>,
            active: props.attributes.accept_cash,
        },
    ];

    return (
        <Grid height={50} container spacing={2}>
            {icons.map((icon, index) => (icon.active &&
                <Grid item key={index}>
                    {icon.icon}
                </Grid>
            ))}
        </Grid>
    );
}

export default BenefitsDisplay