<template>
	<div>
		<h2 class="manage-title">实名认证</h2>
		<div class="manage-tip" v-if="page === 3">

			<i class="el-icon-question"></i>
			<div class="manage-tip-txt">
				<!--	<span>{{checkAdvice}}</span> -->
				<span>您已成功提交认证信息，请您耐心等待审核结果。</span>
				<br>
				我们的审核时间为三个工作日，遇法定节假日顺延，审核结果我们会以系统消息的方式告知您。 客户服务电话：4006 556 756
			</div>
		</div>
		<div class="manage-tip manage-error" v-if="page ===4">
			<i class="el-icon-warning"></i>

			<div class="manage-tip-txt" >
				<span><b>！</b>您提交的认证资料有误，请核对后<a href="javasript:"  @click="editCompany">重新认证</a>！</span>
				<br>
				失败原因如下：
				<br>
				<!--	{{causeFailure}}  -->
				<p v-for="lincese in suggestBusineAdvice" >
					{{ lincese }}
				</p>
			</div>
		</div>
		<div class="steps-box marginTopBottom0">
			<div class="steps steps-step">
				<el-steps :active="nexPage" finish-status="success" process-status="finish" align-center>
					<el-step title="1.变更认证信息"></el-step>
					<el-step title="2.认证信息审核"></el-step>
					<el-step title="3.认证成功"></el-step>
				</el-steps>
			</div>
		</div>
		<el-row class="manage-com">
			<el-col :span="24">
				<div v-if="page === 1">
					<el-form :model="companyCardForm" :rules="companyCardRules" ref="companyCardForm" label-position="right"
							 label-width="150px" size="mini">
						<h2 class="info-title">基本信息</h2>
						<div class="info-item info-other clear">
							<el-form-item label="" prop="name" class="hidden">
								<el-input v-model="companyCardForm.pkId" ></el-input>
							</el-form-item>
							<el-form-item label="" prop="name" class="hidden">
								<el-input v-model="companyCardForm.agentId" ></el-input>
							</el-form-item>
							<el-form-item label="企业名称" prop="name">
								<el-input v-model="companyCardForm.name"></el-input>
							</el-form-item>
							<el-form-item label="统一社会信用代码" prop="creditCode">
								<el-input v-model="companyCardForm.creditCode"></el-input>
							</el-form-item>
							<el-form-item label="营业执照" class="required_flag">
								<!--<el-upload class="avatar-uploader" action="action" :show-file-list="false"-->
								<!--:on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">-->
								<!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
								<!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
								<!--</el-upload>-->
								<div class="upload_box">
									<el-upload
											class="avatar-uploader"
											name="business_license"
											:action="action"
											:show-file-list="false"
											:http-request="requestUpload"
											:before-upload="common.beforeAvatarUpload"
											:on-success="handleAvatarSuccess">
										<img v-if="business_license_imageUrl" :src="business_license_imageUrl"
											 :imageType="business_license_imageUrl_type" :imgName="business_license_imageUrl_name"
											 :imgId="business_license_imageUrl_id"
											 class="avatar imgSet">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
									<div class="check_eg" @click="sampleImg = true,sampleType = '26'">查看示例</div>
								</div>
							</el-form-item>
						</div>
						<h2 class="info-title">法定代表人证件</h2>
						<div class="info-item info-other clear">
							<el-form-item label="委托人身份证" class="required_flag">
								<div class="upload_box">
									<span class="tit_tit">个人信息页</span>
									<el-upload
											class="avatar-uploader"
											name="legal_id_card_front"
											:action="action"
											:show-file-list="false"
											:http-request="requestUpload"
											:before-upload="common.beforeAvatarUpload"
											:on-success="handleAvatarSuccess">
										<img v-if="legal_id_card_front_imageUrl" :src="legal_id_card_front_imageUrl"
											 :imageType="legal_id_card_front_imageUrl_type" :imgName="legal_id_card_front_imageUrl_name"
											 :imgId="legal_id_card_front_imageUrl_id"
											 class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
									<div class="check_eg" @click="sampleImg = true,sampleType = '6'">查看示例</div>
								</div>
								<div class="upload_box">
									<span class="tit_tit">国徽页</span>
									<el-upload
											class="avatar-uploader"
											name="legal_id_card_back"
											:action="action"
											:show-file-list="false"
											:http-request="requestUpload"
											:before-upload="common.beforeAvatarUpload"
											:on-success="handleAvatarSuccess">
										<img v-if="legal_id_card_back_imageUrl" :src="legal_id_card_back_imageUrl"
											 :imageType="legal_id_card_back_imageUrl_type" :imgName="legal_id_card_back_imageUrl_name"
											 :imgId="legal_id_card_back_imageUrl_id"
											 class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
									<div class="check_eg" @click="sampleImg = true,sampleType = '7'">查看示例</div>
								</div>
								<div class="upload_box">
									<span class="tit_tit">手持身份证</span>
									<el-upload
									class="avatar-uploader"
									name="legal_hand"
									:action="action"
									:show-file-list="false"
									:http-request="requestUpload"
									:before-upload="common.beforeAvatarUpload"
									:on-success="handleAvatarSuccess">
									<img v-if="legal_hand_imageUrl" :src="legal_hand_imageUrl"
									 :imageType="legal_hand_imageUrl_type" :imgName="legal_hand_imageUrl_name"
									 :imgId="legal_hand_imageUrl_id"
									 class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
									<div class="check_eg" @click="sampleImg = true,sampleType = '8'">查看示例</div>
								</div>
							</el-form-item>
						</div>
						<el-form-item>
							<el-button @click="$router.back(-1)">返回</el-button>
							<el-button type="primary" @click="submitCompanyCardForm('companyCardForm')">下一页</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div v-if="page === 2">
					<div>
						<el-form :model="companyCardForm" :rules="companyInfoRules" ref="companyInfoForm" label-position="right"
								 label-width="150px" size="mini">
							<h2 class="info-title">基本信息</h2>
							<div class="info-item info-other clear">
								<el-form-item label="企业名称：" prop="name">
									<!---验证时加上（ prop="name" ） -->
									<el-input v-model="companyCardForm.name"></el-input>
								</el-form-item>
								<el-form-item label="统一社会信用代码：" prop="creditCode">
									<el-input v-model="companyCardForm.creditCode"></el-input>
								</el-form-item>
								<el-form-item label="企业简称：">
									<el-input v-model="companyCardForm.nameShort"></el-input>
								</el-form-item>
								<el-form-item label="企业类型：" prop="attribute">
									<el-select v-model="companyCardForm.attribute" placeholder="请选择">
										<el-option
												v-for="item in attributeOptions"
												:key="item.value"
												:label="item.label"
												:value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="注册地址：" prop="regAddress">
									<el-input type="textarea" placeholder="请输入内容" v-model="companyCardForm.regAddress"></el-input>
								</el-form-item>
								<el-form-item label="经营范围：" prop="businessScope">
									<el-input type="textarea" placeholder="请输入内容" v-model="companyCardForm.businessScope"></el-input>
								</el-form-item>
								<el-form-item label="营业期限：" prop="businessTerm">
									<el-date-picker :readonly="businessTermRD" v-model="companyCardForm.businessTerm" type="date" placeholder="选择日期">
									</el-date-picker>
									<el-checkbox @change="businessTermCK">长期</el-checkbox>
								</el-form-item>
								<el-form-item label="注册资本：" prop="regCapital">
									<el-input v-model="companyCardForm.regCapital"></el-input>
								</el-form-item>
							</div>
							<h2 class="info-title">法定代表人信息</h2>
							<div class="info-item info-other clear">
								<el-form-item label="法定代表人姓名：" prop="legalPersonName">
									<el-input v-model="companyCardForm.legalPersonName"></el-input>
								</el-form-item>
								<el-form-item label="身份证号：" prop="legalPersonCard">
									<el-input v-model="companyCardForm.legalPersonCard"></el-input>
								</el-form-item>
								<el-form-item label="证件有效期：" prop="legalPersonCardtime">
									<el-date-picker :readonly="legalPersonCardtimeRD" v-model="companyCardForm.legalPersonCardtime" type="date" placeholder="选择日期">
									</el-date-picker>
									<el-checkbox @change="legalPersonCardtimeCK">长期</el-checkbox>
								</el-form-item>
								<el-form-item label="联系电话：" prop="legalPersonPhone">
									<el-input v-model="companyCardForm.legalPersonPhone"></el-input>
								</el-form-item>
							</div>
							<el-form-item>
								<el-button @click="page = 1,nexPage=1">上一步</el-button>
								<el-button type="primary" @click="submitcompanyInfoForm('companyInfoForm')">下一步
								</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
				<div v-if="page === 3 || page===4">
					<el-form :model="companyCardForm" :rules="companyInfoViewRules" ref="companyInfoView" label-position="right"
							 label-width="150px" size="mini">
						<h2 class="info-title">基本信息</h2>
						<div class="info-item info-other clear">
							<el-form-item label="企业名称：" prop="name" class="required_flag">
								<!---验证时加上（ prop="name" ） -->
								{{companyCardForm.name}}
							</el-form-item>
							<el-form-item label="统一社会信用代码：" prop="creditCode" class="required_flag">
								{{companyCardForm.creditCode}}
							</el-form-item>
							<el-form-item label="企业简称：" class="required_flag">
								{{companyCardForm.nameShort}}
							</el-form-item>
							<el-form-item label="企业类型：" prop="attribute" class="required_flag">
								{{companyCardForm.attribute}}
							</el-form-item>
							<el-form-item label="注册地址：" prop="regAddress" class="required_flag">
								{{companyCardForm.regAddress}}
							</el-form-item>
							<el-form-item label="经营范围：" prop="businessScope" class="required_flag">
								{{companyCardForm.businessScope}}
							</el-form-item>
							<el-form-item label="营业期限：" prop="businessTerm" class="required_flag">
								{{businessTerm}}
							</el-form-item>
							<el-form-item label="注册资本：" prop="regCapital" class="required_flag">
								{{companyCardForm.regCapital}}
							</el-form-item>
						</div>
						<h2 class="info-title">法定代表人信息</h2>
						<div class="info-item info-other clear">
							<el-form-item label="法定代表人姓名：" prop="legalPersonName" class="required_flag">
								{{companyCardForm.legalPersonName}}
							</el-form-item>
							<el-form-item label="身份证号：" prop="legalPersonCard" class="required_flag">
								{{companyCardForm.legalPersonCard}}
							</el-form-item>
							<el-form-item label="证件有效期：" prop="legalPersonCardtime" class="required_flag">
								{{legalPersonCardtime}}
							</el-form-item>
							<el-form-item label="联系电话：" prop="legalPersonPhone" class="required_flag">
								{{companyCardForm.legalPersonPhone}}
							</el-form-item>
						</div>
						<el-form-item v-if="checkStatus === 'error'">
							<el-button type="primary" @click="editCompany">重新认证
							</el-button>
						</el-form-item>
					</el-form>
				</div>


			</el-col>
			<!-- <el-col :span="8">
				<div class="grid-content bg-purple"></div>
			</el-col> -->
		</el-row>
		<SampleGraph :visible.sync="sampleImg" :sampleType="sampleType"></SampleGraph>
	</div>
</template>

<script>
	import SampleGraph from '../../admitWeb/SampleGraph'
	import common from "../../../common/common";
	export default {
		components: {
			'SampleGraph':SampleGraph
		},
		created() {
			this.getCompanyDetail();

		},

		data() {
			let suggest = [];
			let suggestBusineAdvice = [];
			return {
				businessTermRD: false,
				legalPersonCardtimeRD: false,
				sampleImg: false,
				sampleType:'',
				attributeOptions: [{
					value: 1,
					label: '有限责任公司'
				}, {
					value: 2,
					label: '股份有限公司'
				}, {
					value: 3,
					label: '国有企业'
				}, {
					value: 4,
					label: '个人独资企业'
				}, {
					value: 5,
					label: '集体所有制'
				}, {
					value: 6,
					label: '合伙企业'
				}, {
					value: 7,
					label: '外商投资企业'
				}, {
					value: 8,
					label: '联营企业'
				}, {
					value: 9,
					label: '独营企业'
				}],
				flag:"",
				legalPersonCardtime:"",
				businessTerm:"",
				nexPage:1 ,
				checkStatus:"",
				companyId:"",
				checkAdvice:"",
				causeFailure:"",
				action:this.common.CONSTANT.UPLOADIMGPATH+"recognizeImage",
				id: this.$route.params.msgKey,
				companyImgList:[],
				business_license_imageUrl: '',
				business_license_imageUrl_type: '',
				business_license_imageUrl_name: '',
				legal_id_card_front_imageUrl:'',
				legal_id_card_front_imageUrl_type:'',
				legal_id_card_front_imageUrl_name:'',
				legal_id_card_back_imageUrl:'',
				legal_id_card_back_imageUrl_type:'',
				legal_id_card_back_imageUrl_name:'',
				legal_hand_imageUrl:'',
				legal_hand_imageUrl_type:'',
				legal_hand_imageUrl_name:'',
				business_license_imageUrl_id:'',
				legal_id_card_front_imageUrl_id:'',
				legal_id_card_back_imageUrl_id:'',
				legal_hand_imageUrl__id:'',
				page: 1,
				companyCardForm: {
					name: "",
					creditCode: ""
				},
				companyCardRules: {
					name: {
						required: true,
						message: '此项不能为空',
						trigger: 'blur'
					},
					creditCode: {
						required: true,
						message: '此项不能为空',
						trigger: 'blur'
					}
				},
				rules:{
					legalPersonPhone:{
						required: true,
						message: '此项不能为空',
						trigger: 'blur'
					}
				},
				companyInfoForm: {
					name: "",
					creditCode: "",
					nameShort: "",
					attribute: "",
					regAddress: "",
					businessScope: "",
					businessTerm: "",
					regCapital: "",
					legalPersonName: "",
					legalPersonCard: "",
					legalPersonCardtime: "",
					legalPersonPhone: "",
				},
				companyInfoRules: {
					name: {
						required: true,
						message: '此项不能为空',
						trigger: 'blur'
					},
					creditCode: {
						required: true,
						message: '此项不能为空',
						trigger: 'blur'
					},
					nameShort: {
						required: true,
						message: '此项不能为空',
						trigger: 'blur'
					},
					attribute: {
						required: true,
						message: '此项不能为空',
						trigger: 'blur'
					},
					regAddress: {
						required: true,
						message: '此项不能为空',
						trigger: 'blur'
					},
					businessScope: {
						required: true,
						message: '此项不能为空',
						trigger: 'blur'
					},
					businessTerm: {
						required: true,
						message: '此项不能为空',
						trigger: 'blur'
					},
					regCapital: {
						required: true,
						message: '此项不能为空',
						trigger: 'blur'
					},
					legalPersonName: {
						required: true,
						message: '此项不能为空',
						trigger: 'blur'
					},
					legalPersonCard: {
						required: true,
						message: '此项不能为空',
						trigger: 'blur'
					},
					legalPersonCardtime: {
						required: true,
						message: '此项不能为空',
						trigger: 'blur'
					},
					legalPersonPhone: {
						required: true,
						message: '此项不能为空',
						trigger: 'blur'
					},
				},
				companyInfoView: {
					name: "",
					creditCode: "",
					nameShort: "",
					attribute: "",
					regAddress: "",
					businessScope: "",
					businessTerm: "",
					regCapital: "",
					legalPersonName: "",
					legalPersonCard: "",
					legalPersonCardtime: "",
					legalPersonPhone: "",
				},
				companyInfoViewRules: {

				}
			}
		},
		methods: {
			/*******上传图片方法**start******/
			handleAvatarSuccess(res, file) {
				let data = JSON.parse(res.data);
				let imageType = data['resultData']['imageType'];
				let imageTypeValue = data['resultData']['imageTypeValue'];
				let filePath = data['resultData']['filePath'];
				let imageUrl = imageType + "_imageUrl";
				let imageUrlType = imageUrl + "_type";
				let imageUrlName = imageUrl + "_name";
				let attrs = data['resultData']['attrs'];
				this[imageUrl] = filePath;
				this[imageUrlType] = imageTypeValue;
				this[imageUrlName] = file.name;
				if ("business_license" === imageType) { //营业执照
					if (attrs) {
						this.companyCardForm.name = attrs['businessName'];
//                      if (!this.ruleForm.name) this.ruleForm.name = ltdCompany.name;
						this.companyCardForm.creditCode = attrs['businessRegName'];
						//                    if (!this.ruleForm.creditCode && ltdCompany.creditCode) this.ruleForm.creditCode = ltdCompany.creditCode;
						this.companyCardForm.regAddress = attrs['businessAddress'];
						this.companyCardForm.businessScope = attrs['businessScope'];
						this.companyCardForm.businessTerm = attrs['businessValidPeriod'];
						this.companyCardForm.regCapital = attrs['businessCaptial'];
					}
				} else if ("legal_id_card_front" === imageType) { //法人身份证个人信息页
					if (attrs) {
						this.companyCardForm.legalPersonName = attrs['idName'];
						this.companyCardForm.legalPersonCard = attrs['idNumber'];
					}
				} else if ("legal_id_card_back" === imageType) { //法人身份证国徽页
					if (attrs) {
						if (attrs['idValidity'])
							this.companyCardForm.legalPersonCardtime = attrs['idValidity'].split('-')[1].trim().replace(/\./g,'-');
					}
				}
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
		businessTermCK(ck) {
			if (ck) {
				this.businessTermRD = true;
				this.companyCardForm.businessTerm = '2119-01-01 00:00:00';
			} else {
				this.businessTermRD = false;
				this.companyCardForm.businessTerm = '';
			}
		},
			legalPersonCardtimeCK(ck) {
				if (ck) {
					this.legalPersonCardtimeRD = true;
					this.companyCardForm.legalPersonCardtime = '2119-01-01 00:00:00';
				} else {
					this.legalPersonCardtimeRD = false;
					this.companyCardForm.legalPersonCardtime = '';
				}
			},
			editCompany:function(){
				this.nexPage = 1;
				this.page=1;

			},
			/*******上传图片方法**end******/
			/**
			 * 提交企业证件表单
			 */
			submitCompanyCardForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.page = 2;
						this.nexPage = 2;
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
			requestUpload(obj) {
				//			alert(this.companyId);
				obj.companyId = this.companyId;
				this.common.uploadImgFun(obj,this);
			},
			getCompanyDetail() {
				let data = new FormData();
				let that = this;
				this.$get("identification/getLtdCompanyDetail",data).then(function (response) {

					if(response.code ==1){
						that.companyImgList =response.data;
						that.ruleForm=response.resultData.ltdCompanyDetail;
						//     alert(response.resultData.ltdCompanyDetail.pkId);
						that.companyId=response.resultData.ltdCompanyDetail.pkId;
						that.businessTerm= that.dataFormat(new Date(response.resultData.ltdCompanyDetail.businessTerm));
						that.legalPersonCardtime=that.dataFormat(new Date(response.resultData.ltdCompanyDetail.legalPersonCardtime));
						that.suggest =response.resultData.bizList;
						that.flag = that.$route.params['flag']
						if(that.flag != 1) {
							if (response.resultData.ltdCompanyDetail.verifyStatus == 1
									&& response.resultData.ltdCompanyDetail.status == 1
							) {
								that.$router.push('/realname');
								that.checkAdvice = "审核通过"
								//                                  document.getElementById("check").style.display="none";
							} else if (response.resultData.ltdCompanyDetail.verifyStatus == 0
									|| response.resultData.ltdCompanyDetail.status == 0) {
//                                      document.getElementById("check").style.display="none";
								that.checkAdvice = "审核中"
								that.page = 3;
								that.checkStatus = 'success'
								that.nexPage = 2;

							} else if (response.resultData.ltdCompanyDetail.verifyStatus == 3
									|| response.resultData.ltdCompanyDetail.status == 3) {
								that.checkAdvice = "待审核";
								that.checkStatus = 'success'
								that.nexPage = 2;
								that.page = 3;

							} else {
								that.checkAdvice = "审核没有通过";
								that.page = 4;
								that.checkStatus = 'error'
								that.nexPage = 2;
								//                               that.causeFailure=response.resultData.causeFailure
								let bp = [];
								if (that.suggest) {
									that.suggest.forEach(function (t) {
										bp.push(t.name);

									});
									that.suggestBusineAdvice = bp;

								}
							}
						}
						if(that.companyImgList.length > 0 ){
							that.companyImgList.forEach(function(image){
								let imageType = image['imageMark'];
								let imagePath = imageType+"_imageUrl";
								let imageId = imageType + "_imageUrl"+"_id"
								that[imagePath] = that.common.CONSTANT.imagePrefix+image['imagePath'];
								that[imageId]=image['pkId'];
							})
						}
						that.companyCardForm=response.resultData.ltdCompanyDetail
						// that.$message.info("获取数据成功!")
					}else{
						that.$message.error("获取信息失败!")
					}

				}).catch(error => {
					console.log("error",error);
					that.$message.error("获取信息失败!")
				});
			},
			dataFormat(time){
				return `${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()}`;
			},
			submitForm(){
				let that = this;
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						let ltdCompanyVO = {
							"pkId":this.ruleForm.pkId,
							"legalPersonPhone": this.ruleForm.legalPersonPhone,
							"regPhone":this.ruleForm.regPhone,
							"agentId":this.ruleForm.agentId,
						};
						this.$post('identification/saveLtdCompanyDetail',ltdCompanyVO).then((response) => {

							if(response.code ==1){
								that.$message.info("保存成功!");
							}else{
								that.$message.error("获取信息失败!");
							}
						}).catch(error=>{
							console.log("error",error);
							this.$message.error('消息加载失败');
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
			/**
			 * 提交企业信息表单
			 */
			submitcompanyInfoForm(formName) {
				let that = this;
				// this.$refs.ruleForm.validate((valid) => {
				// 	if (valid) {
				let imageValid = true;
				if (!this['legal_id_card_front_imageUrl'] || !this['legal_id_card_back_imageUrl'] || !this['legal_hand_imageUrl']) {
					this.$message.info("法人身份证照片上传不全");
					imageValid = false;
				}
				if (!this['business_license_imageUrl']) {
					this.$message.info("营业执照没有上传");
					imageValid = false;
				}

				if (!imageValid) {
					return false;
				}
				let companyImgList = [];
				if (this['business_license_imageUrl']) { //营业执照
					companyImgList.push(
							{

								imageName : this['business_license_imageUrl_name'],
								imagePath : this['business_license_imageUrl'],
								type : this['business_license_imageUrl_type'],
								pkId:this['business_license_imageUrl_id'],
								imageStatus : 0,
								imageMark : 'business_license'
							}
					)
				}
				if (this['legal_id_card_front_imageUrl']) { //法人身份证个人信息页
					companyImgList.push(
							{

								imageName : this['legal_id_card_front_imageUrl_name'],
								imagePath : this['legal_id_card_front_imageUrl'],
								type : this['legal_id_card_front_imageUrl_type'],
								pkId:this['legal_id_card_front_imageUrl_id'],
								imageStatus : 0,
								imageMark : 'legal_id_card_front'
							}
					)
				}
				if (this['legal_id_card_back_imageUrl']) { //法人身份证国徽页
					companyImgList.push(
							{

								imageName : this['legal_id_card_back_imageUrl_name'],
								imagePath : this['legal_id_card_back_imageUrl'],
								type : this['legal_id_card_back_imageUrl_type'],
								pkId:this['legal_id_card_back_imageUrl_id'],
								imageStatus : 0,
								imageMark : 'legal_id_card_back'
							}
					)
				}
				if (this['legal_hand_imageUrl']) { //法人手持身份证
					companyImgList.push(
							{

								imageName : this['legal_hand_imageUrl_name'],
								imagePath : this['legal_hand_imageUrl'],
								type : this['legal_hand_imageUrl_type'],
								pkId:this['legal_hand_imageUrl_id'],
								imageStatus : 0,
								imageMark : 'legal_hand'
							}
					)
				}
				let ltdCompanyVO = {
					"pkId":that.companyCardForm.pkId,
					"name": that.companyCardForm.name,
					"creditCode":that.companyCardForm.creditCode,
					"nameShort":that.companyCardForm.nameShort,
					"attribute":that.companyCardForm.attribute,
					"regAddress": that.companyCardForm.regAddress,
					"businessScope": that.companyCardForm.businessScope,
					"businessTerm": that.companyCardForm.businessTerm,
					"regCapital"  : that.companyCardForm.regCapital,
					"legalPersonName"  : that.companyCardForm.legalPersonName,
					"legalPersonCard"  : that.companyCardForm.legalPersonCard,
					"legalPersonCardtime"  : that.companyCardForm.legalPersonCardtime,
					"legalPersonPhone"  : that.companyCardForm.legalPersonPhone,
					"companyImgList": companyImgList,
					"agentId":that.companyCardForm.agentId
				};
				let data = {
					"data": JSON.stringify(ltdCompanyVO),
				};
				that.$post('identification/updateLtdCompanyDetail',data).then((response) => {
					if(response.code ==1){
						this.page = 3;
						that.nexPage = 2;
						that.$message.info("保存数据成功!")
					}else{
						that.$message.error("保存信息失败!")
					}
				}).catch(()=>{
					that.$message.error('消息加载失败');
				});
				// }
				// });

			},

		}
	}
</script>

<style scoped>
	.info-other .el-upload__tip {
		top:-7px;
	}

	.hidden {
		display:none;
	}
</style>
