import User from "../models/user.js";



export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.json({
                status: false,
                message: "User not found"
            })
        }

        return res.json({
            status: true,
            message: "Successfully fetched User Details",
            data: user
        })
    }
    catch (error) {
        return res.json({
            status: false,
            message: error.message
        })
    }
}