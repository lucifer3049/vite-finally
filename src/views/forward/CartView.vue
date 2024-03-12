<template>
    <!-- 購物車 -->
    <div class="container">
        <LoadingPlugin :active="isLoading"></LoadingPlugin>
        <div class="text-end mt-4">
            <button type="button" class="btn btn-outline-danger" @click="deleteAllCarts">清空購物車</button>
        </div>
        <table class="table align-middle">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">名稱</th>
                    <th scope="col">數量</th>
                    <th scope="col">價格</th>
                    <th scope="col">編輯</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="cart.carts">
                    <tr v-for="item in cart.carts" :key="item">
                        <td><img :src="item.product.imageUrl" alt=""></td>
                        <td>
                            {{ item.product.title }}
                            <div class="text-success" v-if="item.coupon">已套用優惠卷</div>
                        </td>
                        <td>
                            <div class="input-group input-group-sm">
                                <input type="number" class="form-control" v-model="item.qty" max="20" min="1">
                                <div class="input-group-text">/{{ item.product.unit }}</div>
                            </div>
                        </td>
                        <td class="text-end">
                            <small v-if="cart.final_total !== cart.total" class="text-success">折扣價:</small>
                            {{ $filters.currency(item.final_total) }}
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>
                </template>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" class="text-end">總計</td>
                    <td class="text-end">{{ $filters.currency(cart.total) }}</td>
                </tr>
                <tr v-if="cart.final_total !== cart.total">
                    <td colspan="3" class="text-end text-success">折扣價</td>
                    <td class="text-end text-success">
                        {{ $filters.currency(cart.final_total) }}
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>
<style lang="scss">
img {
    width: 150px;
    height: 150px;
}
</style>
<!-- <script>
export default {
    data() {
        return {
            cart: {},
            loadingStatus: {
                loadingItem: "",
            },
            isLoading: false,
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: '',
            }
        }
    },
    methods: {
        getCart() {
            this.$http.get(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/cart`)
                .then((response) => {
                    this.cart = response.data.data;
                })
                .catch((error) => {
                    this.$httpMessageState(error.response, '錯誤訊息');
                })
        }
    },
    created() {
        this.getCart();
    }
}

</script> -->


<script>
import axios from 'axios';
import { ref, onMounted, inject } from 'vue';

export default {
    setup() {
        const cart = ref({});
        const isLoading = ref(false);
        const $httpMessageState = inject('$httpMessageState');

        const getCart = async () => {
            isLoading.value = true;
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/cart`);
                cart.value = response.data.data;
                isLoading.value = false;
                $httpMessageState(response);
                // console.log(cart.value);
            } catch (error) {
                $httpMessageState(error.response, '錯誤訊息');
                // console.log(error.response, '錯誤訊息');
            }

        };
        const deleteAllCarts = async () => {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/carts`);
                $httpMessageState(response, '清除購物車');
                getCart();
            } catch (error) {
                $httpMessageState(error.response, '清除購物車');
                // alert(error);
            }
        }
        onMounted(() => {
            getCart();
        });

        return {
            cart,
            getCart,
            isLoading,
            deleteAllCarts,
        }

    }
}

</script>