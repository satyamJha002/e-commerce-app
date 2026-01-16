import mongoose from 'mongoose'

const userDetails = new mongoose.Schema({
    auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    }
})

const UserDetails = mongoose.model('UserDetails', userDetails)

export default UserDetails;
