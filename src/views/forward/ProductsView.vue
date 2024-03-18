<template>
    <!-- 產品列表 -->
    <div class="container">
        <LoadingPlugin :active="isLoading"></LoadingPlugin>
        <div class="row">
            <div class="col-md-4" v-for="item in  products " :key="item">
                <div class="card">
                    <router-link :to="`/product/${item.id}`">
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
                                @click="addTotheCart(item.id)"><i class="bi bi-cart"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
        </div>
    </div>

</template>

<script>
import { ref, inject, onMounted } from 'vue';
import Pagination from '@/components/PaginationView.vue';
import axios from 'axios';

export default {
    components: {
        Pagination,
    },
    setup() {
        const products = ref([]);
        const pagination = ref({});
        const loadingStatus = ref({ loadingItem: "" });
        const isLoading = ref(false);
        const httpMessageState = inject('httpMessageState');
        const getProducts = async (page = 1) => { //
            isLoading.value = true;
            try {
                // const response = await axios.get(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/products`);
                const response = await axios.get(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/products?page=${page}`);
                products.value = response.data.products;
                pagination.value = response.data.pagination;
                // console.log(response.data.products);
                isLoading.value = false;
                // httpMessageState(response, '成功');
            } catch (error) {
                httpMessageState(error.response, '錯誤訊息');
            }
        };

        const addTotheCart = async (id, qty = 1) => {
            isLoading.value = true;
            loadingStatus.value.loadingItem = id;
            const card = {
                product_id: id,
                qty,
            };

            try {
                const response = await axios.post(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/cart`, { data: card });
                loadingStatus.value.loadingItem = "";
                isLoading.value = false;
                httpMessageState(response);
            } catch (error) {
                httpMessageState(error.response, '加入購物車失败');
            }
        };
        // 在組件中掛載產品數量的數據
        onMounted(() => {
            getProducts();
        });

        return {
            products,
            pagination,
            loadingStatus,
            isLoading,
            getProducts,
            addTotheCart,
            httpMessageState,
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
        transform: scale(1.1);
        /* 鼠标悬停时放大 1.1 倍 */
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        /* 添加阴影 */
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