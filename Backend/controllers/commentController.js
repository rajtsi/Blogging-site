
import Comment from "../models/comment.js";
import { ObjectId } from 'mongodb';
export const postComment = async (req, res) => {
    try {
        const { content, blogId } = req.body;

        if (!content || !blogId) {
            return res.json({
                status: false,
                message: "Please give a valid comment"
            });
        }

        await Comment.create({
            user: req.user.id,
            content,
            blog: blogId
        });

        return res.json({
            status: true,
            message: "Your Comment is submitted for Review",
            data: { content }
        });

    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        });
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

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate('blog', 'title')
            .populate('user', 'name')
            .sort({ createdAt: -1 });

        return res.json({
            status: true,
            message: "Successfully fetched all comments",
            data: comments
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        });
    }
}


export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findByIdAndDelete(commentId);

        if (!comment) {
            return res.json({
                status: false,
                message: "Comment does not exist"
            });
        }

        return res.json({
            status: true,
            message: "Comment deleted successfully"
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        });
    }
}


// 1,2,3,4 -> 5 -> success - > 1,5,3,4

// comment-> {

//     statun-> approve
// }
// -> success 