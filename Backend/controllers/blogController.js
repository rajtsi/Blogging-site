
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
export const postBlog = async (req, res) => {
    try {
        const { title, content, description, category, imageUrl } = req.body;
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

