import express from "express";
import registerClientesController from "../controllers/registerClientesController.js";



const router = express.Router();


router
.route("/")
.post(registerClientesController.postClientes);

router
.route("verifyCodeEmail").post(registerClientesController.verifyCodeEmail)

export default router;