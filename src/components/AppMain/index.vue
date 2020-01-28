<template>
    <div class="layout-main">
        <!-- 不显示首页的 -->
        <app-link v-show="$route.path !== '/home'"></app-link>

        <keep-alive>
            <router-view></router-view>
        </keep-alive>

    </div>
</template>

<script>
import AppLink from "./Link";

export default {
    name: "layout-main",
    components: { AppLink },
    
};
</script>

<style lang='scss' scoped>
// 主体部分
.layout-main {
    position: absolute;
    top: 50px;
    left: 230px;
    right: 0px;
    bottom: 0px;
    padding: 10px;
    overflow-y: auto;
}
</style>