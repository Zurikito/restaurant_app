import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    cart_num: {
        type: String,
    },

    food_items: [{
        id: String,
        quantity: Number
    }],
    
    drink_items: [{
        id: String,
        quantity: Number
    }],

    cart_status: {
        type: String
    },

}, {timestamps: true});

const Cart = mongoose.model("cart", cartSchema);

export default Cart;