import React from 'react'

const ProductWorksheetItem = (props) => {
  return (
        <tr scope="row">
            <td>{props.part_number}</td>
            <td>{props.feature_description}</td>
            <td>{props.price}</td>
            <td>{props.qty_in_stock}</td>
            <td>0</td>
        </tr>
  )
}

export default ProductWorksheetItem