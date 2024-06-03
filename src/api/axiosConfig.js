import axios from "axios";

const userRequest = axios.create({
    baseURL: `${import.meta.env.VITE_APP_URL}`
});

export default userRequest;