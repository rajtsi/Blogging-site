import React from 'react'
import axios from 'axios'
import { useContext, useEffect, useState, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASEURL
const AppContext = createContext();


export const AppProvider = ({ children }) => {

    const navigate = useNavigate();
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([])
    const [blogsLoading, setBlogsLoading] = useState(true)
    const [input, setInput] = useState("")
    const [authLoading, setAuthLoading] = useState(true);


    const fetchBlogs = async () => {
        try {

            const apiResponse = await axios.get('/api/blog/getAllBlogs');
            console.log(apiResponse.data);
            apiResponse.data.status ? setBlogs(apiResponse.data.data) : toast.error(apiResponse.data.message);
        } catch (error) {
            toast.error(error.message)
        } finally {
            setBlogsLoading(false);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        console.log("token is ", token);
        if (token && storedUser) {
            setToken(token);
            setUser(JSON.parse(storedUser));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        if (token)
            fetchBlogs();

        setAuthLoading(false);
    }, [])

    const value = {
        axios, navigate, token, setToken, user,
        setUser, authLoading, blogs, setBlogs, blogsLoading, input, setInput
    }



    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}