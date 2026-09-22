import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/db.js';
import authRoute from '../Backend/routes/authRoute.js'
import blogRoute from '../Backend/routes/blogRoute.js'
import commentRoute from '../Backend/routes/commentRoute.js'
import { myCustomMiddleware } from "../Backend/middleware/authMiddleware.js"
const app = express()

//middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json('Api is working');
});

app.use('/api/auth', authRoute); // Unprotected Route

app.use('/api/blog/', myCustomMiddleware, blogRoute); // protected Route
app.use('/api/comment/', myCustomMiddleware, commentRoute);  // protected Route

const serverOn = async () => {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log('server is running on port', PORT)
        })
    } catch (error) {
        console.log("Failed to connect to MongoDB or failed to start server");
        console.error(error);
    }
}

serverOn();