import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimationContext } from './Context'
import CardEdit from './CardEdit'

function ChooseCard({ number, data, edit, handleCardDetail, index }) {
    const { textAnimate } = useContext(AnimationContext)
    const [sections, setSections] = useState([])

    console.log(data)

    useEffect(() => {
        //Get all sections from Data
        if (data !== null) {
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
        <motion.div
            className='w-full h-fit grid grid-cols-1 gap-2'
            {...textAnimate}
        >
            <motion.h4 className='w-full flex justify-start gap-5' >
                <motion.span className='text-light-gray' >
                    {number}
                </motion.span>
                {data?.Title}
            </motion.h4>
            <motion.p>
                {data?.Description}
            </motion.p>
        </motion.div >
    )
}

export default ChooseCard