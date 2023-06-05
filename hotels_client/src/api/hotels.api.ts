import axios from 'axios';

const hotelsApi = axios.create({
    baseURL: 'http://localhost:8000/',
});
export const getRecommendation = (params: object) => {
    return hotelsApi.get(`recommendation/`,{params: params});
}
export const getZoneContent = (params: object) => {
    return hotelsApi.get(`zone/`,{params: params});
}

export const getHotel = (params: object) => {
    return hotelsApi.get(`hotel/`,{params: params});
}

export const postHotel = (data: object) => {
    return hotelsApi.post(`hotel/`,data);
}

export const putHotel = (data: object) => {
    return hotelsApi.put(`hotel/`,data);
}

export const deleteHotel = (params: object) => {
    return hotelsApi.delete(`hotel/`,{params: params});
}

export const getZones = () => {
    return hotelsApi.get(`zones/`);
}

export const postZone = (data: object) => {
    return hotelsApi.post(`zone/add/`,data);
}

export const putZone = (data: object) => {    
    return hotelsApi.put(`zone/modify/`,{data: data});
}

export const deleteZone = (params: object) => {
    return hotelsApi.delete(`zone/delete/`,{params: params});
}


