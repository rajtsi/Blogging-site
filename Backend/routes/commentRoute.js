
import express from 'express'
import { postComment, getBlogComments } from '../controllers/commentController.js';
const router = express.Router();
router.post('/postComment', postComment);
router.get('/getBlogComments/:blogId', getBlogComments);
export default router; 
