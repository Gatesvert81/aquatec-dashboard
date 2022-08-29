import { deleteObject, getStorage, ref, uploadBytes } from 'firebase/storage'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import Button from './Button'
import CardEdit from './CardEdit'
import { NotificationContext } from './Context'

function ImageCard({ image, edit, index, buttons = ['update', 'delete'], collection, document }) {


    const [storageRef, setStorageRef] = useState(null)
    const [imageFile, setImageFile] = useState(null)

    const { notify } = useContext(NotificationContext)

    const data = {
        image
    }

    const storage = getStorage();

    const prevref = ref(storage, `${image?.name}`);

    const addImage = () => {
        console.log('here')
        uploadBytes(storageRef, imageFile).then(() => {
            notify('success', 'Image uploaded Succesfully!');
        }).catch((error) => {
            notify('error', error.message);
        });
    }

    const deleteImage = () => {
        console.log('del')
        deleteObject(prevref).then(() => {
            notify('success', 'File deleted successfully');
        }).catch((error) => {
            notify('error', error.message);
        });
    }

    const updateImage = () => {
        console.log('update here')
        deleteImage()
        uploadBytes(storageRef, imageFile).then(() => {
            console.log('Image updated Succesfully!');
        }).catch((error) => {
            notify('error', error.message);
        });
    }

    const handleImage = (e) => {
        // Get image file from image input
        const file = e.target
        setImageFile(file?.files[0])
        // Set storage ref from image
        setStorageRef(ref(storage, `${collection}/${document}/${file?.files[0]?.name}`));

    }

    const handleUpload = (editType) => {
        if ( storageRef === null ) {
            notify('warn', "Please Select an Image")
            return
        }
        switch (editType) {
            case "Add":
                addImage()
                console.log(editType)
                break;
            case "Update":
                updateImage()
                console.log(editType)
                break
            case "Delete":
                deleteImage()
                console.log(editType)
                break;
            default:
                break;
        }
    }

    return (
        <div className='w-full h-fit flex gap-3 flex-col ' >
            <div className='w-full h-fit flex gap-3 justify-start items-center '>
                <div className={` ${edit ? "w-20 h-20" : "w-full h-52"} relative rounded-md overflow-hidden shrink-0 `} >
                    <Image src={`${image?.url || "/project-pics/landing.png"}`} alt='Image Title' layout='fill' className='object-cover' />
                </div>
                <AnimatePresence>
                    {
                        edit && (
                            <CardEdit
                                sections={['images']}
                                edit={edit}
                                data={data}
                                index={index}
                                handleCardDetail={handleImage}
                            />
                        )
                    }
                </AnimatePresence>
            </div>
            <div>
                <AnimatePresence>
                    {
                        edit && (
                            <div className='w-full h-fit flex gap-3 justify-between items-center '  >
                                {
                                    buttons?.includes('update') && (
                                        <Button
                                            style="primary-btn w-full"
                                            click={() => handleUpload('Update')}
                                        >
                                            Update
                                        </Button>
                                    )
                                }
                                {
                                    buttons?.includes('add') && (
                                        <Button
                                            style="primary-btn w-full"
                                            click={() => handleUpload('Add')}
                                        >
                                            Add
                                        </Button>
                                    )
                                }
                                {
                                    buttons?.includes('delete') && (
                                        <Button
                                            style="secondary-btn w-full text-red-400 border-red-400"
                                            click={() => handleUpload('Delete')}>
                                            Delete
                                        </Button>
                                    )
                                }
                            </div  >
                        )
                    }
                </AnimatePresence>
            </div>
        </div>
    )

}

export default ImageCard
