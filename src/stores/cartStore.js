import { defineStore } from 'pinia';
import SweetAlert from '@/mixin/sweetAlert';
import axios from 'axios';
export const useCartStore = defineStore('cart', {
  // 在此可以使用箭頭函式，不過其它地方一樣不行
  state: () => {
    return {
      cart: { carts: [] }, //購物車
      loadingStatus: { loadingItem: "" }, //購物車ID
      isLoading: false, //過場動畫
      status: { loadingItem: "" }, //刪除購物車ID
      allSelected: false, //checkbox的狀態
      coupon_code: '', //新增優惠卷
      coupons: [],//優惠卷查詢
    };
  },
  actions: {
    // 查詢購物車資料
    async getCart() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/cart`);
        this.cart = {
          ...response.data.data,
          carts: response.data.data.carts.map(item => ({ ...item, selected: false })),
        };
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        SweetAlert.typicalType('失敗', error, 'error');
      }
    },
    // 加入購物車
    async addTotheCart(id, qty = 1) {
      this.isLoading = true;
      this.loadingStatus.loadingItem = id;
      const card = {
        product_id: id,
        qty,
      };
      try {
        const response = await axios.post(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/cart`, { data: card });
        this.loadingStatus.loadingItem = "";
        SweetAlert.typicalType('成功', response.data.message, 'success');
        this.isLoading = false;
      } catch (error) {
        SweetAlert.typicalType('失敗', error, 'error');
        this.isLoading = false;
      }
    },

    // 更新購物車
    async updateCart(data) {
      this.isLoading = true;
      const cart = {
        product_id: data.product_id,
        qty: data.qty,
      };
      try {
        const response = await axios.put(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/cart/${data.id}`, { data: cart });
        this.isLoading = false;
        SweetAlert.typicalType('成功', response.data.message, 'success');
      } catch (error) {
        this.isLoading = false;
        SweetAlert.typicalType('失敗', error, 'error');
      }
    },
    // 刪除購物車
    async removeCartItem(id) {
      this.isLoading = true;
      this.status.loadingItem = id;
      try {
        this.status.loadingItem = id;
        const response = await axios.delete(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/cart/${id}`);
        this.status.loadingItem = '';
        SweetAlert.typicalType('成功', response.data.message, 'success');
        this.isLoading = false;
        this.getCart();
      } catch (error) {
        SweetAlert.typicalType('失敗', error, 'error');
        this.isLoading = false;

      }
    },
    // 刪除全部購物車
    async deleteAllCarts() {
      this.isLoading = true;
      try {

        const hasSelectedItems = this.cart.carts.some(item => item.selected);
        console.log(hasSelectedItems);
        if (hasSelectedItems) {
          const selectedItems = this.cart.carts.filter(item => item.selected);
          for (const item of selectedItems) {
            await axios.delete(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/cart/${item.id}`)
          }

        } else {
          const response = await axios.delete(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/carts`)
          SweetAlert.typicalType('成功', response.data.message, 'success');
        }
        SweetAlert.typicalType('成功', '刪除購物車', 'success');
        this.isLoading = false;
        this.getCart();
      } catch (error) {
        SweetAlert.typicalType('失敗', error, 'error');
        this.isLoading = false;
      }
    },

    // 新增優惠卷
    async addCouponCode(data) {
      const coupon = {
        code: data.coupon_code,
      };
      try {
        const response = await axios.post(`${import.meta.env.VITE_APP_URL}api/${import.meta.env.VITE_APP_PATH}/coupon`, { data: coupon });
        SweetAlert.typicalType('成功', response.data.message, 'success');
      } catch (error) {
        SweetAlert.typicalType('失敗', error, 'error');
      }
    },

    toggleAllItems() { //判斷購物車checkbox的勾選或無勾選
      const allSelected = this.allSelected;
      this.cart.carts.forEach(item => {
        item.selected = !allSelected;
      })
    }
  },
  getters: {
    allSelected: (state) => state.cart.carts.every(item => item.selected), //購物車的checkbox的勾選
    cartList: ({ cart }) => {
      // https://pinia.vuejs.org/core-concepts/getters.html#accessing-other-stores-getters
      const carts = cart.carts.map((item) => {
        return {
          ...item,
          subtotal: item.product.price * item.qty,
        };
      });
      const total = carts.reduce((a, b) => a + b.subtotal, 0);
      const totalItems = carts.reduce((a, b) => a + b.qty, 0); //計算商品數量
      return {
        total,
        carts,
        totalItems
      };
    },
  },
})