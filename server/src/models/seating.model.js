import mongoose from "mongoose";

const seatingSchema = new mongoose.Schema({
    num: {
        type: String
    },
   

 }, {timestamps: true});

 const Seating = mongoose.model("seating", seatingSchema);

 export default Seating;