<template>
    <div>
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" :before-close="closeModal" :uploadEndorsementPkId="pkId" :visible.sync="visible" :insuranceId="insurancePkId" :title="addCorrectionTitle" width="560px" @close="reload()" center>
            <div class="capacity-pop-in" style="padding-right: 12px;">
                <div class="line-tips">如果保单产生变更，请从此上传保险批单；若未变更，请勿进行此项操作，以免因为批单信息审核不通过影响到整个保单的使用！！！<span style="color: #f56c6c;cursor: pointer;">审核失败原因</span></div>
                <div class="manage-tip manage-error" v-if="auditAdvice.length > 0">
                    <div class="manage-tip-txt">
                        <b>审核失败原因如下：</b>
                        1.保险批单上的保单号与保单图片不一致
                    </div>
                </div>
                <el-form :model="uploadEndorsementForm" :rules="uploadEndorsementRules" ref="uploadEndorsementForm" label-width="110px" class="demo-ruleForm">
                    <el-form-item label="车辆清单" class="required_flag" prop="">
                        <span style="width: 50%;" class="ellipsis" >{{carListView}}</span>
                        <span @click="carInfo = true" style="color: #2d8cf0;cursor: pointer;">添加车辆</span>
                    </el-form-item>
                    <el-form-item label="批单变更说明" prop="changeDesc">
                        <el-input type="textarea" v-model="uploadEndorsementForm.changeDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="批单照片" class="required_flag" prop="">
                        <div class="upload_box">
                            <el-upload
                                    name="correction_image1"
                                    class="avatar-uploader"
                                    :action="action"
                                    :show-file-list="false"
                                    :http-request="requestUpload"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="common.beforeAvatarUpload">
                                <img v-model="correction_image1_imageUrl"
                                     v-if="correction_image1_imageUrl" :src="correction_image1_imageUrl"
                                     :imageType="correction_image1_imageUrl_type"
                                     :imgName="correction_image1_imageUrl_name" :imagePkId="correction_image1_imageUrl_pkId" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <div class="upload_box">
                            <el-upload
                                    name="correction_image2"
                                    class="avatar-uploader"
                                    :action="action"
                                    :show-file-list="false"
                                    :http-request="requestUpload"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="common.beforeAvatarUpload">
                                <img v-model="correction_image2_imageUrl"
                                     v-if="correction_image2_imageUrl" :src="correction_image2_imageUrl"
                                     :imageType="correction_image2_imageUrl_type"
                                     :imgName="correction_image2_imageUrl_name" :imagePkId="correction_image2_imageUrl_pkId" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <div class="upload_box">
                            <el-upload
                                    name="correction_image3"
                                    class="avatar-uploader"
                                    :action="action"
                                    :show-file-list="false"
                                    :http-request="requestUpload"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="common.beforeAvatarUpload">
                                <img v-model="correction_image3_imageUrl"
                                     v-if="correction_image3_imageUrl" :src="correction_image3_imageUrl"
                                     :imageType="correction_image3_imageUrl_type"
                                     :imgName="correction_image3_imageUrl_name" :imagePkId="correction_image3_imageUrl_pkId" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <span class="tips_txt">如果保单有过变更请,将保险批单一起上传,最少上传1张，最多3张</span>
                    </el-form-item>
                </el-form>
                <div class="import-bottom">
                    <el-button @click="closeModal">取 消</el-button>
                    <el-button type="primary" @click="saveAndSubmitCorrection">保存并提交</el-button>
                </div>
            </div>
        </el-dialog>
        <!--车辆信息-->
        <carInfo :visible.sync="carInfo" :pkId="carInfoPkId" @getBindCarList="getBindCarList($event)"></carInfo>
    </div>
</template>

<script>
    import carInfo from './CarInfo'
    export default {
        inject:["reload"],
        components:{
            'carInfo':carInfo
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            pkId: {
                type: String,
                default: ""
            },
            insurancePkId: {
                type: String,
                default: ""
            },
            addCorrectionTitle: {
                type: String,
                default: ""
            }

        },
        data() {
            return{
                carListView: '',
                carList: [],
                auditAdvice: '',
                action: this.common.CONSTANT.UPLOADIMGPATH + 'recognizeImage',
                carInfo:false,
                carInfoPkId:'',
                uploadEndorsementForm:{},
                uploadEndorsementRules:{},
                correction_image1_imageUrl_pkId: '',
                correction_image1_imageUrl: '',
                correction_image1_imageUrl_type: '',
                correction_image1_imageUrl_name: '',
                correction_image2_imageUrl_pkId: '',
                correction_image2_imageUrl: '',
                correction_image2_imageUrl_type: '',
                correction_image2_imageUrl_name: '',
                correction_image3_imageUrl_pkId: '',
                correction_image3_imageUrl: '',
                correction_image3_imageUrl_type: '',
                correction_image3_imageUrl_name: '',
                uploadEndorsementRules: {
                    changeDesc: {required: true, message: '此项不能为空', trigger: 'blur'},
                    // cars: {required: true, message: '此项不能为空', trigger: 'change'},
                }
            }
        },
        methods:{
            getBindCarList(data) {
                this.carList = data.carList;
                let carListView = '';
                if (this.carList.length > 0) {
                    this.carList.forEach(function(car) {
                        carListView += car.headCarNo+"/";
                    });
                }
                this.uploadEndorsementForm.cars = carListView;
                this.carListView = carListView;
            },
            requestUpload(obj) {
                this.common.uploadImgFun(obj, this);
            },
            handleAvatarSuccess(response, file) {
                let data = JSON.parse(response.data);
                let imageType = data['resultData']['imageType'];
                let imageTypeValue = data['resultData']['imageTypeValue'];
                let filePath = data['resultData']['filePath'];
                let imageUrl = imageType + "_imageUrl";
                let imageUrlType = imageUrl + "_type";
                let imageUrlName = imageUrl + "_name";
                this[imageUrl] = filePath;
                this[imageUrlType] = imageTypeValue;
                this[imageUrlName] = file.name;
            },
            closeModal: function () {
                this.$emit('update:visible', false)
            },
            saveAndSubmitCorrection() {
                this.$refs.uploadEndorsementForm.validate((valid) => {
                    if (valid) {
                        if (!this.carListView) {
                            this.$message.info("请选择车辆!");
                            return false;
                        }
                        if (!this.correction_image1_imageUrl && !this.correction_image2_imageUrl && !this.correction_image2_imageUrl) {
                            this.$message.info("保险批单最少上传1张!");
                            return false;
                        }
                        let that = this;
                        this.$confirm('审核中及审核通过后，批单信息将无法修改，确认您提交的信息已无误？', '提交提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'info'
                        }).then(() => {
                            let ltdCorrectionCarrier = this.uploadEndorsementForm;
                            ltdCorrectionCarrier.insuranceId = this.insurancePkId;
                            let insuranceCarrierCarList = this.carList;
                            let companyImgList = [];
                            if (this['policy_image_imageUrl']) {
                                companyImgList.push(
                                    {
                                        pkId: this['policy_image_imageUrl_pkId'],
                                        imageName: this['policy_image_imageUrl_name'],
                                        imagePath: this['policy_image_imageUrl'],
                                        type: this['policy_image_imageUrl_type'],
                                        imageStatus: 1,
                                        imageMark: 'policy_image'
                                    }
                                )
                            }
                            if (this['correction_image1_imageUrl']) {
                                companyImgList.push(
                                    {
                                        pkId: this['correction_image1_imageUrl_pkId'],
                                        imageName: this['correction_image1_imageUrl_name'],
                                        imagePath: this['correction_image1_imageUrl'],
                                        type: this['correction_image1_imageUrl_type'],
                                        imageStatus: 1,
                                        imageMark: 'correction_image1'
                                    }
                                )
                            }
                            if (this['correction_image2_imageUrl']) {
                                companyImgList.push(
                                    {
                                        pkId: this['correction_image2_imageUrl_pkId'],
                                        imageName: this['correction_image2_imageUrl_name'],
                                        imagePath: this['correction_image2_imageUrl'],
                                        type: this['correction_image2_imageUrl_type'],
                                        imageStatus: 1,
                                        imageMark: 'correction_image2'
                                    }
                                )
                            }
                            if (this['correction_image3_imageUrl']) {
                                companyImgList.push(
                                    {
                                        pkId: this['correction_image3_imageUrl_pkId'],
                                        imageName: this['correction_image3_imageUrl_name'],
                                        imagePath: this['correction_image3_imageUrl'],
                                        type: this['correction_image3_imageUrl_type'],
                                        imageStatus: 1,
                                        imageMark: 'correction_image3'
                                    }
                                )
                            }
                            let insuranceCarrierCorrectionVO = {
                                "ltdCorrectionCarrier": ltdCorrectionCarrier,
                                "insuranceCarrierCarList": insuranceCarrierCarList,
                                "companyImgList" : companyImgList
                            };

                            that.$post("insuranceManage/carrierCorrection", {"data":JSON.stringify(insuranceCarrierCorrectionVO)}).then(function (response) {
                                let data = response;
                                if(data.code == 0) {
                                    that.$message({
                                        type: 'error',
                                        message: data.msg
                                    });
                                } else {
                                    that.reload();
                                }
                            }).catch(error => console.log("error", error));
                        }).catch(() => {
                    });
                    }
                });
            },
            editCorrection(insurancePkId) { //修改批单
                let that = this;
                that.$post("insuranceManage/correctionDetail", {"insuranceId":insurancePkId}).then(function (response) {
                    let data = response;
                    if(data.code == 0) {
                        that.$message({
                            type: 'error',
                            message: data.msg
                        });
                    } else {
                        let correction =data['resultData']['correctionCarrier'];
                        let ltdCorrectionCarrier = correction['ltdCorrectionCarrier'];
                        that.uploadEndorsementForm = ltdCorrectionCarrier;
                        let companyImgList = correction['companyImgList'];
                        if (companyImgList && companyImgList.length > 0) {
                            companyImgList.forEach(function (image) {
                                let imageType = image['imageMark'];
                                let imagePath = imageType + "_imageUrl";
                                let imageName = imageType + "_imageUrl_name";
                                let imagePkId = imageType + "_imageUrl_pkId";
                                that[imagePkId] = image['pkId'];
                                that[imageName] = image['imageName'];
                                that[imagePath] = that.common.CONSTANT.imagePrefix + image['imagePath'];
                            })
                        }
                        let insuranceCarrierCarList = correction['insuranceCarrierCarList'];
                        if (insuranceCarrierCarList && insuranceCarrierCarList.length > 0) {
                            insuranceCarrierCarList.forEach(function(car) {
                                that.carListView += car.headCarNo+"/";
                            });
                            that.carList = insuranceCarrierCarList;
                        }
                    }
                }).catch(error => console.log("error", error));
            }
        },
        watch: {
            insurancePkId: function () {
                if (this.insurancePkId && this.visible) {
                    this.editCorrection(this.insurancePkId);
                }
            }
        }
    }
</script>

<style scoped>

</style>
