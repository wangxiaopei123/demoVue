<template>
	<div>
		<!--
			0-5小板车示例图
			4道路运输许可证参考示例图
			6-11司机示例图 其中6-8为身份证信息
			12-16牵引车示例图
			17-21半挂车示例图
			22办公室办公照片
			23办公室门头照片
			24道路运输经营许可证
			25委托人授权书
			26营业执照
			27运作场地
			28运作场地门头
			29组织机构
			30开户许可证
		-->
		<el-dialog class="capacity-pop sample-pop" :visible.sync="visible" :sampleType="sampleType" width="540px" center :before-close="closeModal">
			<div class="capacity-pop-in">
				<!--小板车行驶证首页-->
				<div class="sample-box" v-if="sampleType === '0'">
					<h1>行驶证首页参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/xb_xszsy.png" alt="首页">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
				<!--小板车行驶证副页-->
				<div class="sample-box" v-if="sampleType === '1'">
					<h1>行驶证副页参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/xb_xszfy.png" alt="副页">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
				<!--小板车行驶证背面-->
				<div class="sample-box" v-if="sampleType === '2'">
					<h1>行驶证背面参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/xb_dljy.png" alt="背面">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
					<!--小板车车辆照片-->
				<div class="sample-box" v-if="sampleType === '3'">
					<h1>车辆照片参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/xb_dljy.png" alt="车辆照片">
					</div>
					<div class="papers-sm">
						<h2>照片要求</h2>
						<ul>
							<li>1、车辆照片保证车牌号码清晰可见，无遮挡、涂改、模糊、反光等情况</li>
							<li>2、必须为彩色数码照</li>
							<li>3、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
						</ul>
					</div>
				</div>
				<!--道路运输许可证-->
				<div class="sample-box" v-if="sampleType === '4'">
					<h1>道路运输许可证参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/dlysxkz.png" alt="道路运输许可证">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、保单上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、照片必须完整，保单四个边角需漏出，无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
					<!--小板车机动车登记证书-->
				<div class="sample-box" v-if="sampleType === '5'">
					<h1>机动车登记证书参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/xb_jdcdjz.png" alt="机动车登记证书">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
				<!--司机个人信息页-->
				<div class="sample-box" v-if="sampleType === '6'">
					<h1>个人信息页参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/sfz_grxx.png" alt="个人信息页">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
				<!--司机国徽页-->
				<div class="sample-box" v-if="sampleType === '7'">
					<h1>国徽页参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/sfz_ghy.png" alt="国徽页">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
				<!--司机手持身份证-->
				<div class="sample-box" v-if="sampleType === '8'">
					<h1>手持身份证参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/sfz_sc.png" alt="手持身份证">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
				<!--司机驾驶证首页-->
				<div class="sample-box" v-if="sampleType === '9'">
					<h1>驾驶证首页参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/sj_jszsy.png" alt="驾驶证首页">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
				<!--司机驾驶证副页-->
				<div class="sample-box" v-if="sampleType === '10'">
					<h1>驾驶证副页参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/sj_jszfy.png" alt="驾驶证副页">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
				<!--司机从业资格证-->
				<div class="sample-box" v-if="sampleType === '11'">
					<h1>从业资格证参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/sj_cyzgz.png" alt="从业资格证">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>

				<!--牵引车行驶证首页-->
				<div class="sample-box" v-if="sampleType === '12'">
					<h1>行驶证首页参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/qyc_xszsy.png" alt="行驶证首页">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
				<!--牵引车行驶证副页-->
				<div class="sample-box" v-if="sampleType === '13'">
					<h1>行驶证副页参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/qyc_xszfy.png" alt="行驶证副页">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
				<!--牵引车行驶证背面-->
				<div class="sample-box" v-if="sampleType === '14'">
					<h1>行驶证背面参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/qyc_xszb.png" alt="行驶证背面">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
				<!--牵引车机动车登记证书-->
				<div class="sample-box" v-if="sampleType === '15'">
					<h1>机动车登记证书参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/qyc_jdcdjz.png" alt="机动车登记证书">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
				<!--牵引车车辆照片-->
				<div class="sample-box" v-if="sampleType === '16'">
					<h1>车辆照片参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/qyc_45.png" alt="车辆照片">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、车辆照片保证车牌号码清晰可见，无遮挡、涂改、模糊、反光等情况</li>
							<li>2、必须为彩色数码照</li>
							<li>3、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
						</ul>
					</div>
				</div>

				<!--半挂车行驶证首页-->
				<div class="sample-box" v-if="sampleType === '17'">
					<h1>行驶证首页参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/gc_xszsy.png" alt="行驶证首页">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
				<!--半挂车行驶证副页-->
				<div class="sample-box" v-if="sampleType === '18'">
					<h1>行驶证副页参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/gc_xszfy.png" alt="行驶证副页">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
				<!--半挂车行驶证背面-->
				<div class="sample-box" v-if="sampleType === '19'">
					<h1>行驶证背面参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/gc_xszb.png" alt="行驶证背面">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
				<!--半挂车机动车登记证书-->
				<div class="sample-box" v-if="sampleType === '20'">
					<h1>机动车登记证书参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/gc_jdcdjz.png" alt="机动车登记证书">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、证件上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、证件照必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
				<!--半挂车车辆照片-->
				<div class="sample-box" v-if="sampleType === '21'">
					<h1>车辆照片参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/gc_45.png" alt="车辆照片">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、车辆照片保证车牌号码清晰可见，无遮挡、涂改、模糊、反光等情况</li>
							<li>2、必须为彩色数码照</li>
							<li>3、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
						</ul>
					</div>
				</div>

				<!--办公室办公照片-->
				<div class="sample-box" v-if="sampleType === '22'">
					<h1>办公室办公参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/bgsbg.png" alt="办公室办公照片">
					</div>
					<div class="papers-sm">
						<h2>图片要求</h2>
						<ul>
							<li>1、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>2、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>3、最少上传一张</li>
						</ul>
					</div>
				</div>
				<!--办公室门头照片-->
				<div class="sample-box" v-if="sampleType === '23'">
					<h1>办公室门头参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/bgsmt.png" alt="办公室门头">
					</div>
					<div class="papers-sm">
						<h2>照片要求</h2>
						<ul>
							<li>1、照片中企业名称必须清晰可见，字迹无PS、遮挡、涂改、模糊等情况</li>
							<li>2、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>3、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
						</ul>
					</div>
				</div>
				<!--道路运输经营许可证-->
				<div class="sample-box" v-if="sampleType === '24'">
					<h1>道路运输经营许可证参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/dlysjyxkz.png" alt="道路运输经营许可证">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>2、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>3、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
				<!--委托人授权书-->
				<div class="sample-box" v-if="sampleType === '25'">
					<h1>委托人授权书参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/frdbsqs.png" alt="委托人授权书">
					</div>
					<div class="papers-sm">
						<h2>图片要求</h2>
						<ul>
							<li>1、所有信息清晰可见，字迹无PS、遮挡、涂改、模糊等情况</li>
							<li>2、必须盖有单位公章或财务专用章</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
						</ul>
					</div>
				</div>
				<!--营业执照-->
				<div class="sample-box" v-if="sampleType === '26'">
					<h1>营业执照参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/yyzz.png" alt="营业执照">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>2、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>3、证件必须在有效期内</li>
							<li>4、必须为中国大陆工商局颁发</li>
						</ul>
					</div>
				</div>
				<!--运作场地-->
				<div class="sample-box" v-if="sampleType === '27'">
					<h1>运作场地参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/yzcd.png" alt="运作场地">
					</div>
					<div class="papers-sm">
						<h2>图片要求</h2>
						<ul>
							<li>1、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>2、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>3、最少上传一张</li>
						</ul>
					</div>
				</div>
				<!--运作场地门头-->
				<div class="sample-box" v-if="sampleType === '28'">
					<h1>运作场地门头参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/yzcmt.png" alt="运作场地门头">
					</div>
					<div class="papers-sm">
						<h2>照片要求</h2>
						<ul>
							<li>1、照片中企业名称必须清晰可见，字迹无PS、遮挡、涂改、模糊等情况</li>
							<li>2、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>3、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
						</ul>
					</div>
				</div>
				<!--组织机构-->
				<div class="sample-box" v-if="sampleType === '29'">
					<h1>组织机构参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/zzjgt.png" alt="组织机构">
					</div>
					<div class="papers-sm">
						<h2>图片要求</h2>
						<ul>
							<li>1、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>2、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
						</ul>
					</div>
				</div>
				<!--开户许可证-->
				<div class="sample-box" v-if="sampleType === '30'">
					<h1>开户许可证参考示例图</h1>
					<div class="sample-img">
						<img src="../../images/sampleGraph/khxkz.png" alt="道路运输许可证">
					</div>
					<div class="papers-sm">
						<h2>证件要求</h2>
						<ul>
							<li>1、保单上所有信息清晰可见，字迹无PS、遮挡、涂改、模糊、反光等情况</li>
							<li>2、照片必须完整，保单四个边角需漏出，无残缺、断裂、破损等情况</li>
							<li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
							<li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
							<li>5、证件必须在有效期内</li>
						</ul>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return{
				// sampleType:0
			}
		},
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			sampleType:{
				type: String,
				default: ''
			}

		},
		methods:{
			closeModal: function () {
				this.$emit('update:visible', false)
			}
		},

	}
</script>

<style>

</style>
