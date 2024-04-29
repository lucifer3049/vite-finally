<template>
    <!-- 訂單查詢 -->
    <section>
        <router-link to="orders" class="orders-item"><span class="orders-link">全部</span></router-link>
        <router-link to="alreadypaid" class="orders-item"><span class="orders-link">待付款</span></router-link>
        <router-link to="" class="orders-item"><span class="orders-link">已付款</span></router-link>
        <router-link to="" class="orders-item"><span class="orders-link">已完成</span></router-link>
    </section>
    <router-view></router-view>
</template>
<style lang="scss">
section {
    background: #fff;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    display: flex;
    margin-bottom: 12px;
    overflow: hidden;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 10;

    .orders-item {
        align-items: center;
        background: #fff;
        border-bottom: 2px solid rgba(0, 0, 0, .09);
        color: rgba(0, 0, 0, .8);
        cursor: pointer;
        display: flex;
        flex: 1;
        font-size: 16px;
        justify-content: center;
        line-height: 19px;
        overflow: hidden;
        padding: 16px 0;
        text-align: center;
        transition: color .2s;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        text-decoration: none;

        &:hover {
            background-color: #3f3f3f;
            color: #fdfdfd;
        }

        .orders-link {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            box-shadow: none;

        }
    }
}
</style>