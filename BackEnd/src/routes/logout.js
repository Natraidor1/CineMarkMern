import express from "express";
import logOutController from "../controllers/logOutController.js";

const router = express.Router();

router
.route("/").post(logOutController.logout);


export default router;