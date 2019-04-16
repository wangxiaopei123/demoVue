<template>
    <div class="case">
        <Header></Header>
        <!--<div class="header clear">-->
            <!--<img src="../../images/company/logo.png" alt="logo">-->
            <!--<div class="tabbar">-->
                <!--<a href="/#/Register">注册</a>-->
                <!--<a href="/#/login">登录</a>-->
                <!--<a href="https://www.iyunche.com/index?index=1">返回官网</a>-->
                <!--<a href="javascript:;">常见问题</a>-->
            <!--</div>-->
        <!--</div>-->
        <div class="content">
            <div class="content-in">
                <div class="steps-box">
                    <div class="steps steps-step">
                        <el-steps :active="active" finish-status="success" process-status="finish" align-center>
                            <el-step title="企业资料填写"></el-step>
                            <el-step title="企业实名认证"></el-step>
                            <el-step title="认证成功"></el-step>
                        </el-steps>
                    </div>
                </div>
                <el-row>
                    <el-col :span="24" class="info-case">
                        <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="150px"
                                 class="demo-ruleForm">
                            <!--验证时加上（ :rules="rules" ） -->
                            <h2 class="info-title">企业证件</h2>
                            <div class="info-item clear">
                                <el-form-item label="企业名称：" prop="name"><!---验证时加上（ prop="name" ） -->
                                    <el-input v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="统一社会信用代码：" prop="creditCode">
                                    <el-input v-model="ruleForm.creditCode" maxlength="18" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
                                </el-form-item>
                                <el-form-item class="required_flag" label="营业执照：" prop="business_license_imageUrl">
                                    <div class="upload_box">
                                        <el-upload
                                                name="business_license"
                                                class="avatar-uploader"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="business_license_imageUrl" :src="business_license_imageUrl"
                                                 :imageType="business_license_imageUrl_type"
                                                 :imgName="business_license_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '26'">查看示例</div>
                                    </div>
                                </el-form-item>
                            </div>
                            <h2 class="info-title">法定代表人信息</h2>
                            <div class="info-item info-other clear">

                                <el-form-item class="required_flag" label="法人身份证" prop="legal_id_card_front_imageUrl">
                                    <div class="upload_box">
                                        <span class="tit_tit">个人信息页</span>
                                        <el-upload
                                                class="avatar-uploader"
                                                name="legal_id_card_front"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="legal_id_card_front_imageUrl" :src="legal_id_card_front_imageUrl"
                                                 :imageType="legal_id_card_front_imageUrl_type"
                                                 :imgName="legal_id_card_front_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '6'">查看示例</div>
                                    </div>
                                    <div class="upload_box">
                                        <span class="tit_tit">国徽页</span>
                                        <el-upload
                                                class="avatar-uploader"
                                                name="legal_id_card_back"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="legal_id_card_back_imageUrl" :src="legal_id_card_back_imageUrl"
                                                 :imageType="legal_id_card_back_imageUrl_type"
                                                 :imgName="legal_id_card_back_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '7'">查看示例</div>
                                    </div>
                                    <div class="upload_box">
                                        <span class="tit_tit">手持身份证</span>
                                        <el-upload
                                                class="avatar-uploader"
                                                name="legal_hand"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="legal_hand_imageUrl" :src="legal_hand_imageUrl"
                                                 :imageType="legal_hand_imageUrl_type" :imgName="legal_hand_imageUrl_name"
                                                 class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '8'">查看示例</div>
                                    </div>
                                </el-form-item>
                            </div>
                            <h2 class="info-title">委托人信息（业务负责人）</h2>

                            <div class="info-item info-other clear">
                                <el-form-item class="required_flag" label="委托人身份证" prop="agent_id_card_front_imageUrl">
                                    <div class="upload_box">
                                        <span class="tit_tit">个人信息页</span>
                                        <el-upload
                                                class="avatar-uploader"
                                                name="agent_id_card_front"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="agent_id_card_front_imageUrl" :src="agent_id_card_front_imageUrl"
                                                 :imageType="agent_id_card_front_imageUrl_type"
                                                 :imgName="agent_id_card_front_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '6'">查看示例</div>
                                    </div>
                                    <div class="upload_box">
                                        <span class="tit_tit">国徽页</span>
                                        <el-upload
                                                class="avatar-uploader"
                                                name="agent_id_card_back"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="agent_id_card_back_imageUrl" :src="agent_id_card_back_imageUrl"
                                                 :imageType="agent_id_card_back_imageUrl_type"
                                                 :imgName="agent_id_card_back_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '7'">查看示例</div>
                                    </div>
                                    <div class="upload_box">
                                        <span class="tit_tit">手持身份证</span>
                                        <el-upload
                                                class="avatar-uploader"
                                                name="agent_hand"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="agent_hand_imageUrl" :src="agent_hand_imageUrl"
                                                 :imageType="agent_hand_imageUrl_type" :imgName="agent_hand_imageUrl_name"
                                                 class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '8'">查看示例</div>
                                    </div>
                                </el-form-item>
                                <el-form-item class="required_flag" label="委托人授权书">
                                    <div class="upload_box sqs_box">
                                        <span class="tit_tit tit_tip">授权书必须盖有单位公章或财务专用章<a href="javascript:">下载委托人授权书模板</a></span>
                                        <el-upload
                                                class="avatar-uploader"
                                                name="agent_authorize"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="agent_authorize_imageUrl" :src="agent_authorize_imageUrl"
                                                 :imageType="agent_authorize_imageUrl_type"
                                                 :imgName="agent_authorize_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '25'">查看示例</div>
                                    </div>
                                </el-form-item>
                            </div>


                            <el-form-item>
                                <el-button v-loading="loading" type="primary" @click="submitForm">下一页</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </div>
        <SampleGraph :visible.sync="sampleImg" :sampleType="sampleType"></SampleGraph>

    </div>
</template>

<script>
    import SampleGraph from '../admitWeb/SampleGraph'  //示例图
    import Header from '../frame/Header'  //头部
    export default {
        components:{
            'SampleGraph':SampleGraph,
            'Header':Header
        },
        created() {
            let register = this.common.fetchData("register");
            if (!register) {
                this.$message.info("访问异常，请重新登录");
                this.$router.push({
                    name: 'Login'
                })
            } else {
                let authentic = this.common.fetchData("authentic");
                if (authentic) {
                    this.logisticsType = authentic['ltdCompany']['logisticsType'];
                    if (authentic.companyImgList.length > 0) {
                        let that = this;
                        authentic.companyImgList.forEach(function (image) {
                            let imageType = image['imageMark'];
                            let imagePath = imageType + "_imageUrl";
                            that[imagePath] = that.common.CONSTANT.imagePrefix + image['imagePath'];
                        })
                    }
                }
            }
            this.phone = register['phone'];
            this.companyId = register['companyId'];
            this.belongLtdType = register['belongLtdType'];
        },
        data() {
            let authentic = this.common.fetchData("authentic");
            let ruleForm = {};
            if (authentic) {
                ruleForm.name = authentic.ltdCompany.name;
                ruleForm.creditCode = authentic.ltdCompany.creditCode;
                if (authentic.companyImgList.length > 0) {
                    let that = this;
                    authentic.companyImgList.forEach(function (image) {
                        let imageType = image['imageMark'];
                        let imagePath = imageType + "_imageUrl";
                        ruleForm[imagePath] = that.common.CONSTANT.imagePrefix + image['imagePath'];
                    })
                }
            }

            return {
                loading: false,
                phone: '',
                logisticsType: '',
                companyId : '',
                belongLtdType: '',
                sampleImg: false,
                sampleType:'',
                active: 0, //步骤栏默认
                imageUrl: '',   //图片地址
                fileList: [],
                value: '',
                ruleForm: ruleForm,
                rules: {
                    name: {required: true, message: '此项不能为空', trigger: 'blur'},
                    creditCode: {required: true, message: '此项不能为空', trigger: 'blur'},
                    /* legal_id_card_front_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},
                     legal_id_card_back_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},
                     legal_hand_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},
                     agent_id_card_front_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},
                     agent_id_card_back_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},
                     agent_hand_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},*/
                    creditCode: {required: true, message: '此项不能为空', trigger: 'blur'},


                },
                action: this.common.CONSTANT.UPLOADIMGPATH + 'recognizeImage',
                business_license_imageUrl: '',
                business_license_imageUrl_type: '',
                business_license_imageUrl_name: '',
                legal_id_card_front_imageUrl: '',
                legal_id_card_front_imageUrl_type: '',
                legal_id_card_front_imageUrl_name: '',
                legal_id_card_back_imageUrl: '',
                legal_id_card_back_imageUrl_type: '',
                legal_id_card_back_imageUrl_name: '',
                legal_hand_imageUrl: '',
                legal_hand_imageUrl_type: '',
                legal_hand_imageUrl_name: '',
                agent_id_card_front_imageUrl: '',
                agent_id_card_front_imageUrl_type: '',
                agent_id_card_front_imageUrl_name: '',
                agent_id_card_back_imageUrl: '',
                agent_id_card_back_imageUrl_type: '',
                agent_id_card_back_imageUrl_name: '',
                agent_hand_imageUrl: '',
                agent_hand_imageUrl_type: '',
                agent_hand_imageUrl_name: '',
                agent_authorize_imageUrl: '',
                agent_authorize_imageUrl_type: '',
                agent_authorize_imageUrl_name: ''
            }
        },
        methods: {
            /********图片校验 start**********/
            requestUpload(obj) {
                obj.companyId = this.companyId;
                this.common.uploadImgFun(obj, this);
            },
            handleAvatarSuccess(response, file) {
                let data = JSON.parse(response.data);
                let imageType = data['resultData']['imageType'];
                let imageTypeValue = data['resultData']['imageTypeValue'];
                let filePath = data['resultData']['filePath'];
                let attrs = data['resultData']['attrs'];
                let imageUrl = imageType + "_imageUrl";
                let imageUrlType = imageUrl + "_type";
                let imageUrlName = imageUrl + "_name";
                // this[imageUrlName] = URL.createObjectURL(file.raw);
                this[imageUrl] = filePath;
                this[imageUrlType] = imageTypeValue;
                this[imageUrlName] = file.name;
                let authenticData = this.common.fetchData("authentic");
                authenticData = authenticData ? authenticData : {};
                let ltdCompany = {};
                if (authenticData['ltdCompany']) {
                    ltdCompany = authenticData['ltdCompany'];
                }
                let ltdCompanyLegalPerson = {}; //法人身份证识别信息
                if (authenticData['ltdCompanyLegalPerson']) {
                    ltdCompanyLegalPerson = authenticData['ltdCompanyLegalPerson'];
                }
                let ltdCompanyAgent = {}; //委托人身份证识别信息
                if (authenticData['ltdCompanyAgent']) {
                    ltdCompanyAgent = authenticData['ltdCompanyAgent'];
                }
                if ("business_license" === imageType) { //营业执照
                    if (attrs) {
                        this.ruleForm = Object.assign({}, this.ruleForm, {name:'',creditCode:''});
                        ltdCompany.name = attrs['businessName'];
                        if (!this.ruleForm.name) this.ruleForm.name = ltdCompany.name;
                        ltdCompany.creditCode = attrs['businessRegName'];
                        if (!this.ruleForm.creditCode && ltdCompany.creditCode) this.ruleForm.creditCode = ltdCompany.creditCode;
                        ltdCompany.regAddress = attrs['businessAddress'];
                        ltdCompany.businessScope = attrs['businessScope'];
                        ltdCompany.businessTerm = attrs['businessValidPeriod'];
                        ltdCompany.regCapital = attrs['businessCaptial'];
                    }
                    authenticData.ltdCompany = ltdCompany;
                } else if ("legal_id_card_front" === imageType) { //法人身份证个人信息页
                    if (attrs) {
                        ltdCompanyLegalPerson.legalPersonName = attrs['idName'];
                        ltdCompanyLegalPerson.legalPersonCard = attrs['idNumber'];
                    }
                    authenticData.ltdCompanyLegalPerson = ltdCompanyLegalPerson;
                } else if ("legal_id_card_back" === imageType) { //法人身份证国徽页
                    if (attrs) {
                        if (attrs['idValidity'])
                            ltdCompanyLegalPerson.legalPersonCardtime = attrs['idValidity'].split('-')[1].trim().replace(/\./g, '-');
                    }
                    authenticData.ltdCompanyLegalPerson = ltdCompanyLegalPerson;
                } else if ("agent_id_card_front" === imageType) { //委托人身份证个人信息页
                    if (attrs) {
                        ltdCompanyAgent.agentName = attrs['idName'];
                        ltdCompanyAgent.agentCard = attrs['idNumber'];
                    }
                    authenticData.ltdCompanyAgent = ltdCompanyAgent;
                } else if ("agent_id_card_back" === imageType) { //委托人身份证国徽页
                    if (attrs) {
                        if (attrs['idValidity'])
                            ltdCompanyAgent.agentCardtime = attrs['idValidity'].split('-')[1].trim().replace(/\./g, '-');
                    }
                    authenticData.ltdCompanyAgent = ltdCompanyAgent;
                }
                this.common.saveData("authentic", authenticData);
            },
            /********图片校验 end**********/
            /********文件校验 start**********/
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            /********文件校验 end**********/
            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        let imageValid = true;
                        let belongLtdType = this.belongLtdType;

                        if (!this['business_license_imageUrl']) {
                            this.$message.info("未上传营业执照");
                            imageValid = false;
                        }
                        if (!this['legal_id_card_front_imageUrl'] || !this['legal_id_card_back_imageUrl'] || !this['legal_hand_imageUrl']) {
                            this.$message.info("法人身份证照片上传不全");
                            imageValid = false;
                        }
                        if (!this['agent_id_card_front_imageUrl'] || !this['agent_id_card_back_imageUrl'] || !this['agent_hand_imageUrl']) {
                            this.$message.info("委托人身份证照片上传不全");
                            imageValid = false;
                        }
                        if (!this['agent_authorize_imageUrl']) {
                            this.$message.info("未上传委托人授权书");
                            imageValid = false;
                        }
                        if (!imageValid) {
                            return false;
                        }
                        this.loading = true;

                        let authenticData = this.common.fetchData("authentic");

                        //企业信息
                        if (!authenticData['ltdCompany']) authenticData['ltdCompany'] = {};
                        authenticData['ltdCompany']['name'] = this.ruleForm.name;
                        authenticData['ltdCompany']['creditCode'] = this.ruleForm.creditCode;
                        if (belongLtdType) {
                            authenticData['ltdCompany']['logisticsType'] = 2; //非物流
                            if (belongLtdType.indexOf('1') != -1) authenticData['ltdCompany']['logisticsType'] = 1;//物流
                        }
                        //资源文件集合
                        let companyImgList = [];
                        if (this['business_license_imageUrl']) { //营业执照
                            companyImgList.push(
                                {
                                    imageName: this['business_license_imageUrl_name'],
                                    imagePath: this['business_license_imageUrl'],
                                    type: this['business_license_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'business_license'
                                }
                            )
                        }
                        if (this['legal_id_card_front_imageUrl']) { //法人身份证个人信息页
                            companyImgList.push(
                                {
                                    imageName: this['legal_id_card_front_imageUrl_name'],
                                    imagePath: this['legal_id_card_front_imageUrl'],
                                    type: this['legal_id_card_front_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'legal_id_card_front'
                                }
                            )
                        }
                        if (this['legal_id_card_back_imageUrl']) { //法人身份证国徽页
                            companyImgList.push(
                                {
                                    imageName: this['legal_id_card_back_imageUrl_name'],
                                    imagePath: this['legal_id_card_back_imageUrl'],
                                    type: this['legal_id_card_back_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'legal_id_card_back'
                                }
                            )
                        }
                        if (this['legal_hand_imageUrl']) { //法人手持身份证
                            companyImgList.push(
                                {
                                    imageName: this['legal_hand_imageUrl_name'],
                                    imagePath: this['legal_hand_imageUrl'],
                                    type: this['legal_hand_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'legal_hand'
                                }
                            )
                        }
                        if (this['agent_id_card_front_imageUrl']) { //委托人身份证个人信息页
                            companyImgList.push(
                                {
                                    imageName: this['agent_id_card_front_imageUrl_name'],
                                    imagePath: this['agent_id_card_front_imageUrl'],
                                    type: this['agent_id_card_front_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'agent_id_card_front'
                                }
                            )
                        }
                        if (this['agent_id_card_back_imageUrl']) { //委托人身份证国徽页
                            companyImgList.push(
                                {
                                    imageName: this['agent_id_card_back_imageUrl_name'],
                                    imagePath: this['agent_id_card_back_imageUrl'],
                                    type: this['agent_id_card_back_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'agent_id_card_back'
                                }
                            )
                        }
                        if (this['agent_hand_imageUrl']) { //委托人手持身份证
                            companyImgList.push(
                                {
                                    imageName: this['agent_hand_imageUrl_name'],
                                    imagePath: this['agent_hand_imageUrl'],
                                    type: this['agent_hand_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'agent_hand'
                                }
                            )
                        }
                        if (this['agent_authorize_imageUrl']) { //委托人授权书
                            companyImgList.push(
                                {
                                    imageName: this['agent_authorize_imageUrl_name'],
                                    imagePath: this['agent_authorize_imageUrl'],
                                    type: this['agent_authorize_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'agent_authorize'
                                }
                            )
                        }
                        authenticData.companyImgList = companyImgList;

                        authenticData.ltdCompanyUsers = {
                            phone: this.phone,
                            companyId: this.companyId,
                            belongLtdType: this.belongLtdType
                        };
                        authenticData['ltdCompany']['carrierType'] = 2;
                        let data = {
                            "data": JSON.stringify(authenticData),
                            "type": "2"
                        };
                        let that = this;
                        this.$post("authentic", data).then(function (response) {
                            let data = response;
                            if (data.code == 0) {
                                that.$message.error(data.msg);
                            } else {
                                that.common.saveData("authentic",data['resultData']['authentic']);
                                that.$router.push({
                                    path: '/company/verifyInfo',
                                    name: 'CompanyVerifyInfo'
                                });
                            }
                            that.loading = false;
                        }).catch(error => {
                            that.loading = false;
                            console.log("error", error)
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .header img {
        float: left;
        margin-top: 20px;
    }
</style>
