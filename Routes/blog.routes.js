import express from "express";
import { createBlog, deleteBlog, editBlog, getAllBlogs, getBlogByQueryParams, getBlogByTitle, getSingleBlog } from "../controller/blog.controller.js";
import { authentication } from "../auth/verifyToken.js";

const router = express.Router();
// http://localhost:8080/api/v1/blog/createblog
router.post("/createblog", authentication, createBlog);
// http://localhost:8080/api/v1/blog/getallblogs
router.get("/getallblogs", getAllBlogs)
// http://localhost:8080/api/v1/blog/editblog
router.put("/editblog/:id",authentication, editBlog)
// http://localhost:8080/api/v1/blog/singleblog
router.get("/singleblog/:id", getSingleBlog)
// http://localhost:8080/api/v1/blog/blogtitle
router.get("/blogtitle/:title", getBlogByTitle)
// http://localhost:8080/api/v1/blog/delete
router.delete("/deleteblog/:id", deleteBlog)
// http://localhost:8080/api/v1/blog/fromqueryparam
router.get("/fromqueryparam", getBlogByQueryParams)

export default router;
