
import express from 'express'
import { postBlog } from '../controllers/blogController.js';
const router = express.Router(); // Create an isolated router instance

router.post('/postBlog', postBlog);// We do not need to check the token here because user is not registed 
// router.post('/login', login);// We do not need to check the token here because user is not logged in 
export default router; 
