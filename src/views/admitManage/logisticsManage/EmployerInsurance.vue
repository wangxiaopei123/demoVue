<template>
    <div>
        <h2 class="manage-title">物流保险列表</h2>
        <div class="manage-tip">
            <i class="el-icon-info"></i>
            <div class="manage-tip-txt">
                为保证货物、雇主在运输途中，因遭受自然灾害或意外交通事故所造成的损失能够获得经济赔偿；管家需要承运商提供货运险、雇主责任险及承运人责任险保险信息，同时管家会依据这些信息评估承运商的承运能力及风险控制能力；请务必及时完成保险信息填写，避免因为未填写（即表示没有该类型保险）保险信息而无法承运，感谢您的配合！
            </div>
        </div>
        <div class="capacity-manage">
            <div class="car-way line-choice">
                <div class="car-way-btn">
                    <el-button type="primary" @click="addEmployerInsurance = true;dialogTitle='新增雇主责任险'">新增雇主责任险</el-button>
                </div>
                <div class="car-tabs list-search-box">
                    <el-tabs type="border-card" v-model="activeName" @tab-click="tabClick">
                        <el-tab-pane label="货运险"></el-tab-pane>
                        <el-tab-pane name="second" label="雇主责任险">
                            <!-- 搜索框 -->
                            <el-form label-width="96px" class="demo-ruleForm" :model="selectForm" ref="selectForm">
                                <div class="search-manage small-search small-car-search clear">
                                    <div class="search-l clear">
                                        <el-form-item label="保险单号" prop="policyNo">
                                            <el-input placeholder="请输入保险单号" v-model="selectForm.policyNo"></el-input>
                                        </el-form-item>
                                        <el-form-item label="保险品牌" prop="brand" placeholder="请选择">
                                            <el-select v-model="selectForm.brand">
                                                <el-option v-for="item in brandOption"
                                                           :key="item.value"
                                                           :label="item.name"
                                                           :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item class="search-date" label="创建时间" prop="createTimeStart">
                                            <el-date-picker type="date" v-model="selectForm.createTimeStart" value-format="yyyy-MM-dd"
                                                            placeholder="开始日期">
                                            </el-date-picker>
                                            <span>至</span>
                                            <el-date-picker type="date" v-model="selectForm.createTimeEnd" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                                                            placeholder="结束日期">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item class="search-date" label="审核时间" prop="verifyTimeStart">
                                            <el-date-picker type="date" v-model="selectForm.verifyTimeStart"
                                                            placeholder="开始日期">
                                            </el-date-picker>
                                            <span>至</span>
                                            <el-date-picker type="date" v-model="selectForm.verifyTimeEnd"
                                                            placeholder="结束日期">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="审核状态" prop="status">
                                            <el-select v-model="selectForm.status">
                                                <el-option :value="0" label="待提交"></el-option>
                                                <el-option :value="1" label="审核中"></el-option>
                                                <el-option :value="2" label="审核成功"></el-option>
                                                <el-option :value="3" label="审核失败"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                    <div class="search-r">
                                        <el-button type="primary" @click="createList()">搜 索</el-button>
                                        <el-button @click="resetForm('selectForm')">重 置</el-button>
                                    </div>
                                </div>
                            </el-form>

                            <!--有数据显示的时候-->
                            <div class="car-way-table" v-if="employerInsuranceTableData.length > 0 " :key="Math.random()">
                                <el-table border :data="employerInsuranceTableData" style="width: 100%;" >
                                    <el-table-column width="60px" label="序号" type="index">
                                        <template slot-scope="scope">
                                            {{scope.$index+1}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="brandName" label="保险品牌" width="200">
                                    </el-table-column>
                                    <el-table-column prop="policyNo" label="保险单号" width="220">
                                        <template slot-scope="scope">
                                            <span @click="OpenInsuranceDetails(scope.row)" class="car-way-blue">{{scope.row.policyNo}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="driverNum" label="司机数量" width="100">
                                    </el-table-column>
                                    <el-table-column prop="driverNum" label="有效期" width="240">
                                        <template slot-scope="scope">
                                            <span>   {{common.formatterDate('','',scope.row.startTime)}}至{{common.formatterDate('','',scope.row.endTime)}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="status" label="审核状态" width="160">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.status === 0">待提交</span>
                                            <span v-else-if="scope.row.status === 1">审核中</span>
                                            <span v-else-if="scope.row.status === 2">审核成功</span>
                                            <span v-else-if="scope.row.status === 3">审核失败</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="verifyTime" label="审核时间" width="200"
                                                     :formatter="this.common.formatterDate">
                                    </el-table-column>
                                    <el-table-column prop="createTime" label="创建时间" width="200"
                                                     :formatter="this.common.formatterDateTime">
                                    </el-table-column>
                                    <el-table-column fixed="right" label="操作" width="280">
                                        <template slot-scope="scope">
                                            <el-button type="text" v-if="scope.row.status === 0"
                                                       @click="findInfoByPkId(scope.row.pkId);dialogTitle='编辑雇主责任险'" size="small">编辑
                                            </el-button>
                                            <el-button type="text" v-if="scope.row.status === 0" size="small"
                                                       @click="submitStatus(scope.row.pkId)">提交
                                            </el-button>
                                            <el-button v-if="scope.row.status != 1" type="text" size="small"
                                                       @click="removeInfo(scope.$index, scope.row)">删除
                                            </el-button>
                                            <el-button v-if="scope.row.status === 2 || scope.row.status === 3"
                                                       @click="editCorrection = true;driverInfoPkId = scope.row.pkId" type="text" size="small">上传批单
                                            </el-button>
                                            <el-button v-if="scope.row.status === 2 || scope.row.status === 3"
                                                       @click="getCorrectionDetails(scope.row.pkId)" type="text" size="small">
                                                批单详情
                                            </el-button>
                                            <el-button v-if="scope.row.status === 3" type="text" size="small">修改批单
                                            </el-button>
                                            <el-button v-if="scope.row.status === 3" type="text" size="small">重新提交
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <!--暂无信息显示-->
                            <div class="car-way-nothing" v-else>
                                <div class="car-way-no" style="top: 180px;">
                                    <i class="el-icon-warning"></i>
                                    <span>暂无保险信息，请先新增保险</span>
                                </div>
                                <el-table border style="width: 100%;">
                                    <el-table-column width="60px" label="序号">
                                    </el-table-column>
                                    <el-table-column label="保险品牌">
                                    </el-table-column>
                                    <el-table-column label="保险单号">
                                    </el-table-column>
                                    <el-table-column label="司机数量">
                                    </el-table-column>
                                    <el-table-column label="有效期">
                                    </el-table-column>
                                    <el-table-column label="审核状态">
                                    </el-table-column>
                                    <el-table-column label="审核时间">
                                    </el-table-column>
                                    <el-table-column label="创建时间">
                                    </el-table-column>
                                    <el-table-column label="操作">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="承运人责任险"></el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>

        <!--新增雇主责任险-->
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" :visible.sync="addEmployerInsurance"
                   :title="dialogTitle" center  :before-close="closeModal">
            <div class="capacity-pop-in">
                <el-form :model="addEmployerInsuranceForm" :rules="addEmployerInsuranceRules"
                         ref="addEmployerInsuranceForm" label-width="108px" class="demo-ruleForm">
                    <el-input v-model="addEmployerInsuranceForm.pkId" type="hidden"></el-input>
                    <el-input v-model="addEmployerInsuranceForm.status" type="hidden"></el-input>
                    <!-- <div class="manage-tip manage-error">
                         <div class="manage-tip-txt">
                             <b>审核失败原因如下：</b>
                             1.填写的信息与保单信息不符；2.保单照片模糊；
                         </div>
                     </div>-->
                    <div class="info-item clear">
                        <el-form-item label="保险品牌" prop="brand">
                            <el-select v-model="addEmployerInsuranceForm.brand">
                                <el-option v-for="item in brandOption"
                                           :key="item.value"
                                           :label="item.name"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="保险单号" prop="policyNo">
                            <el-input v-model="addEmployerInsuranceForm.policyNo" placeholder="请输入保险单号"></el-input>
                        </el-form-item>
                        <el-form-item class="required_flag" label="司机清单" style="height: 40px;">
                            <span class="ellipsis">{{driverName}}</span>

                            <span @click="driverInfo = true" style="color: #2d8cf0;cursor: pointer;">添加司机</span>
                            <el-input v-model="driverId" type="hidden"></el-input>
                        </el-form-item>
                        <el-form-item label="总保费" prop="premium">
                            <el-input style="width: 93%;" v-model="addEmployerInsuranceForm.premium" placeholder="请输入保单总保费" maxlength="15" onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"></el-input>&nbsp;元
                        </el-form-item>
                        <el-form-item class="required_flag" label="保单照片" prop="image">
                            <div class="upload_box">
                                <el-upload
                                        class="avatar-uploader"
                                        name="driver_insurance"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="uploadInsuranceSuccess"
                                        :before-upload="common.beforeAvatarUpload">

                                    <img v-if="addEmployerInsuranceForm.image" :src="addEmployerInsuranceForm.image"
                                         class="avatar">

                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </el-form-item>
                        <el-form-item  class="termOfValidity required_flag" label="有效期" style="min-height: 92px;">
                            <el-form-item prop="startTime">
                                <el-date-picker v-model="addEmployerInsuranceForm.startTime"
                                                type="date"
                                                placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <span>至</span>
                            <el-form-item prop="endTime">
                                <el-date-picker v-model="addEmployerInsuranceForm.endTime"
                                                prop=""
                                                type="date"
                                                placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="保险批单" prop="">
                            <div class="upload_box">
                                <el-upload
                                        class="avatar-uploader"
                                        name="correction_employer1"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="common.beforeAvatarUpload">

                                    <img v-if="correction_employer1_imageUrl_name" :src="correction_employer1_imageUrl"
                                         :imageType="correction_employer1_imageUrl_type"
                                         :imgName="correction_employer1_imageUrl_name"
                                         class="avatar">

                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                            <div class="upload_box">
                                <el-upload
                                        class="avatar-uploader"
                                        name="correction_employer2"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="common.beforeAvatarUpload">

                                    <img v-if="correction_employer2_imageUrl_name" :src="correction_employer2_imageUrl"
                                         :imageType="correction_employer2_imageUrl_type"
                                         :imgName="correction_employer2_imageUrl_name"
                                         class="avatar">

                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                            <div class="upload_box">
                                <el-upload
                                        class="avatar-uploader"
                                        name="correction_employer3"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="common.beforeAvatarUpload">
                                    <img v-if="correction_employer3_imageUrl_name" :src="correction_employer3_imageUrl"
                                         :imageType="correction_employer3_imageUrl_type"
                                         :imgName="correction_employer3_imageUrl_name"
                                         class="avatar">

                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                            <span class="tips_txt">如果保单有过变更请,将保险批单一起上传,最少上传1张，最多3张</span>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="import-bottom">
                    <el-button @click=" closeModal()">取 消</el-button>
                    <el-button type="primary" @click="submitForm()">保 存</el-button>
                    <el-button type="primary" @click="addEmployerInsuranceForm.status=1,submitForm()">保存并提交</el-button>
                </div>
            </div>
        </el-dialog>
        <!--保险详情-->
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" :visible.sync="insuranceDetails" title="保险详情"
                   center>
            <div class="capacity-pop-in">
                <el-form :model="insuranceDetailsForm" :rules="insuranceDetailsRules" ref="insuranceDetailsForm"
                         label-width="108px" class="demo-ruleForm">
                    <div class="info-item clear">
                        <el-form-item label="保险品牌：" prop="">
                            {{insuranceDetailsForm.brandName}}
                        </el-form-item>
                        <el-form-item label="保险单号：" prop="">
                            {{insuranceDetailsForm.policyNo}}
                        </el-form-item>
                        <el-form-item label="司机清单：" prop="" style="height: 40px;">
                            <span class="ellipsis">{{driverName}}</span>
                            <span @click="driverDetails = true" style="color: #2d8cf0;cursor: pointer;">详情</span>
                        </el-form-item>
                        <el-form-item label="总保费：" prop="">
                            {{insuranceDetailsForm.premium}}元
                        </el-form-item>
                        <el-form-item label="保单照片：" prop="">
                            <img class="imgSet" :src="common.CONSTANT.imagePrefix + insuranceDetailsForm.image" alt="">
                        </el-form-item>
                        <el-form-item class="termOfValidity" label="有效期：" style="min-height: 105px;">
                            {{common.formatterDate('','',insuranceDetailsForm.startTime)}}至{{common.formatterDate('','',insuranceDetailsForm.endTime)}}
                        </el-form-item>
                        <el-form-item label="保险批单：" prop="">
                            <img class="imgSet" v-if="correction_employer1_imageUrl" :src="correction_employer1_imageUrl" alt="">
                            <img class="imgSet" v-if="correction_employer2_imageUrl" :src="correction_employer2_imageUrl" alt="">
                            <img class="imgSet" v-if="correction_employer3_imageUrl" :src="correction_employer3_imageUrl" alt="">
                            <span class="tips_txt">如果保单有过变更请,将保险批单一起上传,最少上传1张，最多3张</span>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="import-bottom">
                    <el-button type="primary" @click="insuranceDetails=false;">确 定</el-button>
                </div>
            </div>
        </el-dialog>
        <!--上传/修改批单-->
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" :visible.sync="uploadEndorsement" title="上传批单"
                   width="560px" center>
            <div class="capacity-pop-in" style="padding-right: 12px;">
                <div class="line-tips">如果保单产生变更，请从此上传保险批单；若未变更，请勿进行此项操作，以免因为批单信息审核不通过影响到整个保单的使用！！！<span
                        style="color: #f56c6c;cursor: pointer;">审核失败原因</span></div>
                <div class="manage-tip manage-error">
                    <div class="manage-tip-txt">
                        <b>审核失败原因如下：</b>
                        1.保险批单上的保单号与保单图片不一致
                    </div>
                </div>
                <el-form :model="uploadEndorsementForm" :rules="uploadEndorsementRules" ref="uploadEndorsementForm"
                         label-width="110px" class="demo-ruleForm">
                    <el-form-item label="司机清单" class="required_flag" prop="">
                        <span style="width: 50%;" class="ellipsis">张三/李四/王五/韩某某</span>
                        <span @click="driverInfo = true" style="color: #2d8cf0;cursor: pointer;">修改</span>
                    </el-form-item>
                    <el-form-item label="批单变更说明" prop="">
                        <el-input type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="批单照片" class="required_flag" prop="">
                        <div class="upload_box">
                            <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="common.beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <div class="upload_box">
                            <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="common.beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <div class="upload_box">
                            <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="common.beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <span class="tips_txt">如果保单有过变更请,将保险批单一起上传,最少上传1张，最多3张</span>
                    </el-form-item>
                </el-form>
                <div class="import-bottom">
                    <el-button>取 消</el-button>
                    <el-button type="primary">保存并提交</el-button>
                </div>
            </div>
        </el-dialog>
        <!--批单详情-->
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" :visible.sync="correctionDetails" title="批单详情"
                   width="560px" center>
            <div class="capacity-pop-in" style="padding-right: 12px;">
                <el-form label-width="110px" class="demo-ruleForm">
                    <el-collapse class="endorsement" v-model="activeName" accordion>
                        <el-collapse-item v-for="(item,index) in correctionDetailsList" :title="item.name" :name="index" :key="item.id">
                            <el-form-item label="司机清单：">
                                <span style="width: 50%;" class="ellipsis">张三/李四/王五/韩某某</span>
                                <span @click="driverInfo = true" style="color: #2d8cf0;cursor: pointer;">详情</span>
                            </el-form-item>
                            <el-form-item label="批单变更说明：">
                                {{item.changeDesc}}
                            </el-form-item>
                            <el-form-item label="批单照片：">
                                {{item.ltdCompanyImgList}}
                                <!-- <img v-for="(img,index) in ltdCompanyImgList" :src="common.CONSTANT.imagePrefix+img.imagePath" alt="" class="imgSet" >-->

                            </el-form-item>
                        </el-collapse-item>

                    </el-collapse>
                </el-form>
                <div class="import-bottom" style="padding-top: 0;border-top: 0;">
                    <el-button type="primary">确 定</el-button>
                </div>
            </div>
        </el-dialog>

        <el-dialog class="capacity-pop capacity-pop-big capacity-line" :visible.sync="driverDetails" title="司机信息" width="560px" center>
            <div class="capacity-pop-in" style="padding-right: 12px;">
                <div class="car-tabs">
                    <!--添加修改司机信息-->
                   <!-- <el-table border style="width: 100%;" @selection-change="handleSelectionChange" tooltip-effect="dark"
                              ref="multipleTable" :data="carInfoTableData">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column prop="userName" label="司机姓名">
                        </el-table-column>
                        <el-table-column prop="idCard" label="身份证号">
                        </el-table-column>
                    </el-table>-->
                    <!--司机信息详情-->
                    <el-table border style="width: 100%;" :data="driverDetailsList">
                        <el-table-column prop="driverName" label="司机姓名">
                        </el-table-column>
                        <el-table-column prop="idCard" label="身份证号">
                        </el-table-column>
                     </el-table>
                </div>
                <div class="import-bottom">
                    <el-button @click="driverDetails=false">取 消</el-button>
                    <el-button type="primary" @click="driverDetails=false">确 定</el-button>
                </div>
            </div>
        </el-dialog>

        <!--司机信息-->
        <DriverInfo :visible.sync="driverInfo" :pkId="driverInfoPkId" v-on:ListenChild="ShowChild"></DriverInfo>
        <!--上传批单-->
        <UploadCorrection :visible.sync="editCorrection" :pkId="driverInfoPkId"></UploadCorrection>
    </div>
</template>

<script>
    import DriverInfo from './DriverInfo'
    import UploadCorrection from './UploadCorrection'

    export default {
        components: {
            'DriverInfo': DriverInfo,
            'UploadCorrection': UploadCorrection
        },
        inject: ['reload'],
        data() {

            // 保单号重复校验
            let validPolicyNo = (rule, value, callback) => {
                if (this.oldPolicyNo === value) {
                    callback();
                } else {
                    this.$get("insuranceManage/validPolicyNo", {"policyNo": value}).then(function (response) {
                        if (response.code == 1) {
                            if (response.flag) {
                                callback(new Error('保单号已存在'));
                            } else {
                                callback();
                            }
                        } else {
                            callback(new Error(response.msg));
                        }
                    });
                }
            };

            return {
                action: this.common.CONSTANT.UPLOADIMGPATH + 'recognizeImage',//上传图片地址
                correctionDetails: false, //批单详情-弹出框
                correctionDetailsList:[], //批单详情-弹出框-数据
                activeName: 'second',
                dialogTitle:"",
                uploadEndorsement: false,    //上传批单-弹出框
                uploadEndorsementForm: {},//上传批单-form
                uploadEndorsementRules: {},//上传批单-rules
                insuranceDetails: false,     //保险详情
                oldPolicyNo:"",
                driverDetailsList:[],
                driverDetails:false,
                // showEmployerInsuranceTable: 0, //无数据表格显示控制

                driverInfo: false,
                driverInfoPkId: '',
                editCorrection:false,
                addEmployerInsurance: false,     //雇主责任险
                addEmployerInsuranceForm: {
                    image: "",
                    status: 0,

                },    //雇主责任险-form
                addEmployerInsuranceRules: {
                    policyNo: [{required: true, message: '此项不能为空', trigger: 'blur'},
                        {min:10,max:30, message: '保单号不正确（10-30位）', trigger: 'blur'},
                        {validator: validPolicyNo, trigger: 'blur'}],
                    brand: [{required: true, message: '此项不能为空', trigger: 'blur'}],
                    premium: [{required: true, message: '此项不能为空', trigger: 'blur'}],
                    startTime: [{required: true, message: '此项不能为空', trigger: 'blur'}],
                    endTime: [{required: true, message: '此项不能为空', trigger: 'blur'}],
                },   //雇主责任险-rules
                insuranceDetailsForm: {},    //保险详情
                insuranceDetailsRules: {},   //保险详情
                selectForm: {
                    policyNo: "",
                    brand: "",
                    createTimeStart: "",
                    createTimeEnd: "",
                    verifyTimeStart: "",
                    verifyTimeEnd: "",
                    status: "",
                },      //搜索框form
                imageUrl: '',
                employerInsuranceTableData: [],
                brandOption: [], //保险品牌赋值
                driverId: "", //选定司机
                driverName: "",
                driver_insurance_imageUrl: "",
                correction_employer1_imageUrl: "",
                correction_employer2_imageUrl: "",
                correction_employer3_imageUrl: "",

                driver_insurance_imageUrl_type: "",
                correction_employer1_imageUrl_type: "",
                correction_employer2_imageUrl_type: "",
                correction_employer3_imageUrl_type: "",

                driver_insurance_imageUrl_name: "",
                correction_employer1_imageUrl_name: "",
                correction_employer2_imageUrl_name: "",
                correction_employer3_imageUrl_name: "",
            }
        },
        created: function () {
            this.common.getBizConstants(this, 'ctaliType', 'brandOption');
            this.createList();

        },
        methods: {
            ShowChild: function (data) {
                this.driverId = data.driverId;
                this.driverName = data.driverUsername;
            },
            formatterDate1(time) {
                if(time == null || time ==""){
                    return ""
                }
                time = new Date(time);
                let format = `${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' +
                    (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()}`;
                console.error(format+"----")
                return format;
            },
            createList() {
                let that = this;
                if(that.selectForm.createTimeEnd){
                    that.selectForm.createTimeEnd = that.formatterDate1(that.selectForm.createTimeEnd) + " 23:59:59";
                }
                that.$get("insuranceManage/queryLtdInsuranceEmployerAllList", that.selectForm).then(function (response) {
                    if (response.data != null) {
                        that.employerInsuranceTableData = response.data;
                    }
                })
            },
            closeModal(){
                this.addEmployerInsuranceForm={};
                this.$refs['addEmployerInsuranceForm'].resetFields();
                this.driverId="";
                this.driverName="";
                this.correction_employer1_imageUrl_name= "";
                this.correction_employer2_imageUrl_name= "";
                this.correction_employer3_imageUrl_name= "";
                this.addEmployerInsurance=false;
            },
            submitForm() {

                if(this.driverId == null || this.driverId == ''){
                    this.$message.error('请选择司机');
                    return false;
                }

                this.$refs.addEmployerInsuranceForm.validate((valid) => {
                    if (valid) {
                        let that = this;
                        let data = new FormData();
                        let imgdata = new FormData();
                        let imgDataList = [];
                        imgDataList.push(
                            {
                                imageName: this['correction_employer1_imageUrl_name'],
                                imagePath: this['correction_employer1_imageUrl'],
                                type: this['correction_employer1_imageUrl_type'],
                                imageStatus: 0,
                                imageMark: 'correction_employer1'
                            }
                        )
                        imgDataList.push(
                            {
                                imageName: this['correction_employer2_imageUrl_name'],
                                imagePath: this['correction_employer2_imageUrl'],
                                type: this['correction_employer2_imageUrl_type'],
                                imageStatus: 0,
                                imageMark: 'correction_employer2'
                            }
                        )
                        imgDataList.push(
                            {
                                imageName: this['correction_employer3_imageUrl_name'],
                                imagePath: this['correction_employer3_imageUrl'],
                                type: this['correction_employer3_imageUrl_type'],
                                imageStatus: 0,
                                imageMark: 'correction_employer3'
                            }
                        )
                        data = JSON.stringify(that.addEmployerInsuranceForm);
                        imgdata = JSON.stringify(imgDataList);
                        that.$post("insuranceManage/saveLtdInsuranceEmployer",
                            {
                                "data": "{ltdInsuranceEmployer:" + data + "}",
                                "imgDataList": imgdata,
                                "driverId": that.driverId
                            }).then(function (response) {
                            if (response.code == 0) {
                                alert(response.msg)
                            } else if (response.code == 1) {
                                that.$message({
                                    type: 'success',
                                    message: response.msg
                                });
                            }
                            that.reload();
                        })
                    }
                })
            },
            findInfoByPkId(pkId) {
                // alert(pkId)
                this.addEmployerInsurance = true;
                let that = this;
                that.$get("insuranceManage/queryLtdInsuranceEmployerByPkId", {"pkId": pkId}).then(function (res) {
                    that.addEmployerInsuranceForm = res.ltdInsuranceEmployer;
                    that.oldPolicyNo=res.ltdInsuranceEmployer.policyNo;
                    that.addEmployerInsuranceForm.image = that.common.CONSTANT.imagePrefix +res.ltdInsuranceEmployer.image;
                    that.driverName="";
                    for (let v of res.ltdInsuranceDriverList) {
                        that.driverId += v.driverId + ",";
                        that.driverName += v.driverName + ",";
                    }
                    res.ltdCompanyImgList.forEach(function (image) {
                        let imageMark = image['imageMark'];
                        let imageType = imageMark + "_imageUrl_type";
                        let imageName = imageMark + "_imageUrl_name";
                        let imageUrl = imageMark + "_imageUrl";
                        that[imageMark] = image.imageMark;
                        that[imageType] = image.type;
                        that[imageName] = image.imageName;
                        that[imageUrl] = that.common.CONSTANT.imagePrefix + image.imagePath;
                        that.addEmployerInsuranceForm[imageUrl] = image.imagePath;
                    })
                })
            },
            getCorrectionDetails(pkId){
                let that=this;
                this.correctionDetails = true;
                this.$get("insuranceManage/queryLtdCorrectionEmployerList", {"insuranceId": pkId}).then(function (res) {
                    that.correctionDetailsList=res.response.response;
                })
            },
            OpenInsuranceDetails(row){
                this.insuranceDetails=true;
                this.insuranceDetailsForm=row;
                this.driverName="";
                let that = this;
                that.$get("insuranceManage/queryLtdInsuranceEmployerByPkId", {"pkId": row.pkId}).then(function (res) {
                    for (let v of res.ltdInsuranceDriverList) {
                        that.driverName += v.driverName + ",";
                    }
                    that.driverDetailsList=res.ltdInsuranceDriverList;
                    res.ltdCompanyImgList.forEach(function (image) {
                        let imageMark = image['imageMark'];
                        let imageType = imageMark + "_imageUrl_type";
                        let imageName = imageMark + "_imageUrl_name";
                        let imageUrl = imageMark + "_imageUrl";
                        that[imageMark] = image.imageMark;
                        that[imageType] = image.type;
                        that[imageName] = image.imageName;
                        that[imageUrl] = that.common.CONSTANT.imagePrefix + image.imagePath;
                        // that.addEmployerInsuranceForm[imageUrl] = image.imagePath;
                    })
                })
            },
            submitStatus(pkId) {
                let that = this;
                this.$confirm('审核中及审核通过后，保单信息将无法修改，确认您提交的保单信息已无误？', '提交提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$post("insuranceManage/update", {"pkId": pkId, "type": 1}).then(function (res) {
                        if (res) {
                            that.$message({
                                type: 'success',
                                message: '提交成功!'
                            });
                            that.reload();
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '操作取消'
                    });
                });
            },
            removeInfo(index, row) {
                let that = this;
                this.$confirm('保单删除后，关联的司机将处于无保险状态，确认要删除当前保单？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$post("insuranceManage/update", {"pkId": row.pkId, "type": 0}).then(function (res) {
                        if (res) {
                            that.employerInsuranceTableData.splice(index, 1);
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '操作取消'
                    });
                });
            },
            resetForm(formname) {
                this.$refs[formname].resetFields();
                this[formname].createTimeEnd="";
                this[formname].verifyTimeEnd="";
                this.createList()
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
                //this.addHeadstockForm[imageUrl]=filePath;

            },
            uploadInsuranceSuccess(res, file) {
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
                this.addEmployerInsuranceForm.image = data['resultData']['filePath'];
            },

            requestUpload(obj) {
                obj.companyId = this.common.fetchData("company").pkId;
                this.common.uploadImgFun(obj, this);
            },
            /*********end*******/
            //获取tab下标
            tabClick(tab, event) {
                if (tab.index == 0) {
                    this.$router.push('/cargoInsurance')
                } else if (tab.index == 2) {
                    this.$router.push('/carrierInsurance')
                }
            },

        },
    }
</script>

<style scoped>

</style>
