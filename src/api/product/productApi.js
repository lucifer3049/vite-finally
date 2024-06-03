import userRequest from "../axiosConfig";

// 產品列表
export const getProducts = (page = 1) => {
    return userRequest.get(`v2/api/${import.meta.env.VITE_APP_PATH}/products?page=${page}`);
}