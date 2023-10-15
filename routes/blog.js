import { Router } from "express";
import { checkHeader } from "../middlewares/auth.js";
import {
  createBlog,
  deleteblog,
  getBlogsByAuthor,
  getblog,
  updateBlog,
} from "../controllers/blog.js";

const blogRoutes = Router();

blogRoutes.post("/blog", checkHeader, createBlog);
blogRoutes.get("/blog/:slug", getblog);
blogRoutes.get("/blogs/:author", getBlogsByAuthor);
blogRoutes.patch("/blog/:id", checkHeader, updateBlog);
blogRoutes.delete("/blog/:id", checkHeader, deleteblog);

export default blogRoutes;
