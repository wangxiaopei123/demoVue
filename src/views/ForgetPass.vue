<template>
    <div class="case">
        <div class="header clear">
            <img src="../images/forgetPass/logo.png" alt="logo">
            <div class="tabbar">
                <a  href="javascript:" @click="$router.push('/Register')">注册</a>
                <a  href="javascript:" @click="$router.push('/login')">登录</a>
                <a href="https://www.iyunche.com/index?index=1">返回官网</a>
                <a href="javascript:;">常见问题</a>
            </div>
        </div>
        <div class="content">
            <div class="content-in"
                 :style="{height:((screenHeight-64-60-12-16)>520)?((screenHeight-64-60-12-16)+'px'):(520+'px')}">
                <div class="steps-box">
                    <div class="steps">
                        <el-steps :active="active" finish-status="success" process-status="finish" align-center>
                            <el-step title="验证账号"></el-step>
                            <el-step title="验证身份"></el-step>
                            <el-step title="修改密码"></el-step>
                            <el-step title="修改完成"></el-step>
                        </el-steps>
                    </div>
                </div>
                <el-row>
                    <el-col :span="24">
                        <div v-if="active==0" class="amend-box">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                                     class="demo-ruleForm">
                                <p style="color: #515a6e;padding-left: 100px;font-size: 16px;">请输入你需要找回登录密码的登录账号</p>
                                <br/>
                                <el-form-item label="登录账户：" prop="username">
                                    <el-input v-model="ruleForm.username"
                                              onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
                                </el-form-item>
                                <el-form-item style="width:100%;">
                                    <el-button type="primary" @click="page1Next" style="width: 100%">下一步</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div v-if="active==1">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                                     class="demo-ruleForm">
                                <div v-if="seedPage===0" style="margin: 20px auto 20px;width: 80%;">
                                    <p style="font-size: 16px;color: #515a6e;margin-bottom: 30px;">您正在为帐户
                                        {{ruleForm.username}} 进行忘记密码操作，请选择身份验证方式：</p>
                                    <el-card class="box-card choosesj clear">
                                        <span><b>通过手机短信验证</b>如果你的{{phone1}}的手机正常使用，可以选择该验证方式</span>
                                        <el-button type="primary" size="mini" style="float: right;margin-top: -38px;"
                                                   @click="refreshCode()">立即验证
                                        </el-button>
                                    </el-card>
                                    <br>
                                    <el-card class="box-card chooseem clear" v-if="mailFlag==0">
                                        <span><b>通过邮箱验证码</b>如果你的{{mail}}的邮箱正常使用，可以选择该验证方式</span>
                                        <el-button type="primary" size="mini" style="float: right;margin-top: -38px;"
                                                   @click="refurbishCode()">立即验证
                                        </el-button>
                                    </el-card>
                                </div>
                            </el-form>
                            <div v-if="seedPage == 1" class="amend-box">

                                <el-form :model="telVerifyForm" :rules="telVerifyRules" ref="telVerifyForm"
                                         label-width="130px" class="demo-ruleForm">
                                    <el-form-item label="手机号码：" style="color: #515a6e;">
                                        {{phone1}}
                                    </el-form-item>
                                    <el-form-item label="验证码：" prop="code">
                                        <div class="code_yzm">
                                            <el-input class="code_m" v-model="telVerifyForm.code" maxlength="4"
                                                      onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
                                            <el-button style="padding:0;" class="verification"
                                                       @click="createNowPageCode">{{checkCode}}
                                            </el-button>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="短信验证码：" prop="telCode">
                                        <el-input class="yzm" v-model="telVerifyForm.telCode" maxlength="6"
                                                  onkeyup="value=value.replace(/[^0-9]/g,'')">
                                            <template slot="append"><span><a
                                                    @click="sendMessage('telVerifyForm',phone1)">{{content}}</a></span>
                                            </template>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item style="width:100%;">
                                        <el-button type="primary"
                                                   @click="page2_1Next('telVerifyForm',phone1,telVerifyForm.telCode,'')"
                                                   style="width: 100%;">下一步
                                        </el-button>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button style="color: #2d8cf0;" type="text" @click="seedPage = 0">选择其他验证方式>
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div v-if="seedPage == 2" class="amend-box">
                                <el-form :model="mailVerifyForm" :rules="mailVerifyRules" ref="mailVerifyForm"
                                         label-width="130px" class="demo-ruleForm">
                                    <el-form-item label="邮箱地址：" style="color: #515a6e;">
                                        {{mail}}
                                    </el-form-item>
                                    <el-form-item label="验证码：" prop="code">
                                        <div class="code_yzm">
                                            <el-input class="code_m" maxlength="4" v-model="mailVerifyForm.code" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
                                            <el-button style="padding:0;" class="verification"
                                                       @click="createNowPageCode">{{checkCode}}
                                            </el-button>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="邮箱验证码：" prop="mailCode">
                                        <el-input class="yzm" v-model="mailVerifyForm.mailCode" maxlength="6"
                                                  onkeyup="value=value.replace(/[^0-9]/g,'')">
                                            <template slot="append"><span><a
                                                    @click="sendMessageCode('mailVerifyForm',mail)">{{content}}</a></span>
                                            </template>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item style="width:100%;">
                                        <el-button type="primary"
                                                   @click="page2_2Next('mailVerifyForm','',mailVerifyForm.mailCode,mail)"
                                                   style="width: 100%;">下一步
                                        </el-button>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button style="color: #2d8cf0;" type="text" @click="seedPage = 0">选择其他验证方式>
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                        <div v-if="active==2" class="amend-box">
                            <el-form :model="editPassForm" :rules="editPassRules" ref="editPassForm" label-width="130px"
                                     class="">
                                <el-form-item label="新密码：" prop="newPassword">
                                    <el-input placeholder="请输入登录密码" show-password v-model="editPassForm.newPassword"
                                              maxlength="20" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="确认新密码：" prop="checkPass">
                                    <el-input placeholder="请再次输入登录密码" show-password v-model="editPassForm.checkPass"
                                              maxlength="20" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')">
                                    </el-input>
                                </el-form-item>
                                <el-form-item style="width:100%;">
                                    <el-button type="primary" @click="page3Next('editPassForm',ruleForm.username)"
                                               style="width: 100%;">确认修改
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div v-if="active==3" class="amend-box">
                            <div class="sure-success"><i class="el-icon-success"></i><span>修改成功</span></div>
                            <!-- <p class="time"><span>3S</span>后自动返回安全设置页面</p> -->
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

    </div>
</template>

<script>
    import {checkLoginname, checkLoginPassword, checkMobile} from "../common/validate"; //导入正则校验
    export default {
        data() {
            var username = (rule, value, callback) => {
                var MobileRegex = /^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/; //手机校验
                var MailRegex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; //邮箱校验
                if (MobileRegex.test(value) || MailRegex.test(value)) {
                    callback()
                } else {
                    callback(new Error('账号格式错误'));
                }
            };
            var code = (rule, value, callback) => {
                var MailRegex = /^[0-9]{6}$/;
                if (MailRegex.test(value)) {
                    callback();
                } else {
                    callback(new Error('请输入正确格式的短信验证码'));
                }
            };
            var checkCode = (rule, value, callback) => {
                if (this.checkCode.toLowerCase() == value.toLowerCase()) {
                    callback()
                } else {
                    this.createNowPageCode();
                    callback(new Error('请输入正确图形验证码'));
                }
            };
            var loginPassword = (rule, value, callback) => {
                var PasswordRegex = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!,.@#$%^&*? ])[^]{6,20}.*$/;
                if (PasswordRegex.test(value)) {
                    callback()
                } else {
                    callback(new Error('密码格式错误'));
                }
            };
            var checkPass = (rule, value, callback) => {
                if (value !== this.editPassForm.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                mailFlag: 0,
                screenHeight: document.documentElement.clientHeight, // 屏幕高度
                active: 0, //步骤栏默认
                seedPage: 0, //验证身份页
                content: "获取验证码",
                totalTime: 60,
                canClick: true, //添加canClick
                checkCode: "",
                phone1: "",
                mail: "",
                ruleForm: {
                    username: ""
                },
                rules: {
                    username: [{
                        required: true,
                        message: '请输入登录账户',
                        trigger: 'blur'
                    }, {
                        validator: username,
                        trigger: 'blur'
                    }]
                },
                telVerifyForm: {
                    tel: "",
                    code: "",
                    telCode: ""
                },
                telVerifyRules: {
                    code: [{
                        required: true,
                        message: '请输入验证码',
                        trigger: 'blur'
                    }, {
                        validator: checkCode,
                        trigger: 'blur'
                    }],
                    telCode: [{
                        required: true,
                        message: '请输入短信验证码',
                        trigger: 'blur'
                    }, {
                        validator: code,
                        trigger: 'blur'
                    }]
                },
                mailVerifyForm: {
                    mail: "",
                    code: "",
                    mailCode: ""
                },
                mailVerifyRules: {
                    code: [{
                        required: true,
                        message: '请输入验证码',
                        trigger: 'blur'
                    }, {
                        validator: checkCode,
                        trigger: 'blur'
                    }],
                    mailCode: [{
                        required: true,
                        message: '请输入短信验证码',
                        trigger: 'blur'
                    }]
                },
                editPassForm: {
                    newPassword: "",
                    checkPass: ""
                },
                editPassRules: {
                    newPassword: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }, {
                        validator: checkLoginPassword,
                        trigger: 'blur'
                    }],
                    checkPass: [{
                        required: true,
                        message: '请输入确认密码',
                        trigger: 'blur'
                    }, {
                        validator: checkPass,
                        trigger: 'blur'
                    }]
                }
            }
        },
        mounted() {
            var _this = this;
            window.onresize = function () { // 定义窗口大小变更通知事件
                _this.screenHeight = document.documentElement.clientHeight // 窗口高度
            },
                this.checkCode = this.common.createCode()
        },
        methods: {
            createNowPageCode() { //刷新验证码
                this.checkCode = this.common.createCode()
            },
            refreshCode(){
                this.seedPage = 1,
                this.checkCode = this.common.createCode()
            },
            refurbishCode(){
                this.seedPage = 2,
                    this.checkCode = this.common.createCode()
            },
            sendMessage(telVerifyForm, phone1) {


                this.$refs['telVerifyForm'].validateField('code', (checkCode) => {

                    if (!checkCode) {

                        let data = {"phone": phone1, "type": "2"};


                        this.$post('sendSMS', data).then(function (response) {
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
            sendMessageCode(mailVerifyForm, mail) {
                this.$refs['mailVerifyForm'].validateField('code', (checkCode) => {

                    if (!checkCode) {
                        let data = {"mail": mail, "type": 1};
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
            page1Next() {
                this.$refs.ruleForm.validateField('username', (Error) => {
                    let that = this;
                    if (!Error) {

                        let data = {"loginAccount": this.ruleForm.username};

                        this.$post("password/getUserByLoginAccount", data).then(function (response) {

                            if (response.code == 1) {
                                that.active = 1;
                                that.phone1 = response.phone;
                                that.mail = response.mail;
                                that.$message.info(response.msg);
                                if(that.mail ==null || that.mail==""){
                                    that.mailFlag= 1;
                                }
                            } else {
                                that.$message.error(response.msg);
                            }
                        }).catch(error => console.log("error", error));
                    } else {
                        return false;
                        console.info(Error)
                    }


                })

            },
            page2_1Next(formName, phone1, telCode, mail) {
                this.$refs[formName].validate((valid) => {
                    let that = this;
                    if (valid) {
                        let data = new FormData();
                        data = {
                            "phone": phone1,
                            "code": telCode,
                            "mail": mail
                        };
                        this.$post('password/checkCaptchaCorrect', data).then((response) => {
                            let data = response;
                            if (data.code == 1) {
                                this.active = 2;

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
            },
            page2_2Next(formName, phone1, telCode, mail) {
                this.$refs[formName].validate((valid) => {
                    let that = this;
                    if (valid) {
                        let data = new FormData();
                        data = {
                            "phone": phone1,
                            "code": telCode,
                            "mail": mail
                        };
                        this.$post('/password/checkCaptchaCorrect', data).then((response) => {
                            let data = response;
                            if (data.code == 1) {
                                this.active = 2;

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
            },
            page3Next(formName, username) {
                this.$refs[formName].validate((valid) => {
                    let that = this;
                    if (valid) {
                        let data = new FormData();

                        data = {
                            "password": this.editPassForm.newPassword,
                            "confirmPassword": this.editPassForm.checkPass,
                            "username": username

                        };
                        this.$post('password/confirmChangePassword', data).then((response) => {
                            let data = response;
                            if (data.code == 1) {
                                that.$message.info(data.msg + "请去登陆");
                                that.$router.push({
                                  path: "Login",
                                  name: "Login",
                                });

                            } else {
                                that.$message.error(data.msg);
                            }
                        }).catch(() => {
                            this.$message.error('密码修改失败');
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


    .box-card {
        background-color: #f4f4f5;
        border-radius: 0;
        border-color: #f4f4f5;
        color: #515a6e;
        cursor: pointer;
    }

    .box-card:hover {
        border-color: #2d8cf0;
        background-color: #f9f9f9;
    }

    .box-card .el-card__body span b {
        margin-bottom: 8px;
        display: block;
        font-size: 16px;
    }

    .yzm .el-input-group__append {
        margin-left: 10px;
        padding: 0;
        width: 90px;
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
        border-radius: 4px;
        width: 90px;
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

    .chooseem .el-card__body > span, .choosesj .el-card__body > span {
        padding-left: 54px;
        position: relative;
        display: block;
        width: 80%;
    }

    .choosesj .el-card__body > span::before, .chooseem .el-card__body > span::before {
        content: "";
        position: absolute;
        top: 16%;
        transform: translateX(-50%);
        left: 20px;
        width: 35px;
        height: 35px;
    }

    .choosesj .el-card__body > span::before {
        background: url(../images/forgetPass/phoneico.png) no-repeat;
    }

    .chooseem .el-card__body > span::before {
        background: url(../images/forgetPass/emailico.png) no-repeat;
    }

    .box-card .el-card__body {
        padding: 20px 40px;
    }

    .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
        box-shadow: none;
    }

    .header img {
        float: left;
        margin-top: 20px;
    }

</style>
