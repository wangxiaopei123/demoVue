<template>
    <div>
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" :before-close="closeModal" :uploadEndorsementPkId="pkId" :visible.sync="visible" title="上传批单" width="560px" center>
            <div class="capacity-pop-in" style="padding-right: 12px;">
                <div class="line-tips">如果保单产生变更，请从此上传保险批单；若未变更，请勿进行此项操作，以免因为批单信息审核不通过影响到整个保单的使用！！！<span style="color: #f56c6c;cursor: pointer;">审核失败原因</span></div>
                <div class="manage-tip manage-error">
                    <div class="manage-tip-txt">
                        <b>审核失败原因如下：</b>
                        1.保险批单上的保单号与保单图片不一致
                    </div>
                </div>
                <el-form :model="uploadEndorsementForm" :rules="uploadEndorsementRules" ref="uploadEndorsementForm" label-width="110px" class="demo-ruleForm">
                    <el-input v-model="uploadEndorsementForm.pkId" type="hidden"></el-input>
                    <el-input v-model="uploadEndorsementForm.insuranceId" type="hidden" ></el-input>
                    <el-form-item label="司机清单:" class="required_flag" prop="">
                        <span class="ellipsis">{{driverName}}</span>
                        <span @click="driverInfo = true" style="color: #2d8cf0;cursor: pointer;">添加司机</span>
                        <el-input v-model="driverId" type="hidden"></el-input>
                    </el-form-item>
                    <el-form-item label="批单变更说明:" prop="">
                        <el-input type="textarea" v-model="uploadEndorsementForm.changeDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="批单照片:" class="required_flag" prop="">
                        <div class="upload_box">
                            <el-upload
                                    class="avatar-uploader"
                                    name="correction_employer1"
                                    :action="action"
                                    :show-file-list="false"
                                    :http-request="requestUpload"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="common.beforeAvatarUpload">

                                <img v-if="correction_employer1_imageUrl_name" :src="correction_employer1_imageUrl"
                                     :imageType="correction_employer1_imageUrl_type"
                                     :imgName="correction_employer1_imageUrl_name"
                                     class="avatar">

                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <div class="upload_box">
                            <el-upload
                                    class="avatar-uploader"
                                    name="correction_employer2"
                                    :action="action"
                                    :show-file-list="false"
                                    :http-request="requestUpload"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="common.beforeAvatarUpload">

                                <img v-if="correction_employer2_imageUrl_name" :src="correction_employer2_imageUrl"
                                     :imageType="correction_employer2_imageUrl_type"
                                     :imgName="correction_employer2_imageUrl_name"
                                     class="avatar">

                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <div class="upload_box">
                            <el-upload
                                    class="avatar-uploader"
                                    name="correction_employer3"
                                    :action="action"
                                    :show-file-list="false"
                                    :http-request="requestUpload"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="common.beforeAvatarUpload">
                                <img v-if="correction_employer3_imageUrl_name" :src="correction_employer3_imageUrl"
                                     :imageType="correction_employer3_imageUrl_type"
                                     :imgName="correction_employer3_imageUrl_name"
                                     class="avatar">

                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <span class="tips_txt">如果保单有过变更请,将保险批单一起上传,最少上传1张，最多3张</span>
                    </el-form-item>
                </el-form>
                <div class="import-bottom">
                    <el-button>取 消</el-button>
                    <el-button type="primary" @click="submitForm()">保存并提交</el-button>
                </div>
            </div>
        </el-dialog>
        <!--车辆信息-->
        <!--<carInfo :visible.sync="carInfo" :pkId="carInfoPkId"></carInfo>-->
        <!--司机信息-->
        <DriverInfo :visible.sync="driverInfo" :pkId="driverInfoPkId" v-on:ListenChild="ShowChild"></DriverInfo>
    </div>
</template>

<script>
    import DriverInfo from './DriverInfo'
    import carInfo from './CarInfo'
    export default {
        components:{
            'DriverInfo':DriverInfo
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            pkId: {
                type: String,
                default: ""
            }

        },
        inject: ['reload'],
        data() {
            return{
                action: this.common.CONSTANT.UPLOADIMGPATH + 'recognizeImage',//上传图片地址
                driverInfo:false,
                driverInfoPkId:'',
                uploadEndorsementForm:{},
                uploadEndorsementRules:{},
                imageUrl: '',

                driverId: "", //选定司机
                driverName: "",

                correction_employer1_imageUrl: "",
                correction_employer2_imageUrl: "",
                correction_employer3_imageUrl: "",

                correction_employer1_imageUrl_type: "",
                correction_employer2_imageUrl_type: "",
                correction_employer3_imageUrl_type: "",

                correction_employer1_imageUrl_name: "",
                correction_employer2_imageUrl_name: "",
                correction_employer3_imageUrl_name: "",
            }
        },
        methods:{

            ShowChild: function (data) {
                this.driverId = data.driverId;
                this.driverName = data.driverUsername;
                //  console.log("driverUsername:" + data.driverUsername)
            },
            submitForm(){
                this.$refs.uploadEndorsementForm.validate((valid) => {
                    if (valid) {
                        let that = this;
                        let data = new FormData();
                        let imgdata = new FormData();
                        let imgDataList = [];
                        imgDataList.push(
                            {
                                imageName: this['correction_employer1_imageUrl_name'],
                                imagePath: this['correction_employer1_imageUrl'],
                                type: this['correction_employer1_imageUrl_type'],
                                imageStatus: 0,
                                imageMark: 'correction_employer1'
                            }
                        )
                        imgDataList.push(
                            {
                                imageName: this['correction_employer2_imageUrl_name'],
                                imagePath: this['correction_employer2_imageUrl'],
                                type: this['correction_employer2_imageUrl_type'],
                                imageStatus: 0,
                                imageMark: 'correction_employer2'
                            }
                        )
                        imgDataList.push(
                            {
                                imageName: this['correction_employer3_imageUrl_name'],
                                imagePath: this['correction_employer3_imageUrl'],
                                type: this['correction_employer3_imageUrl_type'],
                                imageStatus: 0,
                                imageMark: 'correction_employer3'
                            }
                        )
                        this.uploadEndorsementForm.insuranceId=this.pkId
                        data = JSON.stringify(that.uploadEndorsementForm);
                        imgdata = JSON.stringify(imgDataList);

                        that.$post("insuranceManage/saveLtdCorrectionEmployer",
                            {
                                "data": "{ltdCorrectionEmployer:" + data + "}",
                                "imgDataList": imgdata,
                                "driverId": that.driverId
                            }).then(function (response) {
                            if (response.code == 0) {
                                alert(response.msg)
                            } else if (response.code == 1) {
                                that.$message({
                                    type: 'success',
                                    message: response.msg
                                });
                                that.reload();
                            }
                        })
                    }
                })

            },

            /*************图片处理----start************/
            handleAvatarSuccess(res, file) {
                let data = JSON.parse(res.data);
                let imageType = data['resultData']['imageType'];
                let imageTypeValue = data['resultData']['imageTypeValue'];
                let filePath = data['resultData']['filePath'];
                let imageUrl = imageType + "_imageUrl";
                let imageUrlType = imageUrl + "_type";
                let imageUrlName = imageUrl + "_name";
                this[imageUrl] = filePath;
                this[imageUrlType] = imageTypeValue;
                this[imageUrlName] = file.name;
                //this.addHeadstockForm[imageUrl]=filePath;

            },
            requestUpload(obj) {
                obj.companyId = this.common.fetchData("company").pkId;
                this.common.uploadImgFun(obj, this);
            },
            closeModal: function () {
                this.$emit('update:visible', false)
            }
        },
    }
</script>

<style scoped>

</style>
