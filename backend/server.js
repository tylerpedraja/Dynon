import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import morgan from 'morgan';
import path from 'path'
import ProductType from '../backend/Models/productTypeModel.js'
import Product from './Models/productModel.js';

const PORT = process.env.PORT || 3002;

dotenv.config()

const __dirname = path.resolve();

connectToDb().catch(err => console.log(err)).finally(() => {
    console.log('connected to MongoDB')
});

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

async function connectToDb() {
    await mongoose.connect(process.env.DATABASE_URL);
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('/api', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/api', (req, res) => {
        res.send('API is running....')
    })
}

app.get('/api/product-types', async (req, res) => {
    const productType = await ProductType.find({ removed: false })
    res.send(productType);
})

app.post('/api/product', async (req, res) => {
    const data = {
        part_number: req.body.part_number,
        name: req.body.name,
        price: req.body.price,
        qty_in_stock: req.body.qty_in_stock,
        type: req.body.type,
        subgroup: req.body.subgroup
    }

    Product.create(data, (err) => {
        if (err) {
            return console.error(err)
        }

        res.status(200)
        res.send(data)
    })

})

app.post('/api/product-types', async (req, res) => {
    const data = {
        header: req.body.header,
        subheader: {
            title: req.body.title,
            description: req.body.description
        },
        type: req.body.type
    }

    ProductType.create(data, (err) => {
        if (err) {
            return console.error(err)
        }

        res.status(200)
        res.send(data)
    })

})


app.put('/api/producttype/update/:type', async (req, res) => {
    // if subtype already exists, don't push into ProductType.subtypes array.
    let matched = false
    const filter = {
        type: req.params.type
    }
    const update = {
        $push: {
            subtypes: {
                name: req.body.subgroup
            }
        }
    }
    const type = await ProductType.find(filter)

    type[0].subtypes.forEach((subtype) => {
        matched = (subtype.name === req.body.subgroup) ? true : false;
    })

    if (!matched) {
        const data = await ProductType.findOneAndUpdate(filter, update)
        res.send(data);
    }
})


// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products)
    } catch (error) {
        console.error(error)
        res.send(error);
        res.status(500)
    }
})

// Get products by type
app.get('/api/products/:type', async (req, res) => {
    const type = req.params.type;

    try {
        const products = await Product.find({ type });
        res.send(products)
    } catch (error) {
        console.error(error)
        res.send(error);
        res.status(500)
    }
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT} in ${process.env.NODE_ENV
        } mode.`);
})
