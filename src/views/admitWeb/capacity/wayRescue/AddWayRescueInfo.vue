<template><!--小板车认证-->
	<div class="case">
		<Header></Header>
		<div class="content">
			<div class="content-in" :style="{height:((screenHeight-64-60-12-16)>730)?((screenHeight-64-60-12-16)+'px'):(730+'px')}">
				<div class="steps-box">
					<div class="steps">
						<el-steps :active="active" finish-status="success" process-status="finish" align-center>
							<el-step title="车辆信息添加"></el-step>
							<el-step title="司机信息添加"></el-step>
							<el-step title="专线信息登记"></el-step>
							<el-step title="运力资源认证"></el-step>
							<el-step title="认证成功"></el-step>
						</el-steps>
					</div>
				</div>

				<div class="capacity-case">
					<div class="manage-tip">
						<i class="el-icon-question"></i>
						<div class="manage-tip-txt">提交资料后，我们的工作人员会在三个工作日内完成审核。为保证贵司运单不受审核进度影响，请将贵司全部车辆信息一次性提交完成并仔细核对信息，以免因为反复的提交及审核造成不必要的损失，感谢您配合。</div>
					</div>
					<div class="car-way bigSmallBox">
						<div class="bigSmallBtn"><!-- -->

							<div class="car-choice"  v-if="common.fetchData('company').carrierType === 1">
								<el-radio v-model="radioType" label="1">大板车认证</el-radio>
								<el-radio v-model="radioType" label="2">小板车认证</el-radio>
							</div>
							<!--<div class="car-choice"></div>-->

							<div class="car-way-btn">
								<el-button @click="openUpload">批量导入</el-button>
								<el-button @click="addCarRescue=true" type="primary">添加车辆</el-button>
							</div>
						</div>

						<div class="car-tabs">
							<!--暂无车辆信息显示，默认car-way-nothing是隐藏的car-way-nothing里面的table只做显示用，有数据显示就执行下面的table-->
							<div class="car-way-nothing" v-if="showWayRescueTable1===1">
								<div class="car-way-no" style="top: 114px;">
									<i class="el-icon-warning"></i>
									<span>暂无车辆信息，请先导入或添加车辆信息</span>
								</div>
								<el-table
										border
										style="width: 100%;">
									<el-table-column
											width="60px"
											label="序号">
									</el-table-column>
									<el-table-column
											width="120px"
											label="所有人">
									</el-table-column>
									<el-table-column
											label="车牌号码">
									</el-table-column>
									<el-table-column
											label="种类">
									</el-table-column>
									<el-table-column
											label="板式">
									</el-table-column>
									<el-table-column
											label="运输许可证号">
									</el-table-column>
									<el-table-column
											label="保险详情">
									</el-table-column>
									<el-table-column
											label="创建时间">
									</el-table-column>
									<el-table-column
											label="操作">
									</el-table-column>
								</el-table>
							</div>

							<!--有数据显示的时候-->
							<div class="car-way-table" v-if="showWayRescueTable2===1">
								<el-table
										:data="tableData"
										border
										style="width: 100%">
									<el-table-column
											prop="orderNumber"
											label="序号"
											width="60">
										<template slot-scope="scope">
											{{scope.$index+1}}
										</template>
									</el-table-column>
									<el-table-column
											prop="dlBelongUser"
											label="所有人"
											width="200">
									</el-table-column>
									<el-table-column
											prop="dlPlateNo"
											label="车牌号码"
											width="130">
										<template slot-scope="scope">
											<span @click="carDetailsInfo=true,carDetailsInfoMobel=scope.row" class="car-way-blue">{{scope.row.dlPlateNo}}</span>
											<i class="car-yellow" v-if="scope.row.dlPlateType===1"></i>
											<i class="car-blue"  v-if="scope.row.dlPlateType===2"></i>
										</template>
									</el-table-column>
									<el-table-column
											prop="kind"
											label="种类"
											:formatter="formatKind"
											width="150">
									</el-table-column>
									<el-table-column
											prop="plateType"
											label="板式"
											:formatter="formatPlateType"
											width="150">
									</el-table-column>
									<el-table-column
											prop="rpNo"
											label="道路运输证号"
											width="150">
										<template slot-scope="scope">
                                                    <span @click="openTransportDetailsInfo(scope.row)"
														  class="car-way-blue">{{scope.row.rpNo}}</span>
										</template>
									</el-table-column>
									<el-table-column
											prop="insurance"
											label="保险详情"
											width="90">
										<template slot-scope="scope">
											<a @click="openInsuranceDetailsInfoModel(scope.row)" class="car-way-blue" href="javascript:;">查看</a>
										</template>
									</el-table-column>
									<el-table-column
											prop="createTime"
											label="创建时间"
											:formatter="this.common.formatterDateTime"
											width="170">
									</el-table-column>
									<el-table-column fixed="right" label="操作" width="180">
										<template slot-scope="scope">
											<el-button type="text" size="small" @click="uploadPapers=true,uploadCarRescuePkId=scope.row.pkId" v-if="scope.row.isUpPic!=1">上传证件</el-button>
											<el-button type="text" size="small" @click="addCarRescue=true,carRescuePkId=scope.row.pkId"  v-else>编辑</el-button>
											<el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
										</template>
									</el-table-column>
								</el-table>
							</div>

							<div class="car-way-page-btn">
								<el-button type="primary" @click="switchNextStep">下一步</el-button>
							</div>

						</div>
					</div>


				</div>

			</div>
		</div>
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
								:on-remove="handleRemove"
								:on-exceed="handleExceed"
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

		<!--&lt;!&ndash;批量导入弹窗&ndash;&gt;
		<el-dialog class="capacity-pop capacity-line" title="小板车批量导入" :visible.sync="bulkImport" width="40%" center>
			<div class="capacity-pop-in">
				<el-form :model="bulkImportRulesForm" :rules="bulkImportRules" ref="bulkImportRulesForm" label-width="80px" class="demo-ruleForm import-box">
					<el-form-item label="模板下载" >
						<el-upload
								class="upload-demo"
								action="https://jsonplaceholder.typicode.com/posts/"
								:on-preview="handlePreview"
								:on-remove="handleRemove"
								:before-remove="beforeRemove"
								multiple
								:limit="3"
								:on-exceed="handleExceed"
								:file-list="fileList">
							<el-button size="small" type="primary"><i class="import-icon el-icon-download"></i>下载批量导入模板</el-button>
							<div slot="tip" class="el-upload__tip">导入前请先下载批量导入模板，填写数据后进行导入操作</div>
						</el-upload>
					</el-form-item>
					<el-form-item label="选择文件" >
						<el-upload
								class="upload-demo"
								action="https://jsonplaceholder.typicode.com/posts/"
								:on-preview="handlePreview"
								:on-remove="handleRemove"
								:before-remove="beforeRemove"
								multiple
								:limit="3"
								:on-exceed="handleExceed"
								:file-list="fileList">
							<el-button size="small" type="primary">选择文件</el-button>
						</el-upload>
					</el-form-item>
					<el-form-item label="上传操作" >
						<el-upload
								class="upload-demo"
								action="https://jsonplaceholder.typicode.com/posts/"
								:on-preview="handlePreview"
								:on-remove="handleRemove"
								:before-remove="beforeRemove"
								multiple
								:limit="3"
								:on-exceed="handleExceed"
								:file-list="fileList">
							<el-button size="small" type="primary"><i class="import-icon el-icon-upload"></i>上传</el-button>
						</el-upload>
					</el-form-item>

					<div class="import-resul">
						<h5>上传结果说明</h5>
						<span>本次成功上传XX条数据；</span>
						<span>本次数据上传失败，具体失败原因请下载错误报告查看 <a href="javascript:;">下载错误报告</a> </span>
					</div>
					<div class="import-bottom">
						<el-button @click="bulkImport = false">取消保存</el-button>
						<el-button type="primary" @click="bulkImport = false">确认保存</el-button>
					</div>
				</el-form>
			</div>
		</el-dialog>-->

		<!--保险详情信息弹窗-->
		<el-dialog class="capacity-pop" title="保险详情信息" :visible.sync="insuranceDetailsInfo" width="55%" center>
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
							<span class="not-color" v-if="compulsory_insurance_imageUrl === '' && commercial_insurance_imageUrl=== ''">未上传</span>
							<img class="infoImg" v-if="compulsory_insurance_imageUrl" :src="compulsory_insurance_imageUrl" alt="">
							<img class="infoImg" v-if="commercial_insurance_imageUrl" :src="commercial_insurance_imageUrl" alt="">
							<!--<span class="not-color" v-if="insuranceDetailsInfoModel.isUploadInsur==false">未上传</span>-->
							<!--<span class="not-color" v-if="insuranceDetailsInfoModel.isUploadInsur==true">已上传</span>-->
						</el-form-item>
					</div>
				</el-form>
				<div class="import-bottom">
					<el-button type="primary" @click="insuranceDetailsInfo = false">确 定</el-button>
				</div>
			</div>
		</el-dialog>

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

		<SampleGraph :visible.sync="sampleImg" :sampleType="sampleType"></SampleGraph>

		<AddCarRescueDialog :visible.sync="addCarRescue" :carRescuePkId="carRescuePkId" :ctaliTypes="ctaliTypes"></AddCarRescueDialog> <!--title="救援车辆添加"-->
		<WayRescueDetailDialog :visible.sync="carDetailsInfo" :carDetailsInfoMobel="carDetailsInfoMobel" :ctaliTypes="ctaliTypes"></WayRescueDetailDialog> <!--title="救援车辆详情"-->
		<UploadCarRescueImg :visible.sync="uploadPapers" :uploadCarRescuePkId="uploadCarRescuePkId" :ctaliTypes="ctaliTypes"></UploadCarRescueImg> <!--title="上传证件"-->
	</div>
</template>

<script>
    import AddCarRescueDialog from './AddCarRescueDialog'
    import WayRescueDetailDialog from './WayRescueDetailDialog'
    import UploadCarRescueImg from './UploadCarRescueImg'
    import SampleGraph from '../../SampleGraph'  //示例图
    import Header from '../../../frame/HeaderCapacity'  //头部
    export default {
        components:{
            'AddCarRescueDialog':AddCarRescueDialog,
            'WayRescueDetailDialog':WayRescueDetailDialog,
			'UploadCarRescueImg':UploadCarRescueImg,
            'SampleGraph':SampleGraph,
            'Header':Header
        },
        inject:["reload"],
        data() {
            let addWayRescueInfo={};
            return {
                imgSrc: require("../../../../images/register/imgTest.jpg"),
                screenHeight: document.documentElement.clientHeight, // 屏幕高度
                active: 0, //步骤栏默认
                radioType:'2',//默认显示小板车
                activePop:0,
                value: '',
                pkId:'',
                carRescuePkId:'',
                uploadCarRescuePkId:'',
                currentRowInfo:'',
                activeNextPop:1,
                sampleImg: false,
                sampleType:'',
                fileList: [],
                car_front_45_imageUrl: '',   //车辆前45度
                car_front_45_imageUrl_type: '',
                car_front_45_imageUrl_name: '',
                driving_license_front_imageUrl: '',   //行驶证首页
                driving_license_front_imageUrl_type: '',
                driving_license_front_imageUrl_name: '',
                driving_license_second_imageUrl: '',   //行驶证副页
                driving_license_second_imageUrl_type: '',
                driving_license_second_imageUrl_name: '',
                driving_license_back_imageUrl: '',   //行驶证背页
                driving_license_back_imageUrl_type: '',
                driving_license_back_imageUrl_name: '',
                car_reg_cert_imageUrl: '', //机动车登记证书
                car_reg_cert_imageUrl_type: '',
                car_reg_cert_imageUrl_name: '',
                traffic_insurance_imageUrl: '', //交强险
                traffic_insurance_imageUrl_type: '',
                traffic_insurance_imageUrl_name: '',
                commercial_insurance_imageUrl: '', //商业险
                commercial_insurance_imageUrl_type: '',
                commercial_insurance_imageUrl_name: '',
                addWayRescueInfo,
                imageUrl: '',   //图片地址

                addCarRescue:false, //添加车辆弹窗
                action: this.common.CONSTANT.UPLOADIMGPATH + 'recognizeImage',
                upLoadExcel:this.common.CONSTANT.UPLOADIMGPATH+'/ltdCarRescue/importCarRescueByExcel',
                showWayRescueTable1:0, //无数据表格显示控制
                showWayRescueTable2:0, //有数据表格显示控制

                bulkImportRulesForm:{},//批量导入弹窗
                bulkImportRules:{},
                bulkImport: false, //批量导入弹窗
                uploadPapers:false,//上传证件弹窗


                carDetailsInfo: false,//车辆详情信息弹窗
                carDetailsInfoMobel: "",//车辆详情信息弹窗---数据绑定
                insuranceDetailsInfo:false, //保险详情信息弹窗
                insuranceDetailsInfoModel:"",//保险详情信息弹窗---数据绑定

                tableData :[],
                ctaliTypes:[], //保险种类
                imgObjectList:[],  //图片缓存
                upLoadFile:[],
                companyId:'',
                transportDetailsInfo: false,
                transportDetailsInfoModel: [],

                compulsory_insurance_imageUrl: "",// 交强险
                commercial_insurance_imageUrl: "",// 商业保险
            }
        },
        created:function(){
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
            this.initTableData();
            this.initSelectObj();
        },
        methods: {
            //初始化表格数据
            initTableData(){
                let that = this;
                this.$get("ltdCarRescue/queryAddCars",{companyId:that.companyId}).then(function (response) {
                    if(response.response && response.response.ltdCarRescues
                        && response.response.ltdCarRescues.length>0){
                        that.showWayRescueTable1 = 0;
                        that.showWayRescueTable2 = 1;
                        that.tableData=response.response.ltdCarRescues;
                    }else{
                        that.showWayRescueTable1 = 1;
                        that.showWayRescueTable2 = 0;
                    }

                });
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
            initSelectObj(){ //初始化
                let that = this;
                that.common.getBizConstants(that,"ctaliType","ctaliTypes");
            },
            pottingDefaultImg(form,srcImgList){ //填充默认的图片地址
                let that=this;
                let imgTypes=["car_front_45","driving_license_front","driving_license_second",
                    "driving_license_back","car_reg_cert","traffic_insurance","commercial_insurance","transport_license"];
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

            },
            openInsuranceDetailsInfoModel(row){ // 保险详情信息弹窗---数据绑定
                var that=this;
                this.insuranceDetailsInfoModel=row;
                that.compulsory_insurance_imageUrl = "";
                that.commercial_insurance_imageUrl = "";
                this.insuranceDetailsInfoModel.isUploadInsur=false;
                var data={companyId:this.companyId,extendId:row.pkId};
                that.$get("ltdCarRescue/queryInsurImg",data).then((response) => {
                    var data=response.response;
                    if (response.code != 1 ) {
                        that.$message.error(response.msg);
                    } else {
                        if(data!=null && data.companyImgList!=null && data.companyImgList.length>0){
                            let imgrefix = data.imgPrefix;
                            data.companyImgList.forEach(item=>{
                                if(item.imageMark == 'traffic_insurance'){
                                    that.compulsory_insurance_imageUrl = imgrefix + "/" + item.imagePath;
								}else if(item.imageMark == "commercial_insurance"){
                                    that.commercial_insurance_imageUrl = imgrefix + "/" + item.imagePath;
								}
                            });
						}
                    }
                    that.insuranceDetailsInfo = true;
                }).catch(() => {
                    that.$message.error('车辆详情查询失败.');
                    that.insuranceDetailsInfo = true;
                });


            },
            openTransportDetailsInfo(row) { //道路运输许可证详情
                this.transportDetailsInfoModel = row;
                let data={companyId:this.companyId,extendId:row.pkId};
                let that  = this;
                this.$get("ltdCarRescue/queryCarRescueImg",data).then((response) => {
                    let result=response.response;
                    if (response.code != 1 ) {
                        that.$message.error(response.msg);
                    } else {
                        if(result!=null && result.companyImgList!=null && result.companyImgList.length>0){
                            // that.transportDetailsInfoModel.transport_license_imageUrl=true;
                            that.pottingRescueImgs(this.transportDetailsInfoModel,result.companyImgList,that.common.CONSTANT.imagePrefix);
                        }
                    }
                    that.transportDetailsInfo = true;
                }).catch(() => {
                    that.$message.error('车辆详情查询失败.');
                    that.transportDetailsInfo = true;
                });
			},

            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpg';
                const isJPEG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isBMP = file.type === 'image/bmp';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG && !isJPEG && !isPNG && !isBMP) {
                    this.$message.error('上传图片只能是 JPG/PNG/BMP 格式!');
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                    return false;
                }
                return true;
            },

            handleRemove(file, fileList) {
                //console.log(file, fileList);
            },
            handlePreview(file) {
                //console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            /*************图片处理----end************/
            //添加车辆上一步操作
            prevStep(){
                this.activePop = 0;
            },
            //跳转到小板车认证
            goToSmallCerVerify(){
                console.info("adsasd")

            },
            //上传证件
            handleClick(index,row) {
                console.log(index,row);
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
                        if(result.flag && (result.flag == "1" || result.flag == 1)){
                            that.$message.success("上传成功!");
                            let htmlText = "本次成功上传"+result.count+"条数据；";
                            that.initTableData();
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
            //删除
            handleDelete(index, row) {
                let that=this;
                that.$confirm('车辆信息删除后无法恢复,需要重新添加,确定要删除当前车辆信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$post("ltdCarRescue/delCarRescue",{"pkId":row.pkId}).then(function (res) {
                        if(res && res.code==1 && res.response>0){
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                        that.reload();
                    });

                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            formatPlateType:function(row,column){ //板式列
                var data="";
                var srcData=row[column.property];
                switch (srcData){
                    case 1:data="开放式";break;
                    case 2:data="封闭式";break;
                    case 3:data="半封闭";break;
                    default :data="";
                }
                return data;
            },
            formatKind:function(row,column){ //种类列
                var data="";
                var srcData=row[column.property];
                switch (srcData){
                    case 1:data="落地板";break;
                    case 2:data="半落地";break;
                    default :data="";
                }
                return data;
            },

            switchNextStep:function(){
                let that=this;
				let carrierType=this.common.fetchData("company").carrierType;//1  轿运、2救援
				let carHeadlength = 0;
                let carTrailerlength= 0;
                if(this.tableData.length<1 ){
                    that.$message.error("【小板车辆】至少认证一项");
                    return;
                }
                if(carrierType == 1){
                    that.$get("ltdCarHeadstock/getAll", {"offset": 0, "limit": 100}).then(function (response) {//前车
                        carHeadlength = response.response.length;
                        that.$get("ltdCarTrailer/getAll", {"offset": 0, "limit": 100}).then(function (response) {//后挂
                            carTrailerlength = response.response.length;
							if(carHeadlength == 0 && carTrailerlength == 0){
                                that.$confirm('【牵引车 中置轴前车】、【半挂车 中置轴后挂】至少认证一项,点击确认跳转到大板车', '提示', {confirmButtonText: '确定',
                                }).then(() => {
                                    that.$router.push('/admitWeb/capacity/carTransport/addBigCarTransportInfo');
                                }).catch(() => {});
							}else if(carHeadlength > 0 && carHeadlength == 0){
                                that.$confirm('您还有 【半挂车、中置轴后挂】信息未填写，确认要跳过车辆信息认证？', '提示', {confirmButtonText: '确定',
                                }).then(() => {
                                    that.jumpNext();
                                }).catch(() => {});
							}else if(carHeadlength == 0 && carHeadlength > 0){
                                that.$confirm('您还有您还有【牵引车 中置轴前车】信息未填写，确认要跳过车辆信息认证？', '提示', {confirmButtonText: '确定',
                                }).then(() => {
                                    that.jumpNext();
                                }).catch(() => {});
							}else{
                                that.jumpNext();
							}
                        })
                    })
				}else{
                    this.jumpNext();
				}
            },
			jumpNext(){//跳转下一步
                let that=this;
                this.$get("ltdCarRescue/switchNextStep",{companyId:that.companyId,step:6}).then((response) => {
                    if (response.code == 0) {
                        that.$message.error(response.msg);
                    } else {
                        this.$router.push('/admitWeb/capacity/carTransport/addCarTransportDriverInfo');
                    }
                }).catch(() => {
                    that.$message.error('切换到下一步失败');
                });
			}

        },mounted() {
            var _this = this;
            window.onresize = function() { // 定义窗口大小变更通知事件
                _this.screenHeight = document.documentElement.clientHeight // 窗口高度
            }
        }, watch : {
            radioType:function (e) {
                if(e==1){
                    this.$router.push('/admitWeb/capacity/carTransport/addBigCarTransportInfo')
                }

            }
        }
    }
</script>

<style>
	.header img {
		float: left;
		margin-top: 20px;
	}
</style>
