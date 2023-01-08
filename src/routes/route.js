const express=require("express");
const router=express.Router();
const authorController=require("../controllers/authorController")
const blogController=require("../controllers/blogController")
const middleware=require("../middleware/check")


router.post("/authors",authorController.authorCreate);
router.post("/blogs",blogController.blogCreate);
router.get("/blogs",middleware.authentication,blogController.getBlog);
router.put("/blogs/:blogId",middleware.authentication,blogController.updateBlog);
router.delete("/blogs/:blogId",middleware.authentication,blogController.deleteBlog);
router.delete("/blogs",middleware.authentication,blogController.deleteBlog2);
router.post("/login",authorController.loginAuthor)
router.put("/blogs",middleware.authentication,middleware.authorisation,blogController.updateBlog);
router.delete("/blogs",middleware.authentication,middleware.authorisation,blogController.deleteBlog);


module.exports=router;