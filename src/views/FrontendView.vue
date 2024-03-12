<template>
    <!-- 前台模板 -->
    <NavbarForward />
    <div class="container">
        <ToastMessages></ToastMessages>
        <router-view></router-view>
    </div>
</template>

<script>
import { provide } from 'vue';
import NavbarForward from '@/components/NavbarForward.vue';
import ToastMessages from '@/components/ToastMessages.vue';
import emitter from '@/methods/eventBus';

export default {
    components: {
        NavbarForward,
        ToastMessages,
    },
    setup() {
        provide('emitter', emitter);
    }
}

</script>