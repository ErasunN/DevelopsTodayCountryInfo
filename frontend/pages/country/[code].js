import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCountryByCode } from '../../services/country.services';
import { Line } from 'react-chartjs-2';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../../components/loaders/Loader'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CountryDetails = () => {
    const router = useRouter();
    const { code } = router.query;
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (code) {
            const fetchCountry = async () => {
                try {
                    const data = await getCountryByCode(code);
                    setCountry(data);
                } catch (err) {
                    setError('Error al cargar los detalles del país');
                } finally {
                    setLoading(false);
                }
            };

            fetchCountry();
        }
    }, [code]);

    if (loading) {
        return <Loader pageName={code}/>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!country) {
        return <p>No se encontró el país.</p>;
    }

    // Datos para el gráfico de población
    const populationData = {
        labels: country.population.populationCounts.map((count) => count.year),
        datasets: [
            {
                label: 'Population',
                data: country.population.populationCounts.map((count) => count.value),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            }
        ],
    };

    return (
        <div className="bg-gradient-to-b from-black to-gray-800 mx-auto text-white p-4">
            <div className="flex flex-col md:flex-row items-start">
                <div className="mb-4 md:mb-0 md:mr-4">
                    <Image
                        src={country.flag?.flag}
                        alt={`${country.info.commonName} flag`}
                        width={300}
                        height={175}
                        className="rounded-lg shadow-lg"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-2">{country.info.commonName}</h1>
                    <p className="text-lg text-gray-600 mb-1"><strong>Nombre Oficial:</strong> {country.info.officialName}</p>
                    <p className="text-lg text-gray-600 mb-1"><strong>Código del País:</strong> {country.info.countryCode}</p>
                    <p className="text-lg text-gray-600 mb-1"><strong>Región:</strong> {country.info.region}</p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Países Fronterizos</h2>
                {country.info.borders.length > 0 ? (
                    <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        {country.info.borders.map((borderCountry) => (
                            <li key={borderCountry.countryCode} className="cursor-pointer border border-gray-300 p-4 rounded-lg shadow-sm hover:bg-gray-300 hover:text-black">
                                <Link href={`/country/${borderCountry.countryCode}`}>
                                    <h3 className="text-xl font-bold">{borderCountry.commonName}</h3>
                                    <p className="text-gray-600"><strong>Nombre Oficial:</strong> {borderCountry.officialName}</p>
                                    <p className="text-gray-600"><strong>Código:</strong> {borderCountry.countryCode}</p>
                                    <p className="text-gray-600"><strong>Región:</strong> {borderCountry.region}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay países fronterizos.</p>
                )}
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Población a lo largo de los años</h2>
                <Line data={populationData} />
            </div>
        </div>
    );
};

export default CountryDetails;