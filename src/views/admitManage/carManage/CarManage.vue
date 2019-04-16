<template>
	<div class="case">
		<h2 class="manage-title">车辆列表</h2>
		<div class="capacity-manage">
			<div class="car-way line-choice">
				<div class="car-way-btn">
					<el-button v-if="activeName === 'first'" @click="carHeadBindingVisible = true;CarChengeTitle='绑定车辆'">绑定车辆</el-button>
					<el-button v-if="activeName === 'second'" @click="openUpload(1)">批量导入</el-button>
					<el-button v-if="activeName === 'second'" @click="addHeadstock = true" type="primary">添加车头</el-button>
					<el-button v-if="activeName === 'third'" @click="openUpload(2)">批量导入</el-button>
					<el-button v-if="activeName === 'third'" @click="addTrailer = true" type="primary">添加车挂</el-button>
				</div>
				<div class="car-tabs list-search-box">
					<el-tabs type="border-card" v-model="activeName" @tab-click="tabClick">
						<el-tab-pane name="first" label="车辆列表">
							<!-- 搜索框 -->
							<el-form label-width="80px" class="demo-ruleForm" :model="selectCarList">
								<div class="search-manage small-search small-car-search clear">
									<div class="search-l clear">
										<el-form-item label="车牌号码">
											<el-input v-model="selectCarList.dlPlateNo" placeholder="请输入车牌号码"></el-input>
										</el-form-item>
										<el-form-item label="板位数">
											<el-select v-model="selectCarList.plateNum" placeholder="请选择">
												<el-option :value=0 label="0"></el-option>
												<el-option :value=4 label="4"></el-option>
												<el-option :value=5 label="5"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item class="search-date" label="更新时间" prop="">
											<el-date-picker type="date" placeholder="开始日期" value-format="yyyy-MM-dd" v-model="selectCarList.modifyTimeStart">
											</el-date-picker>
											<span>至</span>
											<el-date-picker type="date" placeholder="结束日期" value-format="yyyy-MM-dd" v-model="selectCarList.modifyTimeEnd">
											</el-date-picker>
										</el-form-item>
										<el-form-item label="GPS品牌">
											<el-select v-model="selectCarList.gpsBrand" placeholder="请选择">
												<el-option :value="1" label="G7">G7</el-option>
												<el-option :value="2" label="北斗">北斗</el-option>
												<el-option :value="0" label="其他">其他</el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="司机姓名">
											<el-input placeholder="请输入司机姓名" v-model="selectCarList.driverName"></el-input>
										</el-form-item>
									</div>
									<el-button class="search-r" type="primary" @click="findCarList">搜 索</el-button>
								</div>
							</el-form>
							<div class="car-way-table">
								<el-table
										:data="tableData"
										border
										style="width: 100%;">
									<el-table-column width="60px" label="序号"
													 type="index">
									</el-table-column>
									<el-table-column
											label="车牌号码"
											width="120px"
											prop="dlPlateNo">
										<template slot-scope="scope">
											<span @click="openCarDetailsInfoMobel(scope.row.headStockPkId,'1','车辆详情信息')" class="car-way-blue">{{scope.row.dlPlateNo}}</span>
										</template>
									</el-table-column>
									<el-table-column
											label="板位数"
											prop="plateNum">
									</el-table-column>
									<el-table-column
											label="车辆状态"
											width="120px"
											prop="carStatus">
									</el-table-column>
									<el-table-column
											label="挂车牌号"
											width="160px"
											prop="trailerPlateNo">
										<template slot-scope="scope">
											<span @click="openCarDetailsInfoMobel(scope.row.headStockPkId,'1','车辆详情信息')" class="car-way-blue">{{scope.row.trailerPlateNo}}</span>
										</template>
									</el-table-column>
									<el-table-column
											label="主司机"
											width="100px"
											prop="mainDriver">
										<template slot-scope="scope">
											<span @click="carDetailsInfoShow(scope.row.mainDriverId)" class="car-way-blue">{{scope.row.mainDriver}}</span>
										</template>
									</el-table-column>
									<el-table-column
											label="副司机"
											width="100px"
											prop="viceDriver">
										<template slot-scope="scope">
											<span @click="carDetailsInfoShow(scope.row.viceDriverId)" class="car-way-blue">{{scope.row.viceDriver}}</span>
										</template>
									</el-table-column>
									<el-table-column
											label="更新时间"
											width="160px"
											prop="upDateTime">
									</el-table-column>
									<el-table-column fixed="right" label="操作" width="220px">
										<template slot-scope="scope">
											<el-button  type="text" @click="carHeadBindingVisible = true;CarChengeTitle='更换挂车',carHeadBindingModel={headstockId:scope.row.dlPlateNo,dlPlateNo:scope.row.trailerPlateNo}">更换挂车</el-button>
											<el-button  type="text" @click="removeTrailer(scope.row.headStockPkId)">解绑挂车</el-button>
											<el-button v-if="scope.row.viceDriver != null "  type="text" @click="removeDriver(scope.row.headStockPkId)">解绑司机</el-button>
											<el-button  type="text" @click="changeDriver = true,changeDriverForm={headstockId:scope.row.headStockPkId}">添加/更换司机</el-button>
										</template>
									</el-table-column>
								</el-table>
								<!--分页-->
								<!--<div class="page-manage">
									<el-pagination
											@size-change="handleSizeChange"
											@current-change="handleCurrentChange"
											:current-page="currentPage4"
											:page-sizes="[10, 20, 30, 40]"
											:page-size="100"
											layout="total, sizes, prev, pager, next, jumper"
											:total="400">
									</el-pagination>
								</div>-->
							</div>
						</el-tab-pane>
						<el-tab-pane name="second" label="车头列表">
							<!-- 搜索框 -->

							<el-form label-width="80px" class="demo-ruleForm" :model="selectCarHeadsList">
								<div class="search-manage small-search small-car-search clear">
									<div class="search-l clear">

										<el-form-item label="车牌号码">
											<el-input v-model="selectCarHeadsList.dlPlateNo" placeholder="请输入车牌号码"></el-input>
										</el-form-item>
										<!--<el-form-item label="审核状态">
											<el-select></el-select>
										</el-form-item>-->
										<el-form-item label="司机姓名">
											<el-input placeholder="请输入司机姓名" v-model="selectCarHeadsList.driverUsername"></el-input>
										</el-form-item>
										<el-form-item label="车辆类型">
											<el-input v-model="selectCarHeadsList.dlCarType" placeholder="请输入车辆类型"></el-input>
										</el-form-item>
										<!--<el-form-item class="search-date" label="审核时间" prop="">
											<el-date-picker type="date" placeholder="开始日期">
											</el-date-picker>
											<span>至</span>
											<el-date-picker type="date" placeholder="结束日期">
											</el-date-picker>
										</el-form-item>-->
										<el-form-item class="search-date" label="更新时间" prop="">
											<el-date-picker type="date" placeholder="开始日期"  value-format="yyyy-MM-dd" v-model="selectCarHeadsList.modifyTimeStart">
											</el-date-picker>
											<span>至</span>
											<el-date-picker type="date" placeholder="结束日期" value-format="yyyy-MM-dd" v-model="selectCarHeadsList.modifyTimeEnd">
											</el-date-picker>
										</el-form-item>
										<el-form-item label="板位数">
											<el-select v-model="selectCarHeadsList.plateNum" placeholder="请选择">
												<el-option :value=0 label="0"></el-option>
												<el-option :value=4 label="4"></el-option>
												<el-option :value=5 label="5"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="运输许可证号" label-width="110px">
											<el-input placeholder="请输入运输许可证号" v-model="selectCarHeadsList.rpNo"></el-input>
										</el-form-item>
									</div>
									<el-button class="search-r" type="primary" @click="findCarHeadList">搜 索</el-button>
								</div>
							</el-form>
							<!--暂无车辆信息显示，默认car-way-nothing是隐藏的car-way-nothing里面的table只做显示用，有数据显示就执行下面的table-->
							<div class="car-way-nothing"  v-if="headStocktableData === null">
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
									<el-table-column label="板位数">
									</el-table-column>
									<el-table-column label="主司机">
									</el-table-column>
									<el-table-column label="副司机">
									</el-table-column>
									<el-table-column label="检验有效期止" width="120px">
									</el-table-column>
									<el-table-column label="运输许可证号" width="120px">
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
							<!-- 有数据时 -->
							<div class="car-way-table" v-if="headStocktableData !== null">
								<el-table
										:data="headStocktableData"
										border
										style="width: 100%;">
									<el-table-column
											width="60px"
											label="序号"
											type="index">
									</el-table-column>
									<el-table-column
											label="车牌号码"
											width="120px"
											prop="dlPlateNo">
										<template slot-scope="scope">
											<span @click="openCarDetailsInfoMobel(scope.row.headStockPkId,'1','车辆详情信息')" class="car-way-blue">{{scope.row.dlPlateNo}}</span>
										</template>
									</el-table-column>
									<el-table-column
											label="车辆类型"
											width="120px"
											prop="dlCarType">
									</el-table-column>
									<el-table-column
											label="板位数"
											prop="plateNum">
									</el-table-column>
									<el-table-column
											label="主司机"
											width="100px"
											prop="mainDriver">
										<template slot-scope="scope">
											<span @click="carDetailsInfoShow(scope.row.mainDriverId)" class="car-way-blue">{{scope.row.mainDriver}}</span>
										</template>
									</el-table-column>
									<el-table-column
											label="副司机"
											width="100px"
											prop="viceDriver">
										<template slot-scope="scope">
											<span @click="carDetailsInfoShow(scope.row.viceDriverId)" class="car-way-blue">{{scope.row.viceDriver}}</span>
										</template>
									</el-table-column>

									<el-table-column
											label="检验有效期止"
											width="160px"
											prop="dlCheckEndTime"  :formatter="this.common.formatterDate">
										<!--<template slot-scope="scope">
											<span @click="carDetailsInfoShow(scope.row.pkId)" class="car-way-blue">{{scope.row.dlCheckEndTime}}</span>
											<el-button type="danger" size="mini">{{scope.row.dlCheckEndTimeStatus}}</el-button>
										</template>-->
									</el-table-column>
									<el-table-column
											label="运输许可证号"
											width="160px"
											prop="rpNo">
										<template slot-scope="scope">
											<span @click="openCarDetailsInfoMobel(scope.row.headStockPkId,'2','运输许可证详情')" class="car-way-blue">{{scope.row.rpNo}}</span>

										</template>
									</el-table-column>
									<el-table-column
											label="保险详情"
											width="120px"
											prop="">
										<template slot-scope="scope">
											<span @click="openCarDetailsInfoMobel(scope.row.headStockPkId,'3','保险详情')" class="car-way-blue">查看</span>
										</template>
									</el-table-column>
									<el-table-column label="审核状态" width="120px" prop="verifyStatus">
										<template slot-scope="scope">
											<span v-if="scope.row.verifyStatus === 0">待提交</span>
											<span v-else-if="scope.row.verifyStatus === 1">审核成功</span>
											<span v-else-if="scope.row.verifyStatus === 2">审核失败</span>
											<span v-else-if="scope.row.verifyStatus === 3">审核中</span>
										</template>
									</el-table-column>
									<el-table-column label="审核时间" width="160px"  prop="verifyTime"  :formatter="this.common.formatterDateTime">
									</el-table-column>
									<el-table-column
											label="更新时间"
											width="160px"
											prop="upDateTime">
									</el-table-column>
									<el-table-column fixed="right" label="操作" width="220px">
										<template slot-scope="scope">
                                            <el-button type="text" size="small" v-if=" scope.row.verifyStatus === 2"
                                                       @click="addHeadstock = true, carHeadPkId=scope.row.headStockPkId">
                                                重新提交
                                            </el-button>
											<el-button type="text" size="small" v-if="scope.row.verifyStatus === 0 && scope.row.isUpPic === 1"
													   @click="addHeadstock = true, carHeadPkId=scope.row.headStockPkId">
												编辑
											</el-button>
											<el-button type="text" size="small"
													   @click="addBatchImg = true, addCarType = 1, carPkId=scope.row.headStockPkId"  v-if="scope.row.isUpPic === 0 && scope.row.verifyStatus === 0">上传证件
												</el-button>
											<el-button type="text" v-if="scope.row.verifyStatus === 1" @click="findCarHeadInfo(scope.row.headStockPkId,'2','更新保险信息')">更新保险</el-button>
											<el-button type="text"  v-if="scope.row.verifyStatus === 1"@click="findCarHeadInfo(scope.row.headStockPkId,'1','编辑车辆信息')">编辑</el-button>
											<el-button type="text"  v-if="scope.row.verifyStatus === 0|| scope.row.verifyStatus === 1 || scope.row.verifyStatus === 2 "size="small"
													   @click="delCarHead(scope.$index, scope.row)">删除</el-button>
										</template>
									</el-table-column>

								</el-table>
								<!--分页-->
								<!--<div class="page-manage">
									<el-pagination
											@size-change="handleSizeChange"
											@current-change="handleCurrentChange"
											:current-page="currentPage4"
											:page-sizes="[100, 200, 300, 400]"
											:page-size="100"
											layout="total, sizes, prev, pager, next, jumper"
											:total="400">
									</el-pagination>
								</div>-->
							</div>
						</el-tab-pane>
						<el-tab-pane name="third" label="挂车列表">
							<!-- 搜索框 -->
							<el-form label-width="80px" class="demo-ruleForm" :model="selectCarTrailerList">
								<div class="search-manage small-search small-car-search clear">
									<div class="search-l clear">
										<el-form-item label="车牌号码">
											<el-input placeholder="请输入车牌号码" v-model="selectCarTrailerList.dlPlateNo"></el-input>
										</el-form-item>
										<!--<el-form-item label="审核状态">
											<el-select></el-select>
										</el-form-item>-->
										<el-form-item label="车辆类型">
											<el-input placeholder="请输入车辆类型" v-model="selectCarTrailerList.dlCarType"></el-input>
										</el-form-item>
										<el-form-item label="板位数">
											<el-select v-model="selectCarTrailerList.plateNum" placeholder="请选择">
												<el-option :value=4 label="4"></el-option>
												<el-option :value=5 label="5"></el-option>
												<el-option :value=6 label="6"></el-option>
												<el-option :value=7 label="7"></el-option>
												<el-option :value=8 label="8"></el-option>
											</el-select>
										</el-form-item>
										<!--<el-form-item class="search-date" label="审核时间" prop="">
											<el-date-picker type="date" placeholder="开始日期">
											</el-date-picker>
											<span>至</span>
											<el-date-picker type="date" placeholder="结束日期">
											</el-date-picker>
										</el-form-item>-->
										<el-form-item class="search-date" label="更新时间" prop="">
											<el-date-picker type="date" placeholder="开始日期"  value-format="yyyy-MM-dd" v-model="selectCarTrailerList.modifyTimeStart">
											</el-date-picker>
											<span>至</span>
											<el-date-picker type="date" placeholder="结束日期"  value-format="yyyy-MM-dd" v-model="selectCarTrailerList.modifyTimeEnd">
											</el-date-picker>
										</el-form-item>
										<el-form-item label="运输许可证号" label-width="110px">
											<el-input placeholder="请输入运输许可证号" v-model="selectCarTrailerList.rpNo"></el-input>
										</el-form-item>

									</div>
									<el-button class="search-r" type="primary" @click="findCarTrailerList">搜 索</el-button>
								</div>
							</el-form>
							<!--暂无车辆信息显示，默认car-way-nothing是隐藏的car-way-nothing里面的table只做显示用，有数据显示就执行下面的table-->
							<div class="car-way-nothing" v-if="trailertableData === null">
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
									<el-table-column label="板位数">
									</el-table-column>
									<el-table-column label="长宽高">
									</el-table-column>
									<el-table-column label="检验有效期止" width="120px">
									</el-table-column>
									<el-table-column label="运输许可证号" width="120px">
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
							<div class="car-way-table" v-if="trailertableData  !==null">
								<el-table
										:data="trailertableData"
										border
										style="width: 100%;">
									<el-table-column
											width="60px"
											label="序号"
											type="index">
									</el-table-column>
									<el-table-column
											label="挂车牌号"
											width="120px"
											prop="dlPlateNo">
										<template slot-scope="scope">
											<span @click="openCarTrailerInfoMobel(scope.row.pkId,'1','车辆详情')" class="car-way-blue">{{scope.row.dlPlateNo}}</span>
										</template>
									</el-table-column>
									<el-table-column
											label="车辆类型"
											width="120px"
											prop="dlCarType">
									</el-table-column>
									<el-table-column
											label="板位数"
											prop="plateNum">
									</el-table-column>
									<el-table-column
											label="长宽高"
											width="140px"
											prop="dlGabarite">
									</el-table-column>
									<el-table-column
											label="检验有效期止"
											width="160px"
											prop="dlCheckEndTime">
										<!--<template slot-scope="scope">
											<span @click="carDetailsInfoShow(scope.row.pkId)" class="car-way-blue">{{scope.row.dlCheckEndTime}}</span>
                                            <el-button type="danger" size="mini">{{scope.row.dlCheckEndTimeStatus}}</el-button>
										</template>-->
									</el-table-column>
									<el-table-column
											label="运输许可证号"
											width="140px"
											prop="rpNo">
										<template slot-scope="scope">
											<span @click="openCarTrailerInfoMobel(scope.row.pkId,'2','运输证详情')"  class="car-way-blue">{{scope.row.rpNo}}</span>

										</template>
									</el-table-column>
									<el-table-column
											label="保险详情"
											width="120px"
											prop="">
										<template slot-scope="scope">
											<span @click="openCarTrailerInfoMobel(scope.row.pkId,'3','保险详情')"  class="car-way-blue">查看</span>
										</template>
									</el-table-column>
									<el-table-column label="审核状态" width="120px" prop="verifyStatus">
										<template slot-scope="scope">
											<span v-if="scope.row.verifyStatus === 0">待提交</span>
											<span v-else-if="scope.row.verifyStatus === 1">审核成功</span>
											<span v-else-if="scope.row.verifyStatus === 2">审核失败</span>
											<span v-else-if="scope.row.verifyStatus === 3">审核中</span>
										</template>
									</el-table-column>
									<el-table-column label="审核时间" width="160px" prop="verifyTime" :formatter="this.common.formatterDateTime">
									</el-table-column>
									<el-table-column
											label="更新时间"
											width="160px"
											prop="upDateTime">
									</el-table-column>
									<el-table-column fixed="right" label="操作" width="220px">
										<template slot-scope="scope">
                                            <el-button type="text" size="small" v-if="scope.row.verifyStatus === 2"
                                                       @click="addTrailer = true, carTrailerPkId=scope.row.pkId">
                                                重新提交
                                            </el-button>
											<el-button type="text" size="small" v-if="scope.row.verifyStatus === 0 && scope.row.isUpPic === 1"
													   @click="addTrailer = true, carTrailerPkId=scope.row.pkId">
												编辑
											</el-button>
											<el-button type="text" size="small"
													   @click="addBatchImg = true, addCarType = 2, carPkId=scope.row.pkId"  v-if="scope.row.isUpPic === 0 && scope.row.verifyStatus === 0">上传证件
											</el-button>
											<el-button type="text" v-if="scope.row.verifyStatus === 1" @click="findCarTrailerInfo(scope.row.pkId,'2','更新保险信息')">更新保险</el-button>
											<el-button type="text" v-if="scope.row.verifyStatus === 1" @click="findCarTrailerInfo(scope.row.pkId,'1','编辑车辆信息')">编辑</el-button>
											<el-button type="text" v-if="scope.row.verifyStatus === 0 || scope.row.verifyStatus === 1 || scope.row.verifyStatus === 2"
													   @click="delCarTrailer(scope.$index, scope.row)" size="small">删除</el-button>
										</template>
									</el-table-column>
								</el-table>
								<!--分页-->
								<!--<div class="page-manage">
									<el-pagination
											@size-change="handleSizeChange"
											@current-change="handleCurrentChange"
											:current-page="currentPage4"
											:page-sizes="[100, 200, 300, 400]"
											:page-size="100"
											layout="total, sizes, prev, pager, next, jumper"
											:total="400">
									</el-pagination>
								</div>-->
							</div>
						</el-tab-pane>
						<el-tab-pane label="小板车列表">
							<!-- 搜索框 -->

							<!--暂无车辆信息显示，默认car-way-nothing是隐藏的car-way-nothing里面的table只做显示用，有数据显示就执行下面的table-->


							<!--有数据显示的时候-->


						</el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</div>

		<!-- 添加/更换司机弹窗 -->
		<el-dialog class="capacity-pop capacity-line capacity-pop-big" title="添加/更换司机" :visible.sync="changeDriver" width="34%" center>
			<div class="capacity-pop-in">
				<el-form :model="changeDriverForm" :rules="changeDriverRules" ref="changeDriverForm" label-width="110px" class="demo-ruleForm">
					<el-input v-model="changeDriverForm.headstockId" type="hidden"></el-input>
					<el-form-item label="主司机" prop="driver1">
						<el-select v-model="changeDriverForm.driver1" placeholder="请选择主司机">
							<el-option
									v-for="item in driverOption"
									:key="item.userName"
									:label="item.userName"
									:value="item.pkId">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="副司机">
						<el-select v-model="changeDriverForm.driver2" placeholder="请选择副司机">
							<el-option
									v-for="item in driverOption"
									:key="item.userName"
									:label="item.userName"
									:value="item.pkId">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div class="import-bottom">
					<el-button @click="changeDriver = false">取 消</el-button>
					<el-button type="primary" @click="submitChangeDriver">确 定</el-button>
				</div>
			</div>
		</el-dialog>

		<!-- 更新车头（保险信息+基本）弹窗 -->
		<el-dialog class="capacity-pop capacity-line capacity-pop-big" :title="carDialogTitle" :visible.sync="updateInfo" width="74%" center>
			<div class="capacity-pop-in">
				<el-form :model="updateInfoForm" :rules="updateInfoRules" ref="updateInfoForm" label-width="110px" class="demo-ruleForm">
					<el-input v-model="updateInfoForm.pkId" type="hidden"></el-input>
					<div v-if="carDialogType === '1'"><!--基本信息-->
						<h2 class="info-title">基本信息</h2>
						<div class="info-item clear">
						<el-form-item label="马力" prop="horsepower">
							<el-input v-model="updateInfoForm.horsepower"></el-input>
						</el-form-item>
						<el-form-item label="发动机类型" prop="engineType">
							<el-select v-model="updateInfoForm.engineType" placeholder="请选择">
								<el-option :value=1 label="玉柴"></el-option>
								<el-option :value=2 label="锡柴"></el-option>
								<el-option :value=3 label="淮柴动"></el-option>
								<el-option :value=0 label="其他"></el-option>
							</el-select>

						</el-form-item>

						<el-form-item label="板位数" prop="plateNum">
							<el-select v-model="updateInfoForm.plateNum" placeholder="请选择">
								<el-option :value=0 label="0"></el-option>
								<el-option :value=4 label="4"></el-option>
								<el-option :value=5 label="5"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="GPS品牌" prop="gpsBrand">
							<el-select v-model="updateInfoForm.gpsBrand" placeholder="请选择">
								<el-option :value="1" label="G7">G7</el-option>
								<el-option :value="2" label="北斗">北斗</el-option>
								<el-option :value="0" label="其他">其他</el-option>

							</el-select>
						</el-form-item>
						<el-form-item label="车辆正面45°照" prop="">
							<div class="upload_box">
								<el-upload
										class="avatar-uploader"
										name="car_45_card_front"
										:action="action"
										:show-file-list="false"
										:http-request="requestUpload"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload">

									<img v-if="car_45_card_front_imageUrl" :src="car_45_card_front_imageUrl"
										 :imageType="car_45_card_front_imageUrl_type"
										 :imgName="car_45_card_front_imageUrl_name"
										 class="avatar">

									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="check_eg" @click="sampleImg = true,sampleType = '16'">查看示例</div>
							</div>
						</el-form-item>
						</div>
						<h2 class="info-title">行驶证信息</h2>
						<div class="info-item clear">
						<el-form-item label="证件照片" prop="">
							<div class="upload_box">
								<span class="tit_tit">行驶证首页</span>
								<el-upload
										class="avatar-uploader"
										name="driving_license"
										:action="action"
										:show-file-list="false"
										:http-request="requestUpload"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload">

									<img v-if="driving_license_imageUrl" :src="driving_license_imageUrl"
										 :imageType="driving_license_imageUrl_type"
										 :imgName="driving_license_imageUrl_name"
										 class="avatar">

									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="check_eg" @click="sampleImg = true,sampleType = '12'">查看示例</div>
							</div>
							<div class="upload_box">
								<span class="tit_tit">行驶副业</span>
								<el-upload
										class="avatar-uploader"
										name="driving_license_bywork"
										:action="action"
										:show-file-list="false"
										:http-request="requestUpload"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload">

									<img v-if="driving_license_bywork_imageUrl" :src="driving_license_bywork_imageUrl"
										 :imageType="driving_license_bywork_imageUrl_type"
										 :imgName="driving_license_bywork_imageUrl_name"
										 class="avatar">

									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="check_eg" @click="sampleImg = true,sampleType = '13'">查看示例</div>
							</div>
							<div class="upload_box">
								<span class="tit_tit">行驶证背面</span>
								<el-upload
										class="avatar-uploader"
										name="driving_license_back"
										:action="action"
										:show-file-list="false"
										:http-request="requestUpload"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload">

									<img v-if="driving_license_back_imageUrl" :src="driving_license_back_imageUrl"
										 :imageType="driving_license_back_imageUrl_type"
										 :imgName="driving_license_back_imageUrl_name"
										 class="avatar">

									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="check_eg" @click="sampleImg = true,sampleType = '14'">查看示例</div>
							</div>
						</el-form-item>
						<el-form-item label="机动车登记证书" prop="">
							<div class="upload_box">
								<el-upload
										class="avatar-uploader"
										name="car_registration"
										:action="action"
										:show-file-list="false"
										:http-request="requestUpload"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload">

									<img v-if="car_registration_imageUrl" :src="car_registration_imageUrl"
										 :imageType="car_registration_imageUrl_type"
										 :imgName="car_registration_imageUrl_name"
										 class="avatar">

									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="check_eg" @click="sampleImg = true,sampleType = '15'">查看示例</div>
							</div>
						</el-form-item>
						</div>

						<h2 class="info-title">运输许可证信息</h2>
						<div class="info-item clear">
						<el-form-item label="运输许可证" prop="">
							<el-upload
									class="avatar-uploader"
									name="transport_license"
									:action="action"
									:show-file-list="false"
									:http-request="requestUpload"
									:on-success="handleAvatarSuccess"
									:before-upload="beforeAvatarUpload">

								<img v-if="transport_license_imageUrl" :src="transport_license_imageUrl"
									 :imageType="transport_license_imageUrl_type"
									 :imgName="transport_license_imageUrl_name"
									 class="avatar">

								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						</div>
					</div>
					<div v-if="carDialogType === '2'"><!--保险-->
						<h2 class="info-title">车辆保险信息</h2>
						<div class="info-item clear">
						<el-form-item label="交强险保险品牌" prop="ctaliType">
							<el-select v-model="updateInfoForm.ctaliType">
								<el-option v-for="item in ctaliTypeOption"
										   :key="item.value"
										   :label="item.name"
										   :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="交强险保险单号" prop="ctaliNo">
							<el-input v-model="updateInfoForm.ctaliNo"></el-input>
						</el-form-item>
						<el-form-item class="termOfValidity" label="交强险有效期" prop="ctaliStartTime">
							<el-form-item>
							<el-date-picker
									type="date" v-model="updateInfoForm.ctaliStartTime"
									placeholder="选择日期">
							</el-date-picker>
							</el-form-item>
							<span>至</span>
							<el-form-item>
							<el-date-picker
									type="date" v-model="updateInfoForm.ctaliEndTime"
									placeholder="选择日期">
							</el-date-picker>
							</el-form-item>
						</el-form-item>
						<el-form-item label="商业险保险品牌" prop="ciType">
							<el-select v-model="updateInfoForm.ciType">
								<el-option v-for="item in ciTypeOption"
										   :key="item.value"
										   :label="item.name"
										   :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="商业险保险单号" prop="ciNo">
							<el-input v-model="updateInfoForm.ciNo"></el-input>
						</el-form-item>
						<el-form-item class="termOfValidity" label="商业险有效期" prop="ciStartTime">
							<el-form-item>
							<el-date-picker v-model="updateInfoForm.ciStartTime"
											type="date"
											placeholder="选择日期">
							</el-date-picker>
							</el-form-item>
							<span>至</span>
							<el-form-item>
							<el-date-picker v-model="updateInfoForm.ciEndTime"
											type="date"
											placeholder="选择日期">
							</el-date-picker>
							</el-form-item>
						</el-form-item>
						<el-form-item label="保险单照片" prop="">
							<div class="upload_box">
								<span class="tit_tit">交强险保险单</span>
								<el-upload
										class="avatar-uploader"
										name="compulsory_insurance"
										:action="action"
										:show-file-list="false"
										:http-request="requestUpload"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload">

									<img v-if="compulsory_insurance_imageUrl" :src="compulsory_insurance_imageUrl"
										 :imageType="compulsory_insurance_imageUrl_type"
										 :imgName="compulsory_insurance_imageUrl_name"
										 class="avatar">

									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="check_eg">&nbsp;</div>
							</div>
							<div class="upload_box">
								<span class="tit_tit">商业险保险单</span>
								<el-upload
										class="avatar-uploader"
										name="commercial_insurance"
										:action="action"
										:show-file-list="false"
										:http-request="requestUpload"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload">

									<img v-if="commercial_insurance_imageUrl" :src="commercial_insurance_imageUrl"
										 :imageType="commercial_insurance_imageUrl_type"
										 :imgName="commercial_insurance_imageUrl_name"
										 class="avatar">

									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="check_eg">&nbsp;</div>
							</div>
						</el-form-item>
						</div>
					</div>
				</el-form>
				<div class="import-bottom">
					<el-button @click="updateInfo = false">取 消</el-button>
					<el-button type="primary" @click="submitAddHeadstockForm">保 存</el-button>
				</div>
			</div>
		</el-dialog>
		<!-- 更新车挂（保险信息+基本）弹窗 -->
		<el-dialog class="capacity-pop capacity-line capacity-pop-big" :title="carDialogTitle" :visible.sync="updateCarTrailerInfo" width="74%" center>
			<div class="capacity-pop-in">
				<el-form :model="updateCarTrailerInfoForm" :rules="updateCarTrailerInfoRules" ref="updateCarTrailerInfoForm" label-width="110px" class="demo-ruleForm">
					<el-input v-model="updateCarTrailerInfoForm.pkId" type="hidden"></el-input>
					<div v-if="carDialogType === '1'"><!--基本信息-->
						<h2 class="info-title">基本信息</h2>
						<div class="info-item clear">
						<el-form-item label="板位数" prop="plateNum">
							<el-select v-model="updateCarTrailerInfoForm.plateNum" placeholder="请选择">
								<el-option :value=4 label="4"></el-option>
								<el-option :value=5 label="5"></el-option>
								<el-option :value=6 label="6"></el-option>
								<el-option :value=7 label="7"></el-option>
								<el-option :value=8 label="8"></el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="车辆正面45°照" prop="">
							<div class="upload_box">
								<el-upload
										class="avatar-uploader"
										name="car_45_card_front"
										:action="action"
										:show-file-list="false"
										:http-request="requestUpload"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload">

									<img v-if="car_45_card_front_imageUrl" :src="car_45_card_front_imageUrl"
										 :imageType="car_45_card_front_imageUrl_type"
										 :imgName="car_45_card_front_imageUrl_name"
										 class="avatar">

									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="check_eg" @click="sampleImg = true,sampleType = '21'">查看示例</div>
							</div>
						</el-form-item>
						</div>
						<h2 class="info-title">行驶证信息</h2>
						<div class="info-item clear">
						<el-form-item label="证件照片" prop="">
							<div class="upload_box">
								<span class="tit_tit">行驶证首页</span>
								<el-upload
										class="avatar-uploader"
										name="driving_license"
										:action="action"
										:show-file-list="false"
										:http-request="requestUpload"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload">

									<img v-if="driving_license_imageUrl" :src="driving_license_imageUrl"
										 :imageType="driving_license_imageUrl_type"
										 :imgName="driving_license_imageUrl_name"
										 class="avatar">

									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="check_eg" @click="sampleImg = true,sampleType = '17'">查看示例</div>
							</div>
							<div class="upload_box">
								<span class="tit_tit">行驶副业</span>
								<el-upload
										class="avatar-uploader"
										name="driving_license_bywork"
										:action="action"
										:show-file-list="false"
										:http-request="requestUpload"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload">

									<img v-if="driving_license_bywork_imageUrl" :src="driving_license_bywork_imageUrl"
										 :imageType="driving_license_bywork_imageUrl_type"
										 :imgName="driving_license_bywork_imageUrl_name"
										 class="avatar">

									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="check_eg" @click="sampleImg = true,sampleType = '18'">查看示例</div>
							</div>
							<div class="upload_box">
								<span class="tit_tit">行驶证背面</span>
								<el-upload
										class="avatar-uploader"
										name="driving_license_back"
										:action="action"
										:show-file-list="false"
										:http-request="requestUpload"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload">

									<img v-if="driving_license_back_imageUrl" :src="driving_license_back_imageUrl"
										 :imageType="driving_license_back_imageUrl_type"
										 :imgName="driving_license_back_imageUrl_name"
										 class="avatar">

									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="check_eg" @click="sampleImg = true,sampleType = '19'">查看示例</div>
							</div>
						</el-form-item>
						<el-form-item label="机动车登记证书" prop="">
							<div class="upload_box">
								<el-upload
										class="avatar-uploader"
										name="car_registration"
										:action="action"
										:show-file-list="false"
										:http-request="requestUpload"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload">

									<img v-if="car_registration_imageUrl" :src="car_registration_imageUrl"
										 :imageType="car_registration_imageUrl_type"
										 :imgName="car_registration_imageUrl_name"
										 class="avatar">

									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="check_eg" @click="sampleImg = true,sampleType = '20'">查看示例</div>
							</div>
						</el-form-item>
						</div>

						<h2 class="info-title">运输许可证信息</h2>
						<div class="info-item clear">
						<el-form-item label="运输许可证" prop="">
							<el-upload
									class="avatar-uploader"
									name="transport_license"
									:action="action"
									:show-file-list="false"
									:http-request="requestUpload"
									:on-success="handleAvatarSuccess"
									:before-upload="beforeAvatarUpload">

								<img v-if="transport_license_imageUrl" :src="transport_license_imageUrl"
									 :imageType="transport_license_imageUrl_type"
									 :imgName="transport_license_imageUrl_name"
									 class="avatar">

								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						</div>
					</div>
					<div v-if="carDialogType === '2'"><!--保险-->
						<h2 class="info-title">车辆保险信息</h2>
						<div class="info-item clear">
						<el-form-item label="交强险保险品牌" prop="ctaliType">
							<el-select v-model="updateCarTrailerInfoForm.ctaliType">
								<el-option v-for="item in ctaliTypeOption"
										   :key="item.value"
										   :label="item.name"
										   :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="交强险保险单号" prop="ctaliNo">
							<el-input v-model="updateCarTrailerInfoForm.ctaliNo"></el-input>
						</el-form-item>
						<el-form-item class="termOfValidity" label="交强险有效期" prop="ctaliStartTime">
							<el-form-item>
							<el-date-picker
									type="date" v-model="updateCarTrailerInfoForm.ctaliStartTime"
									placeholder="选择日期">
							</el-date-picker>
							</el-form-item>
							<span>至</span>
							<el-form-item>
							<el-date-picker
									type="date" v-model="updateCarTrailerInfoForm.ctaliEndTime"
									placeholder="选择日期">
							</el-date-picker>
							</el-form-item>
						</el-form-item>
						<el-form-item label="商业险保险品牌" prop="ciType">
							<el-select v-model="updateCarTrailerInfoForm.ciType">
								<el-option v-for="item in ciTypeOption"
										   :key="item.value"
										   :label="item.name"
										   :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="商业险保险单号" prop="ciNo">
							<el-input v-model="updateCarTrailerInfoForm.ciNo"></el-input>
						</el-form-item>
						<el-form-item class="termOfValidity" label="商业险有效期" prop="ciStartTime">
							<el-form-item>
							<el-date-picker v-model="updateCarTrailerInfoForm.ciStartTime"
											type="date"
											placeholder="选择日期">
							</el-date-picker>
							</el-form-item>
							<span>至</span>
							<el-form-item>
							<el-date-picker v-model="updateCarTrailerInfoForm.ciEndTime"
											type="date"
											placeholder="选择日期">
							</el-date-picker>
							</el-form-item>
						</el-form-item>
						<el-form-item label="保险单照片" prop="">
							<div class="upload_box">
								<span class="tit_tit">交强险保险单</span>
								<el-upload
										class="avatar-uploader"
										name="compulsory_insurance"
										:action="action"
										:show-file-list="false"
										:http-request="requestUpload"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload">

									<img v-if="compulsory_insurance_imageUrl" :src="compulsory_insurance_imageUrl"
										 :imageType="compulsory_insurance_imageUrl_type"
										 :imgName="compulsory_insurance_imageUrl_name"
										 class="avatar">

									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="check_eg">&nbsp;</div>
							</div>
							<div class="upload_box">
								<span class="tit_tit">商业险保险单</span>
								<el-upload
										class="avatar-uploader"
										name="commercial_insurance"
										:action="action"
										:show-file-list="false"
										:http-request="requestUpload"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload">

									<img v-if="commercial_insurance_imageUrl" :src="commercial_insurance_imageUrl"
										 :imageType="commercial_insurance_imageUrl_type"
										 :imgName="commercial_insurance_imageUrl_name"
										 class="avatar">

									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="check_eg">&nbsp;</div>
							</div>
						</el-form-item>
						</div>
					</div>
				</el-form>
				<div class="import-bottom">
					<el-button @click="updateCarTrailerInfo = false">取 消</el-button>
					<el-button type="primary" @click="submitTrailerForm">保 存</el-button>
				</div>
			</div>
		</el-dialog>



		<!--—绑定车头-更换-->
		<el-dialog :title="CarChengeTitle" :visible.sync="carHeadBindingVisible" width="34%" center>
			<el-form :model="carHeadBindingModel" :rules="carHeadBindingRules"
					 ref="carHeadBindingModel" label-width="80px" >

				<el-form-item label="车牌号码" prop="headstockId">

					<!--{{carHeadBindingModel.headstockId}}-->
					<el-select v-model="carHeadBindingModel.headstockId" placeholder="请选择车头">
						<el-option
								v-for="item in headStocktableData"
								:key="item.dlPlateNo"
								:label="item.dlPlateNo"
								:value="item.headStockPkId"
								>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="挂车牌号" prop="dlPlateNo">
					<el-select  v-model="carHeadBindingModel.dlPlateNo" placeholder="请选择挂车">
						<el-option
								v-for="item in trailertableData"
								:key="item.dlPlateNo"
								:label="item.dlPlateNo"
								:value="item.dlPlateNo"
								:disabled="item.headStockPkId!=null && item.headStockPkId!=''">
						</el-option>
					</el-select>

				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="carHeadBindingVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitHeadBinding">确 定</el-button>
			</div>
		</el-dialog>

		<!--牵引车 中置轴前车批量导入-->
		<el-dialog class="capacity-pop capacity-line" title="牵引车 中置轴前车批量导入" :visible.sync="headstockBulkImport" width="40%" center>
			<div class="capacity-pop-in">
				<el-form :model="headstockBulkImportRulesForm" :rules="headstockBulkImportRules" ref="headstockBulkImportRulesForm" label-width="80px" class="demo-ruleForm import-box">
					<el-form-item label="模板下载">
						<el-button size="small" @click="downLoad(1)" type="primary" ><i class="import-icon el-icon-download"></i>下载批量导入模板</el-button>
					</el-form-item>
					<el-form-item label="选择文件">
						<el-upload
								class="upload-demo"
								ref="upload"
								:action="headstockUpLoadExcel"
								:on-preview="handlePreview"
								:on-remove="handleRemove"
								:on-exceed="handleExceed"
								:file-list="headstockUpLoadFile"
								:auto-upload="false">
							<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
							<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(1)"><i class="import-icon el-icon-upload"></i>上传</el-button>
							<div slot="tip" class="el-upload__tip">只能上传excel文件</div>
						</el-upload>
					</el-form-item>
					<div class="import-resul">
						<h5>上传结果说明</h5>
						<span id="uploadHeadstockSuccess" style="display:none"></span>
						<span id="uploadHeadstockFail" style="display:none">本次数据上传失败，具体失败原因请下载错误报告查看 <a id="errHeadstockExcel" href="javascript:;">下载错误报告</a> </span>
					</div>

					<!--<div class="import-bottom">
                        <el-button @click="bulkImport = false">取消保存</el-button>
                        <el-button type="primary" @click="bulkImport = false">确认保存</el-button>
                    </div>-->

				</el-form>
			</div>
		</el-dialog>

		<!--半挂车 中置轴后挂批量导入-->
		<el-dialog class="capacity-pop capacity-line" title="半挂车 中置轴后挂批量导入" :visible.sync="bulkImport" width="40%" center>
			<div class="capacity-pop-in">
				<el-form :model="bulkImportRulesForm" :rules="bulkImportRules" ref="bulkImportRulesForm" label-width="80px" class="demo-ruleForm import-box">
					<el-form-item label="模板下载">
						<el-button size="small" @click="downLoad(2)" type="primary" ><i class="import-icon el-icon-download"></i>下载批量导入模板</el-button>
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
							<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(2)"><i class="import-icon el-icon-upload"></i>上传</el-button>
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
		<el-dialog class="capacity-pop capacity-pop-big" title="保险详情信息" :visible.sync="insuranceDetailsInfo" width="55%" center>
			<div class="capacity-pop-in">
				<el-form label-width="130px" class="demo-ruleForm">
					<div class="info-item clear">
						<el-form-item label="交强险保险品牌：">
							310
						</el-form-item>
						<el-form-item label="交强险保险单号：">
							玉柴
						</el-form-item>
						<el-form-item label="交强险有效期：">
							0
						</el-form-item>
						<el-form-item label="商业险保险品牌：">
							G7
						</el-form-item>
						<el-form-item label="商业险保险单号：">
							2019-12-20 至 2019-12-20
						</el-form-item>
						<el-form-item label="商业险有效期：">
							2019-12-20 至 2019-12-20
						</el-form-item>
						<el-form-item label="保险单照片：">
							<span class="not-color">未上传</span>
						</el-form-item>
					</div>
				</el-form>
				<div class="import-bottom">
					<el-button type="primary" @click="insuranceDetailsInfo = false">确 定</el-button>
				</div>
			</div>
		</el-dialog>

		<!--车头——车辆详情信息弹窗-->
		<el-dialog class="capacity-pop capacity-pop-big" :title="carDialogTitle" :visible.sync="carDetailsInfo" width="56%" center>
			<div class="capacity-pop-in checkInfo">

				<el-form label-width="130px" class="demo-ruleForm" v-model="carDetailsInfoMobel"
						 ref="carDetailsInfoMobel">
					<div v-if="carDialogType === '1'"><!--基本信息-->
						<h2 class="info-title">基本信息</h2>
						<div class="info-item clear">
							<el-form-item label="马力：">
								{{carDetailsInfoMobel.horsepower}}
							</el-form-item>
							<el-form-item label="发动机：">
								<span v-if="carDetailsInfoMobel.engineType === 1">玉柴</span>
								<span v-else-if="carDetailsInfoMobel.engineType === 2">锡柴</span>
								<span v-else-if="carDetailsInfoMobel.engineType === 3">淮柴动</span>
								<span v-else>其他</span>
							</el-form-item>
							<el-form-item label="版位数：">
								{{carDetailsInfoMobel.plateNum}}
							</el-form-item>
							<el-form-item label="GPS品牌：">
								<span v-if="carDetailsInfoMobel.gpsBrand === 1">G7</span>
								<span v-else-if="carDetailsInfoMobel.gpsBrand === 2">北斗</span>
								<span v-else>其他</span>
							</el-form-item>
							<el-form-item label="车辆正面45°照：">
								<img class="infoImg" :src="car_45_card_front_imageUrl" alt="">
							</el-form-item>
						</div>
						<h2 class="info-title">行驶证信息</h2>
						<div class="info-item clear">
							<el-form-item label="车牌号码：">
								{{carDetailsInfoMobel.dlPlateNo}}
							</el-form-item>
							<el-form-item label="车牌类型：">
								<span v-if="carDetailsInfoMobel.dlPlateType === 1">黄牌</span>
								<span v-else-if="carDetailsInfoMobel.dlPlateType === 2">蓝牌</span>
							</el-form-item>
							<el-form-item label="所有人：">
								{{carDetailsInfoMobel.dlOwner}}
							</el-form-item>
							<el-form-item label="车辆类型：">
								{{carDetailsInfoMobel.dlPlateNo}}
							</el-form-item>
							<el-form-item label="使用性质：">
								<span v-if="carDetailsInfoMobel.dlUseNature === 1">货运</span>
								<span v-else-if="carDetailsInfoMobel.dlUseNature === 2">营运</span>
								<span v-else="carDetailsInfoMobel.dlUseNature === 3">非营运</span>
							</el-form-item>
							<el-form-item label="车架号：">
								{{carDetailsInfoMobel.dlCarVin}}
							</el-form-item>
							<el-form-item label="品牌类型：">
								{{carDetailsInfoMobel.dlBrand}}
							</el-form-item>
							<el-form-item label="注册日期：">
								{{common.formatterDate('','',carDetailsInfoMobel.dlRegisterTime)}}
							</el-form-item>
							<el-form-item label="发动机号码：">
								{{carDetailsInfoMobel.dlEngineNo}}
							</el-form-item>
							<el-form-item label="整备质量：">
								{{carDetailsInfoMobel.dlHostlingWeight}}
							</el-form-item>
							<el-form-item label="发证日期：">
								{{common.formatterDate('','',carDetailsInfoMobel.dlIssueTime)}}
							</el-form-item>
							<el-form-item label="核定载质量：">
								{{carDetailsInfoMobel.dlLoadWeight}}
							</el-form-item>
							<el-form-item label="准牵引质量：">
								{{carDetailsInfoMobel.dlTractionWeight}}
							</el-form-item>
							<el-form-item label="外廓尺寸：">
								{{carDetailsInfoMobel.dlGabarite}}
							</el-form-item>
							<el-form-item label="检验有效期止：">
								{{common.formatterDate('','',carDetailsInfoMobel.dlCheckEndTime) }}
							</el-form-item>
							<el-form-item label="强制报废日期止：">
								{{common.formatterDate('','',carDetailsInfoMobel.dlScrapEndTime) }}
							</el-form-item>
						</div>
						<el-form-item label="证件照片：">
							<div class="upload_box">
								<span class="tit_tit">行驶证首页</span>
								<img class="infoImg" :src="driving_license_imageUrl" alt="">
							</div>
							<div class="upload_box">
								<span class="tit_tit">行驶证副页</span>
								<img class="infoImg" :src="driving_license_bywork_imageUrl" alt="">
							</div>
							<div class="upload_box">
								<span class="tit_tit">行驶证背面</span>
								<img class="infoImg" :src="driving_license_back_imageUrl" alt="">
							</div>
						</el-form-item>
					</div>
					<div class="info-item clear" v-else-if="carDialogType === '2'"><!--运输证-->
						<el-form-item label="业户名称：">
							{{carDetailsInfoMobel.rpOwnerName}}
						</el-form-item>
						<el-form-item label="所属省份：">
							{{carDetailsInfoMobel.rpProName}}
						</el-form-item>
						<el-form-item label="运输许可证号：">
							{{carDetailsInfoMobel.rpNo}}
						</el-form-item>
						<el-form-item label="发证日期：">
							{{common.formatterDate('','',carDetailsInfoMobel.rpTime)}}
						</el-form-item>
						<el-form-item label="有效期：">
							{{common.formatterDate('','',carDetailsInfoMobel.rpStartTime)}} 至 {{common.formatterDate('','',carDetailsInfoMobel.rpEndTime)}}
						</el-form-item>
						<el-form-item label="运输许可证：">
							<span class="not-color" v-if="transport_license_imageUrl === ''">未上传</span>
							<img class="infoImg" v-if="transport_license_imageUrl" :src="transport_license_imageUrl" alt="">
						</el-form-item>
					</div>
					<div class="info-item clear" v-else-if="carDialogType === '3'"><!--保险-->
						<el-form-item label="交强险保险品牌：">
							{{formatInsurance(carDetailsInfoMobel.ctaliType)}}
						</el-form-item>
						<el-form-item label="交强险保险单号：">
							{{carDetailsInfoMobel.ctaliNo}}
						</el-form-item>
						<el-form-item label="交强险有效期：">
							{{common.formatterDate('','',carDetailsInfoMobel.ctaliStartTime)}} 至 {{common.formatterDate('','',carDetailsInfoMobel.ctaliEndTime)}}
						</el-form-item>
						<el-form-item label="商业险保险品牌：">
							{{formatInsurance(carDetailsInfoMobel.ciType)}}
						</el-form-item>
						<el-form-item label="商业险保险单号：">
							{{carDetailsInfoMobel.ciNo}}
						</el-form-item>
						<el-form-item label="商业险有效期：">
							{{common.formatterDate('','',carDetailsInfoMobel.ciStartTime)}} 至 {{common.formatterDate('','',carDetailsInfoMobel.ciEndTime)}}
						</el-form-item>
						<el-form-item label="保险单照片：">
							<span class="not-color" v-if="compulsory_insurance_imageUrl === '' && commercial_insurance_imageUrl=== ''">未上传</span>
							<img class="infoImg" v-if="compulsory_insurance_imageUrl" :src="compulsory_insurance_imageUrl" alt="">
							<img class="infoImg" v-if="commercial_insurance_imageUrl" :src="commercial_insurance_imageUrl" alt="">
						</el-form-item>
					</div>
				</el-form>
				<div class="import-bottom">
					<el-button type="primary" @click="carDetailsInfo = false">确 定</el-button>
				</div>
			</div>
		</el-dialog>

		<!--挂车——车辆详情信息弹窗-->
		<el-dialog class="capacity-pop capacity-pop-big" :title="carDialogTitle" :visible.sync="carTrailerInfo" width="56%" center>
			<div class="capacity-pop-in checkInfo">
				<el-form label-width="130px" class="demo-ruleForm" v-model="carTrailerInfoModel"
						 ref="carTrailerInfoModel">
					<div v-if="carDialogType === '1'">
						<h2 class="info-title">基本信息</h2>
						<div class="info-item clear">
							<el-form-item label="板位数：">
								{{carTrailerInfoModel.plateNum}}
							</el-form-item>
							<el-form-item label="车辆正面45°照：">
								<img class="infoImg" :src="car_45_card_front_imageUrl" alt="">
							</el-form-item>
						</div>
						<h2 class="info-title">行驶证信息</h2>
						<div class="info-item clear">
							<el-form-item label="车牌号码：">
								{{carTrailerInfoModel.dlPlateNo}}
							</el-form-item>
							<el-form-item label="车牌类型：">
								<span v-if="carTrailerInfoModel.dlPlateType === 1">黄牌</span>
								<span v-else-if="carTrailerInfoModel.dlPlateType === 2">蓝牌</span>
							</el-form-item>
							<el-form-item label="车头车牌号码：">
								{{carTrailerInfoModel.carHeadId}}
							</el-form-item>
							<el-form-item label="所有人：">
								{{carTrailerInfoModel.dlBelongUser}}
							</el-form-item>
							<el-form-item label="车辆类型：">
								{{carTrailerInfoModel.dlCarType}}
							</el-form-item>
							<el-form-item label="使用性质：">
								<span v-if="carTrailerInfoModel.dlUseNature === 1">货运</span>
								<span v-else-if="carTrailerInfoModel.dlUseNature === 2">营运</span>
								<span v-else="carTrailerInfoModel.dlUseNature === 3">非营运</span>
							</el-form-item>
							<el-form-item label="车架号：">
								{{carTrailerInfoModel.dlCarVin}}
							</el-form-item>
							<el-form-item label="品牌类型：">
								{{carTrailerInfoModel.dlBrand}}
							</el-form-item>
							<el-form-item label="发证日期：">
								{{common.formatterDate('','',carTrailerInfoModel.dlIssueTime)}}
							</el-form-item>
							<el-form-item label="注册日期：">
								{{common.formatterDate('','',carTrailerInfoModel.dlRegisterTime)}}
							</el-form-item>
							<el-form-item label="核定载质量：">
								{{carTrailerInfoModel.dlLoadWeight}}
							</el-form-item>
							<el-form-item label="整备质量：">
								{{carTrailerInfoModel.dlHostlingWeight}}
							</el-form-item>
							<el-form-item label="外廓尺寸：">
								{{carTrailerInfoModel.dlGabarite}}
							</el-form-item>
							<el-form-item label="检验有效期止：">
								{{common.formatterDate('','',carTrailerInfoModel.dlCheckEndTime)}}
							</el-form-item>
							<el-form-item label="强制报废日期止：">
								{{common.formatterDate('','',carTrailerInfoModel.dlScrapEndTime)}}
							</el-form-item>

						</div>
						<el-form-item label="证件照片：">
							<div class="upload_box">
								<span class="tit_tit">行驶证首页</span>
								<img class="infoImg" :src="driving_license_imageUrl" alt="">
							</div>
							<div class="upload_box">
								<span class="tit_tit">行驶证副页</span>
								<img class="infoImg" :src="driving_license_bywork_imageUrl" alt="">
							</div>
							<div class="upload_box">
								<span class="tit_tit">行驶证背面</span>
								<img class="infoImg" :src="driving_license_back_imageUrl" alt="">
							</div>
						</el-form-item>
					</div>
					<div class="info-item clear" v-else-if="carDialogType === '2'"><!--运输证-->
						<el-form-item label="业户名称：">
							{{carTrailerInfoModel.rpOwnerName}}
						</el-form-item>
						<el-form-item label="所属省份：">
							{{carTrailerInfoModel.rpProName}}
						</el-form-item>
						<el-form-item label="运输许可证号：">
							{{carTrailerInfoModel.rpNo}}
						</el-form-item>
						<el-form-item label="发证日期：">
							{{common.formatterDate('','',carTrailerInfoModel.rpTime)}}
						</el-form-item>
						<el-form-item label="有效期：">
							{{common.formatterDate('','',carTrailerInfoModel.rpStartTime)}} 至 {{common.formatterDate('','',carTrailerInfoModel.rpEndTime)}}
						</el-form-item>
						<el-form-item label="运输许可证：">
							<span class="not-color" v-if="transport_license_imageUrl === ''">未上传</span>
							<img class="infoImg" v-if="transport_license_imageUrl" :src="transport_license_imageUrl" alt="">
						</el-form-item>
					</div>
					<div class="info-item clear" v-else-if="carDialogType === '3'"><!--保险-->
						<div v-if="carTrailerInfoModel.isCtali">
							<el-form-item label="交强险保险品牌：">
								{{formatInsurance(carTrailerInfoModel.ctaliType)}}
							</el-form-item>
							<el-form-item label="交强险保险单号：">
								{{carTrailerInfoModel.ctaliNo}}
							</el-form-item>
							<el-form-item label="交强险有效期：">
								{{common.formatterDate('','',carTrailerInfoModel.ctaliStartTime)}} 至 {{common.formatterDate('','',carTrailerInfoModel.ctaliEndTime)}}
							</el-form-item>
							<el-form-item label="交强险照片：">
								<span class="not-color" v-if="compulsory_insurance_imageUrl === ''">未上传</span>
								<img class="infoImg" v-if="compulsory_insurance_imageUrl" :src="compulsory_insurance_imageUrl" alt="">
							</el-form-item>
						</div>
						<div v-if="!carTrailerInfoModel.isCtali">
							交强险：无
						</div>
						<div  v-if="carTrailerInfoModel.isCi">
							<el-form-item label="商业险保险品牌：">
								{{formatInsurance(carTrailerInfoModel.ciType)}}
							</el-form-item>
							<el-form-item label="商业险保险单号：">
								{{carTrailerInfoModel.ciNo}}
							</el-form-item>
							<el-form-item label="商业险有效期：">
								{{common.formatterDate('','',carTrailerInfoModel.ciStartTime)}} 至 {{common.formatterDate('','',carTrailerInfoModel.ciEndTime)}}
							</el-form-item>
							<el-form-item label="商业险照片：">
								<span class="not-color" v-if="commercial_insurance_imageUrl=== ''">未上传</span>
								<img class="infoImg" v-if="commercial_insurance_imageUrl" :src="commercial_insurance_imageUrl" alt="">
							</el-form-item>
						</div>
						<div  v-if="!carTrailerInfoModel.isCi">
							商业险：无
						</div>
					</div>

				</el-form>
				<div class="import-bottom">
					<el-button type="primary" @click="carTrailerInfo = false">确 定</el-button>
				</div>
			</div>
		</el-dialog>

		<!--司机详情信息弹窗-->
		<el-dialog class="capacity-pop capacity-pop-big" title="司机详情信息" :visible.sync="driverVisible" width="" center>
			<div class="capacity-pop-in checkInfo">
				<el-form label-width="130px" class="demo-ruleForm" :model="driverDetailsInfo">
					<h2 class="info-title">基本信息</h2>
					<div class="info-item clear">
						<el-form-item label="司机姓名：">
							{{driverDetailsInfo.userName}}
						</el-form-item>
						<el-form-item label="身份证号：">
							{{driverDetailsInfo.idCard}}
						</el-form-item>
						<el-form-item label="证件有效期：">
							{{common.formatterDate('','',driverDetailsInfo.cardEnd)}}
						</el-form-item>
						<el-form-item label="联系电话：">
							{{driverDetailsInfo.phone}}
						</el-form-item>
						<el-form-item label="备用电话：">
							{{driverDetailsInfo.backupPhone}}
						</el-form-item>
						<el-form-item label="联系地址">
							{{driverDetailsInfo.address}}
						</el-form-item>
						<el-form-item label="司机类型">
							{{driverDetailsInfo.driverType==1?"大板司机":"小板司机"}}
						</el-form-item>
					</div>
					<el-form-item label="证件照片：">
						<div class="upload_box">
							<span class="tit_tit">个人信息页</span>
							<img class="infoImg" :src="driverDetailsInfoImg[0]" alt="">
						</div>
						<div class="upload_box">
							<span class="tit_tit">国徽页</span>
							<img class="infoImg" :src="driverDetailsInfoImg[1]" alt="">
						</div>
						<div class="upload_box">
							<span class="tit_tit">手持身份证</span>
							<img class="infoImg" :src="driverDetailsInfoImg[2]" alt="">
						</div>
					</el-form-item>
				</el-form>
				<div class="import-bottom">
					<el-button type="primary" @click="driverVisible = false">确 定</el-button>
				</div>
			</div>
		</el-dialog>


		<AddBigCarHead :visible.sync="addHeadstock" :pkId="carHeadPkId"  title="牵引车 中置轴前车——编辑"></AddBigCarHead>
		<AddBigCarTrailer :visible.sync="addTrailer" :pkId="carTrailerPkId" title="半挂车 中置轴后挂——编辑"></AddBigCarTrailer>
		<SampleGraph :visible.sync="sampleImg" :sampleType="sampleType"></SampleGraph>
		<AddBatchCarImage :visible.sync="addBatchImg" :type="addCarType" :pkId="carPkId"></AddBatchCarImage>
	</div>
</template>

<script>

	import AddBigCarHead from '../../admitWeb/capacity/carTransport/AddBigCarHead'
	import AddBigCarTrailer from '../../admitWeb/capacity/carTransport/AddBigCarTrailer'
	import SampleGraph from '../../admitWeb/SampleGraph'
	import AddBatchCarImage from '../../admitWeb/capacity/carTransport/AddBatchCarImage'

	export default {
		inject:['reload'],
		components: {
			AddBigCarHead,
			AddBigCarTrailer,
			AddBatchCarImage,
			'SampleGraph':SampleGraph,
		},
		data() {

			return {

				addCarType:0, //上传车头（1）、挂车（2）证件
				carPkId:"",//需要上传证件的车辆PKID
				addBatchImg: false, //上传证件弹框
				sampleImg: false,
				sampleType:'',
				/*********************/
				imgSrc: "../../../images/register/imgTest.jpg",
				screenHeight: document.documentElement.clientHeight, // 屏幕高度
				active: 0, //步骤栏默认
				activePop: 0,
				activeNextPop: 1,
				currentPage4: 4,//分页
				img1: false,
				fileList: [],
				imageUrl: '', //图片地址
				changeDriver:false, //添加/更换司机弹窗
				changeDriverForm:{headstockId:"",driver1:""},
				changeDriverRules:{
					driver1: [{required: true, message: '此项不能为空', trigger: 'blur'}],
					//driver2: [{required: true, message: '此项不能为空', trigger: 'blur'}],
				},
				editInfo:false,//编辑车辆信息弹窗
				editInfoForm:{},
				editInfoRules:{},

				checkNextInfo: false, //添加车辆下一步核对并完善信息弹窗
				checkInfoForm:{},
				checkInfoRules:{},
				bulkImportRulesForm: {}, //批量导入弹窗
				bulkImportRules: {},
				bulkImport: false, //批量导入弹窗
                headstockBulkImportRulesForm: {},//车头批量导入弹窗
                headstockBulkImportRules: {},
                headstockBulkImport: false,
				carDetailsInfo: false, //车辆详情信息弹窗
				insuranceDetailsInfo: false, //保险详情信息弹窗
                headStocktableData:[],//车头列表
                trailertableData:[],	//车挂列表
                upLoadFile:[],
                headstockUpLoadFile:[],
                headstockUpLoadExcel:this.common.CONSTANT.UPLOADIMGPATH+'/ltdCarHeadstock/importHeadstockByExcel',//上传车头导入excel路径
                upLoadExcel:this.common.CONSTANT.UPLOADIMGPATH+'/ltdCarTrailer/importCarTrailerByExcel',//上传车挂导入excel路径
                tableData: [],	//车辆列表
				/*********************/
				updateInfo:false,//更新车头弹窗=基本信息+保险
				updateInfoForm:{},
				updateInfoRules:{},
				updateCarTrailerInfo:false,//更新车挂弹窗=基本信息+保险
				updateCarTrailerInfoForm:{},
				updateCarTrailerInfoRules:{},
				carDialogType:"",		//弹出框显示类别
				carDialogTitle:"",		//弹出框标题
				ctaliTypeOption: [],	//保险下拉框value
				ciTypeOption: [],    	//保险下拉框value
				addHeadstock:false,	//弹出添加车头
				addTrailer:false,	//弹出添加车挂
				carHeadBindingVisible: false, 	//绑定更换车头弹窗
				carHeadBindingModel: {//绑定车头弹窗-信息
					dlPlateNo: "",
					headstockId: ""
				},
				carHeadBindingRules:{
					dlPlateNo: [{required: true, message: '此项不能为空', trigger: 'blur'}],
					headstockId:[{required: true, message: '此项不能为空', trigger: 'blur'}],
				},
                carHeadPkId: "",
                carTrailerPkId: "",
				CarChengeTitle:"",//绑定车头弹窗-車頭信息
				carHeadoptions: "",	//绑定车头弹窗-車頭信息
				tabIndex:0,	//tab下标
				driverOption:[],	//司机
				carDetailsInfoMobel:"",//车辆详情
				selectCarList:{},//车辆列表搜索框
				selectCarHeadsList:{},//车头列表搜索框
				selectCarTrailerList:{},//车辆列表搜索框
				carDialogType:"",
				carDialogTitle:"",
				ctaliTypes:[],  //保险种类
				carTrailerInfo: false, //车挂——详情信息弹窗
				carTrailerInfoModel: "",//车挂——详情信息弹窗---数据绑定
				/*司机*/
				driverVisible:false,
				driverDetailsInfo :"",
				driverDetailsInfoImg: [],
				activeName:'first',
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
                rePlateType :"",
                reKindOp:[{id:"",name:"全部"},{id:1,name:"落地板"},{id:2,name:"半落地"}],
                reKind:"",
			}
		},
        created(){
			if(this.$route.params.activeName){
				this.activeName=this.$route.params.activeName
			}
			this.common.getBizConstants(this,"ctaliType","ctaliTypes");
            let data={
                companyId:this.common.fetchData("company").pkId
            }
            let that=this;
            this.$post("ltdCarHeadstock/carList", data).then(function (data) {
                if (data.code == 0) {
                    that.$message.error(data.msg);
                } else {
                    that.tableData=data.data;
                }
            }).catch(res=>{
                console.log(res)
            })


				let company = this.common.fetchData("company");
				let companyId = company['pkId'];
				let driverdata = {
					companyId: companyId,
					type: 1,
				};
				this.$post("companyDriver/driverList", driverdata).then(function (data) {
					if (data.code == 0) {
						that.$message.error(data.msg);
					} else {
						that.driverOption = data.data;
					}
				}).catch(res => {
					console.log(res)
				})


            this.$post("ltdCarHeadstock/headStockCarList", data).then(function (data) {
                if (data.code == 0) {
                    that.$message.error(data.msg);
                } else {
                    that.headStocktableData=data.data;
                }
            }).catch(res=>{
                console.log(res)
            })

            this.$post("ltdCarHeadstock/trailerCarList", data).then(function (data) {
                if (data.code == 0) {
                    that.$message.error(data.msg);
                } else {
                    that.trailertableData=data.data;

                }
            }).catch(res=>{
                console.log(res)
            })
            let param = {
				"data": JSON.stringify({
                    "ltdCarRescue":{
                    	"companyId": this.common.fetchData("company").pkId,
                	}
				})
            };

            this.common.getBizConstants(this, 'ctaliType', 'ctaliTypeOption');
            this.common.getBizConstants(this, 'ctaliType', 'ciTypeOption');
        },
		methods: {

			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
            removeTrailer(headstockId) {
                this.$confirm('解绑挂车后，该车辆信息将从该列表移除，需要重新绑定车辆信息，确定要解绑挂车？', '解绑挂车提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
					let that = this;
					that.$post("ltdCarTrailer/carHeadChange", {"headstockId":headstockId}).then(function (res) {
						if (res) {
							that.$message({
								type: 'success',
								message: '成功!'
							});
							that.reload();

						}
					})
                })
            },
            removeDriver(headStockPkId){
				let that = this;
				that.$confirm('解绑司机后，车辆将处于无人驾驶状态，确定要解绑司机？', '解绑司机提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
					that.$post("ltdCarHeadstock/removeDriver", {"headstockId": headStockPkId}).then(function (response) {
						if(response){
							that.$message({
								type: 'success',
								message: '成功!'
							});
							that.reload();
						}
					})
                })
			},
			submitChangeDriver(){
				let that = this;
				that.$refs.changeDriverForm.validate((valid) => {
					if (valid) {
						that.$post("ltdCarHeadstock/changeDriver", {"headstockId": that.changeDriverForm.headstockId,"driverId1":that.changeDriverForm.driver1,"driverId2":that.changeDriverForm.driver2}).then(function (response) {
							if(response){
								that.$message({
									type: 'success',
									message: '成功!'
								});
								that.reload();
							}
						})
					}
				})

			},
			findCarHeadInfo(pkId,type,title){
				this.updateInfo=true;
				this.carDialogType=type;		//弹出框显示类别
				this.carDialogTitle=title;
				let that = this;
				that.common.initProvince(that, ["provinceOption"])
				that.$get("ltdCarHeadstock/selectOne", {"pkId": pkId}).then(function (response) {
					if (response.response.ltdCarHeadstock != null) {
						that.updateInfoForm = response.response.ltdCarHeadstock;
						if (response.response.ltdCompanyImgs.length > 0) {
							response.response.ltdCompanyImgs.forEach(function (image) {
								let imageMark = image['imageMark'];
								let imageType = imageMark + "_imageUrl_type";
								let imageName = imageMark + "_imageUrl_name";
								let imageUrl = imageMark + "_imageUrl";
								that[imageMark]=image.imageMark;
								that[imageType]=image.type;
								that[imageName]=image.imageName;
								that[imageUrl]=that.common.CONSTANT.imagePrefix+image.imagePath;
							})
						}
					}
				})
			},
			submitAddHeadstockForm() {
				this.$refs.updateInfoForm.validate((valid) => {
					if (valid) {
						let data = new FormData();
						let imgdata = new FormData();
						let that = this;
						let companyImgList = [];
						if (this['car_45_card_front_imageUrl']) { //45度照片
							companyImgList.push(
									{
										imageName: this['car_45_card_front_imageUrl_name'],
										imagePath: this['car_45_card_front_imageUrl'],
										type: this['car_45_card_front_imageUrl_type'],
										imageStatus: 0,
										imageMark: 'car_45_card_front'
									}
							)
						}
						if (this['driving_license_imageUrl']) { //行驶证首页
							companyImgList.push(
									{
										imageName: this['driving_license_imageUrl_name'],
										imagePath: this['driving_license_imageUrl'],
										type: this['driving_license_imageUrl_type'],
										imageStatus: 0,
										imageMark: 'driving_license'
									}
							)
						}
						if (this['driving_license_bywork_imageUrl']) { //行驶副业
							companyImgList.push(
									{
										imageName: this['driving_license_bywork_imageUrl_name'],
										imagePath: this['driving_license_bywork_imageUrl'],
										type: this['driving_license_bywork_imageUrl_type'],
										imageStatus: 0,
										imageMark: 'driving_license_bywork'
									}
							)
						}
						if (this['driving_license_back_imageUrl']) { //行驶证背面
							companyImgList.push(
									{
										imageName: this['driving_license_back_imageUrl_name'],
										imagePath: this['driving_license_back_imageUrl'],
										type: this['driving_license_back_imageUrl_type'],
										imageStatus: 0,
										imageMark: 'driving_license_back'
									}
							)
						}
						if (this['car_registration_imageUrl']) { //机动车登记证书
							companyImgList.push(
									{
										imageName: this['car_registration_imageUrl_name'],
										imagePath: this['car_registration_imageUrl'],
										type: this['car_registration_imageUrl_type'],
										imageStatus: 0,
										imageMark: 'car_registration'
									}
							)
						}
						if (this['transport_license_imageUrl']) { //运输许可
							companyImgList.push(
									{
										imageName: this['transport_license_imageUrl_name'],
										imagePath: this['transport_license_imageUrl'],
										type: this['transport_license_imageUrl_type'],
										imageStatus: 0,
										imageMark: 'transport_license'
									}
							)
						}
						if (this['compulsory_insurance_imageUrl']) { //交强险
							companyImgList.push(
									{
										imageName: this['compulsory_insurance_imageUrl_name'],
										imagePath: this['compulsory_insurance_imageUrl'],
										type: this['compulsory_insurance_imageUrl_type'],
										imageStatus: 0,
										imageMark: 'compulsory_insurance'
									}
							)
						}
						if (this['commercial_insurance_imageUrl']) { //商业保险
							companyImgList.push(
									{
										imageName: this['commercial_insurance_imageUrl_name'],
										imagePath: this['commercial_insurance_imageUrl'],
										type: this['commercial_insurance_imageUrl_type'],
										imageStatus: 0,
										imageMark: 'commercial_insurance'
									}
							)
						}
						data = JSON.stringify(this.updateInfoForm);
						imgdata = JSON.stringify(companyImgList);
						that.$post("ltdCarHeadstock/saveCarBasic", {
							"data": "{ltdCarHeadstock:" + data + "}",
							"imgData": imgdata
						}).then(function (response) {

								if(response.code ==1){
									that.$message({
										message: '成功',
										type: 'success'
									});
								}
							that.updateInfo=false;
							that.getHeadList();

						})
					}
				})
			},

			submitTrailerForm() {
				this.$refs.updateCarTrailerInfoForm.validate((valid) => {
					if (valid) {
						let data = new FormData();
						let imgdata = new FormData();
						let that = this;
						let companyImgList = [];
						if (this['car_45_card_front_imageUrl']) { //45度照片
							companyImgList.push(
									{
										imageName: this['car_45_card_front_imageUrl_name'],
										imagePath: this['car_45_card_front_imageUrl'],
										type: this['car_45_card_front_imageUrl_type'],
										imageStatus: 0,
										imageMark: 'car_45_card_front'
									}
							)
						}
						if (this['driving_license_imageUrl']) { //行驶证首页
							companyImgList.push(
									{
										imageName: this['driving_license_imageUrl_name'],
										imagePath: this['driving_license_imageUrl'],
										type: this['driving_license_imageUrl_type'],
										imageStatus: 0,
										imageMark: 'driving_license'
									}
							)
						}
						if (this['driving_license_bywork_imageUrl']) { //行驶副业
							companyImgList.push(
									{
										imageName: this['driving_license_bywork_imageUrl_name'],
										imagePath: this['driving_license_bywork_imageUrl'],
										type: this['driving_license_bywork_imageUrl_type'],
										imageStatus: 0,
										imageMark: 'driving_license_bywork'
									}
							)
						}
						if (this['driving_license_back_imageUrl']) { //行驶证背面
							companyImgList.push(
									{
										imageName: this['driving_license_back_imageUrl_name'],
										imagePath: this['driving_license_back_imageUrl'],
										type: this['driving_license_back_imageUrl_type'],
										imageStatus: 0,
										imageMark: 'driving_license_back'
									}
							)
						}
						if (this['car_registration_imageUrl']) { //机动车登记证书
							companyImgList.push(
									{
										imageName: this['car_registration_imageUrl_name'],
										imagePath: this['car_registration_imageUrl'],
										type: this['car_registration_imageUrl_type'],
										imageStatus: 0,
										imageMark: 'car_registration'
									}
							)
						}
						if (this['transport_license_imageUrl']) { //运输许可
							companyImgList.push(
									{
										imageName: this['transport_license_imageUrl_name'],
										imagePath: this['transport_license_imageUrl'],
										type: this['transport_license_imageUrl_type'],
										imageStatus: 0,
										imageMark: 'transport_license'
									}
							)
						}
						if (this['compulsory_insurance_imageUrl']) { //交强险
							companyImgList.push(
									{
										imageName: this['compulsory_insurance_imageUrl_name'],
										imagePath: this['compulsory_insurance_imageUrl'],
										type: this['compulsory_insurance_imageUrl_type'],
										imageStatus: 0,
										imageMark: 'compulsory_insurance'
									}
							)
						}
						if (this['commercial_insurance_imageUrl']) { //商业保险
							companyImgList.push(
									{
										imageName: this['commercial_insurance_imageUrl_name'],
										imagePath: this['commercial_insurance_imageUrl'],
										type: this['commercial_insurance_imageUrl_type'],
										imageStatus: 0,
										imageMark: 'commercial_insurance'
									}
							)
						}
						data = JSON.stringify(this.updateCarTrailerInfoForm);
						imgdata = JSON.stringify(companyImgList);
						that.$post("ltdCarTrailer/saveTrailerBasic", {"data": "{ltdCarTrailer:" + data + "}","imgData": imgdata}).then(function (response) {
							if(response.code ==1){
								that.$message({
									message: '成功',
									type: 'success'
								});
							}
							that.updateCarTrailerInfo=false;
							that.getTrailerList();
						})
					}
				})
			},
			//打开更细车挂信息
			findCarTrailerInfo(pkId,type,title){
				this.updateCarTrailerInfo=true;
				this.carDialogType=type;		//弹出框显示类别
				this.carDialogTitle=title;
				let that = this;
				that.$get("ltdCarTrailer/selectOne", {"pkId": pkId}).then(function (response) {
					if (response.response != null) {
						that.updateCarTrailerInfoForm = response.response.ltdCarTrailer;
						if (response.response.ltdCompanyImgs.length) {
							response.response.ltdCompanyImgs.forEach(function (image) {
								let imageMark = image['imageMark'];
								let imageType = imageMark + "_imageUrl_type";
								let imageName = imageMark + "_imageUrl_name";
								let imageUrl = imageMark + "_imageUrl";
								that[imageMark]=image.imageMark;
								that[imageType]=image.type;
								that[imageName]=image.imageName;
								that[imageUrl]=that.common.CONSTANT.imagePrefix+image.imagePath;
							})
						}
					}

				})
			},

			submitHeadBinding() {
				let that = this;
				that.$refs.carHeadBindingModel.validate((valid) => {
							if (valid) {
								that.$post("ltdCarTrailer/carHeadBinding", that.carHeadBindingModel).then(function (res) {
									if (res) {
										that.$message({
											type: 'success',
											message: '成功!'
										});
										that.reload();
									}
								})
							}
				})

			},

			openCarDetailsInfoMobel(pkId, type,title) { // 车头——车辆详情信息弹窗---数据绑定
				this.carDialogType = type;
				this.carDetailsInfo = true;
				this.carDialogTitle=title;
				let that = this;
				that.$get("ltdCarHeadstock/selectOne", {"pkId": pkId}).then(function (response) {
					if (response.response.ltdCarHeadstock != null) {
						that.carDetailsInfoMobel = response.response.ltdCarHeadstock;
						if (response.response.ltdCompanyImgs.length > 0) {
							response.response.ltdCompanyImgs.forEach(function (image) {
										let imageUrl = image['imageMark'] + "_imageUrl";
										that[imageUrl] = that.common.CONSTANT.imagePrefix+image.imagePath;
									}
							)
						}
					}
				})
			},
			openCarTrailerInfoMobel(pkId,type,title) { // 车挂——车辆详情信息弹窗---数据绑定
				this.carTrailerInfo = true;
				this.carDialogType = type;
				this.carDialogTitle=title;
				let that=this;
				that.$get("ltdCarTrailer/selectOne", {"pkId": pkId}).then(function (response) {
					if (response.response != null) {
						that.carTrailerInfoModel = response.response.ltdCarTrailer;
						if (response.response.ltdCompanyImgs.length > 0) {
							response.response.ltdCompanyImgs.forEach(function (image) {
										let imageUrl = image['imageMark'] + "_imageUrl";
										that[imageUrl] = that.common.CONSTANT.imagePrefix+image.imagePath;
									}
							)
						}
					}

				})
			},
			findCarList(){
				// let data={
				// 	companyId:this.common.fetchData("company").pkId
				//
				// };
				let data = this.selectCarList;
                data.companyId = this.common.fetchData("company").pkId;
				let that=this;
				this.$post("ltdCarHeadstock/carList", data).then(function (data) {
					if (data.code == 0) {
						that.$message.error(data.msg);
					} else {
						that.tableData=data.data;
					}
				}).catch(res=>{
					console.log(res)
				})
				// this.reload();
			},
			findCarHeadList(){
				let that=this;
				let data = JSON.stringify(this.selectCarHeadsList);
				this.$post("ltdCarHeadstock/headStockCarList", that.selectCarHeadsList).then(function (data) {
					if (data.code == 0) {
						that.$message.error(data.msg);
					} else {
						that.headStocktableData=data.data;
					}
				}).catch(res=>{
					console.log(res)
				})

			},
			findCarTrailerList(){
				let that=this;
				this.$post("ltdCarHeadstock/trailerCarList", that.selectCarTrailerList).then(function (data) {
					if (data.code == 0) {
						that.$message.error(data.msg);
					} else {
						that.trailertableData=data.data;

					}
				}).catch(res=>{
					console.log(res)
				})

			},
			/*************图片处理----start************/
			handleAvatarSuccess(res, file) {
				let data = JSON.parse(res.data);
				let imageType = data['resultData']['imageType'];
				let imageTypeValue = data['resultData']['imageTypeValue'];
				let filePath = data['resultData']['filePath'];
				let imageUrl = imageType + "_imageUrl";
				let imageUrlType = imageUrl + "_type";
				let imageUrlName = imageUrl + "_name";
				this[imageUrl] = filePath;
				this[imageUrlType] = imageTypeValue;
				this[imageUrlName] = file.name;
				//this.imageUrl = URL.createObjectURL(file.raw);
			},
			requestUpload(obj) {
				obj.companyId = this.common.fetchData("company").pkId;
				this.common.uploadImgFun(obj, this);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpg';
				const isJPEG = file.type === 'image/jpeg';
				const isPNG = file.type === 'image/png';
				const isBMP = file.type === 'image/bmp';
				const isLt2M = file.size / 1024 / 1024 < 5;
				if (!isJPG && !isJPEG && !isPNG && !isBMP) {
					this.$message.error('上传图片只能是 JPG/PNG/BMP 格式!');
					return false;
				}
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 5MB!');
					return false;
				}
				return true;
			},
			/*************图片处理----end************/
			//跳转到小板车认证
			goToSmallCerVerify() {
				console.info("adsasd")

			},
			// 司机详细信息
			carDetailsInfoShow(pkId) {
				let that = this;
				this.$post("companyDriver/getInfoById", {driverId: pkId}).then(data => {
					if (data.code == 0) {
						that.$message.error(data.msg);
					} else {
						that.driverDetailsInfo = data.resultData.companDriverVO.companyDriver;
						data.resultData.companDriverVO.imgs.forEach((v, i) => {
							if (v.type == 17) {
								that.driverDetailsInfoImg[0] = that.common.CONSTANT.imagePrefix + v.imagePath;
							} else if (v.type == 18) {
								that.driverDetailsInfoImg[1] = that.common.CONSTANT.imagePrefix + v.imagePath;
							} else if (v.type == 19) {
								that.driverDetailsInfoImg[2] = that.common.CONSTANT.imagePrefix + v.imagePath;
							}
						});
						that.driverVisible = true;
					}
				}).catch(res => {
					console.log(res)
				})
			},

			//编辑
			handleEdit(index, row) {
				console.log(index, row);
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
			//获取tab下标
			tabClick(tab, event) {
				this.$route.params.activeName='';
				this.tabIndex = tab.index;
				if(tab.index=='3'){
					this.$router.push('/CarWayManage')
				}
				if(tab.index == '0'){
					this.activeName= 'first'
				}
				if(tab.index == '1'){
					this.activeName= 'second'
				}
				if(tab.index == '2'){
					this.activeName= 'third'
				}
			},
			delCarHead(index, row) {
				let that = this;
				this.$confirm('车辆信息删除后无法恢复，需要重新添加，确定要删除当前车辆信息？', '删除提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$post("ltdCarHeadstock/removeByPkId", {"pkId": row.headStockPkId}).then(function (res) {
						if (res) {
							that.headStocktableData.splice(index, 1);
							that.$message({
								type: 'success',
								message: '删除成功!'
							});
							//that.reload();
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			delCarTrailer(index, row) {
				let that = this;
				this.$confirm('车辆信息删除后无法恢复，需要重新添加，确定要删除当前车辆信息？', '删除提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$post("ltdCarTrailer/removeByPkId", {"pkId": row.pkId}).then(function (res) {
						if (res) {
							that.trailertableData.splice(index, 1);
							that.$message({
								type: 'success',
								message: '删除成功!'
							});
							//that.reload();
						}
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
            openUpload(type){
                let that = this;
                if(type == 1){
                    this.headstockBulkImport = true;
                }else{
                    this.bulkImport = true;
                }
                that.clearUploadData(type);
            },
            clearUploadData(type){
                var uploadSuccessSpan = "";
                var uploadFailSpan = "";
                if(type == 1){
                    uploadSuccessSpan = "uploadHeadstockSuccess";
                    uploadFailSpan = "uploadHeadstockFail";
                    this.headstockUpLoadFile = [];
                }else{
                    uploadSuccessSpan = "uploadSuccess";
                    uploadFailSpan = "uploadFail";
                    this.upLoadFile=[];
                }
                document.getElementById(uploadSuccessSpan).style.display="none";
                document.getElementById(uploadFailSpan).style.display="none";
            },
            downLoad(type){
                if(type == 1){
                    window.location.href = this.common.CONSTANT.UPLOADIMGPATH + "download?downType=5"
                }else{
                    window.location.href = this.common.CONSTANT.UPLOADIMGPATH + "download?downType=4"
                }
            },
			initCarTrailerPkId() {
				this.carTrailerPkId = '';
			},
			initCarHeadPkId() {
				this.carHeadPkId = '';
			},
            submitUpload(type){
                let that  =this;
                let company = this.common.fetchData("company");
                let data = new FormData();
                console.log(this.$refs);
                console.log(this.$refs.upload);
                console.log(this.$refs.upload.uploadFiles);
                if(this.$refs.upload.uploadFiles.length) {
                    data.append("file", this.$refs.upload.uploadFiles[0].raw);
                    data.append("companyId", company['pkId']);
                    let config = {headers: {'Content-Type': 'multipart/form-data'}};
                    let httpUrl = "";
                    var uploadSuccessSpan = "";
                    var uploadFailSpan = "";
                    var errExcel = "";
                    if(type == 1){
                        httpUrl = that.headstockUpLoadExcel;
                        uploadSuccessSpan = "uploadHeadstockSuccess";
                        uploadFailSpan = "uploadHeadstockFail";
                        errExcel = "errHeadstockExcel";
                    }else{
                        httpUrl = that.upLoadExcel;
                        uploadSuccessSpan = "uploadSuccess";
                        uploadFailSpan = "uploadFail";
                        errExcel = "errExcel";
                    }
                    that.$axios.post(httpUrl, data, config).then(function (response) {
                        that.headstockUpLoadFile = [];
                        that.upLoadFile=[];
                        console.log(response);
                        let result = JSON.parse(response.data);
                        result = result.response
                        console.log(result);
                        if(result.flag && (result.flag == 1 || result == "1")){
                            that.$message.success("上传成功!");
                            let htmlText = "本次成功上传"+result.count+"条数据；";
                            that.reload();
                            document.getElementById(uploadSuccessSpan).innerText=htmlText;
                            document.getElementById(uploadFailSpan).style.display="none";
                            document.getElementById(uploadSuccessSpan).style.display="inline";
                        }else{
                            that.$message.error("上传失败!");
                            console.log(result.url);
                            if(result.url && result.url!=""){
                                document.getElementById(errExcel).href=result.url;
                                document.getElementById(uploadSuccessSpan).style.display="none";
                                document.getElementById(uploadFailSpan).style.display="inline";
                            }else{
                                document.getElementById(uploadSuccessSpan).style.display="none";
                                document.getElementById(uploadFailSpan).style.display="none";
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
			getTrailerList() {
				let that=this;

				let data = {
					companyId: this.common.fetchData("company").pkId
				}
				this.$post("ltdCarHeadstock/trailerCarList", data).then(function (data) {
					if (data.code == 0) {
						that.$message.error(data.msg);
					} else {
						that.trailertableData = data.data;

					}
				})
			},

			getHeadList(){
				let that=this;
				let data={
					companyId:this.common.fetchData("company").pkId
				}
				this.$post("ltdCarHeadstock/headStockCarList", data).then(function (data) {
					if (data.code == 0) {
						that.$message.error(data.msg);
					} else {
						that.headStocktableData=data.data;
					}
				})
			}
		},

		mounted() {
			var _this = this;
			window.onresize = function() { // 定义窗口大小变更通知事件
				_this.screenHeight = document.documentElement.clientHeight // 窗口高度
			}
		},
		watch: {
			radioType: function(e) {
				if (e == 1) {
					this.$router.push('/admitWeb/capacity/carTransport/addBigCarTransportInfo')
				}
			},

			 addHeadstock: function (e) {
				let that=this;
				if(!e){
				let data={
						companyId:this.common.fetchData("company").pkId
				}
				this.$post("ltdCarHeadstock/headStockCarList", data).then(function (data) {
					if (data.code == 0) {
						that.$message.error(data.msg);
					} else {
						that.headStocktableData=data.data;
					}
				})
				}
			},
			addTrailer: function (e) {
				let that=this;
				if(!e) {
					let data = {
						companyId: this.common.fetchData("company").pkId
					}
					this.$post("ltdCarHeadstock/trailerCarList", data).then(function (data) {
						if (data.code == 0) {
							that.$message.error(data.msg);
						} else {
							that.trailertableData = data.data;

						}
					})
				}
			}

		}
	}
</script>

<style>

</style>
