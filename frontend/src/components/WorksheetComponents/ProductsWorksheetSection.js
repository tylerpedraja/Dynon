import React, { useState, useEffect } from 'react'
import ProductWorksheetItem from './ProductWorksheetItem/ProductWorksheetItem';
import ProductWorksheetItemHeader from '../WorksheetComponents/ProductWorksheetItemHeader';


const ProductsWorksheetSection = (props) => {
    const [renderable, setRenderable] = useState(false)

    const renderProductTypeContent = () => {
        if (props.products.length === 0) return
        return (
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
                            const productSubtypes = [];
                            props.products.forEach(product => {
                                productSubtypes.push(product.subgroup)
                            })
                            if (productSubtypes.includes(subtype.name)) return (
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
    }

    useEffect(() => {
        console.log(props)
        if (props.subtypes.length > 0) {
            setRenderable(true)
        }

    }, [])

    return (
        <> {
            renderable && (
                renderProductTypeContent()
            )
        } </>
    )
}

export default ProductsWorksheetSection
