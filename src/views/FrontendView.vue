<template>
    <!-- 前台模板 -->
    <NavbarForward />
    <div class="container">
        <ToastMessages></ToastMessages>
        <router-view></router-view>
    </div>
</template>

<script>
import NavbarForward from '@/components/NavbarForward.vue';
import emitter from '@/methods/eventBus';
import ToastMessages from '@/components/ToastMessages.vue';
export default {
    components: {
        NavbarForward,
        ToastMessages
    },
    provide() {
        return {
            emitter,
        }
    },
    data() {
        return {

        }
    },
}
</script>