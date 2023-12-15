"use strict";

import express from "express";
import controller from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", controller.getCarts);

router.get("/:cart_num", controller.getCart);

router.post("/create", controller.createCart);

router.post("/edit/:id", controller.editCart);

router.post("/delete/:id", controller.deleteCart);

export default router; 