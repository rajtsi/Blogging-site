
import Comment from "../models/comment.js";

export const postComment = async (req, res) => {

    try {

        const { userId, content, blogId } = req.body;
        if (!userId || !content || !blogId) {
            return res.json(
                {
                    status: false,
                    message: "Please Give a valid Comment"
                }
            )
        }
         
         
        await Comment.create({
            user: userId,
            content,
            blog: blogId
        });

        return res.json(
            {
                status: true,
                message: "Your Comment is submitted for Review",
                data: {
                    content
                }
            }
        );
    }
    catch (error) {
        return res.json({
            status: false,
            message: error.message
        })

    }

}