<template>
    <!-- 前台模板 -->
    <NavbarForward />
    <div class="">
        <h1>12345</h1>
        <router-view></router-view>
    </div>
</template>

<script>
import NavbarForward from '@/components/NavbarForward.vue'
export default {
    components: {
        NavbarForward,
    },
    data() {
        return {

        }
    },
}
</script>