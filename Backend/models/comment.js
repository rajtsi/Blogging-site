import mongoose from 'mongoose';

// 1. Define the Schema

const commentSchema = new mongoose.Schema(
    {
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        isApprove:
        {
            type: Boolean,
            required: true,
            default: false
        }
    }, {
    timestamps: true
});


const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

