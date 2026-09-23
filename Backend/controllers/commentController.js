
import Comment from "../models/comment.js";
import { ObjectId } from 'mongodb';
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




export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.params;

        const comments = await Comment.find({ 'blog': blogId, 'isApprove': true }).populate('user', 'name');

        return res.json(
            {
                status: true,
                message: "Sucessfully fetched all the comments of a blog",
                data: comments
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


export const reviewComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        let { approve } = req.body;

        if (req.user.role !== 'admin') {
            return res.json({
                status: false,
                message: 'You are Not authaurised to do this'
            })
        }


        console.log(commentId, approve);
        console.log(typeof (approve));
        if (!commentId || !approve) {
            return res.json({
                status: false,
                message: 'Missing Details for Update'
            })
        }
        if (approve === 'true') {
            approve = true;
        }
        else {
            approve = false
        }
        await Comment.updateOne(
            {
                _id: new ObjectId(commentId)
            },
            {
                $set: { isApprove: approve }
            }
        );

        return res.json(
            {
                status: true,
                message: "Sucessfully Updated Comment",
                data: { isApprove: approve }
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




// 1,2,3,4 -> 5 -> success - > 1,5,3,4

// comment-> {

//     statun-> approve
// }
// -> success 