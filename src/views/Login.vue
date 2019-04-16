<template>
    <div class="case">
        <div class="login-header">
            <div class="login-header-in clear">
                <img class="logo" src="../images/login/logo.png" alt="logo">
                <a class="back" href="https://www.iyunche.com/index?index=1">返回官网</a>
            </div>
        </div>
        <div class="login-content">
            <div class="login-content-in" :style="{height:((screenHeight-66-60)>520)?((screenHeight-66-60)+'px'):(520+'px')}">
                <img class="banner" src="../images/login/banner.png" alt="">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px"
                         class="demo-ruleForm login-form">
                    <p class="title">
                        <span>密码登录</span>
                        <a href="javascript:" @click="$router.push('register')" class="forgetpwd">免费注册</a><!--/#/register-->
                    </p>

                    <br/>
                    <el-form-item prop="login_name">
                        <el-input type="text" v-model="ruleForm.login_name" autocomplete="on" placeholder="手机号码/邮箱">
                            <i slot="prefix" class="el-input__icon ico-user"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="login_password">
                        <!--<el-tooltip placement="bottom">-->
                            <!--<div slot="content">-->
                                <!--1、6-20字符<br/>-->
                                <!--2、支持数字、字母及标点符号<br/>-->
                                <!--3、数字、大小写字母及标点符号至少包含2种-->
                               <!--</div>-->
                        <el-input placeholder="登录密码" v-model="ruleForm.login_password" autocomplete="on"
                                  show-password maxlength="20" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')" @keyup.enter.native="submitForm('ruleForm')">
                            <i slot="prefix" class="el-input__icon ico-password"></i>
                        </el-input>
                        <!--</el-tooltip>-->
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
                        <a href="javascript:" @click="$router.push('forgetpass')" class="forgetpwd">忘记密码？</a>
                    </el-form-item>
                    <el-form-item style="width:100%;">
                        <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%;">登录</el-button>
                        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {checkLoginname, checkLoginPassword} from "../common/validate"; //导入正则校验
    export default {
        data() {
            return {
				screenHeight: document.documentElement.clientHeight, // 屏幕高度
                errorAlert: false,
                checked: true,
                ruleForm: {
                    login_name: '',
                    login_password: '',
                },
                rules: {
                    login_name: [
                        {required: true, message: '请输入手机号码/邮箱', trigger: 'blur'},
                        {validator: checkLoginname, trigger: 'blur'}],
                    login_password: [
                        {required: true, message: '请输入登录密码', trigger: 'blur'},
                        {validator: checkLoginPassword, trigger: 'blur'},
                        {min: 6, max: 20, message: '密码格式不正确', trigger: 'blur'},
                    ]
                },

            };
        },
        methods: {
            submitForm(formName) {
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            "username": this.ruleForm.login_name, "password": this.ruleForm.login_password,
                            "rememberLogin": this.checked
                        };

                        this.$post('login', data).then((response) => {
                            let data = response;
                            if (data.code == 1) {

                                that.setCookie(this.ruleForm.login_name, this.ruleForm.login_password, 7, this.checked);
                                //0.注册未创建企业，1.注册步骤-资料填写 2.注册步骤-资料确认 3.注册步骤-注册完成 4.审核中 5.审核成功 6.审核失败
                                let step = data['resultData']['step'];
                                let register = data['resultData']['register'];
                                let authentic = data['resultData']['authentic'];
                                let suggest = data['resultData']['suggest'];
                                let company = data['resultData']['company'];
                                let path = '';
                                let name = '';
                                if (step == 0 || step == 1) { //步骤转换成物流企业和非物流企业 0.物流企业 1.非物流企业
                                    let belongLtdType = register['belongLtdType'];
                                    if (belongLtdType && belongLtdType.indexOf('1') != -1) { //物流企业
                                        if (!company) { //物流企业未选择企业物流类型,跳入物流企业类型选择页
                                            step = -1;
                                        } else {
                                            step = 0;
                                        }
                                    } else {
                                        step = 1;
                                    }
                                }
                                switch (step) {
                                    case -1 : //物流企业未选择企业物流类型
                                        path = 'admitWeb/capacity/typeSelection';
                                        name = 'TypeSelection';
                                        break;
                                    case 0 : //物流企业资料填写
                                        path = '/company/Info_Logistics';
                                        name = 'Info_Logistics';
                                        break;
                                    case 1 : //非物流企业资料填写
                                        path = '/company/info_other';
                                        name = 'Info_Other';
                                        break;
                                    case 2 : //资料确认
                                        path = '/company/verifyInfo';
                                        name = 'CompanyVerifyInfo';
                                        break;
                                    case 3 :
                                        path = '/company/Success';
                                        name = 'CompanySuccess';
                                        break;
                                    case 4 :
                                        path = '/admitWeb/capacity/carTransport/addBigCarTransportInfo';
                                        name = 'AddBigCarTransportInfo';
                                        break;
                                    case 5 :
                                        path = '/admitWeb/capacity/carTransport/addCarTransportDriverInfo';
                                        name = 'AddCarTransportDriverInfo';
                                        break;
                                    case 6 :
                                        path = '/admitWeb/capacity/carTransport/addCarTransportLineInfo';
                                        name = 'AddCarTransportLineInfo';
                                        break;
                                    case 7 :
                                        name= 'Basic';
                                        path= '/basic';
                                        break;
                                    case 98 : //审核中
                                        path = '/company/result';
                                        name = 'CompanyResult';
                                        break;
                                    case 99 : //审核失败
                                        path = '/company/error';
                                        name = 'CompanyError';
                                        break;
                                }
                                this.common.saveData(register.phone, null);
                                this.common.saveData('register', null);
                                this.common.saveData('authentic', null);
                                this.common.saveData('suggest', null);
                                this.common.saveData('company', null);

                                if (register) this.common.saveData("register", register);
                                if (authentic) this.common.saveData("authentic", authentic);
                                if (suggest) this.common.saveData("suggest", suggest);
                                if (company) this.common.saveData("company", company);

                                that.$router.push({
                                    path: path,
                                    name: name
                                });
                            } else {
                                that.$message.error(data.msg);
                            }
                        }).catch(() => {
                            that.$message.error('登录失败');
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            // 储存表单信息
            setUserInfo: function () {
                // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
                // 如果没有勾选，储存的信息为空
                if (this.checked == "true") {
                    this.setCookie("account", this.ruleForm.login_name)
                    // base64加密密码
                    let passWord = Base64.encode(this.ruleForm.login_password)
                    this.setCookie("remember", remember)
                } else {
                    this.setCookie("account", "")
                    this.setCookie("password", "")
                }
            },
            // 获取cookie
            setCookie(c_name, c_pwd, exdays, remeberFlag) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                if (remeberFlag == true) {
                    window.document.cookie = "username" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
                    window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
                    window.document.cookie = "remeberFlag" + "=" + remeberFlag + ";path=/;expires=" + exdate.toGMTString();
                } else {
                    let exp = new Date();
                    exp.setTime(exp.getTime() - 1);
                    window.document.cookie = "username" + "=" + c_name + ';expires=' + exp.toGMTString();
                    window.document.cookie = "password" + "=" + c_pwd + ';expires=' + exp.toGMTString();
                }


            },


            //读取cookie
            getCookie: function () {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'username') {
                            this.ruleForm.login_name = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == 'password') {
                            this.ruleForm.login_password = arr2[1];
                        }
                    }
                }
            }


        },
        mounted() {

            this.getCookie();
            var _this = this;
            window.onresize = function () { // 定义窗口大小变更通知事件
                _this.screenHeight = document.documentElement.clientHeight // 窗口高度
            }
        }


    }
</script>
<style>

    .login-header, .login-content {
        background-color: #409eff;
    }

    .login-header-in {
        padding-top: 40px;
    }

    .ico-user, .ico-password {
        width: 13px;
        height: 13px;
        display: block;
        margin: 13px 0 0 8px;
    }

    .ico-password {
        margin-top: 14px;
    }

    .ico-user {
        background: url(../images/login/user.png) no-repeat;
    }

    .ico-password {
        background: url(../images/login/password.png) no-repeat;
    }

    .logo {
        float: left;
    }

    .back {
        text-align: center;
        float: right;
        color: #fff;
        width: 80px;
        height: 24px;
        line-height: 24px;
        border: 1px solid #fff;
        border-radius: 20px;
    }

    .back:visited {
        color: #fff;
    }

    .login-content-in {
        position: relative;
        height: 640px;
    }

    .login-form {
        box-sizing: border-box;
        width: 340px;
        background-color: #fff;
        position: absolute;
        top: 44%;
        right: 0;
        transform: translateY(-50%);
        padding: 40px 30px 30px;
        border-radius: 8px;
    }

    .banner {
        width: 54%;
        position: absolute;
        top: 44%;
        left: 0;
        transform: translateY(-50%);
    }

    .title {
        margin-bottom: 16px;
    }

    .title span {
        font-size: 20px;
        color: #515a6e;
    }

    .title a {
        color: #409eff;
        margin-top: 6px;
    }

    .title a:visited {
        color: #409eff;
    }

    .forgetpassword, .forgetpassword:visited {
        color: #909399;
    }


    .loginimg {
        display: inline;
        width: 40px;
        height: 40px;
    }

    .remember {
        float: left;
    }

    .forgetpwd {
        float: right;
    }

</style>
