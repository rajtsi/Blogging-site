
import express from 'express'
import { postComment, getBlogComments, reviewComment } from '../controllers/commentController.js';
const router = express.Router();
router.post('/postComment', postComment);
router.get('/getBlogComments/:blogId', getBlogComments);
router.patch('/updateBlogComments/:commentId', reviewComment);
export default router; 
