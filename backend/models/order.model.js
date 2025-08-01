import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    orderItems: [
        {
            name: {type: String, required: true},
            price: {type: Number, required: true},
            quantity: {type: Number, required: true},
            image: {type: String, required: true},
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        }
    ],
    shippingAddress: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        country: {type: String, required: true},
        phone: {type: String, required: true},
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: {type: String},
        status: {type: String},
        update_time: {type: String},
        email_address : {type: String},
    },
    itemPrice: {type: Number, required: true, default: 0.0},
    taxPrice: {type: Number, required: true, default: 0.0},
    shippingPrice: {type: Number, required: true, default: 0.0},
    totalPrice: {type: Number, required: true, default: 0.0},
    isPaid: {type: Boolean, default: false, required: true},
    paidAt: {type: Date},
    isDelivered: {type: Boolean, default: false, required: true},
    deliveredAt: {type: Date},
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
