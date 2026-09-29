
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
import cloudinary from "../config/clournary.js";
import fs from "fs";

export const postBlog = async (req, res) => {
    try {
        const { title, content, description, category } = req.body;
        const file = req.file;



        if (!file) {
            return res.json({
                status: false,
                message: "Blog image is required"
            });
        }



        const localFilePath = file.path;



        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            folder: 'BlogImages',
            resource_type: 'image'
        });



        const imageUrl = uploadResult.secure_url;

        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.error("Error deleting local file:", err);
            } else {
                console.log("Local file deleted");
            }
        });

        if (!req.user?.id || !title || !content || !description || !category || !imageUrl) {
            return res.json({
                status: false,
                message: "Please add all the required details"
            });
        }

        const exist = await Blog.findOne({ title });

        if (exist) {
            return res.json({
                status: false,
                message: "This blog title is already taken"
            });
        }

        const blog = await Blog.create({
            author: req.user.id,
            title,
            content,
            description,
            category,
            imageUrl
        });

        return res.json({
            status: true,
            message: "Your blog is saved as a draft. Go and publish it.",
            data: {
                id: blog._id,
                title: blog.title,
                category: blog.category
            }
        });

    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        });
    }
}


export const getAllBlog = async (req, res) => {
    try {
        const allPublishedBlog = await Blog.find({ isPublised: true }, { content: 0 });
        return res.json(
            {
                status: true,
                message: "Sucessfully fetched all Published Blogs",
                data: allPublishedBlog
            }
        )

    }
    catch (error) {
        return res.json({
            status: false,
            message: error.message
        })

    }

}

export const getABlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        const blogDetails = await Blog.findOne({
            _id: blogId,
            isPublised: true
        }).populate('author', 'name');

        return res.json({
            status: true,
            data: blogDetails
        });

    }
    catch (error) {
        return res.json({
            status: false,
            message: error.message
        })

    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;


        const blog = await Blog.findById(id);
        if (!blog) {
            return res.json({
                status: false,
                message: "Blog does not exist"
            })
        }

        await Comment.deleteMany({ blog: id });
        await Blog.findByIdAndDelete(id);

        return res.json(
            {
                status: true,
                message: "Sucessfully Deleted this Blog",
            }
        )
    }
    catch (error) {
        return res.json({
            status: false,
            message: error.message
        })

    }

}

export const searchBlog = async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.json({
                status: false,
                message: "Please provide a title to search"
            })
        }

        const blogs = await Blog.find({
            title: { $regex: title, $options: 'i' },
            isPublised: true
        }, {
            content: 0
        });

        return res.json({
            status: true,
            message: "Successfully fetched searched blogs",
            data: blogs
        })
    }
    catch (error) {
        return res.json({
            status: false,
            message: error.message
        })
    }
}

