import express from 'express';
import { reviewComment } from '../controllers/commentController.js';
import { deleteBlog } from '../controllers/blogController.js';
import { generateBlogContent } from '../controllers/aiController.js'
import { getAllBlogsWithDrafts, getDashboardCount, publishAndUnpublishBlog } from '../controllers/adminController.js';


const router = express.Router();
router.patch('/updateBlogComments/:commentId', reviewComment);
router.delete('/deleteBlog/:id', deleteBlog);
router.post('/generateBlogContent', generateBlogContent);
router.get('/blogs', getAllBlogsWithDrafts);
router.patch('/publishBlog/:blogId', publishAndUnpublishBlog);
router.get('/dashboard/count', getDashboardCount);
export default router;