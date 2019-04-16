<template>
	<div class="case">
		<h2 class="manage-title">财务信息</h2>
		<div class="manage-tip">
			<i class="el-icon-info"></i>
			<div class="manage-tip-txt">为保证贵公司运费能够正常结算，请务必及时填写并提交结算账户、结算周期及结算方式等相关信息，我们会根据贵公司提交的结算信息评估是否符合我司的结算要求，以免因为结算要求不符造成无法结算或其他损失，感谢您的配合。</div>
		</div>
		<div class="manage-tip manage-success">
		    <i class="el-icon-success"></i>
		    <div class="manage-tip-txt">
		        您已成功提交财务结算信息，请耐心等待审核结果。
		    </div>
		</div>
		<div class="manage-tip manage-error">
		    <i class="el-icon-warning"></i>
		    <div class="manage-tip-txt">
		        <b>未通过审核！</b><span>您提交的认证资料有误，请核对后<a href="javascript:;" @click="">重新认证</a>！</span>
		        <br>
		        失败原因如下：
				1.法人信息需与营业执照上面的法人信息一致；
		    </div>
		</div>
		<div class="manage-tip manage-success">
		    <i class="el-icon-success"></i>
		    <div class="manage-tip-txt">
				<span>提交的财务结算信息已通过审核。</span>
		        如需变更结算信息，您可以通过<a href="javascript:;">修改信息</a>
				重新提交信息进行变更审核。变更审核过程中，会延续使用您之前提交的信息，审核通过后将会使用新的信息。
		    </div>
		</div>
		<div class="manage-info manage-com">
			<el-form :model="financeInfoForm" :rules="financeInfoRules" ref="financeInfoForm" label-width="120px" size="mini">
				<h2 class="info-title">对公结算账户</h2>
				<div class="info-item clear">
					<el-form-item label="户名:" prop="" class="required_flag">
						北京运车网网络科技有限公司
					</el-form-item>
					<el-form-item label="纳税人识别号:" prop="" class="required_flag">
						123456789087657897657
					</el-form-item>
					<el-form-item label="银行卡号:" prop="" class="required_flag">
					   **** **** **** **** 1234
					</el-form-item>
					<el-form-item label="开户银行:" prop="" class="required_flag">
					    中国建设银行股份有限公司哈尔滨平房支行
					</el-form-item>
					<el-form-item label="联系电话:" prop="" class="required_flag">
					    150****1526
					</el-form-item>
					<el-form-item label="公司注册地址:" prop="" class="required_flag" style="min-height: 30px;">
						北京市海淀区北三环西路甲18号院2号楼8层805-1-2
					</el-form-item>
					<el-form-item class="required_flag" label="开户许可证:" prop="">
						已上传
					</el-form-item>
					<el-form-item label="是否使用私户:" prop="" class="required_flag">
						使用
					</el-form-item>
				</div>
				<div id="">
					<h2 class="info-title">私人结算账户</h2>
					<div class="info-item clear">
						<el-form-item label="户名:" prop="" class="required_flag">
							张三
						</el-form-item>
						<el-form-item label="银行卡号:" prop="" class="required_flag">
						    **** **** **** **** 1234
						</el-form-item>
						<el-form-item class="required_flag" label="授权书:" prop="">
							已上传
						</el-form-item>
						<el-form-item label="开户银行:" prop="" class="required_flag">
						    中国建设银行股份有限公司哈尔滨平房支行
						</el-form-item>
					</div>
				</div>
				<h2 class="info-title">结算及发票信息</h2>
				<div class="info-item clear">
					<el-form-item label="结算周期:" prop="" class="required_flag">
						账期结
					</el-form-item>
					<el-form-item label="账期:" prop="" class="required_flag">
						n+1月结
					</el-form-item>
					<el-form-item label="是否开具发票:" prop="" class="required_flag">
						开具
					</el-form-item>
					<div id="">
						<el-form-item label="发票类型:" prop="" class="required_flag">
							增值税专用发票
						</el-form-item>
						<el-form-item label="开票内容:" prop="" class="required_flag">
							运输费
						</el-form-item>
						<el-form-item label="发票税点:" prop="" class="required_flag">
							9%
						</el-form-item>
					</div>
					<el-form-item label="备注:">
						可以开票
					</el-form-item>
				</div>
				<h2 class="info-title">财务联系人</h2>
				<div class="info-item info-case clear" style="padding: 0;">
					<el-form-item label="联系人:" prop="" class="required_flag">
					    <el-input></el-input>
					</el-form-item>
					<el-form-item label="所属职位:" prop="" class="required_flag">
					    <el-input></el-input>
					</el-form-item>
					<el-form-item label="联系电话:" prop="" class="required_flag">
					    <el-input></el-input>
					</el-form-item>
					<el-form-item label="联系邮箱:" prop="" class="required_flag">
					    <el-input></el-input>
					</el-form-item>
					<el-form-item label="联系地址:" class="address required_flag" prop="">
					   <el-select placeholder="请选择省">
					   </el-select>
					   <el-select placeholder="请选择市">
					   </el-select>
					   <el-select placeholder="请选择区">
					   </el-select>
					   <el-input prop="">
					   	<template slot="append"><span><i class="el-icon-location-outline"></i></span></template>
					   </el-input>
					</el-form-item>
				</div>
				<el-form-item>
				    <el-button type="primary">保 存</el-button>
				</el-form-item>
			</el-form>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				financeInfoForm: {},
				financeInfoRules: {},
			}
		},
		methods:{
			
			
		}

	}
</script>

<style>
	.finance-flag {
		font-size: 16px;
		color: #2D8CF0;
		margin-left: 40px;
		vertical-align: middle;
		cursor: pointer;
	}
	.explain ul {
		margin: 0 0 20px;
	}
	.explain ul li {
		color: #515a6e;
		line-height: 24px;
	}
	.explain p {
		font-size: 12px;
		color: #e6a23c;
		line-height: 24px;
	}
</style>
