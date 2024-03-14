<template>
    <!-- 購物車 -->
    <div class="container">

        <LoadingPlugin :active="isLoading"></LoadingPlugin>
        <div class="text-end mt-4">
            <button type="button" class="btn btn-outline-danger" @click="deleteAllCarts()">清空購物車</button>
        </div>
        <table class="table align-middle">
            <thead>
                <tr>
                    <th scope="col">
                        <div class="input-group">
                            <input class="form-check-input mt-0" type="checkbox" v-model="selected"
                                @change="selectAllItems(item)">
                        </div>
                    </th>
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
                        <td>
                            <div class="input-group">
                                <input class="form-check-input mt-0" type="checkbox" v-model="item.selected"
                                    @change="selectAllItems(item)">
                            </div>
                        </td>
                        <td><img :src="item.product.imageUrl" alt=""></td>
                        <td>
                            {{ item.product.title }}
                            <div class="text-success" v-if="item.coupon">已套用優惠卷</div>
                        </td>
                        <td>
                            <div class="input-group input-group-sm">
                                <input type="number" class="form-control" v-model="item.qty" max="20" min="1"
                                    @blur="updateCart(item)">
                                <div class="input-group-text">/{{ item.product.unit }}</div>
                            </div>
                        </td>
                        <td class="text-end">
                            <small v-if="cart.final_total !== cart.total" class="text-success">折扣價:</small>
                            {{ $filters.currency(item.final_total) }}
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-danger"
                                :disabled="status.loadingItem === item.id" @click="removeCartItem(item.id)"><i
                                    class="bi bi-trash"></i></button>
                        </td>
                    </tr>
                </template>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4" class="text-end">總計</td>
                    <td class="text-end">{{ $filters.currency(cart.total) }}</td>
                </tr>
                <tr v-if="cart.final_total !== cart.total">
                    <td colspan="4" class="text-end text-success">折扣價</td>
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
<script>
import axios from 'axios';
import { ref, onMounted, inject, computed } from 'vue';


export default {
    setup() {
        const cart = ref({});
        const isLoading = ref(false);
        const httpMessageState = inject('httpMessageState');
        const status = ref({ loadingItem: '' });  //刪除單一購物車
        const selected = ref(false);


        // 查詢購物車
        const getCart = async () => {
            isLoading.value = true;
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/cart`);
                // cart.value = response.data.data;
                cart.value = {
                    ...response.data.data,
                    carts: response.data.data.carts.map(item => ({ ...item, selected: false })),
                }
                isLoading.value = false;

                httpMessageState(response, status);
                // console.log(cart.value);
            } catch (error) {
                httpMessageState(error.response, status);
                // console.log(error.response, '錯誤訊息');
            }

        };
        // 刪除全部購物車
        const deleteAllCarts = async () => {
            isLoading.value = true;
            try {
                // const selectedItems = cart.value.carts.filter(item => item.selected);
                // 檢查是否有複選框被選中
                const hasSelectedItems = cart.value.carts.some(item => item.selected);

                if (hasSelectedItems) {
                    const selectedItems = cart.value.carts.filter(item => item.selected);
                    // 逐个删除被選中的项目
                    for (const item of selectedItems) {
                        await removeCartItem(item.id); // 呼叫單一刪除
                        isLoading.value = false;
                    }
                } else {
                    await axios.delete(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/carts`);
                }

                getCart();
                // console.log(selectedItems);
                // $httpMessageState(response, status);

            } catch (error) {
                httpMessageState(error.response, status);
                isLoading.value = false;

            }
        };
        // 刪除單一購物車產品
        const removeCartItem = async (id) => {
            isLoading.value = true;
            try {
                status.value.loadingItem = id;
                const response = await axios.delete(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/cart/${id}`);
                httpMessageState(response, status);
                status.value.loadingItem = '';
                isLoading.value = false;
                getCart();
            } catch (error) {
                httpMessageState(error.response, status);
                isLoading.value = false;
            }
        };

        const updateCart = async (data) => {
            isLoading.value = true;
            const cart = {
                product_id: data.product_id,
                qty: data.qty,
            };
            try {
                const response = await axios.put(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/cart/${data.id}`, { data: cart });
                isLoading.value = false;
                httpMessageState(response, status);
                getCart();
            } catch (error) {
                isLoading.value = false;
                httpMessageState(error.response, status);
            }
        };
        const allSelected = computed({
            get: () => cart.value.carts && cart.value.carts.every(item => item.selected),
            set: (value) => {
                if (cart.value.carts) {
                    cart.value.carts.forEach(item => {
                        item.selected = value;
                    });
                }
            },
        });
        const selectAllItems = (itemId) => {
            if (itemId) {
                const item = cart.value.carts.find(item => item.id === itemId);
                if (item) {
                    item.selected = !item.selected;
                }
            } else {
                allSelected.value = !allSelected.value;
            }
        };

        onMounted(() => {
            getCart();
        });

        return {
            cart,
            getCart,
            isLoading,
            deleteAllCarts,
            removeCartItem,
            status,
            updateCart,
            httpMessageState,

            selected,
            allSelected,
            selectAllItems,

        }

    }
}

</script>