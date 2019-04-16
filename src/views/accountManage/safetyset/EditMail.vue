<template>
    <div>
        <h2 class="manage-title">修改绑定邮箱</h2>
        <div class="steps-box marginTopBottom0">
            <div class="steps steps-step">
                <el-steps :active="page" finish-status="success" process-status="finish" align-center>
                    <el-step title="验证原邮箱"></el-step>
                    <el-step title="修改邮箱"></el-step>
                    <el-step title="完成修改"></el-step>
                </el-steps>
            </div>
        </div>
        <div v-if="page === 1" class="amend-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
                <el-form-item label="邮箱号：" prop="email">
                    {{mail}}
                </el-form-item>
                <el-form-item label="验证码：" prop="imgCode">
                    <el-input class="width200" style="width: 200px;" v-model="ruleForm.imgCode" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
                    <el-button style="padding:0;" class="verification" @click="createImgCode">{{checkCode}}</el-button>
                </el-form-item>
                <el-form-item label="邮箱验证码：" prop="emailCode">
                    <el-input style="width: 300px;" class="width200 yzm" v-model="ruleForm.emailCode" maxlength="6" onkeyup="value=value.replace(/[^0-9]/g,'')">
                        <template slot="append"><span><a
                                @click="sendMsg('ruleForm',mail)" >{{contente}}</a></span></template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 300px;" type="primary"
                               @click="nextPage('ruleForm',mail,ruleForm.emailCode)">下一步
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-else-if="page === 2" class="amend-box">
            <el-form :model="ruleForms" :rules="rules" ref="ruleForm" label-width="130px">
                <el-form-item label="新邮箱号：" prop="newEmail">
                    <el-input v-model="ruleForms.newEmail" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="验证码：" prop="imgCode">
                    <el-input class="width200" style="width: 200px;" v-model="ruleForms.imgCode" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
                    <el-button style="padding:0;" class="verification" @click="createImgCode">{{checkCode}}</el-button>
                </el-form-item>
                <el-form-item label="邮箱验证码：" prop="emailCode">
                    <el-input style="width: 300px;" class="width200 yzm" v-model="ruleForms.emailCode"  maxlength="6" onkeyup="value=value.replace(/[^0-9]/g,'')">
                        <template slot="append"><span><a @click="sendMessageCode('ruleForms',ruleForms.newEmail)" :aria-disabled="true">{{content}}</a></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 300px;" type="primary"
                               @click="submitForm('ruleForms',ruleForms.newEmail,ruleForms.emailCode)">下一步
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-else="page === 3" class="amend-box">
            <div class="sure-success"><i class="el-icon-success"></i><span>邮箱号修改成功</span></div>
            <p class="time"><span>{{count}}</span>后自动返回安全设置页面</p>
        </div>
    </div>
</template>

<script>
    import {checkEmail} from "../../../common/validate"; //导入正则校验
    export default {

        created() {
            this.getMail();

        },
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
                page: 1,
                content: "获取验证码",
                contente: "获取验证码",
                totalTime: 60,
                countTime: 60,
                canClick: true, //添加canClick
                checkCode: this.common.createCode(),
                mail: "",
                count:"",
                ruleForm: {
                    email: "",
                    imgCode: "",
                    emailCode: "",
                    newEmail: ""
                },
                ruleForms: {
                    email: "",
                    imgCode: "",
                    emailCode: "",
                    newEmail: ""
                },
                rules: {
                    imgCode: [{
                        required: true,
                        message: '请输入图形验证码',
                        trigger: 'blur'
                    }, {
                        validator: checkCode,
                        trigger: 'blur'
                    }],
                    emailCode: [{
                        required: true,
                        message: '请输入邮箱验证码',
                        trigger: 'blur'
                    }],
                    newEmail: [{
                        required: true,
                        message: '请输入新邮箱号',
                        trigger: 'blur'
                    }]
                }
            }
        }, methods: {
            // 刷新验证码
            createImgCode() {
                this.checkCode = this.common.createCode();
            },
            getMail() {
                let that = this;
                let data = new FormData();
                this.$post('user/getUserInformation', data).then(function (response) {
                    let data = response;
                    if (data.code == 1) {
                        that.mail = data.mail;

                    } else {
                        that.$message.error(data.msg);
                    }
                }).catch(error => console.log("error", error));

            },
            sendMsg(ruleForm, mail) {
                this.$refs['ruleForm'].validateField('imgCode', (checkCode) => {

                    if (!checkCode) {
                   if (this.contente=="获取验证码" ||this.contente=="重新发送"){
                        let data = {"mail": mail, "type": 3};
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
                        this.contente = this.totalTime + 's后重新发送'
                        let clock = window.setInterval(() => {
                            this.totalTime--
                            this.contente = this.totalTime + 's后重新发送'
                            if (this.totalTime < 0) {
                                window.clearInterval(clock)
                                this.contente = '重新发送'
                                this.totalTime = 60
                                this.canClick = true //这里重新开启
                            }
                        }, 1000)
                    }
                    }
                })
            },
            sendMessageCode(ruleForm, mail) {
                this.$refs['ruleForm'].validateField('imgCode', (checkCode) => {

                    if (!checkCode) {
                        if (this.content == "获取验证码" || this.content == "重新发送") {
                            let data = {"mail": mail, "type": 3};
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
                            this.content = this.countTime + 's后重新发送'

                            let clock = window.setInterval(() => {
                                this.countTime--
                                this.content = this.countTime + 's后重新发送'
                                if (this.countTime < 0) {
                                    window.clearInterval(clock)
                                    this.content = '重新发送'
                                    this.countTime = 60
                                    this.canClick = true //这里重新开启
                                }
                            }, 1000)
                        }
                    }
                })
            },

            nextPage(ruleForm, mail, code) {
                this.$refs.ruleForm.validate((valid) => {
                    let that = this;
                    if (valid) {
                        let data = new FormData();
                        data = {
                            "phone": '',
                            "code": code,
                            "mail": mail
                        };
                        this.$post('password/checkCaptchaCorrect', data).then((response) => {
                            let data = response;
                            if (data.code == 1) {
                                this.page = 2;
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

                this.createImgCode();//刷新验证码*/
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
                                this.page = 3;
                                that.threeGo();
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
            threeGo() {
                let that = this;
                const TIME_COUNT = 3;
                //       let path =  '/accountManage/safetyset/safetySet';
                let path =  '/safetyset';
                let name ="SafetySet";
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;

                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                            //跳转的页面写在此处
                            // that.$router.push({
                            //     path :path,
                            //     name :name
                            // });
                            this.$router.push('/safetyset');
                        }
                    }, 1000)
                }
            }
        }
    }
</script>

<style scoped>
    .el-input__inner {
        width: 300px;
    }

    .width200 .el-input__inner {
        width: 200px;
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
        margin-left: 5px;
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
</style>