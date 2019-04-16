<template>
    <div>
        <!--车辆详情信息弹窗-->
        <el-dialog class="capacity-pop capacity-pop-big" title="车辆详情信息" :visible.sync="carDetailsInfo" width="54%" center @close="reload()">
            <div class="capacity-pop-in checkInfo">
                <p class="checkInfo-tip">已为您自动识别部分信息，请仔细核对并完善</p>
                <el-form label-width="130px" class="demo-ruleForm" v-model="carDetailsInfoData">
                    <h2 class="info-title">基本信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="马力：">
                            {{carDetailsInfoData.horsepower}}
                        </el-form-item>
                        <el-form-item label="种类：">
                            <span v-if="carDetailsInfoData.kind === 1">落地板</span>
                            <span v-else>半落地</span>
                        </el-form-item>
                        <el-form-item label="板长度：">
                            {{carDetailsInfoData.length}}
                        </el-form-item>
                        <el-form-item label="度数：">
                            {{carDetailsInfoData.degree}}
                        </el-form-item>
                        <el-form-item label="板式：">
                            <span v-if="carDetailsInfoData.plateType === 1">开放式</span>
                            <span v-else-if="carDetailsInfoData.plateType === 2">封闭式</span>
                            <span v-else>半封闭</span>
                        </el-form-item>
                        <el-form-item label="GPS品牌：">
                            <span v-if="carDetailsInfoData.gpsBrand === 1">G7</span>
                            <span v-else-if="carDetailsInfoData.gpsBrand === 2">北斗</span>
                            <span v-else>其他</span>
                        </el-form-item>
                        <el-form-item label="车辆正面45°照：">
                            <img class="infoImg" :src="carDetailsInfoData.car_front_45_imageUrl" alt="">
                        </el-form-item>
                    </div>
                    <h2 class="info-title">行驶证信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="车牌号码：">
                            {{carDetailsInfoData.dlPlateNo}}
                        </el-form-item>
                        <el-form-item label="车牌类型：">
                            <span v-if="carDetailsInfoData.dlPlateType === 1">黄牌</span>
                            <span v-else>蓝牌</span>
                        </el-form-item>
                        <el-form-item label="所有人：">
                            {{carDetailsInfoData.dlBelongUser}}
                        </el-form-item>
                        <el-form-item label="车辆类型：">
                            {{carDetailsInfoData.dlCarType}}
                        </el-form-item>
                        <el-form-item label="使用性质：">
                            <span v-if="carDetailsInfoData.dlUseNature === 1">货运</span>
                            <span v-else-if="carDetailsInfoData.dlUseNature === 2">营运</span>
                            <span v-else>非营运</span>
                        </el-form-item>
                        <el-form-item label="品牌类型：">
                            {{carDetailsInfoData.dlBrand}}
                        </el-form-item>
                        <el-form-item label="车架号：">
                            {{carDetailsInfoData.dlCarVin}}
                        </el-form-item>
                        <el-form-item label="发动机号码：">
                            {{carDetailsInfoData.dlEngineNo}}
                        </el-form-item>
                        <el-form-item label="注册日期：">
                            {{common.formatterDate('','',carDetailsInfoData.dlRegisterTime)}}
                        </el-form-item>
                        <el-form-item label="发证日期：">
                            {{common.formatterDate('','',carDetailsInfoData.dlIssueTime)}}
                        </el-form-item>
                        <el-form-item label="整备质量：">
                            {{carDetailsInfoData.dlHostlingWeight}}
                        </el-form-item>
                        <el-form-item label="核定载质量：">
                            {{carDetailsInfoData.dlLoadWeight}}
                        </el-form-item>
                        <el-form-item label="准牵引质量：">
                            {{carDetailsInfoData.dlTractionWeight}}
                        </el-form-item>
                        <el-form-item label="外廓尺寸：">
                            {{carDetailsInfoData.dlGabarite}}
                        </el-form-item>
                        <el-form-item label="检验有效期止：">
                            {{common.formatterDate('','',carDetailsInfoData.dlCheckEndTime)}}
                        </el-form-item>
                        <el-form-item label="强制报废日期止：">
                            {{common.formatterDate('','',carDetailsInfoData.dlScrapEndTime)}}
                        </el-form-item>
                    </div>
                    <el-form-item label="行驶证：">
                        <div class="upload_box">
                            <span class="tit_tit">行驶证首页</span>
                            <img class="infoImg" :src="carDetailsInfoData.driving_license_front_imageUrl" alt="">
                        </div>
                        <div class="upload_box">
                            <span class="tit_tit">行驶证副页</span>
                            <img class="infoImg" :src="carDetailsInfoData.driving_license_second_imageUrl" alt="">
                        </div>
                        <div class="upload_box">
                            <span class="tit_tit">行驶证背面</span>
                            <img class="infoImg" :src="carDetailsInfoData.driving_license_back_imageUrl" alt="">
                        </div>
                    </el-form-item>
                </el-form>
                <div class="import-bottom">
                    <el-button type="primary" @click="carDetailsInfo = false">确 定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import SampleGraph from '../../SampleGraph'  //示例图
    export default {
        name: "WayRescueDetailDialog",
        inject:["reload"],
        data() {
            return {
                imgSrc: require("../../../../images/register/imgTest.jpg"),
                carDetailsInfo: false,//车辆详情信息弹窗
                companyId: '',
                imgObjectList: [], //图片缓存
                carDetailsInfoData:{}
            }
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            carDetailsInfoMobel: {
                default: ""
            },
            ctaliTypes:{
                default:[]
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
            /**
             *
             * @param form 赋值form
             * @param imgDataList 图片集合
             * @param imgPrefix 图片前缀
             */
            pottingRescueImgs(form,imgDataList,imgPrefix){ //把后台返回图片组装
                if(imgDataList && imgDataList.length>0){
                    imgDataList.forEach(item=>{
                        let filePath=imgPrefix+"/"+item.imagePath;
                        let srcPath=item.imageMark+"_imageUrl";
                        let imageType=srcPath+"_type";
                        let imgName=srcPath+"_name";
                        form[srcPath]=filePath;
                        form[imageType]=item.type;
                        form[imgName]=item.imageName;
                    });
                }
            },
            pottingDefaultImg(form,srcImgList){ //填充默认的图片地址
                let that=this;
                let imgTypes=["car_front_45","driving_license_front","driving_license_second",
                    "driving_license_back","car_reg_cert","traffic_insurance","commercial_insurance"];
                imgTypes.forEach(function(key, index) {
                    let isSrcImg="";
                    if(srcImgList){
                        for(let index=0;index<srcImgList.length;index++){
                            if(srcImgList[index].imageMark==key){
                                isSrcImg=srcImgList[index];
                                break;
                            }
                        }
                    }
                    if(!isSrcImg){
                        form[key+'_imageUrl']=that.imgSrc;
                    }

                });

            }

        },
        watch: {
            carDetailsInfoMobel: function () {
                let that=this;
                var data={companyId:this.companyId,pkId:that.carDetailsInfoMobel.pkId};
                that.$post("ltdCarRescue/queryCarRescue",data).then((response) => {
                    var data=response.response;
                    if (response.code != 1 ) {
                        that.$message.error(response.msg);
                    } else {
                        that.carDetailsInfoData=data.ltdCarRescue;
                        that.carDetailsInfoData.companyImgList=data.companyImgList;
                        that.pottingRescueImgs(that.carDetailsInfoData,data.companyImgList,data.imgPrefix); //是否上传保险判断
                        that.pottingDefaultImg(that.carDetailsInfoData,data.companyImgList);
                    }
                    this.carDetailsInfo = true;
                }).catch(() => {
                    that.$message.error('车辆详情查询失败.');
                    this.carDetailsInfo = true;
                });
            }
        }

    }
</script>

<style scoped>

</style>
