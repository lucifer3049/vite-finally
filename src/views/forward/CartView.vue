<template>
    <!-- 購物車 -->
    <div class="container">
        <LoadingPlugin :active="isLoading"></LoadingPlugin>
        <div class="text-end mt-4">
            <button type="button" class="btn btn-outline-danger" @click="deleteAllCarts()">刪除購物車</button>
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
                    <td colspan="5" class="text-end">總計</td>
                    <td class="text-end">{{ $filters.currency(cart.total) }}</td>
                </tr>
                <tr v-if="cart.final_total !== cart.total">
                    <td colspan="5" class="text-end text-success">折扣價</td>
                    <td class="text-end text-success">
                        {{ $filters.currency(cart.final_total) }}
                    </td>
                </tr>
            </tfoot>
        </table>
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="請輸入優惠卷" v-model="coupon_code">
            <div class="input-group-append">
                <button type="button" class="btn btn-outline-success" @click="addCouponCode">套用優惠卷</button>
            </div>
        </div>
        <!-- 表單 -->
        <div class="row ">
            <FormVee for="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <FieldVee id="email" name="email" type="email" class="form-control"
                        :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入Email" rules="email|required"
                        v-model="form.user.email">
                    </FieldVee>
                    <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                    <label for="name" class="form-label">姓名</label>
                    <FieldVee id="name" name="姓名" type="name" class="form-control"
                        :class="{ 'is-invalid': errors['姓名'] }" placeholder="請輸入姓名" rules="required"
                        v-model="form.user.name">
                    </FieldVee>
                    <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                    <label for="tel" class="form-label">電話</label>
                    <FieldVee id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                        placeholder="請輸入電話" rules="required|min:8|max:10" v-model="form.user.tel">
                    </FieldVee>
                    <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">地址</label>
                    <FieldVee for="address" name="地址" type="address" class="form-control"
                        :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required"
                        v-model="form.user.address">
                    </FieldVee>
                    <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label">留言</label>
                    <textarea name="" id="message" cols="30" rows="10" class="form-control"
                        v-model="form.user.message"></textarea>
                </div>
                <div class="text-end">
                    <button type="submit" class="btn btn-outline-primary">送出訂單</button>
                </div>
            </FormVee>
        </div>
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
import { ref, onMounted, inject, computed, reactive } from 'vue';
import { useRoute } from 'vue-router';


export default {
    setup() {
        const cart = ref({}); //購物車資料
        const isLoading = ref(false);//過場動畫
        const httpMessageState = inject('httpMessageState');
        const status = ref({ loadingItem: '' });  //刪除單一購物車
        const selected = ref(false); //判斷checkbox是否有勾選
        const coupon_code = ref(''); //優惠卷
        const form = reactive({ user: { name: '', email: '', tel: '', address: '' }, message: '' });//驗證表單
        const router = useRoute(); //路由



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
                        // await removeCartItem(item.id); // 呼叫單一刪除
                        //刪除勾選的時候
                        await axios.delete(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/cart/${item.id}`);
                    }
                    isLoading.value = false;
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
        //更新購物車數量
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
        // 新增優惠卷
        const addCouponCode = async (data) => {
            const coupon = {
                code: data.coupon_code,
            };
            try {
                const response = await axios.post(`${import.meta.env.VITE_APP_URL}api/${import.meta.env.VITE_APP_PATH}/coupon`, { data: coupon });
                httpMessageState(response, status);
                getCart();

            } catch (error) {
                httpMessageState(error.response, status);
            };
        };
        // 送出訂單
        const createOrder = async () => {
            const order = form;
            try {
                const response = await axios.post(`${import.meta.env.VITE_APP_URL}api/${import.meta.env.VITE_APP_PATH}/order`, { data: order });
                httpMessageState(response.data, '建立訂單');
                // console.log(response.data.orderId);
                router.push(`checkout/${response.data.orderId}`);
                form.value = {};
            } catch (error) {
                // httpMessageState(error.response);
                alert(error)
            }
        }
        onMounted(() => {
            getCart();
        });
        // 創建一個計算
        const allSelected = computed({
            // 定義getter函式，用來取得計算屬性的值
            get: () => cart.value.carts && cart.value.carts.every(item => item.selected),
            // 定義setter函式，用於設定計算屬性的值
            set: (value) => {
                // 檢查購物車是否有商品
                if (cart.value.carts) {
                    // 遍歷購物車的每個商品
                    cart.value.carts.forEach(item => {
                        // 將商品的選擇狀態設定為value
                        item.selected = value;
                    });
                }
            },
        });
        // 定義selectAllItems的函式，用於切換選擇所有商品的狀態
        const selectAllItems = (itemId) => {
            // 如果提供了itemId，就表示要切換特定商品的選擇狀態
            if (itemId) {
                // 在購物車中尋找與提供itemId降伏的產品
                const item = cart.value.carts.find(item => item.id === itemId);
                // 假如找到商品了
                if (item) {
                    // 切換商品的選擇狀態(選擇到取消選擇，或從取消選擇到選擇)
                    item.selected = !item.selected;
                }
            } else {
                // 如果未提供itemId，表示要切換所有商品的選擇狀態
                // 利用allSelected計算的屬性來切換商品的選擇狀態
                allSelected.value = !allSelected.value;
            }
        };


        return {
            cart,
            getCart,
            isLoading,
            deleteAllCarts,
            removeCartItem,
            status,
            updateCart,
            httpMessageState,
            addCouponCode,
            coupon_code,

            selected,
            allSelected,
            selectAllItems,

            createOrder,
            form,
        }

    }
}

</script>