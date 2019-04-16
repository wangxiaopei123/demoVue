<template>
    <div>
        <el-dialog class="capacity-pop capacity-line capacity-pop-big" title="更新保险信息" :visible.sync="visible" width="74%" center
                   :before-close="closeRescueInsur">
            <div class="capacity-pop-in">
                <el-form :model="updateInsurForm" :rules="updateInsurRules" ref="updateInsurForm" label-width="120px" class="demo-ruleForm">
                    <el-input v-model="updateInsurForm.pkId" type="hidden"></el-input>
                    <h2 class="info-title">车辆保险信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="交强险保险品牌" prop="ctaliType">
                            <el-select v-model="updateInsurForm.ctaliType">
                                <el-option v-for="item in ctaliTypes"
                                           :key="item.value"
                                           :label="item.name"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="交强险保险单号" prop="ctaliNo">
                            <el-input v-model="updateInsurForm.ctaliNo"></el-input>
                        </el-form-item>
                        <el-form-item class="termOfValidity" label="交强险有效期" prop="ctaliStartTime">
                            <el-form-item>
                                <el-date-picker
                                        type="date" v-model="updateInsurForm.ctaliStartTime"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <span>至</span>
                            <el-form-item>
                                <el-date-picker
                                        type="date" v-model="updateInsurForm.ctaliEndTime"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="商业险保险品牌" prop="ciType">
                            <el-select v-model="updateInsurForm.ciType">
                                <el-option v-for="item in ctaliTypes"
                                           :key="item.value"
                                           :label="item.name"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商业险保险单号" prop="ciNo">
                            <el-input v-model="updateInsurForm.ciNo"></el-input>
                        </el-form-item>
                        <el-form-item class="termOfValidity" label="商业险有效期" prop="ciStartTime">
                            <el-form-item>
                                <el-date-picker v-model="updateInsurForm.ciStartTime"
                                                type="date"
                                                placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <span>至</span>
                            <el-form-item>
                                <el-date-picker v-model="updateInsurForm.ciEndTime"
                                                type="date"
                                                placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="保险单照片" prop="" class="required_flag">
                            <div class="upload_box">
                                <span class="tit_tit">交强险保险单</span>
                                <el-upload
                                        class="avatar-uploader"
                                        :action="action"
                                        name="traffic_insurance"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="updateSuccess"
                                        :before-upload="common.beforeAvatarUpload">
                                    <img v-if="updateInsurForm.traffic_insurance_imageUrl" :src="updateInsurForm.traffic_insurance_imageUrl"
                                         :imageType="updateInsurForm.traffic_insurance_imageUrl_type"
                                         :imgName="updateInsurForm.traffic_insurance_imageUrl_name"
                                         class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg">&nbsp;</div>
                            </div>
                            <div class="upload_box">
                                <span class="tit_tit">商业险保险单</span>
                                <el-upload
                                        class="avatar-uploader"
                                        name="commercial_insurance"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="updateSuccess"
                                        :before-upload="common.beforeAvatarUpload">
                                    <img v-if="updateInsurForm.commercial_insurance_imageUrl" :src="updateInsurForm.commercial_insurance_imageUrl"
                                         :imageType="updateInsurForm.commercial_insurance_imageUrl_type"
                                         :imgName="updateInsurForm.commercial_insurance_imageUrl_name"
                                         class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg">&nbsp;</div>
                            </div>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="import-bottom">
                    <el-button @click="closeRescueInsur">取 消</el-button>
                    <el-button type="primary" @click="submitInsurForm">保 存</el-button>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>

    export default {
        name: "UpdateCarRescueInsur",
        inject:["reload"],
        data() {
            return {
                imgSrc: require("../../../../images/register/imgTest.jpg"),
                companyId: '',
                imgObjectList: [], //图片缓存
                updateInsurVisible:false,//更新保险
                updateInsurForm:{
                    traffic_insurance_imageUrl: '', //交强险
                    traffic_insurance_imageUrl_type: '',
                    traffic_insurance_imageUrl_name: '',
                    commercial_insurance_imageUrl: '', //商业险
                    commercial_insurance_imageUrl_type: '',
                    commercial_insurance_imageUrl_name: '',
                    transport_license_imageUrl: '',
                    transport_license_imageUrl_type: '',
                    transport_license_imageUrl_name: '',
                    ctaliType:'',
                    ctaliNo:'',
                    ctaliStartTime:'',
                    ctaliEndTime:'',
                    ciType:'',
                    ciNo:'',
                    ciStartTime:'',
                    ciEndTime:''
                },
                updateInsurRules:{
                    ctaliType: {required: true, message: '此项不能为空', trigger: 'change'},
                    ctaliNo: {required: true, message: '此项不能为空', trigger: 'blur'},
                    ctaliStartTime: {type: 'date', required: true, message: '请选择日期', trigger: 'change'},
                    ctaliEndTime: {type: 'date', required: true, message: '请选择日期', trigger: 'change'},
                    ciType: {required: true, message: '此项不能为空', trigger: 'change'},
                    ciNo: {required: true, message: '此项不能为空', trigger: 'blur'},
                    ciStartTime: {type: 'date', required: true, message: '请选择日期', trigger: 'change'},
                    ciEndTime: {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                },

                action: this.common.CONSTANT.UPLOADIMGPATH + 'recognizeImage',//上传图片地址
            }
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            updateInsureId: {
                default: ""
            },
            ctaliTypes:{
                default:[]
            },
            carDialogTitle :{
                default: ""
            }

        },
        created: function () {
            this.carDetailsInfoData=this.carDetailsInfoMobel;
            let company = this.common.fetchData("company");
            this.companyId = company['pkId'];
        },
        methods: {
            formatInsurance(type) { //格式化保险字段
                var typeDesc = "";
                this.ctaliTypes.forEach(function (cType) {
                    if (type == cType.value) {
                        typeDesc = cType.name;
                    }
                });
                return typeDesc;
            },
            requestUpload(obj) {
                let that = this;
                obj.companyId = that.companyId;
                this.common.uploadImgFun(obj, this);
            },
            handleAvatarSuccess(res, file) {
                let that = this;
                let data = JSON.parse(res.data);
                //console.log("data-->"+data);
                let imageType = data['resultData']['imageType'];
                let imageTypeValue = data['resultData']['imageTypeValue'];
                let filePath = data['resultData']['filePath'];
                let imageUrl = imageType + "_imageUrl";
                let imageUrlType = imageUrl + "_type";
                let imageUrlName = imageUrl + "_name";
                let driverForm = {};
                driverForm[imageUrl] = filePath;
                driverForm[imageUrlType] = imageTypeValue;
                driverForm[imageUrlName] = file.name;
                that.updateInsurForm = Object.assign({}, that.updateInsurForm, driverForm);

            },
            updateSuccess(response, file) {
                let that = this;
                let data = JSON.parse(response.data);
                let imageType = data['resultData']['imageType'];
                let imageTypeValue = data['resultData']['imageTypeValue'];
                let filePath = data['resultData']['filePath'];
                let imageUrl = imageType + "_imageUrl";
                let imageUrlType = imageUrl + "_type";
                let imageUrlName = imageUrl + "_name";
                let uploadForm = {};
                uploadForm[imageUrl] = filePath;
                uploadForm[imageUrlType] = imageTypeValue;
                uploadForm[imageUrlName] = file.name;
                that.updateInsurForm = Object.assign({}, that.updateInsurForm, uploadForm);

            },
            //获取添加的图片信息
            getInsureRescueImgs: function (formObj, imgObjList) {
                let companyImgList = [];
                let that = this;
                let imgTypes = ["traffic_insurance", "commercial_insurance"];
                imgTypes.forEach(function (key, index) {
                    if (formObj[key + '_imageUrl']) { //图片url
                        companyImgList.push(
                            {
                                pkId: that.findImagePkId(imgObjList, formObj[key + '_imageUrl']),
                                imageName: formObj[key + '_imageUrl_name'],
                                imagePath: formObj[key + '_imageUrl'],
                                type: formObj[key + '_imageUrl_type'],
                                imageMark: key
                            }
                        )
                    }
                });
                return companyImgList;
            },
            //查找图片的主键id
            findImagePkId(driverData, imageUrl) {
                let pkId = '';
                let that = this;
                if (driverData) {
                    let data = driverData.find(t =>
                        imageUrl.indexOf(t.imagePath) != -1
                    );
                    if (data) {
                        pkId = data.pkId;
                    }

                }

                return pkId;
            },
            /**
             *
             * @param form 赋值form
             * @param imgDataList 图片集合
             * @param imgPrefix 图片前缀
             */
            pottingRescueImgs(form, imgDataList, imgPrefix) { //把后台返回图片组装
                let imgTypes = ["traffic_insurance", "commercial_insurance"];
                if (imgDataList && imgDataList.length > 0) {
                    imgDataList.forEach(item => {
                        let filePath = imgPrefix + "/" + item.imagePath;
                        let srcPath = item.imageMark + "_imageUrl";
                        let imageType = srcPath + "_type";
                        let imgName = srcPath + "_name";
                        if(imgTypes.indexOf(item.imageMark)!=-1){
                            form[srcPath] = filePath;
                            form[imageType] = item.type;
                            form[imgName] = item.imageName;
                        }
                    });
                }
            },
            submitInsurForm(){ //保存保险信息
                let that = this;
                this.$refs.updateInsurForm.validate((valid) => {
                    if (valid) {
                        var params={};
                        let form=that.updateInsurForm;
                        this.$refs['updateInsurForm'].clearValidate();//清空校验
                        let ltdCarRescue={};
                        ltdCarRescue.ctaliType = form.ctaliType;
                        ltdCarRescue.ctaliNo = form.ctaliNo;
                        ltdCarRescue.ctaliStartTime = form.ctaliStartTime;
                        ltdCarRescue.ctaliEndTime = form.ctaliEndTime;
                        ltdCarRescue.ciType = form.ciType;
                        ltdCarRescue.ciNo = form.ciNo;
                        ltdCarRescue.ciStartTime = form.ciStartTime;
                        ltdCarRescue.ciEndTime = form.ciEndTime;
                        ltdCarRescue.companyId=form.compnayId;
                        ltdCarRescue.pkId=form.pkId;
                        let company = that.common.fetchData("company");
                        ltdCarRescue.companyId=company['pkId'];
                        params.ltdCarRescue = ltdCarRescue;
                        params.submitType = 1; //1次提交

                        let companyImgList = that.getInsureRescueImgs(that.updateInsurForm, that.imgObjectList);
                        if(companyImgList==null || companyImgList.length!=2){
                            that.$message.error("请上传保险单照片");
                            return;
                        }
                        params.companyImgList = companyImgList;

                        var data = {
                            data: JSON.stringify(params)
                        }

                        that.$post("ltdCarRescue/updateCarInfo", data).then((response) => {
                            var data = response.response;
                            if (response.code == 0) {
                                that.$message.error(response.msg);
                            } else {
                                var errTypes = {2: "车辆信息", 3: "交强险保险单号", 4: "商业险保险单号"};
                                if (data && errTypes[response.code]) {
                                    var errMsg = "当前添加msg已存在，无法需重复添加".replace("msg", errTypes[response.code]);
                                    that.$message.error(errMsg);
                                } else if (response.code == 1) {
                                    that.$message.info(response.msg);
                                    that.reload();
                                } else {
                                    that.$message.error(response.msg);
                                }

                            }

                        }).catch(() => {
                            that.$message.error('消息保存失败');
                        });

                    } else {
                        console.log('valid error submit!!');
                        return false;
                    }
                });
            },
            //添加车辆取消操作
            closeRescueInsur() {
                let that=this;
                that.updateInsurVisible = false;

                this.updateInsurForm = {};
                this.imgObjectList = [];

                let refAddCarRescueForm = this.$refs['updateInsurForm'];
                if (refAddCarRescueForm) {
                    refAddCarRescueForm.resetFields();
                    refAddCarRescueForm.clearValidate();
                }
                this.$emit('update:visible', false);
                this.reload();
            },

        },

        watch: {
            updateInsureId: function () {
                let that=this;
                var data={companyId:this.companyId,pkId:that.updateInsureId};
                that.$post("ltdCarRescue/queryCarRescue",data).then((response) => {
                    var data=response.response;
                    if (response.code != 1 ) {
                        that.$message.error(response.msg);
                    } else {
                        let form=that.updateInsurForm;
                        let ltdCarRescue=data.ltdCarRescue;
                        form.ctaliType = ltdCarRescue.ctaliType;
                        form.ctaliNo = ltdCarRescue.ctaliNo;
                        form.ctaliStartTime = ltdCarRescue.ctaliStartTime;
                        form.ctaliEndTime = ltdCarRescue.ctaliEndTime;
                        form.ciType = ltdCarRescue.ciType;
                        form.ciNo = ltdCarRescue.ciNo;
                        form.ciStartTime = ltdCarRescue.ciStartTime;
                        form.ciEndTime = ltdCarRescue.ciEndTime;
                        form.companyId=ltdCarRescue.companyId;
                        that.imgObjectList=data.companyImgList;
                        form.pkId=ltdCarRescue.pkId;
                        that.pottingRescueImgs(that.updateInsurForm,data.companyImgList,data.imgPrefix);
                        // console.log(pottingRescueImgs);

                    }
                    that.updateInsurVisible = that.visible;
                }).catch(() => {
                    that.$message.error('获取保险信息失败.');
                    that.updateInsurVisible = that.visible;
                });
            }
        }

    }
</script>

<style scoped>

</style>
