"use strict";

import express from "express";
import controller from "../controllers/user.controller.js";

const router = express.Router();

router.post("/create", controller.createUser);

router.post("/login", controller.loginUser);

router.post("/edit/:_id", controller.editUser);

router.post("/delete/:_id", controller.deleteUser);

router.get("/:_id", controller.findUser);

router.post("/", controller.getUsers);

export default router;