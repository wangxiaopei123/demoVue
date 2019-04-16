<template>

    <div class="case">
        <div class="header clear">
            <img src="../images/register/logo.png" alt="logo">
            <a class="login-now" href="javascript:" @click="$router.push('login')">已有账号？马上登录></a>
        </div>
        <div class="content">
            <div class="content-in"
                 :style="{height:((screenHeight-76-60-16)>820)?((screenHeight-76-60-16)+'px'):(820+'px')}">
                <div class="steps-box">
                    <div class="steps">
                        <el-steps :active="active" finish-status="success" process-status="finish" align-center>
                            <el-step title="注册账号"></el-step>
                            <el-step title="企业实名认证"></el-step>
                            <el-step title="运力资源认证"></el-step>
                            <el-step title="注册成功"></el-step>
                        </el-steps>
                    </div>
                </div>
                <el-row style="padding-bottom: 60px;">
                    <el-col :span="12">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px"
                                 class="demo-ruleForm" style="padding-left: 10%;">
                            <el-form-item label="手机号码：" prop="tel">
                                <el-input v-model="ruleForm.tel" maxlength="11" onkeyup="value=value.replace(/[^0-9]/g,'')"></el-input>
                            </el-form-item>

                            <el-form-item label="登录密码：" prop="loginPassword">
                                <el-tooltip placement="right">
                                    <div slot="content">
                                        密码格式：<br/>
                                        1、6-20字符<br/>
                                        2、支持数字、字母及标点符号<br/>
                                        3、数字、大小写字母及标点符号至少包含2种
                                    </div>
                                    <el-input placeholder="登录密码" v-model="ruleForm.loginPassword" show-password maxlength="20" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')">
                                    </el-input>
                                </el-tooltip>

                            </el-form-item>
                            <el-form-item label="确认密码：" prop="checkPass">
                                <el-input v-model="ruleForm.checkPass" show-password maxlength="20" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
                            </el-form-item>
                            <el-form-item label="企业身份：" prop="type">
                                <el-checkbox-group v-model="ruleForm.type">
                                    <el-checkbox label="1" name="type">物流公司</el-checkbox>
                                    <el-checkbox label="2" name="type">电商平台</el-checkbox>
                                    <el-checkbox label="3" name="type">仓储公司</el-checkbox>
                                    <el-checkbox label="4" name="type">汽车车商</el-checkbox>
                                    <el-checkbox label="5" name="type">汽车企业</el-checkbox>
                                    <el-checkbox label="6" name="type">4S门店</el-checkbox>
                                </el-checkbox-group>
                                <el-button class="explainType" @click="explainType = true"
                                           style="position: absolute;top:9px;right:-20px;color: #2d8cf0;border: none;padding:0;text-align: left;">
                                    <i style="font-size: 22px;" class="el-icon-question"></i></el-button>
                                <el-dialog class="idChoice" title="企业身份选择说明" :visible.sync="explainType" width="422px"
                                           center>
                                    <p>1.企业身份分为物流企业和非物流企业（电商平台、仓储公司、汽车车商、
                                        汽车企业、4S门店），企业身份选择后将无法更改；</p>
                                    <p>2.物流公司需要进行企业实名认证和运力资源认证，全部通过认证后可申
                                        请开通运车管提供的物流服务和仓配服务；</p>
                                    <p>3.非物流公司仅需进行企业实名认证，通过认证后可申请开通运车管提供的仓配服务；</p>
                                    <b>请依据企业实际情况选择企业身份，以免影响认证审核结果，导致无法享受后续服务。</b>
                                    <span slot="footer" class="dialog-footer" center>
										<el-button style="padding: 8px 20px;" type="primary"
                                                   @click="explainType = false">确 定</el-button>
									</span>
                                </el-dialog>
                            </el-form-item>
                            <el-form-item label="邀请码：" prop="inviteCode">
                                <el-input v-model="ruleForm.inviteCode" maxlength="6" onkeyup="value=value.replace(/[^0-9]/g,'')"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码：" prop="code" >
                                <div class="code_yzm">
                                    <el-input class="code_m" v-model="ruleForm.code" maxlength="4" onkeyup="value=value.replace(/[^0-9a-zA-Z]/g,'')"></el-input>
                                    <el-button style="padding:0;" class="verification" @click="createCode">
                                        {{ruleForm.checkCode}}
                                    </el-button>
                                </div>
                            </el-form-item>
                            <el-form-item label="短信验证码：" prop="telCode">
                                <el-input class="yzm" v-model="ruleForm.telCode" maxlength="6" onkeyup="value=value.replace(/[^0-9]/g,'')">
                                    <template slot="append">
                                        <span><a @click="sendMessage('ruleForm')">{{content}}</a></span>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item style="width:100%;">
                                <el-button v-if="consent == true" type="primary" style="width: 100%;"
                                           @click="submitForm('ruleForm')" v-loading="loading">注册
                                </el-button>
                                <el-button v-if="consent == false" type="primary" style="width: 100%;" disabled>
                                    注册
                                </el-button>
                            </el-form-item>
                            <!--<el-form-item>-->
                                <!--<el-checkbox style="margin-right: 0;color: #515a6e;" label="我已阅读并同意"-->
                                             <!--v-model="consent"></el-checkbox>-->
                                <!--<a style="color: #2d8cf0;" href="javascript:" @click="centerDialogVisible = true">《运车管家企业注册协议》</a>-->
                            <!--</el-form-item>-->
                            <!--<el-dialog class="agreement-box" title="运车管家企业注册协议" :visible.sync="centerDialogVisible"-->
                                       <!--width="900px" center>-->
                                <!--<iframe src="/#/Agreement" width="100%" height="420px;" style="border: 0;"></iframe>-->
                                <!--<div slot="footer" class="dialog-footer" style="text-align: right;">-->
									<!--<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>-->
								<!--</div>-->
                            <!--</el-dialog>-->

                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <div style="float: right;padding-right:12%;width:64%;">
                            <el-card class="box-card"
                                     style="background-color: #f6f6f6;box-shadow: none;border: none;border-radius: 0;margin-top: 74px;min-height: 310px;">
                                <div slot="header" class="clearfix">
                                    <span style="font-weight: bold;font-size: 18px;">注册前需要准备哪些资料？</span>
                                </div>
                                <p style="margin-bottom: 6px;"><span style="font-weight: bold;font-size: 16px;">企业实名认证需提前准备：</span>
                                </p>
                                <p><span>企业 </span><a href="javascript:" @click="sampleImg = true,sampleType = '26'">营业执照彩色证件照</a></p>

                                <p><span>企业 </span><a href="javascript:" @click="sampleImg = true,sampleType = '24'">道路运输经营许可证彩色证件照</a></p>

                                <!--<p><span>企业 </span>企业征信报告彩色照片压缩包</p>-->

                                <p><span>法定代表人</span>
                                    <a href="javascript:" @click="sampleImg = true,sampleType = '6'">身份证正面、</a>
                                    <a href="javascript:" @click="sampleImg = true,sampleType = '7'">身份证反面、</a>
                                    <a href="javascript:" @click="sampleImg = true,sampleType = '8'">手持身份证彩色证件照</a>
                                </p>

                                <!--<p><span>法定代表人 </span>个人征信报告彩色照片压缩包</p>-->

                                <p><span>企业办公室内部 </span><a href="javascript:" @click="sampleImg = true,sampleType = '22'">办公场地彩色照片</a></p>

                                <p><span>企业 </span><a href="javascript:" @click="sampleImg = true,sampleType = '27'">运作场地彩色照片</a></p>

                                <p style="margin:12px 0 6px;"><span
                                        style="font-weight: bold;font-size: 16px;">委托人需提前准备：</span></p>
                                <p>
                                    <span>委托人的</span>
                                    <a href="javascript:" @click="sampleImg = true,sampleType = '6'">身份证正面、</a>
                                    <a href="javascript:" @click="sampleImg = true,sampleType = '7'">身份证反面、</a>
                                    <a href="javascript:" @click="sampleImg = true,sampleType = '8'">手持身份证彩色证件照</a>
                                </p>

                                <!--<p><span>授权协议彩色照片，必须盖有公司公章或财务专用章&nbsp;&nbsp; </span><a download=""-->
                                                                                       <!--href="../images/register/test.xlsx">下载委托人授权书模板</a>-->
                                <!--</p>-->
                            </el-card>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <SampleGraph :visible.sync="sampleImg" :sampleType="sampleType"></SampleGraph>
    </div>

</template>

<script>
    import {checkLoginname, checkLoginPassword, checkMobile} from "../common/validate"; //导入正则校验
    import SampleGraph from './admitWeb/SampleGraph'  //示例图
    export default {
        components:{
            'SampleGraph':SampleGraph
        },
        data() {

            var checkPass = (rule, value, callback) => {
                if (value !== this.ruleForm.loginPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validTel = (rule, value, callback) => {
                this.$get("validRegister", {"phone": this.ruleForm.tel}).then(function (response) {
                    if (response.code) {
                        callback(new Error('手机号已被注册,请更换手机号'));
                    } else {
                        callback();
                    }
                });
            };
            var validPhoneCode = (rule, value, callback) => {
                this.$get("password/checkCaptchaCorrect", {"phone": this.ruleForm.tel,"code":this.ruleForm.telCode}).then(function (response) {
                    if (response.code ==0) {
                        callback(new Error('短信验证码不正确'));
                    } else {
                        callback();
                    }
                });
            };

            let checkValid = (rule, value, callback) => {
                if (this.ruleForm.code.toLowerCase() != this.ruleForm.checkCode.toLowerCase()) {
                    callback(new Error('验证码错误!'));
                    this.createCode();
                } else {
                    callback();
                }
            };
            return {
                loading: false,
                sampleImg: false,
                sampleType:'',
                visible:false,
                checkTel: 0,//默认手机号不重复
                screenHeight: document.documentElement.clientHeight, // 屏幕高度
                active: 0,
                content: "获取验证码",
                totalTime: 60,
                canClick: true, //添加canClick
                centerDialog: false, //打开协议
                explainType: false, //企业身份说明

                consent: true,
                centerDialogVisible:false,
                ruleForm: {
                    tel: "",
                    loginPassword: "",
                    checkPass: "",
                    type: [],
                    code: "",
                    checkCode: "",
                    telCode: "",
                    inviteCode: "",

                },
                rules: {
                    tel: [{
                        required: true,
                        message: '请输入手机号码',
                        trigger: 'blur'
                    }, {
                        validator: this.common.checkPhone,
                        trigger: 'blur'
                    }, {
                        validator: validTel,
                        trigger: 'blur'
                    }],
                    loginPassword: [{
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
                    inviteCode: [{
                        min: 6, max: 6,
                        message: '邀请码为六位',
                        trigger: 'blur'
                    }],
                    checkPass: [{
                        required: true,
                        message: '请再次输入登录密码',
                        trigger: 'blur'
                    }, {
                        validator: checkPass,
                        trigger: 'blur'
                    }],
                    type: [{
                        type: 'array',
                        required: true,
                        message: '请至少选择一种身份',
                        trigger: 'change'
                    }],
                    code: [{
                        required: true,
                        message: '请输入验证码',
                        trigger: 'blur'
                    }, {
                        validator: checkValid,
                        trigger: 'blur'
                    }],
                    telCode: [{
                        required: true,
                        message: '请输入短信验证码',
                        trigger: 'blur'
                    }
                    ,{
                        validator: validPhoneCode,
                        trigger: 'blur'
                    }
                    ],
                }
            };
        },
        mounted() {
            this.createCode();
            var _this = this;
            window.onresize = function () { // 定义窗口大小变更通知事件
                _this.screenHeight = document.documentElement.clientHeight // 窗口高度
            }
        },
        methods: {

            sendMessage() {
                this.$refs.ruleForm.validateField('tel', (telError, callback) => {
                    // if (this.ruleForm.code.toLowerCase() != this.ruleForm.checkCode.toLowerCase()) {
                    //     console.info(false)
                    //     return false;
                    // }
                    if (!telError) {
                        if (!this.canClick) return; //改动的是这两行代码
                        /*
                         发送验证码
                         */
                        let data = {"phone": this.ruleForm.tel, "type": "1"};

                        let that = this;
                        this.$post('sendSMS', data).then(function (response) {
                            let data = response;
                            if (data.code == 0) {
                                // callback(new Error(data.msg));
                                that.$message.error(data.msg);
                            }
                        }).catch(error => {
                            console.log("error", error);
                            that.$message.error('短信验证码发送失败');
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
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (valid) {
                            let data = {
                                "phone": this.ruleForm.tel,
                                "password": this.ruleForm.loginPassword,
                                "belongLtdType": this.ruleForm.type.toString(),
                                "inviteCode": this.ruleForm.inviteCode,
                                "smsCode": this.ruleForm.telCode
                            };
                            let that = this;
                            that.loading = true;
                            this.$post('register', data).then(function (response) {
                                that.loading = false;
                                let data = response;
                                if (data.code == 1) {
                                    that.common.saveData('register', null);
                                    that.common.saveData('authentic', null);
                                    that.common.saveData('suggest', null);
                                    that.common.saveData('company', null);
                                    let register = data['resultData']['register'];
                                    that.common.saveData("register",register);
                                    let belongLtdType = register['belongLtdType'];
                                    let path = '';
                                    let name = '';
                                    if (belongLtdType && belongLtdType.indexOf('1') != -1) { //物流企业 跳转到选择物流企业类型页面
                                        path = 'admitWeb/capacity/typeSelection';
                                        name = 'TypeSelection';
                                    } else {
                                        path = '/company/info_other';
                                        name = 'Info_Other';
                                    }
                                    that.$router.push({
                                        path: path,
                                        name: name
                                    });
                                } else {
                                    that.$message.error(data.msg);
                                }
                            }).catch(error => {
                                that.loading = false;
                                console.log("error", error)
                            });
                        } else {
                            return false;
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 图片验证码
            createCode() {
                //先清空验证码的输入
                this.ruleForm.code = "";
                this.ruleForm.checkCode = "";
                //验证码的长度
                var codeLength = 4;
                //随机数
                var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
                    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
                for (var i = 0; i < codeLength; i++) {
                    //取得随机数的索引（0~35）
                    var index = Math.floor(Math.random() * 62);
                    //根据索引取得随机数加到code上
                    this.ruleForm.checkCode += random[index];
                }
                //把code值赋给验证码
                //this.ruleForm.checkCode = this.ruleForm.code;
            }
        },

    }
</script>

<style>
    .idChoice .el-dialog, .agreement-box .el-dialog {
        margin-top: 0!important;
        top: 49%;
        transform: translateY(-50%);
    }
    .idChoice .el-dialog__header {
        text-align: left;
        padding: 13px 20px;
        border-bottom: 1px solid #eee;
        margin-bottom: 13px;
    }

    .idChoice .el-dialog__title {
        color: #515a6e;
        font-size: 18px;
        font-weight: bold;
    }

    .idChoice .el-dialog--center .el-dialog__body {
        padding: 0 20px;
    }

    .idChoice .el-dialog--center .el-dialog__footer {
        text-align: right;
    }

    .idChoice {
        line-height: 24px;
        color: #515a6e;
    }

    .explainType.el-button:focus, .explainType.el-button:hover {
        background-color: #fff;
    }

    .agreement-box .el-dialog__header {
        padding: 13px 20px;
        background-color: #f1f1f1;
    }

    .agreement-box .el-dialog__title, .agreement-box .el-dialog__headerbtn .el-dialog__close {
        color: #515a6e;
        font-size: 18px;
    }

    .agreement-box .el-dialog__headerbtn .el-dialog__close {
        position: relative;
        top: -6px;
    }

    .agreement-box .el-button {
        padding: 8px 20px;
    }

    .agreement-box .el-dialog__body {
        padding: 10px 20px;
        color: #515a6e;
    }

    .agreement-box .el-dialog__footer {
        border-top: 1px solid #f1f1f1;
        padding-bottom: 10px;
    }

    .login-now:hover {
        text-decoration: underline;
    }

    .header img {
        float: left;
        margin-top: 19px;
    }

    .el-checkbox {
        margin-right: 20px;
    }

    .el-card__header {
        padding: 13px 20px;
        color: #515a6e;
    }

    .el-card__body {
        padding: 10px 20px 40px;
    }

    .login-now {
        float: right;
        color: #fff;
    }

    .login-now:visited {
        color: #fff;
    }

    .el-card__body p {
        line-height: 22px;
        color: #515a6e;
    }

    .el-card__body p a {
        color: #2d8cf0;
    }


    .content-in {
        background-color: #fff;
    }

    /* .el-input__inner {
        width: 300px;
    } */

    .register {
        display: none;
    }

    a {
        text-decoration: none;
    }

    .cardImg {
        display: inline-block;
        height: auto;
        max-width: 100%;
    }

    .captcha {
        height: 50px;
        text-align: justify;
    }

    .idChoice .el-dialog__headerbtn {
        top: 10px;
    }
</style>
