
import { CreditCard, FreeBreakfast, Language, Recycling, Security, Payments } from '@mui/icons-material';
import { Grid } from '@mui/material';

type Props = {
    attributes: any
}

const BenefitsDisplay = (props: Props) => {

    const icons = [
        {
            icon: <CreditCard />,
            active: props.attributes.creditCard,
        },
        {
            icon: <Language />,
            active: props.attributes.english,
        },
        {
            icon: <Recycling />,
            active: props.attributes.sustainable_trip,
        },
        {
            icon: <FreeBreakfast />,
            active: props.attributes.includes_breakfast,
        },
        {
            icon: <Security />,
            active: props.attributes.security_cameras,
        },
        {
            icon: <Payments />,
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