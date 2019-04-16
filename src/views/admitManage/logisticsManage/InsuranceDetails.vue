<template>
    <!--保险详情-->
    <div>
        <el-dialog  class="capacity-pop capacity-pop-big capacity-line" :before-close="closeModal" :insuranceDetailsPkId="pkId" :visible.sync="visible" title="保险详情"  center>
        <div class="capacity-pop-in" v-loading="loading">
            <el-form :model="insuranceDetailsForm" :rules="insuranceDetailsRules" ref="insuranceDetailsForm" label-width="110px" class="demo-ruleForm">
                <h2 class="info-title">基本信息</h2>
                <div class="info-item clear">
                    <el-form-item label="保险品牌：" prop="">
                        {{formatInsurance(insuranceDetailsForm.brand)}}
                    </el-form-item>
                    <el-form-item label="保险单号：" prop="">
                        {{insuranceDetailsForm.policyNo}}
                    </el-form-item>
                </div>
                <el-form-item label="保障范围：" prop="">
                    {{insuranceDetailsForm.coverage}}
                </el-form-item>
                <div class="info-item clear">
                    <el-form-item label="投保方式：" prop="">
                        {{formatInsureMode(insuranceDetailsForm.insureMode)}}
                    </el-form-item>
                    <el-form-item label="车辆清单：" prop="">
                        <span class="ellipsis">{{carListView}}</span>
                        <span @click="carInfo = true" style="color: #2d8cf0;cursor: pointer;">详情</span>
                    </el-form-item>
                    <el-form-item label="货运总价值：" prop="">
                        {{insuranceDetailsForm.freightCost}}元
                    </el-form-item>
                    <el-form-item class="termOfValidity" label="有效期：">
                        {{common.formatterDate(null, null, insuranceDetailsForm.startTime)}} 至 {{common.formatterDate(null, null, insuranceDetailsForm.endTime)}}
                    </el-form-item>
                    <el-form-item label="保单照片：" prop="">
                        <img class="imgSet" v-if="insuranceDetailsForm.policy_image_imageUrl" :src="insuranceDetailsForm.policy_image_imageUrl" alt="">
                    </el-form-item>
                    <el-form-item label="保险批单：" prop="">
                        <img class="imgSet" v-if="insuranceDetailsForm.correction_image1_imageUrl" :src="insuranceDetailsForm.correction_image1_imageUrl" alt="">
                        <img class="imgSet" v-if="insuranceDetailsForm.correction_image2_imageUrl" :src="insuranceDetailsForm.correction_image2_imageUrl" alt="">
                        <img class="imgSet" v-if="insuranceDetailsForm.correction_image3_imageUrl" :src="insuranceDetailsForm.correction_image3_imageUrl" alt="">
                    </el-form-item>
                </div>
                <h2 class="info-title">累计赔付额</h2>
                <div class="info-item clear">
                    <!--<el-form-item label="单台大车：">-->
                        <!--{{insuranceDetailsForm.claimsLevel}}万元-->
                    <!--</el-form-item>-->
                    <el-form-item label="单次事故：" prop="">
                        {{insuranceDetailsForm.claimsLevel ? insuranceDetailsForm.claimsLevel : insuranceDetailsForm.claimsFee}}万元
                    </el-form-item>
                    <el-form-item class="label_other" label="单台轿车价值限额：" prop="">
                        {{insuranceDetailsForm.carPreLimit}}万元
                    </el-form-item>
                </div>
            </el-form>
            <div class="import-bottom">
                <el-button type="primary" @click="closeModal">确 认</el-button>
            </div>
        </div>
    </el-dialog>
        <!--车辆信息-->
        <CarInfo :visible.sync="carInfo" :pkId="carInfoPkId" :view="detailView"></CarInfo>
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

        },
        data() {
            return{
                detailView: true,
                loading: false,
                carList: '',
                carListView: '',
                carInfo:false,
                carInfoPkId:'',
                insuranceDetailsForm:{},
                insuranceDetailsRules:{},
                ctaliTypes:[], //保险种类
                cscopeTypes:[],//保障范围
            }
        },
        created: function() {
        },
        methods:{
            formatInsureMode(type) {
                switch (type) {
                    case '1': return '按全年货运总价值';
                    case '2': return '按单台板车购买';
                }
            },
            formatInsurance(type){ //格式化保险字段
                let typeDesc="";
                this.$parent.ctaliTypes.forEach(function(cType){
                    if(type==cType.value){
                        typeDesc=cType.name;
                    }
                });
                return typeDesc;
            },
            formatCoverage(types){
                if (types) {
                    let that = this;
                    let typeDesc="";
                    for (let i=0;i<types.length;i++) {
                        that.$parent.cscopeTypes.forEach(function(cType){
                            if(types[i] == cType.value){
                                typeDesc += cType.name+'、';
                            }
                        });
                    }
                    return typeDesc;
                } else {
                    return '';
                }
            },
            closeModal: function () {
                this.$emit('update:visible', false)
            },
            insuranceDetail(pkId) {
                let that = this;
                that.loading = true;
                that.carList = '';
                that.carListView = '';
                that.insuranceDetailsForm = {};
                this.$post("insuranceManage/carrierInsuranceDetail", {"pkId":pkId}).then(function (response) {
                    if (response) {
                        let insuranceCarrier = response['resultData']['insuranceCarrier'];
                        let coverage = insuranceCarrier['ltdInsuranceCarrier']['coverage'];
                        that.insuranceDetailsForm = insuranceCarrier['ltdInsuranceCarrier'];
                        that.insuranceDetailsForm.coverage = that.formatCoverage(coverage.split(','));
                        that.insuranceDetailsForm.insureMode = insuranceCarrier['ltdInsuranceCarrier']['insureMode']+'';

                        let companyImgList = insuranceCarrier['companyImgList'];
                        if (companyImgList && companyImgList.length > 0) {
                            companyImgList.forEach(function (image) {
                                let imageType = image['imageMark'];
                                let imagePath = imageType + "_imageUrl";
                                that['insuranceDetailsForm'][imagePath] = that.common.CONSTANT.imagePrefix + image['imagePath'];
                            })
                        }
                        let insuranceCarrierCarList = insuranceCarrier['insuranceCarrierCarList'];
                        if (insuranceCarrierCarList && insuranceCarrierCarList.length > 0) {
                            insuranceCarrierCarList.forEach(function(car) {
                                that.carListView += car.headCarNo+"/";
                            });
                            that.carListView = that.carListView.length > 24 ? that.carListView.substr(0,24) + '...' : that.carListView;
                            that.carList = insuranceCarrierCarList;
                        }
                    } else {
                        that.$message.error("数据请求异常")
                    }
                    that.loading = false;
                }).catch(error => {
                    that.loading = false;
                    console.log("error", error);
                    that.$message.error("数据请求异常")
                });
            }
        },
        watch: {
            pkId: function () {
                if (this.pkId) {
                    this.insuranceDetail(this.pkId);
                }
            }
        }
    }
</script>

<style scoped>

</style>
