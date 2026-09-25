

export const adminMiddleware = (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                Success: false,
                Message: "You are not authorised. Admin access required"
            });
        }
              
        return next();
    }
    catch (error) {
        return res.status(500).json({
            Success: false,
            Message: error.message
        });
    }
}


