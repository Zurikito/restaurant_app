import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name: {
        type: String
    },

    des: {
        type: String
    },

    img: {
        type: String
    },
    
    price: {
        type: Number
    },

    type: {
        type: String
    }

}, {timestamps: true});

const Menu = mongoose.model("menu", menuSchema);

export default Menu;