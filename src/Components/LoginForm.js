import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Button from './Button'

function LoginForm({ handleForm }) {
    const [showPassowrd, setShowPassowrd] = useState(false)
    return (
        <motion.form
            onSubmit={handleForm}
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            exit={{
                opacity: 0
            }}
            transition={{
                delay: 0.3
            }}>
            <fieldset className='flex flex-col'>
                <label className='w-full text-left' >
                    Email
                </label>
                <input required name='email' type="email" placeholder='johndoe@example.com' />
            </fieldset>
            <fieldset className='flex flex-col'>
                <label className='w-full text-left'>
                    Password
                </label>
                <div className='w-full relative' >
                    <input required name='password' type={`${showPassowrd ? "text" : "password"}`} placeholder='*********' />
                    {
                        showPassowrd ? (
                            <p
                                className='icon absolute top-2 right-2 text-gray-400/60'
                                onClick={() => setShowPassowrd(false)} >
                                N
                            </p>
                        ) : (
                            <p
                                className='icon absolute top-2 right-2 text-gray-400/60'
                                onClick={() => setShowPassowrd(true)} >
                                y
                            </p>
                        )
                    }
                </div>
            </fieldset>
            <fieldset className='flex' >
                <Button style="primary-btn w-full" >
                    Sign In
                </Button>
            </fieldset>
        </motion.form>
    )
}

export default LoginForm