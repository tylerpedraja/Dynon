import mongoose from "mongoose";

const productTypesSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
      },
    subtypes: {
        name: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String
        }
      },
    header: {
        type: ccc,
        required: true,
      },
    subheader: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
      }
    })

    const ProductTypes = mongoose.model('ProductTypes', productTypesSchema)

export default ProductTypes