<template>
    <!-- 前台模板 -->
    <NavBar />
    <!-- 監測路由只讓輪播元件在首頁中出現 -->
    <div v-if="isHomePage" >
        <CarouselView></CarouselView>
    </div>

    <main>
        <ToastMessages></ToastMessages>
        <router-view></router-view>
    </main>
</template>

<script>
import { provide, computed } from 'vue';
import { useRoute } from 'vue-router'; 
import NavBar from '@/components/NavBar.vue';
import ToastMessages from '@/components/ToastMessages.vue';
import emitter from '@/methods/eventBus';
import CarouselView from '@/components/CarouselView.vue';


export default {
    components: {
        NavBar,
        ToastMessages,
        CarouselView,
    },
    setup() {
        const route = useRoute();
        const isHomePage = computed(() => route.path === '/' || route.path === '/product'); //監控路由 
        provide('emitter', emitter);

        return {
            isHomePage
        }
    }

}

</script>