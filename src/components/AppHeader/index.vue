<template>
    <div class="layout-header">
        <router-link to="/">
            <span class="company">天上人间</span>
        </router-link>
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                下拉菜单
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit" command="a">修改密码</el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-fold" command="b">退出系统</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <!-- 修改密码 -->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px">
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
            >
                <el-form-item label="原密码" prop="oldPass">
                    <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "layout-header",
    data() {
        return {
            dialogFormVisible: false,
            ruleForm: {
                oldPass: "", // 原密码
                pass: "", // 新密码
                checkPass: "" // 确认密码
            },
            // 验证规则
            rules: {
                oldPass: [
                    {
                        required: true,
                        message: "原密码不能为空",
                        trigger: "blur"
                    }
                    // { validator: validateOldPass, trigger: 'blur' }
                ],
                pass: [
                    {
                        required: true,
                        message: "新密码不能为空",
                        trigger: "blur"
                    }
                ],
                checkPass: [
                    {
                        required: true,
                        message: "确认密码不能为空",
                        trigger: "blur"
                    }
                    // { validator: validatePass, trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        // 判断下拉点击的是哪个
        handleCommand(command) {
            switch (command) {
                case "a":
                    // 修改密码
                    this.handlePwd();
                    break;
                case "b":
                    // 退出系统
                    this.handleLogout();
                    break;
                default:
                    break;
            }
        },
        // 打开修改密码窗口
        handlePwd() {
            this.dialogFormVisible = true;
            // 清除清空表单验证
            this.$nextTick(() => {
                this.$refs["ruleForm"].resetFields();
            });
        },
        // 退出系统
        handleLogout() {
            console.log("退出系统");
        },
        // 修改密码
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                // 判断验证是否通过
                if (valid) {
                    console.log("修改密码");
                } else {
                    return false;
                }
            });
        }
    }
};
</script>

<style lang='scss' scoped>
// 头部区域
.layout-header {
    position: absolute;
    line-height: 50px;
    top: 0px;
    left: 0px;
    right: 0px;
    background-color: #2d3a4b;
}
// 左侧logo
.company {
    position: absolute;
    color: white;
    padding: 0 50px;
}
/* 下拉菜单  */
.el-dropdown {
    float: right;
    margin-right: 40px;
}
.el-dropdown-link {
    color: white;
    cursor: pointer;
}
</style>