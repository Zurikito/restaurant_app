"use strict";

import express from "express";
import controller from "../controllers/menu.controller.js";

const router = express.Router();

router.get("/", controller.getMenu);

router.get("/:_id", controller.getItem);

router.post("/create", controller.createItem);

router.post("/edit/:_id", controller.editItem);

router.post("/delete/:_id", controller.deleteItem);

export default router;