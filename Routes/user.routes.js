import express from "express"
import { deleteUser, getAllUsers, getSingleUser, updateUser } from "../controller/user.controller.js"
import { authentication, restrict } from "../auth/verifyToken.js"
const router = express.Router()

router.get("/getallusers", authentication, restrict(["admin"]), getAllUsers)
router.put("/updateuser/:id", authentication, updateUser)
router.delete("/deleteuser/:id", authentication, restrict(["admin"]), deleteUser)
router.get("/profile/me", authentication, restrict(["user", "admin"]), getSingleUser)

export default router