import React from 'react'

const Loader = ({ pageName }) => {
    return (
        <div className='w-full h-screen flex justify-center items-center bg-gradient-to-b from-black to-gray-800 mx-auto text-white p-4 '>
            <p className='font-semibold text-2xl animate-bounce'>
                Loading {pageName}
            </p>
        </div>
    )
}

export default Loader