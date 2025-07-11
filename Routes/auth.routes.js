import express from "express"
import { login, registerUser } from "../controller/auth.controller.js"
const router = express.Router()

// http://localhost:8080/api/v1/auth/registeruser
router.post("/registeruser", registerUser)
// http://localhost:8080/api/v1/auth/login
router.post("/login", login)

export default router