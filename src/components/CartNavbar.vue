<template>
    <nav class="navbar bg-light">
        <div class="container-fluid">
            <span class="navbar-brand">
                <div class="input-group">
                    <input class="form-check-input mt-0" style="margin-left: 3.2rem;" type="checkbox"
                        :checked="cartStore.cart.carts.length > 0 && cartStore.isAllSelected" @change="toggleSelectAll">
                </div>
            </span>
            <button type="button" class="btn nav-link">
                購物車
                <span class="badge rounded-pill bg-danger text-white">{{ cartStore.cartList.totalItems }}</span>
            </button>
        </div>
    </nav>
</template>
<style>
.navbar-brand {
    margin-left: -1.4rem;
}

@media (max-width: 1024px) {
    .navbar-brand {
        margin-left: -1.3rem;
    }
}

@media (max-width: 820px) {
    .navbar-brand {
        margin-left: -1.3rem;
    }
}

@media (max-width: 600px) {
    .navbar-brand {
        margin-left: -1rem;
    }
}
</style>
<script>
import { useCartStore } from '@/stores/cartStore.js';
import { computed } from 'vue';

export default {
    setup() {
        const cartStore = useCartStore();
        const cartTotal = computed(() => cartStore.cartList.total);
        const allSelected = computed(() => cartStore.allSelected);

        const toggleSelectAll = () => {
            cartStore.toggleAllItems();
        };

        return {
            cartStore,
            toggleSelectAll,
            allSelected,
            cartTotal
        }
    },
}
</script>