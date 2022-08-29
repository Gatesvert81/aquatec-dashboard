import React, { useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AnimationContext } from './Context'
import Image from 'next/image'
import CardEdit from './CardEdit'

function ProjectCard({ data, number, edit, handleCardDetail, index, image, path }) {
    const { imageAnimate } = useContext(AnimationContext)

    const [hover, setHover] = useState(false)
    const [sections, setSections] = useState([])

    console.log({
        cardPath: path
    })

    useEffect(() => {
        //Get all sections from Data
        if ((data !== null) && (data !== undefined) ) {
            setSections(Object.keys(data))
        }
    }, [data])

    useEffect(() => {
        console.log(hover)
    }, [hover])


    return edit ? (
        <CardEdit
            sections={sections}
            edit={edit}
            data={data}
            index={index}
            handleCardDetail={handleCardDetail}
        />
    ) : (
        <motion.div className='w-full h-30vh md:h-60vh relative overflow-hidden ' onClick={() => setHover(!hover)} >
            <motion.div
                className='w-full h-full'
                {...imageAnimate}
            >
                <Image src={`/project-pics/${image}.JPG`} alt='Dream pool' layout='fill' className='object-cover' />
            </motion.div>
            <AnimatePresence>
                {
                    !hover && (
                        <motion.div
                            className='w-full h-fit flex flex-col gap-2 left-0 absolute bottom-0  px-2 transition duration-500  bg-white/70 '
                            initial={{
                                bottom: "-100%",
                                opacity: 0
                            }}
                            animate={{
                                bottom: "0%",
                                opacity: 1
                            }}
                            exit={{
                                bottom: "-100%",
                                opacity: 0
                            }}
                            transition={{
                                bounceDamping: 0,
                                default: {
                                    duration: 0.3
                                }
                            }}                        >
                            <motion.h6 className='flex md:justify-between justify-start gap-5' >
                                <motion.span className='text-light-gray ' >
                                    {number}
                                </motion.span>
                                <motion.span>
                                    {data?.Title}
                                </motion.span>
                                <motion.span className='hidden md:flex'>
                                    {data?.Location}
                                </motion.span>
                                <motion.span className='hidden md:flex'>
                                    {data?.Year}
                                </motion.span>
                            </motion.h6>
                        </motion.div>
                    )}
            </AnimatePresence>
            <AnimatePresence>
                {
                    hover && (
                        <motion.div
                            className='h-full flex flex-col justify-center items-center gap-2 left-0 absolute top-0  px-2 transition duration-500  bg-white/70 '
                            initial={{
                                // top: "0%",
                                // left: "0%",
                                opacity: 0,
                                scale: 0.8
                            }}
                            animate={{
                                // top: "0%",
                                // left: "0%",
                                opacity: 1,
                                scale: 1
                            }}
                            exit={{
                                // top: "0%",
                                // left: "0%",
                                opacity: 0,
                                scale: 0.8
                            }}
                        >
                            <motion.h6 className='flex md:justify-between justify-start gap-5 ' >
                                <motion.span className='text-black ' >
                                    {number}
                                </motion.span>
                                <motion.span>
                                    {data?.Title}
                                </motion.span>
                                <motion.span className={`'${hover ? "block" : "hidden"} md:flex'`}>
                                    {data?.Location}
                                </motion.span>
                                <motion.span className={`'${hover ? "block" : "hidden"} md:flex'`}>
                                    {data?.Year}
                                </motion.span>
                            </motion.h6>
                            <motion.p>
                                {data?.Description}
                            </motion.p>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </motion.div>
    )
}

export default ProjectCard