const mongoose = require('mongoose')

const componentSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    comments: [{
        body: String,
        user: String,
        date: Date
    }],
    creator: String,
    likes: [mongoose.Schema.Types.ObjectId],
    copies: Number,
    image: {
        public_id: String,
        url: String
    }
})

const componentModel = mongoose.model('component', componentSchema)
module.exports = componentModel