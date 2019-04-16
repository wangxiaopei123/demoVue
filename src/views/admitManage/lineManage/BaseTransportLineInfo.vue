<template>
    <div class="case">

        <div class="car-way line-choice">
            <div class="car-way-btn">
                <el-button @click="switchAddLineDialog" type="primary">新增专线</el-button>
            </div>
            <div class="car-tabs">
                <el-tabs type="border-card" @tab-click="switchLineDialog">
                    <el-tab-pane v-loading="loading" label="大板专线" v-if="carrierType">
                        <!--有数据显示的时候-->
                        <div v-if="trunkTableData.length > 0" class="car-way-table">
                            <el-table
                                    :key="Math.random()"
                                    :data="trunkTableData"
                                    border
                                    style="width: 100%">
                                <el-table-column
                                        label="序号"
                                        width="60"
                                        type="index">
                                    <!--<template slot-scope="scope">
                                        <span>{{scope.$index+1}}</span>
                                    </template>-->
                                </el-table-column>
                                <el-table-column
                                        prop="startCity"
                                        label="始发城市"
                                        width="160">
                                </el-table-column>
                                <el-table-column
                                        prop="endCity"
                                        label="到达城市"
                                        width="160">
                                </el-table-column>
                                <!--<el-table-column-->
                                <!--prop="kilometre"-->
                                <!--label="运输里程（公里）"-->
                                <!--width="180">-->
                                <!--</el-table-column>-->
                                <el-table-column
                                        prop="roadCity"
                                        label="途径城市"
                                        width="110">
                                </el-table-column>
                                <el-table-column
                                        prop="line"
                                        width="90"
                                        label="线路">
                                    <template slot-scope="scope">
                                        <span @click="showTrunkLineDetail(scope.row.trunkId)" class="car-way-blue">{{scope.row.line}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="time"
                                        :formatter="this.common.formatterDateTime"
                                        label="创建时间"
                                        width="170">
                                </el-table-column>
                                <el-table-column fixed="right" label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="editTrunkLineInfo(scope.row.trunkId)">编辑线路</el-button>
                                        <el-button type="text" size="small" @click="deleteTrunkLine(scope.row.trunkId)">删除</el-button>
                                        <el-button type="text" size="small" @click="showTrunkLineOffer(scope.row.trunkId)">{{scope.row.line > 0 ? '修改报价' : '新增报价'}}</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <!--暂无车辆信息显示，默认car-way-nothing是隐藏的car-way-nothing里面的table只做显示用，有数据显示就执行下面的table-->
                        <div v-else class="car-way-nothing">
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
                                        label="始发城市">
                                </el-table-column>
                                <el-table-column
                                        label="到达城市">
                                </el-table-column>
                                <!--<el-table-column-->
                                <!--width="180px"-->
                                <!--label="运输里程（公里）">-->
                                <!--</el-table-column>-->
                                <el-table-column
                                        label="途径城市">
                                </el-table-column>
                                <el-table-column
                                        label="线路">
                                </el-table-column>
                                <el-table-column
                                        label="创建时间">
                                </el-table-column>
                                <el-table-column
                                        label="操作">
                                </el-table-column>
                            </el-table>
                        </div>

                        <div class="car-way-page-btn" v-if="showOpera">
                            <el-button @click="submitAddLinePre">上一步</el-button>
                            <el-button @click="submitAddLineNext" type="primary">提 交</el-button>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane v-loading="loading" label="小板专线" >
                        <!--暂无车辆信息显示，默认car-way-nothing是隐藏的car-way-nothing里面的table只做显示用，有数据显示就执行下面的table-->
                        <div v-if="fixTableData.length == 0" class="car-way-nothing">
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
                                <!--<el-table-column-->
                                <!--label="报价详情">-->
                                <!--</el-table-column>-->
                                <el-table-column
                                        label="创建时间">
                                </el-table-column>
                                <el-table-column
                                        label="操作">
                                </el-table-column>
                            </el-table>
                        </div>
                        <!--有数据显示的时候-->
                        <div v-else class="car-way-table">
                            <el-table
                                    :key="Math.random()"
                                    :data="fixTableData"
                                    border
                                    style="width: 100%">
                                <el-table-column
                                        label="序号"
                                        width="60"
                                        type="index">
                                    <!--<template slot-scope="scope">
                                        <span>{{scope.$index+1}}</span>
                                    </template>-->
                                </el-table-column>
                                <el-table-column
                                        prop="cityName"
                                        label="业务城市"
                                        width="160">
                                </el-table-column>
                                <el-table-column
                                        prop="kind"
                                        :formatter="formatterKind"
                                        label="小板种类"
                                        width="170">
                                </el-table-column>
                                <el-table-column
                                        prop="plateType"
                                        :formatter="formatterPlateType"
                                        label="板式"
                                        width="170">
                                </el-table-column>
                                <!--<el-table-column-->
                                <!--prop="detail"-->
                                <!--label="报价详情"-->
                                <!--width="110">-->
                                <!--<template slot-scope="scope">-->
                                <!--<span @click="detailLineRescue" class="car-way-blue">{{scope.row.detail}}</span>-->
                                <!--</template>-->
                                <!--</el-table-column>-->
                                <el-table-column
                                        prop="createTime"
                                        :formatter="this.common.formatterDateTime"
                                        label="创建时间"
                                        width="170">
                                </el-table-column>
                                <el-table-column fixed="right" label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="editLineRescue(scope.row.pkId)">编辑</el-button>
                                        <el-button type="text" size="small" @click="deleteLineRescue(scope.row.pkId)">删除</el-button>
                                        <el-button type="text" size="small" @click="detailLineRescue(scope.row.pkId)">详情</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="car-way-page-btn" v-if="showOpera">
                            <el-button @click="submitAddLinePre">上一步</el-button>
                            <el-button @click="submitAddLineNext" type="primary">提 交</el-button>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>

        <!-- 大板专线 -->
        <!--新增编辑大板专线弹窗-->
        <el-dialog  class="capacity-pop capacity-pop-big capacity-line" :title="trunkLineInfoText" :visible.sync="addLineInfo" width="68%" center :before-close="closeAddLineInfoWin">
            <div class="capacity-pop-in" v-loading="loading">
                <div class="line-tips">添加专线完成后，请在列表页<span @click="addQuote = true">添加报价</span>，报价填写完成后即可提交！！！</div>
                <el-form :model="addLineInfoForm" :rules="addLineInfoRules" ref="addLineInfoForm" label-width="100px" class="demo-ruleForm">
                    <div class="info-item clear">
                        <el-form-item class="common-address" label="始发城市" prop="trunkStartCityId">
                            <el-select v-model="addLineInfoForm.trunkStartProId" placeholder="请选择省"
                                       @change="initCity(addLineInfoForm.trunkStartProId,'trunkStartCityOption',['addLineInfoForm.trunkStartCityId','addLineInfoForm.trunkStartAreaId'])">
                                <el-option
                                        v-for="item in trunkStartProvinceOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="addLineInfoForm.trunkStartCityId" placeholder="请选择市"
                                       @change="initArea(addLineInfoForm.trunkStartCityId,'trunkStartAreaOption',['addLineInfoForm.trunkStartAreaId'])">
                                <el-option
                                        v-for="item in trunkStartCityOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="addLineInfoForm.trunkStartAreaId" placeholder="请选择区">
                                <el-option
                                        v-for="item in trunkStartAreaOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="详细地址" prop="trunkStartAddress">
                            <el-input v-model="addLineInfoForm.trunkStartAddress" clearable class="width-other">
                                <template slot="append"><span @click="openMap($event,'addLineInfoForm.trunkStartAddress')"><i
                                        class="el-icon-location-outline"></i></span></template>
                            </el-input>
                        </el-form-item>
                        <el-form-item class="common-address" label="到达城市" prop="trunkEndCityId" >
                            <el-select v-model="addLineInfoForm.trunkEndProId" placeholder="请选择省"
                                       @change="initCity(addLineInfoForm.trunkEndProId,'trunkEndCityOption',['addLineInfoForm.trunkEndCityId','addLineInfoForm.trunkEndAreaId'])">
                                <el-option
                                        v-for="item in trunkEndProvinceOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="addLineInfoForm.trunkEndCityId" placeholder="请选择市"
                                       @change="initArea(addLineInfoForm.trunkEndCityId,'trunkEndAreaOption',['addLineInfoForm.trunkEndAreaId'])">
                                <el-option
                                        v-for="item in trunkEndCityOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="addLineInfoForm.trunkEndAreaId" placeholder="请选择区">
                                <el-option
                                        v-for="item in trunkEndAreaOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="详细地址" prop="trunkEndAddress">
                            <el-input v-model="addLineInfoForm.trunkEndAddress" class="width-other">
                                <template slot="append"><span @click="openMap($event,'addLineInfoForm.trunkEndAddress')"><i
                                        class="el-icon-location-outline"></i></span></template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="途径城市" prop="trunkPassRadio" >
                            <el-radio-group v-model="addLineInfoForm.trunkPassRadio">
                                <el-radio @change="setTrunkPassCity(1)" :label="1">有</el-radio>
                                <el-radio @change="setTrunkPassCity(0)" :label="0">无</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div class="info-item clear" v-for="(item, index) in trunkPassArray" :key="index">
                        <el-form-item class="common-address" label="途径城市">
                            <el-select v-model="item.provId" placeholder="请选择省"
                                       @change="initCity(item.provId,'trunkPassArray['+index+'].cityArr',['trunkPassArray['+index+'].cityId','trunkPassArray['+index+'].areaId','trunkPassArray['+index+'].areaArr'])">
                                <el-option
                                        v-for="item in item.provArr"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="item.cityId" placeholder="请选择市"
                                       @change="initArea(item.cityId,'trunkPassArray['+index+'].areaArr',['trunkPassArray['+index+'].areaId'])">
                                <el-option
                                        v-for="item in item.cityArr"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="item.areaId" placeholder="请选择区">
                                <el-option
                                        v-for="item in item.areaArr"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-radio-group v-model="item.channelType">
                                <el-radio :label="1">支持装卸车</el-radio>
                                <el-radio :label="2">仅停留</el-radio>

                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="详细地址" prop="" style="min-height: 80px">
                            <el-input v-model="item.address" class="width-other">
                                <template slot="append">
                                    <span @click="openMap($event,'trunkPassArray['+index+'].address')"><i class="el-icon-location-outline"></i></span>
                                </template>
                            </el-input>
                            <el-form-item class="line-icon">
                                <i @click="addTrunkPassCity" class="el-icon-circle-plus"></i>
                                <i @click="delTrunkPassCity(index)" class="el-icon-remove"></i>
                            </el-form-item>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="import-bottom">
                    <el-button @click="closeAddLineInfoWin">取 消</el-button>
                    <el-button type="primary" @click="saveTrunkLine">确定</el-button>
                </div>
            </div>
        </el-dialog>
        <!--地图-->
        <el-dialog title="选取地址" :visible.sync="dialogFormVisible">
            <baidu-map class="map" :center="center" style="height: 300px;width: 100%"
                       :scroll-wheel-zoom="true"
                       @click="getPointAddress">
                <bm-marker :position="position" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
            </baidu-map>
            <span slot="footer" class="dialog-footer">
                <span>{{clickAddressDetail}}</span>
                <el-button type="primary" @click="confirmMap">确 定</el-button>
            </span>
        </el-dialog>
        <!--添加报价弹窗-->
        <el-dialog class="capacity-pop capacity-line capacity-pop-big" title="添加报价" :visible.sync="addQuote" width="74%" center :before-close="closeAddQuoteWin">
            <div class="capacity-pop-in">
                <div class="line-tips">所有的报价请按照<span>标准车型</span> 进行报价，报价前请参考行业内价格水平，以免因为价格过高或过低造成不必要的损失！！！</div>
                <el-form :model="addQuoteForm" :rules="addQuoteRules" ref="addQuoteForm" label-width="110px" class="demo-ruleForm">
                    <h2 class="info-title">报价</h2>
                    <div class="info-item clear">
                        <el-form-item class="common-address" label="始发城市" prop="trunkStartCityId">
                            <el-select  v-model="addQuoteForm.trunkStartProId" placeholder="请选择省"
                                        @change="initTrunkCity(addQuoteForm.trunkStartProId,'trunkStartCityOption',['addQuoteForm.trunkStartCityId','addQuoteForm.trunkStartAreaId','trunkStartAreaOption'],'addQuoteForm.trunkStartCityId','trunkStartAreaOption',['addQuoteForm.trunkStartAreaId'],'addQuoteForm.trunkStartAreaId')">
                                <el-option
                                        v-for="item in trunkStartProvinceOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select  v-model="addQuoteForm.trunkStartCityId" placeholder="请选择市"
                                        @change="initTrunkArea(addQuoteForm.trunkStartProId,addQuoteForm.trunkStartCityId,'trunkStartAreaOption',['addQuoteForm.trunkStartAreaId'],'addQuoteForm.trunkStartAreaId')">
                                <el-option
                                        v-for="item in trunkStartCityOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select  v-model="addQuoteForm.trunkStartAreaId" placeholder="请选择区">
                                <el-option
                                        v-for="item in trunkStartAreaOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="详细地址" prop="trunkStartAddress">
                            <el-input  v-model="addQuoteForm.trunkStartAddress" class="width-other">
                                <template slot="append"><span @click="openMap($event,'addQuoteForm.trunkStartAddress')"><i
                                        class="el-icon-location-outline"></i></span></template>
                            </el-input>
                        </el-form-item>
                        <el-form-item class="common-address" label="到达城市" prop="trunkEndCityId">
                            <el-select v-model="addQuoteForm.trunkEndProId" placeholder="请选择省"
                                       @change="initTrunkCity(addQuoteForm.trunkEndProId,'trunkEndCityOption',['addQuoteForm.trunkEndCityId','addQuoteForm.trunkEndAreaId'],'addQuoteForm.trunkEndCityId','trunkEndAreaOption',['addQuoteForm.trunkEndAreaId'],'addQuoteForm.trunkEndAreaId')">
                                <el-option
                                        v-for="item in trunkEndProvinceOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="addQuoteForm.trunkEndCityId" placeholder="请选择市"
                                       @change="initTrunkArea(addQuoteForm.trunkEndProId,addQuoteForm.trunkEndCityId,'trunkEndAreaOption',['addQuoteForm.trunkEndAreaId'],'addQuoteForm.trunkEndAreaId')">
                                <el-option
                                        v-for="item in trunkEndCityOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="addQuoteForm.trunkEndAreaId" placeholder="请选择区">
                                <el-option
                                        v-for="item in trunkEndAreaOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  label="详细地址" prop="trunkEndAddress">
                            <el-input v-model="addQuoteForm.trunkEndAddress" class="width-other">
                                <template slot="append"><span @click="openMap($event,'addQuoteForm.trunkEndAddress')"><i
                                        class="el-icon-location-outline"></i></span></template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="kilometres" label="运输公里数" >
                            <el-input v-model="addQuoteForm.kilometres"></el-input>
                        </el-form-item>
                        <el-form-item prop="plateNum" label="版位数" >
                            <el-input v-model="addQuoteForm.plateNum"></el-input>
                        </el-form-item>
                        <el-form-item prop="matchDay" label="配板时长" >
                            <el-input v-model="addQuoteForm.matchDay"></el-input>
                        </el-form-item>
                        <el-form-item prop="wayDay" label="在途时长" >
                            <el-input v-model="addQuoteForm.wayDay"></el-input>
                        </el-form-item>
                        <el-form-item prop="wholeTaxPrice" label="整板含税" >
                            <el-input v-model="addQuoteForm.wholeTaxPrice"></el-input>
                        </el-form-item>
                        <el-form-item prop="wholeNoTaxPrice" label="整板不含税" >
                            <el-input v-model="addQuoteForm.wholeNoTaxPrice"></el-input>
                        </el-form-item>
                        <el-form-item prop="oneTaxPrice" label="单台含税" >
                            <el-input v-model="addQuoteForm.oneTaxPrice"></el-input>
                        </el-form-item>
                        <el-form-item prop="oneNoTaxPrice" label="单台不含税" >
                            <el-input v-model="addQuoteForm.oneNoTaxPrice"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item style="text-align: right;padding-right: 6%;">
                        <el-button type="primary" @click="saveTrunkLineOfferLocal">保 存</el-button>
                    </el-form-item>
                    <div class="line-table car-tabs">
                        <div v-if="trunkLineOfferData.length == 0" class="car-way-nothing">
                            <div class="car-way-no">
                                <i class="el-icon-warning"></i>
                                <span>暂无报价信息，请先在上面添加报价并保存</span>
                            </div>
                            <el-table
                                    style="width: 100%">
                                <el-table-column
                                        label="始发城市">
                                </el-table-column>
                                <el-table-column
                                        label="到达城市">
                                </el-table-column>
                                <el-table-column
                                        label="运输里程（公里）"
                                        width="150">
                                </el-table-column>
                                <el-table-column
                                        label="版位数">
                                </el-table-column>
                                <el-table-column
                                        label="配板时长（天）">
                                </el-table-column>
                                <el-table-column
                                        label="在途时长（天）">
                                </el-table-column>
                                <el-table-column label="整板报价(元)">
                                    <el-table-column
                                            label="含税"></el-table-column>
                                    <el-table-column
                                            label="不含税"></el-table-column>
                                </el-table-column>
                                <el-table-column label="单台报价(元)">
                                    <el-table-column
                                            label="含税"></el-table-column>
                                    <el-table-column
                                            label="不含税"></el-table-column>
                                </el-table-column>
                                <el-table-column label="操作"></el-table-column>
                            </el-table>
                        </div>
                        <div v-else class="car-way-table ">
                            <el-table
                                    :key="Math.random()"
                                    :data="trunkLineOfferData"
                                    style="width: 100%">
                                <el-table-column
                                        prop="trunkStartProId"
                                        label="始发城市"
                                        width="150">
                                </el-table-column>
                                <el-table-column
                                        prop="trunkEndProId"
                                        label="到达城市"
                                        width="150">
                                </el-table-column>
                                <el-table-column
                                        prop="kilometres"
                                        label="运输里程（公里）"
                                        width="150">
                                </el-table-column>
                                <el-table-column
                                        prop="plateNum"
                                        label="版位数"
                                        width="150">
                                </el-table-column>
                                <el-table-column
                                        prop="matchDay"
                                        label="配板时长（天）"
                                        width="150">
                                </el-table-column>
                                <el-table-column
                                        prop="wayDay"
                                        label="在途时长（天）"
                                        width="150">
                                </el-table-column>
                                <el-table-column label="整板报价(元)">
                                    <el-table-column
                                            prop="wholeTaxPrice"
                                            label="含税"
                                            width="120"></el-table-column>
                                    <el-table-column
                                            prop="wholeNoTaxPrice"
                                            label="不含税"
                                            width="120"></el-table-column>
                                </el-table-column>
                                <el-table-column label="单台报价(元)">
                                    <el-table-column
                                            prop="oneTaxPrice"
                                            label="含税"
                                            width="120"></el-table-column>
                                    <el-table-column
                                            prop="oneNoTaxPrice"
                                            label="不含税"
                                            width="120"></el-table-column>
                                </el-table-column>
                                <el-table-column fixed="right" label="操作" width="180">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="editTrunkLineOfferData(scope.$index, scope.row)">编辑</el-button>
                                        <el-button type="text" size="small" @click="delTrunkLineOfferData(scope.$index, scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-form>
                <div class="import-bottom">
                    <el-button @click=closeAddQuoteWin>取 消</el-button>
                    <el-button type="primary" @click="saveTrunkLineOffer">确 定</el-button>
                </div>
            </div>
        </el-dialog>

        <!--专线详情信息弹窗-->
        <el-dialog class="capacity-pop capacity-line capacity-pop-big" title="专线详情信息" :visible.sync="lineInfo" width="76%" center>
            <div class="capacity-pop-in checkInfo">
                <el-form label-width="130px" class="demo-ruleForm" >
                    <div class="info-item clear">
                        <el-form-item label="始发城市：" v-model="trunkDetailStart">
                            {{trunkDetailStart}}
                        </el-form-item>
                        <el-form-item label="到达城市：" v-model="trunkDetailEnd">
                            {{trunkDetailEnd}}
                        </el-form-item>
                        <el-form-item label="途径城市：" v-for="(item, index) in trunkPassCityArray" :key="index">
                            {{item.addressDetail}}
                            <span v-if="item.channelType == 1" class="flag">支持装卸车</span>
                            <span v-else class="flag">仅停留</span>
                        </el-form-item>
                    </div>
                    <div class="line-table car-tabs">
                        <el-table
                                :key="Math.random()"
                                :data="trunkOfferListTableData"
                                style="width: 100%">
                            <el-table-column
                                    prop="trunkStartProId"
                                    label="始发城市"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="trunkEndProId"
                                    label="到达城市"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="kilometres"
                                    label="运输里程（公里）"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="plateNum"
                                    label="版位数"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="matchDay"
                                    label="配板时长（天）"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="wayDay"
                                    label="在途时长（天）"
                                    width="150">
                            </el-table-column>
                            <el-table-column label="整板报价(元)">
                                <el-table-column
                                        prop="wholeTaxPrice"
                                        label="含税"
                                        width="120"></el-table-column>
                                <el-table-column
                                        prop="wholeNoTaxPrice"
                                        label="不含税"
                                        width="120"></el-table-column>
                            </el-table-column>
                            <el-table-column label="单台报价(元)">
                                <el-table-column
                                        prop="oneTaxPrice"
                                        label="含税"
                                        width="120"></el-table-column>
                                <el-table-column
                                        prop="oneNoTaxPrice"
                                        label="不含税"
                                        width="120"></el-table-column>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-form>
                <div class="import-bottom">
                    <el-button type="primary" @click="lineInfo = false">确 定</el-button>
                </div>
            </div>
        </el-dialog>

        <!-- 小板专线 -->
        <!-- 新增编辑小板专线弹窗 -->
        <el-dialog class="capacity-pop capacity-line capacity-pop-big" :title="rescueLineInfoText" :visible.sync="addSmallLineInfo" width="68%" center :before-close="closeSmallLineInfoWin">
            <div class="capacity-pop-in" v-loading="loading">
                <div class="line-tips">所有的报价请按照<span>标准车型</span>进行报价，报价前请参考行业内价格水平，以免因为价格过高或过低造成不必要的损失！！！</div>
                <el-form :model="addSmallLineInfoForm" :rules="addSmallLineInfoRules" ref="addSmallLineInfoForm" label-width="90px" class="demo-ruleForm">
                    <div class="clear smallLine-box">
                        <div class="smallLine-l"><i class="not-null">*</i>报价方式</div>
                        <div class="smallLine-r clear">
                            <!-- 同城报价 -->
                            <el-checkbox v-model="localChecked" @change="fixLocalOfferCheck">同城报价</el-checkbox>
                            <div v-if="localChecked" class="tc-quote-box">
                                <div class="tc-quote-item clear" v-for="(item, index) in fixLocalOfferArray" :key="index">
                                    <div class="tc-quote">
                                        <div class="quote-item clear">
                                            <el-form-item class="common-address" label="业务城市" prop="">
                                                <el-select v-model="item.provId" placeholder="请选择省"
                                                           @change="initCity(item.provId,'fixLocalOfferArray['+index+'].cityArr',['fixLocalOfferArray['+index+'].cityId'])">
                                                    <el-option
                                                            v-for="item in item.provArr"
                                                            :key="item.regionId"
                                                            :label="item.name"
                                                            :value="item.regionId">
                                                    </el-option>
                                                </el-select>
                                                <el-select v-model="item.cityId" placeholder="请选择市">
                                                    <el-option
                                                            v-for="item in item.cityArr"
                                                            :key="item.regionId"
                                                            :label="item.name"
                                                            :value="item.regionId">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="小板种类" prop="">
                                                <el-select placeholder="请选择" v-model="item.kind">
                                                    <el-option
                                                            v-for="item in kindOptions"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="板式" prop="">
                                                <el-select placeholder="请选择" v-model="item.plateType">
                                                    <el-option
                                                            v-for="item in plateTypeOptions"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                        <el-form-item label="调板时长" prop="">
                                            <el-input v-model="item.matchHour" style="width: 24%;" placeholder="请输入调板时长"></el-input>&nbsp;&nbsp;小时
                                        </el-form-item>
                                        <el-form-item label="起步价">
                                            <div class="quote-other">
                                                <el-input v-model="item.startPrice" style="width: 20%;"></el-input>&nbsp;&nbsp;元，包含&nbsp;&nbsp;<el-input v-model="item.kilometres" style="width: 15%;"></el-input>&nbsp;&nbsp;公里，每增加<i>1</i>公里，增加&nbsp;&nbsp;<el-input v-model="item.addPrice" style="width: 15%;"></el-input>&nbsp;&nbsp;元
                                            </div>
                                        </el-form-item>
                                    </div>
                                    <i v-if="index == 0" class="el-icon-circle-plus" @click="addFixLocalOffer"></i>
                                    <i v-if="index > 0" class="el-icon-remove" @click="delFixLocalOffer(index)"></i>
                                </div>
                            </div>
                            <!-- 一口报价 -->
                            <el-checkbox class="marginTop20" v-model="fixChecked" @change="fixOfferCheck">一口报价</el-checkbox>
                            <ul v-if="fixChecked" class="quote-tip">
                                <li><span>承运范围说明：</span>是指当前所填范围内任意起点-终点，比如，业务城市为“北京市”承运范围为“三环以内”，那么在三环内任意起点-终点的承运价都是所填写的一口报价，与公里数无关；</li>
                                <li><span>添加范围说明：</span>如果一个业务城市下会有不同承运范围，请点击“添加范围”按钮添加承运范围；如果需要添加多个业务城市请点击右侧“<i class="el-icon-circle-plus"></i>”添加业务城市</li>
                            </ul>
                            <div v-if="fixChecked" class="yk-quote-box">
                                <div class="tc-quote-item clear"  v-for="(item, index) in fixOfferArray" :key="index">
                                    <div class="tc-quote">
                                        <div class="quote-item clear">
                                            <el-form-item class="common-address" label="业务城市" prop="">
                                                <el-select v-model="item.provId" placeholder="请选择省"
                                                           @change="initCity(item.provId,'fixOfferArray['+index+'].cityArr',['fixOfferArray['+index+'].cityId'])">
                                                    <el-option
                                                            v-for="item in item.provArr"
                                                            :key="item.regionId"
                                                            :label="item.name"
                                                            :value="item.regionId">
                                                    </el-option>
                                                </el-select>
                                                <el-select v-model="item.cityId" placeholder="请选择市">
                                                    <el-option
                                                            v-for="item in item.cityArr"
                                                            :key="item.regionId"
                                                            :label="item.name"
                                                            :value="item.regionId">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="小板种类" prop="">
                                                <el-select placeholder="请选择" v-model="item.kind">
                                                    <el-option
                                                            v-for="item in kindOptions"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="板式" prop="">
                                                <el-select placeholder="请选择" v-model="item.plateType">
                                                    <el-option
                                                            v-for="item in plateTypeOptions"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                        <el-form-item label="调板时长" prop="">
                                            <el-input v-model="item.matchHour" style="width: 24%;" placeholder="请输入调板时长"></el-input>&nbsp;&nbsp;小时
                                        </el-form-item>
                                        <div class="yk-quote-other clear" v-for="(item1, index1) in item.lineFixedOfferArr" :key="index1">
                                            <el-form-item label="承运范围">
                                                <el-input v-model="item1.carrierScope" placeholder="请输入承运范围"></el-input>
                                            </el-form-item>
                                            <el-form-item label="一口报价">
                                                <el-input v-model="item1.price" placeholder="请输入承运范围"></el-input>
                                            </el-form-item>
                                            <span style="position: relative;top: 12px;">&nbsp;&nbsp;元</span>
                                            <span v-if="index1 == 0" class="addfw" @click="addDynamicFixScope(index)">添加范围</span>
                                            <span v-if="index1 > 0" class="addfw" @click="delDynamicFixScope(index,index1)">删除</span>
                                        </div>
                                    </div>
                                    <i v-if="index == 0" class="el-icon-circle-plus" @click="addFixOffer"></i>
                                    <i v-if="index > 0" class="el-icon-remove" @click="delFixOffer(index)"></i>
                                </div>
                            </div>
                            <!-- 城际报价 -->
                            <el-checkbox class="marginTop20" v-model="intercityChecked">城际报价</el-checkbox>
                            <div v-if="intercityChecked" class="cj-quote-box line-table car-tabs">
                                <!-- 无数据 -->
                                <div v-if="fixIntercityOfferTable.length == 0" class="car-way-nothing">
                                    <div class="car-way-no" style="top: 50px;">
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
                                <div v-else class="car-way-table">
                                    <el-table
                                            :key="Math.random()"
                                            :data="fixIntercityOfferTable"
                                            border
                                            style="width: 100%;">
                                        <el-table-column
                                                prop="startCityView"
                                                width="160px"
                                                label="始发城市">
                                        </el-table-column>
                                        <el-table-column
                                                prop="endCityView"
                                                width="160px"
                                                label="到达城市">
                                        </el-table-column>
                                        <el-table-column
                                                width="160px"
                                                prop="matchHour"
                                                label="调板时长（小时）">
                                        </el-table-column>
                                        <el-table-column
                                                prop="kindView"
                                                label="小板种类">
                                        </el-table-column>
                                        <el-table-column
                                                prop="plateTypeView"
                                                label="板式">
                                        </el-table-column>
                                        <el-table-column
                                                width="140px"
                                                prop="price"
                                                label="报价（元/公里）">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" width="180">
                                            <template slot-scope="scope">
                                                <el-button type="text" @click="editFixIntercityOffer(scope.$index, scope.row)" size="small">编辑</el-button>
                                                <el-button type="text" size="small" @click="delFixIntercityOffer(scope.$index)">删除</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <span @click="showLineIntercityOffer" class="addxl">添加线路</span>
                            </div>
                        </div>
                    </div>
                </el-form>
                <div class="import-bottom">
                    <el-button @click="addSmallLineInfo = false">取 消</el-button>
                    <el-button type="primary" @click="saveLineRescue">确定</el-button>
                </div>
            </div>
        </el-dialog>
        <!-- 添加线路 -->
        <el-dialog class="capacity-pop capacity-line capacity-pop-big" title="添加线路" :visible.sync="addSmallLine" width="73%" center>
            <div class="capacity-pop-in">
                <div class="line-tips" v-if="interCityOfferTips">同一始发到达城市、小板种类、板式无法重复添加报价，请重新添加报价</div>
                <el-form :model="addSmallLineForm" :rules="addSmallLineRules" ref="addSmallLineForm" label-width="90px" class="demo-ruleForm addsmall">
                    <div class="quote-item clear">
                        <el-form-item class="common-address" label="始发城市" prop="startCityId">
                            <el-select v-model="addSmallLineForm.startProvId" placeholder="请选择省"
                                       @change="initCity(addSmallLineForm.startProvId,'intercityStartCityOption',['addSmallLineForm.startCityId'])">
                                <el-option
                                        v-for="item in intercityStartProvinceOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="addSmallLineForm.startCityId" placeholder="请选择市">
                                <el-option
                                        v-for="item in intercityStartCityOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="common-address" label="到达城市" prop="endCityId">
                            <el-select v-model="addSmallLineForm.endProvId" placeholder="请选择省"
                                       @change="initCity(addSmallLineForm.endProvId,'intercityEndCityOption',['addSmallLineForm.endCityId'])">
                                <el-option
                                        v-for="item in intercityEndProvinceOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="addSmallLineForm.endCityId" placeholder="请选择市">
                                <el-option
                                        v-for="item in intercityEndCityOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="调板时长" prop="matchHour">
                            <el-input v-model="addSmallLineForm.matchHour" style="width: 81%;" placeholder="请输入调板时长"></el-input>&nbsp;&nbsp;小时
                        </el-form-item>
                    </div>
                    <div class="quote-item clear">
                        <el-form-item label="小板种类" prop="kind">
                            <el-select placeholder="请选择" v-model="addSmallLineForm.kind">
                                <el-option
                                        v-for="item in kindOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="板式" prop="plateType">
                            <el-select placeholder="请选择" v-model="addSmallLineForm.plateType">
                                <el-option
                                        v-for="item in plateTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="报价" prop="price">
                            <el-input v-model="addSmallLineForm.price" style="width: 72%;"></el-input>&nbsp;&nbsp;元/公里
                        </el-form-item>
                    </div>
                </el-form>
                <div class="import-bottom">
                    <el-button @click="addSmallLine = false">取 消</el-button>
                    <el-button type="primary" @click="saveLineIntercityOfferLocal">确定</el-button>
                </div>
            </div>
        </el-dialog>

        <!-- 专线详情信息 -->
        <el-dialog class="capacity-pop capacity-pop-big" title="专线详情信息" :visible.sync="smallLineInfo" width="74%" center>
            <div class="capacity-pop-in">
                <el-form label-width="90px" class="demo-ruleForm small-xq">
                    <div class="clear smallLine-box">
                        <div class="smallLine-l"><i class="not-null">*</i>报价方式</div>
                        <div class="smallLine-r clear">
                            <!-- 同城报价 -->
                            <h4 class="quote-tit" v-if="lineRescueDetailLocal.length > 0">同城报价</h4>
                            <div class="tc-quote-box"  v-for="(item, index1) in lineRescueDetailLocal" :key="index1">
                                <div class="tc-quote-item clear">
                                    <div class="tc-quote">
                                        <div class="quote-item clear">
                                            <el-form-item label="业务城市" prop="">
                                                {{item.cityName}}
                                            </el-form-item>
                                            <el-form-item label="小板种类" prop="">
                                                {{formatterKind(null,null,item.kind)}}
                                            </el-form-item>
                                            <el-form-item label="板式" prop="">
                                                {{formatterPlateType(null,null,item.plateType)}}
                                            </el-form-item>
                                            <el-form-item label="调板时长" prop="">
                                                {{item.matchHour}}小时
                                            </el-form-item>
                                        </div>
                                        <el-form-item label="起步价">
                                            <div class="quote-other">
                                                <i>{{item.startPrice}}</i>元，包含<i>{{item.kilometres}}</i>公里，每增加<i>1</i>公里，增加<i>{{item.addPrice}}</i>元
                                            </div>
                                        </el-form-item>
                                    </div>
                                </div>
                            </div>
                            <!-- 一口报价 -->
                            <h4 class="quote-tit marginTop20" v-if="lineRescueDetailFix.length > 0">一口报价</h4>
                            <div class="yk-quote-box" v-for="(item, index) in lineRescueDetailFix" :key="'fix'+index">
                                <div class="tc-quote-item clear">
                                    <div class="tc-quote">
                                        <div class="quote-item clear">
                                            <el-form-item class="common-address" label="业务城市" prop="">
                                                {{item.cityName}}
                                            </el-form-item>
                                            <el-form-item label="小板种类" prop="">
                                                <!--{{item.kind}}-->
                                                {{formatterKind(null,null,item.kind)}}
                                            </el-form-item>
                                            <el-form-item label="板式" prop="">
                                                {{formatterPlateType(null,null,item.plateType)}}
                                            </el-form-item>
                                            <el-form-item label="调板时长" prop="">
                                                {{item.matchHour}}小时
                                            </el-form-item>
                                        </div>
                                        <div class="yk-quote-other clear" v-for="(item1, index1) in lineRescueDetailFixOffer[index]" :key="index1">
                                            <el-form-item label="承运范围" prop="">
                                                <!--{{JSON.stringify(item1)}}-->
                                                {{item1.carrierScope}}
                                            </el-form-item>
                                            <el-form-item label="一口报价" prop="">
                                                <i class="">{{item1.price}}</i>元
                                            </el-form-item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 城际报价 -->
                            <h4 class="quote-tit marginTop20" v-if="fixIntercityOfferTable.length > 0">城际报价</h4>
                            <div class="cj-quote-box line-table car-tabs" v-if="fixIntercityOfferTable.length > 0">
                                <!-- 有数据 -->
                                <div class="car-way-table">
                                    <el-table
                                            :key="Math.random()"
                                            :data="fixIntercityOfferTable"
                                            border
                                            style="width: 100%;">
                                        <el-table-column
                                                :formatter="formatterIntercityStartCity"
                                                prop="startCityView"
                                                label="始发城市">
                                        </el-table-column>
                                        <el-table-column
                                                :formatter="formatterIntercityEndCity"
                                                prop="endCityView"
                                                label="到达城市">
                                        </el-table-column>
                                        <el-table-column
                                                width="160px"
                                                prop="matchHour"
                                                label="调板时长（小时）">
                                        </el-table-column>
                                        <el-table-column
                                                prop="kind"
                                                :formatter="formatterKind"
                                                label="小板种类">
                                        </el-table-column>
                                        <el-table-column
                                                prop="plateType"
                                                :formatter="formatterPlateType"
                                                label="板式">
                                        </el-table-column>
                                        <el-table-column
                                                width="140px"
                                                prop="price"
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
        beforeMount() {
            if (this.carrierType) {
                this.initData();
            } else {
                this.initFixData();
            }
        },
        inject:['reload'],
        data() {
            return {
                loading: false,
                baseProvinceOption:[],
                carrierType: true,
                lineTab: 1,//当前tab页 1大板 2小板
                companyId: '',
                trunkId: '',
                imgSrc:"../../../../images/register/imgTest.jpg",
                active: 2, //步骤栏默认
                activePop:0,
                radio: '1',
                img1: false,
                checked:true,
                localChecked: false,
                fixChecked: false,
                intercityChecked: false,
                fileList: [],
                imageUrl: '',   //图片地址
                trunkLineInfoText: '新增专线信息',
                rescueLineInfoText: '新增专线信息',
                addLineInfo:false, //新增专线弹窗
                addLineInfoForm:{
                    trunkStartAreaId : "",
                    trunkEndAreaId : "",
                    trunkPassRadio : 0,
                    trunkStartAddress : '',
                    trunkEndAddress: '',

                },
                addLineInfoRules:{
                    trunkStartCityId : {required: true, message: '始发城市不能为空', trigger: 'blur'},
                    trunkEndCityId : {required: true, message: '到达城市不能为空', trigger: 'blur'},
                    trunkStartAddress : {required: true, trigger: 'blur',validator : this.common.checkDetailAddress},
                    trunkEndAddress : {required: true, trigger: 'blur',validator : this.common.checkDetailAddress},
                },
                smallLineInfo:false, //小板专线详情信息
                addSmallLineInfo:false, //新增小板专线弹窗
                addSmallLineInfoForm:{
                },
                addSmallLineInfoRules:{},
                uploadPapers:false,//上传证件弹窗
                uploadPapersForm:{},
                uploadPapersRules:{},
                addQuote:false,  //添加报价弹窗
                addQuoteRules:{
                    trunkStartCityId : {required: true, message: '始发城市不能为空', trigger: 'blur'},
                    trunkEndCityId : {required: true, message: '到达城市不能为空', trigger: 'blur'},
                    trunkStartAddress : {required: true, trigger: 'blur',validator : this.common.checkDetailAddress},
                    trunkEndAddress : {required: true, trigger: 'blur',validator : this.common.checkDetailAddress},
                    kilometres : {required: true, message: '运输公里数不能为空', trigger: 'blur'},
                    plateNum : {required: true, message: '版位数不能为空', trigger: 'blur'},
                    matchDay : {required: true, message: '配板时长不能为空', trigger: 'blur'},
                    wayDay : {required: true, message: '在途时长不能为空', trigger: 'blur'},
                    wholeTaxPrice : {required: true, message: '整板含税不能为空', trigger: 'blur'},
                    wholeNoTaxPrice : {required: true, message: '整板不含税不能为空', trigger: 'blur'},
                    oneTaxPrice : {required: true, message: '单台含税不能为空', trigger: 'blur'},
                    oneNoTaxPrice : {required: true, message: '单台不含税不能为空', trigger: 'blur'},
                },
                addSmallLine:false,//添加线路
                addSmallLineRules:{
                    startCityId : {required: true, message: '始发城市不能为空', trigger: 'blur'},
                    endCityId : {required: true, message: '到达城市不能为空', trigger: 'blur'},
                    matchHour : {required: true, message: '调板时长不能为空', trigger: 'blur'},
                    kind : {required: true, message: '小板种类不能为空', trigger: 'blur'},
                    plateType : {required: true, message: '板式不能为空', trigger: 'blur'},
                    price : {required: true, message: '报价不能为空', trigger: 'blur'},
                },
                lineInfo:false,//专线详情信息弹窗
                editLineInfo:false, //编辑专线信息弹窗
                editLineInfoForm:{},
                editLineInfoRules:{},
                trunkTableData: [], //大板专线列表
                trunkPassArray: [], //途径城市新增删除 (里面放的是对象)
                trunkPassCityArray: [],//途径城市展示
                trunkOfferListTableData:[],
                trunkProCityAreaOption : {},//报价三级联动数据
                trunkStartProvinceOption: [],
                trunkStartCityOption: [],
                trunkStartAreaOption: [],
                trunkEndProvinceOption: [],
                trunkEndCityOption: [],
                trunkEndAreaOption: [],
                trunkPassCount: 1,//大板专线途径城市数量
                trunkPassProIdArray: [],
                trunkPassCityIdArray: [],
                trunkPassAreaIdArray: [],
                trunkPassAddressArray: [],
                trunkPassSupportTypeArray: [],
                trunkProvinceOptionArray: [],//
                trunkCityOptionArray: [],    //
                trunkAreaOptionArray: [],    //
                extraProvinceOptionArray: [],//额外追加省份列表
                extraCityOptionArray: [],    //额外追加地市市列表
                extraAreaOptionArray: [],    //额外追加区县列表
                extraProIdArray: [],
                extraCityIdArray: [],
                intercityStartProvinceOption: [],//城际开始省份
                intercityStartCityOption: [],//城际开始地市
                intercityEndProvinceOption: [],//城际结束省份
                intercityEndCityOption: [],//城际结束地市
                trunkLineOfferData: [], //报价列表
                addLineInfoForm: {
                    trunkStartCityId : '',
                    trunkEndCityId : '',
                    trunkStartAreaId : '',
                    trunkEndAreaId : '',
                    trunkEndAddress:'',
                    trunkPassRadio:0
                },
                addQuoteForm: {
                    trunkStartCityId : '',
                    trunkEndCityId : '',
                    trunkStartAreaId : '',
                    trunkEndAreaId : '',
                    trunkEndAddress:'',
                    editIndex : -1,//编辑的行号  -1表示新增防止，点了编辑然后删除行
                },
                addSmallLineInfoForm:{
                    provId: '',
                    cityId: '',
                    localProvId: '',
                    localCityId: '',
                    localKind: '',
                    localPlateType: '',
                    localMatchHour: '',
                    localStartPrice: '',
                    localKilometres: '',
                    localAddPrice: '',
                    localKindArray: [],
                    localPlateTypeArray: [],
                    localMatchHourArray: [],
                    localStartPriceArray: [],
                    localKilometresArray: [],
                    localAddPriceArray: [],
                    fixKind: '',
                    fixPlateType: '',
                    fixMatchHour: '',
                    fixCarrierScope: '',
                    fixPrice: '',
                    fixKindArray: [],
                    fixPlateTypeArray: [],
                    fixMatchHourArray: [],
                    fixCarrierScopeArray: [],   //添加范围-承运范围
                    fixPriceArray: [],          //添加范围-承运范围
                    fixDynamicCarrierScopeArray: [],   //动态添加范围-承运范围
                    fixDynamicPriceArray: [],          //动态添加范围-承运范围
                    fixCarrierScopeCount: 1,
                },
                addSmallLineForm : {
                    editIndex : -1, //编辑数据的索引
                    startCityId: '',
                    endCityId: '',
                    price: '',
                    matchHour: '',
                    kind: '',
                    plateType: '',
                },
                trunkDetailStart:'',
                trunkDetailEnd:'',
                fixTableData: [], //小板数据表格
                fixLocalOfferCount: 0,//小板同城报价计数
                fixLocalOfferArray: [],//小板同城报价
                fixOfferCount: 0,//小板一口报价计数
                fixOfferArray: [],//小板一口报价
                fixIntercityOfferTable: [],//小板城际报价数据表格
                fixScopeArray: [],//添加范围
                fixDynamicScopeArray: [],//动态添加范围
                fixScopeCount: 1,        //添加范围计数
                fixDynamicScopeCount: 1, //动态添加范围计数
                //小板主表ID
                rescuerId: '',
                //小板详情同城报价
                lineRescueDetailLocal: [],
                //小板详情一口报价
                lineRescueDetailFix: [],
                //小板详情一口报价 - 范围报价
                lineRescueDetailFixOffer: [],
                interCityOfferTips: false,//城际报价添加线路已存在提示
                kindOptions : [{
                    value: 1,
                    label: '落地板'
                },{
                    value: 2,
                    label: '半落地'
                }],
                plateTypeOptions : [{
                    value: 1,
                    label: '开放式'
                },{
                    value: 2,
                    label: '封闭式'
                },{
                    value: 3,
                    label: '半封闭'
                }],

                //地图
                dialogFormVisible: false,
                center: '北京',
                MapClass: "",
                position: "",
                clickAddressDetail:'',

            }
        },
        props:{
            showOpera : {
                type: Boolean,
                default: false
            }
        },
        created() {
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
                this.$emit("getCarrierAndLineType",{"carrierType":this.carrierType,"lineTab":this.carrierType ? 1 : 2,"companyId": this.companyId});
            }
            this.initProvince(this);
        },
        methods: {
            /***************地图*******start*******/
            openMap(e,classname) {
                let mapElement = e.currentTarget.parentElement.parentElement.parentElement.parentElement.previousElementSibling;
                let child = mapElement.children[1].children;
                let provinceName = child[0].firstElementChild.firstElementChild.value;
                let cityName = child[1].firstElementChild.firstElementChild.value;
                let areaName = child[2].firstElementChild.firstElementChild.value;
                let autoAddress = provinceName+cityName+areaName;
                if (autoAddress) this.center = autoAddress;
                this.dialogFormVisible = true;
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
            confirmMap : function(){
                this.dialogFormVisible = false;
                eval("this."+this.MapClass+"=this.clickAddressDetail")
            },
            /***************地图******end********/
            formatterKind(row, column, cellValue) {
                switch (cellValue) {
                    case 1: return '落地板';
                    case 2: return '半落地';
                    default: return '';
                }
            }
            ,formatterPlateType(row, column, cellValue) {
                switch (cellValue) {
                    case 1: return '开放式';
                    case 2: return '封闭式';
                    case 3: return '半封闭';
                    default: return '';
                }
            }
            ,formatterIntercityStartCity(row, column, cellValue) {
                return row.startProvName+"-" +row.startCityName;
            }
            ,formatterIntercityEndCity(row, column, cellValue) {
                return row.endProvName+"-" +row.endCityName;
            }
            ,switchLineDialog(tab, event) {
                let tabId = event.target.getAttribute('id');
                if (tabId == 'tab-0') {
                    this.lineTab = 1;
                    this.initData();
                } else {
                    this.lineTab = 2;
                    this.initFixData();
                }
                this.$emit("getCarrierAndLineType",{"carrierType":this.carrierType,"lineTab":this.lineTab,"companyId": this.companyId});
            },
            //新增专线页面
            switchAddLineDialog() {
                if (!this.carrierType) this.lineTab = 2;
                if (this.lineTab == 1) {
                    this.addLineInfoForm = Object.assign({}, this.addLineInfoForm, {trunkStartAddress:'',trunkEndAddress:''});
                    this.addLineInfo = true;
                    this.trunkLineInfoText = '新增专线信息';
                } else {
                    this.addSmallLineInfo = true;
                    this.resetSmallLineInfo();
                    this.initRescueArray();
                    this.addFixLocalOffer();
                    this.rescueLineInfoText = '新增专线信息';
                }
            },
            //小板清空
            initRescueArray() {
                this.lineRescueDetailFix = [];
                this.lineRescueDetailFixOffer = [];
                this.lineRescueDetailLocal = [];
                this.fixIntercityOfferTable = [];
            }
            //初始化城市
            ,initProvince: function () {
                this.common.initProvince(this, ["trunkStartProvinceOption", "trunkEndProvinceOption","baseProvinceOption"]);
            },
            //加载城市
            initCity: function (value, cityKey, clearKeys) {
                this.common.initCity(this, value, cityKey, clearKeys);
            },
            initArea: function (value, dataKey, clearKeys) {
                this.common.initArea(this, value, dataKey, clearKeys)
            },
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
            //处理字符串
            string(v){return v ? v : "";},
            //编辑
            editTrunkLineOfferData(index, row) {
                let tableData = this.trunkLineOfferData;
                // console.log(JSON.stringify(row))
                var addQuoteForm = {};
                if(row.startProvId){
                    this.initCity(row.startProvId,'trunkStartCityOption',['addQuoteForm.trunkStartCityId','addQuoteForm.trunkStartAreaId','trunkStartAreaOption'])
                }
                if(row.startCityId){
                    this.initArea(row.startCityId,'trunkStartAreaOption',['addQuoteForm.trunkStartAreaId'])
                }
                if(row.endProvId){
                    this.initCity(row.endProvId, 'trunkEndCityOption', ['addQuoteForm.trunkEndCityId', 'addQuoteForm.trunkEndAreaId','trunkEndAreaOption']);
                }
                if(row.endCityId){
                    this.initArea(row.endCityId, 'trunkEndAreaOption', ['addQuoteForm.trunkEndAreaId']);
                }
                addQuoteForm.pkId = this.string(row.pkId);
                addQuoteForm.companyId = this.string(row.companyId);
                addQuoteForm.trunkId = this.string(row.trunkId);
                addQuoteForm.trunkStartProId = this.string(row.startProvId);
                addQuoteForm.trunkStartCityId = this.string(row.startCityId);
                addQuoteForm.trunkStartAreaId = this.string(row.startAreaId);
                addQuoteForm.trunkStartAddress = this.string(row.startAddress);
                addQuoteForm.trunkEndProId = this.string(row.endProvId);
                addQuoteForm.trunkEndCityId = this.string(row.endCityId);
                addQuoteForm.trunkEndAreaId = this.string(row.endAreaId);
                addQuoteForm.trunkEndAddress = this.string(row.endAddress);
                addQuoteForm.kilometres = this.string(row.kilometres);
                addQuoteForm.plateNum = this.string(row.plateNum);
                addQuoteForm.matchDay = this.string(row.matchDay);
                addQuoteForm.wayDay = this.string(row.wayDay);
                addQuoteForm.wholeTaxPrice = this.string(row.wholeTaxPrice);
                addQuoteForm.wholeNoTaxPrice = this.string(row.wholeNoTaxPrice);
                addQuoteForm.oneTaxPrice = this.string(row.oneTaxPrice);
                addQuoteForm.oneNoTaxPrice = this.string(row.oneNoTaxPrice);
                addQuoteForm.editIndex = row.index;//所编辑的行
                this.addQuoteForm = addQuoteForm;
            },
            //删除
            delTrunkLineOfferData(index, row) {
                if(row.index == this.addQuoteForm.editIndex){
                    this.addQuoteForm.editIndex = -1;
                }
                this.trunkLineOfferData.splice(index, 1);
            }
            ,initData() {
                this.loading = true;
                this.lineTab = 1;
                let companyId = this.companyId;
                let that = this;
                this.$post("selectLineTrunkByCompanyId", {"companyId": companyId}).then(function (response) {
                    let data = response.data;
                    let trunkTableData = [];
                    for (let i=0;i<data.length;i++) {
                        let ltdLineTrunk = data[i]['ltdLineTrunk'];
                        let trunkId = ltdLineTrunk['pkId'];
                        let trunkOfferList = data[i]['trunkOfferList'];
                        let trunkPassList = data[i]['trunkPassList'];
                        that.common.saveData(trunkId,null);
                        trunkTableData.push({
                            startCity: ltdLineTrunk['startProvName']+'-'+ltdLineTrunk['startCityName'],
                            endCity: ltdLineTrunk['endProvName']+'-'+ltdLineTrunk['endCityName'],
                            // kilometre: 11111,
                            roadCity: trunkPassList ? trunkPassList.length : 0,
                            line: trunkOfferList ? trunkOfferList.length : 0,
                            time: ltdLineTrunk['createTime'],
                            trunkId: trunkId
                        });
                        that.common.saveData(trunkId,data[i]) //大板专线ID存储数据
                    }
                    that.trunkTableData = trunkTableData;
                    that.loading = false;
                }).catch(error => {
                    console.log("error", error);
                    that.loading = false;
                    that.$message.error("数据请求异常")
                });
            }
            //设置途径城市
            ,setTrunkPassCity(type) {
                if (type == 0) {
                    this.trunkPassArray = [];
                } else {
                    this.addTrunkPassCity();
                }
            }
            //增加途径城市
            ,addTrunkPassCity() {
                let lineTrunkPassItem = {
                    pkId : "",
                    companyId : this.companyId,
                    provArr : this.baseProvinceOption,
                    cityArr : [],
                    areaArr : [],
                    provId : "",
                    provName : "",
                    cityId : "",
                    cityName:"",
                    areaId : "",
                    areaName : "",
                    address : "",
                    channelType : 1
                };
                this.trunkPassArray.push(lineTrunkPassItem);
            }
            //删除途径城市
            ,delTrunkPassCity(index) {
                this.trunkPassArray.splice(index, 1);
                if (this.trunkPassArray.length == 0) {
                    this.addLineInfoForm.trunkPassRadio = 0;
                }
            }
            //新增专线
            , saveTrunkLine() {
                // this.addLineInfoForm = {};
                let that = this;
                this.$refs.addLineInfoForm.validate((valid) => {
                    if (valid) {
                        let lineTrunkVO = {};
                        let companyId = this.companyId;
                        // console.log(this.trunkPassProIdArray,this.trunkPassCityIdArray,this.trunkPassAreaIdArray,this.trunkPassAddressArray,this.trunkPassSupportTypeArray);
                        let ltdLineTrunk = {};
                        ltdLineTrunk.pkId = this.addLineInfoForm.pkId ? this.addLineInfoForm.pkId : "";
                        ltdLineTrunk.companyId = companyId;
                        ltdLineTrunk.startProvId = this.addLineInfoForm.trunkStartProId;
                        ltdLineTrunk.startProvName = this.common.getProvinceName(this, this.addLineInfoForm.trunkStartProId, this.trunkStartProvinceOption);
                        ltdLineTrunk.startCityId = this.addLineInfoForm.trunkStartCityId;
                        ltdLineTrunk.startCityName = this.common.getCityName(this, this.addLineInfoForm.trunkStartCityId, this.trunkStartCityOption);
                        ltdLineTrunk.startAreaId = this.addLineInfoForm.trunkStartAreaId;
                        ltdLineTrunk.startAreaName = this.common.getAreaName(this, this.addLineInfoForm.trunkStartAreaId, this.trunkStartAreaOption);
                        ltdLineTrunk.startAddress = this.addLineInfoForm.trunkStartAddress;
                        ltdLineTrunk.endProvId = this.addLineInfoForm.trunkEndProId;
                        ltdLineTrunk.endProvName = this.common.getProvinceName(this, this.addLineInfoForm.trunkEndProId, this.trunkEndProvinceOption);
                        ltdLineTrunk.endCityId = this.addLineInfoForm.trunkEndCityId;
                        ltdLineTrunk.endCityName = this.common.getCityName(this, this.addLineInfoForm.trunkEndCityId, this.trunkEndCityOption);
                        ltdLineTrunk.endAreaId = this.addLineInfoForm.trunkEndAreaId;
                        ltdLineTrunk.endAreaName = this.common.getAreaName(this, this.addLineInfoForm.trunkEndAreaId, this.trunkEndAreaOption);
                        ltdLineTrunk.endAddress = this.addLineInfoForm.trunkEndAddress;
                        ltdLineTrunk.isPass = this.addLineInfoForm.trunkPassRadio ? this.addLineInfoForm.trunkPassRadio : 0;
                        lineTrunkVO.ltdLineTrunk = ltdLineTrunk;
                        let trunkPassList = [];
                        let errMsg = "";
                        for (let i = 0; i < this.trunkPassArray.length; i++) {
                            let bean = this.trunkPassArray[i];
                            if(!bean.areaId || !bean.address || !bean.channelType){
                                errMsg = "请完善途径城市";
                                break;
                            }
                            let LtdLineTrunkPass = {
                                pkId : bean.pkId ? bean.pkId : "",
                                companyId : companyId,
                                provId : bean.provId,
                                provName : this.common.getNameById(bean.provId,bean.provArr),
                                cityId : bean.cityId,
                                cityName : this.common.getNameById(bean.cityId,bean.cityArr),
                                areaId :bean.areaId ,
                                areaName : this.common.getNameById(bean.areaId,bean.areaArr),
                                address : bean.address,
                                channelType : bean.channelType,
                            };
                            trunkPassList.push(LtdLineTrunkPass);
                        }
                        if(errMsg){
                            that.$message.error(errMsg);
                            return false;
                        }
                        lineTrunkVO.trunkPassList = trunkPassList;
                        let data = {
                            "data": JSON.stringify(lineTrunkVO)
                        };
                        this.$post("addOrUpdateLineTrunk", data).then(function (response) {
                            let data = response;
                            if (data.code == 0) {
                                that.$message.error(data.msg);
                            } else {
                                for (let i = 0; i < data.length; i++) {
                                    let ltdLineTrunk = data[i]['ltdLineTrunk'];
                                    let trunkId = ltdLineTrunk['pkId'];
                                    that.common.saveData(trunkId, data[i]) //大板专线ID存储数据
                                }
                                that.initData();
                                that.addLineInfoForm = {};
                                that.addLineInfo = false;
                            }
                        }).catch(error => console.log("error", error));
                    }
                });

            }
            ,showTrunkLineOffer(trunkId) {
                let that = this;
                this.trunkLineOfferData = [];
                this.trunkProCityAreaOption = {};
                this.trunkId=trunkId;
                let lineTrunkData = this.common.fetchData(this.trunkId);
                let trunkOfferList = lineTrunkData['trunkOfferList'];
                let ltdLineTrunk = lineTrunkData.ltdLineTrunk;
                let trunkPassList = lineTrunkData.trunkPassList;//途径城市

                if (trunkOfferList) {
                    let index = 0;
                    trunkOfferList.forEach(function(offer){
                        offer.trunkStartProId = offer.startProvName+" "+offer.startCityName;
                        offer.trunkEndProId = offer.endProvName+" "+offer.endCityName;
                        offer.index = index++;//针对编辑使用的索引
                    });
                }
                this.trunkLineOfferData = trunkOfferList;
                this.addTrunkProCityAreaOption(ltdLineTrunk.startProvId,ltdLineTrunk.startProvName,ltdLineTrunk.startCityId,ltdLineTrunk.startCityName,ltdLineTrunk.startAreaId,ltdLineTrunk.startAreaName);
                this.addTrunkProCityAreaOption(ltdLineTrunk.endProvId,ltdLineTrunk.endProvName,ltdLineTrunk.endCityId,ltdLineTrunk.endCityName,ltdLineTrunk.endAreaId,ltdLineTrunk.endAreaName);
                if(trunkPassList && trunkPassList.length > 0){
                    trunkPassList.forEach(function(v){
                        that.addTrunkProCityAreaOption(v.provId,v.provName,v.cityId,v.cityName,v.areaId,v.areaName);
                    })
                }
                this.initTrunkProvince(['trunkStartProvinceOption','trunkEndProvinceOption']);
                this.addQuote = true;
                //......
            }
            //组装大板报价
            ,addTrunkProCityAreaOption(provId,provName,cityId,cityName,areaId,areaName){
                let trunkProCityAreaOption = this.trunkProCityAreaOption;
                let prov = trunkProCityAreaOption[provId];
                if(prov){
                    let city = prov.childNode;
                    let i = city.findIndex((v) => {
                        return v.regionId == cityId;
                    })
                    if(i > -1){
                        let area = city[i].childNode;
                        let j = area.findIndex((v) => {
                            return v.regionId == areaId;
                        })
                        if(j > -1){
                            return;
                        }else{
                            area.push({regionId:areaId,name:areaName})
                        }
                    }else{
                        city.push({regionId:cityId,name:cityName,childNode:[{regionId:areaId,name:areaName}]})
                    }
                }else{
                    trunkProCityAreaOption[provId] = {regionId : provId,name:provName,childNode :[{regionId:cityId,name:cityName,childNode:[{regionId:areaId,name:areaName}]}]};
                }
                this.trunkProCityAreaOption = trunkProCityAreaOption;
            }
            //初始化大板报价省份
            ,initTrunkProvince: function (dataKeys) {
                let that = this;
                let provArr = [];
                let trunkProCityAreaOption = this.trunkProCityAreaOption;
                Object.keys(trunkProCityAreaOption).forEach(function(key){
                    provArr.push(trunkProCityAreaOption[key])
                });
                dataKeys.forEach(function (value, i) {
                    eval("that." + value + "=provArr");
                    that.$forceUpdate();
                })
            },
            //加载城市
            initTrunkCity: function (value, cityArrKey, clearKeys,cityKey,areaArrKey,clear,areaKey) {
                let that = this;
                let cityArr = [];
                if(!value){
                    return;
                }
                if (clearKeys && clearKeys.length > 0) {
                    clearKeys.forEach(function (value, i) {
                        eval("that." + value + "=''");
                    })
                }
                let prov = this.trunkProCityAreaOption[value];
                if(prov){
                    cityArr = prov.childNode;
                    eval("that." + cityArrKey + "=cityArr");
                    if(cityArr.length == 1){
                        eval("that." + cityKey + "=cityArr[0].regionId");
                        this.initTrunkArea(value,cityArr[0].regionId,areaArrKey,clear,areaKey);
                    }
                    that.$forceUpdate();
                }
            },
            initTrunkArea: function (provId,cityId, dataKey, clearKeys,areaKey) {
                let that = this;
                let areaArr = [];
                if(!provId || !cityId){
                    return;
                }
                if (clearKeys && clearKeys.length > 0) {
                    clearKeys.forEach(function (value, i) {
                        eval("that." + value + "=''");
                    })
                }
                let prov = this.trunkProCityAreaOption[provId];
                if(prov){
                    let cityArr = prov.childNode;
                    var i = cityArr.findIndex((v) => {
                        return v.regionId == cityId;
                    });
                    if(i > -1){
                        areaArr = cityArr[i].childNode;
                    }
                    eval("that." + dataKey + "=areaArr");
                    if(areaArr.length == 1){
                        eval("that." + areaKey + "=areaArr[0].regionId");
                    }
                    that.$forceUpdate();
                }
            }
            //新增报价
            ,saveTrunkLineOfferLocal() {
                let that = this;
                this.$refs.addQuoteForm.validate((valid) => {
                    if(valid){
                        let addQuoteForm = that.addQuoteForm;
                        let startProvName = that.common.getNameById(that.addQuoteForm.trunkStartProId, that.trunkStartProvinceOption);
                        let startCityName = that.common.getNameById(that.addQuoteForm.trunkStartCityId, that.trunkStartCityOption);
                        let startAreaName = that.common.getNameById(that.addQuoteForm.trunkStartAreaId, that.trunkStartAreaOption);
                        let endProvName = that.common.getNameById(that.addQuoteForm.trunkEndProId, that.trunkEndProvinceOption);
                        let endCityName = that.common.getNameById(that.addQuoteForm.trunkEndCityId, that.trunkEndCityOption);
                        let endAreaName = that.common.getNameById(that.addQuoteForm.trunkEndAreaId, that.trunkEndAreaOption);
                        let data = {
                            pkId : that.string(addQuoteForm.pkId),
                            trunkId: that.trunkId,
                            trunkStartProId: startProvName+" "+startCityName,
                            trunkEndProId: endProvName+" "+endCityName,
                            kilometres: addQuoteForm.kilometres,
                            plateNum: addQuoteForm.plateNum,
                            matchDay: addQuoteForm.matchDay,
                            wayDay: addQuoteForm.wayDay,
                            wholeTaxPrice: addQuoteForm.wholeTaxPrice,
                            wholeNoTaxPrice: addQuoteForm.wholeNoTaxPrice,
                            oneTaxPrice: addQuoteForm.oneTaxPrice,
                            oneNoTaxPrice: addQuoteForm.oneNoTaxPrice,
                            startProvId: addQuoteForm.trunkStartProId,
                            startProvName: startProvName,
                            startCityId: addQuoteForm.trunkStartCityId,
                            startCityName: startCityName,
                            startAreaId: addQuoteForm.trunkStartAreaId,
                            startAreaName: startAreaName,
                            startAddress: addQuoteForm.trunkStartAddress,
                            endProvId: addQuoteForm.trunkEndProId,
                            endProvName: endProvName,
                            endCityId: addQuoteForm.trunkEndCityId,
                            endCityName: endCityName,
                            endAreaId: addQuoteForm.trunkEndAreaId,
                            endAreaName: endAreaName,
                            endAddress: addQuoteForm.trunkEndAddress
                        };
                        let param = {
                            "trunkId": that.trunkId,
                            "startCityId" : data.startCityId,
                            "endCityId" : data.endCityId,
                            "plateNum" : data.plateNum
                        };
                        if(addQuoteForm.editIndex == -1){//新增
                            that.selectLineTrunkOfferForValid(param,function(req){
                                if(req){
                                    that.submitLineTrunkAfter(data);
                                }else{
                                    that.$alert('当前线路所选择的板位数已经报价成功，请重新添加其他报价', '提示', {confirmButtonText: '确定'});
                                }
                            })
                        }else{//编辑
                            var trunkLineOfferData = that.trunkLineOfferData;
                            let remoteCheck = true;//是否需要远程校验
                            let msg = "";
                            for (let i = 0; i < trunkLineOfferData.length; i++) {
                                let bean = trunkLineOfferData[i];
                                if(bean.index == addQuoteForm.editIndex){
                                    if(bean.startCityId == data.startCityId && bean.endCityId == data.endCityId && bean.plateNum == data.plateNum){
                                        remoteCheck = false;
                                        break;
                                    }
                                }else{
                                    if(bean.startCityId == data.startCityId && bean.endCityId == data.endCityId && bean.plateNum == data.plateNum){
                                        msg = "当前线路所选择的板位数已经报价成功，请重新修改报价信息";
                                    }
                                }
                            }
                            if(msg){
                                that.$alert(msg, '提示', {confirmButtonText: '确定'});
                                return;
                            }
                            if(remoteCheck){
                                that.selectLineTrunkOfferForValid(param,function(req){
                                    if(req){
                                        that.submitLineTrunkAfter(data);
                                    }else{
                                        that.$alert('当前线路所选择的板位数已经报价成功，请重新添加其他报价', '提示', {confirmButtonText: '确定'});
                                    }
                                })
                            }else{
                                that.submitLineTrunkAfter(data);
                            }
                        }
                    }
                })
            },
            selectLineTrunkOfferForValid(param,cb){//验重
                this.$post("selectLineTrunkOfferForValid", param).then(function (response) {
                    cb(response.code != 1)
                }).catch(error => console.log("error", error));
            },
            submitLineTrunkAfter(data){ //保存到缓存
                let that = this;
                let lineTrunkData = this.common.fetchData(this.trunkId);
                let trunkOfferList = that.trunkLineOfferData;
                if(this.addQuoteForm.editIndex == -1){
                    trunkOfferList.push(data);
                }else{
                    var i = trunkOfferList.findIndex((v) => {
                        return v.index == that.addQuoteForm.editIndex;
                    });
                    trunkOfferList.splice(i, 1, data);//替换
                }
                let index = 0;
                trunkOfferList.forEach(function(offer){
                    offer.trunkStartProId = offer.startProvName+" "+offer.startCityName;
                    offer.trunkEndProId = offer.endProvName+" "+offer.endCityName;
                    offer.trunkEndProId = offer.endProvName+" "+offer.endCityName;
                    offer.index = index++;
                });
                this.trunkLineOfferData = trunkOfferList;
                lineTrunkData.trunkOfferList = trunkOfferList;
                this.common.saveData(this.trunkId,lineTrunkData);
                //重置页面表单
                this.$refs.addQuoteForm.resetFields();
                this.addQuoteForm.trunkStartCityId = '';
                this.addQuoteForm.trunkStartAreaId = '';
                this.addQuoteForm.trunkEndCityId = '';
                this.addQuoteForm.trunkEndAreaId = '';
                this.trunkStartCityOption = '';
                this.trunkStartAreaOption = '';
                this.trunkEndCityOption = '';
                this.trunkEndAreaOption = '';
            }
            //新增报价
            ,saveTrunkLineOffer() {
                let lineTrunkData = this.common.fetchData(this.trunkId);
                lineTrunkData['trunkOfferList'] = this.trunkLineOfferData;
                let data = {
                    "data": JSON.stringify(lineTrunkData)
                };
                let that = this;
                this.$post("addOrUpdateLineTrunkOffer", data).then(function (response) {
                    let data = response;
                    if(data.code == 0) {
                        that.$message.error(data.msg);
                    } else {
                        for (let i=0;i<data.length;i++) {
                            let ltdLineTrunk = data[i]['ltdLineTrunk'];
                            let trunkId = ltdLineTrunk['pkId'];
                            that.common.saveData(trunkId,data[i]) //大板专线ID存储数据
                        }
                        that.initData();
                        that.addQuote = false;
                    }
                }).catch(error => console.log("error", error));
            }
            //专线详情
            ,showTrunkLineDetail(trunkId) {
                this.trunkPassCityArray = [];
                this.trunkId = trunkId;
                this.lineInfo = true;
                let lineTrunkData = this.common.fetchData(this.trunkId);
                let ltdLineTrunk = lineTrunkData['ltdLineTrunk'];
                let trunkOfferList = lineTrunkData['trunkOfferList'];
                let trunkPassList = lineTrunkData['trunkPassList'];

                this.trunkDetailStart = ltdLineTrunk['startProvName']+'-'+ltdLineTrunk['startCityName']+'-'+ltdLineTrunk['startAreaName']+'-'+ltdLineTrunk['startAddress'];
                this.trunkDetailEnd = ltdLineTrunk['endProvName']+'-'+ltdLineTrunk['endCityName']+'-'+ltdLineTrunk['endAreaName']+'-'+ltdLineTrunk['endAddress'];
                let that = this;
                if (trunkPassList) {
                    trunkPassList.forEach(function(pass){
                        that.trunkPassCityArray.push({
                            addressDetail : pass['provName']+pass['cityName']+pass['areaName']+pass['address'],
                            channelType : pass['channelType']
                        })
                    });
                }
                if (trunkOfferList) {
                    trunkOfferList.forEach(function(offer){
                        offer.trunkStartProId = offer.startProvName+" "+offer.startCityName;
                        offer.trunkEndProId = offer.endProvName+" "+offer.endCityName;
                    });
                    this.trunkOfferListTableData = trunkOfferList;
                }
            }
            //删除专线
            ,deleteTrunkLine(trunkId) {
                let that = this;
                this.$confirm('专线信息删除后报价也会同时删除，确定要删除专线信息？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$post("deleteLineTrunkById", {"trunkId":trunkId}).then(function (response) {
                        let data = response;
                        if(data.code == 0) {
                            that.$message({
                                type: 'error',
                                message: data.msg
                            });
                        } else {
                            that.initData();
                        }
                    }).catch(error => console.log("error", error));
                }).catch(() => {
                    // that.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            }
            //小板专线
            //初始数据
            ,initFixData() {
                let companyId = this.companyId;
                let that = this;
                that.loading = true;
                this.$post("selectLineRescuerByCompanyId", {"companyId": companyId}).then(function (response) {
                    that.loading = false;
                    let data = response;
                    if (data.code == 1) {
                        let rescuers = [];
                        let rescuerList = data.data;
                        if (rescuerList && rescuerList.length > 0) {
                            for (let i=0;i<rescuerList.length;i++) {
                                let rescuer = rescuerList[i];
                                rescuers.push({
                                    pkId: rescuer.pkId,
                                    cityName: rescuer.cityName,
                                    kind: rescuer.kind,
                                    plateType: rescuer.plateType,
                                    // detail: '详情',
                                    createTime: rescuer.createTime
                                })
                            }
                        }
                        that.fixTableData = rescuers;
                    } else {
                        that.$message.error(data.msg)
                    }
                }).catch(error => {
                    that.loading = false;
                    that.$message.error("数据请求异常")
                });
            }
            ,addFixScope() {
                this.fixScopeCount += 1;
                this.fixScopeArray.push(this.fixScopeCount);
            }
            ,delFixScope(index) {
                this.fixScopeArray.splice(index,1);
            }
            //添加线路页面
            ,showLineIntercityOffer() {
                this.addSmallLine = true;
                this.interCityOfferTips = false;
                this.common.initProvince(this, ["intercityStartProvinceOption","intercityEndProvinceOption"]);
                if(this.$refs.addSmallLineForm) {
                    this.$refs.addSmallLineForm.resetFields();
                }
                this.addSmallLineForm.startCityId = '';
                this.addSmallLineForm.endCityId = '';
                this.intercityStartCityOption = '';
                this.intercityEndCityOption = '';
            }
            //添加城际报价信息
            ,saveLineIntercityOfferLocal() {
                let that = this;
                this.$refs.addSmallLineForm.validate((valid) => {
                    if(valid){
                        let addSmallLineForm = that.addSmallLineForm;
                        let startProvId = addSmallLineForm.startProvId;
                        let startProvName = that.common.getNameById(startProvId, that.intercityStartProvinceOption);
                        let startCityId = addSmallLineForm.startCityId;
                        let startCityName = that.common.getNameById(startCityId, that.intercityStartCityOption);
                        let endProvId = addSmallLineForm.endProvId;
                        let endProvName = that.common.getNameById(endProvId, that.intercityEndProvinceOption);
                        let endCityId = addSmallLineForm.endCityId;
                        let endCityName = that.common.getNameById(endCityId, that.intercityEndCityOption);
                        let kind = kindName(addSmallLineForm.kind);
                        let plateType = plateTypeName(addSmallLineForm.plateType);
                        let data = {
                            pkId: that.string(addSmallLineForm.pkId),
                            companyId: that.string(addSmallLineForm.companyId),
                            lineRescueId: that.string(addSmallLineForm.lineRescueId),
                            editIndex : addSmallLineForm.editIndex,
                            startCityView: startProvName+"-"+startCityName,
                            endCityView: endProvName+"-"+endCityName,
                            startProvId: startProvId,
                            startProvName: startProvName,
                            startCityId: startCityId,
                            startCityName: startCityName,
                            endProvId: endProvId,
                            endProvName: endProvName,
                            endCityId: endCityId,
                            endCityName: endCityName,
                            matchHour: addSmallLineForm.matchHour,
                            kind: addSmallLineForm.kind,
                            plateType: addSmallLineForm.plateType,
                            price: addSmallLineForm.price,
                            kindView: kind,
                            plateTypeView: plateType
                        };

                        let exist = that.fixIntercityOfferTable.some(t =>
                            t.startCityView == data.startCityView &&
                            t.endCityView == data.endCityView &&
                            t.kind == data.kind &&
                            t.plateType == data.plateType &&
                            t.index != addSmallLineForm.editIndex
                        );
                        if (exist) {
                            that.interCityOfferTips = true;
                        } else {
                            if(addSmallLineForm.editIndex == -1){//新增
                                that.fixIntercityOfferTable.push(data);
                            }else{
                                that.fixIntercityOfferTable.splice(addSmallLineForm.editIndex, 1, data);
                            }
                            that.addSmallLine = false;
                        }
                    }
                })
            }
            //确定小板专线信息
            ,saveLineRescue() {
                let companyId = this.string(this.companyId);
                //小板对象
                let lineRescuerVO = {};
                //同城报价
                let lineLocalOffers = [];
                // 一口报价 - 添加范围
                let lineFixLines = [];
                //城际报价
                let lineIntercityOffers = this.fixIntercityOfferTable;

                let addSmallLineInfoForm = this.addSmallLineInfoForm;
                if (!this.localChecked && !this.fixChecked && !this.intercityChecked) {
                    this.$message.error("未选择报价方式");
                    return false;
                }
                let errMsg = "";
                //组装同城报价
                for(let i=0;i<this.fixLocalOfferArray.length;i++){
                    let bean = this.fixLocalOfferArray[i];
                    if(errMsg = checkFixLocalOffer(bean)){  //校验同城报价
                        break;
                    }
                    let ltdLineLocalOffer = {
                        pkId: this.string(bean.pkId),   //不知道用不用哈
                        companyId: companyId,
                        provId : bean.provId,
                        provName : this.common.getNameById(bean.provId,bean.provArr),
                        cityId : bean.cityId,
                        cityName : this.common.getNameById(bean.cityId,bean.cityArr),
                        kind : bean.kind,
                        plateType : bean.plateType,
                        matchHour : bean.matchHour,
                        startPrice : bean.startPrice,
                        kilometres : bean.kilometres,
                        addPrice : bean.addPrice,
                    }
                    lineLocalOffers.push(ltdLineLocalOffer);
                }
                //组装一口报价
                for(let i=0;i<this.fixOfferArray.length;i++){
                    let bean = this.fixOfferArray[i];
                    if(errMsg = checkFixOffer(bean)){  //校验一口报价
                        break;
                    }
                    let ltdLineFixed = {};
                    let lineFixedOffers = [];
                    ltdLineFixed = {
                        pkId: this.string(bean.pkId),
                        companyId: companyId,
                        provId: bean.provId,
                        provName: this.common.getNameById(bean.provId, bean.provArr),
                        cityId: bean.cityId,
                        cityName: this.common.getNameById(bean.cityId, bean.cityArr),
                        kind: bean.kind,
                        plateType: bean.plateType,
                        matchHour: bean.matchHour
                    };
                    for(let j=0;j<bean.lineFixedOfferArr.length;j++){
                        let v = bean.lineFixedOfferArr[j];
                        lineFixedOffers.push({
                            pkId: this.string(v.pkId),
                            companyId: companyId,
                            fixedId: this.string(v.fixedId),
                            carrierScope: v.carrierScope,
                            price: v.price
                        });
                    }
                    lineFixLines.push({ltdLineFixed : ltdLineFixed, lineFixedOffers : lineFixedOffers});
                }
                if(this.intercityChecked && lineIntercityOffers.length == 0){
                    errMsg = "请添加城际报价";
                }
                if(errMsg){
                    this.$message.error(errMsg);
                    return false;
                }
                lineRescuerVO = {
                    rescuerId: this.rescuerId,
                    lineLocalOffers : this.localChecked ? lineLocalOffers : [],
                    lineFixLines : this.fixChecked ? lineFixLines : [],
                    lineIntercityOffers : this.intercityChecked ? lineIntercityOffers : []
                };
                let data = {
                    "data": JSON.stringify(lineRescuerVO),
                    "companyId" : this.companyId
                };
                let that = this;
                this.$post("addOrUpdateLineRescuer", data).then(function (response) {
                    let result = response;
                    if (result.code == 0) {
                        that.$message({
                            type: 'error',
                            message: result.msg
                        });
                    } else {
                        that.initRescueArray();
                        that.initFixData();
                        that.addSmallLineInfo = false;
                        that.resetSmallLineInfo();
                    }
                }).catch(error => console.log("error", error));


            }
            //删除小板信息
            ,deleteLineRescue(lineRescueTablePkId) {
                let that = this;
                this.$confirm('专线信息删除后无法恢复，需要重新添加，确定要删除专线信息？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.$post("deleteLineRescuerByLineRescueId", {"lineRescueId": lineRescueTablePkId}).then(function (response) {
                        let data = response;
                        if (data.code == 0) {
                            that.$message({
                                type: 'info',
                                message: data.msg
                            });
                        } else {
                            that.initFixData();
                        }
                    }).catch(error => {
                        that.$message.error("数据请求异常")
                    });
                }).catch(() => {
                    // that.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            }
            //小板信息详情
            ,detailLineRescue(lineRescueTablePkId) {
                let that = this;
                this.initRescueArray();
                this.$post("selectLineRescuerByLineRescueId", {"lineRescueId": lineRescueTablePkId}).then(function (response) {
                    let data = response;
                    if (data.code == 0) {
                        that.$message.error(data.msg);
                    } else {
                        let lineRescuerVO = data['resultData']['lineRescuerVO'];
                        //一口报价
                        let lineRescueFixArray = [];
                        let lineRescueFixOfferArray = [];
                        let lineFixLines = lineRescuerVO['lineFixLines'];
                        if (lineFixLines && lineFixLines.length > 0) {
                            for (let i=0;i<lineFixLines.length;i++) {
                                let lineFixLineVO = lineFixLines[i];
                                lineRescueFixArray.push(lineFixLineVO['ltdLineFixed']);
                                lineRescueFixOfferArray.push(lineFixLineVO['lineFixedOffers']);
                            }
                            that.lineRescueDetailFix = lineRescueFixArray;
                            that.lineRescueDetailFixOffer = lineRescueFixOfferArray;
                        }
                        //同城报价
                        let lineLocalOffers = lineRescuerVO['lineLocalOffers'];
                        that.lineRescueDetailLocal = lineLocalOffers;
                        //城际报价
                        let lineIntercityOffers = lineRescuerVO['lineIntercityOffers'];
                        that.fixIntercityOfferTable = lineIntercityOffers;

                        that.smallLineInfo = true;
                    }
                }).catch(error => {
                    that.$message.error("数据请求异常");
                });
            }
            ,submitAddLinePre() {
                this.$router.push({
                    path : '/admitWeb/capacity/carTransport/addCarTransportDriverInfo',
                    name : 'AddCarTransportDriverInfo'
                });
            }
            ,submitAddLineNext() {
                if (this.carrierType) { //大板
                    if (this.trunkTableData.length == 0 && this.fixTableData.length == 0) {
                        this.$message.error("未添加大板或小板专线信息");
                        return false;
                    }
                } else { //小板
                    if (this.fixTableData.length == 0) {
                        this.$message.error("未添加小板专线信息");
                        return false;
                    }
                }
                let that=this;
                that.$get("ltdCarRescue/switchNextStep",{companyId:that.companyId,step:7}).then((response) => {
                    if (response.code == 0) {
                        that.$message.error(response.msg);
                    } else {
                        that.$router.push('/Welcome');
                    }
                }).catch(() => {
                    that.$message.error('切换到下一步失败');
                });
            }
            ,editTrunkLineInfo(trunkId) { // 大板专线编辑
                this.loading = true;
                this.trunkLineInfoText = '编辑专线信息';
                this.trunkStartProvinceOption = this.baseProvinceOption;
                this.trunkEndProvinceOption = this.baseProvinceOption;
                let trunkData = this.common.fetchData(trunkId);
                let passCount = 0;
                if(trunkData){
                    var addLineInfoForm = {};
                    var ltdLineTrunk = trunkData.ltdLineTrunk;
                    var trunkPassList = trunkData.trunkPassList;
                    //----------------ltdLineTrunk----------------
                    addLineInfoForm.pkId = ltdLineTrunk.pkId ? ltdLineTrunk.pkId : "";
                    if(ltdLineTrunk.startProvId){
                        this.initCity(ltdLineTrunk.startProvId,'trunkStartCityOption',['addLineInfoForm.trunkStartCityId','addLineInfoForm.trunkStartAreaId'])
                    }
                    if(ltdLineTrunk.startCityId){
                        this.initArea(ltdLineTrunk.startCityId,'trunkStartAreaOption',['addLineInfoForm.trunkStartAreaId'])
                    }
                    if(ltdLineTrunk.endProvId){
                        this.initCity(ltdLineTrunk.endProvId,'trunkEndCityOption',['addLineInfoForm.trunkEndCityId','addLineInfoForm.trunkEndAreaId'])
                    }
                    if(ltdLineTrunk.endCityId){
                        this.initArea(ltdLineTrunk.endCityId,'trunkEndAreaOption',['addLineInfoForm.trunkEndAreaId'])
                    }
                    addLineInfoForm.trunkStartProId = ltdLineTrunk.startProvId ? ltdLineTrunk.startProvId : null;
                    addLineInfoForm.trunkStartCityId = ltdLineTrunk.startCityId ? ltdLineTrunk.startCityId : null;
                    addLineInfoForm.trunkStartAreaId = ltdLineTrunk.startAreaId ? ltdLineTrunk.startAreaId : null;
                    addLineInfoForm.trunkStartAddress = ltdLineTrunk.startAddress ? ltdLineTrunk.startAddress : "";
                    addLineInfoForm.trunkEndProId = ltdLineTrunk.endProvId ? ltdLineTrunk.endProvId : null;
                    addLineInfoForm.trunkEndCityId = ltdLineTrunk.endCityId ? ltdLineTrunk.endCityId : null;
                    addLineInfoForm.trunkEndAreaId = ltdLineTrunk.endAreaId ? ltdLineTrunk.endAreaId : null;
                    addLineInfoForm.trunkEndAddress = ltdLineTrunk.endAddress ? ltdLineTrunk.endAddress : "";
                    addLineInfoForm.trunkPassRadio = (ltdLineTrunk.isPass && trunkPassList && trunkPassList.length > 0) ? ltdLineTrunk.isPass : 0;
                    //----------------ltdLineTrunk----------------
                    //----------------trunkPassList----------------
                    let trunkPassArray = [];
                    if(ltdLineTrunk.isPass == 1 && trunkPassList && trunkPassList.length > 0){
                        for (var i = 0; i < trunkPassList.length; i++) {
                            this.setTrunkPassCity(1);
                            let bean = trunkPassList[i];
                            if(bean.provId){
                                this.initCity(bean.provId,'trunkPassArray['+i+'].cityArr',['trunkPassArray['+i+'].cityId','trunkPassArray['+i+'].areaId','trunkPassArray['+i+'].areaArr'])
                            }
                            if(bean.cityId){
                                this.initArea(bean.cityId,'trunkPassArray['+i+'].areaArr',['trunkPassArray['+i+'].areaId'])
                            }
                            let lineTrunkPassItem = {
                                pkId : bean.pkId ? bean.pkId : "",
                                companyId : bean.companyId ? bean.companyId : "",
                                trunkId : bean.trunkId ? bean.trunkId : "",
                                provArr : this.baseProvinceOption,
                                cityArr : [],
                                areaArr : [],
                                provId : bean.provId ? bean.provId : null,
                                provName : "",
                                cityId : bean.cityId ? bean.cityId : null,
                                cityName:"",
                                areaId : bean.areaId ? bean.areaId : null,
                                areaName : "",
                                address : bean.address ? bean.address : "",
                                channelType : bean.channelType
                            };
                            trunkPassArray.push(lineTrunkPassItem);
                        }
                        passCount = trunkPassList.length;
                    }
                    this.trunkPassArray = trunkPassArray;
                    //----------------trunkPassList----------------
                    this.addLineInfoForm = addLineInfoForm;
                }
                this.addLineInfo = true;
                setTimeout(() => {
                    this.loading = false;
                }, passCount > 0 ? 2000 : 500);
            }
            ,clearCommon(){//清空专线页面
                this.trunkStartCityOption = [];
                this.trunkStartAreaOption = [];
                this.trunkEndCityOption = [];
                this.trunkEndAreaOption = [];
            }
            ,closeAddLineInfoWin(){//关闭途径城市窗口
                this.addLineInfo = false;
                this.addLineInfoForm= {
                    trunkStartAreaId : "",
                    trunkEndAreaId : "",
                    trunkPassRadio : 0
                };
                this.trunkPassArray=[];//途径城市集合
                this.$refs.addLineInfoForm.resetFields();
                this.clearCommon();
            }
            ,closeAddQuoteWin(){//关闭报价窗口
                this.addQuote = false;
                this.addQuoteForm= {
                    trunkStartCityId : '',
                    trunkEndCityId : '',
                    trunkStartAreaId : '',
                    trunkEndAreaId : '',
                    trunkEndAddress:''};
                this.$refs.addQuoteForm.resetFields();
                this.clearCommon();
            }
            //同城报价复选框
            ,fixLocalOfferCheck(){
                if(this.localChecked){
                    this.addFixLocalOffer();
                }else{
                    this.closeFixLocalOffer();
                }
            }
            ,closeFixLocalOffer(){
                this.localChecked = false;
                this.fixLocalOfferArray = [];
            }
            //增加同城报价
            ,addFixLocalOffer(model) {
                let pkId = "";
                let companyId = this.companyId;
                let provId = "";
                let provArr = this.baseProvinceOption;
                let cityId = "";
                let cityArr = [];
                let kind = "";
                let plateType = "";
                let matchHour = "";
                let startPrice = "";
                let kilometres = "";
                let addPrice = "";
                let lineRescueId = "";
                if(model){//编辑啦
                    pkId = this.string(model.pkId);
                    companyId = this.string(model.companyId);
                    provId = this.string(model.provId);
                    cityId = this.string(model.cityId);
                    kind = model.kind;
                    plateType = model.plateType;
                    matchHour = model.matchHour;
                    startPrice = model.startPrice;
                    kilometres = model.kilometres;
                    addPrice = model.addPrice;
                    lineRescueId = this.string(model.lineRescueId);
                }
                let bean = {pkId : pkId,companyId : companyId,provId : provId,provArr : provArr,cityId : cityId,cityArr : cityArr,kind : kind,plateType : plateType,matchHour : matchHour,startPrice : startPrice,kilometres : kilometres,addPrice : addPrice,lineRescueId : lineRescueId}
                if(this.fixLocalOfferArray.length == 0){
                    this.localChecked = true;
                }
                this.fixLocalOfferArray.push(bean);
                if(provId){
                    let i = this.fixLocalOfferArray.length - 1;
                    this.initCity(provId, 'fixLocalOfferArray['+i+'].cityArr', []);
                }
            }
            //删除同城报价
            ,delFixLocalOffer(index) {
                this.fixLocalOfferArray.splice(index,1);
                if(this.fixLocalOfferArray.length == 0){
                    this.closeFixLocalOffer();
                }
            }
            //一口报价复选框
            ,fixOfferCheck(){
                if(this.fixChecked){
                    this.addFixOffer();
                }else{
                    this.closeFixOffer();
                }
            }
            //关闭一口报价
            ,closeFixOffer(){
                this.fixChecked = false;
                this.fixOfferArray = [];
            }
            //增加一口报价
            ,addFixOffer(model) {
                let pkId = "";
                let companyId = this.companyId;
                let provId = "";
                let provArr = this.baseProvinceOption;
                let cityId = "";
                let cityArr = [];
                let kind = "";
                let plateType = "";
                let matchHour = "";
                let lineFixedOfferArr = [];
                let lineRescueId = "";
                if(model){
                    let ltdLineFixed = model.ltdLineFixed;
                    let lineFixedOffers = model.lineFixedOffers;
                    if(ltdLineFixed){
                        pkId = this.string(ltdLineFixed.pkId);
                        companyId = this.string(ltdLineFixed.companyId);
                        provId = ltdLineFixed.provId;
                        cityId = ltdLineFixed.cityId;
                        kind = ltdLineFixed.kind;
                        plateType = ltdLineFixed.plateType;
                        matchHour = ltdLineFixed.matchHour;
                        lineRescueId = this.string(ltdLineFixed.lineRescueId);
                    }
                    if(lineFixedOffers){
                        for (let i = 0; i < lineFixedOffers.length; i++) {
                            let v = lineFixedOffers[i];
                            lineFixedOfferArr.push({pkId : this.string(v.pkId),companyId : this.string(v.companyId),fixedId : this.string(v.fixedId),price:v.price,carrierScope:this.string(v.carrierScope),});
                        }
                    }
                }
                if(lineFixedOfferArr.length == 0){
                    lineFixedOfferArr.push({price : "", carrierScope : ""});
                }
                let bean = {pkId:pkId,companyId : companyId,provId : provId,provArr : provArr,cityId : cityId,kind : kind,plateType : plateType,matchHour : matchHour,lineFixedOfferArr : lineFixedOfferArr,lineRescueId : lineRescueId}
                if(this.fixOfferArray.length == 0){
                    this.fixChecked = true;
                }
                this.fixOfferArray.push(bean);
                if(provId){
                    let i = this.fixOfferArray.length - 1;
                    this.initCity(provId, 'fixOfferArray['+i+'].cityArr', []);
                }
            }
            //删除一口报价
            ,delFixOffer(index) {
                this.fixOfferArray.splice(index,1);
                if(this.fixOfferArray.length == 0){
                    this.closeFixOffer();
                }
            }
            //添加范围
            ,addDynamicFixScope(index) {
                this.fixOfferArray[index].lineFixedOfferArr.push({carrierScope: "", price: ""});
            }
            //删除范围
            ,delDynamicFixScope(index,index1) {
                this.fixOfferArray[index].lineFixedOfferArr.splice(index1,1);
            }
            //根据id获取小板信息
            ,selectLineRescuerByLineRescueId(lineRescueId,cb){
                let that = this;
                this.$post("selectLineRescuerByLineRescueId", {"lineRescueId": lineRescueId}).then(function (response) {
                    let data = response;
                    if (data.code == 0) {
                        that.$message.error(data.msg);
                        cb(null)
                    } else {
                        cb(data.resultData.lineRescuerVO)
                    }
                })
            }
            //编辑小板信息(回显数据)
            ,editLineRescue(lineRescueTablePkId) {
                this.resetSmallLineInfo();
                let that = this;
                that.loading = true;
                that.addSmallLineInfo = true;
                this.rescueLineInfoText = '编辑专线信息';
                this.selectLineRescuerByLineRescueId(lineRescueTablePkId,function(data){
                    if(data){
                        that.rescuerId = data.rescuerId;
                        let lineFixLines = data.lineFixLines;//一口报价
                        let lineIntercityOffers = data.lineIntercityOffers;//城际报价
                        let lineLocalOffers = data.lineLocalOffers;//同城报价
                        if(lineLocalOffers){
                            for (let i = 0; i < lineLocalOffers.length; i++) {
                                that.addFixLocalOffer(lineLocalOffers[i]);
                            }
                        }
                        if(lineFixLines){
                            for (let i = 0; i < lineFixLines.length; i++) {
                                that.addFixOffer(lineFixLines[i]);
                            }
                        }
                        if(lineIntercityOffers){
                            for (let i = 0; i < lineIntercityOffers.length; i++) {
                                that.addLtdLineLocalOffer(lineIntercityOffers[i]);
                            }
                        }
                    }
                    that.loading = false;

                })
            }
            //重置小板窗口信息
            ,resetSmallLineInfo(){
                this.localChecked = false;
                this.fixLocalOfferArray = [];
                this.fixChecked = false;
                this.fixOfferArray = [];
                this.intercityChecked = false;
                this.fixIntercityOfferTable = [];
            }
            //关闭小板窗口
            ,closeSmallLineInfoWin(){
                this.addSmallLineInfo = false;
                this.resetSmallLineInfo();
            }
            //添加同城报价
            ,addLtdLineLocalOffer(v){
                let i = this.fixIntercityOfferTable.length;
                var bean = {
                    index : i,
                    pkId : this.string(v.pkId),
                    companyId: this.string(v.companyId),
                    lineRescueId: this.string(v.lineRescueId),
                    startCityView: v.startProvName+"-"+v.startCityName,
                    endCityView: v.endProvName+"-"+v.endCityName,
                    startProvId: v.startProvId,
                    startProvName: v.startProvName,
                    startCityId: v.startCityId,
                    startCityName: v.startCityName,
                    endProvId: v.endProvId,
                    endProvName: v.endProvName,
                    endCityId: v.endCityId,
                    endCityName: v.endCityName,
                    matchHour: v.matchHour,
                    kind: v.kind,
                    plateType: v.plateType,
                    price: v.price,
                    kindView: kindName(v.kind),
                    plateTypeView: plateTypeName(v.plateType)
                };
                this.fixIntercityOfferTable.push(bean);

                // if(i == 0){
                //     this.intercityChecked = true;
                // }
                this.intercityChecked = true;
            }
            ,editFixIntercityOffer(index,row){
                this.addSmallLine = true;
                let temp = {
                    editIndex : row.index, //编辑数据的索引
                    pkId: this.string(row.pkId),
                    companyId: this.string(row.companyId),
                    lineRescueId: this.string(row.lineRescueId),
                    startProvId: row.startProvId,
                    startCityId: row.startCityId,
                    endProvId: row.endProvId,
                    endCityId: row.endCityId,
                    price: row.price,
                    matchHour: row.matchHour,
                    kind: row.kind,
                    plateType: row.plateType
                }
                this.intercityStartProvinceOption = this.baseProvinceOption;
                this.intercityEndProvinceOption = this.baseProvinceOption;
                if(row.startProvId){
                    this.initCity(row.startProvId,'intercityStartCityOption',['addSmallLineForm.startCityId']);
                }
                if(row.endProvId){
                    this.initCity(row.endProvId,'intercityEndCityOption',['addSmallLineForm.endCityId'])
                }
                this.addSmallLineForm = temp;
            }
            ,delFixIntercityOffer(index){
                this.fixIntercityOfferTable.splice(index,1);
            }
        }
    }
    //小板种类  1落地板 2半落地
    function kindName(kind){
        if(!kind){return "";}
        switch(kind) {
            case 1 : return '落地板';
            case 2 : return '半落地';
        }
    }
    //板式 1开放式 2封闭式 3半封闭
    function plateTypeName(plateType){
        if(!plateType){return ""};
        switch (plateType) {
            case 1 :return '开放式';
            case 2 :return '封闭式';
            case 3 :return '半封闭';
        }
    }
    //校验同城报价
    function checkFixLocalOffer(v){
        if(!v.cityId){
            return "请填写业务城市";
        }else if(!v.kind){
            return "请选择小板种类";
        }else if(!v.plateType){
            return "请选择板式";
        }else if(!v.matchHour){
            return "请填写调板时长";
        }else if(!v.startPrice || !v.kilometres || !v.addPrice){
            return "请完善起步价";
        }else{
            return "";
        }
    }
    //校验一口报价
    function checkFixOffer(v){
        if(!v.cityId){
            return "请填写业务城市";
        }else if(!v.kind){
            return "请选择小板种类";
        }else if(!v.plateType){
            return "请选择板式";
        }else if(!v.matchHour){
            return "请填写调板时长";
        }else if(v.lineFixedOfferArr.length > 0){
            for(let j=0;j<v.lineFixedOfferArr.length;j++){
                if(!v.lineFixedOfferArr[j].carrierScope){
                    return "请填写承运范围";
                }else if(!v.lineFixedOfferArr[j].price){
                    return "请填写一口报价";
                }
            }
            return "";
        }else{
            return "";
        }
    }
</script>
<style>
    .header img {
        float: left;
        margin-top: 20px;
    }
</style>
