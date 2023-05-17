import axios from 'axios';

const hotelsApi = axios.create({
    baseURL: 'http://localhost:8000/',
});
export const getRecommendation = (params: object) => {
    return hotelsApi.get(`recommendation/`,{params: params});
}
