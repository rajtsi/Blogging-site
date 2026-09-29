import { useEffect, useState } from 'react'
import { blogCategories } from "../assets/assets"
import { motion } from 'motion/react'
import BlogCard from "./BlogCard"
import { useAppContext } from "../context/AppContext"
import BlogCardSkeleton from "./skeleton/BlogCardSkeleton"
import toast from 'react-hot-toast'

const BlogList = () => {
    const [menu, setMenu] = useState('All')
    const [displayBlogs, setDisplayBlogs] = useState([])
    const { axios, blogs, input, blogsLoading, setBlogsLoading } = useAppContext();

    const searchBlogs = async () => {
        try {
            setBlogsLoading(true);
            const { data } = await axios.get(`/api/blog/search?title=${encodeURIComponent(input)}`);

            if (data.status) {
                setDisplayBlogs(data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setBlogsLoading(false);
        }
    }

    useEffect(() => {
        if (input) searchBlogs();
        else setDisplayBlogs(blogs);
    }, [input, blogs])

    const filteredBlogs = displayBlogs.filter((blog) =>
        menu === 'All' ? true : blog.category === menu
    );

    return (
        <div>
            <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
                {blogCategories.map(item => (
                    <div key={item} className="relative">
                        <button onClick={() => setMenu(item)}
                            className={`cursor-pointer text-gray-500 ${menu == item && 'text-white px-4 pt-0.5'}`}>
                            {item}
                            {menu === item && (
                                <motion.div
                                    layoutId="underline"
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                                />
                            )}
                        </button>
                    </div>
                ))}
            </div>

            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* {
                filteredBlogs().filter((blog)=> menu === 'All' ? true : blog.category === menu).map((blog)=>
                <BlogCard key={blog._id} blog={blog} />
                )
            } */}
                {
                    blogsLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <BlogCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBlogs.map(blog => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default BlogList