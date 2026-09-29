import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { router } from "./routes/auth.route.js";
import { connectDataBase } from "./model/db.js";

dotenv.config();
connectDataBase();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use(router);

// Static files
app.use(express.static("public"));

// View engine
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});