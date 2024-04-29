<template>

    <!-- 產品列表 -->
    <div class="container">
        <LoadingPlugin :active="productsStore.isLoading" :color="color" :loader="loader">
        </LoadingPlugin>
        <div class="row col-md-10 mx-auto">
            <div class="col-md-4 mt-5" v-for="item in productsStore.products" :key="item">
                <div class="card">
                    <router-link :to="`/product/${item.id}`">
                        <!-- <img :src="item.imageUrl" alt=""> -->
                        <img :src="item.imageUrl" class="card-img-top" alt="...">
                    </router-link>
                    <div class="card-body">
                        <h5 class="card-title">{{ item.title }}</h5>
                        <div class="text-right" v-if="item.price">
                            現價 NT{{ item.price }}
                        </div>
                        <del class="text-right" v-if="item.price">
                            原價 NT {{ item.origin_price }}
                        </del>
                        <div class="d-grid">
                            <button type="button" class="btn btn-outline-secondary btn-lg"
                                @click="cartStore.addTotheCart(item.id)"><i class="bi bi-cart"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Pagination class="mt-5" :pages="productsStore.pagination" @emit-pages="productsStore.getProducts"></Pagination>
    </div>

</template>

<script>
import { ref, onMounted } from 'vue';
import Pagination from '@/components/PaginationView.vue';
import { useProductsStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore.js';
// import axios from 'axios';
// import SweetAlert from '@/mixin/sweetAlert';

export default {
    components: {
        Pagination,

    },
    setup() {
        const productsStore = useProductsStore();
        const cartStore = useCartStore();
        // const products = ref([]);
        // const pagination = ref({});
        // const loadingStatus = ref({ loadingItem: "" });
        // const isLoading = ref(false);
        const color = ref('#007979');
        const loader = ref('bars');
        // const getProducts = async (page = 1) => {

        //     isLoading.value = true;
        //     try {

        //         const response = await axios.get(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/products?page=${page}`);
        //         products.value = response.data.products;
        //         pagination.value = response.data.pagination;
        //         isLoading.value = false;

        //         // SweetAlert.typicalType('成功', '取得產品資訊', 'success');
        //     } catch (error) {
        //         SweetAlert.typicalType(error, error, 'error');
        //         isLoading.value = false;
        //     }
        // };

        // const addTotheCart = async (id, qty = 1) => {
        //     isLoading.value = true;
        //     loadingStatus.value.loadingItem = id;
        //     const card = {
        //         product_id: id,
        //         qty,
        //     };
        //     try {
        //         const response = await axios.post(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/cart`, { data: card });
        //         loadingStatus.value.loadingItem = "";
        //         isLoading.value = false;

        //         SweetAlert.typicalType('成功', response.data.message, 'success');

        //     } catch (error) {
        //         SweetAlert.typicalType('失敗', error, 'error');
        //         isLoading.value = false;
        //     }
        // };
        // 在組件中掛載產品數量的數據
        onMounted(() => {
            // getProducts();
            productsStore.getProducts();
        });

        return {

            // products,
            // pagination,
            // loadingStatus,
            // isLoading,
            // getProducts,
            // addTotheCart,
            color,
            loader,

            productsStore,
            cartStore
        }
    }
}
</script>

<style lang="scss">
.card {
    width: 100%;
    background-color: #afadad1a;
    margin-top: 3rem;
    border: none;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
        // transform: scale(1.1);
        /* 鼠标悬停时放大 1.1 倍 */
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        /* 添加阴影 */
    }

    .card-img-top {
        width: 100%;

    }

}

.btn.btn-outline-secondary {
    color: rgb(0, 0, 0);
    font-size: 1.6rem;

    &:hover {
        color: rgb(255, 255, 255);
    }
}
</style>