<template>
    <div>
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" :visible.sync="visible" :officeDetailsPkId="pkId" :before-close="closeModal" title="办事处详情" center>
            <div class="capacity-pop-in">
                <el-form :model="officeDetailsForm" :rules="officeDetailsRules" ref="officeDetailsForm" label-width="130px" class="demo-ruleForm">
                    <h2 class="info-title">基本信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="办事处名称:" prop="">
                            {{detailInfo.name}}
                        </el-form-item>
                        <el-form-item label="办事处简称:" prop="">
                            {{detailInfo.shortName}}
                        </el-form-item>
                        <el-form-item label="办事处地址:" prop="">
                            {{detailInfo.address}}
                        </el-form-item>
                        <el-form-item label="联系电话:" prop="">
                            {{detailInfo.phone}}
                        </el-form-item>
                        <el-form-item class="required_flag" label="办公场地照片:" prop="">
                            <img class="infoImg" :src="driverDetailsInfoImg[0]" alt="">
                        </el-form-item>
                    </div>
                    <h2 class="info-title">办事处联系人</h2>
                    <div class="info-item clear">
                        <el-form-item label="联系人:" prop="">
                            {{detailInfo.contactName}}
                        </el-form-item>
                        <el-form-item label="身份证号码:" prop="">
                            {{detailInfo.contactCard}}
                        </el-form-item>
                        <el-form-item label="联系电话:" prop="">
                            {{detailInfo.contactPhone}}
                        </el-form-item>
                        <el-form-item label="联系邮箱:" prop="">
                            {{detailInfo.contactMail}}
                        </el-form-item>
                    </div>
                </el-form>
                <div class="import-bottom">
                    <el-button type="primary" @click="closeModal">返回列表</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
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
                officeDetailsForm: {},
                officeDetailsRules: {

                },
                detailInfo:{},
                driverDetailsInfoImg:[],
            }
        },
        methods:{
            closeModal: function () {
                this.$emit('update:visible', false)
            }
        },
        watch: {
            pkId: function () {
                let that = this;
                this.AgencyPkId = that.pkId;
                that.$get("agency/getAgencyById", {"pkId": that.pkId}).then(function (response) {
                    if (response.resultData.agency != null) {
                        that.detailInfo = response.resultData.agency;
                        that.driverDetailsInfoImg[0] = that.common.CONSTANT.imagePrefix + response.resultData.agency.agencyImg;
                        // console.error(that.common.CONSTANT.imagePrefix+image.imagePath+"-----")

                    }

                })
            }
        }

    }
</script>

<style scoped>

</style>
