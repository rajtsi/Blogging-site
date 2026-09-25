
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
import cloudinary from "../config/clournary.js";
import fs from 'fs';
export const postBlog = async (req, res) => {
    try {
        const { title, content, description, category } = req.body;

        const file = req.file;
        console.log(file.path);
        const localFilePath = req.file.path;
        //  code for compressing file manually 

        // Upload the file from the local path to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            folder: 'BlogImages', // Optional: creates/uses a folder inside Cloudinary
            resource_type: 'auto'     // Automatically detects images, videos, or PDFs
        });
            
        fs.unlink(localFilePath, (err) => {
            if (err) console.error("Error deleting local file:", err);
        });
        const imageUrl = uploadResult.secure_url;

        //-> some how uploed this image to cloudnary and get teh url and then use imageurl for storing in db 
        //this imange is not a string its an image 
        // insted of storing whole image in ram and then storing it in Disk we will take chunks of iamge in ram and will keep storing it in disk and will return sucess once whole image is stored in disk  

        if (!authorId || !title || !content || !description || !category || !imageUrl) {
            return res.json(
                {
                    status: false,
                    message: " Please Add all the required Details"
                }
            )
        }

        const exist = await Blog.findOne({ title });
        if (exist) {
            return res.json({
                status: false,
                message: 'This blog Title is already Taken'
            })
        }

        await Blog.create({
            author: req.user.id,
            title,
            content,
            description,
            category,
            imageUrl
        });

        console.log("yes reached here");

        return res.json(
            {
                status: true,
                message: "You blog is saves as Draft go cross chekc and publish it",
                data: {
                    title,
                    category
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

        const blogDetails = await Blog.findOne({ _id: blogId, isPublised: true });
        return res.json(
            {
                status: true,
                message: "Sucessfully fetched all A Blog Details",
                data: blogDetails
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

