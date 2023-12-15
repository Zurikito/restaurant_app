"use strict";

import express from "express";
import controller from "../controllers/bill.controller.js";

const router = express.Router();

router.get("/", controller.getBills);

router.get("/:bill_num", controller.getBill);

router.post("/create", controller.createBill);

export default router;