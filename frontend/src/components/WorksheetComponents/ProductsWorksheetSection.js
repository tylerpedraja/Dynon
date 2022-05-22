import React, { useState, useEffect } from 'react'
import ProductWorksheetItem from './ProductWorksheetItem/ProductWorksheetItem';
import ProductWorksheetItemHeader from '../WorksheetComponents/ProductWorksheetItemHeader';


const ProductsWorksheetSection = (props) => {
    const [renderable, setRenderable] = useState(false)

    useEffect(() => {
        if (props.subtypes.length > 0) {
            setRenderable(true)
        }

    }, [])

    return (
        <> {
            renderable && (
                <div className="pb-3">
                    <ProductWorksheetItemHeader
                        type={
                            props.type
                        }
                        header={
                            props.header
                        }
                        subheader={
                            props.subheader
                        } />
                    <table className="table">
                        {
                            props.subtypes.map((subtype, index) => {
                                return (
                                    <React.Fragment key={index} >
                                        <thead className="text-white rounded"
                                            style={
                                                { backgroundColor: '#212529' }
                                            }>
                                            <tr>
                                                <th scope="col" className="d-none d-md-table-cell">Part Number</th>
                                                <th scope="col">
                                                    {
                                                        subtype.name
                                                    }</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Adjust</th>
                                                <th scope="col">Qty.</th>
                                                <th scope="col" width="100px">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.products.map((product, index) => {
                                                if (product.subgroup.toLowerCase() == subtype.name.toLowerCase()) {
                                                    return (
                                                        <ProductWorksheetItem
                                                            key={
                                                                index
                                                            }
                                                            part_number={
                                                                product.part_number
                                                            }
                                                            name={
                                                                product.name
                                                            }
                                                            price={
                                                                product.price
                                                            }
                                                            qty_in_stock={
                                                                product.qty_in_stock
                                                            } />
                                                    )
                                                }
                                            })}
                                        </tbody>
                                    </React.Fragment>
                                )
                            })
                        }</table>
                </div>
            )
        } </>
    )
}

export default ProductsWorksheetSection
