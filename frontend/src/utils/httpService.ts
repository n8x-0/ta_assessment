import axios from "axios";

const httpService = axios.create({
    baseURL: "https://api.freecurrencyapi.com/v1",
    withCredentials: true,
})

httpService.interceptors.response.use(undefined, response => {    
    switch (response.status) {
        case 400: throw new Error("Bad Request")
        case 401: throw new Error("Unauthorized Please Login Again")
        case 403: throw new Error("you are not authorized to access this resource")
        case 404: throw new Error("Page Not Found")
        case 429: throw new Error("Too Many Requests. Please try again later.")
        case 500: throw new Error("Internal Server Error")
    }
    return response
})

export default httpService;