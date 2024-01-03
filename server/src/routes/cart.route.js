"use strict";

import express from "express";
import controller from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", controller.getCart);

router.get("/:id", controller.getCartByTableId);

router.post("/create", controller.createCart);

router.post("/edit/:id", controller.editCart);

router.delete("/delete/:id", controller.deleteCart);

export default router;
