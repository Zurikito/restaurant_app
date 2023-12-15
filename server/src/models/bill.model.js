import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    bill_id: {
        type: String 
    },

    bill_num: {
        type: String 
    },

    food_items: [{
        id: String,
        quantity: Number,
        price: Number
    }],
    
    drink_items: [{
        id: String,
        quantity: Number,
        price: Number
    }],

    total: {
        type: String        
    },
    
}, {timestamps: true});

const Bill = mongoose.model("bill", billSchema);

export default Bill;