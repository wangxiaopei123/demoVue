<template>
    <div>
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" :visible.sync="visible" :addCargoInsurancePkId="pkId"  :before-close="closeModal" :title="addCargoInsuranceTitle" @close="reload()" center>
            <div class="capacity-pop-in">
                <el-form :model="addCargoInsuranceForm" :rules="addCargoInsuranceRules" ref="addCargoInsuranceForm" label-width="110px" class="demo-ruleForm">
                    <div class="manage-tip manage-error" v-if="auditAdvice.length > 0">
                        <div class="manage-tip-txt">
                            <b>审核失败原因如下：</b>
                            1.填写的信息与保单信息不符；2.保单照片模糊；
                        </div>
                    </div>
                    <h2 class="info-title">基本信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="保险品牌" prop="brand">
                            <el-select v-model="addCargoInsuranceForm.brand">
                                <el-option
                                        v-for="item in ctaliTypes"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="保险单号" prop="policyNo">
                            <el-input v-model="addCargoInsuranceForm.policyNo" placeholder="请输入保险单号"></el-input>
                        </el-form-item>
                    </div>
                        <el-form-item label="保障范围" prop="coverage">
                            <el-checkbox-group style="line-height: 30px;margin-top: 6px;"  v-model="addCargoInsuranceForm.coverage">
                                <el-checkbox label=1 name="type">第三者交通事故损失</el-checkbox>
                                <el-checkbox label=2 name="type">装卸车剐蹭</el-checkbox>
                                <el-checkbox label=3 name="type">质损降价</el-checkbox>
                                <el-checkbox label=4 name="type">火灾</el-checkbox>
                                <el-checkbox label=5 name="type">爆炸</el-checkbox>
                                <el-checkbox label=6 name="type">冰雹</el-checkbox>
                                <el-checkbox label=7 name="type">暴雨</el-checkbox>
                                <el-checkbox label=8 name="type">运输过程</el-checkbox>
                                <el-checkbox label=9 name="type">其他天灾/事故/运输过程</el-checkbox>
                            </el-checkbox-group>
                            <el-input v-if="addCargoInsuranceForm.coverage.indexOf('9') != -1" style="width: 98%;" type="textarea" v-model="addCargoInsuranceForm.coverageDesc"></el-input>
                        </el-form-item>
                    <div class="info-item clear">
                        <el-form-item label="投保方式" prop="insureMode">
                            <el-radio-group v-model="addCargoInsuranceForm.insureMode" @change="insureModeRadio">
                                <el-radio label=1>按全年货运总价值</el-radio>
                                <el-radio label=2>按单台板车购买</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="车辆清单" prop="carListView" class="required_flag">
                            <span class="ellipsis" v-model="addCargoInsuranceForm.carListView">{{carListView}}</span>
                            <span @click="addCarInfo" style="color: #2d8cf0;cursor: pointer;">添加车辆</span>
                        </el-form-item>
                        <el-form-item label="货运总价值" prop="freightCost">
                            <el-input maxlength="10" :disabled="addCargoInsuranceForm.insureMode == 2" style="width: 93%;" v-model="addCargoInsuranceForm.freightCost"></el-input>&nbsp;元
                        </el-form-item>
                        <el-form-item class="termOfValidity" label="有效期" prop="startTime">
                            <el-form-item>
                                <el-date-picker
                                        v-model="addCargoInsuranceForm.startTime"
                                        prop=""
                                        type="date"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <span>至</span>
                            <el-form-item>
                                <el-date-picker
                                        v-model="addCargoInsuranceForm.endTime"
                                        prop=""
                                        type="date"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item class="required_flag" label="保单照片" prop="policy_image_imageUrl">
                            <div class="upload_box">
                                <el-upload
                                        name="policy_image"
                                        class="avatar-uploader"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="common.beforeAvatarUpload">
                                    <img v-model="policy_image_imageUrl"
                                         v-if="policy_image_imageUrl" :src="policy_image_imageUrl"
                                         :imageType="policy_image_imageUrl_type"
                                         :imgName="policy_image_imageUrl_name" :imagePkId="policy_image_imageUrl_pkId" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </el-form-item>
                        <el-form-item label="保险批单" prop="">
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
                    </div>
                    <h2 class="info-title">累计赔付额</h2>
                    <div class="info-item clear" >
                        <el-form-item label="单次事故" prop="claimsLevel" class="required_flag">
                            <el-select v-model="addCargoInsuranceForm.claimsLevel" :disabled="claimsFeeRadio" style="height: 30px">
                                <el-option
                                        v-for="item in claimsLevels"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label-width="0" prop="claimsFee">
                            <el-checkbox label="其他金额" style="margin-right: 10px;" v-model="claimsFeeRadio" @change="claimsFeeRadioChange"></el-checkbox>
                            <el-input :disabled="!claimsFeeRadio" v-model="addCargoInsuranceForm.claimsFee" style="width: 68%;" placeholder="请输入单次事故累计赔付额"></el-input>&nbsp;万元
                        </el-form-item>
                        <el-form-item class="label_other" label="单台轿车价值限额" prop="carPreLimit">
                            <el-input v-model="addCargoInsuranceForm.carPreLimit" style="width: 88%;"></el-input>&nbsp;万元
                            <span style="display: block;font-size: 12px;color: #e6a23c;line-height: 16px;">若“无”，填写为“0”即可</span>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="import-bottom">
                    <el-button @click="closeModal">取 消</el-button>
                    <el-button type="primary" @click="saveCargoInsurance(1)">保 存</el-button>
                    <el-button type="primary" @click="saveCargoInsurance(2)">保存并提交</el-button>
                </div>
            </div>
        </el-dialog>
        <!--车辆信息-->
        <CarInfo :visible.sync="carInfo" :pkId="carInfoPkId"  @getBindCarList="getBindCarList($event)"></CarInfo>
    </div>
</template>

<script>
    import CarInfo from './CarInfo'
    export default {
        inject:["reload"],
        components:{
            'CarInfo':CarInfo
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
            ,addCargoInsuranceTitle: {
                type: String,
                default: ""
            }

        },
        data() {
            // 保单号重复校验
            let validPolicyNo = (rule, value, callback) => {
                if (this.oldPolicyNo === value) {
                    callback();
                } else {
                    this.$get("insuranceManage/validPolicyNo", {"policyNo": value}).then(function (response) {
                        if (response.code == 1) {
                            if (response.flag) {
                                callback(new Error('保单号已存在'));
                            } else {
                                callback();
                            }
                        } else {
                            callback(new Error(response.msg));
                        }
                    });
                }
            };
            let validCoverage = (rule, value, callback) => {
                if (value.indexOf('9') != -1) {
                    if (!this.addCargoInsuranceForm.coverageDesc.trim()) {
                        return callback(new Error('请填写其它保障范围'));
                    }
                }
                callback();
            };

            //单次事故校验
            let validClaimsLevel = (rule, value, callback) => {
                if (!this.claimsFeeRadio) {
                    if (!this.addCargoInsuranceForm.claimsLevel) {
                        return callback(new Error('请填写单次事故金额'));
                    }
                }
                callback();
            };
            let validClaimsFee = (rule, value, callback) => {
                if (this.claimsFeeRadio) {
                    if (!this.addCargoInsuranceForm.claimsFee) {
                        return callback(new Error('请填写其它金额'));
                    }
                }
                callback();
            };

            let validCarList = (rule, value, callback) => {
                if (!this.carListView) {
                    return callback(new Error('请选择车辆'));
                }
                callback();
            };

            let validTime = (rule, value, callback) => {
                if (!this.addCargoInsuranceForm.startTime || !this.addCargoInsuranceForm.endTime) {
                    return callback(new Error('请选择有效期'));
                }
                if (this.addCargoInsuranceForm.startTime > this.addCargoInsuranceForm.endTime) {
                    return callback(new Error('开始时间不能大于结束时间'));
                }
                callback();
            };

            return{
                carListView: '',
                carList: [],
                auditAdvice: '',
                claimsFeeRadio: false,
                ctaliTypes: [],
                carInfoPkId:'',
                carInfo:false,
                action: this.common.CONSTANT.UPLOADIMGPATH + 'recognizeImage',
                policy_image_imageUrl_pkId:'',
                policy_image_imageUrl:'',
                policy_image_imageUrl_type: '',
                policy_image_imageUrl_name: '',
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
                addCargoInsuranceForm: {
                    brand: '',
                    policyNo: '',
                    insureMode: '1',
                    freightCost: '',
                    coverage:[],
                    coverageDesc: '',
                    claimsFee: '',
                    carPreLimit: '',
                    claimsLevel: [100,150,200],
                },
                addCargoInsuranceRules: {},
                claimsLevels:[
                    {name:'100万',value:100},
                    {name:'150万',value:150},
                    {name:'200万',value:200},
                    {name:'250万',value:250},
                    {name:'300万',value:300},
                    {name:'350万',value:350},
                    {name:'400万',value:400},
                    {name:'450万',value:450},
                    {name:'500万',value:500},
                    {name:'550万',value:550},
                    {name:'600万',value:600},
                    {name:'650万',value:650},
                    {name:'700万',value:700},
                    {name:'750万',value:750},
                    {name:'800万',value:800},
                ],
                addCargoInsuranceRules: {
                    brand: {required: true, message: '此项不能为空', trigger: 'blur'},
                    policyNo: [
                        {required: true, message: '此项不能为空', trigger: 'blur'},
                        {min:10,max:30, message: '保单号不正确（10-30位）', trigger: 'blur'},
                        {validator: validPolicyNo, trigger: 'blur'}
                    ],
                    coverage: [
                        {required: true, message: '此项不能为空', trigger: 'blur'},
                        {validator: validCoverage, trigger: 'blur'}
                    ],
                    startTime: {validator: validTime, trigger: 'blur'},
                    carPreLimit: {required: true, message: '此项不能为空', trigger: 'blur'},
                    insureMode: {required: true, message: '此项不能为空', trigger: 'blur'},
                    carListView: {validator: validCarList, trigger: 'blur'},
                    claimsLevel: [
                        {validator: validClaimsLevel, trigger: 'blur'},
                        {max:10,message: '金额最多包含小数点后两位且不能超过10位',validator: this.common.checkDoubleNumber, trigger: 'blur'}
                    ],
                    claimsFee: [
                        {validator: validClaimsFee, trigger: 'blur'},
                        {max:10,message: '金额最多包含小数点后两位且不能超过10位',validator: this.common.checkDoubleNumber, trigger: 'blur'}
                    ],
                    freightCost: {max:10,message: '金额最多包含小数点后两位且不能超过10位',validator: this.common.checkDoubleNumber, trigger: 'blur'},

                },
                oldPolicyNo: ''
            }
        },
        created : function() {
            this.common.getBizConstants(this,"ctaliType","ctaliTypes");
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
                this.carListView = carListView.length > 24 ? carListView.substr(0,24) + '...' : carListView;
                this.addCargoInsuranceForm.carListView = this.carListView;
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
            saveCargoInsurance(type) {
                this.$refs.addCargoInsuranceForm.validate((valid) => {
                    if (valid) {
                        if (!this.policy_image_imageUrl) {
                            this.$message.info("保单照片不能为空");
                            return false;
                        }
                        let ltdInsuranceCarrier = this.addCargoInsuranceForm;
                        ltdInsuranceCarrier.coverage = ltdInsuranceCarrier.coverage.toString();
                        if (type == 2) { //提交
                            ltdInsuranceCarrier.status = 1;
                        }
                        ltdInsuranceCarrier.type = this.$parent.tabIndex; //1 货运险 2 承运人责任险
                        if (ltdInsuranceCarrier.claimsFee) {
                            ltdInsuranceCarrier.claimsLevel = '0';
                        }
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
                        let insuranceCarrierVO = {
                            ltdInsuranceCarrier: ltdInsuranceCarrier,
                            insuranceCarrierCarList: insuranceCarrierCarList,
                            companyImgList: companyImgList
                        };
                        let that = this;
                        this.$post("insuranceManage/carrierInsurance", {"data":JSON.stringify(insuranceCarrierVO)}).then(function (response) {
                            that.reload();
                        }).catch(error => {
                            console.log("error", error);
                            that.$message.error("数据请求异常")
                        });
                    }
                });
            },
            editCargoInsurance(pkId) {
                let that = this;
                this.$post("insuranceManage/carrierInsuranceDetail", {"pkId":pkId}).then(function (response) {
                    if (response) {
                        let insuranceCarrier = response['resultData']['insuranceCarrier'];
                        let coverage = insuranceCarrier['ltdInsuranceCarrier']['coverage'];
                        that.addCargoInsuranceForm = insuranceCarrier['ltdInsuranceCarrier'];
                        that.addCargoInsuranceForm.coverage = coverage.split(',');
                        that.addCargoInsuranceForm.insureMode = insuranceCarrier['ltdInsuranceCarrier']['insureMode']+'';
                        that.oldPolicyNo = insuranceCarrier['ltdInsuranceCarrier']['policyNo'];
                        if (insuranceCarrier['ltdInsuranceCarrier']['claimsFee']) {
                            that.claimsFeeRadio = true;
                            that.addCargoInsuranceForm.claimsLevel = '';
                        }
                        let companyImgList = insuranceCarrier['companyImgList'];
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
                        let insuranceCarrierCarList = insuranceCarrier['insuranceCarrierCarList'];
                        if (insuranceCarrierCarList && insuranceCarrierCarList.length > 0) {
                            insuranceCarrierCarList.forEach(function(car) {
                                that.carListView += car.headCarNo+"/";
                            });
                            that.carList = insuranceCarrierCarList;
                        }
                        that.addCargoInsuranceForm.carListView = that.carListView;
                    } else {
                        that.$message.error("数据请求异常")
                    }
                }).catch(error => {
                    console.log("error", error);
                    that.$message.error("数据请求异常")
                });
            },
            addCarInfo() {
                this.carInfo = true
            }
            ,insureModeRadio(value) {
                if (value == 2) {
                    this.addCargoInsuranceForm.freightCost = '';
                }
            }
            ,claimsFeeRadioChange(value) {
                if (value) {
                    this.addCargoInsuranceForm.claimsLevel = 0;
                } else {
                    this.addCargoInsuranceForm.claimsFee = 0;
                }
            }


        },
        watch: {
            pkId: function () {
                if (this.pkId && this.visible) {
                    this.editCargoInsurance(this.pkId);
                }
            }
        }

    }
</script>

<style scoped>

</style>
