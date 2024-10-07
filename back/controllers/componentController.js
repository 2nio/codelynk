const componentModel = require('../models/componentModel')
const userModel = require('../models/userModel')

const getAllPosts = (req, res) => {
    const { search } = req.query
    componentModel.find({ "title": { "$regex": search || '', "$options": "i" } })
        .then(result => res.json(result))
        .catch(err => res.json(err))
}

const getPost = (req, res) => {
    const { id } = req.params
    componentModel.findById(id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
}

const editPost = async (req, res) => {

    const { id, action, commentId, commentDetails, user } = req.body

    if (action === 'delete comment') {
        console.log('ez')
        componentModel.findByIdAndUpdate(id, { $pull: { comments: { _id: commentId } } })
            .then(result => res.json({ result, msg: 'comment deleted' }))
            .catch(err => res.json(err))
    }
    else if (action === 'like') {
        try {
            const Component = await componentModel.findByIdAndUpdate(id, { $push: { likes: user } })
            await userModel.findByIdAndUpdate(user, { $push: { likedComponents: Component._id } })
            res.json({ result, msg: 'component liked' })
        } catch (error) {
            res.json(error)
        }
    }
    else if (action === 'unlike') {
        try {
            const Component = await componentModel.findByIdAndUpdate(id, { $pull: { likes: user } })
            await userModel.findByIdAndUpdate(user, { $pull: { likedComponents: Component._id } })
            res.json({ result, msg: 'component unliked' })
        } catch (error) {
            res.json(error)
        }

    }
    else {
        componentModel.findByIdAndUpdate(id, { $push: { comments: commentDetails } })
            .then(result => res.json({ result, msg: 'comment created' }))
            .catch(err => res.json(err))
    }
}

module.exports = { getAllPosts, getPost, editPost }