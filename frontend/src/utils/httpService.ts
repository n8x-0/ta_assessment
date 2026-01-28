import axios from "axios";
const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:3000"
console.log(API_BASE_URL);

const httpService = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
})

httpService.interceptors.response.use(undefined, err => {    
    const errResponseMessage = err.response.data.message
    switch (err.status) {
        case 400: throw new Error(errResponseMessage || "Bad Request")
        case 401: throw new Error(errResponseMessage || "Unauthorized Please Login Again")
        case 403: throw new Error(errResponseMessage || "you are not authorized to access this resource")
        case 404: throw new Error(errResponseMessage || "Resource Not Found")
        case 429: throw new Error(errResponseMessage || "Too Many Requests. Please try again later.")
        case 500: throw new Error(errResponseMessage || "Internal Server Error")
    }
    return err
})

export default httpService;