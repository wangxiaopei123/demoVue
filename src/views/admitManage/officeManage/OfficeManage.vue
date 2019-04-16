<template>
    <div class="case">
        <h2 class="manage-title">办事处列表</h2>
        <div class="capacity-manage">
            <div class="car-way no-choice-box">
                <div class="car-way-btn">
                    <el-button @click="addOffice = true,addOfficePkId=''" type="primary">新增办事处</el-button>
                </div>
                <div class="car-tabs list-search-box">
                    <!-- 搜索框 -->
                    <el-form label-width="89px" class="demo-ruleForm">
                        <div class="search-manage small-search small-car-search clear">
                            <div class="search-l clear">
                                <el-form-item label="办事处名称">
                                    <el-input placeholder="请输入办事处名称" v-model="searchName"></el-input>
                                </el-form-item>
                                <el-form-item label="办事处简称">
                                    <el-input placeholder="请输入办事处简称" v-model="searchShortName"></el-input>
                                </el-form-item>
                                <el-form-item label="联系电话">
                                    <el-input placeholder="请输入联系电话" v-model="searchPhone"></el-input>
                                </el-form-item>
                                <el-form-item class="search-date" label="创建时间" prop="">
                                    <el-date-picker type="date" placeholder="开始日期" v-model="searchCreateStartTime">
                                    </el-date-picker>
                                    <span>至</span>
                                    <el-date-picker type="date" placeholder="结束日期"  v-model="searchCreateEndTime">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="联系人">
                                    <el-input placeholder="请输入联系人姓名"  v-model="searchContactName"></el-input>
                                </el-form-item>
                            </div>
                            <div class="search-r">
                                <el-button type="primary" @click="seachBtnFun">搜 索</el-button>
                                <el-button class="clear-btn" @click="clearSeachBtnFun">重 置</el-button>
                            </div>
                        </div>
                    </el-form>
                    <!--暂无信息-->
                    <div class="car-way-nothing" v-if="!officeTableData.length">
                        <div class="car-way-no" style="top: 224px;">
                            <i class="el-icon-warning"></i>
                            <span>暂无办事处</span>
                        </div>
                        <!--<el-table border style="width: 100%;">
                            <el-table-column width="60px" label="序号">
                            </el-table-column>
                            <el-table-column label="办事处名称">
                            </el-table-column>
                            <el-table-column label="办事处简称">
                            </el-table-column>
                            <el-table-column label="地区">
                            </el-table-column>
                            <el-table-column label="详细地址">
                            </el-table-column>
                            <el-table-column label="联系人">
                            </el-table-column>
                            <el-table-column label="联系电话">
                            </el-table-column>
                            <el-table-column label="联系邮箱">
                            </el-table-column>
                            <el-table-column label="创建时间">
                            </el-table-column>
                            <el-table-column label="操作">
                            </el-table-column>
                        </el-table>-->
                    </div>
                    <!-- 有数据时 -->
                    <div class="car-way-table">
                        <el-table
                                :data="officeTableData"
                                border
                                style="width: 100%;">
                            <el-table-column
                                    width="60px"
                                    label="序号"
                                    prop="num"
                                    type="index">
                            </el-table-column>
                            <el-table-column
                                    label="办事处名称"
                                    width="220px"
                                    prop="name">
                            </el-table-column>
                            <el-table-column
                                    label="办事处简称"
                                    width="220px"
                                    prop="shortName">
                            </el-table-column>
                            <el-table-column
                                    label="地区"
                                    width="220px"
                                    prop="provId">
                                <template slot-scope="scope">
                                    <span>{{scope.row.provName}}-{{scope.row.cityName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="详细地址"
                                    width="220px"
                                    prop="address">
                            </el-table-column>
                            <el-table-column
                                    label="联系人"
                                    width="140px"
                                    prop="contactName">
                            </el-table-column>
                            <el-table-column
                                    label="联系电话"
                                    width="160px"
                                    prop="contactPhone">
                            </el-table-column>
                            <el-table-column
                                    label="联系邮箱"
                                    width="220px"
                                    prop="contactMail">
                            </el-table-column>
                            <el-table-column
                                    label="创建时间"
                                    width="200px"
                                    prop="createTime">
                                <template slot-scope="scope">
                                    <span>{{common.formatterDateTime('','',scope.row.createTime)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="220px">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="addOffice = true,addOfficePkId=scope.row.pkId">编辑</el-button>
                                    <el-button type="text" size="small" @click="delConfir(scope.row.pkId)">删除</el-button>
                                    <el-button type="text" size="small" @click="officeDetails = true,officeDetailsPkId=scope.row.pkId">详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--分页-->
                        <!--<div class="page-manage">
                            <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage4"
                                    :page-sizes="[100, 200, 300, 400]"
                                    :page-size="100"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="400">
                            </el-pagination>
                        </div>-->
                    </div>
                </div>
            </div>
        </div>
        <!--新增编辑办事处-->
        <AddOffice :visible.sync="addOffice" :pkId="addOfficePkId"></AddOffice>
        <!--办事处详情-->
        <OfficeDetails :visible.sync="officeDetails" :pkId="officeDetailsPkId"></OfficeDetails>
    </div>
</template>

<script>
    import AddOffice from './AddOffice'
    import OfficeDetails from './OfficeDetails'
    export default {
        components:{
            'AddOffice':AddOffice,
            'OfficeDetails':OfficeDetails
        },
        data() {
            return{
                addOffice: false,
                officeDetails: false,
                addOfficePkId:'',
                officeDetailsPkId:'',
                officeTableData:[],
                showOfficeTable:0, //无数据表格显示控制
                searchName:'',
                searchShortName:'',
                searchPhone:'',
                searchCreateStartTime:'',
                searchCreateEndTime:'',
                searchContactName:'',
            }
        },
        created(){
            this.initData();
        },
        methods: {
            initData(){
                let that = this;
                let company = this.common.fetchData("company");
                let companyId = company['pkId'];
                let searchData={
                    companyId:companyId,
                    name:this.searchName,
                    shortName:this.searchShortName,
                    contactPhone:this.searchPhone,
                    createStartTime:this.searchCreateStartTime,
                    createEndTime:this.searchCreateEndTime,
                    contactName:this.searchContactName,
                    isExist:1,

                }
                if(searchData.createStartTime){
                    searchData.createStartTime = this.common.formatterDate(null, null, searchData.createStartTime) + " 00:00:00";
                }
                if(searchData.createEndTime){
                    searchData.createEndTime = this.common.formatterDate(null, null, searchData.createEndTime) + " 23:59:59";
                }
                let data={
                    'data':JSON.stringify(searchData)
                }
                this.$post("agency/queryAgency", data).then(function (data) {
                    if (data.code == 0) {
                        that.$message.error(data.msg);
                    } else {
                        that.officeTableData=data.data;
                    }
                }).catch(res=>{
                    console.log(res)
                })
            },

            //搜索
            seachBtnFun(){
                let that=this;
                let company = this.common.fetchData("company");
                let companyId = company['pkId'];
                let searchData={
                    companyId:companyId,
                    name:this.searchName,
                    shortName:this.searchShortName,
                    contactPhone:this.searchPhone,
                    createStartTime:this.searchCreateStartTime,
                    createEndTime:this.searchCreateEndTime,
                    contactName:this.searchContactName,
                    isExist:1,

                }
                if(searchData.createStartTime){
                    searchData.createStartTime = this.common.formatterDate(null, null, searchData.createStartTime) + " 00:00:00";
                }
                if(searchData.createEndTime){
                    searchData.createEndTime = this.common.formatterDate(null, null, searchData.createEndTime) + " 23:59:59";
                }
                let data={
                    'data':JSON.stringify(searchData)
                }
                this.$post("agency/queryAgency", data).then(function (data) {
                    if (data.code == 0) {
                        that.$message.error(data.msg);
                    } else {
                        that.officeTableData=data.data;
                    }
                }).catch(res=>{
                    console.log(res)
                })
            },
            //清空
            clearSeachBtnFun(){
                this.searchName="";
                this.searchShortName="";
                this.searchPhone="";
                this.searchCreateStartTime="";
                this.searchCreateEndTime="";
                this.searchContactName="";
            },
            delConfir(pkId) {
                let that = this;
                this.$confirm('此操作将该办事处删除吗？, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post("agency/delAgency", {pkId: pkId}).then(data => {
                        if (data.code != 0) {
                            that.$message.error(data.msg);
                        } else {
                            // that.$router.go(0)
                            that.initData();
                        }
                    }).catch(res => {
                        console.log(res)
                    })
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消删除'});
                });
            },
            //删除
            handleDelete(index, row) {
                console.log(index, row);
            }

        }
    }
</script>

<style scoped>

</style>
