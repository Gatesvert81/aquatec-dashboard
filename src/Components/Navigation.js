import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import AnchorLink from './AnchorLink'
import Button from './Button'
import { NavContext } from './Context'
import Logo from './Logo'

function Navigation() {

    const [sideNav, setSideNav] = useState(false)
    const [show, handleShow] = useState(false)

    const [page, setPage] = useContext(NavContext)

    useEffect(() => {
        const myFunc = () => {
            if (window.scrollY > 10) {
                handleShow(true);
            } else handleShow(false);
        }
        window.addEventListener("scroll", myFunc)
        return () => {
            window.removeEventListener("scroll", myFunc)
        }
    }, [])


    useEffect(() => {

        if (sideNav) {
            if (window.innerWidth >= 768) return
            window.document.body.scroll = "no"
            window.document.body.style.overflow = "hidden"
        } else {
            window.document.body.scroll = "yes"
            window.document.body.style.overflow = "scroll"
        }
    }, [sideNav])

    const handleNav = (pageName) => {
        setPage(pageName)
        setSideNav(!sideNav)
    }

    return (
        <>
            <nav className={`w-full h-16 fixed top-0 left-0 z-30 flex justify-between items-center px-10 lg:px-36 py-2 border-b-2 border-light-white transition ease-in-out ${show ? "bg-dark-blue/80 backdrop-blur-md" : "transparent"} ${sideNav ? "bg-dark-blue/80 backdrop-blur-md" : "transparent"} `} >
                <div className='hidden md:flex justify-start items-center gap-10' >
                    <AnchorLink route="/about">
                        <Button
                            style={`side-nav-btn ${page === 'About' ? "page" : null} `}
                            click={() => setPage('About')}
                        >
                            About
                        </Button>
                    </AnchorLink>
                    <AnchorLink route="/projects">
                        <Button
                            style={`side-nav-btn ${page === 'Projects' ? "page" : null} `}
                            click={() => setPage('Projects')}
                        >
                            Projects
                        </Button>
                    </AnchorLink>
                </div>
                <div>
                    <AnchorLink route="/" click={() => setPage("Home")} >
                        <Logo />
                    </AnchorLink>
                </div>
                <div className='hidden md:flex justify-start items-center gap-10'>
                    <AnchorLink route="/store">
                        <Button
                            style={`side-nav-btn ${page === 'Store' ? "page" : null} `}
                            click={() => setPage('Store')}
                        >
                            Store
                        </Button>
                    </AnchorLink>
                    <AnchorLink route="/contact">
                        <Button
                            style={`side-nav-btn ${page === 'Contact' ? "page" : null} `}
                            click={() => setPage('Contact')}
                        >
                            Contact
                        </Button>
                    </AnchorLink>
                </div>
                <div
                    className='md:hidden flex w-8 h-8 bg-transparent flex-col justify-evenly items-center relative overflow-hidden cursor-pointer'
                    onClick={() => setSideNav(!sideNav)}
                >
                    <div className={`w-full h-0.5 transition duration-500 bg-light-gray ease-in-out ${sideNav ? "-rotate-45 translate-y-2.5" : null} `} />
                    <div className={`w-full h-0.5 bg-light-gray ${sideNav ? 'translate-x-full' : null} transition duration-500 ease-in-out `} />
                    <div className={`w-full h-0.5 bg-light-gray transition duration-500 ease-in-out ${sideNav ? "rotate-45 -translate-y-2" : null} `} />
                </div>
            </nav>
            <AnimatePresence>
                {
                    sideNav && (
                        <motion.nav
                            className='w-full md:hidden h-full fixed top-16 left-0 z-20 bg-dark-blue/80 backdrop-blur-md flex flex-col gap-10 justify-center items-center '
                            initial={{
                                opacity: 0,
                                y: "-5%"
                            }}
                            animate={{
                                opacity: 1,
                                y: "0%"
                            }}
                            exit={{
                                opacity: 0,
                                y: "-5%"
                            }}
                            transition={{
                                delayChildren: 0.5,
                                default: {
                                    duration: 0.5
                                },
                            }}
                        >
                            <AnchorLink route="/">
                                <Button
                                    style={`side-nav-btn ${page === 'Home' ? "page" : null} `}
                                    click={() => handleNav('Home')}
                                >
                                    Home
                                </Button>
                            </AnchorLink>
                            <AnchorLink route="/about">
                                <Button
                                    style={`side-nav-btn ${page === 'About' ? "page" : null} `}
                                    click={() => handleNav('About')}
                                >
                                    About
                                </Button>
                            </AnchorLink>
                            <AnchorLink route="/store">
                                <Button
                                    style={`side-nav-btn ${page === 'Store' ? "page" : null} `}
                                    click={() => handleNav('Store')}
                                >
                                    Store
                                </Button>
                            </AnchorLink>
                            <AnchorLink route="/projects">
                                <Button
                                    style={`side-nav-btn ${page === 'Projects' ? "page" : null} `}
                                    click={() => handleNav('Projects')}
                                >
                                    Projects
                                </Button>
                            </AnchorLink>
                            <AnchorLink route="/contact">
                                <Button
                                    style={`side-nav-btn ${page === 'Contact' ? "page" : null} `}
                                    click={() => handleNav('Contact')}
                                >
                                    Contact
                                </Button>
                            </AnchorLink>
                        </motion.nav>
                    )
                }
            </AnimatePresence>
        </>
    )
}

export default Navigation