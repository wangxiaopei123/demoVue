<template>
	<div class="realname">
		<h2 class="manage-title">实名认证</h2>
		<div class="manage-tip">
			<i class="el-icon-question"></i>
			<div class="manage-tip-txt">
				企业实名认证已通过运车管家认证审核。<span><!--{{checkAdvice}}--></span>如需变更企业认证信息，您可以通过<a href="javascript:" @click="editCompanyInfo">修改认证信息</a>重新提交认证信息进行变更审核。变更审核过程中，为了保证您的正常使用，依旧会使用您之前提交的已通过的认证信息，变更审核通过之后，我们将会使用新的认证信息。</div>
		</div>

		<el-row class="manage-info manage-com">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right" label-width="150px" size="mini">
				<h2 class="info-title">基本信息</h2>
				<div class="info-item clear">
					<el-form-item label="" prop="" class="hidden">
						{{ruleForm.pkId}}
					</el-form-item>
					<el-form-item label="" prop="" class="hidden">
						{{ruleForm.agentId}}
					</el-form-item>
					<el-form-item label="企业名称：" prop="" class="required_flag">
						{{ruleForm.name}}
					</el-form-item>
					<el-form-item label="企业简称：" class="required_flag">
						{{ruleForm.nameShort}}
					</el-form-item>
					<el-form-item label="统一社会信用代码：" class="required_flag">
						{{ruleForm.creditCode}}
					</el-form-item>
					<el-form-item label="企业类型：" class="required_flag">
						{{ruleForm.attributeName}}
					</el-form-item>
					<el-form-item label="营业期限：" class="required_flag">
						{{businessTerm}}
					</el-form-item>
					<el-form-item label="注册资本：" class="required_flag">
						{{ruleForm.regCapital}}
					</el-form-item>
					<el-form-item label="注册地址：" class="required_flag">
						{{ruleForm.regAddress}}
					</el-form-item>
					<el-form-item label="注册电话：">
						<el-input v-model="ruleForm.regPhone">
							{{ruleForm.regPhone}}
						</el-input>
					</el-form-item>
				</div>


				<h2 class="info-title">法人信息</h2>
				<div class="info-item clear">
					<el-form-item label="委托人姓名：" class="required_flag">
						{{ruleForm.legalPersonName}}
					</el-form-item>
					<el-form-item label="证件号码：" class="required_flag">
						{{ruleForm.legalPersonCard}}
					</el-form-item>
					<el-form-item label="联系电话：" prop="legalPersonPhone"  maxlength="11" onkeyup="value=value.replace(/[^0-9]/g,'')">
						<el-input  v-model="ruleForm.legalPersonPhone" aria-required="true">
							{{ruleForm.legalPersonPhone}}
						</el-input>
					</el-form-item>
				</div>

				<el-form-item>
					<el-button type="primary" @click="submitForm">保存</el-button>
				</el-form-item>
			</el-form>

		</el-row>
	</div>
	<!--    <router-link
                :to="{
            path: '/edit_basic/',
            params: {
                key1: '11111', // orderNum : this.searchData.orderNo
            },
            query: {
               key2: '22222', // orderNum : this.searchData.orderNo
            }
        }"><button type="button">跳转</button></router-link>-->
</template>

<script>
	import {checkMobile} from "../../../common/validate"; //导入正则校验

	export default {
		created() {

			this.getCompanyDetail();

		},
		data() {


			return {
				companyId:"",
				businessTerm:"",
				checkAdvice:"",
				ruleForm:{
					reg_phone:"",
					agentPhone:""
				},
				rules:{

					legalPersonPhone:[{
						required: true,
						message: '请输入法人手机号码',
						trigger: 'blur'
					},{
						validator:checkMobile,
						message: '请输入正确手机号码',
						trigger: 'blur'
					}]
				}
			}
		},

		methods:{
			editCompanyInfo(){
				this.$router.push({
					path: '/realname_check',
					name: 'Realname_Check',
					params: {
						"flag": 1
					}
				});
//				this.$router.push('/realname_check/');
			},
			getCompanyDetail() {
				let data = new FormData();
				let that = this;
				this.$get("identification/getLtdCompanyDetail",data).then(function (response) {
					that.companyId=response.resultData.ltdCompanyDetail.pkId;
					that.ruleForm=response.resultData.ltdCompanyDetail
					that.businessTerm= that.dataFormat(new Date(response.resultData.ltdCompanyDetail.businessTerm));
					let attributes =response.resultData.ltdCompanyDetail.attribute;
					if(attributes == 1){
                     that.ruleForm.attributeName = "有限责任公司";
					}else if(attributes == 2){
						that.ruleForm.attributeName = "股份有限公司";
					}else if(attributes == 3){
						that.ruleForm.attributeName = "国有企业";
					}else if(attributes == 4){
						that.ruleForm.attributeName = "个人独资企业";
					}else if(attributes == 5){
						that.attributeName = "集体所有制";
					}else if(attributes == 6){
						that.ruleForm.attributeName = "合伙企业";
					}else if(attributes == 7){
						that.ruleForm.attributeName = "外商投资企业";
					}else if(attributes == 8){
						that.ruleForm.attributeName = "联营企业";
					}else{
						that.ruleForm.attributeName = "独营企业";
					}
					if(response.resultData.ltdCompanyDetail.verifyStatus==1
							&& response.resultData.ltdCompanyDetail.status ==1
					){
						that.checkAdvice="审核通过"
					}else{
						that.checkAdvice="审核没有通过"
					}
					if(response.code ==1){
						that.$message.info("获取数据成功!")
					}else{
						that.$message.error("获取信息失败!")
					}

				}).catch(error => {
					console.log("error",error);
					that.$message.error("获取信息失败!")
				});
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
			dataFormat(time){
				return `${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()}`;
			}


		}

	}

</script>

<style scoped>
	.hidden {
		display:none;
	}
</style>
