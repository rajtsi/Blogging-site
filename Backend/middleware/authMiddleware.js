

export const myCustomMiddleware = async (req, res, next) => {
    try {


        const token = req.header.Authorization.spilt(" ")[1]


        return next();

    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        })
    }
};


