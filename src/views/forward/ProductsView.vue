<template>
    <!-- 產品列表 -->
    <div class="container">
        <div class="row">
            <div class="col-md-4" v-for="item in products" :key="item">
                <div class="card">
                    <img :src="item.imageUrl" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.title }}</h5>
                        <div class="text-right" v-if="item.price">
                            現價 NT{{ item.price }}
                        </div>
                        <del class="text-right" v-if="item.price">
                            原價 NT {{ item.origin_price }}
                        </del>
                        <div class="d-grid">
                            <button type="button" class="btn btn-outline-secondary btn-lg"><i
                                    class="bi bi-cart"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            products: [],
        }
    },
    methods: {
        getProducts() {
            this.$http.get(`${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/products`)
                .then((response) => {
                    this.products = response.data.products;
                    console.log(response.data.products);
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        }
    },
    created() {
        this.getProducts();
    },
}
</script>

<style lang="scss">
.card {
    width: 100%;
    background-color: #afadad1a;
    margin-top: 3rem;
    border: none;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
        transform: scale(1.1);
        /* 鼠标悬停时放大 1.1 倍 */
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        /* 添加阴影 */
    }
}

.btn.btn-outline-secondary {
    color: rgb(0, 0, 0);
    font-size: 1.6rem;
    &:hover {
        color: rgb(255, 255, 255);
    }
}
</style>