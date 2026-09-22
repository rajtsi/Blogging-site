import mongoose from 'mongoose';

// 1. Define the Schema

const blogSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        title: {
            type: String,
            required: true,
            unique: [true, "This Blog Title already Exist"],
        },
        description:
        {
            type: String,
            required: true
        },
        isPublised:
        {
            type: Boolean,
            require: true,
            default: false
        },
        content: {
            type: String,
            require: true
        },
        categoty: {
            type: String,
            require: true
        },
        // we have 2 options to store an image in db 
        // one is storing image in raw bytes form 01010101 but this will ytake so much or dpace and is generally not recomended
        // another way is use a 3rd pary service where you can upload the image and then you will get an url to access that image, so you can store that url in your db and that wil be light weight
        imageUrl: {
            type: String,
            require: true
        }

    }, {
    timestamps: true
});


const Blog = mongoose.model('Blog', blogSchema);

export default Blog;

