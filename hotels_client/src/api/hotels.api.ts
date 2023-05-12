import axios from 'axios';

const hotelsApi = axios.create({
    baseURL: 'http://localhost:8000/',
});
export const getRecommendation = (num_recommendation: number) => {
    return hotelsApi.get(`recommendation/${num_recommendation}/`);
}
