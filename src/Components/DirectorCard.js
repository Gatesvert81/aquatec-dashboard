import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimationContext } from './Context'
import CardEdit from './CardEdit'

function DirectorCard({ data, edit, handleCardDetail, index }) {
    const { textAnimate } = useContext(AnimationContext)
    const [sections, setSections] = useState([])

    useEffect(() => {
        //Get all sections from Data
        if (data !== null) {
            setSections(Object.keys(data))
            console.log(data)
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
        <motion.div className='text-center' {...textAnimate} >
            <motion.h5>
                {data?.Name}
            </motion.h5>
            <motion.h6 className='text-black/60' >
                {data?.Position}
            </motion.h6>
        </motion.div>
    )
}

export default DirectorCard