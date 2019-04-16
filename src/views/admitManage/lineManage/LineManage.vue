<template>
    <div class="case">
        <h2 class="manage-title">专线列表</h2>

        <!-- 搜索框 -->
        <el-form label-width="80px" class="demo-ruleForm" :model="searchLineInfoForm" :rules="searchLineInfoForm" ref="searchLineInfoForm">
            <div class="search-manage " v-if="this.carrierType && this.lineTab == 1">
                <div class="clear">
                    <div class="search-l clear">
                        <el-form-item label="始发城市" prop="startProvId">
                            <el-input v-model="searchLineInfoForm.startProvId" placeholder="请输入始发城市"></el-input>
                        </el-form-item>
                        <el-form-item label="到达城市" prop="endProvId">
                            <el-input v-model="searchLineInfoForm.endProvId" placeholder="请输入到达城市"></el-input>
                        </el-form-item>
                        <el-form-item class="search-date" label="更新时间" prop="">
                            <el-date-picker
                                    v-model="searchLineInfoForm.startModifyTime"
                                    type="date"
                                    placeholder="开始日期">
                            </el-date-picker>
                            <span>至</span>
                            <el-date-picker
                                    v-model="searchLineInfoForm.endModifyTime"
                                    type="date"
                                    placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>

                    </div>
                    <div class="search-r">
                        <el-button @click="searchTrunk" type="primary">搜 索</el-button>
                        <el-button @click="resetForm">重 置</el-button>
                    </div>
                </div>
                <BaseTransportLineInfo @getCarrierAndLineType="getCarrierAndLineType($event)" ref="searchTrunk" ></BaseTransportLineInfo>
            </div>

            <div class="search-manage small-search" v-if="!this.carrierType || (this.carrierType && this.lineTab == 2)">
                <div class="clear">
                    <div class="search-l clear" style="width: 84%;">
                        <el-form-item label="业务城市" prop="cityName" label-width="68px">
                            <el-input v-model="searchLineInfoForm.cityName" placeholder="请输入业务城市"></el-input>
                        </el-form-item>
                        <el-form-item label="小板种类" prop="kind">
                            <el-select placeholder="请选择" v-model="searchLineInfoForm.kind">
                                <el-option
                                        v-for="item in kindOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="search-date" label="更新时间" prop="" style="width: 40%;">
                            <el-date-picker
                                    v-model="searchLineInfoForm.modifyTimeStart"
                                    type="date"
                                    placeholder="开始日期">
                            </el-date-picker>
                            <span>至</span>
                            <el-date-picker
                                    v-model="searchLineInfoForm.modifyTimeEnd"
                                    type="date"
                                    placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="板式" prop="plateType" label-width="50px" style="width:18%;">
                            <el-select placeholder="请选择" v-model="searchLineInfoForm.plateType">
                                <el-option
                                        v-for="item in plateTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="search-r">
                        <el-button @click="searchRescue" type="primary">搜 索</el-button>
                        <el-button @click="resetForm">重 置</el-button>
                    </div>
                </div>


                <BaseTransportLineInfo @getCarrierAndLineType="getCarrierAndLineType2($event)" ref="searchRescue"></BaseTransportLineInfo>
            </div>
        </el-form>

    </div>


</template>

<script>
    import BaseTransportLineInfo from './BaseTransportLineInfo'
    export default {
        components: {
            BaseTransportLineInfo
        },
        created() {
        }
        ,data() {

            return {
                companyId: '',
                lineTab: 1,
                carrierType: true,// true 大板 false 小板
                imgSrc: "../../../../images/register/imgTest.jpg",
                screenHeight: document.documentElement.clientHeight, // 屏幕高度
                active: 2, //步骤栏默认
                currentPage4: 4,//分页
                activePop: 0,
                searchLineInfoForm:{cityName:''},
                kindOptions : [{
                    value: '1',
                    label: '落地板'
                },{
                    value: '2',
                    label: '半落地'
                }],
                plateTypeOptions : [{
                    value: '1',
                    label: '开放式'
                },{
                    value: '2',
                    label: '封闭式'
                },{
                    value: '3',
                    label: '半封闭'
                }]

            }
        },
        mounted() {
            var _this = this;
            window.onresize = function() { // 定义窗口大小变更通知事件
                _this.screenHeight = document.documentElement.clientHeight // 窗口高度
            }
        },
        methods: {
            getCarrierAndLineType(data) {
                this.carrierType = data.carrierType;
                this.lineTab = data.lineTab;
                this.companyId = data.companyId;
            },
            getCarrierAndLineType2(data) {
                this.carrierType = data.carrierType;
                this.lineTab = data.lineTab;
                this.companyId = data.companyId;
            }
            ,searchTrunk() {
                let that = this;
                let query = {
                    "companyId": this.companyId,
                    "startCityName": this.searchLineInfoForm.startProvId,
                    "endCityName": this.searchLineInfoForm.endProvId,
                    "startModifyTime": this.searchLineInfoForm.startModifyTime,
                    "endModifyTime": this.searchLineInfoForm.endModifyTime
                };
                if(query.startModifyTime){
                    query.startModifyTime = this.common.formatterDate(null, null, query.startModifyTime) + " 00:00:00";
                }
                if(query.endModifyTime){
                    query.endModifyTime = this.common.formatterDate(null, null, query.endModifyTime) + " 23:59:59";
                }
                this.$post("selectLineTrunkByCompanyId", query).then(function (response) {
                    let data = response.data;
                    let trunkTableData = [];
                    for (let i=0;i<data.length;i++) {
                        let ltdLineTrunk = data[i]['ltdLineTrunk'];
                        let trunkId = ltdLineTrunk['pkId'];
                        let trunkOfferList = data[i]['trunkOfferList'];
                        let trunkPassList = data[i]['trunkPassList'];
                        that.common.saveData(trunkId,null);
                        trunkTableData.push({
                            orderNumber: (i+1),
                            startCity: ltdLineTrunk['startProvName']+'-'+ltdLineTrunk['startCityName'],
                            endCity: ltdLineTrunk['endProvName']+'-'+ltdLineTrunk['endCityName'],
                            // kilometre: 11111,
                            roadCity: trunkPassList ? trunkPassList.length : 0,
                            line: trunkOfferList ? trunkOfferList.length : 0,
                            time: ltdLineTrunk['createTime'],
                            trunkId: trunkId
                        });
                        that.common.saveData(trunkId,data[i]) //大板专线ID存储数据
                    }
                    that.$refs.searchTrunk.trunkTableData = trunkTableData;
                }).catch(error => {
                    console.log("error", error);
                    that.$message.error("数据请求异常")
                });
            }
            ,searchRescue() {
                let that = this;
                let query = {
                    "companyId": this.companyId,
                    "cityName": this.searchLineInfoForm.cityName,
                    "kind": this.searchLineInfoForm.kind,
                    "plateType": this.searchLineInfoForm.plateType,
                    "startModifyTime": this.searchLineInfoForm.modifyTimeStart,
                    "endModifyTime": this.searchLineInfoForm.modifyTimeEnd
                };
                if(query.startModifyTime){
                    query.startModifyTime = this.common.formatterDate(null, null, query.startModifyTime) + " 00:00:00";
                }
                if(query.endModifyTime){
                    query.endModifyTime = this.common.formatterDate(null, null, query.endModifyTime) + " 23:59:59";
                }
                this.$post("selectLineRescuerByCompanyId", query).then(function (response) {
                    let data = response;
                    if (data.code == 1) {
                        that.$refs.searchRescue.fixTableData = data.data;
                    } else {
                        that.$message.error(data.msg)
                    }
                }).catch(error => {
                    console.log("error", error);
                    that.$message.error("数据请求异常")
                });
            }
            ,resetForm() {
                this.searchLineInfoForm = {};
            }


        }
    }
</script>

<style>

</style>
