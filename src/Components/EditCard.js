import { doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
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
import { AnimationContext, AuthContext } from './Context'
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage'

function EditCard({ collection, document }) {
    const [edit, setEdit] = useState(false)
    const [data, setData] = useState(null)
    const [sections, setSections] = useState([])
    const [cardsData, setCardsData] = useState([])
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const [imagesUrl, setImagesUrl] = useState([])
    const [path, setPath] = useState(null)
    const [addCard, setAddCard] = useState(false)

    const { user } = useContext(AuthContext)
    const { textAnimate } = useContext(AnimationContext)

    // Storage ref for downloading and uploading images
    const storage = getStorage();
    const imageListRef = ref(storage, `${collection}/${document}`);

    const handleEdit = (e) => {
        e.preventDefault()
        // Upload section content changes to firebase firestore
        setDoc(doc(db, collection, document), data)
        setEdit(!edit)
    }

    useEffect(() => {
        //Get data of Section
        if (user) {
            // const id = toast.loading("Please wait...", {
            //     autoClose: 3000
            // })
            const docRef = doc(db, collection, document);
            const docSnap = getDoc(docRef)
            docSnap.then((snapshot) => {
                setData(snapshot.data())
                setPath(snapshot.ref.path)
                console.log({
                    data: snapshot.data(),
                    path: snapshot.ref.path
                })
                // toast.update(id, {
                //     render: "Successfully Retrieved Sections",
                //     type: "success",
                //     isLoading: false,
                //     autoClose: 1500
                // })
            })
                .catch((error) => {
                    // toast.update(id, {
                    //     render: error.message,
                    //     type: "error",
                    //     isLoading: false,
                    //     autoClose: 1500
                    // })
                });
        }
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

    useEffect(() => {
        // Getting images and  Meta data from Images in section
        console.log("here")
        const imageList = []
        listAll(imageListRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    imageList.push(itemRef.fullPath)
                });
                setImages([...imageList])
            })
            .catch((error) => {
                console.log(error)
            });
    }, [])

    useEffect(() => {
        // Add image section if there are images avalable for the section
        if (images.length > 0) {
            setSections([
                ...sections,
                "images"
            ])
        }

        // Get all images url
        let allImages = []
        images.forEach(async (image) => {
            await getDownloadURL(ref(storage, image))
                .then((url) => {
                    allImages.push({
                        name: image,
                        url
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
            setImagesUrl([...allImages])
        })
    }, [images])

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
                                    path={`${path}/Cards/Card ${index + 1}`}
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

    const addNewCard = () => {
        // Display Card Based on the cardstyle of section
        switch (data?.Cardstyle) {
            case "Store":
                return (
                    <div className='section-grid md:grid-cols-3 ' >
                        <StoreCard
                            image="cleaning.JPG"
                            edit={true}
                            index={cardsData?.length}
                            handleCardDetail={handleCardDetail}
                        />
                    </div>
                )
            case "Projects":
                return (
                    <div className='relative ' >
                        <ProjectCard
                            image="cleaning"
                            edit={true}
                            path={`${path}/Cards/Card ${cardsData?.length + 1}`}
                            index={cardsData?.length}
                            handleCardDetail={handleCardDetail}
                        />
                    </div>
                )
            case "Director":
                return (
                    <div className='section-grid md:grid-cols-3 ' >
                        <DirectorCard
                            edit={true}
                            index={cardsData?.length}
                            handleCardDetail={handleCardDetail}
                        />
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
        <>
            <div className='w-full flex justify-between items-center' >
                <h4>
                    {document}
                </h4>
                {
                    sections?.includes('Cards') && (
                        <Button
                            style="primary-btn"
                            click={() => setAddCard(!addCard)}
                        >
                            New Card
                        </Button>
                    )
                }
            </div>
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
                                    {
                                        imagesUrl?.map((image, index) => (
                                            <ImageCard
                                                image={image}
                                                key={`${image}${index}`}
                                                edit={edit}
                                                index={index}
                                                collection={collection}
                                                document={document}
                                            />
                                        ))
                                    }
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
                <AnimatePresence>
                    {
                        addCard && (
                            <motion.div
                                className='w-3/5 h-20vh fixed top-1/3 left-10 z-20 rounded-md bg-white'
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
                                {
                                    addNewCard()
                                }
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
        </>
    )
}

export default EditCard