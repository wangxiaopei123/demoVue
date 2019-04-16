<template>
    <div>
        <h2 class="manage-title">物流保险列表</h2>
        <div class="manage-tip">
            <i class="el-icon-info"></i>
            <div class="manage-tip-txt">为保证货物、雇主在运输途中，因遭受自然灾害或意外交通事故所造成的损失能够获得经济赔偿；管家需要承运商提供货运险、雇主责任险及承运人责任险保险信息，同时管家会依据这些信息评估承运商的承运能力及风险控制能力；请务必及时完成保险信息填写，避免因为未填写（即表示没有该类型保险）保险信息而无法承运，感谢您的配合！</div>
        </div>
        <div class="capacity-manage">
            <div class="car-way line-choice">
                <div class="car-way-btn">
                    <el-button type="primary" @click="addCargoInsurance = true;addCargoInsuranceTitle='新增货运险'">新增货运险</el-button>
                </div>
                <div class="car-tabs list-search-box">
                    <el-tabs type="border-card" @tab-click="switchInsurance" v-model="activeIndex">
                    <el-tab-pane label="货运险" name="0">
                        <!-- 搜索框 -->
                        <el-form label-width="96px" class="demo-ruleForm" :model="cargoForm" :rules="cargoForm" ref="cargoForm">
                            <div class="search-manage small-search small-car-search clear">
                                <div class="search-l clear">
                                    <el-form-item label="保险单号" prop="">
                                        <el-input v-model="cargoForm.policyNo" placeholder="请输入保险单号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="保险品牌" prop="" placeholder="请选择" >
                                        <el-select v-model="cargoForm.policyBrand">
                                            <el-option
                                                    v-for="item in ctaliTypes"
                                                    :key="item.value"
                                                    :label="item.name"
                                                    :value="item.value"/>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item class="search-date" label="创建时间" prop="">
                                        <el-date-picker value-format="yyyy-MM-dd" v-model="cargoForm.createStartTime" type="date" placeholder="开始日期">
                                        </el-date-picker>
                                        <span>至</span>
                                        <el-date-picker value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="cargoForm.createEndTime" type="date" placeholder="结束日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item class="search-date" label="审核时间" prop="">
                                        <el-date-picker value-format="yyyy-MM-dd" v-model="cargoForm.auditStartTime" type="date" placeholder="开始日期">
                                        </el-date-picker>
                                        <span>至</span>
                                        <el-date-picker value-format="yyyy-MM-dd" v-model="cargoForm.auditEndTime" type="date" placeholder="结束日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item  label="审核状态" prop="">
                                        <el-select v-model="cargoForm.auditStatus">
                                            <el-option
                                                    v-for="item in auditStatusList"
                                                    :key="item.value"
                                                    :label="item.name"
                                                    :value="item.value"/>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div class="search-r">
                                    <el-button type="primary" @click="searchInsurance()">搜 索</el-button>
                                    <el-button @click="resetInsurance">重 置</el-button>
                                </div>
                            </div>
                        </el-form>
                        <!--暂无信息显示-->
                        <div class="car-way-nothing" v-if="cargoInsuranceTableData.length===0">
                            <div class="car-way-no" style="top: 180px;">
                                <i class="el-icon-warning"></i>
                                <span>暂无保险信息，请先新增保险</span>
                            </div>
                            <el-table border style="width: 100%;">
                                <el-table-column width="60px" label="序号">
                                </el-table-column>
                                <el-table-column label="保险品牌">
                                </el-table-column>
                                <el-table-column label="保险单号">
                                </el-table-column>
                                <el-table-column label="车辆数量">
                                </el-table-column>
                                <el-table-column label="有效期">
                                </el-table-column>
                                <el-table-column label="审核状态">
                                </el-table-column>
                                <el-table-column label="审核时间">
                                </el-table-column>
                                <el-table-column label="创建时间">
                                </el-table-column>
                                <el-table-column label="操作">
                                </el-table-column>
                            </el-table>
                        </div>
                        <!--有数据显示的时候-->
                        <div class="car-way-table" v-else>
                            <el-table :key="Math.random()" border :data="cargoInsuranceTableData" style="width: 100%;">
                                <el-table-column width="60px" label="序号" type="index">
                                    <template slot-scope="scope">
                                        {{scope.$index+1}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="policyBrand" label="保险品牌" width="200">
                                    <template slot-scope="scope">
                                        {{formatInsurance(scope.row.policyBrand)}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="policyNo" label="保险单号" width="220">
                                    <template slot-scope="scope">
                                        <span @click="detailInsurance(scope.row.pkId)" class="car-way-blue">{{scope.row.policyNo}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="insuranceCarNum" label="车辆数量" width="100">
                                </el-table-column>
                                <el-table-column label="有效期" width="240">
                                    <template slot-scope="scope">
                                        {{common.formatterDate(null, null, scope.row.validStartTime)}}至{{common.formatterDate(null, null, scope.row.validEndTime)}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="auditStatus" label="审核状态" width="160">
                                    <template slot-scope="scope">
                                        {{formatAuditStatus(scope.row.auditStatus)}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="auditTime" label="审核时间" width="200">
                                    <template slot-scope="scope">
                                        {{common.formatterDateTime(null, null, scope.row.auditTime)}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="createTime" label="创建时间" width="200">
                                    <template slot-scope="scope">
                                        {{common.formatterDateTime(null, null, scope.row.createTime)}}
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="操作" width="280">
                                    <template slot-scope="scope" >
                                        <el-button type="text" size="small" v-if="scope.row.auditStatus==0" @click="editInsurance(scope.row.pkId)">编辑</el-button>
                                        <el-button type="text" size="small" v-if="scope.row.auditStatus==0" @click="submitInsurance(scope.row.pkId)">提交</el-button>
                                        <el-button type="text" size="small" v-if="scope.row.auditStatus!=1" @click="deleteInsurance(scope.row.pkId)">删除</el-button>
                                        <el-button type="text" size="small" v-if="scope.row.auditStatus==3 && scope.row.correctionNum == 0" @click="editInsurance(scope.row.pkId)">重新提交</el-button>
                                        <el-button type="text" size="small" v-if="scope.row.auditStatus==2" @click="uploadCorrection(scope.row.pkId)">上传批单</el-button>
                                        <el-button type="text" size="small" v-if="scope.row.auditStatus==3 && scope.row.correctionNum > 0" @click="editCorrectionView(scope.row.pkId)">修改批单</el-button>
                                        <el-button type="text" size="small" v-if="scope.row.correctionNum > 0"  @click="detailCorrection(scope.row.pkId)">批单详情</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="雇主责任险"></el-tab-pane>
                    <el-tab-pane label="承运人责任险">
                    </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
        <!--保险详情-->
        <InsuranceDetails :visible.sync="insuranceDetails" :pkId="insuranceDetailsPkId" ></InsuranceDetails>
        <!--新增货运险-->
        <AddCargoInsurance :visible.sync="addCargoInsurance" :pkId="addCargoInsurancePkId" :addCargoInsuranceTitle="addCargoInsuranceTitle" ></AddCargoInsurance>
        <!--上传批单/修改批单-->
        <UploadEndorsement :visible.sync="uploadEndorsement" :pkId="uploadEndorsementPkId" :insurancePkId="insuranceId" :addCorrectionTitle="addCorrectionTitle"></UploadEndorsement>
        <!--批单详情-->
        <EndorsementDetails :visible.sync="endorsementDetails" :pkId="endorsementDetailsPkId" :insurancePkId="insuranceId"></EndorsementDetails>
    </div>
</template>

<script>
    import InsuranceDetails from './InsuranceDetails'
    import AddCargoInsurance from './AddCargoInsurance'
    import UploadEndorsement from './UploadEndorsement'
    import EndorsementDetails from './EndorsementDetails'
    export default {
        components:{
            'InsuranceDetails':InsuranceDetails,
            'UploadEndorsement':UploadEndorsement,
            'AddCargoInsurance':AddCargoInsurance,
            'EndorsementDetails':EndorsementDetails
        },
        inject:["reload"],
        data() {
            return {
                activeIndex: '0',
                tabIndex: 1,
                addCargoInsuranceTitle:'新增货运险',
                addCorrectionTitle: '上传批单',
                cargoForm: {},
                insuranceDetails:false,
                endorsementDetails:false,
                uploadEndorsement:false,
                showCargoInsuranceTable:[], //无数据表格显示控制
                addCargoInsurance:false,
                insuranceId: '',
                addCargoInsurancePkId:'',
                insuranceDetailsPkId:'',
                uploadEndorsementPkId:'',
                endorsementDetailsPkId:'',
                cargoInsuranceTableData:[],
                ctaliTypes:[], //保险种类
                cscopeTypes:[],//保障范围
                auditStatusList: [
                    {name:'待提交',value:'0'},
                    {name:'审核中',value:'1'},
                    {name:'审核成功',value:'2'},
                    {name:'审核失败',value:'3'},
                ]
            }
        },
        created: function() {
            this.initSelectObj();
            this.searchInsurance();
        },
        methods: {
            formatAuditStatus(type) {//审核状态
                switch (type) {
                    case '0': return '待提交';
                    case '1': return '审核中';
                    case '2': return '审核成功';
                    case '3': return '审核失败';
                }
            },
            formatInsurance(type){ //格式化保险字段
                let typeDesc="";
                this.ctaliTypes.forEach(function(cType){
                    if(type==cType.value){
                        typeDesc=cType.name;
                    }
                });
                return typeDesc;
            },
            initSelectObj(){ //初始化
                this.common.getBizConstants(this,"ctaliType","ctaliTypes");
                this.common.getBizConstants(this,"cscopeType","cscopeTypes");
            },
            resetInsurance() {
                this.cargoForm = {};
            },
            searchInsurance() {
                let that = this;
                if(that.cargoForm.createEndTime){
                    that.cargoForm.createEndTime = this.common.formatterDate(null, null, that.cargoForm.createEndTime) + " 23:59:59";
                }

                let formData = this.cargoForm;
                formData.insuranceType = 1;
                this.$post("insuranceManage/carrierInsuranceList", {"data":JSON.stringify(formData)}).then(function (response) {
                    if (response.code == 0) {
                        that.$message.error(response.msg)
                    } else {
                        let data = response.data;
                        that.cargoInsuranceTableData = data;
                    }
                }).catch(error => {
                    console.log("error", error);
                    that.$message.error("数据请求异常")
                });
            },
            editInsurance(pkId) {
                this.addCargoInsurancePkId = pkId;
                this.addCargoInsuranceTitle = '编辑货运险';
                this.addCargoInsurance = true;
            },
            detailInsurance(pkId) {
              this.insuranceDetailsPkId = pkId;
              this.insuranceDetails = true;
            },
            deleteInsurance(pkId) {
                let that = this;
                this.$confirm('保单删除后，关联的车辆将处于无保险状态，确认要删除当前保单？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$post("insuranceManage/deleteCarrierInsurance", {"pkId":pkId}).then(function (response) {
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
            },
            submitInsurance(pkId) {
                let that = this;
                this.$confirm('审核中及审核通过后，保单信息将无法修改，确认您提交的保单信息已无误？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$post("insuranceManage/submitAudit", {"pkId":pkId}).then(function (response) {
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
            },
            uploadCorrection(pkId) {
                this.insuranceId = pkId;
                this.uploadEndorsement = true;
            },
            editCorrectionView(pkId) {
                this.addCorrectionTitle = '修改批单';
                this.insuranceId = pkId;
                this.uploadEndorsement = true;
            },
            detailCorrection(pkId) {
                this.insuranceId = pkId;
                this.endorsementDetails = true;
            },
            switchInsurance(tab, event) {
                let path = '';
                let name = '';
                if (tab.index == 1) {
                    path = '/employerInsurance';
                    name = 'EmployerInsurance';
                } else if (tab.index == 2) {
                    path = '/carrierInsurance';
                    name = 'CarrierInsurance';
                }
                this.$router.push({
                    path : path,
                    name : name
                });
            }
        }
    }
</script>

<style scoped>

</style>
