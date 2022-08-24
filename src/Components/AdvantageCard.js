import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimationContext } from './Context'
import Image from 'next/image'
import CardEdit from './CardEdit'

function AdvantageCard({ data, edit, handleCardDetail, index }) {
    const { textAnimate } = useContext(AnimationContext)
    const [sections, setSections] = useState([])

    useEffect(() => {
        //Get all sections from Data
        if ((data !== null) && (data !== undefined)) {
            setSections(Object.keys(data))
        }
    }, [data])

    return edit ? (
        <CardEdit
            sections={sections}
            edit={edit}
            data={data}
            index={index}
            handleCardDetail={handleCardDetail}
        />
    ) : (
        <motion.div className='w-64 h-28 flex flex-col justify-center items-center text-center rounded-lg ' {...textAnimate} >
            <motion.div className='icon' >
                <Image src={`/icons/${data?.Icon}.png`} alt='Dream pool' layout='fill' className='object-contain' />
            </motion.div>
            <motion.p>
                {data?.Email}
                {data?.Tel}
                {data?.Fax}
                {data?.Description}
            </motion.p>
        </motion.div>
    )
}

export default AdvantageCard