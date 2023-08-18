import axios from 'axios';
export const fetcher = async (url) => {
    const response = await axios(url);
    return response.data;
};
