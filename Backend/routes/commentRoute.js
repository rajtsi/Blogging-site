
import express from 'express'
import { postComment } from '../controllers/commentController.js';
const router = express.Router();
router.post('/postComment', postComment);
export default router; 
