<template>
	<div>
	<div id ="addFinance" style="display: none" class="case">
		<h2 class="manage-title">财务信息</h2>
		<div class="manage-tip">
			<i class="el-icon-info"></i>
			<div class="manage-tip-txt">为保证贵公司运费能够正常结算，请务必及时填写并提交结算账户、结算周期及结算方式等相关信息，我们会根据贵公司提交的结算信息评估是否符合我司的结算要求，以免因为结算要求不符造成无法结算或其他损失，感谢您的配合。</div>
		</div>
		<div class="manage-info manage-com">
			<el-form :model="financeInfoForm" :rules="financeInfoRules" ref="financeInfoForm" label-width="120px" size="mini">
				<h2 class="info-title">对公结算账户</h2>
				<div class="info-item clear">
					<el-form-item label="户名:" prop="" class="required_flag">
						{{companyInfo.name}}
					</el-form-item>
					<el-form-item label="纳税人识别号:" prop="" class="required_flag">
						{{companyInfo.creditCode}}
					</el-form-item>
					<el-form-item label="银行卡号:" prop="acctCard">
					    <el-input v-model="financeInfoForm.acctCard" maxlength="25" placeholder="请输入银行卡号"></el-input>
					</el-form-item>
					<el-form-item label="开户银行:" prop="acctBank">
					    <el-input v-model="financeInfoForm.acctBank" maxlength="25" placeholder="请输入开户银行"></el-input>
					</el-form-item>
					<el-form-item label="联系电话:" prop="acctPhone">
					    <el-input v-model="financeInfoForm.acctPhone" maxlength="11" placeholder="请输入联系电话"></el-input>
					</el-form-item>
					<el-form-item label="公司注册地址:" prop="" class="required_flag" style="min-height: 31px;">
						{{companyInfo.regAddress}}
					</el-form-item>
					<el-form-item class="required_flag" label="开户许可证:" prop="">
						<div class="upload_box">
							<el-upload
									class="avatar-uploader"
									name="acct_permit_img"
									:action="action"
									:show-file-list="false"
									:http-request="requestUpload"
									:on-success="handleAvatarSuccess"
									:before-upload="beforeAvatarUpload">
								<!--图片验证 :before-upload="beforeAvatarUpload" -->
								<img v-if="financeInfoForm.acct_permit_img_imageUrl"
									 :src="financeInfoForm.acct_permit_img_imageUrl"
									 :imageType="financeInfoForm.acct_permit_img_imageUrl_type"
									 :imgName="financeInfoForm.acct_permit_img_imageUrl_name" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<div class="check_eg" @click="sampleImg = true,sampleType = '30'">查看示例</div>
						</div>
					</el-form-item>
					<el-form-item label="是否使用私户:" prop="acctUsePri">
						<el-radio-group  v-model="financeInfoForm.acctUsePri">
							<el-radio label="1" @change="showPri(1)">使用</el-radio>
							<el-radio label="0" @change="showPri(0)">不使用</el-radio>
						</el-radio-group>
					</el-form-item>
				</div>
				<div id="priAccount">
					<h2 class="info-title">私人结算账户</h2>
					<div class="info-item clear">
						<el-form-item label="户名:" prop="priName">
							 <el-input v-model="financeInfoForm.priName" maxlength="25" placeholder="请输入户名"></el-input>
						</el-form-item>
						<el-form-item label="银行卡号:" prop="priCard">
						    <el-input v-model="financeInfoForm.priCard" maxlength="25" placeholder="请输入银行卡号"></el-input>
						</el-form-item>
						<el-form-item class="required_flag" label="授权书:" prop="">
							<div class="upload_box sqs_box" style="margin-top: 6px;">
								<span class="tit_tit tit_tip">授权书必须盖有单位公章或财务专用章<a href="javascript:" @click="downLoad">下载委托人授权书模板</a></span>
								<el-upload
										class="avatar-uploader"
										name="pri_permit_img"
										:action="action"
										:show-file-list="false"
										:http-request="requestUpload"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload">
									<!--图片验证 :before-upload="beforeAvatarUpload" -->
									<img v-if="financeInfoForm.pri_permit_img_imageUrl"
										 :src="financeInfoForm.pri_permit_img_imageUrl"
										 :imageType="financeInfoForm.pri_permit_img_imageUrl_type"
										 :imgName="financeInfoForm.pri_permit_img_imageUrl_name" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="check_eg" @click="sampleImg = true,sampleType = '25'">查看示例</div>
							</div>
						</el-form-item>
						<el-form-item label="开户银行:" prop="priBank">
						    <el-input v-model="financeInfoForm.priBank" maxlength="25" placeholder="请输入开户行"></el-input>
						</el-form-item>
					</div>
				</div>
				<h2 class="info-title">结算及发票信息</h2>
				<div class="info-item clear">
					<el-form-item label="结算周期:" prop="stmtType">
						<el-radio-group v-model="financeInfoForm.stmtType">
							<el-radio label="1" @change="showCycle(1)">账期结</el-radio>
							<el-radio label="2" @change="showCycle(0)">现结</el-radio>
						</el-radio-group>
						<i class="el-icon-info finance-flag" @click="explain = true"></i>
					</el-form-item>
					<el-form-item label="账期:" prop="stmtCycle">
						<el-select v-model="financeInfoForm.stmtCycle" :disabled="disabled">
							<el-option v-for="item in accountOption"
									   :key="item.value"
									   :label="item.name"
									   :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否开具发票:" prop="stmtIsInvoice">
						<el-radio-group v-model="financeInfoForm.stmtIsInvoice">
							<el-radio label="1" @change="isInvoice(1)">开具</el-radio>
							<el-radio label="0" @change="isInvoice(0)">不开具</el-radio>
						</el-radio-group>
					</el-form-item>
					<div id="invoiceInfo">
						<el-form-item label="发票类型:" prop="stmtInvoiceType">
							<el-radio-group v-model="financeInfoForm.stmtInvoiceType">
								<el-radio label="1">增值税专用发票</el-radio>
								<el-radio label="2">增值税普通发票</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="开票内容:" prop="stmtInvoiceKind">
							<el-select v-model="financeInfoForm.stmtInvoiceKind">
								<el-option v-for="item in stmtInvoiceKindOption"
										   :key="item.id"
										   :label="item.name"
										   :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="发票税点:" prop="stmtInvoiceTax">
							<el-select v-model="financeInfoForm.stmtInvoiceTax">
							<el-option v-for="item in taxPointOption"
									   :key="item.value"
									   :label="item.name"
									   :value="item.value">
							</el-option>
							</el-select>
						</el-form-item>
					</div>
					<el-form-item label="备注:">
						<el-input type="textarea" v-model="financeInfoForm.stmtRemark"></el-input>
					</el-form-item>
				</div>
				<h2 class="info-title">财务联系人</h2>
				<div class="info-item info-case clear" style="padding: 0;">
					<el-form-item label="联系人:" prop="contName">
					    <el-input v-model="financeInfoForm.contName" maxlength="10" placeholder="请输入联系人"></el-input>
					</el-form-item>
					<el-form-item label="所属职位:" prop="contDuty">
					    <el-input v-model="financeInfoForm.contDuty" maxlength="10" placeholder="请输入联系人职位"></el-input>
					</el-form-item>
					<el-form-item label="联系电话:" prop="contPhone">
					    <el-input v-model="financeInfoForm.contPhone" maxlength="11" placeholder="请输入联系人电话"></el-input>
					</el-form-item>
					<el-form-item label="联系邮箱:" prop="contMail">
					    <el-input v-model="financeInfoForm.contMail" maxlength="25" placeholder="请输入联系邮箱"></el-input>
					</el-form-item>
					<el-form-item label="联系地址:" class="address required_flag" prop="contCityId">
						<el-select v-model="financeInfoForm.contProvId" placeholder="请选择省"
								   @change="initCity(financeInfoForm.contProvId,'cityOption',['financeInfoForm.contCityId','financeInfoForm.contAreaId'])">
							<el-option
									v-for="item in provinceOption"
									:key="item.regionId"
									:label="item.name"
									:value="item.regionId">
							</el-option>
						</el-select>
						<el-select v-model="financeInfoForm.contCityId" placeholder="请选择市" filterable
								   @change="initArea(financeInfoForm.contCityId,'areaOption',['financeInfoForm.contAreaId'])">
							<el-option
									v-for="item in cityOption"
									:key="item.regionId"
									:label="item.name"
									:value="item.regionId">
							</el-option>
						</el-select>
						<el-select v-model="financeInfoForm.contAreaId" placeholder="请选择区" filterable>
							<el-option
									v-for="item in areaOption"
									:key="item.regionId"
									:label="item.name"
									:value="item.regionId">
							</el-option>
						</el-select>

						<el-input v-model="financeInfoForm.contAddress" class="width-other">
							<template slot="append"><span @click="openMap($event,'contAddress')"><i
									class="el-icon-location-outline"></i></span></template>
						</el-input>
					</el-form-item>
				</div>
				<el-form-item>
				    <el-button type="primary" @click="submitFinance">提 交</el-button>
				</el-form-item>
			</el-form>
		</div>


	</div>
	<div id ="updateFinance" style="display: none" class="case">
			<h2 class="manage-title">财务信息</h2>
			<div class="manage-tip">
				<i class="el-icon-info"></i>
				<div class="manage-tip-txt">为保证贵公司运费能够正常结算，请务必及时填写并提交结算账户、结算周期及结算方式等相关信息，我们会根据贵公司提交的结算信息评估是否符合我司的结算要求，以免因为结算要求不符造成无法结算或其他损失，感谢您的配合。</div>
			</div>
			<div class="manage-info manage-com">
				<el-form :model="updateFinanceForm" :rules="updateFinanceRules" ref="updateFinanceForm" label-width="120px" size="mini">
					<h2 class="info-title">对公结算账户</h2>
					<div class="info-item clear">
						<el-form-item label="户名:" prop="" class="required_flag">
							{{companyInfo.name}}
						</el-form-item>
						<el-form-item label="纳税人识别号:" prop="" class="required_flag">
							{{companyInfo.creditCode}}
						</el-form-item>
						<el-form-item label="银行卡号:" prop="acctCard">
							<el-input v-model="updateFinanceForm.acctCard"></el-input>
						</el-form-item>
						<el-form-item label="开户银行:" prop="acctBank">
							<el-input v-model="updateFinanceForm.acctBank"></el-input>
						</el-form-item>
						<el-form-item label="联系电话:" prop="acctPhone">
							<el-input v-model="updateFinanceForm.acctPhone" maxlength="13"></el-input>
						</el-form-item>
						<el-form-item label="公司注册地址:" prop="" class="required_flag" style="min-height: 30px;">
							{{companyInfo.regAddress}}
						</el-form-item>
						<el-form-item class="required_flag" label="开户许可证:" prop="">
							<div class="upload_box">
								<el-upload
										class="avatar-uploader"
										name="acct_permit_img"
										:action="action"
										:show-file-list="false"
										:http-request="requestUpload"
										:on-success="handleUpdateSuccess"
										:before-upload="beforeAvatarUpload">
									<!--图片验证 :before-upload="beforeAvatarUpload" -->
									<img v-if="updateFinanceForm.acct_permit_img_imageUrl"
										 :src="updateFinanceForm.acct_permit_img_imageUrl"
										 :imageType="updateFinanceForm.acct_permit_img_imageUrl_type"
										 :imgName="updateFinanceForm.acct_permit_img_imageUrl_name" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="check_eg" @click="sampleImg = true,sampleType = '6'">查看示例</div>
							</div>
						</el-form-item>
						<el-form-item label="是否使用私户:" prop="acctUsePri">
							<el-radio-group  v-model="updateFinanceForm.acctUsePri">
								<el-radio :label="1" @change="showUpPri(1)">使用</el-radio>
								<el-radio :label="0" @change="showUpPri(0)">不使用</el-radio>
							</el-radio-group>
						</el-form-item>
					</div>
					<div id="upPriAccount">
						<h2 class="info-title">私人结算账户</h2>
						<div class="info-item clear">
							<el-form-item label="户名:" prop="priName">
								<el-input v-model="updateFinanceForm.priName"></el-input>
							</el-form-item>
							<el-form-item label="银行卡号:" prop="priCard">
								<el-input v-model="updateFinanceForm.priCard"></el-input>
							</el-form-item>
							<el-form-item class="required_flag" label="授权书:" prop="">
								<div class="upload_box sqs_box" style="margin-top: 6px;">
									<span class="tit_tit tit_tip">授权书必须盖有单位公章或财务专用章<a href="javascript:" @click="downLoad">下载委托人授权书模板</a></span>
									<el-upload
											class="avatar-uploader"
											name="pri_permit_img"
											:action="action"
											:show-file-list="false"
											:http-request="requestUpload"
											:on-success="handleUpdateSuccess"
											:before-upload="beforeAvatarUpload">
										<!--图片验证 :before-upload="beforeAvatarUpload" -->
										<img v-if="updateFinanceForm.pri_permit_img_imageUrl"
											 :src="updateFinanceForm.pri_permit_img_imageUrl"
											 :imageType="updateFinanceForm.pri_permit_img_imageUrl_type"
											 :imgName="updateFinanceForm.pri_permit_img_imageUrl_name" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
									<div class="check_eg" @click="sampleImg = true,sampleType = '25'">查看示例</div>
								</div>
							</el-form-item>
							<el-form-item label="开户银行:" prop="priBank">
								<el-input v-model="updateFinanceForm.priBank"></el-input>
							</el-form-item>
						</div>
					</div>
					<h2 class="info-title">结算及发票信息</h2>
					<div class="info-item clear">
						<el-form-item label="结算周期:" prop="stmtType">
							<el-radio-group v-model="updateFinanceForm.stmtType">
								<el-radio :label="1" @change="showCycle(1)">账期结</el-radio>
								<el-radio :label="2" @change="showCycle(0)">现结</el-radio>
							</el-radio-group>
							<i class="el-icon-info finance-flag" @click="explain = true"></i>
						</el-form-item>
						<el-form-item label="账期:" prop="stmtCycle" >
							<el-select v-model="updateFinanceForm.stmtCycle" :disabled="disabled">
								<el-option v-for="item in accountOption"
										   :key="item.value"
										   :label="item.name"
										   :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="是否开具发票:" prop="stmtIsInvoice">
							<el-radio-group v-model="updateFinanceForm.stmtIsInvoice">
								<el-radio :label="1" @change="isUpdateInvoice(1)">开具</el-radio>
								<el-radio :label="0" @change="isUpdateInvoice(0)">不开具</el-radio>
							</el-radio-group>
						</el-form-item>
						<div id="isUpdateInvoice">
							<el-form-item label="发票类型:" prop="stmtInvoiceType">
								<el-radio-group v-model="updateFinanceForm.stmtInvoiceType">
									<el-radio :label="1" >增值税专用发票</el-radio>
									<el-radio :label="2">增值税普通发票</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="开票内容:" prop="stmtInvoiceKind">
								<el-select v-model="updateFinanceForm.stmtInvoiceKind">
									<el-option v-for="item in stmtInvoiceKindOption"
											   :key="item.id"
											   :label="item.name"
											   :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="发票税点:" prop="stmtInvoiceTax">
								<el-select v-model="updateFinanceForm.stmtInvoiceTax">
									<el-option v-for="item in taxPointOption"
											   :key="item.value"
											   :label="item.name"
											   :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</div>
						<el-form-item label="备注:">
							<el-input type="textarea" v-model="updateFinanceForm.stmtRemark"></el-input>
						</el-form-item>
					</div>
					<el-form-item>
						<el-button type="primary" @click="saveUpdateFinance">提 交</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-dialog class="capacity-pop capacity-pop-big capacity-line" title="结算周期说明" :visible.sync="explain" width="460px" center>
				<div class="explain">
					<ul>
						<li>目前的结算周期分账期结与现结；</li>
						<li>账期结是指以周结、n+1月结、n+2月结、季节的周期与承运商进行结算；</li>
						<li>现结是指承运结束后，管家会在24内与承运商结算，遇到节假日顺延；</li>
					</ul>
					<p>注释：您所选择的结算周期，将直接影响到您承接的运单类型选择范围，如“大搜车”、“弹个车”等客户类型要求的周期为两个月账期以上；账期越长承接的客户范围越长；</p>
				</div>
				<div class="import-bottom">
					<el-button type="primary" @click="explain = false">确 定</el-button>
				</div>
			</el-dialog>
			<SampleGraph :visible.sync="sampleImg" :sampleType="sampleType"></SampleGraph>
		</div>
	<div id = "financeDetail" style="display: none" class="case">
		<h2 class="manage-title">财务信息</h2>
		<div id="status1" style="display: none;" class="manage-tip manage-success">
			<i class="el-icon-success"></i>
			<div class="manage-tip-txt">
				您已成功提交财务结算信息，请耐心等待审核结果。
			</div>
		</div>
		<div id ="status3" style="display: none;" class="manage-tip manage-error">
			<i class="el-icon-warning"></i>
			<div class="manage-tip-txt">
				<b>未通过审核！</b><span>您提交的认证资料有误，请核对后<a href="javascript:;" @click="toUpdate">重新认证</a>！</span>
				<br>
				失败原因如下：
				1.法人信息需与营业执照上面的法人信息一致；
			</div>
		</div>
		<div id="status2" style="display: none;" class="manage-tip manage-success">
			<i class="el-icon-success"></i>
			<div class="manage-tip-txt">
				<span>提交的财务结算信息已通过审核。</span>
				如需变更结算信息，您可以通过<a href="javascript:;" @click="toUpdate">修改信息</a>
				重新提交信息进行变更审核。变更审核过程中，会延续使用您之前提交的信息，审核通过后将会使用新的信息。
			</div>
		</div>
		<div class="manage-info manage-com">
			<el-form :model="financeDeatilForm" :rules="financeDeatilRules" ref="financeDeatilForm" label-width="120px" size="mini">
				<h2 class="info-title">对公结算账户</h2>
				<div class="info-item clear">
					<el-form-item label="户名:" prop="" class="required_flag">
						{{companyInfo.name}}
					</el-form-item>
					<el-form-item label="纳税人识别号:" prop="" class="required_flag">
						{{companyInfo.creditCode}}
					</el-form-item>
					<el-form-item label="银行卡号:" prop="" class="required_flag">
						{{financeDeatilForm.acctCard}}
					</el-form-item>
					<el-form-item label="开户银行:" prop="" class="required_flag">
						{{financeDeatilForm.acctBank}}
					</el-form-item>
					<el-form-item label="联系电话:" prop="" class="required_flag">
						{{financeDeatilForm.acctPhone}}
					</el-form-item>
					<el-form-item label="公司注册地址:" prop="" class="required_flag" style="min-height: 31px;">
						{{companyInfo.regAddress}}
					</el-form-item>
					<el-form-item class="required_flag" label="开户许可证:" prop="">
						{{financeDeatilForm.acctPermitImg==null?"未上传":"已上传"}}
					</el-form-item>
					<el-form-item label="是否使用私户:" prop="" class="required_flag">
						{{financeDeatilForm.acctUsePri==1?"使用":"未使用"}}
					</el-form-item>
				</div>
				<div id="detailPerInfo">
					<h2 class="info-title">私人结算账户</h2>
					<div class="info-item clear">
						<el-form-item label="户名:" prop="" class="required_flag">
							{{financeDeatilForm.priName}}
						</el-form-item>
						<el-form-item label="银行卡号:" prop="" class="required_flag">
							{{financeDeatilForm.priCard}}
						</el-form-item>
						<el-form-item class="required_flag" label="授权书:" prop="">
							{{financeDeatilForm.priPermitImg==null?"未上传":"已上传"}}
						</el-form-item>
						<el-form-item label="开户银行:" prop="" class="required_flag">
							{{financeDeatilForm.priBank}}
						</el-form-item>
					</div>
				</div>
				<h2 class="info-title">结算及发票信息</h2>
				<div class="info-item clear">
					<el-form-item label="结算周期:" prop="" class="required_flag">
						{{financeDeatilForm.stmtType==1?"账期结":"现结"}}
					</el-form-item>
					<el-form-item label="账期:" prop="" class="required_flag">
						<span v-if="financeDeatilForm.stmtCycle === 1">周结</span>
						<span v-else-if="financeDeatilForm.stmtCycle === 2">n+1月结</span>
						<span v-else-if="financeDeatilForm.stmtCycle ===3">n+2月结</span>
						<span v-else-if="financeDeatilForm.stmtCycle ===4">季结</span>
					</el-form-item>
					<el-form-item label="是否开具发票:" prop="" class="required_flag">
						{{financeDeatilForm.stmtIsInvoice==1?"是":"否"}}
					</el-form-item>
					<div id="invoiceDetailInfo">
						<el-form-item label="发票类型:" prop="" class="required_flag">
							{{financeDeatilForm.stmtInvoiceType==1?"增值税专用发票":"增值税普通发票"}}
						</el-form-item>
						<el-form-item label="开票内容:" prop="" class="required_flag">
							<span v-if="financeDeatilForm.stmtInvoiceKind === 1">运输费</span>
							<span v-else-if="financeDeatilForm.stmtInvoiceKind === 2">服务费</span>
							<span v-else-if="financeDeatilForm.stmtInvoiceKind ===0">其他</span>
						</el-form-item>
						<el-form-item label="发票税点:" prop="" class="required_flag">
							<span v-if="financeDeatilForm.stmtInvoiceTax === 1">3%</span>
							<span v-else-if="financeDeatilForm.stmtInvoiceTax === 2">6%</span>
							<span v-else-if="financeDeatilForm.stmtInvoiceTax ===3">9%</span>
						</el-form-item>
					</div>
					<el-form-item label="备注:">
						{{financeDeatilForm.stmtRemark}}
					</el-form-item>
				</div>
				<h2 class="info-title">财务联系人</h2>
				<div class="info-item info-case clear" style="padding: 0;">
					<el-form-item label="联系人:" prop="contName" class="required_flag">
						<el-input v-model="financeDeatilForm.contName"></el-input>
					</el-form-item>
					<el-form-item label="所属职位:" prop="contDuty" class="required_flag">
						<el-input v-model="financeDeatilForm.contDuty"></el-input>
					</el-form-item>
					<el-form-item label="联系电话:" prop="contPhone" class="required_flag">
						<el-input v-model="financeDeatilForm.contPhone"></el-input>
					</el-form-item>
					<el-form-item label="联系邮箱:" prop="contMail" class="required_flag">
						<el-input v-model="financeDeatilForm.contMail"></el-input>
					</el-form-item>
					<el-form-item label="联系地址:" class="address required_flag" prop="contCityId">
						<el-select v-model="financeDeatilForm.contProvId" placeholder="请选择省"
								   @change="initCity(financeDeatilForm.contProvId,'cityOption',['financeDeatilForm.contCityId','financeDeatilForm.contAreaId'])">
							<el-option
									v-for="item in provinceOption"
									:key="item.regionId"
									:label="item.name"
									:value="item.regionId">
							</el-option>
						</el-select>
						<el-select v-model="financeDeatilForm.contCityId" placeholder="请选择市" filterable
								   @change="initArea(financeDeatilForm.contCityId,'areaOption',['financeDeatilForm.contAreaId'])">
							<el-option
									v-for="item in cityOption"
									:key="item.regionId"
									:label="item.name"
									:value="item.regionId">
							</el-option>
						</el-select>
						<el-select v-model="financeDeatilForm.contAreaId" placeholder="请选择区" filterable>
							<el-option
									v-for="item in areaOption"
									:key="item.regionId"
									:label="item.name"
									:value="item.regionId">
							</el-option>
						</el-select>

						<el-input v-model="financeDeatilForm.contAddress" class="width-other">
							<template slot="append"><span @click="openUpMap($event,'contAddress')"><i
									class="el-icon-location-outline"></i></span></template>
						</el-input>
					</el-form-item>
				</div>
				<el-form-item>
					<el-button type="primary" @click="saveContInfo">保 存</el-button>
				</el-form-item>
			</el-form>
		</div>

	</div>
		<div>
			<el-dialog title="选取地址" :visible.sync="dialogFormVisible">
				<baidu-map class="map" :center="center" style="height: 300px;width: 100%"
						   :scroll-wheel-zoom="true"
						   @click="getPointAddress">
					<bm-marker :position="position" :dragging="true"
							   animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
					<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
					<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true"
									:autoLocation="true"></bm-geolocation>
				</baidu-map>
				<span slot="footer" class="dialog-footer">
                                <span>{{clickAddressDetail}}</span>
                                <el-button type="primary"
										   @click="dialogFormVisible = false,financeInfoForm[MapClass] = clickAddressDetail">确 定</el-button>
                              </span>
			</el-dialog>
		</div>
		<div>
			<el-dialog title="选取地址" :visible.sync="dialogFormUpVisible">
				<baidu-map class="map" :center="center" style="height: 300px;width: 100%"
						   :scroll-wheel-zoom="true"
						   @click="getPointAddress">
					<bm-marker :position="position" :dragging="true"
							   animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
					<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
					<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true"
									:autoLocation="true"></bm-geolocation>
				</baidu-map>
				<span slot="footer" class="dialog-footer">
                                <span>{{clickAddressDetail}}</span>
                                <el-button type="primary"
										   @click="dialogFormUpVisible = false,financeDeatilForm[MapClass] = clickAddressDetail">确 定</el-button>
                              </span>
			</el-dialog>
		</div>
		<el-dialog class="capacity-pop capacity-pop-big capacity-line" title="结算周期说明" :visible.sync="explain" width="460px" center>
			<div class="explain">
				<ul>
					<li>目前的结算周期分账期结与现结；</li>
					<li>账期结是指以周结、n+1月结、n+2月结、季节的周期与承运商进行结算；</li>
					<li>现结是指承运结束后，管家会在24内与承运商结算，遇到节假日顺延；</li>
				</ul>
				<p>注释：您所选择的结算周期，将直接影响到您承接的运单类型选择范围，如“大搜车”、“弹个车”等客户类型要求的周期为两个月账期以上；账期越长承接的客户范围越长；</p>
			</div>
			<div class="import-bottom">
				<el-button type="primary" @click="explain = false">确 定</el-button>
			</div>
		</el-dialog>
		<SampleGraph :visible.sync="sampleImg" :sampleType="sampleType"></SampleGraph>
	</div>
</template>

<script>
	import SampleGraph from '../../admitWeb/SampleGraph'
	import {checkMobile} from "../../../common/validate";  //示例图
	export default {
		components: {
			'SampleGraph':SampleGraph,
		},
		data() {
			return {
				disabled:false,
				sampleImg: false,
				sampleType:'',
				explain:false,
				financeDeatilForm:{contAreaId:''},
				financeDeatilRules:{
					contCityId:{required: true, message: '此项不能为空', trigger: 'blur'},
					contName:{required: true, message: '此项不能为空', trigger: 'blur'},
					contDuty:{required: true, message: '此项不能为空', trigger: 'blur'},
					contPhone:[{required: true, message: '此项不能为空', trigger: 'blur'},{
						validator: checkMobile,
						trigger: 'blur'
					}],
					contMail:{required: true, message: '此项不能为空', trigger: 'blur'},
				},
				financeInfoForm: {contAreaId:'',acctUsePri:'1',stmtType:'1',stmtIsInvoice:'1',stmtInvoiceType:'2'},
				financeInfoRules: {
					acctPhone:  [{required: true, message: '此项不能为空', trigger: 'blur'},{
						validator: this.common.checkTelOrMobile,
						trigger: 'blur'
					}],
					acctCard: [{required: true, message: '此项不能为空', trigger: 'blur'},{
						validator: this.common.checkBankNumber,
						trigger: 'blur'
					}],
					acctBank:{required: true, message: '此项不能为空', trigger: 'blur'},
					//contCityId:{required: true, message: '此项不能为空', trigger: 'blur'},
					contName:{required: true, message: '此项不能为空', trigger: 'blur'},
					contDuty:{required: true, message: '此项不能为空', trigger: 'blur'},
					contPhone:[{required: true, message: '此项不能为空', trigger: 'blur'},{
						validator: checkMobile,
						trigger: 'blur'
					}],
					contMail:{required: true, message: '此项不能为空', trigger: 'blur'},
				},
				updateFinanceForm:{},
				updateFinanceRules:{
					acctPhone:  [{required: true, message: '此项不能为空', trigger: 'blur'},{
						validator: this.common.checkTelOrMobile,
						trigger: 'blur'
					}],
					acctCard: [{required: true, message: '此项不能为空', trigger: 'blur'},{
						validator: this.common.checkBankNumber,
						trigger: 'blur'
					}],
					acctBank:{required: true, message: '此项不能为空', trigger: 'blur'},
					contName:{required: true, message: '此项不能为空', trigger: 'blur'},
					contDuty:{required: true, message: '此项不能为空', trigger: 'blur'},
					contPhone:[{required: true, message: '此项不能为空', trigger: 'blur'},{
						validator: checkMobile,
						trigger: 'blur'
					}],
					contMail:[{required: true, message: '此项不能为空', trigger: 'blur'},{
						validator: this.common.checkEmail,
						trigger: 'blur'
					}]
				},
				imageUrl: '',
				action: this.common.CONSTANT.UPLOADIMGPATH + 'recognizeImage',
				contAddress: '',
				dialogFormVisible: false,
				dialogFormUpVisible:false,
				MapClass: "",
				position:'',
				clickAddressDetail: '点击选取地址',
				center: '北京',
				acctBank:'',
				acctCard:'',
				acctPhone:'',
				acctPermitImg:'',
				acctUsePri:'',
				priName:'',
				priBank:'',
				priCard:'',
				priPermitImg:'',
				stmtType:'',
				stmtCycle:'',
				stmtIsInvoice:'',
				stmtInvoiceType:'',
				stmtInvoiceKind:'',
				stmtInvoiceTax:'',
				stmtRemark:'',
				contName:'',
				contDuty:'',
				contMail:'',
				contProvId:'',
				contProvName:'',
				contCityId:'',
				contCityName:'',
				contAreaId:'',
				contAreaName:'',
				contAddress:'',
				provinceOption: [],
				cityOption:[],
				areaOption:[],
				accountOption:[],
				taxPointOption:[],
				stmtInvoiceKindOption:[{id:1,name:'运输费'},{id:2,name:'服务费'},{id:0,name:'其他'}],
				companyInfo:{},
				acct_permit_img_imageUrl:'',
				acct_permit_img_imageUrl_type:'',
				acct_permit_img_imageUrl_name:'',
				pri_permit_img_imageUrl_type:'',
				pri_permit_img_imageUrl_name:'',
				pri_permit_img_imageUrl:'',
				contPhone:'',
				financeInfo:{},


			}
		},
		created:function () {
			this.initData();
			this.initProvince(this);
			this.common.getBizConstants(this, 'accountType', 'accountOption');
			this.common.getBizConstants(this, 'taxPointType', 'taxPointOption');
			this.companyInfo = this.common.fetchData("company");
            this.financeInfoForm = Object.assign({}, this.financeInfoForm, {"contAddress":''});
        },
		methods:{
			initData(){
				let that = this;
				let company = this.common.fetchData("company");
				let companyId = company['pkId'];
				this.$post("finance/getFinanceByCompanyId", {pkId:companyId}).then(function (data) {
					if (data.code != 0) {
						that.financeInfo = data.resultData.finance;
						that.initCity(data.resultData.finance.contProvId, 'cityOption', ['financeDeatilForm.contCityId', 'financeDeatilForm.contAreaId']);
						that.initArea(data.resultData.finance.contCityId, 'areaOption', ['financeDeatilForm.contAreaId']);
						that.financeDeatilForm = data.resultData.finance;
						if(that.financeDeatilForm.status ==1){
							document.getElementById("status1").style.display="block"
						}
						if(that.financeDeatilForm.status ==2){
							document.getElementById("status2").style.display="block"
						}
						if(that.financeDeatilForm.status ==3){
							document.getElementById("status3").style.display="block"
						}
						if(that.financeDeatilForm.acctUsePri==0){
							document.getElementById("detailPerInfo").style.display="none"
						}
						if(that.financeDeatilForm.stmtIsInvoice==0){
							document.getElementById("invoiceDetailInfo").style.display="none"
						}
						if(that.financeDeatilForm.stmtType != 1){
							that.financeDeatilForm.stmtCycle='';
						}
						document.getElementById("financeDetail").style.display="block";

					} else {
						document.getElementById("addFinance").style.display="block";
					}
				}).catch(res=>{
					console.log(res)
				})
			},
			initProvince: function () {
				this.common.initProvince(this, ["provinceOption"])
			},
			initCity: function (value, cityKey, clearKeys) {
				this.common.initCity(this, value, cityKey, clearKeys);
			},
			initArea: function (value, dataKey, clearKeys) {
				this.common.initArea(this, value, dataKey, clearKeys)
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
			requestUpload(obj) {
				let company = this.common.fetchData("company");
				obj.companyId = company['pkId'],//this.$route.params['register']['companyId'];// this.$route.params['register']['companyId'];
						this.common.uploadImgFun(obj, this);
			},
			handleAvatarSuccess(response, file) {
				let that = this;
				let data = JSON.parse(response.data);
				let imageType = data['resultData']['imageType'];
				let imageTypeValue = data['resultData']['imageTypeValue'];
				let filePath = data['resultData']['filePath'];
				let attrs = data['resultData']['attrs'];
				let imageUrl = imageType + "_imageUrl";
				let imageUrlType = imageUrl + "_type";
				let imageUrlName = imageUrl + "_name";
				// this[imageUrlName] = URL.createObjectURL(file.raw);
				let financeInfoForm ={};
				financeInfoForm[imageUrl] = filePath;
				financeInfoForm[imageUrlType] = imageTypeValue;
				financeInfoForm[imageUrlName] = file.name;
				that.financeInfoForm = Object.assign({}, that.financeInfoForm, financeInfoForm);
				/*
                                that.driverForm = Object.assign({}, that.driverForm, driverForm);
                */

			},
			handleUpdateSuccess(response, file) {
				let that = this;
				let data = JSON.parse(response.data);
				let imageType = data['resultData']['imageType'];
				let imageTypeValue = data['resultData']['imageTypeValue'];
				let filePath = data['resultData']['filePath'];
				let attrs = data['resultData']['attrs'];
				let imageUrl = imageType + "_imageUrl";
				let imageUrlType = imageUrl + "_type";
				let imageUrlName = imageUrl + "_name";
				// this[imageUrlName] = URL.createObjectURL(file.raw);
				let updateFinanceForm ={};
				updateFinanceForm[imageUrl] = filePath;
				updateFinanceForm[imageUrlType] = imageTypeValue;
				updateFinanceForm[imageUrlName] = file.name;
				that.updateFinanceForm = Object.assign({}, that.updateFinanceForm, updateFinanceForm);
				/*
                                that.driverForm = Object.assign({}, that.driverForm, driverForm);
                */

			},
			openMap(e,classname) {
                let mapElement = e.currentTarget.parentElement.parentElement.parentElement;
                let child = mapElement.children;
                let provinceName = child[0].firstElementChild.firstElementChild.value;
                let cityName = child[1].firstElementChild.firstElementChild.value;
                let areaName = child[2].firstElementChild.firstElementChild.value;
                let autoAddress = provinceName+cityName+areaName;
                if (autoAddress) this.center = autoAddress;
				this.dialogFormVisible = true;
				this.MapClass = classname;
			},
			openUpMap(e,classname) {
                let mapElement = e.currentTarget.parentElement.parentElement.parentElement;
                let child = mapElement.children;
                let provinceName = child[0].firstElementChild.firstElementChild.value;
                let cityName = child[1].firstElementChild.firstElementChild.value;
                let areaName = child[2].firstElementChild.firstElementChild.value;
                let autoAddress = provinceName+cityName+areaName;
                if (autoAddress) this.center = autoAddress;
				this.dialogFormUpVisible = true;
				this.MapClass = classname;
			},
			getPointAddress(e) {
				let point = e.point;
				this.position = {lng: e.point.lng, lat: e.point.lat}
				let myGeocoder = new BMap.Geocoder();
				let that = this;
				myGeocoder.getLocation(point, function (rs) {
					let addComp = rs.addressComponents;
					let adderssDetal = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
					that.clickAddressDetail = adderssDetal;
				});
			},
			submitFinance(){
				this.$refs.financeInfoForm.validate((valid) => {
					if (valid) {
						let imageValid = true;
						if(!this.financeInfoForm.acct_permit_img_imageUrl){
							this.$message.error("请上传开户许可证照片！");
							imageValid = false;
						}
						if(this.financeInfoForm.acctUsePri == 1){
							if(!this.financeInfoForm.priName || !this.financeInfoForm.priBank || !this.financeInfoForm.priCard || !this.financeInfoForm.pri_permit_img_imageUrl){
								this.$message.error("请补全私人结算账户信息！");
								imageValid = false;
							}
						}
						if(this.financeInfoForm.stmtIsInvoice ==1){
							if(!this.financeInfoForm.stmtInvoiceType || !this.financeInfoForm.stmtInvoiceKind || !this.financeInfoForm.stmtInvoiceTax){
								this.$message.error("请补全发票信息！");
								imageValid = false;
							}
						}
						if(!this.financeInfoForm.contAddress){
							this.$message.error("请填写联系人详细地址！");
							imageValid = false;
						}
						if(!imageValid){
							return false;
						}

						let that = this;
						let data = {};
						if(this.financeInfoForm.acctUsePri == 1){
							data.priName = this.financeInfoForm.priName;
							data.priBank = this.financeInfoForm.priBank;
							data.priCard = this.financeInfoForm.priCard;
							if (this.financeInfoForm.pri_permit_img_imageUrl) {
								data.priPermitImg = this.financeInfoForm.pri_permit_img_imageUrl.substring(that.common.CONSTANT.imagePrefix.length);
							}
						}
						if(this.financeInfoForm.stmtIsInvoice ==1){
							data.stmtInvoiceType = this.financeInfoForm.stmtInvoiceType;
							data.stmtInvoiceKind = this.financeInfoForm.stmtInvoiceKind;
							data.stmtInvoiceTax = this.financeInfoForm.stmtInvoiceTax;
						}
						data.acctBank = this.financeInfoForm.acctBank;
						data.acctCard = this.financeInfoForm.acctCard;
						data.acctPhone = this.financeInfoForm.acctPhone;
						data.acctUsePri = this.financeInfoForm.acctUsePri;
						data.stmtType = this.financeInfoForm.stmtType
						data.stmtCycle = this.financeInfoForm.stmtCycle;
						data.stmtIsInvoice = this.financeInfoForm.stmtIsInvoice
						data.stmtRemark = this.financeInfoForm.stmtRemark;
						data.contName = this.financeInfoForm.contName;
						data.contDuty = this.financeInfoForm.contDuty;
						data.contMail = this.financeInfoForm.contMail;
						data.contPhone = this.financeInfoForm.contPhone;
						data.contProvId = this.financeInfoForm.contProvId;
						data.contProvName = this.common.getProvinceName(this, this.financeInfoForm.contProvId, this.provinceOption);
						data.contCityId = this.financeInfoForm.contCityId;
						data.contCityName = this.common.getCityName(this, this.financeInfoForm.contCityId, this.cityOption);
						data.contAreaId = this.financeInfoForm.contAreaId;
						data.contAreaName = this.common.getAreaName(this, this.financeInfoForm.contAreaId, this.areaOption);
						data.contAddress = this.financeInfoForm.contAddress;
						data.acctPermitImg = this.financeInfoForm.acct_permit_img_imageUrl.substring(that.common.CONSTANT.imagePrefix.length);

						let dataInfo = {
							"data": JSON.stringify(data)
						};

						that.$post("finance/addOrUpdateFinance", dataInfo).then(function (data) {
							if (data.code == 0) {
								that.$message.error(data.msg);
							} else {
								that.$router.go(0)
							}
						}).catch(res => {
							console.log(res)
						})
					}
				})
			},
			saveUpdateFinance(){
				this.$refs.updateFinanceForm.validate((valid) => {
					if (valid) {
						let imageValid = true;
						if (!this.updateFinanceForm.acct_permit_img_imageUrl) {
							this.$message.error("请上传开户许可证照片！");
							imageValid = false;
						}
						if (this.updateFinanceForm.acctUsePri == 1) {
							if (!this.updateFinanceForm.priName || !this.updateFinanceForm.priBank || !this.updateFinanceForm.priCard || !this.updateFinanceForm.pri_permit_img_imageUrl) {
								this.$message.error("请补全私人结算账户信息！");
								imageValid = false;
							}
						}
						if (this.updateFinanceForm.stmtIsInvoice == 1) {
							if (!this.updateFinanceForm.stmtInvoiceType || !this.updateFinanceForm.stmtInvoiceKind || !this.updateFinanceForm.stmtInvoiceTax) {
								this.$message.error("请补全发票信息！");
								imageValid = false;
							}
						}
						if (!this.updateFinanceForm.contAddress) {
							this.$message.error("请填写联系人详细地址！");
							imageValid = false;
						}
						if (!imageValid) {
							return false;
						}
						let that = this;
						let data = {};
						data.pkId = this.updateFinanceForm.pkId;
						if(this.updateFinanceForm.acctUsePri == 1){
							data.priName = this.updateFinanceForm.priName;
							data.priBank = this.updateFinanceForm.priBank;
							data.priCard = this.updateFinanceForm.priCard;
							if (this.updateFinanceForm.pri_permit_img_imageUrl) {
								data.priPermitImg = this.updateFinanceForm.pri_permit_img_imageUrl.substring(that.common.CONSTANT.imagePrefix.length);
							}
						}
						if(this.updateFinanceForm.stmtIsInvoice ==1){
							data.stmtInvoiceType = this.updateFinanceForm.stmtInvoiceType;
							data.stmtInvoiceKind = this.updateFinanceForm.stmtInvoiceKind;
							data.stmtInvoiceTax = this.updateFinanceForm.stmtInvoiceTax;
						}
						data.acctBank = this.updateFinanceForm.acctBank;
						data.acctCard = this.updateFinanceForm.acctCard;
						data.acctPhone = this.updateFinanceForm.acctPhone;
						data.stmtType = this.updateFinanceForm.stmtType
						data.stmtCycle = this.updateFinanceForm.stmtCycle;
						data.acctUsePri = this.updateFinanceForm.acctUsePri;
						data.stmtIsInvoice = this.updateFinanceForm.stmtIsInvoice
						data.stmtRemark = this.updateFinanceForm.stmtRemark;
						data.contName = this.updateFinanceForm.contName;
						data.contDuty = this.updateFinanceForm.contDuty;
						data.contMail = this.updateFinanceForm.contMail;
						data.contPhone = this.updateFinanceForm.contPhone;
						data.contProvId = this.updateFinanceForm.contProvId;
						data.contProvName = this.common.getProvinceName(this, this.updateFinanceForm.contProvId, this.provinceOption);
						data.contCityId = this.updateFinanceForm.contCityId;
						data.contCityName = this.common.getCityName(this, this.updateFinanceForm.contCityId, this.cityOption);
						data.contAreaId = this.updateFinanceForm.contAreaId;
						data.contAreaName = this.common.getAreaName(this, this.updateFinanceForm.contAreaId, this.areaOption);
						data.contAddress = this.updateFinanceForm.contAddress;
						data.acctPermitImg = this.updateFinanceForm.acct_permit_img_imageUrl.substring(that.common.CONSTANT.imagePrefix.length);

						let dataInfo = {
							"data": JSON.stringify(data)
						};

						that.$post("finance/addOrUpdateFinance", dataInfo).then(function (data) {
							if (data.code == 0) {
								that.$message.error(data.msg);
							} else {
								that.$router.go(0)
							}
						}).catch(res => {
							console.log(res)
						})
					}
				})
			},
			saveContInfo(){
				this.$refs.financeDeatilForm.validate((valid) => {
					if (valid) {
						let that = this;
						let data = {};
						data.pkId = this.financeDeatilForm.pkId;
						data.contName = this.financeDeatilForm.contName;
						data.contDuty = this.financeDeatilForm.contDuty;
						data.contMail = this.financeDeatilForm.contMail;
						data.contPhone = this.financeDeatilForm.contPhone;
						data.contProvId = this.financeDeatilForm.contProvId;
						data.contProvName = this.common.getProvinceName(this, this.financeDeatilForm.contProvId, this.provinceOption);
						data.contCityId = this.financeDeatilForm.contCityId;
						data.contCityName = this.common.getCityName(this, this.financeDeatilForm.contCityId, this.cityOption);
						data.contAreaId = this.financeDeatilForm.contAreaId;
						data.contAreaName = this.common.getAreaName(this, this.financeDeatilForm.contAreaId, this.areaOption);
						data.contAddress = this.financeDeatilForm.contAddress;
						let dataInfo = {
							"data": JSON.stringify(data)
						};
						that.$post("finance/updateContInfo", dataInfo).then(function (data) {
							if (data.code == 0) {
								that.$message.error(data.msg);
							} else {
								that.$router.go(0)
							}
						}).catch(res => {
							console.log(res)
						})
					}
				})
			},
			showPri(type){
				if(type==1){
					document.getElementById("priAccount").style.display="block";
				}else {
					document.getElementById("priAccount").style.display="none";
				}
			},
			showUpPri(type){
				if(type==1){
					document.getElementById("upPriAccount").style.display="block";
				}else {
					document.getElementById("upPriAccount").style.display="none";
				}
			},
			toUpdate(){
				let that = this;
				that.updateFinanceForm = that.financeDeatilForm;
				that.updateFinanceForm.acct_permit_img_imageUrl = that.common.CONSTANT.imagePrefix+that.financeDeatilForm.acctPermitImg;
				that.updateFinanceForm.pri_permit_img_imageUrl = that.common.CONSTANT.imagePrefix+that.financeDeatilForm.priPermitImg;
				document.getElementById("financeDetail").style.display="none";
				document.getElementById("updateFinance").style.display="block";
				if(that.updateFinanceForm.acctUsePri == 0){
					document.getElementById("upPriAccount").style.display="none";
				}
				if(that.updateFinanceForm.stmtIsInvoice == 0){
					document.getElementById("isUpdateInvoice").style.display="none";
				}

			},
			isInvoice(type){
				if(type==1){
					document.getElementById("invoiceInfo").style.display="block";
					this.financeInfoForm.stmtInvoiceType='1';
				}else {
					document.getElementById("invoiceInfo").style.display="none";
					this.financeInfoForm.stmtInvoiceType='';
				}
			},
			isUpdateInvoice(type){
				if(type==1){
					document.getElementById("isUpdateInvoice").style.display="block";
					this.financeInfoForm.stmtInvoiceType='1';
				}else {
					document.getElementById("isUpdateInvoice").style.display="none";
					this.financeInfoForm.stmtInvoiceType='';
				}
			},
			showCycle(type){
				if(type==1){
					this.disabled=false;
				}else {
					this.disabled=true;
					this.financeInfoForm.stmtCycle='';
					this.updateFinanceForm.stmtCycle='';
				}
			},
			downLoad(){
				window.location.href = this.common.CONSTANT.UPLOADIMGPATH + "download?downType=1"
			},
		},


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
