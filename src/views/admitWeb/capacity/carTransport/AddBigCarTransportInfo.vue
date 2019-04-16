<template><!--大板车认证-->
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
                        <div class="manage-tip-txt">
                            提交资料后，我们的工作人员会在三个工作日内完成审核。为保证贵司运单不受审核进度影响，请将贵司全部车辆信息一次性提交完成并仔细核对信息，以免因为反复的提交及审核造成不必要的损失，感谢您配合。
                        </div>
                    </div>
                    <div class="car-way">
                        <div class="car-choice">
                            <el-radio v-model="radioType" label="1">大板车认证</el-radio>
                            <el-radio v-model="radioType" label="2">小板车认证</el-radio>
                        </div>
                        <div class="car-way-btn">
                            <div v-if="tabIndex === '0'">
                                <el-button @click="openUpload(1)">批量导入</el-button>
                                <el-button @click="addHeadstock = true" type="primary">添加车辆</el-button>
                            </div>
                            <div v-else-if="tabIndex === '1'">
                                <el-button @click="openUpload(2)">批量导入</el-button>
                                <el-button @click="addTrailer = true" type="primary">添加挂车</el-button>
                            </div>
                        </div>
                        <div class="car-tabs">
                            <el-tabs type="border-card" @tab-click="tabClick">
                                <el-tab-pane label="牵引车 中置轴前车">


                                    <!--有数据显示的时候-->
                                    <div class="car-way-table" v-if="HeadstocktableData.length > 0" :key="Math.random()">
                                        <el-table
                                                :data="HeadstocktableData"
                                                border
                                                style="width: 100%">
                                            <el-table-column
                                                    label="序号"
                                                    width="60">
                                                <template slot-scope="scope">
                                                    <span>{{scope.$index+1}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    prop="dlOwner"
                                                    label="所有人"
                                                    width="200">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="dlPlateNo"
                                                    label="车牌号码"
                                                    width="130">
                                                <template slot-scope="scope">
                                                    <span @click="openCarDetailsInfoMobel(scope.row,'1','车辆详情信息')"
                                                          class="car-way-blue">{{scope.row.dlPlateNo}}</span>
                                                    <i class="car-yellow" v-if="scope.row.dlPlateType === 1"></i>
                                                    <i class="car-blue" v-if="scope.row.dlPlateType === 2"></i>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    prop="plateNum"
                                                    label="板位数"
                                                    width="68">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="dlCheckEndTime"
                                                    label="检验有效期止"
                                                    :formatter="this.common.formatterDate"
                                                    width="150">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="dlScrapEndTime"
                                                    label="强制报废日期止"
                                                    :formatter="this.common.formatterDate"
                                                    width="150">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="rpNo"
                                                    label="道路运输证号"
                                                    width="150">
                                                <template slot-scope="scope">
                                                    <span @click="openCarDetailsInfoMobel(scope.row,'2','道路运输许可证详情信息')"
                                                          class="car-way-blue">{{scope.row.rpNo}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    label="保险详情"
                                                    width="90">
                                                <template slot-scope="scope">
                                                    <a @click="openCarDetailsInfoMobel(scope.row,'3','保险详情信息')"
                                                       class="car-way-blue" href="javascript:;">查看</a>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    prop="createTime"
                                                    label="创建时间"
                                                    :formatter="this.common.formatterDateTime"
                                                    width="170">
                                            </el-table-column>
                                            <el-table-column fixed="right" label="操作" width="180">
                                                <template slot-scope="scope"><!--uploadPapers = true-->
                                                   <el-button type="text" size="small" @click="addBatchImg = true, addCarType = 1, carPkId=scope.row.pkId" v-if="scope.row.isUpPic === 0">上传证件</el-button>
                                                    <el-button type="text" size="small" v-if="scope.row.isUpPic === 1"
                                                               @click="addHeadstock = true, carHeadPkId=scope.row.pkId">
                                                        编辑
                                                    </el-button>
                                                    <el-button type="text" size="small"
                                                               @click="delCarHead(scope.$index, scope.row)">删除
                                                    </el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <!--暂无车辆信息显示，默认car-way-nothing是隐藏的car-way-nothing里面的table只做显示用，有数据显示就执行下面的table-->
                                    <div class="car-way-nothing" v-else>
                                        <div class="car-way-no">
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
                                                    label="版位数">
                                            </el-table-column>
                                            <el-table-column
                                                    width="110px"
                                                    label="检验有效期止">
                                            </el-table-column>
                                            <el-table-column
                                                    width="130px"
                                                    label="强制报废日期止">
                                            </el-table-column>
                                            <el-table-column
                                                    width="110px"
                                                    label="道路运输证号">
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
                                    <div class="car-way-page-btn">
                                        <el-button type="primary" @click="next()">下一步</el-button>
                                    </div>
                                </el-tab-pane>

                                <el-tab-pane label="半挂车 中置轴后挂">
                                    <!--暂无车辆信息显示，默认car-way-nothing是隐藏的car-way-nothing里面的table只做显示用，有数据显示就执行下面的table-->
                                    <div class="car-way-nothing" v-if="showTable2 === 0">
                                        <div class="car-way-no">
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
                                                    label="版位数">
                                            </el-table-column>
                                            <el-table-column
                                                    width="110px"
                                                    label="检验有效期止">
                                            </el-table-column>
                                            <el-table-column
                                                    width="130px"
                                                    label="强制报废日期止">
                                            </el-table-column>
                                            <el-table-column
                                                    width="110px"
                                                    label="道路运输证号">
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
                                    <div class="car-way-table" v-if="showTable2 === 1" :key="Math.random()">
                                        <el-table
                                                :data="TrailertableData"
                                                border
                                                style="width: 100%">
                                            <el-table-column
                                                    label="序号"
                                                    width="60">
                                                <template slot-scope="scope">
                                                    <span>{{scope.$index+1}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    prop="dlBelongUser"
                                                    label="所有人"
                                                    width="200">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="dlPlateNo"
                                                    label="挂车牌号"
                                                    width="130">
                                                <template slot-scope="scope">
                                                    <span @click="openCarTrailerInfoMobel(scope.row,'1','车辆详情')"
                                                          class="car-way-blue">{{scope.row.dlPlateNo}}</span>

                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    prop="plateNum"
                                                    label="板位数"
                                                    width="68">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="dlCheckEndTime"
                                                    label="检验有效期止"
                                                    :formatter="this.common.formatterDate"
                                                    width="150">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="dlScrapEndTime"
                                                    label="强制报废日期止"
                                                    :formatter="this.common.formatterDate"
                                                    width="150">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="rpNo"
                                                    label="车牌号码"
                                                    width="150">
                                                <template slot-scope="scope">
                                                    <span @click="openCarTrailerInfoMobel(scope.row,'1','车辆详情')"
                                                          class="car-way-blue">{{scope.row.headstockId}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    prop="rpNo"
                                                    label="运输许可证号"
                                                    width="150">
                                                <template slot-scope="scope">
                                                    <span @click="openCarTrailerInfoMobel(scope.row,'2','道路运输许可证详情信息')"
                                                          class="car-way-blue">{{scope.row.rpNo}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    label="保险详情"
                                                    width="90">
                                                <template slot-scope="scope">
                                                    <a @click="openCarTrailerInfoMobel(scope.row,'3','保险详情')"
                                                       class="car-way-blue" href="javascript:;">查看</a>
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
                                                    <el-button type="text" size="small" v-if="scope.row.headstockId === '' || scope.row.headstockId === null"
                                                               @click="carHeadBindingVisible = true;CarChengeTitle='绑定车头',carHeadBindingModel={dlPlateNo:scope.row.dlPlateNo}">
                                                        绑定车头
                                                    </el-button>
                                                    <el-button type="text" size="small" v-if="scope.row.headstockId !== '' || scope.row.headstockId !== null"
                                                               @click="carHeadBindingVisible = true;CarChengeTitle='更换车头',carHeadBindingModel={headstockId:scope.row.headstockId,dlPlateNo:scope.row.dlPlateNo}">更换车头</el-button>
                                                    <el-button type="text" size="small"  @click="addBatchImg = true, addCarType = 2, carPkId=scope.row.pkId"  v-if="scope.row.isUpPic === 0">上传证件</el-button>
                                                    <el-button type="text" size="small"
                                                               @click="addTrailer = true, carTrailerPkId=scope.row.pkId">
                                                        编辑
                                                    </el-button>
                                                    <el-button type="text" size="small"
                                                               @click="delCarTrailer(scope.$index, scope.row)">删除
                                                    </el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <div class="car-way-page-btn">
                                        <!--<el-button>上一步</el-button>-->
                                        <el-button type="primary" @click="next()">下一步</el-button>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>


                </div>

            </div>
        </div>


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

        <!--车头——车辆详情信息弹窗-->
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" :title="carDialogTitle" :visible.sync="carDetailsInfo" center>
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
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" :title="carDialogTitle" :visible.sync="carTrailerInfo" center>
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
        <!--挂车——绑定车头-更换-->
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" :title="CarChengeTitle" :visible.sync="carHeadBindingVisible" >
            <div class="capacity-pop-in">
                <el-form v-model="carHeadBindingModel" label-width="80px">

                    <el-form-item label="挂车牌号">
                        {{carHeadBindingModel.dlPlateNo}}
                    </el-form-item>
                    <el-form-item label="车牌号码">
                        <el-select v-model="carHeadBindingModel.headstockId" placeholder="请选择车头">
                            <el-option
                                    v-for="item in carHeadoptions"
                                    :key="item.dlPlateNo"
                                    :label="item.dlPlateNo"
                                    :value="item.pkId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="import-bottom">
                    <el-button @click="carHeadBindingVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitHeadBinding">确 定</el-button>
                </div>
            </div>
        </el-dialog>


        <AddBigCarHead :visible.sync="addHeadstock" :pkId="carHeadPkId"></AddBigCarHead> <!--title="牵引车 中置轴前车——编辑"-->
        <AddBigCarTrailer :visible.sync="addTrailer" :pkId="carTrailerPkId"></AddBigCarTrailer> <!--title="半挂车 中置轴后挂——编辑"-->
        <AddBatchCarImage :visible.sync="addBatchImg" :type="addCarType" :pkId="carPkId"></AddBatchCarImage>
        <SampleGraph :visible.sync="sampleImg" :sampleType="sampleType"></SampleGraph>
    </div>
</template>

<script>
    import AddBigCarHead from './AddBigCarHead'
    import AddBigCarTrailer from './AddBigCarTrailer'
    import AddBatchCarImage from './AddBatchCarImage'
    import SampleGraph from '../../SampleGraph'  //示例图
    import Header from '../../../frame/HeaderCapacity'  //头部

    export default {
        inject:['reload'],
        components: {
            AddBigCarHead,
            AddBigCarTrailer,
            AddBatchCarImage,
            'SampleGraph':SampleGraph,
            'Header':Header
        },

        data() {

            return {
                chaeckheadstockId:'',
                ctaliTypes:[],  //保险种类
                sampleImg: false,
                sampleType:'',
                addHeadstock: false, //添加车头弹窗
                addTrailer: false,	//添加车挂弹窗
                addCarType:0, //上传车头（1）、挂车（2）证件
                carPkId:"",//需要上传证件的车辆PKID
                addBatchImg: false, //上传证件弹框
                carHeadBindingVisible: false, 	//绑定更换车头弹窗
                CarChengeTitle:"",  //绑定更换车头标题
                carHeadBindingModel: {//绑定车头弹窗-信息
                    dlPlateNo: "2222",
                    headstockId: '11111'
                },
                carHeadoptions: "",	//绑定车头弹窗-車頭信息
                pkId: "",
                tabIndex: '0', 	//添加车辆+导入——按钮显示
                showTable1: 0,	//牵引车table1是否有数据
                showTable2: 0,	//半挂车table2是否有数据
                carHeadPkId: "",
                carTrailerPkId: "",
                imgSrc: "../../../../images/register/imgTest.jpg",
                screenHeight: document.documentElement.clientHeight, // 屏幕高度
                active: 0, //步骤栏默认

                radioType: '1',
                img1: false,
                fileList: [],
                imageUrl: '',   //图片地址

                addHeadstockForm: {},
                addHeadstockRules: {},
                bulkImportRulesForm: {},//后挂批量导入弹窗
                bulkImportRules: {},
                bulkImport: false, //批量导入弹窗
                headstockBulkImportRulesForm: {},//车头批量导入弹窗
                headstockBulkImportRules: {},
                headstockBulkImport: false,

                uploadPapers: false,//上传证件弹窗
                uploadPapersForm: {},
                uploadPapersRules: {},
                checkInfo: false,  //核对并完善信息弹窗
                checkInfoForm: {},
                checkInfoRules: {},

                carDialogType:'',//车头弹出框显示类型
                carDetailsInfo: false,//车头——详情信息弹窗
                carDetailsInfoMobel: "",//车头——详情信息弹窗---数据绑定
                carDialogTitle:"",   ////车头——弹窗标题

                carTrailerInfo: false, //车挂——详情信息弹窗
                carTrailerInfoModel: "",//车挂——详情信息弹窗---数据绑定



                HeadstocktableData: [],	//牵引车 中置轴前车---表格数据
                TrailertableData: [],	//挂车---表格数据
                car_45_card_front_imageUrl:"",//45度照片
                driving_license_imageUrl: "", //行驶证首页
                driving_license_bywork_imageUrl: "", //行驶副业
                driving_license_back_imageUrl: "",// 行驶证背面
                car_registration_imageUrl: "",// 机动车登记证书
                transport_license_imageUrl: "",// 运输许可
                compulsory_insurance_imageUrl: "",// 交强险
                commercial_insurance_imageUrl: "",// 商业保险
                upLoadFile:[],
                headstockUpLoadFile:[],
                headstockUpLoadExcel:this.common.CONSTANT.UPLOADIMGPATH+'/ltdCarHeadstock/importHeadstockByExcel',//上传车头导入excel路径
                upLoadExcel:this.common.CONSTANT.UPLOADIMGPATH+'/ltdCarTrailer/importCarTrailerByExcel',//上传车挂导入excel路径
            }
        },
        created: function () {
            let that = this;
            that.common.getBizConstants(that,"ctaliType","ctaliTypes");
            that.common.initProvince(that, ["provinceOption"])
            this.$get("ltdCarHeadstock/getAll", {"offset": 0, "limit": 100}).then(function (response) {
                if (response.response.length>0) {
                    that.showTable1 = 1;
                    that.HeadstocktableData = response.response
                    that.carHeadoptions = response.response;
                }

            })
            this.$get("ltdCarTrailer/getAll", {"offset": 0, "limit": 100}).then(function (response) {
                if (response.response.length>0) {
                    that.showTable2 = 1;
                    that.TrailertableData = response.response
                }
            })
        },

        methods: {
           getHeadList(){
               let that = this;
               this.$get("ltdCarHeadstock/getAll", {"offset": 0, "limit": 100}).then(function (response) {
                   if (response.response.length>0) {
                       that.HeadstocktableData = response.response
                       that.carHeadoptions = response.response;
                   }

               })
           },

       getTrailerList(){
           let that = this;
           this.$get("ltdCarTrailer/getAll", {"offset": 0, "limit": 100}).then(function (response) {
               if (response.response.length>0) {
                   that.TrailertableData = response.response
               }
           })
       },
            initCarTrailerPkId() {
                this.carTrailerPkId = '';
            },
            initCarHeadPkId() {
                this.carHeadPkId = '';
            },
            initData() {
                let that = this;
                this.$get("ltdCarTrailer/getAll", {"offset": 0, "limit": 100}).then(function (response) {
                    if (response.response.length>0) {
                        that.showTable2 = 1;
                        that.TrailertableData = response.response
                    }
                })
            },
            openCarDetailsInfoMobel(row, type,title) {// 车头——车辆详情信息弹窗---数据绑定
                this.carDialogType = type;
                this.carDetailsInfo = true;
                this.carDialogTitle=title;
                let that = this;
                that.$get("ltdCarHeadstock/selectOne", {"pkId": row.pkId}).then(function (response) {
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
            openCarTrailerInfoMobel(row,type,title) {// 车挂——车辆详情信息弹窗---数据绑定
                this.carTrailerInfo = true;
                this.carDialogType = type;
                this.carDialogTitle=title;
                let that=this;
                that.$get("ltdCarTrailer/selectOne", {"pkId": row.pkId}).then(function (response) {
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
            delCarHead(index, row) {
                let that = this;
                this.$confirm('车辆信息删除后无法恢复，需要重新添加，确定要删除当前车辆信息？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$post("ltdCarHeadstock/removeByPkId", {"pkId": row.pkId}).then(function (res) {
                        if (res) {
                            that.HeadstocktableData.splice(index, 1);
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            that.reload();
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
                            that.TrailertableData.splice(index, 1);
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            that.reload();
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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
            formatInsurance(type){ //格式化保险字段
                var typeDesc="";
                this.ctaliTypes.forEach(function(cType){
                    if(type==cType.value){
                        typeDesc=cType.name;
                    }
                });
                return typeDesc;
            },
            /*************图片处理----start************/
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
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
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            /*************图片处理----end************/
            tabClick(tab, event) {
                this.tabIndex = tab.index;
            },

            //编辑

            next() {
                if (this.HeadstocktableData.length < 1 && this.TrailertableData.length < 1) {
                    this.$alert('【牵引车 中置轴前车】、【半挂车 中置轴后挂】至少认证一项', '认证提示', {
                        confirmButtonText: '确定',
                        callback: action => {

                        }
                    });
                    return
                }
                let company=this.common.fetchData("company")
                let that = this;
                that.$get("ltdCarRescue/switchNextStep", {"companyId": company.pkId, "step": 5}).then((response) => {
                    if (response.code == 0) {
                        that.$message.error(response.msg);
                    } else {
                        company['registerSteps']=5;
                        that.common.saveData('company',company)
                        that.$router.push({
                            path: '/admitWeb/capacity/carTransport/addCarTransportDriverInfo',
                            name: 'AddCarTransportDriverInfo',
                        });
                    }
                }).catch(() => {
                    that.$message.error('切换到下一步失败');
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
            submitUpload(type){
                let that  =this;
                let company = this.common.fetchData("company");
                let data = new FormData();
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
                        if(result.flag && (result.flag == 1 || result.flag == "1")){
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
            }
        }, mounted() {
            var _this = this;
            window.onresize = function () { // 定义窗口大小变更通知事件
                _this.screenHeight = document.documentElement.clientHeight // 窗口高度
            }
        }, watch: {
            radioType: function (e) {
                if (e == 2) {
                    this.$router.push('/admitWeb/capacity/wayRescue/addWayRescueInfo')
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
