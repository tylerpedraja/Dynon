import React, { useState } from 'react'
import './product-worksheet-item.css'

const ProductWorksheetItem = (props) => {
  const [quantity, setQuantity] = useState(0)
  const [subTotal, setSubTotal] = useState(0)


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

  const formatCurrency = (value) => {
    const formatted = value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
    return formatted
  }
  return (
    <>
      <tr scope="row" className={quantity > 0 ? 'table-active' : ''}>
        <td className="d-none d-md-table-cell">{props.part_number}</td>
        <td>{props.name}</td>
        <td>{formatCurrency(props.price)}</td>
        <td>
          <div className="d-flex flex-column flex-md-row align-items-center action-btn">
            <i role='button' className="fa-solid fa-minus d-block" onClick={handleSubtractItem}></i>
            <i role='button' className="fa-solid fa-plus ms-md-2 d-block" onClick={handleAddItem}></i>
          </div>
        </td>
        {<td className={quantity > 0 ? 'fw-normal' : 'fw-light'}>{quantity}</td>}
        <td>{formatCurrency(subTotal)}</td>
      </tr>
    </>
  )
}

export default ProductWorksheetItem