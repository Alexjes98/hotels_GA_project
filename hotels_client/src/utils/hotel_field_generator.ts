export const generateHotelBenefits = (hotel: any) => {
    //TODO: Fix any type
    //TODO: Data is unclean some values variations are: "Si", "No", "si", "no", "SI", "NO"
    //TODO: that will lead to some benefits not showing up

    const benefits = <any>{}
    hotel.accept_pay_cards === "Si" ? benefits.creditCard = true : benefits.creditCard = false
    hotel.english === "Si" ? benefits.english = true : benefits.english = false
    hotel.sustainable_trip === "Si" ? benefits.sustainable_trip = true : benefits.sustainable_trip = false
    hotel.includes_breakfast === "Si" ? benefits.includes_breakfast = true : benefits.includes_breakfast = false
    hotel.security_cameras === "Si" ? benefits.security_cameras = true : benefits.security_cameras = false
    hotel.accept_cash === "Si" ? benefits.accept_cash = true : benefits.accept_cash = false
    return benefits
}
export const generateMapURL = (geolocation: string) => {
    const [latitude, longitude] = geolocation.split(',')
    return `https://www.google.com/maps/@${latitude},${longitude}&z=15?hl=es`;
}