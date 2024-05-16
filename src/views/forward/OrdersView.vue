<template>
    <!-- 訂單查詢 -->
    <section>
        <div class="col-md-10 mx-auto">
            <ul class="orders-ul">
                <li class="orders-item" @click="setFilter('all')"><span class="orders-link">全部</span></li>
                <li class="orders-item" @click="setFilter('unpaid')"><span class="orders-link">未付款</span>
                </li>
                <li class="orders-item" @click="setFilter('paid')"><span class="orders-link">已付款</span>
                </li>
            </ul>
        </div>
        <div class="col-md-10 mx-auto">
            <div class="card mb-3" v-for="item in filteredOrders" :key="item.id">
                <div class="row g-0">
                    <!-- <div class="col-md-4">
                        <img :src="item.product.imageUrl" class="img-fluid rounded-start" alt="...">
                    </div> -->
                    <div class="col-md-8">
                        <div class="card-body">
                            <p class="card-text">訂購人:<span>{{ item.user.name }}</span></p>
                            <p class="card-text">信箱:<span>{{ item.user.email }}</span></p>
                            <p class="card-text">地址:<span>{{ item.user.address }}</span></p>
                            <p class="card-text">備註:<span>{{ item.user.message }}</span></p>
                            <p class="card-text">電話:<span>{{ item.user.tel }}</span></p>
                            <p class="card-text"><small class="text-muted">付款狀態:</small>
                                <span v-if="item.is_paid === true" class="text-success">已付款</span>
                                <span v-else class="text-muted">未付款</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>


</template>
<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import SweetAlert from '@/mixin/sweetAlert';
const orders = ref([]);
const filterType = ref('all'); //新增一個響應是參考來存儲當前的篩選類型

const getOrder = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/orders`);
        orders.value = response.data.orders;
    } catch (error) {
        SweetAlert.typicalType('失敗', error, 'error');
    }
}

const filteredOrders = computed(() => {
    if (filterType.value === 'all') {
        return orders.value; //顯示所有訂單
    } else if (filterType.value === 'unpaid') {
        return orders.value.filter(orders => !orders.is_paid); //顯示未付款訂單
    } else if (filterType.value === 'paid') {
        return orders.value.filter(orders => orders.is_paid);
    }
    return []; //當無效的篩選類型時返回空陣列
})
// 設置篩選類型
const setFilter = (type) => {
    filterType.value = type;
}



onMounted(async () => {
    await getOrder();
});


</script>
<style lang="scss">
section {
    .orders-ul {
        background: #fff;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        display: flex;
        margin-bottom: 12px;
        overflow: hidden;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 10;
        padding: 0;

        .orders-item {
            align-items: center;
            background: #fff;
            border-bottom: 2px solid rgba(0, 0, 0, .09);
            color: rgba(0, 0, 0, .8);
            cursor: pointer;
            display: flex;
            flex: 1;
            font-size: 16px;
            justify-content: center;
            line-height: 19px;
            overflow: hidden;
            padding: 16px 0;
            text-align: center;
            transition: color .2s;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            text-decoration: none;

            &:hover {
                background-color: #3f3f3f;
                color: #fdfdfd;
            }

            .orders-link {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                box-shadow: none;

            }
        }
    }



}
</style>