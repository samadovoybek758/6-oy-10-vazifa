import axios from "axios";


const http = axios.create({
    baseURL: "https://trello.vimlc.uz/"
});



http.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

http.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        if (error.response && error.response.status === 401) {
            console.log('Autentifikatsiya xatosi. Log out qilish kerak.');
        }
        return Promise.reject(error)
    }
   
)

export default http