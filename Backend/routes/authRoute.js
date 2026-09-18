// authentication ->  checking who are you, whats your role


// autherisation -> checking if you can access this particular Data (resource) or not on the basic permissing or role.
import express from 'express'
import { register, login } from '../controllers/authController.js';
const router = express.Router(); // Create an isolated router instance

router.post('/register', register);// We do not need to check the token here because user is not registed 
router.post('/login', login);// We do not need to check the token here because user is not logged in 


export default router; 
