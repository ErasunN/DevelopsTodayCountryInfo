import React from 'react'
import { GisSearchCountry } from '../assets/icons/HeaderIcon'
import Link from 'next/link'

const CountryHeader = () => {
    return (
        <Link href={'/countries'}>
            <div className='px-4 bg-black flex text-white items-center'>
                <GisSearchCountry />
                <p className='ml-4 text-3xl font-bold'>Country Info</p>
            </div>
        </Link>
    )
}

export default CountryHeader