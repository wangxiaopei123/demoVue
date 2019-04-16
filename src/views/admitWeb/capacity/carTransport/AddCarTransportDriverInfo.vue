<template>
    <div class="case">
        <Header></Header>
        <div class="content">
            <div class="content-in" :style="{height:((screenHeight-64-60-12-16)>690)?((screenHeight-64-60-12-16)+'px'):(690+'px')}">
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
                        <div class="manage-tip-txt">为保证贵公司轿运业务的正常运转，添加司机后，请及时的与车辆进行关联匹配，感谢您配合。</div>
                    </div>
                    <div class="car-way no-choice-box">
                        <div class="car-way-btn">
                            <el-button @click="openUpload">批量导入</el-button>
                            <el-button @click="openAdd" type="primary">添加司机</el-button>
                        </div>
                        <div class="car-tabs">
                            <!--暂无司机信息显示，默认car-way-nothing是隐藏的car-way-nothing里面的table只做显示用，有数据显示就执行下面的table-->
                            <div class="car-way-nothing" v-if="!tableData.length">
                                <div class="car-way-no">
                                    <i class="el-icon-warning"></i>
                                    <span>暂无司机信息，请先导入或添加司机信息</span>
                                </div>
                                <!--<el-table
                                        border
                                        style="width: 100%;">
                                    <el-table-column
                                            width="60px"
                                            label="序号">
                                    </el-table-column>
                                    <el-table-column
                                            label="姓名">
                                    </el-table-column>
                                    <el-table-column
                                            label="身份证号">
                                    </el-table-column>
                                    <el-table-column
                                            label="联系电话">
                                    </el-table-column>
                                    <el-table-column
                                            label="主驾车辆">
                                    </el-table-column>
                                    <el-table-column
                                            label="副驾车辆">
                                    </el-table-column>
                                    <el-table-column
                                            label="驾驶证号">
                                    </el-table-column>
                                    <el-table-column
                                            width="120px"
                                            label="从业资格证号">
                                    </el-table-column>
                                    <el-table-column
                                            label="创建时间">
                                    </el-table-column>
                                    <el-table-column
                                            label="操作">
                                    </el-table-column>
                                </el-table>-->
                            </div>

                            <!--有数据显示的时候-->
                            <div class="car-way-table">
                                <el-table
                                        :data="tableData"
                                        border
                                        style="width: 100%">
                                    <el-table-column
                                            prop="orderNumber"
                                            label="序号"
                                            width="60">
                                        <template slot-scope="scope">
                                            <span>{{scope.$index+1}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="userName"
                                            label="姓名"
                                            width="120">
                                        <template slot-scope="scope">
                                            <span @click="carDetailsInfoShow(scope.row.pkId)" class="car-way-blue">{{scope.row.userName}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="idCard"
                                            label="身份证号"
                                            width="200">
                                    </el-table-column>
                                    <el-table-column
                                            prop="phone"
                                            label="联系电话"
                                            width="150">
                                    </el-table-column>
                                    <el-table-column
                                            prop="mainCarNo"
                                            label="主驾车辆"
                                            width="150">
                                    </el-table-column>
                                    <el-table-column
                                            prop="deputyCarNo"
                                            label="副驾车辆"
                                            width="150">
                                    </el-table-column>
                                    <el-table-column
                                            prop="dlNo"
                                            label="驾驶证号"
                                            width="200">
                                        <template slot-scope="scope">
                                            <span @click="dlDetailsInfoShow(scope.row.pkId)" class="car-way-blue">{{scope.row.dlNo}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="qcNo"
                                            label="从业资格证号"
                                            width="150">
                                        <template slot-scope="scope">
                                            <a @click="qcDetailsInfoShow(scope.row.pkId)" class="car-way-blue"
                                               href="javascript:;">{{scope.row.qcNo}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="createTime"
                                            label="创建时间"
                                            :formatter="this.common.formatterDateTime"
                                            width="170">
                                    </el-table-column>
                                    <el-table-column fixed="right" label="操作" width="220">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" v-if="scope.row.isUpPic==0"
                                                       @click="uploadPapersFun(scope.row.pkId,scope.row.driverType)">
                                                上传证件
                                            </el-button>
                                            <el-button type="text" size="small" v-if="scope.row.isUpPic==1"
                                                       @click="updateInfoFun(scope.row.pkId)">编辑
                                            </el-button>
                                            <el-button type="text" size="small"
                                                       @click="delConfir(scope.row.pkId,scope.row.driverType)">删除
                                            </el-button>
                                            <el-button type="text" size="small" v-if="scope.row.isBindCar==0"
                                                       @click="changeCarFun(scope.row.pkId, scope.row.driverType,0,0)">
                                                关联车辆
                                            </el-button>
                                            <el-button type="text" size="small" v-if="scope.row.isBindCar==1"
                                                       @click="changeCarFun(scope.row.pkId, scope.row.driverType,1,1)">
                                                更换车辆
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div class="car-way-page-btn">
                                <el-button @click="topPag()">上一步</el-button>
                                <el-button @click="nextAuth()" type="primary">下一步</el-button>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </div>


        <!--司机信息批量导入弹窗-->
        <el-dialog class="capacity-pop capacity-line" title="司机信息批量导入" :visible.sync="bulkImport" width="40%" center>
            <div class="capacity-pop-in">
                <el-form :model="bulkImportRulesForm" :rules="bulkImportRules" ref="bulkImportRulesForm" label-width="80px" class="demo-ruleForm import-box">
                    <el-form-item label="模板下载">
                        <el-button size="small" @click="downLoad" type="primary" ><i class="import-icon el-icon-download"></i>下载批量导入模板</el-button>
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
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload()"><i class="import-icon el-icon-upload"></i>上传</el-button>
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

        <!--添加车头弹窗-->
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" title="添加司机" :visible.sync="addHeadstock" width="74.2%" center>
            <div class="capacity-pop-in">
                <div class="steps steps-step">
                    <el-steps :active="activePop" finish-status="success" process-status="finish" align-center>
                        <el-step title="添加司机信息"></el-step>
                        <el-step title="核对并完善信息"></el-step>
                        <el-step title="添加成功"></el-step>
                    </el-steps>
                </div>
                <el-form :model="driverForm" :rules="rules" ref="driverForm" label-width="130px" class="demo-ruleForm">
                    <h2 class="info-title">基本信息</h2>
                    <input type="hidden" id="driverName"/>
                    <input type="hidden" id="driverIdCardNo"/>
                    <div class="info-item clear">
                        <el-form-item label="身份证号" prop="idCard">
                            <el-input v-model="driverForm.idCard"></el-input>
                        </el-form-item>
                        <el-form-item label="司机类型" prop="driverType" class="required_flag">
                            <el-radio-group v-model="driverForm.driverType">
                                <el-radio :label="1" @change="showReq">大板司机</el-radio>
                                <el-radio :label="2" @change="showReq">小板司机</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="司机身份证" prop="driver_id_card_front_imageUrl" class="required_flag">
                            <div class="upload_box">
                                <span class="tit_tit">个人信息页</span>
                                <el-upload
                                        class="avatar-uploader"
                                        name="driver_id_card_front"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <!--图片验证 :before-upload="beforeAvatarUpload" -->
                                    <img v-if="driverForm.driver_id_card_front_imageUrl"
                                         :src="driverForm.driver_id_card_front_imageUrl"
                                         :imageType="driverForm.driver_id_card_front_imageUrl_type"
                                         :imgName="driverForm.driver_id_card_front_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '6'">查看示例</div>
                            </div>
                            <div class="upload_box">
                                <span class="tit_tit">国徽页</span>
                                <el-upload
                                        class="avatar-uploader"
                                        name="driver_id_card_back"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <!--图片验证 :before-upload="beforeAvatarUpload" -->
                                    <img v-if="driverForm.driver_id_card_back_imageUrl"
                                         :src="driverForm.driver_id_card_back_imageUrl"
                                         :imageType="driverForm.driver_id_card_back_imageUrl_type"
                                         :imgName="driverForm.driver_id_card_back_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '7'">查看示例</div>
                            </div>
                            <div class="upload_box">
                                <span class="tit_tit">手持身份证</span>
                                <el-upload
                                        class="avatar-uploader"
                                        name="driver_hand"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <!--图片验证 :before-upload="beforeAvatarUpload" -->
                                    <img v-if="driverForm.driver_hand_imageUrl" :src="driverForm.driver_hand_imageUrl"
                                         :imageType="driverForm.driver_hand_imageUrl_type"
                                         :imgName="driverForm.driver_hand_imageUrl_name"
                                         class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '8'">查看示例</div>
                            </div>
                        </el-form-item>
                    </div>
                    <h2 class="info-title">驾驶证信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="驾驶证照" prop="driver_licence_1st_imageUrl" class="required_flag">
                            <div class="upload_box">
                                <span class="tit_tit">驾驶证首页</span>
                                <el-upload
                                        class="avatar-uploader"
                                        name="driver_licence_1st"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <!--图片验证 :before-upload="beforeAvatarUpload" -->
                                    <img v-if="driverForm.driver_licence_1st_imageUrl"
                                         :src="driverForm.driver_licence_1st_imageUrl"
                                         :imageType="driverForm.driver_licence_1st_imageUrl_type"
                                         :imgName="driverForm.driver_licence_1st_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '9'">查看示例</div>
                            </div>
                            <div class="upload_box">
                                <span class="tit_tit">驾驶证副页</span>
                                <el-upload
                                        class="avatar-uploader"
                                        name="driver_licence_2nd"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <!--图片验证 :before-upload="beforeAvatarUpload" -->
                                    <img v-if="driverForm.driver_licence_2nd_imageUrl"
                                         :src="driverForm.driver_licence_2nd_imageUrl"
                                         :imageType="driverForm.driver_licence_2nd_imageUrl_type"
                                         :imgName="driverForm.driver_licence_2nd_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '10'">查看示例</div>
                            </div>
                            <!--<div class="upload_box">
                                <div class="check_eg" @click="img1 = true">查看示例</div>
                            </div>-->
                        </el-form-item>
                        <el-form-item label="驾驶证号" prop="dlNo">
                            <el-input v-model="driverForm.dlNo"></el-input>
                        </el-form-item>
                    </div>
                    <h2 class="info-title">从业资格证信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="从业资格证号" prop="qcNo" :rules="this.driverForm.driverType!=2?rules.qcNo:[{ required: false, message: '请填写审核备注', trigger: 'blur' }]">
                            <el-input v-model="driverForm.qcNo"></el-input>
                        </el-form-item>
                        <el-form-item label="从业资格类别" prop="qcType" :rules="this.driverForm.driverType!=2?rules.qcType:[{ required: false, message: '请填写审核备注', trigger: 'blur' }]">
                            <el-input v-model="driverForm.qcType"></el-input>
                        </el-form-item>
                        <el-form-item label="初次领证日期" prop="qcFirstTime" :rules="this.driverForm.driverType!=2?rules.qcFirstTime:[{ required: false, message: '请填写审核备注', trigger: 'blur' }]">
                            <el-date-picker
                                    v-model="driverForm.qcFirstTime"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item class="termOfValidity" label="有效期" prop="qcEndTime" :rules="this.driverForm.driverType!=2?rules.qcEndTime:[{ required: false, message: '请填写审核备注', trigger: 'blur' }]">
                            <el-form-item>
                            <el-date-picker
                                    v-model="driverForm.qcStartTime"
                                    prop="qcStartTime"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                            </el-form-item>
                            <span>至</span>
                            <el-form-item>
                            <el-date-picker
                                    v-model="driverForm.qcEndTime"
                                    prop="qcEndTime"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <div id="qcReq">
                        <el-form-item label="从业资格证照" class="required_flag" prop="driver_qc_card_imageUrl">
                            <div class="upload_box">
                                <el-upload
                                        class="avatar-uploader"
                                        name="driver_qc_card"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <!--图片验证 :before-upload="beforeAvatarUpload" -->
                                    <img v-if="driverForm.driver_qc_card_imageUrl" :src="driverForm.driver_qc_card_imageUrl"
                                         :imageType="driverForm.driver_qc_card_imageUrl_type"
                                         :imgName="driverForm.driver_qc_card_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '11'">查看示例</div>
                            </div>
                        </el-form-item>
                        </div>
                    </div>
                </el-form>

                <div class="import-bottom">
                    <el-button @click="cancelAdd">取 消</el-button>
                    <el-button type="primary" @click="submitForm">下一步</el-button>
                </div>
            </div>
        </el-dialog>

        <el-dialog class="capacity-pop capacity-line capacity-pop-big" title="编辑司机" :visible.sync="updateStock" width="74.2%" center>
            <div class="capacity-pop-in info-case" style="padding: 0;">
                <div class="steps steps-step">
                    <el-steps :active="activePop" finish-status="success" process-status="finish" align-center>
                        <el-step title="编辑司机信息"></el-step>
                        <el-step title="核对并完善信息"></el-step>
                        <el-step title="添加成功"></el-step>
                    </el-steps>
                </div>
                <el-form :model="updateForm" :rules="updateRules" ref="updateForm" label-width="130px" class="demo-ruleForm">
                    <h2 class="info-title">基本信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="身份证号" prop="idCard">
                            <el-input v-model="updateForm.idCard"></el-input>
                        </el-form-item>
                        <el-form-item class="required_flag" label="司机类型" prop="driverType">
                            <el-radio-group v-model="updateForm.driverType">
                                <el-radio :label="1" @change="upShowReq">大板司机</el-radio>
                                <el-radio :label="2" @change="upShowReq">小板司机</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item class="required_flag" label="司机身份证" prop="driver_id_card_front_imageUrl">
                            <div class="upload_box">
                                <span class="tit_tit">个人信息页</span>
                                <el-upload
                                        class="avatar-uploader"
                                        name="driver_id_card_front"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="updateSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <!--图片验证 :before-upload="beforeAvatarUpload" -->
                                    <img v-if="updateForm.driver_id_card_front_imageUrl"
                                         :src="updateForm.driver_id_card_front_imageUrl"
                                         :imageType="updateForm.driver_id_card_front_imageUrl_type"
                                         :imgName="updateForm.driver_id_card_front_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '6'">查看示例</div>
                            </div>
                            <div class="upload_box">
                                <span class="tit_tit">国徽页</span>
                                <el-upload
                                        class="avatar-uploader"
                                        name="driver_id_card_back"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="updateSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <!--图片验证 :before-upload="beforeAvatarUpload" -->
                                    <img v-if="updateForm.driver_id_card_back_imageUrl"
                                         :src="updateForm.driver_id_card_back_imageUrl"
                                         :imageType="updateForm.driver_id_card_back_imageUrl_type"
                                         :imgName="updateForm.driver_id_card_back_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '7'">查看示例</div>
                            </div>
                            <div class="upload_box">
                                <span class="tit_tit">手持身份证</span>
                                <el-upload
                                        class="avatar-uploader"
                                        name="driver_hand"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="updateSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <!--图片验证 :before-upload="beforeAvatarUpload" -->
                                    <img v-if="updateForm.driver_hand_imageUrl" :src="updateForm.driver_hand_imageUrl"
                                         :imageType="updateForm.driver_hand_imageUrl_type"
                                         :imgName="updateForm.driver_hand_imageUrl_name"
                                         class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '8'">查看示例</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="联系地址" class="address" prop="cityId">
                            <el-select v-model="updateForm.provId" placeholder="请选择省"
                                       @change="initCity(updateForm.provId,'cityOption',['updateForm.cityId','updateForm.areaId'])">
                                <el-option
                                        v-for="item in provinceOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="updateForm.cityId" placeholder="请选择市" filterable
                                       @change="initArea(updateForm.cityId,'areaOption',['updateForm.areaId'])">
                                <el-option
                                        v-for="item in cityOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="updateForm.areaId" placeholder="请选择区" filterable>
                                <el-option
                                        v-for="item in areaOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>

                            <el-input v-model="updateForm.address" class="width-other">
                                <template slot="append"><span @click="openUpMap($event,'address')"><i
                                        class="el-icon-location-outline"></i></span></template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <h2 class="info-title">驾驶证信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="驾驶证照" class="required_flag" prop="driver_licence_1st_imageUrl">
                            <div class="upload_box">
                                <span class="tit_tit">驾驶证首页</span>
                                <el-upload
                                        class="avatar-uploader"
                                        name="driver_licence_1st"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="updateSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <!--图片验证 :before-upload="beforeAvatarUpload" -->
                                    <img v-if="updateForm.driver_licence_1st_imageUrl"
                                         :src="updateForm.driver_licence_1st_imageUrl"
                                         :imageType="updateForm.driver_licence_1st_imageUrl_type"
                                         :imgName="updateForm.driver_licence_1st_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '9'">查看示例</div>
                            </div>
                            <div class="upload_box">
                                <span class="tit_tit">驾驶证副页</span>
                                <el-upload
                                        class="avatar-uploader"
                                        name="driver_licence_2nd"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="updateSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <!--图片验证 :before-upload="beforeAvatarUpload" -->
                                    <img v-if="updateForm.driver_licence_2nd_imageUrl"
                                         :src="updateForm.driver_licence_2nd_imageUrl"
                                         :imageType="updateForm.driver_licence_2nd_imageUrl_type"
                                         :imgName="updateForm.driver_licence_2nd_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '10'">查看示例</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="驾驶证号" prop="dlNo">
                            <el-input v-model="updateForm.dlNo"></el-input>
                        </el-form-item>
                    </div>
                    <h2 class="info-title">从业资格证信息</h2>
                    <div class="info-item info-other clear">
                        <el-form-item label="从业资格证号" prop="qcNo" :rules="this.updateForm.driverType!=2?updateRules.qcNo:[{ required: false, message: '请填写审核备注', trigger: 'blur' }]">
                            <el-input v-model="updateForm.qcNo"></el-input>
                        </el-form-item>
                        <el-form-item label="从业资格类别" prop="qcType" :rules="this.updateForm.driverType!=2?updateRules.qcType:[{ required: false, message: '请填写审核备注', trigger: 'blur' }]">
                            <el-input v-model="updateForm.qcType"></el-input>
                        </el-form-item>
                        <el-form-item label="初次领证日期" prop="qcFirstTime" :rules="this.updateForm.driverType!=2?updateRules.qcFirstTime:[{ required: false, message: '请填写审核备注', trigger: 'blur' }]">
                            <el-date-picker
                                    v-model="updateForm.qcFirstTime"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item class="termOfValidity " label="有效期" prop="qcEndTime" :rules="this.updateForm.driverType!=2?updateRules.qcEndTime:[{ required: false, message: '请填写审核备注', trigger: 'blur' }]">
                            <el-form-item>
                            <el-date-picker
                                    v-model="updateForm.qcStartTime"
                                    prop="qcStartTime"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                            </el-form-item>
                            <span>至</span>
                            <el-form-item>
                            <el-date-picker
                                    v-model="updateForm.qcEndTime"
                                    prop="qcEndTime"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <div id="upQcReq">
                        <el-form-item class="required_flag" label="从业资格证照" prop="driver_qc_card_imageUrl">
                            <div class="upload_box">
                                <el-upload
                                        class="avatar-uploader"
                                        name="driver_qc_card"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="updateSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <!--图片验证 :before-upload="beforeAvatarUpload" -->
                                    <img v-if="updateForm.driver_qc_card_imageUrl" :src="updateForm.driver_qc_card_imageUrl"
                                         :imageType="updateForm.driver_qc_card_imageUrl_type"
                                         :imgName="updateForm.driver_qc_card_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '11'">查看示例</div>
                            </div>
                        </el-form-item>
                        </div>
                    </div>
                   <!-- <el-dialog title="选取地址" :visible.sync="dialogFormVisible">
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
                                           @click="dialogFormVisible = false,updateForm[MapClass] = clickAddressDetail">确 定</el-button>
                              </span>
                    </el-dialog>-->
                </el-form>
                <div class="import-bottom">
                    <el-button @click="cancelUpdateStock">取 消</el-button>
                    <el-button type="primary" @click="submitUpdateForm">下一步</el-button>
                </div>
            </div>
        </el-dialog>



        <!-- 添加/更换司机弹窗 -->
        <el-dialog class="capacity-pop capacity-line" title="关联/更换车辆" :visible.sync="changeCar" width="34%" center>
            <div class="capacity-pop-in">
                <el-form :model="changeCarForm" :rules="changeCarRules" ref="changeCarForm" label-width="110px"
                         class="demo-ruleForm">
                    <el-form-item label="主驾车辆" prop="">
                        <el-select v-model="mainCarsValue" placeholder="请选择">
                            <el-option
                                    v-for="item in mainCars"
                                    :key="item.pkId"
                                    :label="item.dlPlateNo"
                                    :value="item.pkId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="副驾车辆" prop="">
                        <el-select v-model="deputyCarsValue" placeholder="请选择">
                            <el-option
                                    v-for="item in deputyCars"
                                    :key="item.pkId"
                                    :label="item.dlPlateNo"
                                    :value="item.pkId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="import-bottom">
                    <el-button @click="changeCar = false">取 消</el-button>
                    <el-button type="primary" @click="changeCarSubmit">确 定</el-button>
                    <el-button type="primary" v-if="showDel" @click="delBind">解除关联</el-button>
                </div>
            </div>
        </el-dialog>

        <!--上传司机证件弹窗-->
        <el-dialog class="capacity-pop upload_pop" title="上传司机证件" :visible.sync="uploadPapers" width="650px" center>
            <div class="capacity-pop-in">
                <el-form :model="uploadPapersForm" :rules="uploadPapersRules" ref="uploadPapersForm"
                         class="demo-ruleForm papers-item">
                    <el-form-item class="upload_box">
                        <span class="tit_tit"><i class="not-null">*</i>个人信息页</span>
                        <el-upload
                                class="avatar-uploader"
                                name="driver_id_card_front"
                                :action="action"
                                :show-file-list="false"
                                :http-request="requestUpload"
                                :on-success="uploadPicSuccess"
                                :before-upload="beforeAvatarUpload">
                            <!--图片验证 :before-upload="beforeAvatarUpload" -->
                            <img v-if="uploadPapersForm.driver_id_card_front_imageUrl"
                                 :src="uploadPapersForm.driver_id_card_front_imageUrl"
                                 :imageType="uploadPapersForm.driver_id_card_front_imageUrl_type"
                                 :imgName="uploadPapersForm.driver_id_card_front_imageUrl_name" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="check_eg" @click="sampleImg = true,sampleType = '6'">查看示例</div>
                    </el-form-item>
                    <el-form-item class="upload_box">
                        <span class="tit_tit"><i class="not-null">*</i>国徽页</span>
                        <el-upload
                                class="avatar-uploader"
                                name="driver_id_card_back"
                                :action="action"
                                :show-file-list="false"
                                :http-request="requestUpload"
                                :on-success="uploadPicSuccess"
                                :before-upload="beforeAvatarUpload">
                            <!--图片验证 :before-upload="beforeAvatarUpload" -->
                            <img v-if="uploadPapersForm.driver_id_card_back_imageUrl"
                                 :src="uploadPapersForm.driver_id_card_back_imageUrl"
                                 :imageType="uploadPapersForm.driver_id_card_back_imageUrl_type"
                                 :imgName="uploadPapersForm.driver_id_card_back_imageUrl_name" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="check_eg" @click="sampleImg = true,sampleType = '7'">查看示例</div>
                    </el-form-item>
                    <el-form-item class="upload_box">
                        <span class="tit_tit"><i class="not-null">*</i>手持身份证</span>
                        <el-upload
                                class="avatar-uploader"
                                name="driver_hand"
                                :action="action"
                                :show-file-list="false"
                                :http-request="requestUpload"
                                :on-success="uploadPicSuccess"
                                :before-upload="beforeAvatarUpload">
                            <!--图片验证 :before-upload="beforeAvatarUpload" -->
                            <img v-if="uploadPapersForm.driver_hand_imageUrl"
                                 :src="uploadPapersForm.driver_hand_imageUrl"
                                 :imageType="uploadPapersForm.driver_hand_imageUrl_type"
                                 :imgName="uploadPapersForm.driver_hand_imageUrl_name"
                                 class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="check_eg" @click="sampleImg = true,sampleType = '8'">查看示例</div>
                    </el-form-item>
                    <el-form-item class="upload_box">
                        <span class="tit_tit"><i class="not-null">*</i>驾驶证首页</span>
                        <el-upload
                                class="avatar-uploader"
                                name="driver_licence_1st"
                                :action="action"
                                :show-file-list="false"
                                :http-request="requestUpload"
                                :on-success="uploadPicSuccess"
                                :before-upload="beforeAvatarUpload">
                            <!--图片验证 :before-upload="beforeAvatarUpload" -->
                            <img v-if="uploadPapersForm.driver_licence_1st_imageUrl"
                                 :src="uploadPapersForm.driver_licence_1st_imageUrl"
                                 :imageType="uploadPapersForm.driver_licence_1st_imageUrl_type"
                                 :imgName="uploadPapersForm.driver_licence_1st_imageUrl_name" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="check_eg" @click="sampleImg = true,sampleType = '9'">查看示例</div>
                    </el-form-item>
                    <el-form-item class="upload_box">
                        <span class="tit_tit"><i class="not-null">*</i>驾驶证副页</span>
                        <el-upload
                                class="avatar-uploader"
                                name="driver_licence_2nd"
                                :action="action"
                                :show-file-list="false"
                                :http-request="requestUpload"
                                :on-success="uploadPicSuccess"
                                :before-upload="beforeAvatarUpload">
                            <!--图片验证 :before-upload="beforeAvatarUpload" -->
                            <img v-if="uploadPapersForm.driver_licence_2nd_imageUrl"
                                 :src="uploadPapersForm.driver_licence_2nd_imageUrl"
                                 :imageType="uploadPapersForm.driver_licence_2nd_imageUrl_type"
                                 :imgName="uploadPapersForm.driver_licence_2nd_imageUrl_name" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="check_eg" @click="sampleImg = true,sampleType = '10'">查看示例</div>
                    </el-form-item>
                    <el-form-item class="upload_box">
                        <span class="tit_tit"><i class="not-null">*</i>从业资格证</span>
                        <el-upload
                                class="avatar-uploader"
                                name="driver_qc_card"
                                :action="action"
                                :show-file-list="false"
                                :http-request="requestUpload"
                                :on-success="uploadPicSuccess"
                                :before-upload="beforeAvatarUpload">
                            <!--图片验证 :before-upload="beforeAvatarUpload" -->
                            <img v-if="uploadPapersForm.driver_qc_card_imageUrl"
                                 :src="uploadPapersForm.driver_qc_card_imageUrl"
                                 :imageType="uploadPapersForm.driver_qc_card_imageUrl_type"
                                 :imgName="uploadPapersForm.driver_qc_card_imageUrl_name" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="check_eg" @click="sampleImg = true,sampleType = '11'">查看示例</div>
                    </el-form-item>
                    <div class="papers-sm">
                        <h2>上述证件要求</h2>
                        <ul>
                            <li>1、上述证件中所有信息清晰可见，字迹无PS、遮挡、涂改、模糊等情况</li>
                            <li>2、证件必须完整，证件四个边角需漏出，证件无残缺、断裂、破损等情况</li>
                            <li>3、必须为清晰、完整的彩色原件扫描件或数码照</li>
                            <li>4、支持上传图片格式-jpg/png/bmp,图片大小在3M以内</li>
                        </ul>
                    </div>
                    <div class="import-bottom">
                        <el-button @click="cancelUploadPapers">取 消</el-button>
                        <el-button type="primary" @click="submitPicForm">下一步</el-button>
                    </div>

                </el-form>
            </div>
        </el-dialog>

        <!--核对并完善信息弹窗-->
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" title="添加核对并完善信息" :visible.sync="checkInfo" width="74.2%" center>
            <div class="capacity-pop-in info-case" style="padding: 0;">
                <p class="checkInfo-tip">已为您自动识别部分信息，请仔细核对并完善</p>
                <el-form :model="checkInfoForm" :rules="checkInfoRules" ref="checkInfoForm" label-width="110px"
                         class="demo-ruleForm">
                    <h2 class="info-title">司机信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="司机姓名" prop="userName">
                            <el-input v-model="checkInfoForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="idCard">
                            <el-input v-model="checkInfoForm.idCard"></el-input>
                        </el-form-item>
                        <el-form-item label="有效期限" prop="cardEnd">
                            <el-date-picker
                                    style="width:81%;"
                                    :readonly="readonly"
                                    v-model="checkInfoForm.cardEnd"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                            <el-checkbox @change="longDate">长期</el-checkbox>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="checkInfoForm.phone" maxlength="11"></el-input>
                        </el-form-item>
                        <el-form-item label="备用电话" prop="">
                            <el-input v-model="checkInfoForm.backupPhone" maxlength="11"></el-input>
                        </el-form-item>
                        <el-form-item label="司机类型" prop="driverType">
                            <el-radio-group v-model="checkInfoForm.driverType">
                                <el-radio :label="1">大板司机</el-radio>
                                <el-radio :label="2">小板司机</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="联系地址"  class="address required_flag" prop="cityId">
                            <el-select v-model="checkInfoForm.provId" placeholder="请选择省"
                                       @change="initCity(checkInfoForm.provId,'cityOption',['checkInfoForm.cityId','checkInfoForm.areaId'])">
                                <el-option
                                        v-for="item in provinceOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="checkInfoForm.cityId" placeholder="请选择市" filterable
                                       @change="initArea(checkInfoForm.cityId,'areaOption',['checkInfoForm.areaId'])">
                                <el-option
                                        v-for="item in cityOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="chAreaId" placeholder="请选择区" filterable @change="test()">
                                <el-option
                                        v-for="item in areaOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>

                            <el-input v-model="checkInfoForm.address">
                                <template slot="append"><span @click="openMap($event,'address')"><i
                                        class="el-icon-location-outline"></i></span></template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <h2 class="info-title">驾驶证信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="驾驶证号" prop="dlNo">
                            <el-input v-model="checkInfoForm.dlNo"></el-input>
                        </el-form-item>

                       <!-- <el-form-item label="出生日期" prop="">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>-->
                        <el-form-item label="准驾车型" prop="dlAllow">
                            <el-input v-model="checkInfoForm.dlAllow" maxlength="5"></el-input>
                        </el-form-item>
                        <el-form-item label="档案编号" prop="dlDossierNo">
                            <el-input v-model="checkInfoForm.dlDossierNo"></el-input>
                        </el-form-item>
                        <el-form-item class="termOfValidity" label="有效期" prop="dlStartTime">
                            <el-form-item>
                            <el-date-picker
                                    v-model="checkInfoForm.dlStartTime"
                                    prop="dlStartTime"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                            </el-form-item>
                            <span>至</span>
                            <el-form-item>
                            <el-date-picker
                                    v-model="checkInfoForm.dlEndTime"
                                    prop="dlEndTime"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="初次领证日期" prop="dlFirstTime">
                            <el-date-picker
                                    v-model="checkInfoForm.dlFirstTime"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>

                </el-form>

                <div class="import-bottom">
                    <el-button @click="checkInfo = false">上一步</el-button>
                    <el-button type="primary" @click="confirmBtn">确 定</el-button>
                </div>
            </div>
        </el-dialog>
        <!--编辑选取地址-->
        <el-dialog title="选取地址" :visible.sync="dialogUpFormVisible">
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
                                           @click="dialogUpFormVisible = false,updateForm[MapClass] = clickAddressDetail">确 定</el-button>
                              </span>
        </el-dialog>
        <el-dialog title="选取地址" :visible.sync="dialogUpPicFormVisible">
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
                                           @click="dialogUpPicFormVisible = false,upCheckInfoForm[MapClass] = clickAddressDetail">确 定</el-button>
                              </span>
        </el-dialog>
        <!--确认信息选取地址-->
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
                                           @click="dialogFormVisible = false,checkInfoForm[MapClass] = clickAddressDetail">确 定</el-button>
                              </span>
        </el-dialog>
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" title="上传图片核对并完善信息" :visible.sync="upCheckInfo" width="74.2%" center>
            <div class="capacity-pop-in info-case" style="padding: 0;">
                <p class="checkInfo-tip">已为您自动识别部分信息，请仔细核对并完善</p>
                <el-form :model="upCheckInfoForm" :rules="upCheckInfoRules" ref="upCheckInfoForm" label-width="110px"
                         class="demo-ruleForm">
                    <h2 class="info-title">车辆保险信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="司机姓名" prop="userName">
                            <el-input v-model="upCheckInfoForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="idCard">
                            <el-input v-model="upCheckInfoForm.idCard"></el-input>
                        </el-form-item>
                        <el-form-item label="有效期限" prop="cardEnd">
                            <el-date-picker
                                    style="width:81%;"
                                    v-model="upCheckInfoForm.cardEnd"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                            <el-checkbox>长期</el-checkbox>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="upCheckInfoForm.phone" maxlength="11"></el-input>
                        </el-form-item>
                        <el-form-item label="备用电话" prop="">
                            <el-input v-model="upCheckInfoForm.backupPhone" maxlength="11"></el-input>
                        </el-form-item>
                        <el-form-item label="司机类型" prop="driverType">
                            <el-radio-group v-model="upCheckInfoForm.driverType">
                                <el-radio :label="1">大板司机</el-radio>
                                <el-radio :label="2">小板司机</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="联系地址" class="address" prop="cityId">
                            <el-select v-model="upCheckInfoForm.provId" placeholder="请选择省"
                                       @change="initCity(upCheckInfoForm.provId,'cityOption',['upCheckInfoForm.cityId','upCheckInfoForm.areaId'])">
                                <el-option
                                        v-for="item in provinceOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="upCheckInfoForm.cityId" placeholder="请选择市" filterable
                                       @change="initArea(upCheckInfoForm.cityId,'areaOption',['upCheckInfoForm.areaId'])">
                                <el-option
                                        v-for="item in cityOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="upCheckInfoForm.areaId" placeholder="请选择区" filterable>
                                <el-option
                                        v-for="item in areaOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>

                            <el-input v-model="upCheckInfoForm.address" class="width-other">
                                <template slot="append"><span @click="openUpPicMap($event,'address')"><i
                                        class="el-icon-location-outline"></i></span></template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <h2 class="info-title">驾驶证信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="驾驶证号" prop="dlNo">
                            <el-input v-model="upCheckInfoForm.dlNo"></el-input>
                        </el-form-item>

                        <!--<el-form-item label="出生日期" prop="">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>-->
                        <el-form-item label="准驾车型" prop="dlAllow">
                            <el-input v-model="upCheckInfoForm.dlAllow" maxlength="5"></el-input>
                        </el-form-item>
                        <el-form-item label="档案编号" prop="dlDossierNo">
                            <el-input v-model="upCheckInfoForm.dlDossierNo"></el-input>
                        </el-form-item>
                        <el-form-item class="termOfValidity" label="有效期" prop="dlStartTime">
                            <el-form-item>
                            <el-date-picker
                                    v-model="upCheckInfoForm.dlStartTime"
                                    prop="dlStartTime"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                            </el-form-item>
                            <span>至</span>
                            <el-form-item>
                            <el-date-picker
                                    v-model="upCheckInfoForm.dlEndTime"
                                    prop="dlEndTime"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="初次领证日期" prop="dlFirstTime">
                            <el-date-picker
                                    v-model="upCheckInfoForm.dlFirstTime"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                   <!-- <el-dialog title="选取地址" :visible.sync="dialogFormVisible">
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
                                           @click="dialogFormVisible = false,upCheckInfoForm[MapClass] = clickAddressDetail">确 定</el-button>
                              </span>
                    </el-dialog>-->
                </el-form>

                <div class="import-bottom">
                    <el-button @click="upCheckInfo = false">上一步</el-button>
                    <el-button type="primary" @click="confirmUpBtn">确 定</el-button>
                </div>
            </div>
        </el-dialog>

        <!--司机详情信息弹窗-->
        <el-dialog class="capacity-pop" title="司机详情信息" :visible.sync="carDetailsInfo" width="" center>
            <div class="capacity-pop-in checkInfo">
                <el-form label-width="130px" class="demo-ruleForm">
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
                        <el-form-item label="联系地址：">
                            {{driverDetailsInfo.address}}
                        </el-form-item>
                        <el-form-item label="司机类型：">
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
                    <el-button type="primary" @click="carDetailsInfo = false">确 定</el-button>
                </div>
            </div>
        </el-dialog>

        <!--道路运输许可证详情信息弹窗-->
        <el-dialog class="capacity-pop" title="驾驶证详情信息" :visible.sync="dlDetailsInfo" width="55%" center>
            <div class="capacity-pop-in checkInfo">
                <el-form label-width="130px" class="demo-ruleForm">
                    <div class="info-item clear">
                        <el-form-item label="姓名：">
                            {{dlInfo.userName}}
                        </el-form-item>
                        <el-form-item label="驾驶证号：">
                            {{dlInfo.dlNo}}
                        </el-form-item>
                        <el-form-item label="准驾车型：">
                            {{dlInfo.dlAllow}}
                        </el-form-item>
                        <el-form-item label="初次领证日期：">
                            {{common.formatterDate('','',dlInfo.dlFirstTime)}}
                        </el-form-item>
                        <el-form-item label="档案编号：">
                            {{dlInfo.dlDossierNo}}
                        </el-form-item>
                        <el-form-item label="有效期：">
                            {{common.formatterDate('','',dlInfo.dlStartTime)}}至 {{common.formatterDate('','',dlInfo.dlEndTime)}}
                        </el-form-item>
                    </div>
                    <el-form-item label="驾驶证照：">
                        <div class="upload_box">
                            <span class="tit_tit">驾驶证首页</span>
                            <img class="infoImg" :src="dlInfoImg[0]" alt="">
                        </div>
                        <div class="upload_box">
                            <span class="tit_tit">驾驶证副页</span>
                            <img class="infoImg" :src="dlInfoImg[1]" alt="">
                        </div>
                    </el-form-item>

                </el-form>
                <div class="import-bottom">
                    <el-button type="primary" @click="dlDetailsInfo = false">确 定</el-button>
                </div>
            </div>
        </el-dialog>


        <!--保险详情信息弹窗-->
        <el-dialog class="capacity-pop" title="从业资格证详情信息" :visible.sync="qcDetailsInfo" width="55%" center>
            <div class="capacity-pop-in checkInfo">
                <el-form label-width="130px" class="demo-ruleForm">
                    <div class="info-item clear">
                        <el-form-item label="姓名：">
                            {{qcInfo.userName}}
                        </el-form-item>
                        <el-form-item label="从业资格证号：">
                            {{qcInfo.qcNo}}
                        </el-form-item>
                        <el-form-item label="从业资格类别：">
                            {{qcInfo.qcType}}
                        </el-form-item>
                        <el-form-item label="初次领证日期：">
                            {{common.formatterDate('','',qcInfo.qcFirstTime)}}
                        </el-form-item>
                        <el-form-item label="有效期：">
                            {{common.formatterDate('','',qcInfo.qcStartTime)}}至 {{common.formatterDate('','',qcInfo.qcEndTime)}}
                        </el-form-item>
                    </div>
                    <el-form-item label="从业资格证照：">
                        <div class="upload_box">
                            <span class="tit_tit">从业资格证照</span>
                            <img class="infoImg" :src="qcInfoImg" alt="">
                        </div>
                    </el-form-item>
                </el-form>
                <div class="import-bottom">
                    <el-button type="primary" @click="qcDetailsInfo = false">确 定</el-button>
                </div>
            </div>
        </el-dialog>

        <SampleGraph :visible.sync="sampleImg" :sampleType="sampleType"></SampleGraph>
    </div>
</template>

<script>
    import SampleGraph from '../../SampleGraph'  //示例图
    import Header from '../../../frame/HeaderCapacity'  //头部
    export default {
        components: {
            'SampleGraph':SampleGraph,
            'Header':Header
        },
        data() {
            var validAddCard = (rule, value, callback) => {//
                this.$get("/companyDriver/validCheck", {chValue: this.driverForm.idCard,chName:"idCard"}).then(function (response) {
                    if (response.code) {
                        callback(new Error('身份证号已存在'));
                    } else {
                        callback();
                    }
                });
            };
            var validUpConfirmCard = (rule, value, callback) => {
                this.$get("/companyDriver/validCheck", {chValue: value,chName:"idCard",pkId:this.driverPkId}).then(function (response) {
                    if (response.code) {
                        callback(new Error('身份证号已存在'));
                    } else {
                        callback();
                    }
                });
            };
            var validconfirmCard = (rule, value, callback) => {
                this.$get("/companyDriver/validCheck", {chValue: this.checkInfoForm.idCard,chName:"idCard",pkId:this.driverPkId}).then(function (response) {
                    if (response.code) {
                        callback(new Error('身份证号已存在'));
                    } else {
                        callback();
                    }
                });
            };
            var validUpdateconfirmCard = (rule, value, callback) => {
                this.$get("/companyDriver/validCheck", {chValue: this.updateForm.idCard,chName:"idCard",pkId:this.driverPkId}).then(function (response) {
                    if (response.code) {
                        callback(new Error('身份证号已存在'));
                    } else {
                        callback();
                    }
                });
            };
            var validConfirmMobile = (rule, value, callback) => {
                this.$get("/companyDriver/validCheck", {chValue: this.checkInfoForm.phone,chName:"phone",pkId:this.driverPkId}).then(function (response) {
                    if (response.code) {
                        callback(new Error('手机号已存在'));
                    } else {
                        callback();
                    }
                });
            };
            var validUpConfirmMobile = (rule, value, callback) => {
                this.$get("/companyDriver/validCheck", {chValue: this.upCheckInfoForm.phone,chName:"phone",pkId:this.driverPkId}).then(function (response) {
                    if (response.code) {
                        callback(new Error('手机号已存在'));
                    } else {
                        callback();
                    }
                });
            };
            var validUpdateMobile = (rule, value, callback) => {
                this.$get("/companyDriver/validCheck", {chValue: this.updateForm.phone,chName:"phone",pkId:this.driverPkId}).then(function (response) {
                    if (response.code) {
                        callback(new Error('手机号已存在'));
                    } else {
                        callback();
                    }
                });
            };
            var validConfirmDl = (rule, value, callback) => {
                this.$get("/companyDriver/validCheck", {chValue: this.checkInfoForm.dlNo,chName:"dlNo",pkId:this.driverPkId}).then(function (response) {
                    if (response.code) {
                        callback(new Error('驾驶证已存在'));
                    } else {
                        callback();
                    }
                });
            };
            var validAddDl = (rule, value, callback) => {
                this.$get("/companyDriver/validCheck", {chValue: this.driverForm.dlNo,chName:"dlNo"}).then(function (response) {
                    if (response.code) {
                        callback(new Error('驾驶证已存在'));
                    } else {
                        callback();
                    }
                });
            };
            var validUpConfirmDl = (rule, value, callback) => {
                this.$get("/companyDriver/validCheck", {chValue: this.upCheckInfoForm.dlNo,chName:"dlNo",pkId:this.driverPkId}).then(function (response) {
                    if (response.code) {
                        callback(new Error('驾驶证已存在'));
                    } else {
                        callback();
                    }
                });
            };
            var validUpdateConfirmDl = (rule, value, callback) => {
                this.$get("/companyDriver/validCheck", {chValue: this.updateForm.dlNo,chName:"dlNo",pkId:this.driverPkId}).then(function (response) {
                    if (response.code) {
                        callback(new Error('驾驶证已存在'));
                    } else {
                        callback();
                    }
                });
            };
            var validAddQC = (rule, value, callback) => {
                this.$get("/companyDriver/validCheck", {chValue: this.driverForm.qcNo,chName:"qcNo"}).then(function (response) {
                    if (response.code) {
                        callback(new Error('从业资格证已存在'));
                    } else {
                        callback();
                    }
                });
            };
            var validUpConfirmQC = (rule, value, callback) => {
                this.$get("/companyDriver/validCheck", {chValue: value,chName:"qcNo",pkId:this.driverPkId}).then(function (response) {
                    if (response.code) {
                        callback(new Error('从业资格证已存在'));
                    } else {
                        callback();
                    }
                });
            };
            var validUpdateConfirmQC = (rule, value, callback) => {
                this.$get("/companyDriver/validCheck", {chValue: this.updateForm.qcNo,chName:"qcNo",pkId:this.driverPkId}).then(function (response) {
                    if (response.code) {
                        callback(new Error('从业资格证已存在'));
                    } else {
                        callback();
                    }
                });
            };
            /* let checkInfoForm = {};
             checkInfoForm.areaId = '';*/
            return {
                readonly:false,
                sampleImg: false,
                sampleType:'',
                upLoadFile:[],
                driverPkId: '',
                //司机详情
                driverDetailsInfo: '',
                driverDetailsInfoImg: [],
                //驾驶证详情
                dlInfo: '',
                dlInfoDateStr: '',
                dlInfoImg: [],
                //从业资格详情
                qcInfo: '',
                qcInfoImg: '',
                driverIdCardNo: "",
                driverName: '',
                dialogFormVisible: false,
                dialogUpFormVisible: false,
                dialogUpPicFormVisible:false,
                center: '北京',
                MapClass: "",
                position: "",
                clickAddressDetail: '点击选取地址',
                imgSrc: "../../../../images/register/imgTest.jpg",
                screenHeight: document.documentElement.clientHeight, // 屏幕高度
                active: 1, //步骤栏默认
                activePop: 0,
                radio: '1',
                img1: false,
                fileList: [],
                imageUrl: '',   //图片地址
                addHeadstock: false, //添加车头弹窗
                bulkImportRulesForm: {},//司机信息批量导入弹窗
                bulkImportRules: {},
                bulkImport: false, //批量导入弹窗
                uploadPapers: false,//上传证件弹窗
                uploadPapersRules: {},
                checkInfo: false,  //核对并完善信息弹窗
                checkInfoForm: {areaId: ''},
                checkInfoRules: {
                    idCard:  [{required: true, trigger: 'blur',validator:this.common.checkIdCard},{
                        validator: validconfirmCard,
                        trigger: 'blur'
                    }],
                    dlNo: [{required: true, message: '此项不能为空', trigger: 'blur'},{
                        validator: validConfirmDl,
                        trigger: 'blur'
                    }],
                    userName: {required: true, message: '此项不能为空', trigger: 'blur'},
                    phone: [{
                        required: true,
                        message: '请输入手机号码',
                        trigger: 'blur'
                    }, {
                        validator: this.common.checkPhone,
                        trigger: 'blur'
                    }, {
                        validator: validConfirmMobile,
                        trigger: 'blur'
                    }],
                    //address:{required: true, message: '此项不能为空', trigger: 'blur'},
                    dlAllow: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlDossierNo: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlStartTime: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlEndTime: {required: true, message: '此项不能为空', trigger: 'blur'},
                    cardEnd: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlFirstTime: {required: true, message: '此项不能为空', trigger: 'blur'},
                    cityId: {required: true, message: '此项不能为空', trigger: 'blur'},
                },
                carDetailsInfo: false,//车辆详情信息弹窗
                dlDetailsInfo: false, //道路运输许可证详情信息弹窗
                qcDetailsInfo: false, //保险详情信息弹窗
                updateStock: false,//编辑弹窗
                changeCar: false,//更换车辆
                tableData: [],
                provinceOption: [],
                addressProvinceOption: [],
                addressCityOption: [],
                addressAreaOption: [],
                cityOption: [],
                areaOption: [],
                changeDriverId: "",
                changeDriverType: "",
                mainCars: [],//主驾车辆
                deputyCars: [],//副驾车辆
                mainCarsValue: "",
                deputyCarsValue: "",
                action: this.common.CONSTANT.UPLOADIMGPATH + 'recognizeImage',
                upLoadExcel:this.common.CONSTANT.UPLOADIMGPATH+'/companyDriver/upLoadExcel',
                driver_id_card_front_imageUrl: "",
                driver_id_card_front_imageUrl_type: "",
                driver_id_card_front_imageUrl_name: "",
                driver_id_card_back_imageUrl: '',
                driver_id_card_back_imageUrl_type: '',
                driver_id_card_back_imageUrl_name: '',
                driver_hand_imageUrl: '',
                driver_hand_imageUrl_type: '',
                driver_hand_imageUrl_name: '',
                dlAllow: '',
                driver_licence_1st_imageUrl: "",
                driver_licence_1st_imageUrl_type: "",
                driver_licence_1st_imageUrl_name: "",
                driver_licence_2nd_imageUrl: '',
                driver_licence_2nd_imageUrl_type: '',
                driver_licence_2nd_imageUrl_name: '',

                upCheckInfo: false,
                driver_qc_card_imageUrl: '',
                driver_qc_card_imageUrl_type: '',
                driver_qc_card_imageUrl_name: '',
                companyId: '',
                userName: '',
                idCard: '',
                cardStart: '',
                cardEnd: '',
                phone: '',
                backupPhone: '',
                address: '',
                driverType: '',
                dlUser: '',
                dlNo: '',
                dlFirstTime: '',
                dlStartTime: '',
                dlEndTime: '',
                qcUser: '',
                qcNo: '',
                qcType: '',
                qcFirstTime: '',
                qcStartTime: '',
                qcEndTime: '',

                rules: {
                    idCard: [{required: true, message: '此项不能为空', trigger: 'blur'},{trigger: 'blur',validator:this.common.checkIdCard},{
                        validator: validAddCard,
                        trigger: 'blur'
                    }],
                    dlNo: [{required: true, message: '此项不能为空', trigger: 'blur'},{
                        validator:validAddDl,
                        trigger:'blur'
                    }],
                    qcNo: [{required: true, message: '此项不能为空', trigger: 'blur'},{
                        validator: validAddQC,
                        trigger: 'blur'
                    }],
                    qcType: [{required: true, message: '此项不能为空', trigger: 'blur'}],
                    qcFirstTime:[{required: true, message: '此项不能为空', trigger: 'blur'}],
                    qcEndTime:[{required: true, message: '此项不能为空', trigger: 'blur'}],

                },
                driverForm: {driverType:1},
                updateForm: {areaId:''},
                updateRules: {
                    idCard:  [{required: true, trigger: 'blur',validator:this.common.checkIdCard},{
                        validator: validUpdateconfirmCard,
                        trigger: 'blur'
                    }],
                    phone: [{
                        required: true,
                        message: '请输入手机号码',
                        trigger: 'blur'
                    }, {
                        validator: this.common.checkPhone,
                        trigger: 'blur'
                    }, {
                        validator: validUpdateMobile,
                        trigger: 'blur'
                    }],
                    dlNo: [{required: true, message: '此项不能为空', trigger: 'blur'},{
                        validator:validUpdateConfirmDl,
                        trigger:'blur'
                    }],
                    qcNo: [{required: true, message: '此项不能为空', trigger: 'blur'},{
                        validator: validUpdateConfirmQC,
                        trigger: 'blur'
                    }],
                    qcType: [{required: true, message: '此项不能为空', trigger: 'blur'}],
                    qcFirstTime:[{required: true, message: '此项不能为空', trigger: 'blur'}],
                    qcEndTime:[{required: true, message: '此项不能为空', trigger: 'blur'}],
                    cityId:{required: true, message: '此项不能为空', trigger: 'blur'},
                    //address:{required: true, message: '此项不能为空', trigger: 'blur'},

                },
                uploadPapersForm: {},
                changeCarForm: {},
                changeCarRules: {},
                driveDlType: '',
                driverImgs: [],
                dlFirstTimeStr: '',
                dlEndTimeStr: '',
                dlStartTimeStr: '',
                qcFirstTimeStr: '',
                qcStartTimeStr: '',
                qcEndTimeStr: '',
                //upChAreaId: '',
                upCheckInfoForm: {areaId:''},
                upCheckInfoRules: {
                    idCard:  [{required: true, trigger: 'blur',validator:this.common.checkIdCard},{
                        validator: validUpConfirmCard,
                        trigger: 'blur'
                    }],
                    dlNo: [{required: true, message: '此项不能为空', trigger: 'blur'},{
                        validator: validUpConfirmDl,
                        trigger: 'blur'
                    }],
                    userName: {required: true, message: '此项不能为空', trigger: 'blur'},
                    phone: [{
                        required: true,
                        message: '请输入手机号码',
                        trigger: 'blur'
                    }, {
                        validator: this.common.checkPhone,
                        trigger: 'blur'
                    }, {
                        validator: validUpConfirmMobile,
                        trigger: 'blur'
                    }],
                    dlAllow: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlDossierNo: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlStartTime: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlEndTime: {required: true, message: '此项不能为空', trigger: 'blur'},
                    cardEnd: {required: true, message: '此项不能为空', trigger: 'blur'},
                    dlFirstTime: {required: true, message: '此项不能为空', trigger: 'blur'},
                    cityId: {required: true, message: '此项不能为空', trigger: 'blur'},
                    //address:{required: true, message: '此项不能为空', trigger: 'blur'},
                },
                companyDriverVOInfo: {},
                chAreaId: '',
                disUserName:'',
                disIdCard:'',
                disCardEnd:'',
                disDlAllow:'',
                disDlFirstTime:'',
                disDlNo:'',
                disDlName:'',
                disDossierNo:'',
                showDel:false,

                //driverForm.driverType:1,
            }
        },
        created() {
           /* let company ={};
            company.pkId='123'
            this.common.saveData('company',company);*/
            let that = this;
            this.initProvince(this);
            /*let company = this.common.fetchData("company");
            let carrierType = company['carrierType'];
            console.log(carrierType);
            if(carrierType==2){
                console.log("1111111111");
                this.driverForm.driverType = 2;
            }*/

            this.initData();
        },
        mounted() {
            var _this = this;
            window.onresize = function () { // 定义窗口大小变更通知事件
                _this.screenHeight = document.documentElement.clientHeight // 窗口高度
            }
        },
        methods: {
            initData() {
                let that = this;
                let company = this.common.fetchData("company");
                let companyId = company['pkId'];
                let data = {
                    companyId: companyId,
                    type: 1,
                };
                this.$post("companyDriver/driverList", data).then(function (data) {
                    if (data.code == 0) {
                        that.$message.error(data.msg);
                    } else {
                        that.tableData = data.data;
                        console.log(data)
                    }
                }).catch(res => {
                    console.log(res)
                })
            }
            , test: function () {
                this.checkInfoForm.areaId = this.checkInfoForm.areaId;
            },
            delConfir(pkId, driverType) {
                let that = this;
                this.$confirm('此操作将该司机删除吗？, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post("companyDriver/delDriver", {driverId: pkId, driverType: driverType}).then(data => {
                        if (data.code == 0) {
                            that.$message.error(data.msg);
                        } else {
                            // that.$router.go(0)
                            that.initData();
                        }
                    }).catch(res => {
                        console.log(res)
                    })
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消删除'});
                });
            },
            delBind() {
                let that = this;
                this.$confirm('此操作将该司机关联车辆信息删除吗？, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post("companyDriver/delBind", {driverId: this.changeDriverId, driverType: this.changeDriverType}).then(data => {
                        if (data.code == 0) {
                            that.$message.error(data.msg);
                        } else {
                             that.$router.go(0)
                            //that.initData();
                        }
                    }).catch(res => {
                        console.log(res)
                    })
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消删除'});
                });
            },
            dateFormatFun(row, column, time) {
                this.common.dataFormat(time)
            },
            //初始化城市
            initProvince: function () {
                this.common.initProvince(this, ["provinceOption", "addressProvinceOption", "provinceOption"])
            },
            //加载城市
            initCity: function (value, cityKey, clearKeys) {
                let centerName = this.common.getProvinceName(this, value, this.provinceOption);
                this.center = centerName;
                this.common.initCity(this, value, cityKey, clearKeys);
            },
            initArea: function (value, dataKey, clearKeys) {
                this.chAreaId = '';
                this.common.initArea(this, value, dataKey, clearKeys)
            },


            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            //上传证件
            handleClick(index, row) {
                console.log(index, row);
            },
            //编辑
            handleEdit(index, row) {
                console.log(index, row);
            },
            //删除
            handleDelete(index, row) {
                console.log(index, row);
            },
            /********图片校验 start**********/
            beforeAvatarUpload(file) {
               /* const isJPG = file.type === 'image/jpg';
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
                }*/
                return this.common.beforeAvatarUpload(file);
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
                let driverForm = {};
                driverForm[imageUrl] = filePath;
                driverForm[imageUrlType] = imageTypeValue;
                driverForm[imageUrlName] = file.name;
                that.driverForm = Object.assign({}, that.driverForm, driverForm);
                if("driver_id_card_front" === imageType) {
                    if (attrs) {
                        this.disIdCard = attrs['idNumber'];
                        this.disUserName = attrs['idName'];
                    }
                }
                if("driver_id_card_back" === imageType) {

                    if (attrs) {
                        if (attrs['idValidity']) {
                            this.disCardEnd = attrs['idValidity'].split('-')[1].trim().replace(/\./g, '-');
                        }
                    }
                }
                if("driver_licence_1st" === imageType) {
                    if (attrs) {
                        if (attrs['drivingClass']) {
                            this.disDlAllow= attrs['drivingClass'];
                        }
                        if(attrs['drivingLicenseId']){
                            this.disDlNo= attrs['drivingLicenseId'];
                        }
                        if(attrs['drivingValidFrom']){
                            this.disDlFirstTime= attrs['drivingValidFrom'];
                        }
                        if(attrs['drivingLicenseName']){
                            this.disDlName= attrs['drivingLicenseName'];
                        }
                    }
                }
                if ("driver_licence_2nd" === imageType) {
                    if (attrs) {
                        if (attrs['fileNumber']) {
                            this.disDossierNo = attrs['fileNumber'];
                        }
                    }
                }


            },

            updateSuccess(response, file) {
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
                let updateForm = {};
                updateForm[imageUrl] = filePath;
                updateForm[imageUrlType] = imageTypeValue;
                updateForm[imageUrlName] = file.name;
                that.updateForm = Object.assign({}, that.updateForm, updateForm);
                if("driver_id_card_front" === imageType) {
                    if (attrs) {
                        this.disIdCard = attrs['idNumber'];
                        this.disUserName = attrs['idName'];
                    }
                }
                if("driver_id_card_back" === imageType) {
                    if (attrs) {
                        if (attrs['idValidity']) {
                            this.disCardEnd = attrs['idValidity'].split('-')[1].trim().replace(/\./g, '-');
                        }
                    }
                }
                if("driver_licence_1st" === imageType) {
                    if (attrs) {
                        if (attrs['drivingClass']) {
                            this.disDlAllow= attrs['drivingClass'];
                        }
                        if(attrs['drivingLicenseId']){
                            this.disDlNo= attrs['drivingLicenseId'];
                        }
                        if(attrs['drivingValidFrom']){
                            this.disDlFirstTime= attrs['drivingValidFrom'];
                        }
                        if(attrs['drivingLicenseName']){
                            this.disDlName= attrs['drivingLicenseName'];
                        }
                    }
                }
                if ("driver_licence_2nd" === imageType) {
                    if (attrs) {
                        if (attrs['fileNumber']) {
                            this.disDossierNo = attrs['fileNumber'];
                        }
                    }
                }
            },
            uploadPicSuccess(response, file) {
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
                let uploadPapersForm = {};
                uploadPapersForm[imageUrl] = filePath;
                uploadPapersForm[imageUrlType] = imageTypeValue;
                uploadPapersForm[imageUrlName] = file.name;
                that.uploadPapersForm = Object.assign({}, that.uploadPapersForm, uploadPapersForm);
                if("driver_id_card_front" === imageType) {
                    if (attrs) {
                        this.disIdCard = attrs['idNumber'];
                        this.disUserName = attrs['idName'];
                    }
                }
                if("driver_id_card_back" === imageType) {
                    if (attrs) {
                        if (attrs['idValidity']) {
                            this.disCardEnd = attrs['idValidity'].split('-')[1].trim().replace(/\./g, '-');
                        }
                    }
                }
                if("driver_licence_1st" === imageType) {
                    if (attrs) {
                        if (attrs['drivingClass']) {
                            this.disDlAllow= attrs['drivingClass'];
                        }
                        if(attrs['drivingLicenseId']){
                            this.disDlNo= attrs['drivingLicenseId'];
                        }
                        if(attrs['drivingValidFrom']){
                            this.disDlFirstTime= attrs['drivingValidFrom'];
                        }
                        if(attrs['drivingLicenseName']){
                            this.disDlName= attrs['drivingLicenseName'];
                        }
                    }
                }
                if ("driver_licence_2nd" === imageType) {
                    if (attrs) {
                        if (attrs['fileNumber']) {
                            this.disDossierNo = attrs['fileNumber'];
                        }
                    }
                }
            },
            /********图片校验 end**********/

            /***************地图*******start*******/
            openUpMap(e,classname) {
                let mapElement = e.currentTarget.parentElement.parentElement.parentElement;
                let child = mapElement.children;
                let provinceName = child[0].firstElementChild.firstElementChild.value;
                let cityName = child[1].firstElementChild.firstElementChild.value;
                let areaName = child[2].firstElementChild.firstElementChild.value;
                let autoAddress = provinceName+cityName+areaName;
                if (autoAddress) this.center = autoAddress;
                this.dialogUpFormVisible = true;
                this.MapClass = classname;
            },
            openUpPicMap(e,classname) {
                let mapElement = e.currentTarget.parentElement.parentElement.parentElement;
                let child = mapElement.children;
                let provinceName = child[0].firstElementChild.firstElementChild.value;
                let cityName = child[1].firstElementChild.firstElementChild.value;
                let areaName = child[2].firstElementChild.firstElementChild.value;
                let autoAddress = provinceName+cityName+areaName;
                if (autoAddress) this.center = autoAddress;
                this.dialogUpPicFormVisible = true;
                this.MapClass = classname;
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
            getPointAddress(e) {

                let point = e.point;
                this.position = {lng: e.point.lng, lat: e.point.lat}
                let myGeocoder = new BMap.Geocoder();
                let that = this;
                myGeocoder.getLocation(point, function (rs) {
                    console.log("111111");
                    let addComp = rs.addressComponents;
                    let adderssDetal = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                    that.clickAddressDetail = adderssDetal;
                });
            },
            /***************地图******end********/

            /*********下一步**********/
            findImagePkId(driverData, imageUrl) {
                let pkId = '';
                let that = this;
                if (driverData) {

                    let data = driverData.find(t =>
                        that.common.CONSTANT.imagePrefix + t.imagePath == imageUrl
                    );
                    if (data) {
                        pkId = data.pkId;
                    }
                }
                return pkId;
            },
            findUpdateImagePkId(driverData, type) {
                let pkId = '';
                let that = this;
                if (driverData) {

                    let data = driverData.find(t =>
                        t.imageMark == type
                    );
                    if (data) {
                        pkId = data.pkId;
                    }
                }
                return pkId;
            },

            submitForm() {
                this.$refs.driverForm.validate((valid) => {
                    if (valid) {
                        let imageValid = true;
                        let checkDriverType = this.driverForm.driverType;
                        let qcStartTime = this.driverForm.qcStartTime;
                        let qcEndTime = this.driverForm.qcEndTime;
                        if (checkDriverType == 1) {
                            if (!this.driverForm['driver_qc_card_imageUrl']) {
                                this.$message.error("从业资格证照不能为空");
                                imageValid = false;
                            }
                            if (!this.driverForm.qcFirstTime) {
                                this.$message.error("从业资格证领证日期不能为空");
                                imageValid = false;
                            }
                            if (!this.driverForm.qcEndTime) {
                                this.$message.error("从业资格证有效期不能为空");
                                imageValid = false;
                            }
                            if (!this.driverForm.qcNo) {
                                this.$message.error("从业资格证号不能为空");
                                imageValid = false;
                            }
                            if (!this.driverForm.qcStartTime) {
                                this.$message.error("从业资格证有效期不能为空");
                                imageValid = false;
                            }
                            if (!this.driverForm.qcType) {
                                this.$message.error("从业资格类别不能为空");
                                imageValid = false;
                            }
                        }
                        if (!this.driverForm['driver_id_card_front_imageUrl'] || !this.driverForm['driver_id_card_back_imageUrl'] || !this.driverForm['driver_hand_imageUrl']) {
                            this.$message.error("司机身份证照片上传不全");
                            imageValid = false;
                        }
                        if (!this.driverForm['driver_licence_2nd_imageUrl'] || !this.driverForm['driver_licence_2nd_imageUrl']) {
                            this.$message.error("司机驾驶证照片上传不全");
                            imageValid = false;
                        }
                        if(qcStartTime && qcEndTime){
                            if(qcStartTime>qcEndTime){
                                this.$message.error("从业资格有效期填写错误");
                                imageValid = false;
                            }
                        }
                        if (!imageValid) {
                            return false;
                        }


                        let companyDriverVO = {};
                        let companyDriver = {};
                        let that = this;
                        companyDriver.pkId = this.checkInfoForm.pkId ? this.checkInfoForm.pkId : "";
                        companyDriver.dlNo = this.driverForm.dlNo;
                        companyDriver.driverType = this.driverForm.driverType;
                        companyDriver.qcEndTime = this.driverForm.qcEndTime;
                        companyDriver.qcFirstTime = this.driverForm.qcFirstTime;
                        companyDriver.qcNo = this.driverForm.qcNo;
                        companyDriver.qcStartTime = this.driverForm.qcStartTime;
                        companyDriver.qcType = this.driverForm.qcType;
                        companyDriver.userName = this.disUserName;
                        companyDriver.cardEnd = this.disCardEnd;
                        companyDriver.dlNo =  this.disDlNo;
                        companyDriver.dlAllow = this.disDlAllow;
                        companyDriver.dlFirstTime = this.disDlFirstTime;
                        companyDriver.address='';
                        if(this.disIdCard) {
                            companyDriver.idCard = this.disIdCard;
                        }else {
                            companyDriver.idCard = this.driverForm.idCard;
                        }
                        if(this.disDlNo){
                            companyDriver.dlNo = this.disDlNo;
                        }else {
                            companyDriver.dlNo= this.driverForm.dlNo;
                        }
                        if(this.disDlName){
                            companyDriver.dlUser= this.disDlName;
                        }
                        if(this.disDossierNo) {
                            companyDriver.dlDossierNo = this.disDossierNo;
                        }//驾驶证背面识别档案编号


                        let companyImgList = [];
                        if (this.driverForm['driver_id_card_front_imageUrl']) { //身份证个人信息页
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(that.driverImgs, this.driverForm['driver_id_card_front_imageUrl']),
                                    imageName: this.driverForm['driver_id_card_front_imageUrl_name'],
                                    imagePath: this.driverForm['driver_id_card_front_imageUrl'],
                                    type: this.driverForm['driver_id_card_front_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_id_card_front'
                                }
                            )
                        }
                        if (this.driverForm['driver_id_card_back_imageUrl']) { //身份证国徽页
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(that.driverImgs, this.driverForm['driver_id_card_back_imageUrl']),
                                    imageName: this.driverForm['driver_id_card_back_imageUrl_name'],
                                    imagePath: this.driverForm['driver_id_card_back_imageUrl'],
                                    type: this.driverForm['driver_id_card_back_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_id_card_back'
                                }
                            )
                        }
                        if (this.driverForm['driver_hand_imageUrl']) { //手持身份证
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(that.driverImgs, this.driverForm['driver_hand_imageUrl']),
                                    imageName: this.driverForm['driver_hand_imageUrl_name'],
                                    imagePath: this.driverForm['driver_hand_imageUrl'],
                                    type: this.driverForm['driver_hand_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_hand'
                                }
                            )
                        }
                        if (this.driverForm['driver_qc_card_imageUrl']) { //
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(that.driverImgs, this.driverForm['driver_qc_card_imageUrl']),
                                    imageName: this.driverForm['driver_qc_card_imageUrl_name'],
                                    imagePath: this.driverForm['driver_qc_card_imageUrl'],
                                    type: this.driverForm['driver_qc_card_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_qc_card'
                                }
                            )
                        }
                        if (this.driverForm['driver_licence_1st_imageUrl']) { //
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(that.driverImgs, this.driverForm['driver_licence_1st_imageUrl']),
                                    imageName: this.driverForm['driver_licence_1st_imageUrl_name'],
                                    imagePath: this.driverForm['driver_licence_1st_imageUrl'],
                                    type: this.driverForm['driver_licence_1st_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_licence_1st'
                                }
                            )
                        }
                        if (this.driverForm['driver_licence_2nd_imageUrl']) { //
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(that.driverImgs, this.driverForm['driver_licence_2nd_imageUrl']),
                                    imageName: this.driverForm['driver_licence_2nd_imageUrl_name'],
                                    imagePath: this.driverForm['driver_licence_2nd_imageUrl'],
                                    type: this.driverForm['driver_licence_2nd_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_licence_2nd'
                                }
                            )
                        }
                        companyDriverVO.companyDriver = companyDriver;
                        companyDriverVO.imgs = companyImgList;
                        let company = this.common.fetchData("company");
                        companyDriverVO.companyId = company['pkId'],//this.$route.params['register']['companyId'];
                        companyDriverVO.carrierType = 1;

                        //封装了companyDriverVO给后台保存现在不了
                        let data = {
                            "data": JSON.stringify(companyDriverVO)
                        };

                        that.checkInfoForm = companyDriverVO.companyDriver;
                        that.driverImgs = companyDriverVO.imgs;
                        that.checkInfo = true;

                        that.companyDriverVOInfo = companyDriverVO;
                        /*this.$post("companyDriver/addOrUpdateDriver", data).then(function (data) {
                            console.log(data)
                            if (data.code == 0) {n
                                that.$message.error(data.msg);
                            } else {
                                that.checkInfoForm = companyDriverVO.companyDriver;
                                that.driverImgs = data.resultData.driverVO.imgs
                                that.checkInfo = true;
                            }
                        }).catch(res => {
                            console.log(res)
                        })*/
                    }
                });
            },//添加页面下一步提交方法
            // 确认信息
            confirmBtn() {
                let that = this;
                this.$refs.checkInfoForm.validate((valid) => {
                    if (valid) {
                        let imageValid = true;
                        let address = this.checkInfoForm.address;
                        let dlStartTime = this.checkInfoForm.dlStartTime;
                        let dlEndTime = this.checkInfoForm.dlEndTime

                        if(!address){
                            this.$message.error("请输入详细地址！");
                            imageValid = false;
                        }
                        if(dlStartTime>dlEndTime){
                            this.$message.error("驾驶证有效期起止时间错误！");
                            imageValid = false;
                        }
                        if(!imageValid){
                            return false;
                        }
                        let companyDriverVO = this.companyDriverVOInfo;
                        companyDriverVO['companyDriver']
                        companyDriverVO['companyDriver']['idCard'] = this.checkInfoForm.idCard;
                        companyDriverVO['companyDriver']['dlNo'] = this.checkInfoForm.dlNo;
                        companyDriverVO['companyDriver']['cardEnd'] = this.checkInfoForm.cardEnd;
                        companyDriverVO['companyDriver']['driverType'] = this.checkInfoForm.driverType;
                        companyDriverVO['companyDriver']['phone'] = this.checkInfoForm.phone;
                        companyDriverVO['companyDriver']['backupPhone'] = this.checkInfoForm.backupPhone;
                        companyDriverVO['companyDriver']['userName'] = this.checkInfoForm.userName;
                        companyDriverVO['companyDriver']['dlAllow'] = this.checkInfoForm.dlAllow;
                        companyDriverVO['companyDriver']['dlDossierNo'] = this.checkInfoForm.dlDossierNo;
                        companyDriverVO['companyDriver']['dlStartTime'] = this.checkInfoForm.dlStartTime;
                        companyDriverVO['companyDriver']['dlEndTime'] = this.checkInfoForm.dlEndTime;
                        companyDriverVO['companyDriver']['dlFirstTime'] = this.checkInfoForm.dlFirstTime;
                        companyDriverVO['companyDriver']['provId'] = this.checkInfoForm.provId;
                        companyDriverVO['companyDriver']['provName'] = this.common.getProvinceName(this, this.checkInfoForm.provId, this.provinceOption);
                        companyDriverVO['companyDriver']['cityId'] = this.checkInfoForm.cityId;
                        companyDriverVO['companyDriver']['cityName'] = this.common.getCityName(this, this.checkInfoForm.cityId, this.cityOption);
                        companyDriverVO['companyDriver']['areaId'] = this.chAreaId;
                        companyDriverVO['companyDriver']['areaName'] = this.common.getAreaName(this, this.chAreaId, this.areaOption);
                        companyDriverVO['companyDriver']['address'] = this.checkInfoForm.address;
                        let company = this.common.fetchData("company");
                        companyDriverVO['companyId'] = company['pkId'],//that.$route.params['register']['companyId'];
                        companyDriverVO['carrierType'] = 1;
                        that.$post("agency/personalAuth", {name:this.checkInfoForm.userName,idCard:this.checkInfoForm.idCard}).then(function (data) {
                            if (data.code == 0) {
                                companyDriverVO['companyDriver']['realStatus'] = 2;
                            } else {
                                companyDriverVO['companyDriver']['realStatus'] = 1;
                            }
                            let upData = {
                                "data": JSON.stringify(companyDriverVO)
                            };
                            that.$post("companyDriver/addOrUpdateDriver", upData).then(function (data) {
                                if (data.code == 0) {
                                    that.$message.error(data.msg);
                                } else {
                                    that.clearData(that);
                                    that.addHeadstock=false;
                                    that.checkInfo=false;
                                    that.updateStock=false;
                                    that.initData();
                                    //that.$router.go(0)
                                }
                            }).catch(res => {
                                console.log(res)
                            })
                        }).catch(res => {
                            console.log(res)
                        })

                    }
                });
            },
            confirmUpBtn() {
                this.$refs.upCheckInfoForm.validate((valid) => {
                    if (valid) {
                        let imageValid = true;
                        let address = this.upCheckInfoForm.address;
                        if(!address){
                            this.$message.info("请输入详细地址！");
                            imageValid = false;
                        }
                        if(!imageValid){
                            return false;
                        }
                        let companyDriverVO = {};
                        let companyDriver = {};
                        let that = this;
                        companyDriver.pkId = this.upCheckInfoForm.pkId ? this.upCheckInfoForm.pkId : "";
                        companyDriver.idCard = this.upCheckInfoForm.idCard;
                        companyDriver.dlNo = this.upCheckInfoForm.dlNo;
                        companyDriver.cardEnd = this.upCheckInfoForm.cardEnd;
                        companyDriver.driverType = this.upCheckInfoForm.driverType;
                        companyDriver.phone = this.upCheckInfoForm.phone;
                        companyDriver.backupPhone = this.upCheckInfoForm.backupPhone;
                        companyDriver.userName = this.upCheckInfoForm.userName;
                        companyDriver.dlAllow = this.upCheckInfoForm.dlAllow;
                        companyDriver.dlDossierNo = this.upCheckInfoForm.dlDossierNo;
                        companyDriver.dlStartTime = this.upCheckInfoForm.dlStartTime;
                        companyDriver.dlEndTime = this.upCheckInfoForm.dlEndTime;
                        companyDriver.dlFirstTime = this.upCheckInfoForm.dlFirstTime;
                        companyDriver.provId = this.upCheckInfoForm.provId;
                        companyDriver.provName = this.common.getProvinceName(this, this.upCheckInfoForm.provId, this.provinceOption);
                        companyDriver.cityId = this.upCheckInfoForm.cityId;
                        companyDriver.cityName = this.common.getCityName(this, this.upCheckInfoForm.cityId, this.cityOption);
                        companyDriver.areaId = this.upCheckInfoForm.areaId;
                        companyDriver.areaName = this.common.getAreaName(this, this.upCheckInfoForm.areaId, this.areaOption);
                        companyDriver.address = this.upCheckInfoForm.address;

                        companyDriverVO.companyDriver = companyDriver;
                        let company = this.common.fetchData("company");
                        companyDriverVO.companyId = company['pkId'],//this.$route.params['register']['companyId'];
                        companyDriverVO.carrierType = 1;
                        let data = {
                            "data": JSON.stringify(companyDriverVO)
                        };
                        that.$post("agency/personalAuth", {name:this.checkInfoForm.userName,idCard:this.checkInfoForm.idCard}).then(function (data) {
                            if (data.code == 0) {
                                companyDriverVO['companyDriver']['realStatus'] = 2;
                            } else {
                                companyDriverVO['companyDriver']['realStatus'] = 1;
                            }
                            let upData = {
                                "data": JSON.stringify(companyDriverVO)
                            };
                            that.$post("companyDriver/addOrUpdateDriver", upData).then(function (data) {
                                if (data.code == 0) {
                                    that.$message.error(data.msg);
                                } else {
                                    // that.$router.go(0)
                                    that.$refs.upCheckInfoForm.resetFields();
                                    that.upCheckInfo=false;
                                    that.uploadPapers=false;
                                    //that.initData();
                                    that.clearData(that);
                                    that.$router.go(0)
                                }
                            }).catch(res => {
                                console.log(res)
                            })
                        }).catch(res => {
                            console.log(res)
                        })

                    }
                });
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
                        that.carDetailsInfo = true;
                    }
                }).catch(res => {
                    console.log(res)
                })
            },
            //驾驶证详情
            dlDetailsInfoShow(pkId) {
                let that = this;
                this.$post("companyDriver/getInfoById", {driverId: pkId}).then(data => {
                    if (data.code == 0) {
                        that.$message.error(data.msg);
                    } else {
                        that.dlInfo = data.resultData.companDriverVO.companyDriver;
                        that.dlInfoDateStr = data.resultData.companDriverVO;
                        data.resultData.companDriverVO.imgs.forEach((v, i) => {
                            if (v.type == 20) {
                                that.dlInfoImg[0] = that.common.CONSTANT.imagePrefix + v.imagePath;
                            } else if (v.type == 21) {
                                that.dlInfoImg[1] = that.common.CONSTANT.imagePrefix + v.imagePath;
                            }
                        });
                        that.dlDetailsInfo = true;
                    }
                }).catch(res => {
                    console.log(res)
                })
            },
            //从业资格证详情
            qcDetailsInfoShow(pkId) {
                let that = this;
                this.$post("companyDriver/getInfoById", {driverId: pkId}).then(data => {
                    if (data.code == 0) {
                        that.$message.error(data.msg);
                    } else {
                        that.qcInfo = data.resultData.companDriverVO.companyDriver;
                        that.dlInfoDateStr = data.resultData.companDriverVO;
                        data.resultData.companDriverVO.imgs.forEach((v, i) => {
                            if (v.type == 22) {
                                that.qcInfoImg = that.common.CONSTANT.imagePrefix + v.imagePath;
                            }

                        });
                        that.qcDetailsInfo = true;
                    }
                }).catch(res => {
                    console.log(res)
                })
            },

            //上传照片提交
            submitPicForm() {
                this.$refs.uploadPapersForm.validate((valid) => {
                    if (valid) {

                        let imageValid = true;
                        if (!this.uploadPapersForm['driver_id_card_front_imageUrl']) {
                            this.$message.info("司机身份证照片上传不全");
                            imageValid = false;
                        }
                        if (!this.uploadPapersForm['driver_id_card_back_imageUrl']) {
                            this.$message.info("司机身份证照片上传不全");
                            imageValid = false;
                        }
                        if (!this.uploadPapersForm['driver_hand_imageUrl']) {
                            this.$message.info("司机身份证照片上传不全");
                            imageValid = false;
                        }
                        if (!this.uploadPapersForm['driver_licence_1st_imageUrl']) {
                            this.$message.info("司机驾驶证照片上传不全");
                            imageValid = false;
                        }
                        if (!this.uploadPapersForm['driver_licence_2nd_imageUrl']) {
                            this.$message.info("司机驾驶证照片上传不全");
                            imageValid = false;
                        }
                        if (this.driverType == 1) {
                            if (!this.uploadPapersForm['driver_qc_card_imageUrl']) {
                                this.$message.info("从业资格证照不能为空");
                                imageValid = false;
                            }
                        }

                        if (!imageValid) {
                            return false;
                        }

                        let companyDriverVO = {};
                        let companyDriver = {};
                        let that = this;
                        companyDriver.pkId = this.driverPkId;
                        if(this.disUserName) {
                            companyDriver.userName = this.disUserName;
                        }
                        if(this.disDlFirstTime){
                            companyDriver.dlFirstTime = this.disDlFirstTime;
                        }
                        if(this.disIdCard){
                            companyDriver.idCard = this.disIdCard;
                        }
                        if(this.disDlAllow){
                            companyDriver.dlAllow = this.disDlAllow;
                        }
                        if(this.disDlNo){
                            companyDriver.dlNo = this.disDlNo;
                        }
                        if(this.disCardEnd){
                            companyDriver.cardEnd = this.disCardEnd;
                        }
                        if(this.disDlName){
                            companyDriver.dlUser= this.disDlName;
                        }
                        if(this.disDossierNo) {
                            companyDriver.dlDossierNo = this.disDossierNo;
                        }


                        let companyImgList = [];
                        if (this.uploadPapersForm['driver_id_card_front_imageUrl']) { //法人身份证个人信息页
                            companyImgList.push(
                                {
                                    pkId: this.findUpdateImagePkId(that.driverImgs, 'driver_id_card_front'),
                                    imageName: this.uploadPapersForm['driver_id_card_front_imageUrl_name'],
                                    imagePath: this.uploadPapersForm['driver_id_card_front_imageUrl'],
                                    type: this.uploadPapersForm['driver_id_card_front_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_id_card_front'
                                }
                            )
                        }
                        if (this.uploadPapersForm['driver_id_card_back_imageUrl']) { //法人身份证国徽页
                            companyImgList.push(
                                {
                                    pkId: this.findUpdateImagePkId(that.driverImgs, 'driver_id_card_back'),
                                    imageName: this.uploadPapersForm['driver_id_card_back_imageUrl_name'],
                                    imagePath: this.uploadPapersForm['driver_id_card_back_imageUrl'],
                                    type: this.uploadPapersForm['driver_id_card_back_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_id_card_back'
                                }
                            )
                        }
                        if (this.uploadPapersForm['driver_hand_imageUrl']) {
                            companyImgList.push(
                                {
                                    pkId: this.findUpdateImagePkId(that.driverImgs, 'driver_hand'),
                                    imageName: this.uploadPapersForm['driver_hand_imageUrl_name'],
                                    imagePath: this.uploadPapersForm['driver_hand_imageUrl'],
                                    type: this.uploadPapersForm['driver_hand_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_hand'
                                }
                            )
                        }
                        if (this.uploadPapersForm['driver_qc_card_imageUrl']) {
                            companyImgList.push(
                                {
                                    pkId: this.findUpdateImagePkId(that.driverImgs, 'driver_qc_card'),
                                    imageName: this.uploadPapersForm['driver_qc_card_imageUrl_name'],
                                    imagePath: this.uploadPapersForm['driver_qc_card_imageUrl'],
                                    type: this.uploadPapersForm['driver_qc_card_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_qc_card'
                                }
                            )
                        }
                        if (this.uploadPapersForm['driver_licence_1st_imageUrl']) { //委托人身份证个人信息页
                            companyImgList.push(
                                {
                                    pkId: this.findUpdateImagePkId(that.driverImgs, 'driver_licence_1st'),
                                    imageName: this.uploadPapersForm['driver_licence_1st_imageUrl_name'],
                                    imagePath: this.uploadPapersForm['driver_licence_1st_imageUrl'],
                                    type: this.uploadPapersForm['driver_licence_1st_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_licence_1st'
                                }
                            )
                        }
                        if (this.uploadPapersForm['driver_licence_2nd_imageUrl']) { //委托人身份证国徽页
                            companyImgList.push(
                                {
                                    pkId: this.findUpdateImagePkId(that.driverImgs, 'driver_licence_2nd'),
                                    imageName: this.uploadPapersForm['driver_licence_2nd_imageUrl_name'],
                                    imagePath: this.uploadPapersForm['driver_licence_2nd_imageUrl'],
                                    type: this.uploadPapersForm['driver_licence_2nd_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_licence_2nd'
                                }
                            )
                        }
                        companyDriverVO.companyDriver = companyDriver;
                        companyDriverVO.imgs = companyImgList;
                        let company = this.common.fetchData("company");
                        companyDriverVO.companyId = company['pkId'],//this.$route.params['register']['companyId'];
                        companyDriverVO.carrierType = 1;

                        let data = {
                            "data": JSON.stringify(companyDriverVO)
                        };

                        this.$post("companyDriver/uploadPic", data).then(function (data) {
                            if (data.code == 0) {
                                that.$message.error(data.msg);
                            } else {
                                that.$post("companyDriver/getInfoById", {driverId: that.driverPkId}).then(function (data) {
                                    if (data.code == 0) {
                                        that.$message.error(data.msg);
                                    } else {
                                        that.initCity(data.resultData.companDriverVO.companyDriver.provId, 'cityOption', ['upCheckInfoForm.cityId', 'upCheckInfoForm.areaId']);
                                        that.initArea(data.resultData.companDriverVO.companyDriver.cityId, 'areaOption', ['upCheckInfoForm.areaId']);
                                        that.upCheckInfoForm = data.resultData.companDriverVO.companyDriver;
                                        that.driverImgs = data.resultData.companDriverVO.imgs
                                        that.upCheckInfo = true;
                                    }
                                })

                            }
                        }).catch(res => {
                            console.log(res)
                        })
                    }
                });
            },
            //编辑司机信息
            updateInfoFun(pkId) {
                this.driverPkId = pkId;
                let that = this;
                this.$post("companyDriver/getInfoById", {driverId: pkId}).then(data => {
                    if (data.code == 0) {
                        that.$message.error(data.msg);
                    } else {
                        that.initCity(data.resultData.companDriverVO.companyDriver.provId, 'cityOption', ['updateForm.cityId', 'updateForm.areaId']);
                        that.initArea(data.resultData.companDriverVO.companyDriver.cityId, 'areaOption', ['updateForm.areaId']);
                        that.updateForm.areaId = data.resultData.companDriverVO.companyDriver.areaId;
                        that.updateForm = data.resultData.companDriverVO.companyDriver;
                        that.driverImgs = data.resultData.companDriverVO.imgs
                        if (data.resultData.companDriverVO.imgs.length > 0) {
                            data.resultData.companDriverVO.imgs.forEach(function (image) {
                                let imageType = image['imageMark'];
                                let imagePath = imageType + "_imageUrl";
                                let imageName = imageType + "_imageUrl_name";
                                that.updateForm[imageName] = image['imageName'];
                                that.updateForm[imagePath] = that.common.CONSTANT.imagePrefix + image['imagePath'];
                            })
                        }
                        that.updateStock = true;
                    }
                }).catch(res => {
                    console.log(res)
                })
            },
            changeCarFun(pkId, driverType, isEdit,isBindCar) {//弹出更换/关联车辆并初始化下拉框
                this.driverPkId = pkId;
                let that = this;
                let company = that.common.fetchData("company");
                let companyId = company['pkId'];//that.$route.params['register']['companyId'];
                this.changeDriverType = driverType;
                this.changeDriverId = pkId;
                this.$post("companyDriver/initBindInfo", {
                    driverId: pkId,
                    companyId: companyId,
                    driverType: driverType,
                    isEdit: isEdit
                }).then(data => {
                    if (data.code == 0) {
                        that.$message.error(data.msg);
                    } else {
                        that.deputyCars = data.resultData.driverBindVO.deputyCar;
                        that.mainCars = data.resultData.driverBindVO.mainCar;
                        that.mainCarsValue = data.resultData.driverBindVO.currMainCarId;
                        that.deputyCarsValue = data.resultData.driverBindVO.currDeputyCarId;
                        that.changeCar = true;
                        if(isBindCar==0){
                            this.showDel=false;
                        }else {
                            this.showDel=true;
                        }
                    }
                }).catch(res => {
                    console.log(res)
                })
            },
            //弹出更换/关联车辆确定按钮
            changeCarSubmit() {
                let that = this;
                let drVo = {
                    driverId: this.changeDriverId,
                    driverType: this.changeDriverType,
                    currMainCarId: this.mainCarsValue,
                    mainCarType:this.getChangeCarType(this.mainCarsValue,this.mainCars),
                    currDeputyCarId: this.deputyCarsValue,
                    deputyCarType:this.getChangeCarType(this.deputyCarsValue,this.deputyCars),
                };
                let data = {
                    'data': JSON.stringify(drVo)
                }
                this.$post("companyDriver/updateBindInfo", data).then(data => {
                    if (data.code == 0) {
                        that.$message.error(data.msg);
                    } else {
                        that.changeDriverId='';
                        that.changeDriverType ='';
                        that.mainCarsValue='';
                        that.deputyCarsValue ='';
                        that.changeCar = false;
                        that.initData();
                    }
                }).catch(res => {
                    console.log(res)
                })
            },
            getChangeCarType(id, option) {
                let car = option.find(t => t.pkId === id);
                return car ? car.carType : "";
            },
            //保存编辑司机信息
            submitUpdateForm() {
                this.$refs.updateForm.validate((valid) => {
                    if (valid) {
                        let companyDriverVO = {};
                        let companyDriver = {};
                        let that = this;
                        companyDriver.pkId = this.driverPkId;
                        companyDriver.phone = this.updateForm.phone;
                        companyDriver.backupPhone = this.updateForm.backupPhone;
                        companyDriver.dlAllow = this.updateForm.dlAllow;
                        companyDriver.dlDossierNo = this.updateForm.dlDossierNo;
                        companyDriver.provId = this.updateForm.provId;
                        companyDriver.provName = this.common.getProvinceName(this, this.updateForm.provId, this.provinceOption);
                        companyDriver.cityId = this.updateForm.cityId;
                        companyDriver.cityName = this.common.getCityName(this, this.updateForm.cityId, this.cityOption);
                        companyDriver.areaId = this.updateForm.areaId;
                        companyDriver.areaName = this.common.getAreaName(this, this.updateForm.areaId, this.areaOption);
                        companyDriver.dlNo = this.updateForm.dlNo;
                        companyDriver.address = this.updateForm.address;
                        companyDriver.driverType = this.updateForm.driverType;
                        companyDriver.qcEndTime = this.updateForm.qcEndTime;
                        companyDriver.qcFirstTime = this.updateForm.qcFirstTime;
                        companyDriver.qcNo = this.updateForm.qcNo;
                        companyDriver.qcStartTime = this.updateForm.qcStartTime;
                        companyDriver.qcType = this.updateForm.qcType;
                        companyDriver.dlStartTime = this.updateForm.dlStartTime;
                        companyDriver.dlEndTime = this.updateForm.dlEndTime;
                        if (this.disUserName) {
                            companyDriver.userName = this.disUserName;

                        } else {
                            companyDriver.userName = this.updateForm.userName;

                        }
                        if (this.disCardEnd) {
                            companyDriver.cardEnd = this.disCardEnd;

                        } else {
                            companyDriver.cardEnd = this.updateForm.cardEnd;
                        }
                        if (this.disIdCard) {
                            companyDriver.idCard = this.disIdCard;
                        } else {
                            companyDriver.idCard = this.updateForm.idCard;
                        }
                        if (this.disDlNo) {
                            companyDriver.dlNo = this.disDlNo;
                        } else {
                            companyDriver.dlNo = this.updateForm.dlNo;
                        }
                        if (this.disDlFirstTime) {
                            companyDriver.dlFirstTime = this.disDlFirstTime;
                        } else {
                            companyDriver.dlFirstTime = this.updateForm.dlFirstTime;

                        }
                        if(this.disDlName){
                            companyDriver.dlUser= this.disDlName;
                        }
                        if(this.disDossierNo) {
                            companyDriver.dlDossierNo = this.disDossierNo;
                        }


                        let companyImgList = [];
                        if (this.updateForm['driver_id_card_front_imageUrl']) { //法人身份证个人信息页
                            companyImgList.push(
                                {
                                    pkId: this.findUpdateImagePkId(that.driverImgs, 'driver_id_card_front'),
                                    imageName: this.updateForm['driver_id_card_front_imageUrl_name'],
                                    imagePath: this.updateForm['driver_id_card_front_imageUrl'],
                                    type: this.updateForm['driver_id_card_front_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_id_card_front'
                                }
                            )
                        }
                        if (this.updateForm['driver_id_card_back_imageUrl']) { //法人身份证国徽页
                            companyImgList.push(
                                {
                                    pkId: this.findUpdateImagePkId(that.driverImgs, 'driver_id_card_back'),
                                    imageName: this.updateForm['driver_id_card_back_imageUrl_name'],
                                    imagePath: this.updateForm['driver_id_card_back_imageUrl'],
                                    type: this.updateForm['driver_id_card_back_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_id_card_back'
                                }
                            )
                        }
                        if (this.updateForm['driver_hand_imageUrl']) { //法人手持身份证
                            companyImgList.push(
                                {
                                    pkId: this.findUpdateImagePkId(that.driverImgs, 'driver_hand'),
                                    imageName: this.updateForm['driver_hand_imageUrl_name'],
                                    imagePath: this.updateForm['driver_hand_imageUrl'],
                                    type: this.updateForm['driver_hand_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_hand'
                                }
                            )
                        }
                        if (this.updateForm['driver_qc_card_imageUrl']) { //法人征信报告
                            companyImgList.push(
                                {
                                    pkId: this.findUpdateImagePkId(that.driverImgs, 'driver_qc_card'),
                                    imageName: this.updateForm['driver_qc_card_imageUrl_name'],
                                    imagePath: this.updateForm['driver_qc_card_imageUrl'],
                                    type: this.updateForm['driver_qc_card_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_qc_card'
                                }
                            )
                        }
                        if (this.updateForm['driver_licence_1st_imageUrl']) { //委托人身份证个人信息页
                            companyImgList.push(
                                {
                                    pkId: this.findUpdateImagePkId(that.driverImgs, 'driver_licence_1st'),
                                    imageName: this.updateForm['driver_licence_1st_imageUrl_name'],
                                    imagePath: this.updateForm['driver_licence_1st_imageUrl'],
                                    type: this.updateForm['driver_licence_1st_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_licence_1st'
                                }
                            )
                        }
                        if (this.updateForm['driver_licence_2nd_imageUrl']) { //委托人身份证国徽页
                            companyImgList.push(
                                {
                                    pkId: this.findUpdateImagePkId(that.driverImgs, 'driver_licence_2nd'),
                                    imageName: this.updateForm['driver_licence_2nd_imageUrl_name'],
                                    imagePath: this.updateForm['driver_licence_2nd_imageUrl'],
                                    type: this.updateForm['driver_licence_2nd_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'driver_licence_2nd'
                                }
                            )
                        }
                        companyDriverVO.companyDriver = companyDriver;
                        companyDriverVO.imgs = companyImgList;
                        let company = this.common.fetchData("company");
                        companyDriverVO.companyId = company['pkId'];//that.$route.params['register']['companyId'];
                        companyDriverVO.carrierType = 1;
                        let data = {
                            "data": JSON.stringify(companyDriverVO)
                        };

                        that.initCity(companyDriver.provId, 'cityOption', ['checkInfoForm.cityId', 'chAreaId']);
                        that.initArea(companyDriver.cityId, 'areaOption', ['chAreaId']);
                        this.chAreaId = companyDriver.areaId;
                        that.checkInfoForm = companyDriverVO.companyDriver;
                        that.driverImgs = companyDriverVO.imgs;
                        that.checkInfo = true;

                        that.companyDriverVOInfo = companyDriverVO;
                    }
                });

            },
            //取消确认信息
            cancelConfirm(){
                let that = this
                that.clearData(that);
                that.updateStock=false;
                that.addHeadstock=false;
                that.checkInfo=false;
                this.uploadPapers=false;
            },
            nextAuth() {
                let that = this;
                let company = this.common.fetchData("company");
                let companyId = company['pkId']
                //that.$route.params['register']['companyId'];
                this.$post("companyDriver/saveNext", {
                    companyId: companyId,
                    type: 6,
                }).then(data => {
                    if (data.code == 0) {
                        that.$message.error(data.msg);
                    } else {
                        company['registerSteps']=6;
                        this.common.saveData('company',company)
                        that.$router.push({
                            path: '/admitWeb/capacity/carTransport/addCarTransportLineInfo',
                            name: 'AddCarTransportLineInfo',
                        });
                    }
                }).catch(res => {
                    console.log(res)
                })
            },
            topPag(){
                let that = this;
                let company = this.common.fetchData("company");
                let carrierType = company['carrierType']
                if(carrierType==1) {
                    that.$router.push({
                        path: '/admitWeb/capacity/carTransport/addBigCarTransportInfo',
                        name: 'AddBigCarTransportInfo',
                    });
                }else {
                    that.$router.push({
                        path: '/admitWeb/capacity/wayRescue/addWayRescueInfo',
                        name: 'AddWayRescueInfo',
                    });
                }
            },
            // 上传照片
            uploadPapersFun(pkid, driverType) {
                this.driverPkId = pkid;
                this.driverType = driverType;
                this.uploadPapers = true;
            },
            //取消上传图片
            cancelUploadPapers(){
                let that =this;
                that.clearData(that);
                that.uploadPapers=false;
                that.checkInfo=false;
            },
            //取消编辑
            cancelUpdateStock(){
                let that = this;
                that.clearData(that);

                that.updateStock=false;
                that.checkInfo=false;
                that.initData();
            },
            //取消添加司机
            cancelAdd(){
                let that = this;
                that.clearData(that);
                that.addHeadstock=false;
                that.checkInfo=false;
            },
            clearData(that){
             that.uploadPapersForm= {},
             that.companyDriverVOInfo= {},
             that.upCheckInfoForm= {areaId:''},
             that.uploadPapersForm= {},
             that.driverForm= {driverType: 1,},
             that.updateForm= {areaId:''},
             that.checkInfoForm= {areaId:''},
             that.chAreaId= '',
             that.driverImgs= [],
             that.disUserName='',
             that.disIdCard='',
             that.disCardEnd='',
             that.disDlAllow='',
             that.disDlFirstTime='',
             that.disDlNo='',
             that.driverPkId= '',
             //that.upChAreaId= '',
             that.driveDlType='',
             that.disDossierNo='',
             that.readonly=false
            },
            openAdd(){
                let that = this;
                that.clearData(that);
                this.addHeadstock =true;
            },
            openUpload(){
                let that = this;
                this.bulkImport = true;
                that.clearUploadData();
            },
            clearUploadData(){
                this.upLoadFile=[];
                document.getElementById("uploadSuccess").style.display="none";
                document.getElementById("uploadFail").style.display="none";
            },
            downLoad(){
                window.location.href = this.common.CONSTANT.UPLOADIMGPATH + "download?downType=3"
            },
            submitUpload(){
                let that  =this;
                let company = this.common.fetchData("company");
                let data = new FormData();
                if(this.$refs.upload.uploadFiles.length) {
                    data.append("file", this.$refs.upload.uploadFiles[0].raw);
                    data.append("companyId", company['pkId'])
                    let config = {headers: {'Content-Type': 'multipart/form-data'}};
                    that.$axios.post(that.upLoadExcel, data, config).then(function (response) {
                        that.upLoadFile=[];
                        let result = JSON.parse(response.data);
                        if(result.flag && (result.flag == 1 || result.flag == "1")){
                            that.$message.success("上传成功!");
                            that.initData();
                            let htmlText = "本次成功上传"+result.count+"条数据；";
                            document.getElementById("uploadSuccess").innerText=htmlText;
                            document.getElementById("uploadFail").style.display="none";
                            document.getElementById("uploadSuccess").style.display="inline";
                        }else{
                            that.$message.error("上传失败!");
                            console.log(result.url);
                            if(result.url && result.url!=""){
                                document.getElementById("errExcel").href=result.url;
                                document.getElementById("uploadSuccess").style.display="none";
                                document.getElementById("uploadFail").style.display="inline";
                            }else{
                                document.getElementById("uploadSuccess").style.display="none";
                                document.getElementById("uploadFail").style.display="none";
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
            showReq(){
                if(this.driverForm.driverType==1){
                    document.getElementById("qcReq").children[0].classList.add("required_flag");
                }else {
                    document.getElementById("qcReq").children[0].classList.remove("required_flag");
                }
            },
            upShowReq(){
                if(this.updateForm.driverType==1){
                    document.getElementById("upQcReq").children[0].classList.add("required_flag");
                }else {
                    document.getElementById("upQcReq").children[0].classList.remove("required_flag");
                }
            },
            longDate(ck){
                if (ck) {
                    this.readonly = true;
                    this.checkInfoForm.cardEnd = '2119-01-01 00:00:00';
                } else {
                    this.readonly = false;
                    this.checkInfoForm.cardEnd = '';
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
