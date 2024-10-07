const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    likedComponents: [{ type: Schema.Types.ObjectId, ref: 'component' }]
})

//Signup Method
userSchema.statics.signup = async function (email, password, username) {

    if (!email || !password || !username) {
        throw Error('All fields must be completed')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const account = await this.findOne({ email })

    if (account) {
        throw Error('Email already in use')
    }

    const accountByUsername = await this.findOne({ username })

    if (accountByUsername) {
        throw Error('Username already in use')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const User = await this.create({ email, password: hashedPassword, username })

    return User
}

//Login Method
userSchema.statics.login = async function (username, password) {

    if (!username || !password) {
        throw Error('All fields must be completed')
    }

    const account = await this.findOne({ username })

    if (!account) {
        throw Error('Incorrect credentials')
    }

    const passwordMatch = await bcrypt.compare(password, account.password)

    if (!passwordMatch) {
        throw Error('Incorrect credentials')
    }

    return account
}

const userModel = mongoose.model('user', userSchema)
module.exports = userModel