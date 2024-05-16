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
     
        const color = ref('#007979');
        const loader = ref('bars');
        // 在組件中掛載產品數量的數據
        onMounted(() => {
            // getProducts();
            productsStore.getProducts();
        });

        return {
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