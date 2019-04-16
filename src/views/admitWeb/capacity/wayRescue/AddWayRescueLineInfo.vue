<template>
	<div class="case">
		<div class="header clear">
			<img src="../../../../images/capacity/logo.png" alt="logo">
			<div class="tabbar">
				<a href="javascript:" @click="$router.push('/Register')">注册</a>
				<a href="javascript:" @click="$router.push('/login')">登录</a>
				<a href="https://www.iyunche.com/index?index=1">返回官网</a>
				<a href="javascript:;">常见问题</a>
			</div>
		</div>
		<div class="content">
			<div class="content-in" style="min-height: 636px">
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
						<div class="manage-tip-txt">为了保证您的报价有竞争力，建议在专线报价前，先行参考行业内价格水平，以免因为报价过低或过高造成损失，感谢您的配合。</div>
					</div>
					<div class="car-way no-choice-box">
						<div class="car-way-btn">
							<el-button @click="addSmallLineInfo = true" type="primary">新增专线</el-button>
						</div>
						<div class="car-tabs">
							<!--暂无车辆信息显示，默认car-way-nothing是隐藏的car-way-nothing里面的table只做显示用，有数据显示就执行下面的table-->
							<div class="car-way-nothing">
										<div class="car-way-no">
											<i class="el-icon-warning"></i>
											<span>暂无专线信息，请先新增专线</span>
										</div>
										<el-table
												border
												style="width: 100%;">
											<el-table-column
													width="60px"
													label="序号">
											</el-table-column>
											<el-table-column
													label="业务城市">
											</el-table-column>
											<el-table-column
													label="小板种类">
											</el-table-column>
											<el-table-column
													label="板式">
											</el-table-column>
											<el-table-column
													label="报价详情">
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
							<div class="car-way-table">
										<el-table
												:data="tableData"
												border
												style="width: 100%">
											<el-table-column
													prop=""
													label="序号"
													width="60">
											</el-table-column>
											<el-table-column
													prop=""
													label="业务城市"
													width="160">
											</el-table-column>
											<el-table-column
													prop=""
													label="小板种类"
													width="200">
											</el-table-column>
											<el-table-column
													prop=""
													label="板式"
													width="200">
											</el-table-column>
											<el-table-column
													prop=""
													label="报价详情"
													width="120">
											</el-table-column>
											<el-table-column
													prop=""
													label="创建时间"
													width="170">
											</el-table-column>
											<el-table-column fixed="right" label="操作" width="220">
												<template slot-scope="scope">
													<el-button type="text" size="small" @click="addSmallLineInfo = true">编辑</el-button>
													<el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
													<el-button type="text" size="small" @click="smallLineInfo = true">详情</el-button>
												</template>
											</el-table-column>
										</el-table>
									</div>
							<div class="car-way-page-btn">
								<el-button>上一步</el-button>
								<el-button type="primary">提 交</el-button>
							</div>
						</div>
					</div>


				</div>

			</div>
		</div>


		<!-- 新增专线弹窗 -->
		<el-dialog class="capacity-pop" title="新增专线信息" :visible.sync="addSmallLineInfo" width="74%" center>
			<div class="capacity-pop-in">
				<div class="line-tips">所有的报价请按照<span>标准车型</span>进行报价，报价前请参考行业内价格水平，以免因为价格过高或过低造成不必要的损失！！！</div>
				<el-form :model="addSmallLineInfoForm" :rules="addSmallLineInfoRules" ref="addSmallLineInfoForm" label-width="90px" class="demo-ruleForm">
					<div class="clear smallLine-box">
						<div class="smallLine-l"><i class="not-null">*</i>报价方式</div>
						<div class="smallLine-r clear">
							<!-- 同城报价 -->
							<el-checkbox v-model="checked">同城报价</el-checkbox>
							<div class="tc-quote-box">
								<div class="tc-quote-item clear">
									<div class="tc-quote">
										<div class="quote-item clear">
											<el-form-item class="common-address" label="业务城市" prop="">
												<el-select placeholder="请选择省"></el-select>
												<el-select placeholder="请选择市"></el-select>
											</el-form-item>
											<el-form-item label="小板种类" prop="">
												<el-select placeholder="请选择"></el-select>
											</el-form-item>
											<el-form-item label="板式" prop="">
												<el-select placeholder="请选择"></el-select>
											</el-form-item>
										</div>
										<el-form-item label="调板时长" prop="">
											<el-input style="width: 24%;" placeholder="请输入调板时长"></el-input>&nbsp;&nbsp;小时
										</el-form-item>
										<el-form-item label="起步价">
											<div class="quote-other">
												<el-input style="width: 20%;"></el-input>&nbsp;&nbsp;元，包含&nbsp;&nbsp;<el-input style="width: 15%;"></el-input>&nbsp;&nbsp;公里，每增加<i>1</i>公里，增加&nbsp;&nbsp;<el-input style="width: 15%;"></el-input>&nbsp;&nbsp;元
											</div>
										</el-form-item>
									</div>
									<i class="el-icon-circle-plus"></i>
								</div>
								<div class="tc-quote-item clear">
									<div class="tc-quote">
										<div class="quote-item clear">
											<el-form-item class="common-address" label="业务城市" prop="">
												<el-select placeholder="请选择省"></el-select>
												<el-select placeholder="请选择市"></el-select>
											</el-form-item>
											<el-form-item label="小板种类" prop="">
												<el-select placeholder="请选择"></el-select>
											</el-form-item>
											<el-form-item label="板式" prop="">
												<el-select placeholder="请选择"></el-select>
											</el-form-item>
										</div>
										<el-form-item label="调板时长" prop="">
											<el-input style="width: 24%;" placeholder="请输入调板时长"></el-input>&nbsp;&nbsp;小时
										</el-form-item>
										<el-form-item label="起步价">
											<div class="quote-other">
												<el-input style="width: 20%;"></el-input>&nbsp;&nbsp;元，包含&nbsp;&nbsp;<el-input style="width: 15%;"></el-input>&nbsp;&nbsp;公里，每增加<i>1</i>公里，增加&nbsp;&nbsp;<el-input style="width: 15%;"></el-input>&nbsp;&nbsp;元
											</div>
										</el-form-item>
									</div>
									<i class="el-icon-remove"></i>
								</div>
							</div>
							<!-- 一口报价 -->
							<el-checkbox class="marginTop20" v-model="checked">一口报价</el-checkbox>
							<ul class="quote-tip">
								<li><span>承运范围说明：</span>是指当前所填范围内任意起点-终点，比如，业务城市为“北京市”承运范围为“三环以内”，那么在三环内任意起点-终点的承运价都是所填写的一口报价，与公里数无关；</li>
								<li><span>添加范围说明：</span>如果一个业务城市下会有不同承运范围，请点击“添加范围”按钮添加承运范围；如果需要添加多个业务城市请点击右侧“<i class="el-icon-circle-plus"></i>”添加业务城市</li>
							</ul>
							<div class="yk-quote-box">
								<div class="tc-quote-item clear">
									<div class="tc-quote">
										<div class="quote-item clear">
											<el-form-item class="common-address" label="业务城市" prop="">
												<el-select placeholder="请选择省"></el-select>
												<el-select placeholder="请选择市"></el-select>
											</el-form-item>
											<el-form-item label="小板种类" prop="">
												<el-select placeholder="请选择"></el-select>
											</el-form-item>
											<el-form-item label="板式" prop="">
												<el-select placeholder="请选择"></el-select>
											</el-form-item>
										</div>
										<el-form-item label="调板时长" prop="">
											<el-input style="width: 24%;" placeholder="请输入调板时长"></el-input>&nbsp;&nbsp;小时
										</el-form-item>
										<div class="yk-quote-other clear">
											<el-form-item label="承运范围">
												<el-input placeholder="请输入承运范围"></el-input>
											</el-form-item>
											<el-form-item label="一口报价">
												<el-input placeholder="请输入承运范围"></el-input>
											</el-form-item>
											<span style="position: relative;top: 12px;">&nbsp;&nbsp;元</span>
											<span class="addfw">添加范围</span>
										</div>
									</div>
									<i class="el-icon-circle-plus"></i>
								</div>
								<div class="tc-quote-item clear">
									<div class="tc-quote">
										<div class="quote-item clear">
											<el-form-item class="common-address" label="业务城市" prop="">
												<el-select placeholder="请选择省"></el-select>
												<el-select placeholder="请选择市"></el-select>
											</el-form-item>
											<el-form-item label="小板种类" prop="">
												<el-select placeholder="请选择"></el-select>
											</el-form-item>
											<el-form-item label="板式" prop="">
												<el-select placeholder="请选择"></el-select>
											</el-form-item>
										</div>
										<el-form-item label="调板时长" prop="">
											<el-input style="width: 24%;" placeholder="请输入调板时长"></el-input>&nbsp;&nbsp;小时
										</el-form-item>
										<div class="yk-quote-other clear">
											<el-form-item label="承运范围">
												<el-input placeholder="请输入承运范围"></el-input>
											</el-form-item>
											<el-form-item label="一口报价">
												<el-input placeholder="请输入承运范围"></el-input>
											</el-form-item>
											<span style="position: relative;top: 12px;">&nbsp;&nbsp;元</span>
											<span class="addfw">添加范围</span>
										</div>
									</div>
									<i class="el-icon-remove"></i>
								</div>
							</div>
							<!-- 城际报价 -->
							<el-checkbox class="marginTop20" v-model="checked">城际报价</el-checkbox>
							<div class="cj-quote-box line-table car-tabs">
								<!-- 无数据 -->
								<div class="car-way-nothing">
									<div class="car-way-no" style="top: 58px;">
										<i class="el-icon-warning"></i>
										<span>暂无报价信息，请通过下方添加线路按钮添加城际报价</span>
									</div>
									<el-table
											border
											style="width: 100%;">
										<el-table-column
												label="始发城市">
										</el-table-column>
										<el-table-column
												label="到达城市">
										</el-table-column>
										<el-table-column
												width="160px"
												label="调板时长（小时）">
										</el-table-column>
										<el-table-column
												label="小板种类">
										</el-table-column>
										<el-table-column
												label="板式">
										</el-table-column>
										<el-table-column
												width="140px"
												label="报价（元/公里）">
										</el-table-column>
										<el-table-column
												label="操作">
										</el-table-column>
									</el-table>
								</div>
								<!-- 有数据 -->
								<div class="car-way-table">
									<el-table
											:data="tableData"
											border
											style="width: 100%;">
										<el-table-column
												prop=""
												width="160px"
												label="始发城市">
										</el-table-column>
										<el-table-column
												prop=""
												width="160px"
												label="到达城市">
										</el-table-column>
										<el-table-column
												width="160px"
												prop=""
												label="调板时长（小时）">
										</el-table-column>
										<el-table-column
												prop=""
												label="小板种类">
										</el-table-column>
										<el-table-column
												prop=""
												label="板式">
										</el-table-column>
										<el-table-column
												width="140px"
												prop=""
												label="报价（元/公里）">
										</el-table-column>
										<el-table-column fixed="right" label="操作" width="180">
											<template slot-scope="scope">
												<el-button type="text" @click="addSmallLine = true " size="small">编辑</el-button>
												<el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
											</template>
										</el-table-column>
									</el-table>
								</div>
								<span @click="addSmallLine = true" class="addxl">添加线路</span>
							</div>
						</div>
					</div>
				</el-form>
				<div class="import-bottom">
					<el-button @click="addSmallLineInfo = false">取 消</el-button>
					<el-button type="primary" @click="addSmallLineInfo = false">确定</el-button>
				</div>
			</div>
		</el-dialog>
		<!-- 添加线路 -->
		<el-dialog class="capacity-pop" title="添加线路" :visible.sync="addSmallLine" width="74%" center>
			<div class="capacity-pop-in">
				<div class="line-tips">同一始发到达城市、小板种类、板式无法重复添加报价，请重新添加报价</div>
				<el-form :model="addSmallLineForm" :rules="addSmallLineRules" ref="addSmallLineForm" label-width="90px" class="demo-ruleForm addsmall">
					<div class="quote-item clear">
						<el-form-item class="common-address" label="始发城市" prop="">
							<el-select placeholder="请选择省"></el-select>
							<el-select placeholder="请选择市"></el-select>
						</el-form-item>
						<el-form-item class="common-address" label="到达城市" prop="">
							<el-select placeholder="请选择省"></el-select>
							<el-select placeholder="请选择市"></el-select>
						</el-form-item>
						<el-form-item label="调板时长" prop="">
							<el-input style="width: 81%;" placeholder="请输入调板时长"></el-input>&nbsp;&nbsp;小时
						</el-form-item>
					</div>
					<div class="quote-item clear">
						<el-form-item label="小板种类" prop="">
							<el-select></el-select>
						</el-form-item>
						<el-form-item label="板式" prop="">
							<el-select></el-select>
						</el-form-item>
						<el-form-item label="报价" prop="">
							<el-input style="width: 72%;"></el-input>&nbsp;&nbsp;元/公里
						</el-form-item>
					</div>
				</el-form>
				<div class="import-bottom">
					<el-button @click="addSmallLine = false">取 消</el-button>
					<el-button type="primary" @click="addSmallLine = false">确定</el-button>
				</div>
			</div>
		</el-dialog>

		<!-- 专线详情信息 -->
		<el-dialog class="capacity-pop" title="专线详情信息" :visible.sync="smallLineInfo" width="74%" center>
			<div class="capacity-pop-in">
				<el-form label-width="90px" class="demo-ruleForm small-xq">
					<div class="clear smallLine-box">
						<div class="smallLine-l"><i class="not-null">*</i>报价方式</div>
						<div class="smallLine-r clear">
							<!-- 同城报价 -->
							<h4 class="quote-tit">同城报价</h4>
							<div class="tc-quote-box">
								<div class="tc-quote-item clear">
									<div class="tc-quote">
										<div class="quote-item clear">
											<el-form-item label="业务城市" prop="">
												北京市-北京市
											</el-form-item>
											<el-form-item label="小板种类" prop="">
												落地板
											</el-form-item>
											<el-form-item label="板式" prop="">
												开放式
											</el-form-item>
											<el-form-item label="调板时长" prop="">
												1小时
											</el-form-item>
										</div>
										<el-form-item label="起步价">
											<div class="quote-other">
												<i>150.00</i>元，包含<i>10</i>公里，每增加<i>1</i>公里，增加<i>10.00</i>元
											</div>
										</el-form-item>
									</div>
								</div>
							</div>
							<!-- 一口报价 -->
							<h4 class="quote-tit marginTop20">一口报价</h4>
							<div class="yk-quote-box">
								<div class="tc-quote-item clear">
									<div class="tc-quote">
										<div class="quote-item clear">
											<el-form-item class="common-address" label="业务城市" prop="">
												北京市-北京市
											</el-form-item>
											<el-form-item label="小板种类" prop="">
												落地板
											</el-form-item>
											<el-form-item label="板式" prop="">
												开放式
											</el-form-item>
											<el-form-item label="调板时长" prop="">
												1小时
											</el-form-item>
										</div>
										<div class="yk-quote-other clear">
											<el-form-item label="承运范围">
												三环以内
											</el-form-item>
											<el-form-item label="一口报价">
												<i class="">300.00</i>元
											</el-form-item>
										</div>
										<div class="yk-quote-other clear">
											<el-form-item label="承运范围">
												三环以内
											</el-form-item>
											<el-form-item label="一口报价">
												<i class="">300.00</i>元
											</el-form-item>
										</div>
									</div>
								</div>
							</div>
							<!-- 城际报价 -->
							<h4 class="quote-tit marginTop20">城际报价</h4>
							<div class="cj-quote-box line-table car-tabs">
								<!-- 有数据 -->
								<div class="car-way-table">
									<el-table
											:data="tableData"
											border
											style="width: 100%;">
										<el-table-column
												prop=""
												label="始发城市">
										</el-table-column>
										<el-table-column
												prop=""
												label="到达城市">
										</el-table-column>
										<el-table-column
												width="160px"
												prop=""
												label="调板时长（小时）">
										</el-table-column>
										<el-table-column
												prop=""
												label="小板种类">
										</el-table-column>
										<el-table-column
												prop=""
												label="板式">
										</el-table-column>
										<el-table-column
												width="140px"
												prop=""
												label="报价（元/公里）">
										</el-table-column>
									</el-table>
								</div>
							</div>
						</div>
					</div>
				</el-form>
				<div class="import-bottom">
					<el-button @click="smallLineInfo = false">取 消</el-button>
					<el-button type="primary" @click="smallLineInfo = false">确定</el-button>
				</div>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	export default {

		data() {

			return {
				imgSrc:"../../../../images/register/imgTest.jpg",
				screenHeight: document.documentElement.clientHeight, // 屏幕高度
				active: 2, //步骤栏默认
				activePop:0,
				radio: '1',
				img1: false,
				checked:true,
				fileList: [],
				imageUrl: '',   //图片地址
				smallLineInfo:false, //小板专线详情信息
				addSmallLineInfo:false, //新增小板专线弹窗
				addSmallLineInfoForm:{},
				addSmallLineInfoRules:{},
				addSmallLine:false,//添加线路
				addSmallLineForm:{},
				addSmallLineRules:{},
				tableData: [{
					orderNumber: '1',
					startCity: '北京市-海淀区',
					endCity: '上海市-虹桥区',
					kilometre: '1300',
					roadCity: '1',
					line: '3',
					time:'2019-03-12 15:19:20'
				}, {
					orderNumber: '2',
					startCity: '北京市-海淀区',
					endCity: '上海市-虹桥区',
					kilometre: '1300',
					roadCity: '1',
					line: '3',
					time:'2019-03-12 15:19:20'
				}]

			}
		},
		mounted() {
			var _this = this;
			window.onresize = function() { // 定义窗口大小变更通知事件
				_this.screenHeight = document.documentElement.clientHeight // 窗口高度
			}
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
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
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			//上传证件
			handleClick(index,row) {
				console.log(index,row);
			},
			//编辑
			handleEdit(index, row) {
				console.log(index, row);
			},
			//删除
			handleDelete(index, row) {
				console.log(index, row);
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
