import React, { useEffect } from 'react'
import ProductWorksheetItem from '../ProductWorksheetItem/ProductWorksheetItem';
import ProductWorksheetItemHeader from '../ProductWorksheetItemHeader/ProductWorksheetItemHeader';

const ProductsWorksheetSection = (props) => {

  return (
    <div className="pb-3">
    <ProductWorksheetItemHeader type={props.type} header={props.header} subheader={props.subheader.title} description={props.subheader.description} />
    <table className="table">
        {props.subtypes.map((subtype) => {
            return (
            <><thead>
                <tr>
                    <th scope="col">Part Number</th>
                    <th scope="col">{subtype.name}</th>
                    <th scope="col">Price</th>
                    <th scope="col">Qty</th>
                    <th scope="col">SubTotal</th>
                </tr>
            </thead>
            <tbody>
                <ProductWorksheetItem />
            </tbody>
            </>
            )
        })
        }
        </table>
    </div>
  )
}

export default ProductsWorksheetSection