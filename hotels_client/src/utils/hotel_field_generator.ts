export const generateHotelBenefits = (hotel: any) => {
    const benefits = {
        creditCard: hotel.accept_pay_cards,
        english: hotel.english,
        sustainable_trip: hotel.sustainable_trip,
        includes_breakfast: hotel.includes_breakfast,
        security_cameras: hotel.security_cameras,
        accept_cash: hotel.accept_cash
    }
    return benefits
}
export const generateMapURL = (geolocation: string) => {
    const [latitude, longitude] = geolocation.split(',')
    return `https://www.google.com/maps/@${latitude},${longitude}&z=15?hl=es`;
}