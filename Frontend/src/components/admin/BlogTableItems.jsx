import toast from "react-hot-toast";
import { assets } from "../../assets/assets"
import { useAppContext } from "../../context/AppContext";

const BlogTableItems = ({ blog, fetchBlogs, index }) => {
  console.log("BLOG TABLE DATA:", blog);
  const { title, createdAt, isPublised } = blog;
  const { axios, navigate } = useAppContext();

  const deleteBlog = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog");
    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete(`/api/admin/deleteBlog/${blog._id}`);

      if (data.status) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const togglePublish = async () => {
    try {
      const { data } = await axios.patch(`/api/admin/publishBlog/${blog._id}`, {
        publish: String(!isPublised)
      });

      if (data.status) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const BlogDate = new Date(createdAt);

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>

      <td
        onClick={() => navigate(`/admin/blog/${blog._id}`)}
        className="px-2 py-4 cursor-pointer hover:text-primary font-medium"
      >
        {title}
      </td>

      <td className="px-2 py-4 max-sm:hidden">
        {BlogDate.toDateString()}
      </td>

      <td className="px-2 py-4 max-sm:hidden">
        <p className={isPublised ? 'text-green-600' : 'text-orange-700'}>
          {isPublised ? 'Published' : 'Unpublished'}
        </p>
      </td>

      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={togglePublish}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
        >
          {isPublised ? 'Unpublish' : 'Publish'}
        </button>

        <img
          src={assets.cross_icon}
          alt=""
          className="w-8 hover:scale-110 transition-all cursor-pointer"
          onClick={deleteBlog}
        />
      </td>
    </tr>
  )
}

export default BlogTableItems