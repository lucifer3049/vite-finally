<template>
    <!-- 前台導覽 -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">藍貓露營</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="navbar-nav">
                    <router-link to="/" class="nav-link">產品列表</router-link>
                </div>
                <div class="navbar-nav">
                    <router-link to="cart" class="nav-link">購物車</router-link>
                </div>
                <!-- <form class="d-flex justify-content-end" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form> -->
            </div>

        </div>
    </nav>
    <ToastMessages />
</template>
<script>
import ToastMessages from '@/components/ToastMessages.vue';
import emitter from '@/methods/eventBus';

export default {
    components: {
        ToastMessages,
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
<style>
.bg-body-tertiary {
    --bs-bg-opacity: 1;
    background-color: rgb(191, 235, 232) !important;
}
</style>