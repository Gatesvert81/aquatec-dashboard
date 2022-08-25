import { doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { db } from '../Firebase/firebaseConfig'
import AdvantageCard from './AdvantageCard'
import Button from './Button'
import ChooseCard from './ChooseCard'
import DirectorCard from './DirectorCard'
import ImageCard from './ImageCard'
import ProjectCard from './ProjectCards'
import StoreCard from './StoreCard'

function EditCard({ collection, document }) {
    const [edit, setEdit] = useState(false)
    const [data, setData] = useState(null)
    const [sections, setSections] = useState([])
    const [cardsData, setCardsData] = useState([])
    const [loading, setLoading] = useState(false)

    const handleEdit = (e) => {
        e.preventDefault()
        // Upload section content changes to firebase firestore
        setDoc(doc(db, collection, document), data)
        setEdit(!edit)
    }

    useEffect(() => {
        //Get data of Section
        // const id = toast.loading("Please wait...")
        const docRef = doc(db, collection, document);
        const docSnap = getDoc(docRef)
        docSnap.then((snapshot) => {
            setData(snapshot.data())
            // toast.update(id, { render: "Successfully Retrieved Sections", type: "success", isLoading: false })
        })
            .catch((error) => {
                // toast.update(id, { render: error.message, type: "error", isLoading: false })
            });
    }, [])

    useEffect(() => {
        //Get all sections from Data
        if (data !== null) {
            setSections(Object.keys(data))
            if (data.hasOwnProperty('Cards')) {
                // Get all card data
                setCardsData(Object.values(data?.Cards))
            }
        }
    }, [data])

    const handleCardDetail = (e, index) => {
        // Set data of card section being changes
        let newCard = [...cardsData]
        newCard[index] = {
            ...newCard[index],
            [e.target.name]: e.target.value
        }
        //Update overall section data 
        setData({
            ...data,
            Cards: {
                ...data?.Cards,
                [`Card ${index + 1}`]: {
                    ...data?.Cards[`Card ${index + 1}`],
                    [e.target.name]: e.target.value
                }
            }
        })
        //Update the card data
        setCardsData([
            ...newCard
        ])
    }

    const displayCards = () => {
        // Display Card Based on the cardstyle of section
        switch (data?.Cardstyle) {
            case "Choose":
                return (
                    <div className='section-grid md:grid-cols-2' >
                        {
                            cardsData?.map((cardData, index) => (
                                <ChooseCard
                                    number={`0${index + 1}`}
                                    edit={edit}
                                    key={index}
                                    index={index}
                                    data={cardData}
                                    handleCardDetail={handleCardDetail} />
                            ))
                        }
                    </div>
                )
            case "Store":
                return (
                    <div className='section-grid md:grid-cols-3 ' >
                        {
                            cardsData?.map((cardData, index) => (
                                <StoreCard
                                    image="cleaning.JPG"
                                    key={`${index}${cardData}`}
                                    edit={edit}
                                    index={index}
                                    data={cardData}
                                    handleCardDetail={handleCardDetail}
                                />
                            )
                            )
                        }
                    </div>
                )
            case "Projects":
                return (
                    <div className='section-grid md:grid-cols-2 ' >
                        {
                            cardsData?.map((cardData, index) => (
                                <ProjectCard
                                    number={`0${index + 1}`}
                                    image="cleaning"
                                    key={`${index}${cardData}`}
                                    edit={edit}
                                    index={index}
                                    data={cardData}
                                    handleCardDetail={handleCardDetail}
                                />
                            ))
                        }
                    </div>
                )
            case "Director":
                return (
                    <div className='section-grid md:grid-cols-3 ' >
                        {
                            cardsData?.map((cardData, index) => (
                                <DirectorCard
                                    key={`${index}${cardData}`}
                                    edit={edit}
                                    index={index}
                                    data={cardData}
                                    handleCardDetail={handleCardDetail}
                                />
                            ))
                        }
                    </div>
                )
            case "Advantage":
                return (
                    <div className='section-grid md:grid-cols-3 ' >
                        {
                            cardsData?.map((cardData, index) => (
                                <AdvantageCard
                                    key={`${index}${cardData}`}
                                    edit={edit}
                                    index={index}
                                    data={cardData}
                                    handleCardDetail={handleCardDetail}
                                />
                            ))
                        }
                    </div>
                )
            default:
                break;
        }
    }

    const handleSectionDetail = (e) => {
        setLoading(true)
        // Set data of section being changed
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
        alert("Chnages Succesful")
        setLoading(false)
    }

    return (
        <div>
            <form onSubmit={handleEdit} >
                {
                    sections?.includes('Title') ? (
                        <fieldset>
                            <label>
                                title
                            </label>
                            <input readOnly={!edit} type="text" onChange={handleSectionDetail} defaultValue={data?.Title} className='text__input' name='Title' />
                        </fieldset>
                    ) : null
                }
                {
                    sections?.includes('Description') ? (
                        <fieldset>
                            <label>
                                description
                            </label>
                            <textarea readOnly={!edit} type="text" onChange={handleSectionDetail} defaultValue={data?.Description} className='text__input h-20' name='Description' />
                        </fieldset>
                    ) : null
                }
                {
                    sections?.includes('images') ? (
                        <fieldset>
                            <label>
                                Images
                            </label>
                            <div className='section-grid' >
                                <ImageCard />
                                <ImageCard />
                            </div>
                        </fieldset>
                    ) : null
                }
                {
                    sections?.includes('Cards') ? (
                        <fieldset>
                            <label>
                                Cards
                            </label>
                            {/* <div className='section-grid' > */}
                            {displayCards()}
                            {/* </div> */}
                        </fieldset>

                    ) : null
                }
                <fieldset>
                    <Button
                        style={` ${edit ? "primary-btn" : "secondary-btn"} w-full`}
                        type="submit"
                    >
                        {
                            edit ? "Save" : "Edit"
                        }
                    </Button>
                </fieldset>
            </form>
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
        </div>
    )
}

export default EditCard