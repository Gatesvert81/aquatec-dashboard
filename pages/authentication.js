import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthContext } from '../src/Components/Context'
import LoginForm from '../src/Components/LoginForm'
import Button from '../src/Components/Button'
import Image from 'next/image'


function Authentication() {

    const [loading, setLoading] = useState(false)

    const { signIn } = useContext(AuthContext)

    const handleSignIn = (e) => {
        e.preventDefault()
        setLoading(true)
        const { email, password } = e.target.elements

        signIn(email.value, password.value, () => setLoading(false))

    }

    return (
        <div className='w-full h-screen  bg-slate-500/50 pt-28 p-10' >
            <Head>
                <title>Sign In</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <motion.main
                className='p-10 flex flex-col items-center gap-5 w-full h-fit bg-white relative rounded-md'  >
                <h2>
                    Sign In
                </h2>
                <LoginForm handleForm={handleSignIn} />
                <fieldset className='flex flex-col' >
                    <label className='w-full text-center text-sm'>
                        Sign In with These options instead
                    </label>
                    <div className='w-full flex justify-around items-center ' >
                        <Button style="w-10 h-10 flex flex-col justify-center items-center">
                            <div className="icon relative">
                                <Image src="/icons/google.png" layout='fill' className='object-contain' />
                            </div>
                        </Button>
                        <Button style="w-10 h-10 flex flex-col justify-center items-center" >
                            <div className="icon relative">
                                <Image src="/icons/fb.png" layout='fill' className='object-contain' />
                            </div>
                        </Button>
                        <Button style="w-10 h-10 flex flex-col justify-center items-center" >
                            <div className="icon relative">
                                <Image src="/icons/twitter.png" layout='fill' className='object-contain' />
                            </div>
                        </Button>
                    </div>
                </fieldset>
                <AnimatePresence>
                    {
                        loading && (
                            <motion.div
                                className='w-full h-full flex flex-col justify-center items-center text-center bg-white/80 rounded-md absolute top-0 left-0'
                                initial={{
                                    opacity: 0
                                }}
                                animate={{
                                    opacity: 1
                                }}
                                exit={{
                                    opacity: 0
                                }}
                            >
                                <h6 className='font-semibold text-gray-500' >
                                    Please Wait
                                </h6>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </motion.main >
        </div >
    )
}

export default Authentication
