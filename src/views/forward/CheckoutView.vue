<template>
    <!-- 結帳畫面確認 -->
    <div class="my-5 row justify-content-center">
        <form class="col-md-6" @submit.prevent="payOrder">
            <table class="table align-middle">
                <thead>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                </thead>
                <tbody>
                    <!-- {{ order.products }} -->
                    <!-- {{ order.products }} -->
                    <tr v-for="item in order.products" :key="item">
                        <td>{{ item.product.title }}</td>
                        <td>{{ item.qty }}/{{ item.product.unit }}</td>
                        <td class="text-end">{{ item.final_total }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" class="text-end">總計</td>
                        <td class="text-end">{{ order.total }}</td>
                    </tr>
                </tfoot>
            </table>

            <table class="table">
                <tbody>
                    <tr>
                        <th width="100">Email</th>
                        <td>{{ order.user.email }}</td>
                    </tr>
                    <tr>
                        <th>姓名</th>
                        <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                        <th>收件人電話</th>
                        <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                        <th>收件人地址</th>
                        <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                        <th>付款狀態</th>
                        <td>
                            <span v-if="!order.is_paid">尚未付款</span>
                            <span v-else class="text-success">付款完成</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="text-end" v-if="order.is_paid === false">
                <button class="btn btn-danger">確認付款去</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, watchEffect } from 'vue'; //reactive,
import SweetAlert from '@/mixin/sweetAlert';
import { useRoute } from 'vue-router';


//使用reactive創建一個響應式對象來存訂單資訊
const order = ref({ user: {} });
// 使用ref創建一個響應式變量來儲存訂單ID
const orderId = ref('');
// 使用ref創建一個響應式變量來追蹤載入狀態
const isLoading = ref(false);

// 獲取訂單資訊
const getOrder = async () => {
    const url = `${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/order/${orderId.value}`;
    isLoading.value = true;
    try {
        const response = await axios.get(url);
        order.value = response.data.order; //更新訂單資訊
        isLoading.value = false; //關閉過場動畫
        console.log(response.data.order);
    } catch (error) {
        SweetAlert.typicalType('失敗', error, 'error');
        isLoading.value = false;
    }
};

// 處理訂單支付的方式
const payOrder = async () => {
    const url = `${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/pay/${orderId.value}`;
    isLoading.value = true;
    try {
        await axios.post(url);
        isLoading.value = false;
        getOrder(); //支付後刷新訂單
    } catch (error) {
        isLoading.value = false;
    }
};
// 在組件掛載時初始化訂單ID和獲取訂單資訊
onMounted(async () => {
    const router = useRoute(); //訪問路由參數
    orderId.value = router.params.orderId;

    console.log(orderId.value);
    await getOrder();
});
// 監聽orderId變化並重新取得訂單資訊
watchEffect(() => {
    if (orderId.value) {
        getOrder();
    }
});
</script>