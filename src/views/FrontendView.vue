<template>
    <!-- 前台模板 -->
    <NavbarForward />
    <div class="">
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