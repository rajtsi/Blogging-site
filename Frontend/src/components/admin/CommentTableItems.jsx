import toast from "react-hot-toast";
import { assets } from "../../assets/assets"
import { useAppContext } from "../../context/AppContext";

const CommentTableItems = ({ comment, fetchComments }) => {
    const { axios } = useAppContext();
    const { blog, user, createdAt, _id, isApprove } = comment;
    const BlogDate = new Date(createdAt);

    const toggleApproval = async () => {
        try {
            const { data } = await axios.patch(
                `/api/admin/updateBlogComments/${_id}`,
                { approve: String(!isApprove) }
            );

            if (data.status) {
                toast.success(data.message);
                fetchComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    const deleteComment = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this comment");
        if (!confirmDelete) return;

        try {
            const { data } = await axios.delete(`/api/admin/deleteComment/${_id}`);

            if (data.status) {
                toast.success(data.message);
                fetchComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    return (
        <tr className="border-y border-gray-300">
            <td className="px-6 py-4">
                <b className="font-medium text-gray-600">Blog</b>: {blog?.title || 'Blog Deleted'}
                <br /><br />
                <b className="font-medium text-gray-600">Name</b>: {user?.name || 'Unknown User'}
                <br />
                <b className="font-medium text-gray-600">Comment</b>: {comment.content}
            </td>

            <td className="px-6 py-4 max-sm:hidden">
                {BlogDate.toLocaleDateString()}
            </td>

            <td className="px-6 py-4">
                <div className="inline-flex items-center gap-4">
                    {!isApprove ? (
                        <img
                            onClick={toggleApproval}
                            src={assets.tick_icon}
                            alt="Approve"
                            className="w-5 hover:scale-110 transition-all cursor-pointer"
                        />
                    ) : (
                        <button
                            onClick={toggleApproval}
                            className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1 cursor-pointer"
                        >
                            Unapprove
                        </button>
                    )}

                    <img
                        onClick={deleteComment}
                        src={assets.bin_icon}
                        alt="Delete"
                        className="w-5 hover:scale-110 transition-all cursor-pointer"
                    />
                </div>
            </td>
        </tr>
    )
}

export default CommentTableItems