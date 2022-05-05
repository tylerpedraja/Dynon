import React, { useState } from 'react'

const ProductWorksheetItemHeader = (props) => {
    const [showDescription, setShowDescription] = useState(false);

    const handleShowDescription = () =>  {
        if (!showDescription) {
            setShowDescription(true)
            return
        }
        setShowDescription(false);
    }

  return (
    <>
        <h3 className="mb-4">{props.header}</h3>
        <div onClick={handleShowDescription} className="alert alert-primary">
                <i className="fa-solid fa-plane" />
                <h6 className="d-inline ms-2">{props.subheader}</h6>

                {showDescription && 
                <p className="my-2">
                    {props.description}
                </p>}
        </div>
    </>
  )
}

export default ProductWorksheetItemHeader