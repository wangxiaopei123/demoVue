<template>
    <div>
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" :before-close="closeModal" :endorsementDetailsPkId="pkId" :visible.sync="visible" :insuranceId="insurancePkId" title="批单详情" width="560px" @close="closeModal" center>
            <div class="capacity-pop-in" style="padding-right: 12px;">
                <el-form :model="endorsementDetailsForm" :rules="endorsementDetailsRules" ref="endorsementDetailsForm" label-width="110px" class="demo-ruleForm">
                    <el-collapse class="endorsement" v-model="activeName" accordion>
                        <el-collapse-item :key="'cor'+index" v-for="(item,index) in correctionList"
                                          :title="item.ltdCorrectionCarrier.name" :name="index"
                                          style="border-right: none">
                            <el-form-item label="车辆清单：" prop="">

                                <span style="width: 50%;" class="ellipsis">{{item.insuranceCarrierCarList.flatMap(t => t.headCarNo).join('/').length > 24 ? item.insuranceCarrierCarList.flatMap(t => t.headCarNo).join('/').substr(0,24) + '...' : item.insuranceCarrierCarList.flatMap(t => t.headCarNo).join('/')}}</span>
                                <span @click="detailCar(index)" style="color: #2d8cf0;cursor: pointer;">详情</span>
                            </el-form-item>
                            <el-form-item label="批单变更说明：" prop="">
                                {{item.ltdCorrectionCarrier.changeDesc}}
                            </el-form-item>
                            <el-form-item label="批单照片：" prop="">
                                <img class="imgSet" :src="common.CONSTANT.imagePrefix +img.imagePath" alt="" v-for="(img,index) in item.companyImgList" :key="'img'+index">
                            </el-form-item>
                        </el-collapse-item>
                    </el-collapse>
                </el-form>
                <div class="import-bottom" style="padding-top: 0;border-top: 0;">
                    <el-button type="primary" @click="closeModal">确 定</el-button>
                </div>
            </div>
        </el-dialog>
        <!--车辆信息-->
        <carInfo :visible.sync="carInfo" :pkId="carInfoPkId" :view="detailView"></carInfo>
    </div>
</template>

<script>
    import carInfo from './CarInfo'
    export default {
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
            }

        },
        data() {
            return{
                carListView: '',
                carList: [],
                detailView: true,
                carInfoPkId: '',
                carInfo:false,
                activeName: 0,
                endorsementDetailsForm:{},
                endorsementDetailsRules:{},
                correctionList: [],
                correctionCarList: []
            }
        },
        methods:{
            closeModal: function () {
                this.$emit('update:visible', false)
            },
            initCorrectionData() {
                let that = this;
                this.$post("insuranceManage/correctionList", {"insuranceId":this.insurancePkId}).then(function (response) {
                    if (response.code == 1) {
                        that.correctionList = response.data;
                    } else {
                        that.$message.error(response.msg)
                    }
                }).catch(error => {
                    console.log("error", error);
                    that.$message.error("数据请求异常")
                });
            },
            detailCar(index) {
                this.carList = this.correctionList[index]['insuranceCarrierCarList'];
                this.carInfo = true;
            }

        },
        watch: {
            insurancePkId: function () {
                if (this.insurancePkId && this.visible) {
                    this.initCorrectionData();
                }
            }
        }
    }
</script>

<style scoped>

</style>
