import React, { useEffect, useState } from 'react';
import { getCountries } from '../../services/countries.services';
import Link from 'next/link';
import Loader from '../../components/loaders/Loader';

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCountries = async () => {
        try {
            const data = await getCountries();
            console.log("data", data[0])
            setCountries(data);
        } catch (err) {
            setError('Error al cargar los países');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    if (loading) {
        return <Loader pageName={'home'}/>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="bg-gradient-to-b from-black to-gray-800 mx-auto text-white p-4">
            <h1 className="text-2xl font-bold mb-4">Select one of our available countries</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {countries.map((country) => (
                    <Link key={country.countryCode} href={`/country/${country.countryCode}`}>
                        <div className="cursor-pointer border border-gray-300 p-4 rounded-lg shadow-sm hover:bg-gray-300 hover:text-black">
                            <h2 className="text-xl font-semibold"><span className="text-gray-600">{country.countryCode}</span> {country.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Countries;