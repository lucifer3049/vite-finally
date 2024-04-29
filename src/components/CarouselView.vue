<template>
    <!-- 圖片輪播 -->
    <div class="col-md-11 mx-auto">
        <swiper :spaceBetween="30" :effect="'fade'" :navigation="true" :pagination="pagination" :modules="modules"
            :autoplay="{ delay: 2500, disableOnInteraction: false, }" class="mySwiper">
            <swiper-slide v-for="(image, index) in images" :key="index">
                <img :src="image" :alt="`Slide ${index + 1}`">
            </swiper-slide>
        </swiper>
    </div>

</template>

<script>
import { ref } from 'vue'; //onMounted 
// import SweetAlert from '@/mixin/sweetAlert';
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';// Swiper 底下圓點
import 'swiper/css/pagination';// Swiper 左右箭頭
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';


export default {
    components: {
        Swiper,
        SwiperSlide
    },
    setup() {
        const images = ref([]);//圖片放置的容器

        //圖片的路徑
        const imagePath = (start, end) => {
            const paths = [];
            for (let i = start; i <= end; i++) {
                paths.push(`images/KZM${i}.jpg`);
            }
            return paths;
        };
        const imagePaths = imagePath(1, 4); //要讀取圖片的數量
        images.value = imagePaths;  //圖片存放的地方

        // swiper圓點裡面的數字
        const pagination = {
            clickable: true,
            renderBullet(index, className) {
                return `<span class="${className}">${index + 1}</span>`;
            }
        }

        return {
            images,
            modules: [EffectFade, Navigation, Pagination, Autoplay], //輪播動畫設置
            pagination,
        }
    }
}
</script>

<style lang="scss">
.swiper {
    width: 80%;
    max-height: 80rem;

    .swiper-slide {
        display: block;
        // padding: 5rem;
        background-size: cover;

        img {
            width: 100%;
            max-height: 100%;
            display: block;
            // height: 100%;
            object-fit: cover;
        }
    }

    .swiper-button-prev {
        background-color: #6c6a6a85;
        color: #ffffff;
        padding: 3.4rem;

        &::after {
            font-size: 4rem;
            font-weight: 700;
        }
    }

    .swiper-button-next {
        background-color: #6c6a6a85;
        color: #ffffff;
        padding: 3.4rem;

        &::after {
            font-size: 4rem;
            font-weight: 700;
        }
    }

    .swiper-pagination {
        color: #e10000;
    }

    .swiper-pagination-bullet {
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        color: #000;
        opacity: 1;
        background: rgba(0, 0, 0, 0.2);
    }

    .swiper-pagination-bullet-active {
        color: #fff;

        background: #007aff;
    }
}

@media (max-width: 1024px) {
    .swiper {
        width: 100%;
        // padding-top: 5rem;
        padding: 0;

        .swiper-button-prev {
            background-color: #6c6a6a85;
            color: #ffffff;
            margin-top: -1.5rem;
            padding: 2rem;

            &::after {
                font-size: 2.5rem;
                font-weight: 700;
            }
        }

        .swiper-button-next {
            background-color: #6c6a6a85;
            color: #ffffff;
            margin-top: -1.5rem;
            padding: 2rem;

            &::after {
                font-size: 2.5rem;
                font-weight: 700;
            }
        }
    }
}

@media (max-width: 820px) {
    .swiper {
        width: 100%;
        // padding-top: 5rem;
        padding: 0;

        .swiper-button-prev {
            background-color: #6c6a6a85;
            color: #ffffff;
            margin-top: -1.5rem;
            padding: 2rem;

            &::after {
                font-size: 2.5rem;
                font-weight: 700;
            }
        }

        .swiper-button-next {
            background-color: #6c6a6a85;
            color: #ffffff;
            margin-top: -1.5rem;
            padding: 2rem;

            &::after {
                font-size: 2.5rem;
                font-weight: 700;
            }
        }
    }
}

@media (max-width: 600px) {
    .swiper {
        width: 100%;
        // padding-top: 5rem;
        padding: 0;
        margin: 0;

        .swiper-button-prev {
            background-color: #6c6a6a85;
            color: #ffffff;
            margin-top: -1.2rem;
            padding: 1rem;

            &::after {
                font-size: 1rem;
                font-weight: 700;
            }
        }

        .swiper-button-next {
            background-color: #6c6a6a85;
            color: #ffffff;
            margin-top: -1.2rem;
            padding: 1rem;

            &::after {
                font-size: 1rem;
                font-weight: 700;
            }
        }
    }
}
</style>