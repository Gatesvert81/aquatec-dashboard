import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { NavContext } from './Context'

function Logo({sideNav, show}) {
    const [page, setPage] = useContext(NavContext)

    useEffect(() => {
        if (page !== "home") setPage('home')
    }, [])

    return (
        <div className=' md:w-80 flex justify-center items-center cursor-pointer mix-blend-lighten' >
            <div className='w-10 h-12 relative' >
                <Image src="/icons/logo.png" alt="Aquatec logo" layout="fill" className="object-contain" />
            </div>
            <div className={` ${ show ? "text-white" : "text-black"} ${ sideNav ? "text-white" : "text-black"} transition duration-500 ease-in-out text-left `} >
                <h5 >
                    Aquatec
                </h5>
                <h5 >
                    Services limited
                </h5>
            </div>
        </div>
    )
}

export default Logo