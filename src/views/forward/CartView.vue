<template>
    <!-- 購物車 -->
    <div class="container">
        <LoadingPlugin :active="isLoading"></LoadingPlugin>
        <CartNavbar></CartNavbar>
        <CartList></CartList>

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
<script>
import axios from 'axios';
import { ref, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import CartNavbar from '@/components/CartNavbar.vue';
import CartList from '@/components/CartList.vue';
import SweetAlert from '@/mixin/sweetAlert';

export default {
    components: {
        CartNavbar,
        CartList,
    },
    setup() {
  
        const isLoading = ref(false);//過場動畫
        const status = ref({ loadingItem: '' });  //刪除單一購物車
        const coupon_code = ref(''); //優惠卷
        const form = reactive({ user: { name: '', email: '', tel: '', address: '' }, message: '' });//驗證表單
        const router = useRoute(); //路由





        // 新增優惠卷
        const addCouponCode = async (data) => {
            const coupon = {
                code: data.coupon_code,
            };
            try {
                const response = await axios.post(`${import.meta.env.VITE_APP_URL}api/${import.meta.env.VITE_APP_PATH}/coupon`, { data: coupon });
                SweetAlert.typicalType('成功', response.data.message, 'success');
                // getCart();

            } catch (error) {
                SweetAlert.typicalType('失敗', error, 'error');
            };
        };
        // 送出訂單
        const createOrder = async () => {
            const order = form;
            try {
                const response = await axios.post(`${import.meta.env.VITE_APP_URL}api/${import.meta.env.VITE_APP_PATH}/order`, { data: order });
                SweetAlert.typicalType('成功', response.data.message, 'success');
                // console.log(response.data.orderId);
                router.push(`checkout/${response.data.orderId}`);
                form.value = {};
            } catch (error) {
                SweetAlert.typicalType('失敗', error, 'error');
            }
        }
        onMounted(() => {

        });



        return {
         

            isLoading,

            status,

            addCouponCode,
            coupon_code,

            createOrder,
            form,
        }

    }
}

</script>