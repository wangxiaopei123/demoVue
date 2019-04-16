<template>
    <div>
        <h2 class="manage-title">绑定邮箱</h2>
        <div class="amend-box" style="width: 460px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
                <el-form-item label="邮箱号：" prop="email">
                    <el-input class="wother" v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="验证码：" prop="imgCode">
                    <el-input class="width200" style="width: 220px;" v-model="ruleForm.imgCode"></el-input>
                    <el-button style="padding:0;" class="verification" @click="createImgCode">{{checkCode}}</el-button>
                </el-form-item>
                <el-form-item label="邮箱验证码：" prop="mailCode">
                    <el-input style="width: 330px;" class="width200 yzm" v-model="ruleForm.mailCode">
                        <template slot="append"><span><a
                                @click="sendMessageCode('ruleForm',ruleForm.email)">{{content}}</a></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 330px;" type="primary"
                               @click="submitForm('ruleForms',ruleForm.email,ruleForm.mailCode)">确认绑定
                    </el-button>
                </el-form-item>


            </el-form>
            <ul class="setMail-tip" style="margin-left: 130px;">
                <li><h2>邮箱绑定成功后，您可以享有以下服务：</h2></li>
                <li>1.邮箱地址登录 可直接使用“邮箱地址”登录到企业管理平台</li>
                <li>2.找回账号密码 忘记密码时，可使用邮件找回密码</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {checkEmail} from "../../../common/validate"; //导入正则校验
    export default {
        data() {
            var checkCode = (rule, value, callback) => {
                if (this.checkCode.toLowerCase() == value.toLowerCase()) {
                    callback()
                } else {
                    this.createImgCode();
                    callback(new Error('请输入正确图形验证码'));
                }
            };
            return {
                content: "获取验证码",
                totalTime: 60,
                canClick: true, //添加canClick
                checkCode: this.common.createCode(),
                ruleForm: {
                    email: "",
                    imgCode: "",
                    mailCode: "",
                },
                rules: {
                    email: [{
                        required: true,
                        message: '请输入邮箱',
                        trigger: 'blur'
                    }, {
                        validator: checkEmail,
                        trigger: 'blur'
                    }],
                    imgCode: [{
                        required: true,
                        message: '请输入图形验证码',
                        trigger: 'blur'
                    }, {
                        validator: checkCode,
                        trigger: 'blur'
                    }],
                    mailCode: [{
                        required: true,
                        message: '请输入邮箱验证码',
                        trigger: 'blur'
                    }],
                }
            }
        },
        methods: {
            // 刷新验证码
            createImgCode() {
                this.checkCode = this.common.createCode();
            },
            sendMsg(mail) {

                this.$refs.ruleForm.validateField('email', (valid) => {
                    if (!valid) {
                        this.$refs.ruleForm.validateField('imgCode', (checkCode) => {
                            if (!checkCode) {
                                let result = this.common.sendMail(1, mail)
                                if (result == true) {
                                    if (!this.canClick) return; //改动的是这两行代码
                                    this.canClick = false
                                    this.content = this.totalTime + 's后重新发送'
                                    let clock = window.setInterval(() => {
                                        this.totalTime--
                                        this.content = this.totalTime + 's后重新发送'
                                        if (this.totalTime < 0) {
                                            window.clearInterval(clock)
                                            this.content = '重新发送'
                                            this.totalTime = 10
                                            this.canClick = true //这里重新开启
                                        }
                                    }, 1000)
                                }
                            }

                        })
                    }
                })
            },
            sendMessageCode(ruleForm, mail) {
                this.$refs['ruleForm'].validateField('imgCode', (checkCode) => {

                    if (!checkCode) {

                        let data = {"mail": mail, "type": 2};
                        this.$post('password/sendCaptchaByMail', data).then(function (response) {
                            let data = response;
                            if (data.code == 1) {
                                callback(new Error(data.msg));
                            } else {
                                callback();
                            }
                        }).catch(error => {
                            console.log("error", error);
                            callback(new Error('短信验证码发送失败'));
                        });

                        this.canClick = false
                        this.content = this.totalTime + 's后重新发送'
                        let clock = window.setInterval(() => {
                            this.totalTime--
                            this.content = this.totalTime + 's后重新发送'
                            if (this.totalTime < 0) {
                                window.clearInterval(clock)
                                this.content = '重新发送'
                                this.totalTime = 60
                                this.canClick = true //这里重新开启
                            }
                        }, 1000)
                    }
                })
            },
            submitForm(ruleForm, mail, code) {
                this.$refs.ruleForm.validate((valid) => {
                    let that = this;
                    if (valid) {
                        let data = new FormData();
                        data = {
                            "phone": '',
                            "code": code,
                            "mail": mail
                        };
                        this.$post('/password/updateMail', data).then((response) => {
                            let data = response;
                            if (data.code == 1) {
                                this.$router.push('/safetyset');
                                that.$message.info(data.msg);

                            } else {
                                that.$message.error(data.msg);
                            }
                        }).catch(() => {
                            this.$message.error('错误');
                        });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            }
        }
    }
</script>

<style>
    .setMail-tip li h2 {
        font-size: 14px;
        color: #515A6E;
        margin-bottom: 6px;
    }

    .setMail-tip li {
        color: #666;
        line-height: 24px;
        font-size: 12px;
    }

    .wother .el-input__inner {
        width: 330px;
    }

    .width200 .el-input__inner {
        width: 220px;
    }

  .yzm .el-input-group__append {
        margin-left: 10px;
        padding: 0;
        width: 100px;
        text-align: center;
        border-left: 1px solid #dcdee2;
        border-color: #dcdee2;
        background: #dcdee2;
        color: #515a6e;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    .yzm .el-input__inner {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    .verification {
        display: inline-block;
        margin-left: 5px;
        border-radius: 4px;
        width: 100px;
        letter-spacing: 5px;
        height: 30px;
        line-height: 30px;
        background: #dcdee2;
    }

    .verification:hover {
        color: #dcdee2;
        border-color: #dcdee2;
        background: #dcdee2;
    }

    .verification:hover span, .verification span {
        color: #515a6e;
    }
</style>
