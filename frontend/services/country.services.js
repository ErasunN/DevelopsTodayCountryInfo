import axios from 'axios';

export const getCountryByCode = async (code) => {
    try {
        const response = await axios.get(`http://localhost:15000/country/${code}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el país con código ${code}:`, error);
        throw error;
    }
};