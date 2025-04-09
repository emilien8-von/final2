import axios from "axios"

const API_URL = 'http://local:8000'
const INSTANCE = axios.create({
    baseUrl : API_URL,
    withCredentials : true,
    headers: {
        'Content-Type' : "application/json"
    }
})
export default INSTANCE