const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const verifyAccessToken = require('./middleware/verifyToken');
const componentModel = require('./models/componentModel')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')
require('dotenv').config()
const cloudinary = require('./config/cloudinarySetup')
const { Signup, Login, getUser, Signout } = require('./controllers/userController');
const { editPost, getPost, getAllPosts } = require('./controllers/componentController');

const app = express()

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())

mongoose.connect(process.env.DB_URI)

app.post('/register', Signup)
app.post('/login', Login)

app.get('/allPosts', getAllPosts)
app.get('/post/:id', getPost)

app.use(verifyAccessToken)

app.get('/user', getUser)
app.post('/signout', Signout)

app.post('/edit', editPost)

app.post('/add', async (req, res) => {
    const { title, description, code, creator, image } = req.body
    try {
        const cloudinaryResult = await cloudinary.uploader.upload(image, {
            folder: "Codelynk",
            // width: 300,
            // crop: 'scale'
        })
        componentModel.create({
            title,
            description,
            code,
            creator,
            image: {
                public_id: cloudinaryResult.public_id,
                url: cloudinaryResult.secure_url
            }
        })
            .then(result => res.json(result))
            .catch(err => res.json(err))
    } catch (err) { console.log(err) }
})

app.put('/add/:id', async (req, res) => {
    const { id } = req.params
    const { title, description, code, creator, image, imageChanged } = req.body
    try {
        if (imageChanged) {
            const component = await componentModel.findById(id)
            cloudinary.uploader.destroy(component.image.public_id)
            const cloudinaryResult = await cloudinary.uploader.upload(image, {
                folder: "Codelynk",
                // width: 300,
                // crop: 'scale'
            })
            componentModel.findByIdAndUpdate(id, {
                title,
                description,
                code,
                creator,
                image: {
                    public_id: cloudinaryResult.public_id,
                    url: cloudinaryResult.secure_url
                }
            })
                .then(result => res.json(result))
                .catch(err => res.json(err))
        }
        else {
            componentModel.findByIdAndUpdate(id, {
                title,
                description,
                code,
                creator
            })
                .then(result => res.json(result))
                .catch(err => res.json(err))
        }
    } catch (err) { console.log(err) }
})

app.delete('/add/:id', async (req, res) => {
    try {
        const { id } = req.params
        const component = await componentModel.findById(id)
        cloudinary.uploader.destroy(component.image.public_id)
        componentModel.findByIdAndDelete(id)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    } catch (err) { console.log(err) }
})

app.listen(3001, () => {
    console.log('Server runs on 3001')
})
