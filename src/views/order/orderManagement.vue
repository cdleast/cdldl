<template>
    <div class="orderManagement">
        <el-row :gutter="20">
            <!-- 新增品种 -->
            <el-col :span="16">
                <div class="management-title">添加新的Pizza</div>
                <el-form ref="form" :model="newPizza" label-width="80px">
                    <el-form-item label="品种">
                        <el-input v-model="newPizza.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="newPizza.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="尺寸">
                        <el-input v-model="newPizza.size"></el-input>
                    </el-form-item>
                    <el-form-item label="价格">
                        <el-input v-model="newPizza.price"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    </el-form-item>
                </el-form>
            </el-col>

            <!-- 品种展示 -->
            <el-col :span="8">
                <div class="management-title">品种展示</div>
                <el-table :data="getMenuItems" style="width: 100%">
                    <el-table-column prop="name" label="品种"></el-table-column>
                    <el-table-column label="删除">
                        <template slot-scope="scope">
                            <el-button
                                v-if="scope.row.name !== ''"
                                @click="deletePizza(scope.$index, scope.row)"
                                type="primary"
                                icon="el-icon-close"
                                size="mini"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import orderApi from "@/api/order";
export default {
    name: "orderManagement",
    data() {
        return {
            // 添加新的Pizza
            newPizza: {
                name: "", // 品种
                desc: "", // 描述
                size: "", // 尺寸
                price: "" // 价格
            }
            // tableData: [] // 品种展示
        };
    },
    computed: {
        // 在vuex中获取菜单商品信息
        getMenuItems() {
            return this.$store.getters.getMenuItems;
        }
    },
    created() {
        // this.getTableData(); // 使用了vuex这不用了
    },
    methods: {
        // 获取商品信息
        // 使用了vuex这不用了
        // getTableData() {
        //     orderApi.getList().then(res => {
        //         this.tableData = res.data;
        //     });
        // },
        // 创建新品种
        onSubmit() {
            orderApi.add(this.newPizza).then(res => {
                // res.status是状态码
                if (res.status) {
                    // 存储到vux中
                    this.$store.commit("pushToMenuItems", res.data);
                    // this.$router.push("/orderMenu");
                    this.$message({
                        message: "添加商品成功",
                        type: "success"
                    });
                } else {
                    this.$message({
                        message: "添加商品失败",
                        type: "warning"
                    });
                }
            });
        },
        // 移除品种
        deletePizza(index, row) {
            orderApi.deleteById(row.id).then(res => {
                this.$store.commit("removeMenuItems", row);
                this.$message({
                    message: `删除 ${row.name} 成功`,
                    type: "success"
                });
            });
        }
    }
};
</script>

<style lang='scss' scoped>
// 标题间距
.management-title {
    margin-bottom: 10px;
}
// 选项样式
.management-options {
    margin-bottom: 10px;
    padding-left: 40px;
}
</style>