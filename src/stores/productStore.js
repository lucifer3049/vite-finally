import { defineStore } from 'pinia';
import axios from 'axios';
import SweetAlert from '@/mixin/sweetAlert';

export const useProductsStore = defineStore('productsStore', {
  state: () => ({
    products: [],
    isLoading: false,
    pagination: { //分頁
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 0,
    },
    loadingStatus: { loadingItem: "" },
  }),
  getters: {
    sortProducts: ({ products }) => {
      return products.sort((a, b) => a.price - b.price);
    }
  },
  actions: {
    async getProducts(page = 1, perPage = 5) {
      this.isLoading = true;
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/products?page=${page}&perPage=${perPage}`);
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