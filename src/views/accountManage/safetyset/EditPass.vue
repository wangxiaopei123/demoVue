<template>
    <div>
        <h2 class="manage-title">修改密码</h2>
        <div class="amend-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
                <el-form-item label="当前密码" prop="password">
                    <el-input placeholder="请输入密码" v-model="ruleForm.password" maxlength="20" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPass">
                    <el-input placeholder="请输入密码" v-model="ruleForm.newPass" maxlength="20" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input placeholder="请输入密码" v-model="ruleForm.checkPass" maxlength="20" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100%;" type="primary" @click="submitForm">确认修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {checkLoginname, checkLoginPassword, checkMobile} from "../../../common/validate" //导入正则校验
    export default {
        data() {
            var checkPass = (rule, value, callback) => {
                if (value !== this.ruleForm.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    password: "",
                    newPass: "",
                    checkPass: ""
                },
                rules: {
                    password: [{
                        required: true,
                        message: '请输入登录密码',
                        trigger: 'blur'
                    }, {
                        validator: checkLoginPassword,
                        trigger: 'blur'
                    }, {
                        min: 6, max: 20,
                        message: '注意位数限制',
                        trigger: 'blur'
                    }],
                    newPass: [{
                        required: true,
                        message: '请输入登录密码',
                        trigger: 'blur'
                    }, {
                        validator: checkLoginPassword,
                        trigger: 'blur'
                    }, {
                        min: 6, max: 20,
                        message: '注意位数限制',
                        trigger: 'blur'
                    }],
                    checkPass: [{
                        required: true,
                        message: '请输入登录密码',
                        trigger: 'blur'
                    }, {
                        validator: checkPass,
                        trigger: 'blur'
                    }, {
                        min: 6, max: 20,
                        message: '注意位数限制',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    let that = this;
                    if (valid) {
                        let data = new FormData();
                        data = {
                            "currentPassword": this.ruleForm.password,
                            "newPassword": this.ruleForm.newPass,
                            "confirmPassword": this.ruleForm.checkPass
                        };

                        this.$post('user/changeLoginPassword', data).then(function (response) {
                            let data = response;
                            if (data.code == 1) {
                                that.$message.info(data.msg);
                                that.$router.push('/safetyset');
                            } else {
                                that.$message.error(data.msg);
                            }
                        }).catch(error => console.log("error", error));
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .el-input__inner {
        width: 300px;
    }
</style>