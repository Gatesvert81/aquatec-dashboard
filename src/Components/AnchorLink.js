import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

function AnchorLink({ children, route, pass, target, style, click }) {
    return (
        <Link href={route} passHref={pass || false} className={style} >
            <motion.a target={target ? "_blank" : null} onClick={click} >
                {children}
            </motion.a>
        </Link>
    )
}

export default AnchorLink