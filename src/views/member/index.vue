<template>
    <div class="member">
        <!-- :inline="true 表单一行显示 -->
        <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline">
            <el-form-item prop="cardNum">
                <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="会员名字"></el-input>
            </el-form-item>
            <el-form-item prop="payType">
                <el-select v-model="searchMap.payType" placeholder="支付类型">
                    <!-- 不要忘记 payTypeOptions 绑定到data中 -->
                    <el-option
                        v-for="option in payTypeOptions"
                        :key="option.type"
                        :label="option.name"
                        :value="option.type"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="birthday">
                <!-- value-format 是指定绑定值的格式 -->
                <el-date-picker
                    style="width: 200px"
                    value-format="yyyy-MM-dd"
                    v-model="searchMap.birthday"
                    type="date"
                    placeholder="出生日期"
                ></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData">查询</el-button>
                <el-button type="primary" @click="handleAdd">新增</el-button>
                <el-button @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- 数据列表
        :data 绑定渲染的数据
        border 表格边框
        type="index"获取索引值，从1开始 ，label显示标题，prop 数据字段名，width列宽
        -->
        <!-- .slice((currentPage-1) * pageSize, currentPage * pageSize) -->
        <el-table
            :data="memberList.slice((currentPage-1) * pageSize, currentPage * pageSize)"
            height="380"
            border
            style="width: 100%"
        >
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
            <el-table-column prop="name" label="会员姓名" width="90"></el-table-column>
            <el-table-column prop="birthday" label="会员生日"></el-table-column>
            <el-table-column prop="phone" label="手机号码"></el-table-column>
            <el-table-column prop="integral" label="可用积分"></el-table-column>
            <el-table-column prop="money" label="开卡金额"></el-table-column>
            <el-table-column prop="payType" label="支付类型">
                <template slot-scope="scope">
                    <span>{{scope.row.payType | payTypeFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="会员地址"></el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页功能 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>

        <!-- 弹出新增窗口 
        title 窗口的标题
        :visible.sync 当它true的时候，窗口会被弹出
        -->
        <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" width="680px">
            <el-form
                class="pojoForm"
                :inline="true"
                :rules="rules"
                ref="pojoForm"
                label-width="100px"
                label-position="right"
                :model="pojo"
            >
                <el-form-item label="会员卡号" prop="cardNum">
                    <el-input v-model="pojo.cardNum"></el-input>
                </el-form-item>
                <el-form-item label="会员姓名" prop="name">
                    <el-input v-model="pojo.name"></el-input>
                </el-form-item>
                <el-form-item label="会员生日" prop="birthday">
                    <!-- value-format 是指定绑定值的格式 -->
                    <el-date-picker
                        style="width: 200px"
                        value-format="yyyy-MM-dd"
                        v-model="pojo.birthday"
                        type="date"
                        placeholder="会员生日"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="pojo.phone"></el-input>
                </el-form-item>
                <el-form-item label="开卡金额" prop="money">
                    <el-input v-model="pojo.money"></el-input>
                </el-form-item>
                <el-form-item label="可用积分" prop="integral">
                    <el-input v-model="pojo.integral"></el-input>
                </el-form-item>
                <el-form-item label="支付类型" prop="payType">
                    <el-select v-model="pojo.payType" placeholder="支付类型">
                        <!-- 不要忘记 payTypeOptions 绑定到data中 -->
                        <el-option
                            v-for="option in payTypeOptions"
                            :key="option.type"
                            :label="option.name"
                            :value="option.type"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <br />
                <el-form-item class="address" label="会员地址" prop="address">
                    <el-input type="textarea" v-model="pojo.address"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="pojo.id === null ? addData('pojoForm'): updateData('pojoForm')"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import memberApi from "@/api/member";
// 支付类型
const payTypeOptions = [
    { type: "1", name: "现金" },
    { type: "2", name: "微信" },
    { type: "3", name: "支付宝" },
    { type: "4", name: "银行卡" }
];

export default {
    name: "member",
    data() {
        return {
            memberList: [], // 会员数据列表
            dialogFormVisible: false, // 控制对话框
            total: 0, // 总记录数
            currentPage: 1, // 当前页码
            pageSize: 10, // 每页显示10条数据,
            searchMap: {
                // 条件查询绑定的条件值
                cardNum: "", // 会员卡号
                name: "", // 会员姓名
                payType: "", // 支付类型
                birthday: "" // 出生日期
            },
            pojo: {
                // 提交的数据
                id: null,
                cardNum: "", // 会员卡号
                name: "", // 会员姓名
                birthday: "", // 会员生日
                phone: "", // 手机号码
                money: "", // 开卡金额
                integral: "", // 可用积分
                payType: "", // 支付类型
                address: "" // 会员地址
            },
            payTypeOptions, // 下拉框中，支付类型
            // 校验规则
            rules: {
                cardNum: [
                    { required: true, message: "卡号不能为空", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "姓名不能为空", trigger: "blur" }
                ],
                payType: [
                    {
                        required: true,
                        message: "支付类型不能为空",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    // 过滤器
    filters: {
        // 判断支付类型
        payTypeFilter(type) {
            /* payTypeOptions.find(obj => {
                return obj.type === type
            }) */
            // 在过滤 器当中不能引用当前实例 this   this.payTypeOptions 错误的
            const payObj = payTypeOptions.find(obj => {
                return obj.type === type;
            });
            return payObj ? payObj.name : null;
        }
    },
    created() {
        // 初始化获取列表数据
        this.fetchData();
    },
    methods: {
        // 查询数据列表
        fetchData() {
            // 因为需要跟分页做关联，所以这个就不用了，需要用分页的查询方法
            // 下面这个做分页只用了后台获取到的数据总数
            memberApi.getList().then(res => {
                this.$store.dispatch("getMemberList", res.data);
                this.memberList = res.data.reverse();
                this.memberList = this.memberList.filter(member => {
                    let matchNum = true; // 会员卡号 筛选
                    let matchName = true; // 会员姓名 筛选
                    let matchPayType = true; // 支付类型 筛选
                    let matchBirthday = true; // 出生日期 筛选
                    // console.log(searchMap.cardNum)
                    if (this.searchMap.cardNum) {
                        matchNum = member.cardNum == this.searchMap.cardNum;
                    }
                    if (this.searchMap.name) {
                        matchName = member.name == this.searchMap.name;
                    }
                    if (this.searchMap.payType) {
                        matchPayType = member.payType == this.searchMap.payType;
                    }
                    if (this.searchMap.birthday) {
                        matchBirthday =
                            member.birthday == this.searchMap.birthday;
                    }
                    return (
                        matchNum && matchName && matchPayType && matchBirthday
                    );
                });
                this.total = this.memberList.length;
            });
        },
        // 当每页显示条数改变后,被触发 , val 是最新的每页显示条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.fetchData();
        },
        // 当页码改变后,被触发 , val 是最新的页面
        handleCurrentChange(val) {
            this.currentPage = val;
            this.fetchData();
        },
        // 重置按钮
        resetForm(formName) {
            // 重置会看 el-form-item 组件元素的 prop 上是否指定了字段名，指定了才会重置生效
            this.$refs[formName].resetFields();
        },
        // 打开对话框
        handleAdd() {
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                // this.$nextTick()它是一个异步事件，当渲染结束 之后 ，它的回调函数才会被执行
                // 弹出窗口打开之后 ，需要加载Dom, 就需要花费一点时间，我们就应该等待它加载完dom之后，再进行调用resetFields方法，重置表单和清除样式
                this.$refs["pojoForm"].resetFields();
            });
        },
        // 提交会员表单数据
        addData(formName) {
            this.$refs[formName].validate(valid => {
                // valid是返回的验证信息 true或false
                if (valid) {
                    memberApi.add(this.pojo).then(res => {
                        this.$message({
                            message: "添加会员信息成功!",
                            type: "success"
                        });
                        this.dialogFormVisible = false;
                        // 新增成功，刷新列表数据
                        this.fetchData();
                    });
                } else {
                    return false;
                }
            });
        },
        // 编辑会员信息
        handleEdit(id) {
            // 打开编辑窗口(新增和编辑用的是一个)
            this.handleAdd();
            memberApi.getById(id).then(res => {
                this.pojo = res.data;
            });
        },
        // 编辑更新按钮提交数据
        updateData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    memberApi.update(this.pojo).then(res => {
                        // 更新成功刷新列表
                        this.dialogFormVisible = false;

                        this.fetchData();
                        this.$message({
                            message: "编辑会员信息成功!",
                            type: "success"
                        });
                    });
                } else {
                    return false;
                }
            });
        },
        // 删除会员信息
        handleDelete(id) {
            this.$confirm("确认删除这条记录吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(res => {
                    memberApi.deleteById(id).then(res => {
                        this.$message({
                            message: "删除会员信息成功!",
                            type: "success"
                        });
                        // 删除成功，刷新列表数据
                        this.fetchData();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    }
};
</script>

<style lang='scss' scoped>
.pojoForm /deep/ .el-form-item {
    width: 300px;
}
.pojoForm /deep/ .el-form-item__content {
    width: calc(100% - 100px);
}
.el-select {
    width: 100%;
}
.pojoForm /deep/ .address {
    width: calc(100% - 27px);
}
.dialog-footer {
    text-align: center;
}
</style>