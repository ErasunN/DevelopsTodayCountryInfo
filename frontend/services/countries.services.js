import axios from 'axios';

export const getCountries = async () => {
    try {
        const response = await axios.get('http://localhost:15000/countries');
        return response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
};
