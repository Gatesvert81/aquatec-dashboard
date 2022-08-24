import React from 'react'
import { motion } from 'framer-motion'

function Button({ children, style, click, type }) {
    return (
        <motion.button
            className={style}
            onClick={click}
            initial={{
                y: "3%"
            }}
            whileInView={{
                y: "0%"
            }}
            whileHover={{
                scale: 1.05
            }}
            whileTap={{
                scale: 0.9
            }}
            type={type}
        >
            {children}
        </motion.button>
    )
}

export default Button