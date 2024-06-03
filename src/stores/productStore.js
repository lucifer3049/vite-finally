import { defineStore } from 'pinia';
// import axios from 'axios';
import SweetAlert from '@/mixin/sweetAlert';
// import { getProducts } from '@/api/all'
import { getProducts } from '@/api/product/productApi';


export const useProductsStore = defineStore('productsStore', {
  state: () => ({
    products: [], //產品列表
    isLoading: false, //過廠動畫
    pagination: {},//分頁
    loadingStatus: { loadingItem: "" },
  }),
  getters: {
    sortProducts: ({ products }) => {
      return products.sort((a, b) => a.price - b.price);
    }
  },
  actions: {
    // 前台產品列表page = 1
    async getProducts() {
      this.isLoading = true;
      try {
        // const response = await axios.get(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/products?page=${page}`);
        const response = await getProducts();
        this.products = response.data.products;
        this.pagination = response.data.pagination;
        this.isLoading = false;
      } catch (error) {
        SweetAlert.typicalType(error, error, 'error');
        this.isLoading = false;
      }
    },
  }
});