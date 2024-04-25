<template>
    <!-- 登入 -->
    <div class="image-background">
        <div class="container">
            <LoadingPlugin :active="isLoading"></LoadingPlugin>
            <form class="login-form" @submit.prevent="signIn">
                <div class="col-md-6">
                    <div class="input-container">
                        <!-- <label for="inputEmail" class="login-email">Email</label> -->
                        <i class="bi bi-envelope"></i>
                        <input type="email" id="inputEmail" class="login-input" v-model="user.username" required
                            autofocus>
                    </div>
                    <div class="input-container">
                        <!-- <label for="inputPassword" class="login-email">Password</label> -->
                        <i class="bi bi-bag"></i>
                        <input type="password" id="inputPassword" class="login-input" v-model="user.password" required>
                    </div>
                </div>
                <div class="mt-4">
                    <button type="submit" class="button-login">登入<i class="bi bi-send-fill"></i></button>
                </div>
            </form>
        </div>
    </div>

</template>

<style lang="scss">
.image-background {
    background-image: url('@/assets/imag/森林背景圖2.jpg');
    background-position: center;
    background-size: cover;
    width: 100vw;
    height: 100vh;

    .login-form {
        position: fixed;
        top: 50%;
        left: 50%;
        /* 將元素向上和向左移動自身寬高的一半 */
        transform: translate(-50%, -50%);

        .input-container {
            display: flex;
            /* 使用 Flexbox 來排列圖示和輸入框 */
            align-items: center;
            /* 垂直置中圖示和輸入框 */
            width: 300px;
            height: 4rem;

            .bi {
                font-size: 26px;
                color: #ffffff;
                border-bottom: 1px solid #ffffff;

            }

            .login-input {
                /* 讓輸入框佔據剩餘空間 */
                flex-grow: 1;

                /* 移除邊框 */
                border: none;
                /* 使背景透明 */
                background: transparent;
                /* 移除焦點框線 */
                outline: none;
                /* 僅保留底線 */
                border-bottom: 1px solid #ffffff;
                color: #ffffff;
                /* 給文字留出空間，使其與圖示有距離 */
                padding-left: 30px;
                /* 增加文字大小 */
                font-size: 25px;


                &::placeholder {
                    color: #ffffff;
                }

                /* 為自動填入的文字設置白色，並移除背景顏色 */
                &:-webkit-autofill {
                    -webkit-text-fill-color: #ffffff;
                    transition: background-color 5000s ease-in-out 0s;

                }


            }
        }



        .button-login {
            width: 380px;
            background-color: rgba(0, 0, 0, 0.5);
            /* 黑色背景，透明度為50% */
            color: white;
            /* 文字顏色 */
            border: none;
            /* 移除邊框 */
            padding: 10px 20px;
            /* 內邊距 */
            text-align: center;
            /* 文字置中對齊 */
            text-decoration: none;
            /* 移除下劃線 */
            display: inline-block;
            /* 使元素可以設置寬度和高度 */
            font-size: 16px;
            /* 字體大小 */
            margin: 4px 2px;
            /* 外邊距 */
            cursor: pointer;
            /* 滑鼠指標變為手形 */
            border-radius: 12px;

            /* 設置圓角 */
            &:hover {
                background-color: rgba(255, 255, 255, 0.5);
                /* 黑色背景，透明度為50% */
                color: rgb(21, 21, 21);
            }
        }
    }


}
</style>

<script>
import emitter from "@/methods/eventBus";
import { ref, provide } from 'vue';
import { useRouter } from 'vue-router'; 
import axios from 'axios';
import SweetAlert from '@/mixin/sweetAlert';

export default {
    setup() {
        const isLoading = ref(false);
        const user = ref({});
        const router = useRouter(); 
        provide('emitter', emitter);

        const signIn = async () => {
            const api = `${import.meta.env.VITE_APP_URL}/admin/signin`;
            isLoading.value = true;
            try {
                const response = await axios.post(api, user.value);
                const { token, expired } = response.data;
                document.cookie = `hexToken=${token};expired=${new Date(expired)};`;
                isLoading.value = false;
                router.push('/');
            } catch (error) {
                isLoading.value = false;
         
                SweetAlert.typicalType('失敗', error, 'error');
            }
        }

        return {
            isLoading,
            user,
            signIn,
        }


    }
}

</script>