import React from 'react'
import ProductWorksheetItem from '../ProductWorksheetItem/ProductWorksheetItem';
import ProductWorksheetItemHeader from '../ProductWorksheetItemHeader/ProductWorksheetItemHeader';


const ProductsWorksheetSection = (props) => {

  return (
    <div className="pb-3">
    <ProductWorksheetItemHeader type={props.type} header={props.header} subheader={props.subheader} />
    <table className="table">
        {props.subtypes.map((subtype) => {
            return (
            <>
            <thead>
                <tr>
                    <th scope="col">Part Number</th>
                    <th scope="col">{subtype.name}</th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock</th>
                    <th scope="col"></th>
                    <th scope="col">Qty.</th>
                    <th scope="col" width="50px">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {props.products.map((product) => {
                    if (product.subgroup == subtype.name) {
                    return (
                        <ProductWorksheetItem 
                            part_number={product.part_number}
                            name={product.name}
                            price={product.price}
                            qty_in_stock={product.qty_in_stock}
                            />)}
                })}
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