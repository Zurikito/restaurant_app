"use strict";

// import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import db from "./src/models/index.js";
import routes from "./src/routes/index.js";

import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";

const port = process.env.NODE_SERVER_PORT || 5000;
const hostname = process.env.NODE_SERVER_IP || "0.0.0.0";

const app = express();

const corsOptions = {
    origin: "http://localhost:9000",
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", routes);

const server = http.createServer(app);

mongoose.set("strictQuery", false);

await mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected");
        server.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    })
    .catch((err) => {
        console.log(err);
        // process.exit(1);
    });









    const seatingSchema = new mongoose.Schema({
      // id: {
      //   type: String,
      //   required: true,
      //   unique: true,
      // },
      num: {
        type: Number,
      },
    }, { timestamps: true });
    
   export const Seating = mongoose.model("Seating", seatingSchema);
    

