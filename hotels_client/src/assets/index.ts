import Logo from './images/logo.png'
import Home from './images/home.jpg'

import Zone1 from './images/zones/cartagena.jpg'
import Zone2 from './images/zones/santa_marta.jpg'
import Zone3 from './images/zones/bogota.jpg'
import Zone4 from './images/zones/medellin.jpg'
import Zone5 from './images/zones/bucaramanga.jpg'
import Zone6 from './images/zones/manizales.jpg'
import Zone7 from './images/zones/barranquilla.jpg'

import Hotel1 from './images/hotels/opt-1.jpg'
import Hotel2 from './images/hotels/opt-2.jpg'
import Hotel3 from './images/hotels/opt-3.jpg'
import Hotel4 from './images/hotels/opt-4.jpg'
import Hotel5 from './images/hotels/opt-5.jpg'
import Hotel6 from './images/hotels/opt-6.jpg'
import Hotel7 from './images/hotels/opt-7.jpg'
import Hotel8 from './images/hotels/opt-8.jpg'
import Hotel9 from './images/hotels/opt-9.jpg'
import Hotel10 from './images/hotels/opt-10.jpg'

const assets = {
    images: {
        logo: Logo,
        home: Home,
        zones: [
            {src: Zone1,link: '1', name: 'Cartagena'},
            {src: Zone2,link: '2', name: 'Santa Marta'},
            {src: Zone3,link: '3', name: 'Bogotá'},
            {src: Zone4,link: '4', name: 'Medellín'},
            {src: Zone5,link: '5', name: 'Bucaramanga'},
            {src: Zone6,link: '6', name: 'Manizales'},
            {src: Zone7,link: '7', name: 'Barranquilla'}
        ],
        hotels: [
            {src: Hotel1,link: '1', name: 'Hotel1'},
            {src: Hotel2,link: '2', name: 'Hotel2'},
            {src: Hotel3,link: '3', name: 'Hotel3'},
            {src: Hotel4,link: '4', name: 'Hotel4'},
            {src: Hotel5,link: '5', name: 'Hotel5'},
            {src: Hotel6,link: '6', name: 'Hotel6'},
            {src: Hotel7,link: '7', name: 'Hotel7'},
            {src: Hotel8,link: '8', name: 'Hotel8'},
            {src: Hotel9,link: '9', name: 'Hotel9'},
            {src: Hotel10,link: '10', name: 'Hotel10'}
        ]

    }
    
}

export default assets;