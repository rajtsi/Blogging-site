import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets'
import Navbar from '../components/Navbar';
import Moment from 'moment'
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Blog = () => {
  // const {blogs} = useAppContext();
  const { axios } = useAppContext();

  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([])
  const [content, setContent] = useState("")

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/getABlog/${id}`);
      console.log("BLOG RESPONSE:", data);

      data.status ? setData(data.data) : toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/api/comment/getBlogComments/${id}`);
      data.status ? setComments(data.data) : toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const addComment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/comment/postComment', {
        blogId: id,
        content
      });

      if (data.status) {
        toast.success(data.message);
        setContent("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }


  useEffect(() => {
    fetchData();
    fetchComments();
  }, [])

  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} className='absolute -top-50 -z-1 opacity-50' alt="" />
      <Navbar />
      <div className='text-center mt-20 text-gray-600 '>
        <p className='text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>
          {data.title}
        </h1>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>
          {data.author?.name || "Unknown Author"}
        </p>
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.imageUrl} alt="" className='rounded-3xl mb-5' />
        <p className='max-w-3xl mx-auto mb-8 text-gray-600 text-lg'>
          {data.description}
        </p>

        <p className='max-w-3xl mx-auto mb-2 text-sm font-medium text-gray-500'>
          Article
        </p>

        <div
          className='rich-text max-w-3xl mx-auto'
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>

      {/* comment section  */}
      <div className='mt-14 mb-10 max-w-3xl mx-auto'>
        <p className='font-semibold'>Comments ({comments.length})</p>
        <div className='flex flex-col gap-4'>
          {comments.map((item, index) => (
            <div key={index} className='relative bg-primary/2 border border-primary/5 max--w-xl p-4 rounded text-gray-600'>
              <div className='flex items-center gap-2 mb-2'>
                <img src={assets.user_icon} alt="" className='w-6' />
                <p className='font-medium'>{item.user?.name || "Unknown User"}</p>
              </div>
              <p className='text-sm max-w-md ml-8'>{item.content}</p>
              <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>
                {Moment(item.createdAt).fromNow()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add a comment section  */}
      <div className='max-w-3xl mx-auto'>
        <p className='font-semibold mb-4'>Add your comment</p>
        <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
          <textarea
            placeholder='Comment'
            required
            className='w-full p-2 border border-gray-300 rounded outline-none h-48'
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>

          <button type='submit' className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>
            Submit
          </button>
        </form>
      </div>

      {/* Share buttons  */}
      <div className='my-24 max-w-3xl mx-auto'>
        <p className='font-semibold my-4'>Share this article on social media</p>
        <div className='flex'>
          <img src={assets.facebook_icon} width={50} alt="" />
          <img src={assets.twitter_icon} width={50} alt="" />
          <img src={assets.googleplus_icon} width={50} alt="" />
        </div>
      </div>


    </div>
  ) : (<Loader />)
}

export default Blog
