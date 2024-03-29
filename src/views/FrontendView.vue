<template>
    <!-- 前台模板 -->
    <NavBar />
    <div class="container">
        <ToastMessages></ToastMessages>
        <router-view></router-view>
    </div>
</template>

<script>
import { provide } from 'vue';
import NavBar from '@/components/NavBar.vue';
import ToastMessages from '@/components/ToastMessages.vue';
import emitter from '@/methods/eventBus';

export default {
    components: {
        NavBar,
        ToastMessages,
    },
    setup() {
        provide('emitter', emitter);
    }
}

</script>