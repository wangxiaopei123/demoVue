<template>
    <div>
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" :before-close="closeModal" :carInfoPkId="pkId" :detailView="view" :visible.sync="visible" title="车辆信息" width="560px" center>
            <div class="capacity-pop-in" style="padding-right: 12px;">
                <div class="line-tips" v-if="!view">未绑定挂车的情况下，无法选择车辆，请到车辆列表进行绑定</div>
                <div class="car-tabs">
                    <!--添加修改车辆信息-->
                    <el-table :key="Math.random()"  border style="width: 100%;" @selection-change="handleSelectionChange" tooltip-effect="dark" ref="multipleTable" :data="carInfoTableData">
                        <el-table-column type="selection" width="55" :selectable="carSelectDisabled" v-if="!view">
                        </el-table-column>
                        <el-table-column prop="headCarNo" label="车牌号码">
                        </el-table-column>
                        <el-table-column prop="trailerCarNo" label="挂车牌号">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="import-bottom" v-if="view">
                    <el-button type="primary" @click="closeModal">确 定</el-button>
                </div>
                <div class="import-bottom" v-else>
                    <el-button @click="closeModal">取 消</el-button>
                    <el-button type="primary" @click="bindCarList">确 定</el-button>
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
            view: {
                type: Boolean,
                default: false
            },
            pkId: {
                type: String,
                default: ""
            },

        },
        data() {
            return{
                carInfoTableData:[],
                multipleSelection:[],
                selectCarList: []
            }
        },
        updated() {
            this.selectCarList = this.$parent.carList;
            if (this.view) {
                this.carInfoTableData = this.selectCarList;
            } else {
                this.carInfoTableData.forEach(t => {
                    let data = this.selectCarList.find(c => t.headCarNo == c.headCarNo);
                    if (data) {
                        this.$refs['multipleTable'].toggleRowSelection(t,true);
                    }
                });
            }
        },
        mounted(){
        },
        methods:{
            carSelectDisabled(row,index) {
                if (!row.headCarNo) return false;
                else if (row.vehicleType == 1 && !row.trailerCarNo) return false;
                return true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },//全选
            closeModal: function () {
                this.$emit('update:visible', false)
            },
            carList() {
                let that = this;
                this.$post("insuranceManage/selectInsuranceCarByCompanyId", {}).then(function (response) {
                    if (response) {
                        that.carInfoTableData = response.data;
                        if (that.selectCarList.length > 0) { //
                            that.selectCarList.forEach(t => {
                                let data = that.carInfoTableData.find(c => t.headCarNo == c.headCarNo);
                                if (!data) {
                                    t.delTag = true; //删除车辆标记
                                    that.carInfoTableData.push(t);
                                }
                            });
                        }
                    } else {
                        that.$message.error("数据请求异常")
                    }
                }).catch(error => {
                    console.log("error", error);
                    that.$message.error("数据请求异常")
                });
            },
            bindCarList() {
                let that = this;
                let valid = true;
                this.multipleSelection.forEach(t => {
                   if (t.delTag) {
                       that.$alert('车牌号码【'+t.headCarNo+'】已删除，无法关联保单，请先取消已选车辆"', '提示', {confirmButtonText: '确定'});
                       return valid = false;
                   }
                });
                if (valid) {
                    this.$emit("getBindCarList",{"carList":this.multipleSelection});
                    this.$emit('update:visible', false);
                }
            }
        },
        watch: {
            visible: function () {
                if (this.visible && !this.view) {
                    this.carList();
                }
            }
        }
    }
</script>

<style scoped>

</style>
