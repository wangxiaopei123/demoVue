<template>
    <div>
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" :before-close="closeModal" :driverInfoPkId="pkId" :visible.sync="visible" title="司机信息" width="560px" center>
            <div class="capacity-pop-in" style="padding-right: 12px;">
                <div class="car-tabs">
                    <!--添加修改司机信息-->
                    <el-table border style="width: 100%;" @selection-change="handleSelectionChange" tooltip-effect="dark"
                              ref="multipleTable" :data="carInfoTableData">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column prop="userName" label="司机姓名">
                        </el-table-column>
                        <el-table-column prop="idCard" label="身份证号">
                        </el-table-column>
                    </el-table>
                    <!--司机信息详情-->
                   <!-- <el-table border style="width: 100%;" :data="carInfoTableData">
                        <el-table-column prop="chepai" label="司机姓名">
                        </el-table-column>
                        <el-table-column prop="guache" label="身份证号">
                        </el-table-column>
                    </el-table>-->
                </div>
                <div class="import-bottom">
                    <el-button @click="closeModal">取 消</el-button>
                    <el-button type="primary" @click="submitModal">确 定</el-button>
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
                carInfoTableData:[],
                multiplePkId:"",
                multipleUserName:"",
                multipleIdCard:"",
                multipleSelection: []

            }
        },
        methods:{
            handleSelectionChange(selection) {
             //   console.info(selection)
                this.multiplePkId='';
                this.multipleUserName='';
                this.multipleIdCard='';
                for (let v of selection) {
                    this.multiplePkId+=v.pkId+",";
                    this.multipleUserName+=v.userName+",";
                    this.multipleIdCard+=v.idCard+",";
                }
            },//全选
            closeModal: function () {
                this.$refs.multipleTable.clearSelection();
                this.$emit('update:visible', false)
            },
            submitModal: function () {
                let data={driverId:this.multiplePkId,driverUsername:this.multipleUserName}
                this.$emit("ListenChild",data);//JSON.stringify(data)
                this.$emit('update:visible', false)
            },
            initData(){
                let that = this;
                let company = this.common.fetchData("company");
                let companyId = company['pkId'];
                let searchData={
                    companyId:companyId,
                    pageSize:'10',
                    offset:'',
                    driverType:'',
                    isBindCar:'',
                    AuthState:'',
                    userName:'',
                    dlNo:'',
                    qcNo:'',
                    updateStartTime:'',
                    updateEndTime:''
                }
                let data={
                    'data':JSON.stringify(searchData)
                }
                this.$post("companyDriver/queryDriver",data).then(function (data) {
                    if (data.code != 0) {
                        that.$message.error(data.msg);
                    } else {
                        that.carInfoTableData=data.data;
                       // that.total = data.count;
                    }
                }).catch(res=>{
                    console.log(res)
                })
            },
        },
        created() {
            this.initData();

        },
        updated(){

                if (this.visible) {
                    if (this.$parent.driverId != '') {
                    let val=this.$parent.driverId.substring(0,this.$parent.driverId.length-1).split(",");
                    for(var i=0;i<this.carInfoTableData.length;i++){
                        for(let v of val){
                            if(v == this.carInfoTableData[i].pkId){
                                this.$refs.multipleTable.toggleRowSelection(this.carInfoTableData[i],true);
                            }
                        }
                    }
                }
                }else{

                }

        }
    }
</script>

<style scoped>

</style>
