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
                  
                            <div class="card-text ">
                                <div class="input-group input-group-sm">
                                    <input type="number" class="form-control" min="1" max="20"
                                        v-model.number="quantity">
                                    <div class="input-group-text">/ {{ product.unit }}</div>
                                </div>
                            </div>

                            <p class="card-text text-end">
                                <small class="text-body-secondary">NT{{ $filters.currency(product.origin_price)
                                    }}</small>
                            </p>
                            <div class="text-end">
                                <button type="button" class="btn btn-outline-success" @click="addToCart">加入購物車</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row ">
                <div class="col-md-8 mx-">
                    <!-- <div class="" v-for="item in product" :key="item"> -->
                    <div class="title">
                        <!-- 商品規格 -->
                        <p>{{ product.content }}</p>
                
                        <!-- 產品介紹 -->
                        <p>{{ product.description }}</p>
                    </div>
                    <!-- </div> -->
                </div>
                <!-- <div v-for="image in product.imagesUrl" :key="image" class="col-md-8 mx-auto">
                    <img :src="image" class="img-fluid rounded-start" :alt="image.category">
                </div> -->
            </div>

        </div>

    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
// useRoute可以訪問當前路由訊息，路徑，參數，字符串等
// useRouter 要導航到其他路由訪問路由參數
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import SweetAlert from '@/mixin/sweetAlert';
export default {
    setup() {
        const product = ref({}); //用ref創建響應式變量
        const router = useRoute(); //路由
        const routers = useRouter();
        const isLoading = ref(false);
        const quantity = ref(1); //初始化數量為1


        const getProduct = async () => {
            isLoading.value = true;
            try {
                const { id } = router.params;
                const response = await axios.get(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/product/${id}`);
                product.value = response.data.product;
                isLoading.value = false;
                console.log(product.value);
                // SweetAlert.typicalType('成功', response.data.message, 'success');

            } catch (error) {
                SweetAlert.typicalType('失敗', error, 'error');
            }
        };
   

        // 加入購物車
        const addToCart = async () => {
            // 處理要加購物車的邏輯
            const cartItem = {
                product_id: product.value.id,
                quantity: quantity.value,
                price: product.value.origin_price * quantity.value, //計算總價
                qty: quantity.value,
            };
            try {
                const response = await axios.post(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/cart`, { data: cartItem });
                SweetAlert.typicalType('成功', response.data.message, 'success');
                routers.push('/cart');
            } catch (error) {
                SweetAlert.typicalType('失敗', error, 'error');
            }
        }



        onMounted(() => {
            getProduct();
       
        });

        return {
            product,
            getProduct,
            isLoading,
            addToCart,
            quantity,
           
        }


    }
}

</script>