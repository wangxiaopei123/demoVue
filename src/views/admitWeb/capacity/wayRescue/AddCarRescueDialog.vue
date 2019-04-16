<template>
    <div>
        <!--添加车辆弹窗-->
        <el-dialog class="capacity-pop capacity-line capacity-pop-big" :title="showTitle"  :visible.sync="visible" :carRescuePkId="carRescuePkId"
                   width="74.2%" center :before-close="closeAddCarRescue">
            <div class="capacity-pop-in">
                <div class="steps steps-step">
                    <el-steps :active="activePop" finish-status="success" process-status="finish" align-center>
                        <el-step :title="showStep"></el-step>
                        <el-step title="核对并完善信息"></el-step>
                        <el-step title="添加成功"></el-step>
                    </el-steps>
                </div>
                <div id="errorInfo" v-if="showError" class="manage-tip manage-error">
                    <i class="el-icon-warning"></i>
                    <div class="manage-tip-txt">
                        <h2>审核失败原因如下：</h2>
                        <p id="reason">{{reason}}</p>
                    </div>
                </div>
                <el-form v-if="activePop === 0" :model="addCarRescueForm" :rules="addCarRescueRules"
                         ref="addCarRescueForm" label-width="130px" class="demo-ruleForm">
                    <h2 class="info-title">基本信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="马力" prop="horsepower">
                            <el-input v-model.number="addCarRescueForm.horsepower"></el-input>
                        </el-form-item>
                        <el-form-item label="种类" prop="kind">
                            <el-radio-group v-model="addCarRescueForm.kind">
                                <el-radio :label=1>落地版</el-radio>
                                <el-radio :label=2>半落地</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="板长度" prop="length">
                            <el-input v-model.number="addCarRescueForm.length"></el-input>
                        </el-form-item>
                        <el-form-item label="度数" prop="degree">
                            <el-input v-model.number="addCarRescueForm.degree"></el-input>
                        </el-form-item>
                        <el-form-item label="板式" prop="plateType">
                            <el-select v-model="addCarRescueForm.plateType" placeholder="请选择">
                                <el-option :value=1 label="开放式"></el-option>
                                <el-option :value=2 label="封闭式"></el-option>
                                <el-option :value=3 label="半封闭"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="GPS品牌" prop="gpsBrand">
                            <el-select v-model="addCarRescueForm.gpsBrand" placeholder="请选择">
                                <el-option :value=1 label="G7"></el-option>
                                <el-option :value=2 label="北斗"></el-option>
                                <el-option :value=0 label="其他"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="车辆正面45°照" class="required_flag" prop="car_front_45_imageUrl">
                            <div class="upload_box">
                                <el-upload
                                        class="avatar-uploader"
                                        :action="action"
                                        name="car_front_45"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="updateSuccess"
                                        :before-upload="common.beforeAvatarUpload">
                                    <img v-if="addCarRescueForm.car_front_45_imageUrl"
                                         :src="addCarRescueForm.car_front_45_imageUrl"
                                         :imageType="addCarRescueForm.car_front_45_imageUrl_type"
                                         :imgName="addCarRescueForm.car_front_45_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '3'">查看示例</div>
                            </div>
                        </el-form-item>
                    </div>
                    <h2 class="info-title">行驶证信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="车牌号码" prop="dlPlateNo">
                            <el-input v-model="addCarRescueForm.dlPlateNo"></el-input>
                        </el-form-item>
                        <el-form-item label="所有人" prop="dlBelongUser">
                            <el-tooltip placement="bottom">
                                <div slot="content">
                                    所有人必须与企业名称一致
                                </div>
                                <el-input v-model="addCarRescueForm.dlBelongUser"></el-input>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="证件照片" class="required_flag" prop="driving_license_front_imageUrl">
                            <div class="upload_box">
                                <span class="tit_tit">行驶证首页</span>
                                <el-upload
                                        class="avatar-uploader"
                                        :action="action"
                                    name="driving_license_front"
                                    :show-file-list="false"
                                    :http-request="requestUpload"
                                    :on-success="updateSuccess"
                                    :before-upload="common.beforeAvatarUpload">
                                    <img v-if="addCarRescueForm.driving_license_front_imageUrl"
                                         :src="addCarRescueForm.driving_license_front_imageUrl"
                                         :imageType="addCarRescueForm.driving_license_front_imageUrl_type"
                                         :imgName="addCarRescueForm.driving_license_front_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '0'">查看示例</div>
                            </div>
                            <div class="upload_box">
                                <span class="tit_tit">行驶证副页</span>
                                <el-upload
                                        class="avatar-uploader"
                                        :action="action"
                                        name="driving_license_second"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="updateSuccess"
                                        :before-upload="common.beforeAvatarUpload">
                                    <img v-if="addCarRescueForm.driving_license_second_imageUrl"
                                         :src="addCarRescueForm.driving_license_second_imageUrl"
                                         :imageType="addCarRescueForm.driving_license_second_imageUrl_type"
                                         :imgName="addCarRescueForm.driving_license_second_imageUrl_name"
                                         class="avatar" >
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '1'">查看示例</div>
                            </div>
                            <div class="upload_box">
                                <span class="tit_tit">行驶证背面</span>
                                <el-upload
                                        class="avatar-uploader"
                                        :action="action"
                                        name="driving_license_back"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="updateSuccess"
                                        :before-upload="common.beforeAvatarUpload">
                                    <img v-if="addCarRescueForm.driving_license_back_imageUrl"
                                         :src="addCarRescueForm.driving_license_back_imageUrl"
                                         :imageType="addCarRescueForm.driving_license_back_imageUrl_type"
                                         :imgName="addCarRescueForm.driving_license_back_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '2'">查看示例</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="机动车登记证书" style="min-height: 163px;">
                            <div class="upload_box">
                                <el-upload
                                        class="avatar-uploader"
                                        :action="action"
                                        name="car_reg_cert"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="updateSuccess"
                                        :before-upload="common.beforeAvatarUpload">
                                    <img v-if="addCarRescueForm.car_reg_cert_imageUrl"
                                         :src="addCarRescueForm.car_reg_cert_imageUrl"
                                         :imageType="addCarRescueForm.car_reg_cert_imageUrl_type"
                                         :imgName="addCarRescueForm.car_reg_cert_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '5'">查看示例</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="车牌类型" prop="dlPlateType">
                            <el-select v-model="addCarRescueForm.dlPlateType" placeholder="请选择">
                                <el-option :value=1 label="黄牌"></el-option>
                                <el-option :value=2 label="蓝牌"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <!---->
                    <h2 class="info-title">运输许可证信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="业户名称" prop="rpOwnerName">
                            <el-input v-model="addCarRescueForm.rpOwnerName"></el-input>
                        </el-form-item>
                        <el-form-item label="所属省份" prop="rpProId">
                            <el-select v-model="addCarRescueForm.rpProId" placeholder="请选择省">
                                <el-option
                                        v-for="item in provinceOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="运输许可证号" prop="rpNo">
                            <el-input v-model="addCarRescueForm.rpNo"></el-input>
                        </el-form-item>
                        <el-form-item label="发证日期" prop="rpTime">
                            <el-date-picker v-model="addCarRescueForm.rpTime"
                                            type="date"
                                            placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="运输许可证" prop="transport_license_imageUrl">
                            <div class="upload_box">
                                <el-upload
                                        class="avatar-uploader"
                                        name="transport_license"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="updateSuccess"
                                        :before-upload="common.beforeAvatarUpload">

                                    <img v-if="addCarRescueForm.transport_license_imageUrl" :src="addCarRescueForm.transport_license_imageUrl"
                                         :imageType="addCarRescueForm.transport_license_imageUrl_type"
                                         :imgName="addCarRescueForm.transport_license_imageUrl_name"
                                         class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '4'">查看示例</div>
                            </div>
                        </el-form-item>
                        <el-form-item class="termOfValidity required_flag" label="有效期">
                            <el-form-item prop="rpStartTime">
                                <el-date-picker v-model="addCarRescueForm.rpStartTime"
                                                type="date"
                                                placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <span>至</span>
                            <el-form-item prop="rpEndTime">
                                <el-date-picker v-model="addCarRescueForm.rpEndTime"
                                                type="date"
                                                placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-form-item>

                    </div>
                    <!---->
                    <h2 class="info-title">车辆保险信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="交强险保险品牌" prop="ctaliType">
                            <el-select v-model="addCarRescueForm.ctaliType" placeholder="请选择保险品牌">
                                <el-option
                                        v-for="item in ctaliTypes"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="交强险保险单号" prop="ctaliNo">
                            <el-input v-model="addCarRescueForm.ctaliNo"></el-input>
                        </el-form-item>
                        <el-form-item class="termOfValidity required_flag clear" label="交强险有效期">
                            <el-form-item prop="ctaliStartTime">
                                <el-date-picker
                                        v-model="addCarRescueForm.ctaliStartTime"
                                        type="date"
                                        format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <span>至</span>
                            <el-form-item prop="ctaliEndTime">
                                <el-date-picker
                                        v-model="addCarRescueForm.ctaliEndTime"
                                        type="date"
                                        format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="商业险保险品牌" prop="ciType">
                            <el-select v-model="addCarRescueForm.ciType" placeholder="请选择保险品牌">
                                <el-option
                                        v-for="item in ctaliTypes"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商业险保险单号" prop="ciNo">
                            <el-input v-model="addCarRescueForm.ciNo"></el-input>
                        </el-form-item>
                        <el-form-item class="termOfValidity required_flag clear" label="商业险有效期">
                            <el-form-item prop="ciStartTime">
                                <el-date-picker
                                        v-model="addCarRescueForm.ciStartTime"
                                        type="date"
                                        format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <span>至</span>
                            <el-form-item prop="ciEndTime">
                                <el-date-picker
                                        v-model="addCarRescueForm.ciEndTime"
                                        type="date"
                                        :formatter="this.common.formatterDate"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="保险单照片" prop="traffic_insurance_imageUrl">
                            <div class="upload_box">
                                <span class="tit_tit">交强险保险单</span>
                                <el-upload
                                        class="avatar-uploader"
                                        :action="action"
                                        name="traffic_insurance"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="updateSuccess"
                                        :before-upload="common.beforeAvatarUpload">
                                    <img v-if="addCarRescueForm.traffic_insurance_imageUrl"
                                         :src="addCarRescueForm.traffic_insurance_imageUrl"
                                         :imageType="addCarRescueForm.traffic_insurance_imageUrl_type"
                                         :imgName="addCarRescueForm.traffic_insurance_imageUrl_name" class="avatar">
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
                                        :on-success="updateSuccess"
                                        :before-upload="common.beforeAvatarUpload">
                                    <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                    <img v-if="addCarRescueForm.commercial_insurance_imageUrl"
                                         :src="addCarRescueForm.commercial_insurance_imageUrl"
                                         :imageType="addCarRescueForm.commercial_insurance_imageUrl_type"
                                         :imgName="addCarRescueForm.commercial_insurance_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg">&nbsp;</div>
                            </div>
                        </el-form-item>
                    </div>
                    <div class="import-bottom">
                        <el-button @click="closeAddCarRescue">取 消</el-button>
                        <el-button type="primary" @click="submitAddCarRescueForm">下一步</el-button>
                    </div>
                </el-form>
                <el-form v-if="activePop === 1" :model="checkInfoForm" :rules="checkInfoRules" ref="checkInfoForm"
                         label-width="122px" class="demo-ruleForm">
                    <p class="checkInfo-tip">已为您自动识别部分信息，请仔细核对并完善</p>
                    <div class="info-item clear">
                        <el-form-item label="车牌号码" prop="dlPlateNo">
                            <el-input v-model="checkInfoForm.dlPlateNo"></el-input>
                        </el-form-item>
                        <el-form-item label="车牌类型" prop="dlPlateType">
                            <el-select v-model="checkInfoForm.dlPlateType" placeholder="请选择">
                                <el-option :value=1 label="黄牌"></el-option>
                                <el-option :value=2 label="蓝牌"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所有人" prop="dlBelongUser">
                            <el-tooltip placement="bottom">
                                <div slot="content">
                                    所有人必须与企业名称一致
                                </div>
                                <el-input v-model="checkInfoForm.dlBelongUser"></el-input>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="使用性质" prop="dlUseNature">
                            <el-select v-model="checkInfoForm.dlUseNature" placeholder="请选择">
                                <el-option :value=1 label="货运"></el-option>
                                <el-option :value=2 label="营运"></el-option>
                                <el-option :value=3 label="非营运"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="车辆类型" prop="dlCarType">
                            <el-input v-model="checkInfoForm.dlCarType"></el-input>
                        </el-form-item>
                        <el-form-item label="车架号" prop="dlCarVin">
                            <el-input v-model="checkInfoForm.dlCarVin"></el-input>
                        </el-form-item>
                        <el-form-item label="品牌型号" prop="dlBrand">
                            <el-input v-model="checkInfoForm.dlBrand"></el-input>
                        </el-form-item>
                        <el-form-item label="注册日期" prop="dlRegisterTime">
                            <el-date-picker
                                    v-model="checkInfoForm.dlRegisterTime"
                                    type="date"
                                    :formatter="this.common.formatterDate"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="发动机号码" prop="dlEngineNo">
                            <el-input v-model="checkInfoForm.dlEngineNo"></el-input>
                        </el-form-item>
                        <el-form-item label="整备质量" prop="dlHostlingWeight">
                            <el-input v-model="checkInfoForm.dlHostlingWeight"></el-input>
                        </el-form-item>
                        <el-form-item label="发证日期" prop="dlIssueTime">
                            <el-date-picker
                                    v-model="checkInfoForm.dlIssueTime"
                                    type="date"
                                    :formatter="this.common.formatterDate"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="准牵引质量" prop="dlTractionWeight">
                            <el-input v-model="checkInfoForm.dlTractionWeight"></el-input>
                        </el-form-item>
                        <el-form-item label="核定载质量" prop="dlLoadWeight">
                            <el-input v-model="checkInfoForm.dlLoadWeight"></el-input>
                        </el-form-item>
                        <el-form-item label="外廓尺寸" prop="dlGabarite">
                            <el-input v-model="checkInfoForm.dlGabarite"></el-input>
                        </el-form-item>
                        <el-form-item label="强制报废日期止" prop="dlScrapEndTime">
                            <el-date-picker
                                    v-model="checkInfoForm.dlScrapEndTime"
                                    type="date"
                                    :formatter="this.common.formatterDate"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="检验有效期止" prop="dlCheckEndTime">
                            <el-date-picker
                                    v-model="checkInfoForm.dlCheckEndTime"
                                    type="date"
                                    :formatter="this.common.formatterDate"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="import-bottom">
                        <el-button @click="prevStep">上一步</el-button>
                        <el-button type="primary" @click="submitCheckInfoForm">确 定</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
        <SampleGraph :visible.sync="sampleImg" :sampleType="sampleType"></SampleGraph>
    </div>
</template>

<script>
    import SampleGraph from '../../SampleGraph'  //示例图
    export default {
        components:{
            'SampleGraph':SampleGraph
        },
        name: "AddCarRescueDialog",
        inject:["reload"],
        data() {
            let addWayRescueInfo = {};
            return {
                showStep:"添加车辆信息",
                showTitle:"添加车辆",
                showError:false,
                reason:'',
                sampleImg: false,
                sampleType:'',
                activePop: 0,
                car_front_45_imageUrl: '',   //车辆前45度
                car_front_45_imageUrl_type: '',
                car_front_45_imageUrl_name: '',
                driving_license_front_imageUrl: '',   //行驶证首页
                driving_license_front_imageUrl_type: '',
                driving_license_front_imageUrl_name: '',
                driving_license_second_imageUrl: '',   //行驶证副页
                driving_license_second_imageUrl_type: '',
                driving_license_second_imageUrl_name: '',
                driving_license_back_imageUrl: '',   //行驶证背页
                driving_license_back_imageUrl_type: '',
                driving_license_back_imageUrl_name: '',
                car_reg_cert_imageUrl: '', //机动车登记证书
                car_reg_cert_imageUrl_type: '',
                car_reg_cert_imageUrl_name: '',
                traffic_insurance_imageUrl: '', //交强险
                traffic_insurance_imageUrl_type: '',
                traffic_insurance_imageUrl_name: '',
                commercial_insurance_imageUrl: '', //商业险
                commercial_insurance_imageUrl_type: '',
                commercial_insurance_imageUrl_name: '',
                transport_license_imageUrl: '',
                transport_license_imageUrl_type: '',
                transport_license_imageUrl_name: '',

                addWayRescueInfo,
                addCarRescue: false, //添加车辆弹窗
                addCarRescueForm: {
                    horsepower: '',
                    kind: '',
                    length: '',
                    degree: '',
                    plateType: '',
                    gpsBrand: '',
                    dlPlateNo: '',
                    dlBelongUser: '',
                    dlPlateType: '',
                    ctaliType: '',
                    ctaliNo: '',
                    ctaliStartTime: '',
                    ctaliEndTime: '',
                    ciType: '',
                    ciNo: '',
                    ciStartTime: '',
                    ciEndTime: '',
                    rpOwnerName: '',
                    rpProId: '',
                    rpNo: '',
                    rpTime: '',
                    rpStartTime: '',
                    rpEndTime: ''
                },
                addCarRescueRules: {
                    horsepower: {required: true, message: '请输入正确的马力', trigger: 'blur',type: 'number'},
                    kind: {required: true, message: '此项不能为空', trigger: 'change'},
                    length: {required: true, message: '请输入正确的板长度', trigger: 'blur',type: 'number'},
                    degree: {required: true, message: '请输入正确的板度数', trigger: 'blur',type: 'number'},
                    plateType: {required: true, message: '此项不能为空', trigger: 'change'},
                    gpsBrand: {required: true, message: '此项不能为空', trigger: 'change'},
                    dlPlateNo: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlBelongUser: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlPlateType: {required: true, message: '此项不能为空', trigger: 'change'},
                    ctaliType: {required: true, message: '此项不能为空', trigger: 'change'},
                    ctaliNo: {required: true, message: '此项不能为空', trigger: 'blur'},
                    ctaliStartTime: {type: 'date', required: true, message: '请选择日期', trigger: 'change'},
                    ctaliEndTime: {type: 'date', required: true, message: '请选择日期', trigger: 'change'},
                    ciType: {required: true, message: '此项不能为空', trigger: 'change'},
                    ciNo: {required: true, message: '此项不能为空', trigger: 'blur'},
                    ciStartTime: {type: 'date', required: true, message: '请选择日期', trigger: 'change'},
                    ciEndTime: {type: 'date', required: true, message: '请选择日期', trigger: 'change'},

                    rpOwnerName: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlPlateNo: {required: true, message: '此项不能为空', trigger: 'blur'},
                    rpProId: {required: true, message: '此项不能为空', trigger: 'change'},
                    rpNo: {required: true, message: '此项不能为空', trigger: 'blur'},
                    rpTime: {type: 'date', required: true, message: '请选择日期', trigger: 'change'},
                    rpStartTime: {type: 'date', required: true, message: '请选择日期', trigger: 'change'},
                    rpEndTime: {type: 'date', required: true, message: '请选择日期', trigger: 'change'},
                    car_front_45_imageUrl : {required: true, message: '此项不能为空', trigger: 'blur'},
                    driving_license_front_imageUrl : {required: true,  trigger: 'blur',message: '此项不能为空'},
                    traffic_insurance_imageUrl : {required: true,  trigger: 'blur',message: '此项不能为空'},
                    transport_license_imageUrl : {required: true,  trigger: 'blur',message: '此项不能为空'},
                },
                action: this.common.CONSTANT.UPLOADIMGPATH + 'recognizeImage',
                checkInfo: false,  //核对并完善信息弹窗
                checkInfoForm: {
                    dlPlateNo: '',
                    dlPlateType: '',
                    dlBelongUser: '',
                    dlUseNature: '',
                    dlCarType: '',
                    dlCarVin: '',
                    dlBrand: '',
                    dlRegisterTime: '',
                    dlEngineNo: '',
                    dlHostlingWeight: '',
                    dlIssueTime: '',
                    dlTractionWeight: '',
                    dlLoadWeight: '',
                    dlGabarite: '',
                    dlScrapEndTime: '',
                    dlCheckEndTime: ''
                },
                checkInfoRules: {
                    dlPlateNo: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlPlateType: {required: true, message: '此项不能为空', trigger: 'change'},
                    dlBelongUser: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlUseNature: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlCarType: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlCarVin: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlBrand: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlRegisterTime: {type: 'date', required: true, message: '请选择日期', trigger: 'change'},
                    dlEngineNo: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlHostlingWeight: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlIssueTime: {type: 'date', required: true, message: '请选择日期', trigger: 'change'},
                    dlTractionWeight: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlLoadWeight: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlGabarite: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlScrapEndTime: {type: 'date', required: true, message: '请选择日期', trigger: 'change'},
                    dlCheckEndTime: {type: 'date', required: true, message: '请选择日期', trigger: 'change'},
                },
                imgObjectList: [],  //图片缓存
                provinceOption: [],
            }
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            carRescuePkId: {
                type: String,
                default: ""
            },
            ctaliTypes:{
                default:[]
            }

        },
        created: function () {
            let company = this.common.fetchData("company");
            this.companyId = company['pkId'];
            this.common.initProvince(this, ["provinceOption"]);
        },
        methods: {
            //添加车辆上一步操作
            prevStep() {
                this.activePop = 0;
            },

            requestUpload(obj) {
                let that = this;
                obj.companyId = that.companyId;
                this.common.uploadImgFun(obj, this);
            },
            handleAvatarSuccess(res, file) {
                let that = this;
                let data = JSON.parse(res.data);
                //console.log("data-->"+data);
                let imageType = data['resultData']['imageType'];
                let imageTypeValue = data['resultData']['imageTypeValue'];
                let filePath = data['resultData']['filePath'];
                let imageUrl = imageType + "_imageUrl";
                let imageUrlType = imageUrl + "_type";
                let imageUrlName = imageUrl + "_name";
                let driverForm = {};
                driverForm[imageUrl] = filePath;
                driverForm[imageUrlType] = imageTypeValue;
                driverForm[imageUrlName] = file.name;
                that.addCarRescueForm = Object.assign({}, that.addCarRescueForm, driverForm);

            },
            updateSuccess(response, file) {
                let that = this;
                let data = JSON.parse(response.data);
                let imageType = data['resultData']['imageType'];
                let imageTypeValue = data['resultData']['imageTypeValue'];
                let filePath = data['resultData']['filePath'];
                let imageUrl = imageType + "_imageUrl";
                let imageUrlType = imageUrl + "_type";
                let imageUrlName = imageUrl + "_name";
                let uploadForm = {};
                uploadForm[imageUrl] = filePath;
                uploadForm[imageUrlType] = imageTypeValue;
                uploadForm[imageUrlName] = file.name;
                that.addCarRescueForm = Object.assign({}, that.addCarRescueForm, uploadForm);
                let attrs = data['resultData']['attrs']; //ocr识别结果
                if (attrs) {
                    if ("driving_license_front" === imageType) { //行驶证正面
                        this.addCarRescueForm.dlPlateNo = attrs['vehiclePlateNumber'] == null ? '' : attrs['vehiclePlateNumber'];          // 车牌号码
                        this.addCarRescueForm.dlCarType = attrs['vehicleType'] == null ? '' : attrs['vehicleType'];                 // 车辆类型
                        this.addCarRescueForm.dlOwner = attrs['vehicleOwner'] == null ? '' : attrs['vehicleOwner'];                  // 所有人
                        let useNature = attrs['vehicleUseCharacter'];
                        let dlUseNature = 0;
                        if (useNature == '货运') {
                            dlUseNature = 1;
                        } else if (useNature == '营运') {
                            dlUseNature = 2;
                        } else if (useNature == '非营运') {
                            dlUseNature = 3;
                        }
                        this.addCarRescueForm.dlUseNature = dlUseNature;       // 使用性质
                        this.addCarRescueForm.dlBrand = attrs['vehicleModel'] == null ? '' : attrs['vehicleModel'];                  // 品牌型号
                        this.addCarRescueForm.dlEngineNo = attrs['vehicleEngineNumber'] == null ? '' : attrs['vehicleEngineNumber'];        // 发动机号码
                        this.addCarRescueForm.dlCarVin = attrs['vehicleVinNumber'] == null ? '' : attrs['vehicleVinNumber'];             // 车架号
                        this.addCarRescueForm.dlRegisterTime = attrs['vehicleRegisterDate'] == null ? '' : attrs['vehicleRegisterDate'];    // 注册日期
                        this.addCarRescueForm.dlIssueTime = attrs['vehicleIssueDate'] == null ? '' : attrs['vehicleIssueDate'];          // 发证日期
                    } else if ("driving_license_second" === imageType) {//行驶证背面
                        //vehicleEffectiveUntil: "检验有效期至2018年10月黑A(8)柴油"
                        //vehicleNote: "强制报废期止:2032-10-17"

                        this.addCarRescueForm.dlHostlingWeight = attrs['vehicleCurbWeight'] == null ? '' : attrs['vehicleCurbWeight'];                // 整备质量
                        let vehicleEffectiveUntil = attrs['vehicleEffectiveUntil'] == null ? '' : attrs['vehicleEffectiveUntil'];
                        this.addCarRescueForm.dlCheckEndTime = '';
                        if (vehicleEffectiveUntil) {
                            if (Number(vehicleEffectiveUntil)) {
                                this.addCarRescueForm.dlCheckEndTime = vehicleEffectiveUntil+ "01";
                            } else {
                                if (vehicleEffectiveUntil.indexOf('检验有效期') != -1) {
                                    let year = vehicleEffectiveUntil.substring(vehicleEffectiveUntil.indexOf('至')+1,vehicleEffectiveUntil.indexOf('年'));
                                    let month = vehicleEffectiveUntil.substring(vehicleEffectiveUntil.indexOf('年')+1,vehicleEffectiveUntil.indexOf('月'));
                                    this.addCarRescueForm.dlCheckEndTime = year+"-"+month + "-01";             // 检验有效期止
                                }
                            }
                        }
                        this.addCarRescueForm.dlScrapEndTime = '';
                        let vehicleNote = attrs['vehicleNote'] == null ? '' : attrs['vehicleNote'];
                        if (vehicleNote) {
                            if (Number(vehicleNote)) {
                                this.addCarRescueForm.dlScrapEndTime = vehicleNote;
                            } else {
                                if (vehicleNote.indexOf("强制报废期止") != -1) {
                                    let date = vehicleNote.substring(vehicleNote.indexOf("止")+2);
                                    this.addCarRescueForm.dlScrapEndTime = date;                                // 强制报废日期止
                                }
                            }

                        }
                        this.addCarRescueForm.dlLoadWeight = attrs['vehicleLoadrWeight'] == null ? '' : attrs['vehicleLoadrWeight'];                   // 核定载质量
                        this.addCarRescueForm.dlGabarite = attrs['vehicleOutSize'] == null ? '' : attrs['vehicleOutSize'];                         // 外廓尺寸
                        this.addCarRescueForm.dlTractionWeight = attrs['vehicleTowWeight'] == null ? '' : attrs['vehicleTowWeight'];                 // 准牵引质量
                    }
                }
                console.log(attrs,"this.addCarRescueForm",this.addCarRescueForm);

            },
            //获取添加的图片信息
            getAddCarRescueImgs: function (formObj, imgObjList) {
                let companyImgList = [];
                let that = this;
                let imgTypes = ["car_front_45", "driving_license_front", "driving_license_second",
                    "driving_license_back", "car_reg_cert", "traffic_insurance", "commercial_insurance","transport_license"];
                imgTypes.forEach(function (key, index) {
                    //console.log(key, index);
                    //console.log(formObj[key+'_imageUrl']);
                    if (formObj[key + '_imageUrl']) { //图片url
                        companyImgList.push(
                            {
                                pkId: that.findImagePkId(imgObjList, formObj[key + '_imageUrl']),
                                imageName: formObj[key + '_imageUrl_name'],
                                imagePath: formObj[key + '_imageUrl'],
                                type: formObj[key + '_imageUrl_type'],
                                //imageStatus: 0,
                                imageMark: key
                            }
                        )
                    }
                });
                return companyImgList;
            },
            //查找图片的主键id
            findImagePkId(driverData, imageUrl) {
                let pkId = '';
                let that = this;
                if (driverData) {
                    let data = driverData.find(t =>
                        imageUrl.indexOf(t.imagePath) != -1
                    );
                    if (data) {
                        pkId = data.pkId;
                    }

                }

                return pkId;
            },
            //添加车辆取消操作
            closeAddCarRescue() {
                this.activePop = 0;

                this.addCarRescueForm = {};
                this.checkInfoForm = {};
                this.imgObjectList = [];

                let refAddCarRescueForm = this.$refs['addCarRescueForm'];
                if (refAddCarRescueForm) {
                    refAddCarRescueForm.resetFields();
                    refAddCarRescueForm.clearValidate();
                }
                let refCheckInfoForm = this.$refs['checkInfoForm'];
                if (refCheckInfoForm) {
                    refCheckInfoForm.resetFields();
                    refCheckInfoForm.clearValidate();
                }
                this.$emit('update:visible', false);
                if(this.$parent.searchRescueData){
                    this.$parent.searchRescueData();
                }
                this.reload();
            },
            // 添加车辆跳下一步验证操作
            submitAddCarRescueForm() {
                if(this.addCarRescueForm.ciStartTime > this.addCarRescueForm.ciEndTime){
                    this.$message.error('商业险有效期不正确');
                    return;
                }
                if(this.addCarRescueForm.ctaliStartTime > this.addCarRescueForm.ctaliEndTime){
                    this.$message.error('交强险有效期不正确');
                    return;
                }
                if(this.addCarRescueForm.rpStartTime > this.addCarRescueForm.rpEndTime){
                    this.$message.error('运输许可证有效期不正确');
                    return;
                }
                let that = this;
                this.$refs.addCarRescueForm.validate((valid) => {
                    if (valid) {
                        if(!that.addCarRescueForm.driving_license_front_imageUrl){
                            that.$message.error("请上传行驶首页!");return;
                        }else if(!that.addCarRescueForm.driving_license_second_imageUrl){
                            that.$message.error("请上传行驶副页!");return;
                        }else if(!that.addCarRescueForm.driving_license_back_imageUrl){
                            that.$message.error("请上传行驶证背面!");return;
                        }else if(!that.addCarRescueForm.commercial_insurance_imageUrl){
                            that.$message.error("请上传商业险保险单!");return;
                        }
                        this.$refs['addCarRescueForm'].clearValidate();//清空校验

                        var params = {};
                        var form = that.addCarRescueForm;
                        var ltdCarRescue = {};
                        ltdCarRescue.horsepower = form.horsepower;
                        ltdCarRescue.pkId = form.pkId;
                        ltdCarRescue.kind = form.kind;
                        ltdCarRescue.length = form.length;
                        ltdCarRescue.degree = form.degree;
                        ltdCarRescue.plateType = form.plateType;
                        ltdCarRescue.gpsBrand = form.gpsBrand;
                        ltdCarRescue.dlPlateNo = form.dlPlateNo;
                        ltdCarRescue.dlBelongUser = form.dlBelongUser;
                        ltdCarRescue.dlPlateType = form.dlPlateType;
                        ltdCarRescue.ctaliType = form.ctaliType;
                        ltdCarRescue.ctaliNo = form.ctaliNo;
                        ltdCarRescue.ctaliStartTime = form.ctaliStartTime;
                        ltdCarRescue.ctaliEndTime = form.ctaliEndTime;
                        ltdCarRescue.ciType = form.ciType;
                        ltdCarRescue.ciNo = form.ciNo;
                        ltdCarRescue.ciStartTime = form.ciStartTime;
                        ltdCarRescue.ciEndTime = form.ciEndTime;
                        ltdCarRescue.rpOwnerName = form.rpOwnerName;
                        ltdCarRescue.rpProId = form.rpProId;
                        ltdCarRescue.rpProName = this.common.getProvinceName(this,form.rpProId,this.provinceOption);
                        ltdCarRescue.rpNo = form.rpNo;
                        ltdCarRescue.rpTime = form.rpTime;
                        ltdCarRescue.rpStartTime = form.rpStartTime;
                        ltdCarRescue.rpEndTime = form.rpEndTime;
                        ltdCarRescue.companyId = that.companyId;
                        //行驶证正面
                        ltdCarRescue.dlCarType=form.dlCarType;          //车辆类型
                        ltdCarRescue.dlUseNature = form.dlUseNature;       // 使用性质
                        ltdCarRescue.dlBrand = form.dlBrand;                  // 品牌型号
                        ltdCarRescue.dlEngineNo = form.dlEngineNo;        // 发动机号码
                        ltdCarRescue.dlCarVin = form.dlCarVin;             // 车架号
                        ltdCarRescue.dlRegisterTime = form.dlRegisterTime;    // 注册日期
                        ltdCarRescue.dlIssueTime = form.dlIssueTime;          // 发证日期
                         //行驶证背面
                        ltdCarRescue.dlHostlingWeight = form.dlHostlingWeight;             // 整备质量
                        ltdCarRescue.dlCheckEndTime = form.dlCheckEndTime;                 // 检验有效期止
                        ltdCarRescue.dlLoadWeight = form.dlLoadWeight;                     // 核定载质量
                        ltdCarRescue.dlScrapEndTime = form.dlScrapEndTime;                 // 强制报废日期止
                        ltdCarRescue.dlGabarite = form.dlGabarite;                         // 外廓尺寸
                        ltdCarRescue.dlTractionWeight = form.dlTractionWeight;
                        ltdCarRescue.verifyStatus=0;
                        ltdCarRescue.procId ='';
                        ltdCarRescue.procStatus=0;
                        ltdCarRescue.procLevel=0;
                        ltdCarRescue.procLevelDepict='';


                        params.submitType = 1; //1次提交
                        let companyImgList = that.getAddCarRescueImgs(that.addCarRescueForm, that.imgObjectList);
                        params.companyImgList = companyImgList;
                        params.ltdCarRescue = ltdCarRescue;
                        var data = {
                            data: JSON.stringify(params)
                        };
                        // console.log("====="+JSON.stringify(that.addCarRescueForm));
                        that.$post("ltdCarRescue/updateCarInfo", data).then((response) => {
                            var data = response.response;
                            if (response.code == 0) {
                                that.$message.error(response.msg);
                            } else {
                                var errTypes = {2: "车辆信息", 3: "交强险保险单号", 4: "商业险保险单号"};
                                if (response && errTypes[response.code]) {
                                    var errMsg = "当前添加msg已存在，无法需重复添加".replace("msg", errTypes[response.code]);
                                    that.$message.error(errMsg);
                                    return;
                                } else if (response.code == 1) {
                                    //that.$message.info(response.msg);
                                    var dbRescue = data.ltdCarRescue;
                                    that.pottingCheckInfoForm(dbRescue);
                                    that.addCarRescueForm.pkId = dbRescue.pkId;
                                    that.imgObjectList = data.companyImgList;
                                    that.activePop = 1;
                                } else {
                                    that.$message.error(response.msg);
                                }

                            }
                        }).catch(() => {
                            that.$message.error('消息保存失败');
                        });

                    } else {
                        console.log('valid error submit!!');
                        return false;
                    }
                });

            },
            pottingCheckInfoForm(srcData) {  //填充确认框值
                let checkInfoForm = {
                    dlPlateNo :srcData.dlPlateNo,
                    dlPlateType :srcData.dlPlateType,
                    dlBelongUser :srcData.dlBelongUser,
                    dlUseNature :srcData.dlUseNature,
                    dlCarType :srcData.dlCarType,
                    dlCarVin :srcData.dlCarVin,
                    dlBrand :srcData.dlBrand,
                    dlRegisterTime :srcData.dlRegisterTime,
                    dlHostlingWeight :srcData.dlHostlingWeight,
                    dlEngineNo :srcData.dlEngineNo,
                    dlIssueTime :srcData.dlIssueTime,
                    dlTractionWeight :srcData.dlTractionWeight, //准牵引质量
                    dlLoadWeight :srcData.dlLoadWeight,
                    dlGabarite :srcData.dlGabarite,
                    dlScrapEndTime :srcData.dlScrapEndTime,
                    dlCheckEndTime :srcData.dlCheckEndTime
                }
                this.checkInfoForm = checkInfoForm;
            },
            submitCheckInfoForm() {
                let that = this;
                this.$refs.checkInfoForm.validate((valid) => {
                    if (valid) {
                        this.addCarRescue = false; //关闭弹窗
                       // console.log("checkInfoForm-->" + that.checkInfoForm)
                        let params = {};
                        var form = that.addCarRescueForm;
                        let company = that.common.fetchData("company");
                        var ltdCarRescue = {};
                        ltdCarRescue.pkId = form.pkId;
                        ltdCarRescue.dlPlateNo = that.checkInfoForm.dlPlateNo; //车牌号
                        ltdCarRescue.dlPlateType = that.checkInfoForm.dlPlateType; //车牌类型
                        ltdCarRescue.dlBelongUser = that.checkInfoForm.dlBelongUser; //所有人
                        ltdCarRescue.dlUseNature = that.checkInfoForm.dlUseNature; //使用性质
                        ltdCarRescue.dlCarType = that.checkInfoForm.dlCarType; //车辆类型
                        ltdCarRescue.dlCarVin = that.checkInfoForm.dlCarVin; //车架号
                        ltdCarRescue.dlBrand = that.checkInfoForm.dlBrand; //品牌
                        ltdCarRescue.dlRegisterTime = that.checkInfoForm.dlRegisterTime; //注册时间
                        ltdCarRescue.dlEngineNo = that.checkInfoForm.dlEngineNo; //发动机号码
                        ltdCarRescue.dlHostlingWeight = that.checkInfoForm.dlHostlingWeight; // 整备质量
                        ltdCarRescue.dlIssueTime = that.checkInfoForm.dlIssueTime; //行驶证发证时间
                        ltdCarRescue.dlTractionWeight=that.checkInfoForm.dlTractionWeight; //准牵引质量
                        ltdCarRescue.dlLoadWeight = that.checkInfoForm.dlLoadWeight; //核定载质量
                        ltdCarRescue.dlGabarite = that.checkInfoForm.dlGabarite;//外廓尺寸
                        ltdCarRescue.dlScrapEndTime = that.checkInfoForm.dlScrapEndTime; //校验有效期
                        ltdCarRescue.dlCheckEndTime = that.checkInfoForm.dlCheckEndTime; //强制报废期
                        ltdCarRescue.verifyStatus=3;
                        ltdCarRescue.procId ='';
                        ltdCarRescue.procStatus=0;
                        ltdCarRescue.procLevel=0;
                        ltdCarRescue.procLevelDepict='';
                        ltdCarRescue.companyId=company['pkId'];
                        params.ltdCarRescue = ltdCarRescue;
                        params.submitType = 2; //2次提交
                        var data = {
                            data: JSON.stringify(params)
                        }
                        that.$post("ltdCarRescue/updateCarInfo", data).then((response) => {
                            var data = response.response;
                            if (response.code == 0) {
                                that.$message.error(response.msg);
                            } else {
                                var errTypes = {2: "车辆信息", 3: "交强险保险单号", 4: "商业险保险单号"};
                                if (errTypes[response.code]) {
                                    var errMsg = "当前添加msg已存在，无法需重复添加".replace("msg", errTypes[response.code]);
                                    that.$message.error(errMsg);
                                } else if (response.code == 1) {
                                    that.$message.info(response.msg);
                                    that.reload();
                                } else {
                                    that.$message.error(response.msg);
                                }

                            }

                        }).catch(() => {
                            that.$message.error('消息保存失败');
                        });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },

            /**
             *
             * @param form 赋值form
             * @param imgDataList 图片集合
             * @param imgPrefix 图片前缀
             */
            pottingRescueImgs(form, imgDataList, imgPrefix) { //把后台返回图片组装
                if (imgDataList && imgDataList.length > 0) {
                    imgDataList.forEach(item => {
                        let filePath = imgPrefix + "/" + item.imagePath;
                        let srcPath = item.imageMark + "_imageUrl";
                        let imageType = srcPath + "_type";
                        let imgName = srcPath + "_name";
                        form[srcPath] = filePath;
                        form[imageType] = item.type;
                        form[imgName] = item.imageName;
                    });
                }
            }
        },
        mounted() {
            var _this = this;
            window.onresize = function () { // 定义窗口大小变更通知事件
                _this.screenHeight = document.documentElement.clientHeight // 窗口高度
            }
        },
        watch: {
            carRescuePkId: function () {
                this.showTitle="编辑车辆";
                this.showStep="编辑车辆信息";
                let that = this;
                let company = this.common.fetchData("company");
                this.companyId = company['pkId'];
                that.$post("ltdCarRescue/queryCarRescue", {pkId: that.carRescuePkId, companyId: that.companyId}).then((response) => {
                    let respData = response.response;
                    if (response.code == 0) {
                        that.$message.error(response.msg);
                    } else {

                        let dbRescue = respData.ltdCarRescue;
                        that.addCarRescueForm = dbRescue;
                        that.addCarRescueForm.rpProId=Number(dbRescue.rpProId);
                        that.addCarRescueForm.pkId = dbRescue['pkId'];
                        that.imgObjectList = respData.companyImgList;
                        that.pottingRescueImgs(that.addCarRescueForm, that.imgObjectList, respData.imgPrefix);
                        that.addCarRescue = true; //打开弹出窗口
                        that.activePop = 0;
                        if(respData.ltdCarRescue.verifyStatus ==2){
                            this.showError=true;
                            this.reason = respData.ltdCarRescue.verifyReason;
                        }else {
                            this.showError =false;
                        }

                    }

                }).catch(() => {
                    that.$message.error('获取车辆信息失败');
                    that.addCarRescue = true; //打开弹出窗口
                    that.activePop = 0;

                });

            }
        }
    }
</script>

<style scoped>

</style>
