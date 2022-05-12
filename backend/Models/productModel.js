import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    part_number: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qty_in_stock: {
        type: Number,
        required: true
    },
    type: {
        type: String,
    },
    subgroup: {
        type: String,
    },
    remove: {
        type: Boolean,
        default: false,
    }
})

const Product = mongoose.model('Product', productSchema)

export default Product
