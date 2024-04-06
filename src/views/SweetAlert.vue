<template>
    <h1>This is About page.</h1>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <div>
        <ul style="min-height:100px">
            <li v-for="product in products" :key="product.id">
                <h3>{{ product.title }}</h3>
                <img :src="product.imageUrl" width="200" alt="">
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
            products: []
        }
    },
    methods: {
        getProducts() {
            axios.get(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/products/all`)
                .then((res) => {
                    this.products = res.data.products
                })
        }
    },
    mounted() {
        this.getProducts()
    }
}
</script>

<style scoped></style>