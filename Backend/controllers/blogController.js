
import Blog from "../models/blog.js";

export const postBlog = async (req, res) => {

    try {
        const { authorId, title, content, description, category, imageUrl } = req.body;
        if (!authorId || !title || !content || !description || !category || !imageUrl) {
            return res.json(
                {
                    status: false,
                    message: " Please Add all the required Details"
                }
            )
        }


        const exist = Blog.findOne({ title });

        if (exist) {
            return res.json({
                status: false,
                message: 'This blog Title is already Taken'
            })
        }

        await Blog.create({
            author: authorId,
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
        const blogDetails = await Blog.findOne({ '_id': blogId });
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


