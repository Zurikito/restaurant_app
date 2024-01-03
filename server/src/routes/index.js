"use strict";

import express from "express";
import menuRouter from "./menu.route.js";
import userRouter from "./user.route.js"
import cartRouter from "./cart.route.js"
import billRouter from "./bill.route.js"
import seatingRouter from "./seating.route.js"

const router = express.Router();

router.use("/menu", menuRouter);

router.use("/users", userRouter);

router.use("/carts", cartRouter);

router.use("/bills", billRouter);

router.use("/seating", seatingRouter);

export default router;