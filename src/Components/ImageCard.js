import Image from 'next/image'
import React from 'react'

function ImageCard() {
    return (
        <div className='w-full h-52 relative rounded-md overflow-hidden' >
            <Image src="/project-pics/cleaning.JPG" alt='Image Title' layout='fill' className='object-cover' />
        </div>
    )
}

export default ImageCard