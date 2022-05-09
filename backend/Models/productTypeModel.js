import mongoose from "mongoose"

const productTypeSchema = mongoose.Schema({
    header: {
        type: String,
        required: true
    },
    subheader: [Object],
    type: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    subtypes: [
        {
            name: {
                type: String,
            }
        }
    ],
    removed: {
        type: Boolean,
        default: false
    }
})

const ProductType = mongoose.model('ProductTypes', productTypeSchema)

export default ProductType
