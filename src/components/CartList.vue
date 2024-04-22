<template>
    <div class="bg-light p-4 my-3 ">
        <div class="text-end" v-if="cartStore.cart.carts.length > 0">
            <button type="button" class="btn btn-outline-danger" @click="cartStore.deleteAllCarts()">刪除購物車</button>
        </div>
        <div v-if="!cartStore.cartList.carts.length">購物車沒有任何品項</div>
        <table v-else class="cart-table align-middle mt-3">
            <tbody class="cart-tbody">
                <tr v-for="cart in cartStore.cart.carts" :key="cart.id">
                    <div class="cart-checkbox">
                        <td>
                            <div class="input-group">
                                <input class="form-check-input mt-0" style="margin: auto;" type="checkbox"
                                    v-model="cart.selected" @change="cartStore.toggleItemSelection(cart)">
                            </div>
                        </td>
                    </div>
                    <div class="cart-img">
                        <td>
                            <img :src="cart.product.imageUrl" class="table-image" :alt="cart.product.title" />
                        </td>
                    </div>

                    <div class="cart-title">
                        <td>{{ cart.product.title }}</td>
                    </div>

                    <div class="cart-qty">
                        <td>
                            <div class="input-group">
                                <select name="" id="" class="form-select" v-model="cart.qty"
                                    @change="cartStore.updateCart(cart)">
                                    <option :value="i" v-for="i in 20" :key="i">{{ i }}</option>
                                </select>
                            </div>
                        </td>
                    </div>

                    <div class="cart-total">
                        <!-- 金額 -->
                        <td width="200" class="text-end">$ {{ $filters.currency(cart.total) }}</td>
                    </div>
                    <div class="cart-delete">
                        <td>
                            <button type="button" class="btn btn-outline-danger "
                                @click.prevent="cartStore.removeCartItem(cart.id)"><i class="bi bi-trash"></i></button>
                        </td>
                    </div>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="6" class="text-end">總金額 NT$ {{ $filters.currency(cartStore.cartList.total) }}</td>
                </tr>
            </tfoot>
        </table>
        <div class="input-group mb-3" v-if="cartStore.cart.carts.length > 0">
            <input type="text" class="form-control" placeholder="請輸入優惠卷" v-model="coupon_code">
            <div class="input-group-append">
                <button type="button" class="btn btn-outline-success" @click="addCouponCode">套用優惠卷</button>
            </div>
        </div>
        <div class="text-end" v-if="cartStore.cart.carts.length > 0">
            <button type="button" class="btn btn-outline-warning" @click="cartStore.deleteAllCarts()">結帳</button>
        </div>
    </div>
</template>
<style lang="scss">
.btn.btn-outline-danger {
    margin-left: 1rem;
}

.card-img-top {
    object-fit: cover;
    height: 200px;
}

.table-image {
    width: 75px;
    height: 75px;
    object-fit: cover;
}

@media (max-width: 600px) {
    .cart-table {
        // flex-direction: column;
        // display: flex;
        // min-height: 6.625rem;
        // padding: .75rem;
        // position: relative;
        background-color: #FFF;
        width: 100%;
        table-layout: fixed;
 

        .cart-tbody {
            position: relative;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;


            .cart-checkbox {
                position: relative;
                height: 100%;
                top: 2rem;
                left: 0.5rem;
            }

            .cart-img {
                position: relative;
                margin-left: 2rem;
                top: -0.6rem;
            }

            .cart-title {
                position: relative;
                left: 7.6rem;
                top: -5rem;
                width: 150px;
                overflow: hidden;
                /* 隱藏超出容器的文字 */
                white-space: nowrap;
                /* 防止文字換行 */
                text-overflow: ellipsis;
                /* 在文字溢出時顯示省略號 */

            }

            .cart-qty {
                position: relative;
                margin-left: 7.6rem;
                top: -5rem;
                width: 6rem;
            }

            .cart-total {
                position: relative;
                margin-left: 13rem;
                top: -6rem;
            }

            .cart-delete {
                position: relative;
                margin-left: 14rem;
                top: -5rem;
            }





        }



    }

}
</style>

<script>
import { onMounted, computed } from 'vue'; //, computed 
import { useCartStore } from '@/stores/cartStore.js';

export default {
    setup() {
        const cartStore = useCartStore();

        // 使用computed函數創建一個响應式的計算屬性
        const cartList = computed(() => cartStore.cartList);
        const allSelected = computed(() => cartStore.allSelected);
        const selectedItems = computed(() => cartStore.$dispose.cart.carts.map(item => item.selected));
        // const selectAllItems = (itemId) => {
        //     cartStore.selectAllItems(itemId);
        // };
        // const toggleItemSelection = () => {
        //     cartStore.toggleItemSelection();
        // }


        // 在組件中掛載產品數量的數據
        onMounted(() => {
            cartStore.getCart();
        });

        return {
            cartStore,
            cartList,
            // selectAllItems,
            allSelected,
            selectedItems,
            // toggleItemSelection
        }
    },
}

</script>