import React, { useState } from 'react'
import './product-worksheet-item.css'

const ProductWorksheetItem = (props) => {
  const [quantity, setQuantity] = useState(0)
  const [subTotal, setSubTotal] = useState(0)

  const formatCurrency = (value) => {
    const formatted = value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
    return formatted
  }

const handleSubtractItem = () => {
  if (quantity !== 0) {
    setQuantity(quantity - 1);
    setSubTotal(subTotal - props.price)
  }
}

const handleAddItem = () => {
    setQuantity(quantity + 1);
    setSubTotal(subTotal + props.price)
}

  return (
    <>
        <tr scope="row" className={quantity > 0 ? 'table-active' : ''}>
            <td>{props.part_number}</td>
            <td>{props.name}</td>
            <td>{formatCurrency(props.price)}</td>
            {props.qty_in_stock > 0 ? <td className="text-success fw-bold">In stock</td> : <td className="text-muted">Out of Stock</td>}
            <td>
              {props.qty_in_stock > 0 && (
              <div className="d-flex align-items-center action-btn">
              <i role='button' class="fa-solid fa-minus d-block" onClick={handleSubtractItem}></i>
              <i role='button' class="fa-solid fa-plus ms-2 d-block" onClick={handleAddItem}></i>
              </div>
              )}
            </td>
            {<td className={quantity > 0 ? 'fw-normal' : 'fw-light'}>{quantity}</td>}
            <td>{formatCurrency(subTotal)}</td>
        </tr>
    </>
  )
}

export default ProductWorksheetItem