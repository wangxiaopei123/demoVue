<template>
    <div class="transportlicence">
        <h2 class="manage-title">道路运输经营许可证</h2>

        <div class="manage-tip" v-if="page === 2" >
            <i class="el-icon-question"></i>
            <div class="manage-tip-txt">
                <!--     <span>{{checkAdvice}}</span>  -->
                <span>您已成功提交认证信息，请您耐心等待审核结果。</span>
                <br>
                我们的审核时间为三个工作日，遇法定节假日顺延,请随时关注审核结果。 客户服务电话：4006-556-756
            </div>
        </div>
        <div class="manage-tip manage-error"  v-if="page === 3">
            <i class="el-icon-warning"></i>
            <div class="manage-tip-txt" >
                <span><b>认证失败！</b>您提交的认证资料有误，请核对后<a href="javascript:;" @click="editTransporInfo">重新认证</a>！</span>
                <br>
                失败原因如下：
                <br>
                <p v-for="lincese in suggestLinceseType" >
                    {{ lincese }}
                </p>
                <!--	{{causeFailure}} -->
            </div>
        </div>
        <div class="steps-box marginTopBottom0"   >
            <div class="steps steps-step">
                <el-steps :active="page" finish-status="success" process-status="finish" align-center>
                    <el-step title=" 1.变更认证信息"></el-step>
                    <el-step title="  2.认证信息审核"></el-step>
                    <el-step title=" 3.认证成功"></el-step>
                </el-steps>
            </div>
        </div>
        <el-row class="manage-com">
            <el-col :span="24">
                <div v-if="page === 1">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right" label-width="150px"
                             size="mini">
                        <el-input v-model="ruleForm.pkId" type="hidden"></el-input>
                        <el-input v-model="ruleForm.imgId" type="hidden"></el-input>

                        <h2 class="info-title">道路运输经营许可证</h2>
                        <el-form-item label="业户名称：" prop="licenseName">
                            <el-input v-model="ruleForm.licenseName"> {{ruleForm.licenseName}}</el-input>
                        </el-form-item>
                        <el-form-item label="许可字号：" prop="licenseNo">
                            <el-input v-model="ruleForm.licenseNo">
                                {{ruleForm.licenseNo}}
                            </el-input>
                        </el-form-item>
                        <el-form-item label="证件有效期：" prop="licenseCardtime">
                            <el-date-picker style="width:100%;" v-model="ruleForm.licenseCardtime" type="date"
                                            placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="道路运输经营许可证" prop="transport_license_imageUrl" class="required_flag">
                            <div class="upload_box">
                                <el-upload
                                        class="avatar-uploader"
                                        name="transport_license"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload"><!--图片验证 :before-upload="beforeAvatarUpload" -->
                                    <img v-if="transport_license_imageUrl" :src="transport_license_imageUrl"
                                         :imageType="transport_license_imageUrl_type"
                                         :imgName="transport_license_imageUrl_name" class="avatar imgSet">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '24'">查看示例</div>
                            </div>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="" @click="$router.back(-1)">返回</el-button>
                            <el-button type="primary" @click="submitCompanyCardForm('ruleForm')">下一步</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-else-if="page === 2">
                    <el-form :model="ruleInfoForm" :rules="rulesInfo" ref="ruleInfoForm" label-position="right"
                             label-width="200px" size="mini">
                        <h2 class="info-title">道路运输经营许可证</h2>

                        <el-form-item class="required_flag" label="业户名称：">
                            {{ruleForm.licenseName}}
                        </el-form-item>
                        <el-form-item class="required_flag" label="许可字号：">
                            {{ruleForm.licenseNo}}
                        </el-form-item>
                        <el-form-item class="required_flag" label="证件有效期：">
                            {{ruleForm.licenseCardtime}}
                        </el-form-item>
                        <el-form-item  label="道路运输经营许可证：" class="required_flag">
                            <img class="imgSet" :src="transport_license_imageUrl" alt="">
                        </el-form-item>

                        <!--<el-form-item v-if="page === 2">-->
                            <!--<el-button type="primary" @click="editTransporInfo">重新认证</el-button>-->
                        <!--</el-form-item>-->
                    </el-form>
                </div>
                <div v-else-if="page === 3">
                    <el-form :model="ruleInfoForm" :rules="rulesInfo" ref="ruleInfoForm" label-position="right"
                             label-width="200px" size="mini">
                        <h2 class="info-title">道路运输经营许可证</h2>

                        <el-form-item  class="required_flag" label="业户名称：">
                            {{ruleForm.licenseName}}
                        </el-form-item>
                        <el-form-item class="required_flag" label="许可字号：">
                            {{ruleForm.licenseNo}}
                        </el-form-item>
                        <el-form-item class="required_flag" label="证件有效期：">
                            {{ruleForm.licenseCardtime}}
                        </el-form-item>
                        <el-form-item class="required_flag" label="道路运输经营许可证：">
                            <img class="imgSet" :src="transport_license_imageUrl" alt="">
                        </el-form-item>

                        <el-form-item v-if="checkStatus === 'error'">
                            <el-button type="primary" @click="editTransporInfo">重新认证</el-button>
                        </el-form-item>
                    </el-form>
                </div>

            </el-col>
        </el-row>
        <SampleGraph :visible.sync="sampleImg" :sampleType="sampleType"></SampleGraph>
    </div>
</template>

<script>
    import SampleGraph from '../../admitWeb/SampleGraph'
    export default {
        components: {
            'SampleGraph':SampleGraph
        },
        created() {
            this.getTransportLicense();
        },
        data() {
            let suggestLinceseType = [];
            let suggest = [];

            return {
                sampleImg: false,
                sampleType:'',
                flag:"",
                companyId: "",
                checkAdvice:"",
                causeFailure:"",
                page: 1,
                transport_license_imageUrl: '',
                transport_license_imageUrl_type: "",
                transport_license_imageUrl_name: "",
                action: this.common.CONSTANT.UPLOADIMGPATH + "recognizeImage",
                ruleForm: {},
                rules: {
                    licenseName: [{required: true, message: '请输入许可证上的业户名称', trigger: 'blur'},
                        {min: 2, max: 100, message: '请输入正确格式'}],
                    licenseNo: [{required: true, message: '请输入许可证上的证号', trigger: 'blur'},
                        {min: 10, max: 20, typr: 'number', message: '请输入正确格式'}],
                    licenseCardtime: [{required: true, message: '请选择证件有效期', trigger: 'blur'},],
                },
                ruleInfoForm: {},
                rulesInfo: {},
                checkStatus: ""
            }
        },
        methods: {
            getTransportLicense() {
                let data = new FormData();
                let that = this;
                this.$get("transport/getTransportLicense", data).then(function (response) {

                    that.ruleForm = response.resultData.ltdCompanyTransportLicense;
                    that.companyId = response.resultData.ltdCompanyTransportLicense.companyId;
                    if(response.resultData.ltdCompanyTransportLicense.imagePath != null){
                        that.transport_license_imageUrl =that.common.CONSTANT.imagePrefix+response.resultData.ltdCompanyTransportLicense.imagePath;
                    }
                    that.suggest =response.resultData.list;
                    that.flag = that.$route.params['flag']
                    if(that.flag != 1){
                    if(response.resultData.ltdCompanyTransportLicense.verifyStatus == 0 || response.resultData.ltdCompanyTransportLicense.verifyStatus == 3){
                        that.page = 2;
                        that.checkStatus = 'success';
                    }else if(response.resultData.ltdCompanyTransportLicense.verifyStatus == 1){
                        that.$router.push('/transportlicence');
                    }else{
                        that.checkStatus = 'error';
                        let bp = [];
                        that.page = 3;
                        if (that.suggest) {
                            that.suggest.forEach(function(t){
                                bp.push(t.name);

                            });
                            that.suggestLinceseType =bp;

                        }

                    }
                    }
                    // this.transport_license_imageUrl_type=response.resultData.ltdCompanyTransportLicense.imagePath;
                    // console.info(response.resultData.ltdCompanyTransportLicense)
                    /*  that.transport_license_imageUrl=response.resultData.ltdCompanyTransportLice.imageUrl;
                      that.transport_license_imageUrl_type="transport_license";
                      that.transport_license_imageUrl_name=response.resultData.ltdCompanyTransportLice.imageUrl;*/
                    if(response.resultData.ltdCompanyTransportLicense.licenseCardReal==1){
                        that.checkAdvice="审核通过";
                        document.getElementById("checkf").style.display="none";
                    }else{
                        that.checkAdvice="审核没有通过";
                        that.causeFailure=response.resultData.causeFailure
                    }
                }).catch(error => {
                    console.log("error", error);
                    that.$message.error("获取失败!")
                });
            },
            editTransporInfo:function(){
                this.page=1;

            },
            /*******上传图片方法**start******/
            requestUpload(obj) {
                //	alert(this.companyId);
                obj.companyId = this.companyId;
                this.common.uploadImgFun(obj, this);
            },
            handleAvatarSuccess(res, file) {
                let data = JSON.parse(res.data);
                this.transport_license_imageUrl=data.resultData.filePath;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            /*******上传图片方法**end******/
            /**
             * 提交企业证件表单
             */
            submitCompanyCardForm(formName) {
                let data = new FormData();
                let that = this;

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let imageValid = true;

                        // if (!this['transport_license_imageUrl']) {
                        // 	this.$message.info("道路运输经营许可证不能为空");
                        // 	imageValid = false;// }
                        // if (!imageValid) {
                        // 	return false;
                        // }
                        let LtdCompanyTransportLicenseVO = {

                            "imagePath": that.transport_license_imageUrl,
                            "licenseName": that.ruleForm.licenseName,
                            "pkId": that.ruleForm.pkId,
                            "imgId": that.ruleForm.imgId,
                            "licenseNo": that.ruleForm.licenseNo,
                            "licenseCardtime": that.ruleForm.licenseCardtime
                        };
                        data = JSON.stringify(LtdCompanyTransportLicenseVO);
                        this.$post('transport/saveTransportLicense', {data: data}).then((response) => {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.page = 2;
                            this.checkStatus = 'success'
                        }).catch(() => {
                            this.$message.error('提交失败');
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

<style scoped>
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 100%;
    }
</style>
