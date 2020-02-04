<template>
    <div class="link">
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item class="line" :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>-->

        <el-breadcrumb separator="/">
            <el-breadcrumb-item
                class="line"
                v-for="item in levelList"
                :key="item.path"
                :to="item.path"
            >{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: "main-link",
    data() {
        return {
            levelList: []
        };
    },
    watch: {
        // 监听路由变化
        $route() {
            this.getBreadcrumb();
        }
    },
    created() {
        this.getBreadcrumb();
    },
    methods: {
        getBreadcrumb() {
            /* $route.matched
            一个数组，包含当前路由的所有嵌套路径片段的路由记录
            一个路由匹配到的所有路由记录会暴露为 $route 对象 (还有在导航守卫中的路由对象) 的 $route.matched 数组
            */
            let matched = this.$route.matched.filter(item => {
                return item.name;
            });
            const first = matched[0];
            if (first && first.name === "layout") {
                matched.shift();
            }
            this.levelList = matched;
        }
    }
};
</script>

<style scoped>
.link {
    margin-bottom: 20px;
}
.el-breadcrumb {
    height: 10px;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.line:first-child {
    border-left: 3px solid #31c17b;
    padding-left: 10px;
}
</style>