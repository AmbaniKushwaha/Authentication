import { Router } from "express";
import { getDashboard, getHomePage, getLogin, getSignup, postLogin, postSignup } from "../controllers/auth.controller.js";

export const router = Router();

router.get("/", getHomePage);

router.get("/signup", getSignup);
router.post("/signup", postSignup);

router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/dashboard", getDashboard)

