import { defineStore } from 'pinia';
import axios from 'axios';
import SweetAlert from '@/mixin/sweetAlert';
export const useAdminProduct = defineStore('adminProduct', {
    state: () => ({
        products: []
    }),
    actions: {
        async getProducts() {
            try {
                const url = `${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/admin/products`;
                const response = await axios.get(url);
                this.products = response.data.products;
            } catch (error) {
                SweetAlert.typicalType(error, error, 'error');
            }
        }
    }

})