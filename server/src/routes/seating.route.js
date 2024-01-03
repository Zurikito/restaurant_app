
import express from "express";
import controller from "../controllers/seating.controller.js";

const router = express.Router();

router.get("/getallseating", controller.getAllSeating);
router.post("/create", controller.createTable);
//router.get("/deletetable/:_id", controller.deleteTable);



export default router;