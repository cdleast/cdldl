<template>
    <div class="pages">
        <div v-show="$route.path === '/pages'">
            <el-row :gutter="20">
                <el-col :span="5">
                    <router-link to="/screening">分类筛选器</router-link>
                </el-col>
                <el-col :span="5">
                    <router-link to="/fuzzySearch">多条件和模糊查询</router-link>
                </el-col>
                <el-col :span="5">
                    <router-link to="/mohuSearch">模糊查询</router-link>
                </el-col>
            </el-row>
        </div>
        <div class="pages-main" v-show="$route.path !== '/pages'">
            <el-button @click="$router.push('/pages')" type="primary">返回</el-button>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: "pages"
};
</script>

<style lang='scss' scoped>
.pages {
    width: 100%;
    height: 100%;
}
.el-button {
    margin-bottom: 10px;
    position: absolute;
    top: 15px;
    left: 200px;
}
.el-row a{
    color: #1989fa;
}
</style>