import Head from 'next/head'
import React, { useContext, useEffect } from 'react'
import { NavContext, SectionsContext } from '../src/Components/Context'
import EditCard from '../src/Components/EditCard'

function Projects() {

    const [page, setPage] = useContext(NavContext)
    const [sections] = useContext(SectionsContext)

    useEffect(() => {
        if (page === "Projects") return;
        setPage("Projects")
    }, [])


    return (
        <div className='pt-20' >
            <Head>
                <title>Aquatec | Project</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {
                sections.map((section, index) => (
                    <section key={`${index} ${section}`} >
                        <h3>
                            {section}
                        </h3>
                        <EditCard document={section} collection="Projects" key={section} />
                    </section>
                ))
            }
        </div>
    )
}

export default Projects