import axios from "axios";

export const globalInstance = axios.create({
    baseURL: import.meta.env.VITE_LIVE_URL
})