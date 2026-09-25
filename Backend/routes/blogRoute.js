import express from 'express'
import { postBlog, getAllBlog, getABlog, searchBlog } from '../controllers/blogController.js';
const router = express.Router();
router.post('/postBlog', postBlog);
router.get('/getAllBlogs', getAllBlog);
router.get('/getABlog/:blogId', getABlog);
router.get('/search', searchBlog);

export default router;