import mongoose from "mongoose"


const subtypesSchema = mongoose.Schema({
    name: {
        type: String
    }
}
)

const productTypeSchema = mongoose.Schema({
    header: {
        type: String,
        required: true
    },
    subheader: [Object],
    type: {
        type: String,
        required: true,
        unique: true
    },
    subtypes: [subtypesSchema],
    removed: {
        type: Boolean,
        default: false
    }
})

productTypeSchema.path('type').validate(async (type) => {
    // returns all the documents in collection where type: type. If the value is greater than, then the field (type, in this case) is unique.
    const typeCount = await mongoose.models.ProductTypes.countDocuments({ type: type })
    return !typeCount

}, `Field already exists.`)

const ProductType = mongoose.model('ProductTypes', productTypeSchema)

export default ProductType
