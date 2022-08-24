import React from 'react'

function CardEdit({ sections, edit, data, handleCardDetail, index }) {
    return (
        <div className='w-full p-3 rounded-md border-light-gray border-2 ' >
            {
                sections?.includes('Title') ? (
                    <fieldset>
                        <label>
                            title
                        </label>
                        <input
                            readOnly={!edit}
                            type="text"
                            onChange={(e) => handleCardDetail(e, index)}
                            defaultValue={data?.Title} className='text__input' name='Title' />
                    </fieldset>
                ) : null
            }
            {
                sections?.includes('Email') ? (
                    <fieldset>
                        <label>
                            Email
                        </label>
                        <input
                            readOnly={!edit}
                            type="email"
                            onChange={(e) => handleCardDetail(e, index)}
                            defaultValue={data?.Email} className='text__input' name='Email' />
                    </fieldset>
                ) : null
            }
            {
                sections?.includes('Tel') ? (
                    <fieldset>
                        <label>
                            Tel
                        </label>
                        <input
                            readOnly={!edit}
                            type="tel"
                            onChange={(e) => handleCardDetail(e, index)}
                            defaultValue={data?.Tel} className='text__input' name='Tel' />
                    </fieldset>
                ) : null
            }
            {
                sections?.includes('Fax') ? (
                    <fieldset>
                        <label>
                            Fax
                        </label>
                        <input
                            readOnly={!edit}
                            type="tel"
                            onChange={(e) => handleCardDetail(e, index)}
                            defaultValue={data?.Fax} className='text__input' name='Fax' />
                    </fieldset>
                ) : null
            }
            {
                sections?.includes('Location') ? (
                    <fieldset>
                        <label>
                            Location
                        </label>
                        <input
                            readOnly={!edit}
                            type="text"
                            onChange={(e) => handleCardDetail(e, index)}
                            defaultValue={data?.Location} className='text__input' name='Location' />
                    </fieldset>
                ) : null
            }
            {
                sections?.includes('Year') ? (
                    <fieldset>
                        <label>
                            Year
                        </label>
                        <input
                            readOnly={!edit}
                            type="text"
                            onChange={(e) => handleCardDetail(e, index)}
                            defaultValue={data?.Year} className='text__input' name='Year' />
                    </fieldset>
                ) : null
            }
            {
                sections?.includes('Description') ? (
                    <fieldset>
                        <label>
                            Description
                        </label>
                        <textarea
                            readOnly={!edit}
                            type="text"
                            onChange={(e) => handleCardDetail(e, index)}
                            defaultValue={data?.Description} className='text__input h-20' name='Description' />
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
        </div>
    )
}

export default CardEdit