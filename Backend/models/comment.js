import mongoose from 'mongoose';

// 1. Define the Schema

const commentSchema = new mongoose.Schema(
    {
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blog',
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        isApprove:
        {
            type: Boolean,
            require: true,
            default: false
        }
    }, {
    timestamps: true
});


const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

