<template>
    <div class="case">
        <h2 class="manage-title">车辆列表</h2>
        <div class="capacity-manage">
            <div class="car-way line-choice">
                <div class="car-way-btn">
                    <el-button @click="openUpload">批量导入</el-button>
                    <el-button @click="addCarRescue = true" type="primary">添加车辆</el-button>

                </div>
                <div class="car-tabs">
                    <el-tabs type="border-card" v-model="activeName" @tab-click="tabClick">
                        <el-tab-pane label="车辆列表" v-if="common.fetchData('company').carrierType === 1"></el-tab-pane>
                        <el-tab-pane label="车头列表" v-if="common.fetchData('company').carrierType === 1"></el-tab-pane>
                        <el-tab-pane label="挂车列表" v-if="common.fetchData('company').carrierType === 1"></el-tab-pane>
                        <el-tab-pane label="小板车列表" name="second">
                            <!-- 搜索框 -->
                            <el-form label-width="80px" class="demo-ruleForm">
                                <div class="search-manage small-search small-car-search clear">
                                    <div class="search-l clear">
                                        <el-form-item label="车牌号码" prop="reDlPlateNo">
                                            <el-input placeholder="请输入车牌号码" v-model="reDlPlateNo"></el-input>
                                        </el-form-item>
                                        <el-form-item label="审核状态" prop="status" placeholder="请选择" >
                                            <el-select v-model="status">
                                                <el-option :value=0 label="待审核"></el-option>
                                                <el-option :value=1 label="审核通过"></el-option>
                                                <el-option :value=2 label="审核失败"></el-option>
                                                <el-option :value=3 label="审核中"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="司机姓名" prop="reUserName">
                                            <el-input placeholder="请输入司机姓名" v-model="reUserName"></el-input>
                                        </el-form-item>
                                        <el-form-item label="车牌类型" prop="reDlPlateType">
                                            <el-select v-model="reDlPlateType">
                                                <el-option
                                                        v-for="item in reDlPlateTypeOp"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item class="search-date" label="更新时间" prop="">
                                            <el-date-picker type="date" placeholder="开始日期" v-model="resStartTime">
                                            </el-date-picker>
                                            <span>至</span>
                                            <el-date-picker type="date" placeholder="结束日期" v-model="resEndTime">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="车辆类型" prop="">
                                            <el-input placeholder="请输入车辆类型" v-model="reDlCarType"></el-input>
                                        </el-form-item>
                                        <el-form-item style="width: 27%;" label="运输许可证号" label-width="110px" prop="reRpNo">
                                            <el-input placeholder="请输入运输许可证号" v-model="reRpNo"></el-input>
                                        </el-form-item>
                                        <el-form-item label="种类" prop="reKind">
                                            <el-select v-model="reKind">
                                                <el-option
                                                        v-for="item in reKindOp"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item class="search-date" label="审核时间" prop="">
                                            <el-date-picker type="date" v-model="verifyStartTime" placeholder="开始日期">
                                            </el-date-picker>
                                            <span>至</span>
                                            <el-date-picker type="date" v-model="verifyEndTime" placeholder="结束日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </div>
                                    <div class="search-r">
                                        <el-button @click="searchRescueData" type="primary">搜 索</el-button>
                                        <el-button @click="rescueRest">重 置</el-button>
                                    </div>
                                </div>
                            </el-form>
                            <!--暂无车辆信息显示，默认car-way-nothing是隐藏的car-way-nothing里面的table只做显示用，有数据显示就执行下面的table-->
                            <div class="car-way-nothing" v-if="showWayRescueTable===0">
                                <div class="car-way-no" style="top: 240px;">
                                    <i class="el-icon-warning"></i>
                                    <span>暂无车辆信息，请先导入或添加车辆信息</span>
                                </div>
                                <el-table border style="width: 100%;">
                                    <el-table-column width="60px" label="序号">
                                    </el-table-column>
                                    <el-table-column label="车牌号码">
                                    </el-table-column>
                                    <el-table-column label="车辆类型">
                                    </el-table-column>
                                    <el-table-column label="种类/板式" width="90px">
                                    </el-table-column>
                                    <el-table-column label="检验有效期止" width="110px">
                                    </el-table-column>
                                    <el-table-column label="主司机">
                                    </el-table-column>
                                    <el-table-column label="副司机">
                                    </el-table-column>
                                    <el-table-column label="运输许可证号" width="110px">
                                    </el-table-column>
                                    <el-table-column label="保险详情">
                                    </el-table-column>
                                    <el-table-column label="审核状态">
                                    </el-table-column>
                                    <el-table-column label="审核时间">
                                    </el-table-column>
                                    <el-table-column label="更新时间">
                                    </el-table-column>
                                    <el-table-column label="操作">
                                    </el-table-column>
                                </el-table>
                            </div>

                            <!--有数据显示的时候-->
                            <div class="car-way-table" v-if="showWayRescueTable===1">
                                <el-table :data="rescuetableData"
                                          border
                                          style="width: 100%">
                                    <el-table-column
                                            label="序号"
                                            width="60"
                                            type="index">
                                        <template slot-scope="scope">
                                            {{scope.$index+1}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="dlPlateNo"
                                            label="车牌号码" width="130">
                                        <template slot-scope="scope">
											<span @click="openCarDetailModel(scope.row)" class="car-way-blue">{{scope.row.dlPlateNo}}
												<div style="display: inline" v-if='scope.row.dlPlateType == 1'><i class="car-yellow"></i></div>
												<div style="display: inline" v-if='scope.row.dlPlateType == 2'><i class="car-blue"></i></div>
											</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="dlCarType" label="车辆类型" width="120">
                                    </el-table-column>
                                    <el-table-column prop="carStatus" label="车辆状态" width="120">
                                    </el-table-column>
                                    <el-table-column prop="type" label="种类/板式" width="150">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.kind}}/{{scope.row.plateType}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="plateType" label="检验有效期止" width="160">
                                        <template slot-scope="scope">
                                            <span >{{scope.row.dlCheckEndTime}}</span>
                                            <!-- <el-button type="danger" size="mini">{{scope.row.dlCheckEndTimeStatus}}</el-button> -->
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="主司机" width="120" prop="mainDriver">
                                    </el-table-column>
                                    <el-table-column label="副司机" width="120" prop="viceDriver">
                                    </el-table-column>
                                    <el-table-column prop="rpNo" label="运输许可证号" width="160">
                                        <template slot-scope="scope">
                                            <span @click="openTransportDetailsInfo(scope.row)"
                                                  class="car-way-blue">{{scope.row.rpNo}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="insurance" label="保险详情" width="90">
                                        <template slot-scope="scope">
                                            <a @click="openInsuranceDetailsInfoModel(scope.row)" class="car-way-blue" href="javascript:;">查看</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="审核状态" width="120">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.verifyStatus === 1">审核通过</span>
                                            <span v-if="scope.row.verifyStatus === 2">审核失败</span>
                                            <span v-if="scope.row.verifyStatus === 3">审核中</span>
                                            <span v-if="scope.row.verifyStatus === 0">待提交</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="verifyTime"
                                            label="审核时间"
                                            :formatter="common.formatterDateTime"
                                            width="160">
                                    </el-table-column>
                                    <el-table-column prop="upDateTime" label="更新时间" width="170">
                                    </el-table-column>
                                    <el-table-column fixed="right" label="操作" width="260">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" v-if="scope.row.isUpPic==0" @click="uploadPapers=true,uploadCarRescuePkId=scope.row.rescuePkId">上传证件</el-button>
                                            <el-button type="text" size="small" v-if="(scope.row.verifyStatus == 0 && scope.row.isUpPic==1 ) || scope.row.verifyStatus == 1" @click="addCarRescue=true;carRescuePkId=scope.row.rescuePkId">编辑</el-button>
                                            <el-button type="text" size="small" v-if="scope.row.verifyStatus == 2 " @click="addCarRescue=true;carRescuePkId=scope.row.rescuePkId">重新提交</el-button>
                                            <el-button type="text" size="small" v-if="scope.row.verifyStatus == 1" @click="changeDriverFun(scope.row.rescuePkId,1)">更换司机</el-button>
                                            <el-button type="text" size="small" v-if="scope.row.verifyStatus != 3" @click="delConfir(scope.row.rescuePkId)">删除</el-button>
                                            <el-button type="text" size="small" v-if="scope.row.verifyStatus == 1" @click="updateInsureInfoModel(scope.row.rescuePkId,'2','更新保险信息')">更新保险</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="page-manage">
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="currentPage4"
                                            :page-sizes="[10, 20]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="total">
                                    </el-pagination>
                                </div>
                            </div>

                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>

        <!-- 添加/更换司机弹窗 -->
        <el-dialog class="capacity-pop capacity-line" title="添加/更换司机" :visible.sync="changeDriver" width="34%" center>
            <div class="capacity-pop-in">
                <el-form :model="changeDriverForm" :rules="changeDriverRules" ref="changeDriverForm" label-width="110px" class="demo-ruleForm">
                    <el-form-item label="主司机" prop="">
                        <el-select v-model="mainDriverValue" placeholder="请选择">
                            <el-option
                                    v-for="item in mainDrivers"
                                    :key="item.pkId"
                                    :label="item.userName"
                                    :value="item.pkId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="副司机" prop="">
                        <el-select v-model="deputyDriverValue" placeholder="请选择">
                            <el-option
                                    v-for="item in deputyDrivers"
                                    :key="item.pkId"
                                    :label="item.userName"
                                    :value="item.pkId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="import-bottom">
                    <el-button @click="changeDriver = false">取 消</el-button>
                    <el-button type="primary" @click="changeDriverSubmit">确 定</el-button>
                </div>
            </div>
        </el-dialog>


        <!--查看示例弹窗-->
        <el-dialog class="check_bom" title="查看示例" :visible.sync="img1" center>
            <img :src="imgSrc">
            <span slot="footer" class="dialog-footer" center>
				<el-button type="primary" @click="img1 = false">确 定</el-button>
			</span>
        </el-dialog>

        <!--批量导入弹窗-->
        <el-dialog class="capacity-pop capacity-line" title="小板车批量导入" :visible.sync="bulkImport" width="40%" center>
            <div class="capacity-pop-in">
                <el-form :model="bulkImportRulesForm" :rules="bulkImportRules" ref="bulkImportRulesForm" label-width="80px" class="demo-ruleForm import-box">
                    <el-form-item label="模板下载">
                        <el-button size="small" @click="downLoad" type="primary" ><i class="import-icon el-icon-download"></i>下载批量导入模板</el-button>
                    </el-form-item>
                    <el-form-item label="选择文件">
                        <el-upload
                                class="upload-demo"
                                ref="upload"
                                :action="upLoadExcel"
                                :on-preview="handlePreview"
                                :file-list="upLoadFile"
                                :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload()"><i class="import-icon el-icon-upload"></i>上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
                        </el-upload>
                    </el-form-item>
                    <div class="import-resul">
                        <h5>上传结果说明</h5>
                        <span id="uploadSuccess" style="display:none"></span>
                        <span id="uploadFail" style="display:none">本次数据上传失败，具体失败原因请下载错误报告查看 <a id="errExcel" href="javascript:;">下载错误报告</a> </span>
                    </div>

                    <!--<div class="import-bottom">
                        <el-button @click="bulkImport = false">取消保存</el-button>
                        <el-button type="primary" @click="bulkImport = false">确认保存</el-button>
                    </div>-->

                </el-form>
            </div>
        </el-dialog>

        <!--保险详情信息弹窗-->
        <el-dialog class="capacity-pop capacity-pop-big" title="保险详情信息" :visible.sync="insuranceDetailsInfo" width="58%" center>
            <div class="capacity-pop-in">
                <el-form label-width="130px" class="demo-ruleForm" v-model="insuranceDetailsInfoModel">
                    <div class="info-item clear">
                        <el-form-item label="交强险保险品牌：">
                            {{formatInsurance(insuranceDetailsInfoModel.ctaliType)}}
                        </el-form-item>
                        <el-form-item label="交强险保险单号：">
                            {{insuranceDetailsInfoModel.ctaliNo}}
                        </el-form-item>
                        <el-form-item label="交强险有效期：">
                            {{common.formatterDate('','',insuranceDetailsInfoModel.ctaliStartTime)}} 至 {{common.formatterDate('','',insuranceDetailsInfoModel.ctaliEndTime)}}
                        </el-form-item>
                        <el-form-item label="商业险保险品牌：">
                            {{formatInsurance(insuranceDetailsInfoModel.ciType)}}
                        </el-form-item>
                        <el-form-item label="商业险保险单号：">
                            {{insuranceDetailsInfoModel.ciNo}}
                        </el-form-item>
                        <el-form-item label="商业险有效期：">
                            {{common.formatterDate('','',insuranceDetailsInfoModel.ciStartTime)}} 至 {{common.formatterDate('','',insuranceDetailsInfoModel.ciEndTime)}}
                        </el-form-item>
                        <el-form-item label="保险单照片：">
                            <span class="not-color" v-if="insuranceDetailsInfoModel.isUploadInsur==false">未上传</span>
                            <div v-else>
                                <div class="upload_box">
                                    <span class="tit_tit">交强险保险单</span>
                                    <img v-if="insuranceDetailsInfoModel.traffic_insurance_imageUrl" :src="insuranceDetailsInfoModel.traffic_insurance_imageUrl"
                                         :imageType="insuranceDetailsInfoModel.traffic_insurance_imageUrl_type"
                                         :imgName="insuranceDetailsInfoModel.traffic_insurance_imageUrl_name"
                                         class="avatar">
                                </div>
                                <div class="upload_box">
                                    <span class="tit_tit">商业险保险单</span>
                                    <img v-if="insuranceDetailsInfoModel.commercial_insurance_imageUrl" :src="insuranceDetailsInfoModel.commercial_insurance_imageUrl"
                                         :imageType="insuranceDetailsInfoModel.commercial_insurance_imageUrl_type"
                                         :imgName="insuranceDetailsInfoModel.commercial_insurance_imageUrl_name"
                                         class="avatar">
                                </div>
                            </div>

                        </el-form-item>
                    </div>
                </el-form>
                <div class="import-bottom">
                    <el-button type="primary" @click="insuranceDetailsInfo = false">确 定</el-button>
                </div>
            </div>
        </el-dialog>
        <!--车辆详情-->
        <WayRescueDetailDialog :visible.sync="carDetailsInfo" :carDetailsInfoMobel="carDetailsInfoMobel" :ctaliTypes="ctaliTypes"></WayRescueDetailDialog> <!--title="救援车辆详情"-->
        <!-- 添加车辆页面-->
        <AddCarRescueDialog :visible.sync="addCarRescue" :carRescuePkId="carRescuePkId" :ctaliTypes="ctaliTypes"></AddCarRescueDialog>
        <!--修改保险-->
        <UpdateCarRescueInsur :visible.sync="updateInsurInfo" :updateInsureId="updateInsureId" :ctaliTypes="ctaliTypes"></UpdateCarRescueInsur>

        <!--道路运输许可证-->
        <el-dialog class="capacity-pop" title="道路运输许可证详情信息" :visible.sync="transportDetailsInfo" width="55%" center>
            <div class="capacity-pop-in">
                <el-form label-width="130px" class="demo-ruleForm" v-model="transportDetailsInfoModel">
                    <div class="info-item clear">
                        <el-form-item label="业户名称：">
                            {{transportDetailsInfoModel.rpOwnerName}}
                        </el-form-item>
                        <el-form-item label="所属省份：">
                            {{transportDetailsInfoModel.rpProName}}
                        </el-form-item>
                        <el-form-item label="运输许可证号：">
                            {{transportDetailsInfoModel.rpNo}}
                        </el-form-item>
                        <el-form-item label="发证日期：">
                            {{common.formatterDate('','',transportDetailsInfoModel.rpTime)}}
                        </el-form-item>
                        <el-form-item label="有效期：">
                            {{common.formatterDate('','',transportDetailsInfoModel.rpStartTime)}} 至 {{common.formatterDate('','',transportDetailsInfoModel.rpEndTime)}}
                        </el-form-item>
                        <el-form-item label="运输许可证：">
                            <span class="not-color" v-if="transportDetailsInfoModel.transport_license_imageUrl === ''">未上传</span>
                            <img class="infoImg" v-if="transportDetailsInfoModel.transport_license_imageUrl" :src="transportDetailsInfoModel.transport_license_imageUrl" alt="">
                        </el-form-item>
                    </div>
                </el-form>
                <div class="import-bottom">
                    <el-button type="primary" @click="transportDetailsInfo = false">确 定</el-button>
                </div>
            </div>
        </el-dialog>
        <!--上传证件-->
        <UploadCarRescueImg :visible.sync="uploadPapers" :uploadCarRescuePkId="uploadCarRescuePkId" :ctaliTypes="ctaliTypes"></UploadCarRescueImg> <!--title="上传证件"-->
    </div>
</template>

<script>

    import AddCarRescueDialog from '../../admitWeb/capacity/wayRescue/AddCarRescueDialog'
    import WayRescueDetailDialog from '../../admitWeb/capacity/wayRescue/WayRescueDetailDialog'
    import UpdateCarRescueInsur from '../../admitWeb/capacity/wayRescue/UpdateCarRescueInsur'
    import UploadCarRescueImg from '../../admitWeb/capacity/wayRescue/UploadCarRescueImg'
    //	import SampleGraph from '../../SampleGraph'  //示例图

    export default {
        inject:['reload'],
        components: {
            AddCarRescueDialog,
            WayRescueDetailDialog,
            UpdateCarRescueInsur,
            UploadCarRescueImg,
            //	'SampleGraph':SampleGraph,
        },
        data() {

            return {
                activeName:"second",
                total:0,
                pageSize:10,
                offset:0,
                /*********************/
                imgSrc: "../../../images/register/imgTest.jpg",
                screenHeight: document.documentElement.clientHeight, // 屏幕高度
                active: 0, //步骤栏默认
                activePop: 0,
                activeNextPop: 1,
                currentPage4: 1,//分页
                img1: false,
                fileList: [],
                imageUrl: '', //图片地址

                changeDriver:false, //添加/更换司机弹窗
                changeRescueId:"",
                changeDriverForm:{},
                changeDriverRules:{},

                editInfo:false,//编辑车辆信息弹窗
                editInfoForm:{},
                editInfoRules:{},

                checkNextInfo: false, //添加车辆下一步核对并完善信息弹窗
                checkInfoForm:{},
                checkInfoRules:{},
                bulkImportRulesForm: {}, //批量导入弹窗
                bulkImportRules: {},
                bulkImport: false, //批量导入弹窗
                uploadPapers:false,//上传证件弹窗
                uploadCarRescuePkId:'',

                upLoadFile:[],
                upLoadExcel:this.common.CONSTANT.UPLOADIMGPATH+'/ltdCarRescue/importCarRescueByExcel',
                carDetailsInfo: false, //车辆详情信息弹窗

                insuranceDetailsInfo: false, //保险详情信息弹窗
                insuranceDetailsInfoModel:"", //保险详情model

                rescuetableData:[],
                showWayRescueTable:0, //无数据表格显示控制

                /*********************/
                updateInsurInfo:false,//更新保险
                updateInsurForm:{},
                updateInsurRules:{},

                carDialogType:"",		//弹出框显示类别
                carDialogTitle:"",		//弹出框标题
                ctaliTypeOption: [],	//保险下拉框value
                ciTypeOption: [],    	//保险下拉框value
                addCarRescue:false,	//弹出小板车辆

                action: this.common.CONSTANT.UPLOADIMGPATH + 'recognizeImage',//上传图片地址
                //车辆正面45°照=图片地址
                car_45_card_front_imageUrl: '',
                car_45_card_front_imageUrl_type: '',
                car_45_card_front_imageUrl_name: "",
                //行驶证首页
                driving_license_imageUrl: '',
                driving_license_imageUrl_type: '',
                driving_license_imageUrl_name: "",
                //行驶副业
                driving_license_bywork_imageUrl: "",
                driving_license_bywork_imageUrl_type: "",
                driving_license_bywork_imageUrl_name: "",
                // 行驶证背面
                driving_license_back_imageUrl: "",
                driving_license_back_imageUrl_type: "",
                driving_license_back_imageUrl_name: "",
                //机动车登记证书
                car_registration_imageUrl: "",
                car_registration_imageUrl_type: "",
                car_registration_imageUrl_name: "",
                //运输许可
                transport_license_imageUrl: "",
                transport_license_imageUrl_type: "",
                transport_license_imageUrl_name: "",
                //交强险
                compulsory_insurance_imageUrl: "",
                compulsory_insurance_imageUrl_type: "",
                compulsory_insurance_imageUrl_name: "",
                //商业保险
                commercial_insurance_imageUrl: "",
                commercial_insurance_imageUrl_type: "",
                commercial_insurance_imageUrl_name: "",


                //小板搜索項
                reDlPlateNo:"",
                reUserName:"",
                reDlCarType:"",
                reRpNo:"",
                resStartTime:"",
                resEndTime:"",
                reDlPlateTypeOp:[{id:"",name:"全部"},{id:1,name:"黄牌"},{id:2,name:"蓝牌"}],
                reDlPlateType:"",
                rePlateTypeOp:[{id:"",name:"全部"},{id:1,name:"开放式"},{id:2,name:"封闭式"},{id:3,name:"半封闭"}],
                statusOp:[{id:-1,name:"全部"},{id:0,name:"待提交"},{id:1,name:"审核通过"},{id:2,name:"审核失败"},{id:3,name:"审核中"}],
                rePlateType :"",
                reKindOp:[{id:"",name:"全部"},{id:1,name:"落地板"},{id:2,name:"半落地"}],
                reKind:"",
                status:"",
                verifyEndTime:'',
                verifyStartTime:'',

                companyId:"",
                carRescuePkId:"",
                ctaliTypes:[], //保险种类
                carDetailsInfoMobel: "",//车辆详情信息弹窗---数据绑定
                imgObjectList: [],  //图片缓存
                mainDrivers:[],
                deputyDrivers:[],
                mainDriverValue:'',
                deputyDriverValue:[],

                updateInsureId:"",

                transportDetailsInfoModel:{
                    rpOwnerName:'',
                    rpProName:'',
                    rpNo:'',
                    rpTime:'',
                    rpStartTime:'',
                    rpEndTime:'',
                    transport_license_imageUrl:''

                },
                transportDetailsInfo:false
            }
        },
        created(){
            let that = this;
            if (!this.common.fetchData("register")) {
                this.$message.info("访问异常，请重新登录");
                this.$router.push({
                    name: 'Login'
                })
            } else {
                let company = this.common.fetchData("company");
                let carrierType  = company['carrierType'];
                if (carrierType == 2) {
                    this.carrierType = false;
                }
                this.companyId = company['pkId'];
            }
            this.initData();
            this.common.getBizConstants(this, 'ctaliType', 'ctaliTypes');
        },
        methods: {

            initData(){
                let that = this;
                let company = this.common.fetchData("company");
                that.companyId = company['pkId'];
                let param = {
                    "data": JSON.stringify({
                        "ltdCarRescue":{
                            "companyId": that.companyId,
                            "dlPlateNo":this.reDlPlateNo,
                            "dlPlateType":this.reDlPlateType,
                            "verifyStatus":this.status,
                            "dlCarType":this.reDlCarType,
                            "rpNo": this.reRpNo,
                            "kind": this.reKind,
                            "plateType":this.rePlateType,
                        },
                        "pageSize":this.pageSize,
                        "offset":this.offset,
                        "mainDriver":{
                            "ltdCompanyDriver":{
                                "userName":this.reUserName
                            }
                        },
                        //"endModifyTime":this.resEndTime,
                        "modifyStartTime":this.resStartTime?this.common.formatterDate(null, null, this.resStartTime) + " 00:00:00" :'',
                        "modifyEndTime":this.resEndTime?this.common.formatterDate(null, null, this.resEndTime) + " 23:59:59":'',
                        "verifyStartTime":this.verifyStartTime?this.common.formatterDate(null, null, this.verifyStartTime) + " 00:00:00" :'',
                        "verifyEndTime":this.verifyEndTime?this.common.formatterDate(null, null,this.verifyEndTime) + " 23:59:59":'',
                    })
                };
                //console.log(param);
                this.$post("ltdCarRescue/carRescueList", param).then(function (data) {
                    if (data.code == 0) {
                        that.$message.error(data.msg);
                    } else {
                        that.rescuetableData = data.data;
                        if (that.rescuetableData && that.rescuetableData.length > 0) {
                            that.showWayRescueTable = 1;
                        }
                        that.total = data.count;
                    }
                }).catch(res=>{
                    console.log(res)
                });
            },

            handleSizeChange(val) {
                this.pageSize = val;
                this.initData();
            },
            handleCurrentChange(val) {
                this.offset=(val-1)*this.pageSize;
                this.initData();
            },
            submitHeadBinding() {
                let that = this;
                that.$post("ltdCarTrailer/carHeadBinding", that.carHeadBindingModel).then(function (res) {
                    if (res) {
                        that.$message({
                            type: 'success',
                            message: '成功!'
                        });
                        that.reload();
                        // that.carHeadBindingVisible=false;
                    }
                })
            },
            //跳转到小板车认证
            goToSmallCerVerify() {
                console.info("adsasd")

            },
            //上传证件
            handleClick(index, row) {
                console.log(index, row);
            },
            //编辑
            handleEdit(index, row) {
                console.log(index, row);
            },
            //删除
            handleDelete(index, row) {
                console.log(index, row);
            },
            searchRescueData() {//开启模糊查询
                let that=this;
                let company = this.common.fetchData("company");
                that.companyId = company['pkId'];
                let param = {
                    "data": JSON.stringify(
                        {
                            "ltdCarRescue":{
                                "companyId": that.companyId,
                                "dlPlateNo":this.reDlPlateNo,
                                "dlPlateType":this.reDlPlateType,
                                "verifyStatus":this.status,
                                "dlCarType":this.reDlCarType,
                                "rpNo": this.reRpNo,
                                "kind": this.reKind,
                                "plateType":this.rePlateType,
                            },
                            "pageSize":this.pageSize,
                            "offset":0,
                            "mainDriver":{
                                "ltdCompanyDriver":{
                                    "userName":this.reUserName
                                }
                            },
                           // "endModifyTime":this.resEndTime
                            "modifyStartTime":this.resStartTime?this.common.formatterDate(null, null, this.resStartTime) + " 00:00:00" :'',
                            "modifyEndTime":this.resEndTime?this.common.formatterDate(null, null, this.resEndTime) + " 23:59:59":'',
                            "verifyStartTime":this.verifyStartTime?this.common.formatterDate(null, null, this.verifyStartTime) + " 00:00:00" :'',
                            "verifyEndTime":this.verifyEndTime?this.common.formatterDate(null, null,this.verifyEndTime) + " 23:59:59":'',
                        })
                };
                this.$post("ltdCarRescue/carRescueList", param).then(function (response) {
                    let data = response;
                    if (data.code == 1) {
                        that.rescuetableData = data.data;
                        that.showWayRescueTable = 0;
                        if (that.rescuetableData && that.rescuetableData.length > 0) {
                            that.showWayRescueTable = 1;
                        }
                        that.total = data.count;

                    } else {
                        this.$message.error(data.msg)
                    }
                }).catch(error => {
                    console.log("error", error);
                    this.$message.error("数据请求异常")
                });
            },
            rescueRest(){// 小板列表的重置
                this.reDlPlateNo="";
                this.reUserName="";
                this.reDlPlateType="";
                this.resStartTime="";
                this.reDlCarType="";
                this.reRpNo="";
                this.reKind="";
                this.rePlateType="";
                this.resEndTime="";
                this.verifyEndTime='';
                this.verifyStartTime='';
                this.status='';
            },
            tabClick(tab, event) {
                    let activeName="";
                if(tab.index=='0'){
                    activeName='first'
                }
                if(tab.index=='1'){
                    activeName='second'
                }
                if(tab.index=='2'){
                    activeName='third'
                }
                if(tab.index!='3' && this.common.fetchData('company').carrierType == 1){
                  /*  this.$router.push('/CarManage')*/
                    this.$router.push({
                        path : '/carManage',
                        name : 'CarManage',
                        params: {
                            activeName:activeName
                        }
                    });
                    //this.$route.path("/CarWayManage")
                }
            },
            formatInsurance(type){ //格式化保险字段
                var typeDesc="";
                this.ctaliTypes.forEach(function(cType){
                    if(type==cType.value){
                        typeDesc=cType.name;
                    }
                });
                return typeDesc;
            },
            openInsuranceDetailsInfoModel(row){ // 保险详情信息弹窗---数据绑定
                var that=this;
                this.insuranceDetailsInfoModel={};
                this.insuranceDetailsInfoModel.isUploadInsur=false;
                let company = this.common.fetchData("company");
                let data={companyId:company['pkId'],extendId:row.rescuePkId};
                that.$get("ltdCarRescue/queryInsurImg",data).then((response) => {
                    var data=response.response;
                    if (response.code != 1 ) {
                        that.$message.error(response.msg);
                    } else {
                        that.insuranceDetailsInfoModel=data.ltdCarRescue;
                        that.insuranceDetailsInfoModel.isUploadInsur=false;
                        that.insuranceDetailsInfoModel.companyImgList=data.companyImgList;
                        if(data!=null && data.companyImgList!=null && data.companyImgList.length>0){
                            that.insuranceDetailsInfoModel.isUploadInsur=true;
                            that.pottingRescueImgs(that.insuranceDetailsInfoModel, data.companyImgList, data.imgPrefix);
                        }
                    }
                    that.insuranceDetailsInfo = true;
                }).catch(() => {
                    that.$message.error('车辆详情查询失败.');
                    that.insuranceDetailsInfo = true;
                });


            },
            openCarDetailModel(row){ //车辆详情
                // console.log(JSON.stringify(row));
                this.carDetailsInfoMobel=row;
                this.carDetailsInfoMobel.pkId=row.rescuePkId; //重新赋值详情id
                this.carDetailsInfo=true;
            },
            openTransportDetailsInfo(row) { //道路运输许可证详情
                let that  = this;
                let data={companyId:this.companyId,pkId:row.rescuePkId};
                this.$post("ltdCarRescue/queryCarRescue",data).then((response) => {
                    let result=response.response;
                    if (response.code != 1 ) {
                        that.$message.error(response.msg);
                    } else {
                        that.transportDetailsInfoModel=result.ltdCarRescue;
                        if(result!=null && result.companyImgList!=null && result.companyImgList.length>0){
                            that.pottingRescueImgs(that.transportDetailsInfoModel,result.companyImgList,that.common.CONSTANT.imagePrefix);
                        }
                    }
                    that.transportDetailsInfo = true;
                }).catch(() => {
                    that.$message.error('道路运输许可证详情查询失败.');
                    that.transportDetailsInfo = true;
                });
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
            updateInsureInfoModel(pkId,type,title){
                this.updateInsurInfo=true;
                this.carDialogTitle=title;
                this.updateInsureId=pkId;

            },
            //更换/关联司机
            changeDriverFun(pkId, isEdit) {//弹出更换/关联车辆并初始化下拉框
                this.changeRescuePkId = pkId;
                let that = this;
                let company = that.common.fetchData("company");
                let companyId = company['pkId'];//that.$route.params['register']['companyId'];
                this.$post("ltdCarRescue/initBindInfo", {
                    rescueId: pkId,
                    companyId: companyId,
                    isEdit: isEdit
                }).then(data => {
                    if (data.code == 0) {
                        that.$message.error(data.msg);
                    } else {
                        that.deputyDrivers = data.resultData.rescueBindVO.deputyDriver;
                        that.mainDrivers = data.resultData.rescueBindVO.mainDriver;
                        that.mainDriverValue = data.resultData.rescueBindVO.currMainDriverId;
                        that.deputyDriverValue = data.resultData.rescueBindVO.currDeputyDriverId;
                        that.changeDriver = true;
                    }
                }).catch(res => {
                    console.log(res)
                })
            },
            //提交绑定司机
            changeDriverSubmit() {
                let that = this;
                let drVo = {
                    rescueId: this.changeRescuePkId,
                    currMainDriverId: this.mainDriverValue,
                    currDeputyDriverId: this.deputyDriverValue
                };
                let data = {
                    'data': JSON.stringify(drVo)
                }
                this.$post("ltdCarRescue/updateBindInfo", data).then(data => {
                    if (data.code == 0) {
                        that.$message.error(data.msg);
                    } else {
                        //that.$router.go(0)
                        that.changeDriver = false;
                        that.initData();
                    }
                }).catch(res => {
                    console.log(res)
                })
            },
            delConfir(pkId) {
                let that = this;
                this.$confirm('此操作将该车辆删除吗？, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post("ltdCarRescue/delCarRescue", {pkId: pkId}).then(data => {
                        if (data.code == 0) {
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
            openUpload(){
                let that = this;
                this.bulkImport = true;
                that.clearUploadData();
            },
            clearUploadData(){
                this.upLoadFile=[];
                document.getElementById("uploadSuccess").style.display="none";
                document.getElementById("uploadFail").style.display="none";
            },
            downLoad(){
                window.location.href = this.common.CONSTANT.UPLOADIMGPATH + "download?downType=2"
            },
            submitUpload(){
                let that  =this;
                let company = this.common.fetchData("company");
                let data = new FormData();
                if(this.$refs.upload.uploadFiles.length) {
                    data.append("file", this.$refs.upload.uploadFiles[0].raw);
                    data.append("companyId", company['pkId'])
                    let config = {headers: {'Content-Type': 'multipart/form-data'}};
                    that.$axios.post(that.upLoadExcel, data, config).then(function (response) {
                        that.upLoadFile=[];
                        console.log(response);
                        let result = JSON.parse(response.data);
                        result = result.response
                        console.log(result);
                        if(result.flag && (result.flag == 1||result.flag == "1")){
                            that.$message.success("上传成功!");
                            let htmlText = "本次成功上传"+result.count+"条数据；";
                            that.initData();
                            document.getElementById("uploadSuccess").innerText=htmlText;
                            document.getElementById("uploadFail").style.display="none";
                            document.getElementById("uploadSuccess").style.display="inline";
                        }else{
                            that.$message.error(result.msg);
                            console.log(result.url);
                            if(result.url && result.url!=""){
                                document.getElementById("errExcel").href=result.url;
                                document.getElementById("uploadSuccess").style.display="none";
                                document.getElementById("uploadFail").style.display="inline";
                            }else{
                                document.getElementById("uploadSuccess").style.display="none";
                                document.getElementById("uploadFail").style.display="none";
                            }
                        }
                    }).catch(error => {
                        console.log("error", error);
                        that.$message.error("上传失败!")
                    });
                }else {
                    that.$message.error("请选择文件!")
                }
            },
        },

        mounted() {
            var _this = this;
            window.onresize = function() { // 定义窗口大小变更通知事件
                _this.screenHeight = document.documentElement.clientHeight // 窗口高度
            }
        }
    }
</script>

<style>

</style>
