import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddBlog = () => {
  const { axios } = useAppContext();

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technology');

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
    }
  }, []);

  const generateContent = async () => {
    if (!title.trim()) {
      return toast.error('Please enter a title to generate content');
    }

    try {
      setLoading(true);

      const { data } = await axios.post('/api/admin/generateBlogContent', {
        title,
        category,
        description
      });

      if (data.status) {
        quillRef.current.root.innerHTML = data.data.Body;
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      toast.error('Please drop an image file');
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      return toast.error('Please upload a blog image');
    }

    try {
      setIsAdding(true);

      const formData = new FormData();

      formData.append('title', title);
      formData.append('description', description);
      formData.append('content', quillRef.current.root.innerHTML);
      formData.append('category', category);
      formData.append('blogImage', image);

      const { data } = await axios.post('/api/blog/postBlog', formData);

      if (data.status) {
        toast.success(data.message);
        setImage(null);
        setTitle('');
        setDescription('');
        setCategory('Technology');
        quillRef.current.root.innerHTML = '';
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">

        <p>Upload Thumbnail</p>

        <label
          htmlFor="image"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="mt-2 w-full max-w-lg h-40 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer overflow-hidden"
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-full object-cover"
              alt="Blog thumbnail"
            />
          ) : (
            <div className="text-center text-gray-400">
              <img src={assets.upload_area} className="h-12 mx-auto mb-2" alt="" />
              <p>Click or drag & drop an image here</p>
            </div>
          )}

          <input
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <p className="mt-4">Blog Title</p>

        <input
          type="text"
          placeholder="Type here"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <p className="mt-4">Blog Category</p>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          {blogCategories
            .filter(item => item !== 'All')
            .map(item => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
        </select>

        <p className="mt-4">Blog Description</p>

        <textarea
          placeholder="Short description of the blog"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded h-24 resize-none"
        />

        <div className="mt-4">
          <div className="flex justify-between items-center max-w-lg">
            <p>Blog Content</p>

            <button
              onClick={generateContent}
              disabled={loading}
              type="button"
              className="text-xs text-white bg-black/70 px-3 py-1.5 rounded cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate with AI'}
            </button>
          </div>

          <div className="max-w-lg h-74 pb-16 pt-2 relative">
            <div ref={editorRef}></div>

            {loading && (
              <div className="absolute inset-0 mt-2 flex items-center justify-center bg-black/10">
                <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
        >
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>

      </div>
    </form>
  )
}

export default AddBlog