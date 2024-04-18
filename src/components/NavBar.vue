<template>
    <nav class="navbar-container">
        <div class="hamburger-toggle" @click="toggleNavbar" :class="{ toggle: isToggle }">
            <span class="bar-1"></span>
            <span class="bar-2"></span>
            <span class="bar-3"></span>
        </div>
        <div class="navbar-icon">
            <router-link to="/" class="nav-icon"><img class="img-icon" src="../assets/imag/首頁icon4.png"
                    alt=""></router-link>
        </div>
        <div class="navbar-links" :class="{ show: isNavbarVisible }">
            <ul class="navbar-ul">
                <router-link to="/" class="navbar-li">產品列表</router-link>
                <router-link to="cart" class="navbar-li">購物車</router-link>
                <router-link to="/" class="navbar-li">關於我們</router-link>
                <router-link to="order" class="navbar-li">訂單查詢</router-link>
            </ul>
        </div>
    </nav>

</template>

<style lang="scss">
@import '../assets/helpers/navbar';
</style>

<script>
import { ref } from 'vue';


export default {
    setup() {
        const isNavbarVisible = ref(false);
        const isToggle = ref(false);

        const toggleNavbar = () => {
            isNavbarVisible.value = !isNavbarVisible.value;  //判斷漢堡單開啟或關閉
            isToggle.value = !isToggle.value  //判斷下拉選單開啟或關閉
        };
        return {
            isNavbarVisible,
            toggleNavbar,
            isToggle,

        }
    },
}

</script>