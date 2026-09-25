import jwt from 'jsonwebtoken';
export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {// User Must provide a token to moove forward in Middleware
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }
        const valid = jwt.verify(token, process.env.SECRET_KEY); // It return ths payload what you used when making the token
        if (!valid) {
            return res.status(401).json({ error: 'Access denied. Invalid token provided.' });
        }
        req.user = valid;
        return next();
    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        })
    }
};




