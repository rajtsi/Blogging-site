
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