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


