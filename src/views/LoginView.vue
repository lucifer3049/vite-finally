<template>
    <!-- 登入 -->

    <div class="image-background">
        <LoadingPlugin :active="isLoading"></LoadingPlugin>
        <div class="login-navbar-container">
            <div class="login-navbar">
                <a href="#">Login</a>
            </div>
        </div>
        <form class="login-form" @submit.prevent="signIn">
            <div class="input-container">
                <i class="bi bi-envelope"></i>
                <input type="email" id="inputEmail" class="login-input" v-model="user.username" required autofocus>
            </div>
            <div class="input-container">
                <i class="bi bi-bag"></i>
                <input type="password" id="inputPassword" class="login-input" v-model="user.password" required>
            </div>
            <div class="login-button">
                <button type="submit" class="button-login">
                    <div class="button-content">
                        <span class="mx-auto">登入</span>
                        <div class="text-end"><i class="bi bi-send-fill"></i></div>
                    </div>
                </button>
            </div>
        </form>
    </div>
</template>

<style lang="scss">
.image-background {
    background-image: url('@/assets/imag/森林背景圖2.jpg');
    background-position: center;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    display: flex;

    .login-navbar-container {
        /* 確保 .login-navbar 相對於這個容器進行定位 */
        /*position: relative;
        padding: 0;*/
        position: fixed;
        /* 固定位置 */
        top: 0;
        /* 固定在網頁的頂部 */
        left: 0;
        /* 固定在網頁的左側 */
        right: 0;
        /* 固定在網頁的右側 */
        /* 設置寬度 */

        .login-navbar {
            position: absolute;
            top: 2rem;
            /* 或者你想要的任何位置 */
            left: 3rem;
            /* 或者你想要的任何位置 */
            z-index: 1000;
            /* 確保 .login-navbar 在其他元素之上 */

            font-size: 5rem;

            a {
                text-decoration: none;
                color: #ffffff;

                &:hover {
                    color: #d8d8d8;
                }
            }

        }
    }

    .login-form {
        /*CSS定位方法，將元素固定在視窗的特定位置，可以使用top right bottom left來設定位置 */
        /* position: fixed;
        top: 50%;
        left: 50%;
        /* 將元素向上和向左移動自身寬高的一半 */
        /*   transform: translate(-50%, -50%);
        /* 預設寬度 */
        /* width: 10%;
        /* 自動調整高度以保持比例 */
        /*  height: auto;*/

        display: flex;
        /* 將子元素垂直堆疊*/
        flex-direction: column;
        /* 水平置中 */
        justify-content: center;
        /* 垂直置中 */
        align-items: center;
        margin: 0 auto;
        width: 30%;

        .input-container {
            /* 使用 Flexbox 來排列圖示和輸入框 */
            display: flex;
            /* 垂直置中圖示和輸入框 */
            align-items: center;

            width: 80%;


            .bi {
                font-size: 2rem;
                color: #ffffff;
                /* 僅保留底線 */
                border-bottom: 1px solid #ffffff;
                /* 背景限制在內容區域內 */
                background-clip: content-box;
                /* 給邊框留出空間 */
                padding: 5px;


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
                /* 增加文字大小 */
                font-size: 2rem;
                /* 背景限制在內容區域內 */
                background-clip: content-box;
                /* 給邊框留出空間 */
                padding: 5px;


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

        .login-button {
            display: flex;
            width: 100%;
            /* 水平置中 */
            justify-content: center;
            margin-top: 1rem;

            /*登入按鈕*/
            .button-login {

                width: 80%;
                /* 黑色背景，透明度為50% */
                background-color: rgba(0, 0, 0, 0.5);

                /* 文字顏色 */
                color: white;

                /* 移除邊框 */
                border: none;

                /* 內邊距 */
                padding: 10px 20px;

                /* 文字置中對齊 */
                text-align: center;

                /* 移除下劃線 */
                text-decoration: none;

                /* 使元素可以設置寬度和高度 */
                display: inline-block;
                /* 字體大小 */
                font-size: 16px;
                /* 外邊距 */
                margin: 4px 2px;
                /* 滑鼠指標變為手形 */
                cursor: pointer;

                /* 設置圓角 */
                border-radius: 12px;

                .button-content {
                    display: flex;
                    /*將文字和圖示推到按鈕兩端，確保圖示在右側而不影響文字的位置 */
                    justify-content: space-between;

                }

                &:hover {

                    background-color: rgba(255, 255, 255, 0.5);
                    /* 黑色背景，透明度為50% */
                    color: rgb(21, 21, 21);
                }
            }
        }
    }
}

@media (max-width: 1024px) {
    .image-background {


        .login-form {
            /*CSS定位方法，將元素固定在視窗的特定位置，可以使用top right bottom left來設定位置 */
            /* position: fixed;
                top: 50%;
                left: 50%;
                /* 將元素向上和向左移動自身寬高的一半 */
            /*   transform: translate(-50%, -50%);
                /* 預設寬度 */
            /* width: 10%;
                /* 自動調整高度以保持比例 */
            /*  height: auto;*/
            display: flex;
            /* 將子元素垂直堆疊*/
            flex-direction: column;
            /* 水平置中 */
            justify-content: center;
            /* 垂直置中 */
            align-items: center;
            margin: 0 auto;
            width: 100%;


            .input-container {
                /* 使用 Flexbox 來排列圖示和輸入框 */
                display: flex;
                /* 垂直置中圖示和輸入框 */
                align-items: center;

                width: 80%;


                .bi {
                    font-size: 1.8rem;
                    color: #ffffff;
                    /* 僅保留底線 */
                    border-bottom: 1px solid #ffffff;
                    /* 背景限制在內容區域內 */
                    background-clip: content-box;
                    /* 給邊框留出空間 */
                    padding: 5px;


                }

                .login-input {
                    width: 100%;
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
                    /* 增加文字大小 */
                    font-size: 1.8rem;
                    /* 背景限制在內容區域內 */
                    background-clip: content-box;
                    /* 給邊框留出空間 */
                    padding: 5px;


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

            .login-button {
                display: flex;
                width: 100%;
                /* 水平置中 */
                justify-content: center;
                margin-top: 1rem;

                /*登入按鈕*/
                .button-login {

                    width: 80%;
                    /* 黑色背景，透明度為50% */
                    background-color: rgba(0, 0, 0, 0.5);

                    /* 文字顏色 */
                    color: white;

                    /* 移除邊框 */
                    border: none;

                    /* 內邊距 */
                    padding: 10px 20px;

                    /* 文字置中對齊 */
                    text-align: center;

                    /* 移除下劃線 */
                    text-decoration: none;

                    /* 使元素可以設置寬度和高度 */
                    display: inline-block;
                    /* 字體大小 */
                    font-size: 1.8rem;
                    /* 外邊距 */
                    margin: 4px 2px;
                    /* 滑鼠指標變為手形 */
                    cursor: pointer;

                    /* 設置圓角 */
                    border-radius: 12px;

                    .button-content {
                        display: flex;
                        /*將文字和圖示推到按鈕兩端，確保圖示在右側而不影響文字的位置 */
                        justify-content: space-between;

                    }

                    &:hover {

                        background-color: rgba(255, 255, 255, 0.5);
                        /* 黑色背景，透明度為50% */
                        color: rgb(21, 21, 21);
                    }
                }
            }


        }
    }
}

@media (max-width: 820px) {
    .image-background {




        .login-form {
            /*CSS定位方法，將元素固定在視窗的特定位置，可以使用top right bottom left來設定位置 */
            /* position: fixed;
            top: 50%;
            left: 50%;
            /* 將元素向上和向左移動自身寬高的一半 */
            /*   transform: translate(-50%, -50%);
            /* 預設寬度 */
            /* width: 10%;
            /* 自動調整高度以保持比例 */
            /*  height: auto;*/
            display: flex;
            /* 將子元素垂直堆疊*/
            flex-direction: column;
            /* 水平置中 */
            justify-content: center;
            /* 垂直置中 */
            align-items: center;
            margin: 0 auto;
            width: 100%;


            .input-container {
                /* 使用 Flexbox 來排列圖示和輸入框 */
                display: flex;
                /* 垂直置中圖示和輸入框 */
                align-items: center;

                width: 80%;


                .bi {
                    font-size: 1.8rem;
                    color: #ffffff;
                    /* 僅保留底線 */
                    border-bottom: 1px solid #ffffff;
                    /* 背景限制在內容區域內 */
                    background-clip: content-box;
                    /* 給邊框留出空間 */
                    padding: 5px;


                }

                .login-input {
                    width: 100%;
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
                    /* 增加文字大小 */
                    font-size: 1.8rem;
                    /* 背景限制在內容區域內 */
                    background-clip: content-box;
                    /* 給邊框留出空間 */
                    padding: 5px;


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

            .login-button {
                display: flex;
                width: 100%;
                /* 水平置中 */
                justify-content: center;
                margin-top: 1rem;

                /*登入按鈕*/
                .button-login {

                    width: 80%;
                    /* 黑色背景，透明度為50% */
                    background-color: rgba(0, 0, 0, 0.5);

                    /* 文字顏色 */
                    color: white;

                    /* 移除邊框 */
                    border: none;

                    /* 內邊距 */
                    padding: 10px 20px;

                    /* 文字置中對齊 */
                    text-align: center;

                    /* 移除下劃線 */
                    text-decoration: none;

                    /* 使元素可以設置寬度和高度 */
                    display: inline-block;
                    /* 字體大小 */
                    font-size: 1.8rem;
                    /* 外邊距 */
                    margin: 4px 2px;
                    /* 滑鼠指標變為手形 */
                    cursor: pointer;

                    /* 設置圓角 */
                    border-radius: 12px;

                    .button-content {
                        display: flex;
                        /*將文字和圖示推到按鈕兩端，確保圖示在右側而不影響文字的位置 */
                        justify-content: space-between;

                    }

                    &:hover {

                        background-color: rgba(255, 255, 255, 0.5);
                        /* 黑色背景，透明度為50% */
                        color: rgb(21, 21, 21);
                    }
                }
            }


        }
    }
}

@media (max-width: 600px) {
    .image-background {


        .login-form {
            /*CSS定位方法，將元素固定在視窗的特定位置，可以使用top right bottom left來設定位置 */
            /* position: fixed;
            top: 50%;
            left: 50%;
            /* 將元素向上和向左移動自身寬高的一半 */
            /*   transform: translate(-50%, -50%);
            /* 預設寬度 */
            /* width: 10%;
            /* 自動調整高度以保持比例 */
            /*  height: auto;*/
            display: flex;
            /* 將子元素垂直堆疊*/
            flex-direction: column;
            /* 水平置中 */
            justify-content: center;
            /* 垂直置中 */
            align-items: center;
            margin: 0 auto;

            width: 100%;


            .input-container {
                /* 使用 Flexbox 來排列圖示和輸入框 */
                display: flex;
                /* 垂直置中圖示和輸入框 */
                align-items: center;

                width: 80%;


                .bi {
                    font-size: 1rem;
                    color: #ffffff;
                    /* 僅保留底線 */
                    border-bottom: 1px solid #ffffff;
                    /* 背景限制在內容區域內 */
                    background-clip: content-box;
                    /* 給邊框留出空間 */
                    padding: 5px;


                }

                .login-input {
                    width: 100%;
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
                    /* 增加文字大小 */
                    font-size: 1rem;
                    /* 背景限制在內容區域內 */
                    background-clip: content-box;
                    /* 給邊框留出空間 */
                    padding: 5px;


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

            .login-button {
                display: flex;
                width: 100%;
                /* 水平置中 */
                justify-content: center;
                margin-top: 1rem;

                /*登入按鈕*/
                .button-login {

                    width: 80%;
                    /* 黑色背景，透明度為50% */
                    background-color: rgba(0, 0, 0, 0.5);

                    /* 文字顏色 */
                    color: white;

                    /* 移除邊框 */
                    border: none;

                    /* 內邊距 */
                    padding: 10px 20px;

                    /* 文字置中對齊 */
                    text-align: center;

                    /* 移除下劃線 */
                    text-decoration: none;

                    /* 使元素可以設置寬度和高度 */
                    display: inline-block;
                    /* 字體大小 */
                    font-size: 1rem;
                    /* 外邊距 */
                    margin: 4px 2px;
                    /* 滑鼠指標變為手形 */
                    cursor: pointer;

                    /* 設置圓角 */
                    border-radius: 12px;

                    .button-content {
                        display: flex;
                        /*將文字和圖示推到按鈕兩端，確保圖示在右側而不影響文字的位置 */
                        justify-content: space-between;

                    }

                    &:hover {

                        background-color: rgba(255, 255, 255, 0.5);
                        /* 黑色背景，透明度為50% */
                        color: rgb(21, 21, 21);
                    }
                }
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