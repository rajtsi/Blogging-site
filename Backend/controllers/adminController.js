import Blog from "../models/blog.js";
import Comment from "../models/comment.js";

export const getAllBlogsWithDrafts = async (req, res) => {
    try {
        const allBlogs = await Blog.find()
            .select('title createdAt isPublised')
            .sort({ createdAt: -1 });

        return res.json({
            status: true,
            message: "Successfully fetched all Blogs",
            data: allBlogs
        });

    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        });
    }
}

export const publishAndUnpublishBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        let { publish } = req.body;
        if (!blogId || !publish) {
            return res.json({
                status: false,
                message: "Missing Details for Update"
            })
        }

        if (publish === 'true') {
            publish = true;
        }
        else {
            publish = false;
        }

        await Blog.updateOne(
            {
                _id: blogId
            },
            {
                $set: { isPublised: publish }
            }
        );

        return res.json(
            {
                status: true,
                message: "Successfully Updated Blog",
                data: { isPublised: publish }
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

export const getDashboardCount = async (req, res) => {
    try {
        const totalBlogs = await Blog.countDocuments();
        const draftBlogs = await Blog.countDocuments({ isPublised: false });
        const totalApprovedComments = await Comment.countDocuments({ isApprove: true });

        return res.json({
            status: true,
            message: "Successfully fetched Dashboard Counts",
            data: {
                totalBlogs,
                draftBlogs,
                totalApprovedComments
            }
        });

    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        });
    }
}