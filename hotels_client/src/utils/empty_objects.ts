import HotelDTO from "../dto/hotels/HotelDTO";

export function getEmptyHotel(): HotelDTO {
    return {
        accept_cash: false,
        accept_pay_cards: false,
        category: "",
        cleanliness_score: "",
        confort_score: "",
        distance_to_beach: "",
        distance_to_historical_center: "",
        distance_to_port_and_tourism_police_point: "",
        english: false,
        free_wifi_score: "",
        geolocation: "",
        global_score: "",
        id: "",
        hotel_stars: "",
        includes_breakfast: false,
        instalations_score: "",
        location_score: "",
        name: "",
        personal_score: "",
        price: "",
        price_quality_score: "",
        security_cameras: false,
        service_type: "",
        sustainable_trip: false
      }
  }