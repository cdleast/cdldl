<template>
    <div class="layout-navbar">
        <!--  default-active :　默认选中的菜单
            :router="true" true表示开启路由模式,开启之后, index值代表的就是路由地址
            :unique-opened="true" 是否只保持一个子菜单的展开
        -->
        <el-menu
            :router="true"
            :default-active="activeChild"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
        >
            <el-menu-item index="/home">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/member">
                <i class="el-icon-user-solid"></i>
                <span slot="title">会员管理</span>
            </el-menu-item>
            <el-submenu index="/order">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>点餐系统</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/orderMenu">菜单管理</el-menu-item>
                    <el-menu-item index="/orderChild2">gouwuche</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/pages">
                <i class="el-icon-s-cooperation"></i>
                <span slot="title">功能展示</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "layout-navbar",
    data() {
        return {};
    },
    computed: {
        // 我们使用计算属性来获取到当前点击的菜单的路由路径，然后设置default-active中的值
        // 使得菜单在载入时就能对应高亮
        activeChild() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            // 可以在路由配置文件中设置自定义的路由路径到meta.activeChild属性中，来控制菜单自定义高亮显示
            if (meta.activeChild) {
                return meta.activeChild;
            }
            return path;
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>

<style lang='scss' scoped>
// 左侧导航
.layout-navbar {
    position: absolute;
    width: 230px;
    top: 50px;
    left: 0px;
    bottom: 0px;
    overflow-y: auto;
    background-color: #545c64;
}
.el-menu {
    border-right: none;
}
.el-menu /deep/ .el-menu-item-group__title {
    display: none;
}
.el-menu-item-group .el-menu-item {
    padding-left: 60px !important;
}
</style>