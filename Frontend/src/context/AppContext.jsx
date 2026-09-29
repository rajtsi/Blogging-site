import React from 'react'
import axios from 'axios'
import { useContext, useEffect, useState, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASEURL
const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [blogsLoading, setBlogsLoading] = useState(true);
    const [input, setInput] = useState("");
    const [authLoading, setAuthLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setToken(null);
        setUser(null);

        delete axios.defaults.headers.common['Authorization'];

        navigate('/login');
    }

    const fetchBlogs = async () => {
        try {
            setBlogsLoading(true);

            const { data } = await axios.get('/api/blog/getAllBlogs');

            if (data.status) {
                setBlogs(data.data);
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
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        console.log("token is", storedToken);

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));

            axios.defaults.headers.common['Authorization'] =
                `Bearer ${storedToken}`;
        }

        setAuthLoading(false);
    }, []);

    useEffect(() => {
        if (token) {
            fetchBlogs();
        } else {
            setBlogs([]);
        }
    }, [token]);

    const value = {
        axios,
        navigate,
        token,
        setToken,
        user,
        setUser,
        authLoading,
        blogs,
        setBlogs,
        blogsLoading,
        setBlogsLoading,
        input,
        setInput,
        logout
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)