import mongoose from 'mongoose'

const userDetails = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth'
    },
    phoneNumber: {
        type: String,
        required: true
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth'
    },
    address: {
        type: String,
        required: true
    }
})
