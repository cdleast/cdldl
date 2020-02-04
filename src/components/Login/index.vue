<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">天上人间后台管理系统</span>
            </div>
            <!-- :model="loginUser --- 表单数据对象 -->
            <!-- :rules="rules" --- 表单验证规则 -->
            <!-- ref="loginForm" --- 帮助我们获取表单里的内容 -->
            <!-- label-width="80px" --- 表单域标签的宽度 -->
            <el-form
                :model="loginUser"
                :rules="rules"
                ref="loginForm"
                class="loginForm"
                label-width="60px"
            >
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="submitForm('loginForm')"
                        class="submit_btn"
                    >登 录</el-button>
                </el-form-item>
                <div class="tiparea">
                    <p>
                        还没有账号？现在
                        <router-link to="/register">注册</router-link>
                    </p>
                </div>
            </el-form>
        </section>
    </div>
</template>

<script>
import loginApi from "@/api/login";
export default {
    name: "login",
    data() {
        return {
            endRegister: {}, // 已注册的账户
            loginUser: {
                email: "", // 邮箱
                password: "" // 密码
            },
            // 表单验证
            rules: {
                email: [
                    {
                        type: "email", // 验证类型
                        required: true, // 是否必填，如不设置，则会根据校验规则自动生成
                        message: "邮箱格式不正确", // 验证失败提示信息
                        trigger: "blur" // 什么时候触发 是否在 rules 属性改变后立即触发一次验证
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 6, // 最小长度
                        max: 30, // 最大长度
                        message: "长度在 6 到 30 个字符", // 验证失败提示信息
                        trigger: "blur" // 什么时候触发 失去焦点
                    }
                ]
            }
        };
    },
    created() {
        this.getRegister();
    },
    methods: {
        getRegister() {
            loginApi.getRegister().then(res => {
                this.endRegister = res.data;
            });
        },
        // 提交登录
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    loginApi.login(this.loginUser).then(res => {
                        const loginUserEmail = res.data;
                        const products = this.endRegister.filter(register => {
                            return (
                                register.email === loginUserEmail.email &&
                                register.password === loginUserEmail.password
                            );
                        });
                        if (products) {
                            // products存在存储到vuex中，调用setUser方法
                            this.$store.dispatch("getUsers", products);
                            // 验证成功
                            this.$message({
                                message: "登录成功!",
                                type: "success"
                            });
                            this.$router.push("/home");
                        } else {
                            this.$message({
                                message: "账户或密码错误!",
                                type: "warning"
                            });
                        }
                    });
                }
            });
        }
    }
};
</script>

<style lang='scss' scoped>
.login {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../../assets/images/bg.jpg") no-repeat center center;
    background-size: 100% 100%;
}
.form_container {
    width: 370px;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
}
.form_container .manage_tip .title {
    font-family: "Microsoft YaHei";
    font-weight: bold;
    font-size: 26px;
    color: #fff;
}
.loginForm {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #cccc;
}
.submit_btn {
    width: 100%;
}
.tiparea {
    text-align: right;
    font-size: 12px;
    color: #333;
}
.tiparea p a {
    color: #409eff;
}
</style>