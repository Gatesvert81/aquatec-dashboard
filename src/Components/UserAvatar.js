import React, { useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from './Button'
import { AuthContext } from './Context'

function UserAvatar() {

    const [popup, setPopup] = useState(false)

    const { logOut } = useContext(AuthContext)

    return (
        <>
            <motion.div
                className='w-full h-fit px-5 py-2 flex justify-center md:justify-start items-center gap-3 relative'
                onClick={() => setPopup(!popup)}
            >
                <motion.div className="w-8 h-8 rounded-full bg-sea-blue flex flex-col justify-center items-center text-center text-sm font-semibold " >
                    G
                </motion.div>
                <motion.p className="md:hidden block mix-blend-lighten" >
                    Gates Vert
                </motion.p>
                <AnimatePresence>
                    {
                        popup && (
                            <motion.div 
                                className='w-full h-fit absolute flex justify-center items-center -top-[100%] md:-bottom-[100%] left-0 z-30' 
                                initial={{
                                    opacity: 0,
                                    y: "10%"
                                }}
                                animate={{
                                    opacity: 1,
                                    y: "0%"
                                }}
                                exit={{
                                    opacity: 0,
                                    y: "10%"
                                }}
                                >
                                <Button
                                    style="primary-btn w-fit"
                                    click={() => {
                                        logOut()
                                        setPopup(!popup)
                                    }}
                                >
                                    log Out
                                </Button>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </motion.div>
        </>
    )
}

export default UserAvatar