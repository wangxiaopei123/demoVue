<template>
	<div class="transportlicence">
		<h2 class="manage-title">道路运输经营许可证</h2>
		<div class="manage-tip">
			<i class="el-icon-question"></i>
			<div class="manage-tip-txt"><!--<span>{{checkAdvice}}。</span>-->道路运输经营许可证已通过运车管家认证审核,如需变更信息，您可以通过<a href="javascript:;" @click="editTransporInfo">修改认证信息</a>重新提交认证信息进行变更审核。变更审核过程中，
				为了保证您的正常使用，依旧会使用您之前提交的已通过的认证信息，变更审核通过之后，我们将会使用新的认证信息。</div>
		</div>

		<el-form :model="ruleForm" :rules="rules" ref="ruleForm"
				 label-position="right" label-width="150px"
				 size="mini">
			<h2 class="info-title">证件信息</h2>
			<el-form-item class="required_flag" label="业户名称：">
				{{ruleForm.licenseName}}
			</el-form-item>
			<el-form-item class="required_flag" label="许可字号：">
				{{ruleForm.licenseNo}}
			</el-form-item>
			<el-form-item class="required_flag" label="证件有效期：">
				{{ruleForm.licenseCardtime}}
			</el-form-item>
			<el-form-item  label="道路运输经营许可证" class="required_flag">
				<img :src="transport_license_imageUrl"
					 :imageType="transport_license_imageUrl_type"
					 :imgName="transport_license_imageUrl_name" class="avatar imgSet">

			</el-form-item>
		</el-form>
	</div>
</template>

<script>

	export default {
		created() {
			this.getTransportLicense();

		},
		data() {
			return {
				companyId: "",
				checkAdvice:"",
				causeFailure:"",
				page: 1,
				imageUrl: '',
				ruleForm: {},
				rules: {},
				ruleInfoForm:{},
				rulesInfo:{}
			}
		},

		methods:{
			editTransporInfo(){
				this.$router.push({
					path: '/transportlicence_check',
					name: 'Transportlicence_Check',
					params: {
						"flag": 1
					}
				});
//				this.$router.push('/transportlicence_check');
			},
			getTransportLicense() {
				let data = new FormData();
				let that = this;
				this.$get("transport/getTransportLicense",data).then(function (response) {
					that.ruleForm=response.resultData.ltdCompanyTransportLicense
					that.companyId = response.resultData.ltdCompanyTransportLicense.companyId;
					that.ruleForm.licenseCardtime=that.dataFormat(new Date(response.resultData.ltdCompanyTransportLicense.licenseCardtime));
					if(response.resultData.ltdCompanyTransportLicense.imagePath != null){
						that.transport_license_imageUrl =that.common.CONSTANT.imagePrefix+response.resultData.ltdCompanyTransportLicense.imagePath;
					}

				}).catch(error => {
					console.log("error",error);
					that.$message.error("获取信息失败!")
				});
			},

			submitForm(){
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						let ltdCompanyVO = {
							"pkId":this.ruleForm.pkId,
							"legalPersonPhone": this.ruleForm.legalPersonPhone,
							"regPhone":this.ruleForm.regPhone,
							"agentId":this.ruleForm.agentId,
						};
						this.$post('identification/saveLtdCompanyDetail',ltdCompanyVO).then((response) => {
						}).catch(()=>{
							this.$message.error('消息加载失败');
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
			dataFormat(time){
				return `${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()}`;
			}


		}

	}
</script>

<style scoped>
</style>
