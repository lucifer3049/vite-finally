<template>
    <!-- 單一產品細節 -->
    <div class="container">
        <LoadingPlugin :active="isLoading"></LoadingPlugin>
        <div class="row">
            <div class="card mb-3 mt-5">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img :src="product.imageUrl" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{{ product.title }}</h5>
                            <p class="card-text">{{ product.description }}</p>
                            <p class="card-text">
                                <small class="text-body-secondary">NT{{ product.origin_price }}</small>
                            </p>
                            <div class="text-end">
                                <button type="button" class="btn btn-outline-success">加入購物車</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row ">
                <div v-for="image in product.imagesUrl" :key="image" class="col-md-8 mx-auto">
                    <img :src="image" class="img-fluid rounded-start" :alt="image.category">
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
    setup() {
        const product = ref({}); //用ref創建響應式變量
        const $httpMessageState = inject('$httpMessageState');
        const route = useRoute(); //路由
        const isLoading = ref(false);


        const getProduct = async () => {
            isLoading.value = true;
            try {
                const { id } = route.params;
                const response = await axios.get(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/product/${id}`);
                product.value = response.data.product;
                isLoading.value = false;
                console.log(response.data.product);
                $httpMessageState(response, '成功取得產品資訊');
            } catch (error) {
                $httpMessageState(error.response, '成功取得產品資訊');
            }
        };

        onMounted(() => {
            getProduct();
        });

        return {
            product,
            getProduct,
            isLoading,
        }


    }
}

</script>