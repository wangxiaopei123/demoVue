<template>
    <div class="case">
      <!--  <Header></Header>  -->
        <div class="header clear">
            <!--<img src="../../images/company/logo.png" alt="logo">-->
            <div class="tabbar">
                <a href="javascript:" @click="$router.push('/Register')">注册</a>
                <a href="javascript:" @click="$router.push('/login')">登录</a>
                <!--<a href="https://www.iyunche.com/index?index=1">返回官网</a>-->
                <!--<a href="javascript:;">常见问题</a>-->
            </div>
        </div>
        <div class="content">
            <div class="content-in">
                <div class="steps-box">
                    <div class="steps steps-step">
                        <el-steps :active="active" finish-status="success" process-status="finish" align-center>
                            <el-step title="企业资料填写"></el-step>
                            <el-step title="企业实名认证"></el-step>
                            <el-step title="认证成功"></el-step>
                        </el-steps>
                    </div>
                </div>
                <el-row>
                    <el-col :span="24" class="info-case">
                        <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="150px"
                                 class="demo-ruleForm">
                            <!--验证时加上（ :rules="rules" ） -->
                            <h2 class="info-title">企业证件</h2>
                            <div class="info-item clear">
                                <el-form-item label="企业名称：" prop="name"><!---验证时加上（ prop="name" ） -->
                                    <el-input v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="统一社会信用代码：" prop="creditCode">
                                    <el-input v-model="ruleForm.creditCode" maxlength="18" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
                                </el-form-item>
                                <el-form-item class="required_flag" label="营业执照：" prop="business_license_imageUrl">
                                    <div class="upload_box">
                                        <el-upload
                                                name="business_license"
                                                class="avatar-uploader"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-model="ruleForm.business_license_imageUrl"
                                                 v-if="business_license_imageUrl" :src="business_license_imageUrl"
                                                 :imageType="business_license_imageUrl_type"
                                                 :imgName="business_license_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '26'">查看示例</div>
                                    </div>
                                </el-form-item>
                                <el-form-item label="组织机构图：">
                                    <div class="upload_box">
                                        <el-upload
                                                class="avatar-uploader"
                                                name="depart_image"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="depart_image_imageUrl" :src="depart_image_imageUrl"
                                                 :imageType="depart_image_imageUrl_type"
                                                 :imgName="depart_image_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '29'">查看示例</div>
                                    </div>
                                </el-form-item>
                                <el-form-item label="企业征信报告">
                                    <el-upload
                                            class="upload-demo"
                                            name="company_credit"
                                            :action="action"
                                            :on-preview="handlePreview"
                                            :before-upload="handleUploadBefore"
                                            :http-request="requestUpload"
                                            :on-success="handleAvatarSuccess"
                                            :limit="1"
                                            :on-exceed="handleExceed"
                                            :file-list="fileList">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <div slot="tip" :imageUrl="company_credit_imageUrl"
                                             :imageType="company_credit_imageUrl_type"
                                             :imgName="company_credit_imageUrl_name" class="el-upload__tip info-tip">
                                            仅支持上传PDF文件,大小在10M以内
                                        </div>
                                    </el-upload>
                                </el-form-item>
                            </div>
                            <h2 class="info-title">道路运输经营许可证</h2>
                            <div class="info-item clear">
                                <el-form-item label="业户名称" prop="licenseName">
                                    <el-input v-model="ruleForm.licenseName" placeholder="请输入许可证上的业户名称"></el-input>
                                </el-form-item>
                                <el-form-item label="许可字号" prop="licenseNo">
                                    <el-input v-model="ruleForm.licenseNo"></el-input>
                                </el-form-item>
                                <el-form-item label="所属省份" prop="licenseProvId">
                                    <el-select v-model="ruleForm.licenseProvId" placeholder="请选择">
                                        <el-option
                                                v-for="item in provinceOption"
                                                :key="item.regionId"
                                                :label="item.name"
                                                :value="item.regionId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="证件有效期" prop="licenseCardtime">
                                    <el-date-picker
                                            v-model="ruleForm.licenseCardtime"
                                            type="date"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item class="required_flag" label="道路运输经营许可证" prop="transport_license_imageUrl">
                                    <div class="upload_box">
                                        <el-upload
                                                class="avatar-uploader"
                                                name="transport_license"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="transport_license_imageUrl" :src="transport_license_imageUrl"
                                                 :imageType="transport_license_imageUrl_type"
                                                 :imgName="transport_license_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '24'">查看示例</div>
                                    </div>
                                </el-form-item>
                            </div>
                            <h2 class="info-title">法定代表人信息</h2>
                            <div class="info-item info-other clear">
                                <el-form-item class="required_flag" label="法人身份证" prop="legal_id_card_front_imageUrl">
                                    <div class="upload_box">
                                        <span class="tit_tit">个人信息页</span>
                                        <el-upload
                                                class="avatar-uploader"
                                                name="legal_id_card_front"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="legal_id_card_front_imageUrl" :src="legal_id_card_front_imageUrl"
                                                 :imageType="legal_id_card_front_imageUrl_type"
                                                 :imgName="legal_id_card_front_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '6'">查看示例</div>
                                    </div>
                                    <div class="upload_box">
                                        <span class="tit_tit">国徽页</span>
                                        <el-upload
                                                class="avatar-uploader"
                                                name="legal_id_card_back"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="legal_id_card_back_imageUrl" :src="legal_id_card_back_imageUrl"
                                                 :imageType="legal_id_card_back_imageUrl_type"
                                                 :imgName="legal_id_card_back_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '7'">查看示例</div>
                                    </div>
                                    <div class="upload_box">
                                        <span class="tit_tit">手持身份证</span>
                                        <el-upload
                                                class="avatar-uploader"
                                                name="legal_hand"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="legal_hand_imageUrl" :src="legal_hand_imageUrl"
                                                 :imageType="legal_hand_imageUrl_type" :imgName="legal_hand_imageUrl_name"
                                                 class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '8'">查看示例</div>
                                    </div>
                                </el-form-item>
                                <el-form-item label="法人征信报告">
                                    <el-upload
                                            class="upload-demo"
                                            name="legal_credit"
                                            :action="action"
                                            :on-preview="handlePreview"
                                            :before-upload="handleUploadBefore"
                                            :http-request="requestUpload"
                                            :on-success="handleAvatarSuccess"
                                            :limit="1"
                                            :on-exceed="handleExceed"
                                            :file-list="fileList">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <div slot="tip" :imageUrl="legal_credit_imageUrl"
                                             :imageType="legal_credit_imageUrl_type"
                                             :imgName="legal_credit_imageUrl_name" class="el-upload__tip info-tip">
                                            仅支持上传PDF文件,大小在10M以内
                                        </div>
                                    </el-upload>
                                </el-form-item>
                            </div>
                            <h2 class="info-title">委托人信息（业务负责人）</h2>

                            <div class="info-item info-other clear">
                                <el-form-item class="required_flag" label="委托人身份证" prop="agent_id_card_front_imageUrl">
                                    <div class="upload_box">
                                        <span class="tit_tit">个人信息页</span>
                                        <el-upload
                                                class="avatar-uploader"
                                                name="agent_id_card_front"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="agent_id_card_front_imageUrl" :src="agent_id_card_front_imageUrl"
                                                 :imageType="agent_id_card_front_imageUrl_type"
                                                 :imgName="agent_id_card_front_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '6'">查看示例</div>
                                    </div>
                                    <div class="upload_box">
                                        <span class="tit_tit">国徽页</span>
                                        <el-upload
                                                class="avatar-uploader"
                                                name="agent_id_card_back"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="agent_id_card_back_imageUrl" :src="agent_id_card_back_imageUrl"
                                                 :imageType="agent_id_card_back_imageUrl_type"
                                                 :imgName="agent_id_card_back_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '7'">查看示例</div>
                                    </div>
                                    <div class="upload_box">
                                        <span class="tit_tit">手持身份证</span>
                                        <el-upload
                                                class="avatar-uploader"
                                                name="agent_hand"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="agent_hand_imageUrl" :src="agent_hand_imageUrl"
                                                 :imageType="agent_hand_imageUrl_type" :imgName="agent_hand_imageUrl_type"
                                                 class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '8'">查看示例</div>
                                    </div>
                                </el-form-item>
                                <el-form-item class="required_flag" label="委托人授权书" prop="agent_authorize_imageUrl">
                                    <div class="upload_box sqs_box">
                                        <span class="tit_tit tit_tip">授权书必须盖有单位公章或财务专用章<a href="javascript:" @click="downlode('委托书.docx')">下载委托人授权书模板</a></span>
                                        <el-upload
                                                class="avatar-uploader"
                                                name="agent_authorize"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="agent_authorize_imageUrl" :src="agent_authorize_imageUrl"
                                                 :imageType="agent_authorize_imageUrl_type"
                                                 :imgName="agent_authorize_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            <div slot="tip" class="el-upload__tip info-tip">

                                            </div>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '25'">查看示例</div>
                                    </div>
                                </el-form-item>
                            </div>
                            <h2 class="info-title">企业办公场地信息</h2>

                            <div class="info-item info-other clear">
                                <el-form-item label="门头照片">
                                    <div class="upload_box">
                                        <span class="tit_tit">办公室门头照</span>
                                        <el-upload
                                                class="avatar-uploader"
                                                name="office_head"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="office_head_imageUrl" :src="office_head_imageUrl"
                                                 :imageType="office_head_imageUrl_type" :imgName="office_head_imageUrl_name"
                                                 class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '23'">查看示例</div>
                                    </div>
                                    <div class="upload_box">
                                        <span class="tit_tit">运作场地门头照</span>
                                        <el-upload
                                                class="avatar-uploader"
                                                name="office_operation"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="office_operation_imageUrl" :src="office_operation_imageUrl"
                                                 :imageType="office_operation_imageUrl_type"
                                                 :imgName="office_operation_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '28'">查看示例</div>
                                    </div>
                                </el-form-item>
                                <el-form-item class="required_flag" label="办公室办公照片" style="height:170px" prop="office_picture1_imageUrl">
                                    <div class="upload_box">
                                        <el-upload
                                                class="avatar-uploader"
                                                name="office_picture1"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="office_picture1_imageUrl" :src="office_picture1_imageUrl"
                                                 :imageType="office_picture1_imageUrl_type"
                                                 :imgName="office_picture1_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '22'">查看示例</div>
                                    </div>
                                    <div class="upload_box">
                                        <el-upload
                                                class="avatar-uploader"
                                                name="office_picture2"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="office_picture2_imageUrl" :src="office_picture2_imageUrl"
                                                 :imageType="office_picture2_imageUrl_type"
                                                 :imgName="office_picture2_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '22'">查看示例</div>
                                    </div>
                                    <div class="upload_box">
                                        <el-upload
                                            class="avatar-uploader"
                                            name="office_picture3"
                                            :action="action"
                                            :show-file-list="false"
                                            :http-request="requestUpload"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="common.beforeAvatarUpload">
                                        <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="office_picture3_imageUrl" :src="office_picture3_imageUrl"
                                                 :imageType="office_picture3_imageUrl_type"
                                                 :imgName="office_picture3_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '22'">查看示例</div>
                                    </div>
                                </el-form-item>
                                <el-form-item label="办公室地址" class="address" prop="cityId">
                                    <el-select v-model="ruleForm.provId" placeholder="请选择省"
                                               @change="initCity(ruleForm.provId,'addressCityOption',['ruleForm.cityId','ruleForm.areaId'])">
                                        <el-option
                                                v-for="item in addressProvinceOption"
                                                :key="item.regionId"
                                                :label="item.name"
                                                :value="item.regionId">
                                        </el-option>
                                    </el-select>
                                    <el-select v-model="ruleForm.cityId" placeholder="请选择市" filterable
                                               @change="initArea(ruleForm.cityId,'addressAreaOption',['ruleForm.areaId'])">
                                        <el-option
                                                v-for="item in addressCityOption"
                                                :key="item.regionId"
                                                :label="item.name"
                                                :value="item.regionId">
                                        </el-option>
                                    </el-select>
                                    <el-select v-model="ruleForm.areaId" placeholder="请选择区" filterable>
                                        <el-option
                                                v-for="item in addressAreaOption"
                                                :key="item.regionId"
                                                :label="item.name"
                                                :value="item.regionId">
                                        </el-option>
                                    </el-select>

                                    <el-input v-model="ruleForm.address" class="width-other">
                                        <template slot="append"><span @click="openMap($event,'address')"><i
                                                class="el-icon-location-outline"></i></span></template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item class="required_flag" :inline="true" label="运作场地照片" prop="operation_picture1_imageUrl">
                                    <div class="upload_box">
                                        <el-upload
                                                class="avatar-uploader"
                                                name="operation_picture1"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="operation_picture1_imageUrl" :src="operation_picture1_imageUrl"
                                                 :imageType="operation_picture1_imageUrl_type"
                                                 :imgName="operation_picture1_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '27'">查看示例</div>
                                    </div>
                                    <div class="upload_box">
                                        <el-upload
                                                class="avatar-uploader"
                                                name="operation_picture2"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="operation_picture2_imageUrl" :src="operation_picture2_imageUrl"
                                                 :imageType="operation_picture2_imageUrl_type"
                                                 :imgName="operation_picture2_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '27'">查看示例</div>
                                    </div>
                                    <div class="upload_box">
                                        <el-upload
                                                class="avatar-uploader"
                                                name="operation_picture3"
                                                :action="action"
                                                :show-file-list="false"
                                                :http-request="requestUpload"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="common.beforeAvatarUpload">
                                            <!--图片验证 :before-upload="common.beforeAvatarUpload" -->
                                            <img v-if="operation_picture3_imageUrl" :src="operation_picture3_imageUrl"
                                                 :imageType="operation_picture3_imageUrl_type"
                                                 :imgName="operation_picture3_imageUrl_name" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <div class="check_eg" @click="sampleImg = true,sampleType = '27'">查看示例</div>
                                    </div>
                                </el-form-item>
                                <el-form-item label="运作场地类型" prop="fieldType">
                                    <el-radio v-model="ruleForm.fieldType" label="1">自有</el-radio>
                                    <el-radio v-model="ruleForm.fieldType" label="2">共享</el-radio>
                                </el-form-item>
                                <el-form-item label="最大空位数" prop="fieldMaxVacancy">
                                    <el-input v-model="ruleForm.fieldMaxVacancy" ></el-input>
                                </el-form-item>
                                <el-form-item label="运作场地地址" class="address" prop="fieldCityId">
                                    <el-select v-model="ruleForm.fieldProvId" placeholder="请选择省"
                                               @change="initCity(ruleForm.fieldProvId,'fieldCityOption',['ruleForm.fieldCityId','ruleForm.fieldAreaId'])">
                                        <el-option
                                                v-for="item in fieldProvinceOption"
                                                :key="item.regionId"
                                                :label="item.name"
                                                :value="item.regionId">
                                        </el-option>
                                    </el-select>
                                    <el-select v-model="ruleForm.fieldCityId" placeholder="请选择市" filterable
                                               @change="initArea(ruleForm.fieldCityId,'fieldAreaOption',['ruleForm.fieldAreaId'])">
                                        <el-option
                                                v-for="item in fieldCityOption"
                                                :key="item.regionId"
                                                :label="item.name"
                                                :value="item.regionId">
                                        </el-option>
                                    </el-select>
                                    <el-select v-model="ruleForm.fieldAreaId" placeholder="请选择区" filterable>
                                        <el-option
                                                v-for="item in fieldAreaOption"
                                                :key="item.regionId"
                                                :label="item.name"
                                                :value="item.regionId">
                                        </el-option>
                                    </el-select>

                                    <el-input v-model="ruleForm.fieldAddress" class="width-other">
                                        <template slot="append"><span @click="openMap($event,'fieldAddress')"><i
                                                class="el-icon-location-outline"></i></span></template>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <el-form-item>
                                <el-button v-loading="loading" type="primary" @click="submitForm">下一步</el-button>
                            </el-form-item>

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
                                           @click="dialogFormVisible = false;ruleForm[MapClass] = clickAddressDetail">确 定</el-button>
                              </span>
                            </el-dialog>

                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </div>
        <SampleGraph :visible.sync="sampleImg" :sampleType="sampleType"></SampleGraph>
    </div>

</template>
<script>
    import SampleGraph from '../admitWeb/SampleGraph'  //示例图
    import Header from '../frame/Header'  //头部
    export default {
        components:{
            'SampleGraph':SampleGraph,
            'Header':Header
        },
        mounted() {

        },
        created() {
            this.carrierType = this.$route.params['carrierType'];
            let register = this.common.fetchData("register");
            if (!register) {
                this.$message.info("访问异常，请重新登录");
                this.$router.push({
                    name: 'Login'
                })
            } else {
                let authentic = this.common.fetchData("authentic");
                if (authentic) {
                    this.logisticsType = authentic['ltdCompany']['logisticsType'];
                    this.carrierType = authentic['ltdCompany']['carrierType'];
                    if (authentic.companyImgList && authentic.companyImgList.length > 0) {
                        let that = this;
                        authentic.companyImgList.forEach(function (image) {
                            let imageType = image['imageMark'];
                            let imagePath = imageType + "_imageUrl";
                            let imageName = imageType + "_imageUrl_name";
                            that[imageName] = image['imageName'];
                            that[imagePath] = that.common.CONSTANT.imagePrefix + image['imagePath'];
                        })
                    }
                    if (authentic.ltdCompanyOffice && authentic.ltdCompanyOffice['provId']) {
                        this.common.getCity(this, authentic.ltdCompanyOffice['provId'], 'addressCityOption');
                    }
                    if (authentic.ltdCompanyOffice && authentic.ltdCompanyOffice['cityId']) {
                        this.common.getArea(this, authentic.ltdCompanyOffice['cityId'], 'addressAreaOption');
                    }
                    if (authentic.ltdCompanyOffice && authentic.ltdCompanyOffice['fieldProvId']) {
                        this.common.getCity(this, authentic.ltdCompanyOffice['fieldProvId'], 'fieldCityOption');
                    }
                    if (authentic.ltdCompanyOffice && authentic.ltdCompanyOffice['fieldCityId']) {
                        this.common.getArea(this, authentic.ltdCompanyOffice['fieldCityId'], 'fieldAreaOption');
                    }
                }
                this.phone = register['phone'];
                this.companyId = register['companyId'];
                this.belongLtdType = register['belongLtdType'];
                this.initProvince(this);
            }

        },
        data() {
            let authentic = this.common.fetchData("authentic");
            let ruleForm = {};
            if (authentic) {
                if (authentic.ltdCompany) {
                    ruleForm.name = authentic.ltdCompany.name;
                    ruleForm.creditCode = authentic.ltdCompany.creditCode;
                }
                if (authentic.ltdCompanyTransportLicense) {
                    ruleForm.licenseName = authentic.ltdCompanyTransportLicense.licenseName;
                    ruleForm.licenseNo = authentic.ltdCompanyTransportLicense.licenseNo;
                    ruleForm.licenseProvId = authentic.ltdCompanyTransportLicense.licenseProvId;
                    ruleForm.licenseCardtime = authentic.ltdCompanyTransportLicense.licenseCardtime;
                }
                if (authentic.ltdCompanyOffice) {
                    ruleForm.provId = authentic.ltdCompanyOffice.provId ? authentic.ltdCompanyOffice.provId : null;
                    ruleForm.cityId = authentic.ltdCompanyOffice.cityId ? authentic.ltdCompanyOffice.cityId : null;
                    ruleForm.areaId = authentic.ltdCompanyOffice.areaId ? authentic.ltdCompanyOffice.areaId : null;
                    ruleForm.address = authentic.ltdCompanyOffice.address;
                    ruleForm.fieldMaxVacancy = authentic.ltdCompanyOffice.fieldMaxVacancy;
                    ruleForm.fieldProvId = authentic.ltdCompanyOffice.fieldProvId ? authentic.ltdCompanyOffice.fieldProvId : null;
                    ruleForm.fieldCityId = authentic.ltdCompanyOffice.fieldCityId ? authentic.ltdCompanyOffice.fieldCityId : null;
                    ruleForm.fieldAreaId = authentic.ltdCompanyOffice.fieldAreaId ? authentic.ltdCompanyOffice.fieldAreaId : null;
                    ruleForm.fieldAddress = authentic.ltdCompanyOffice.fieldAddress;
                    ruleForm.fieldType = authentic.ltdCompanyOffice.fieldType ? authentic.ltdCompanyOffice.fieldType + '' : null;
                }
                if (authentic.companyImgList && authentic.companyImgList.length > 0) {
                    let that = this;
                    authentic.companyImgList.forEach(function (image) {
                        let imageType = image['imageMark'];
                        let imagePath = imageType + "_imageUrl";
                        ruleForm[imagePath] = that.common.CONSTANT.imagePrefix + image['imagePath'];
                    })
                }
            } else {
                // ruleForm.fieldAreaId = '';
                // ruleForm.areaId = '';
                ruleForm = Object.assign({}, this.ruleForm, {fieldAreaId:'',areaId:'',address:'',fieldAddress:''});

            }

            return {
                loading: false,
                carrierType: '',
                phone: '',
                logisticsType: '',
                companyId : '',
                belongLtdType: '',
                sampleImg: false,
                sampleType:'',
                //地图
                dialogFormVisible: false,
                center: '北京',
                MapClass: "",
                position: "",
                clickAddressDetail:'点击选取地址',
                active: 0, //步骤栏默认
                fileList: [],
                provinceOption: [],
                addressProvinceOption: [],
                addressCityOption: [],
                addressAreaOption: [],
                fieldProvinceOption: [],
                fieldCityOption: [],
                fieldAreaOption: [],
                value: '',
                action: this.common.CONSTANT.UPLOADIMGPATH + 'recognizeImage',
                business_license_imageUrl: '',
                business_license_imageUrl_type: '',
                business_license_imageUrl_name: '',
                depart_image_imageUrl: '',
                depart_image_imageUrl_type: '',
                depart_image_imageUrl_name: '',
                transport_license_imageUrl: '',
                transport_license_imageUrl_type: '',
                transport_license_imageUrl_name: '',
                legal_id_card_front_imageUrl: '',
                legal_id_card_front_imageUrl_type: '',
                legal_id_card_front_imageUrl_name: '',
                legal_id_card_back_imageUrl: '',
                legal_id_card_back_imageUrl_type: '',
                legal_id_card_back_imageUrl_name: '',
                legal_hand_imageUrl: '',
                legal_hand_imageUrl_type: '',
                legal_hand_imageUrl_name: '',
                agent_id_card_front_imageUrl: '',
                agent_id_card_front_imageUrl_type: '',
                agent_id_card_front_imageUrl_name: '',
                agent_id_card_back_imageUrl: '',
                agent_id_card_back_imageUrl_type: '',
                agent_id_card_back_imageUrl_name: '',
                agent_hand_imageUrl: '',
                agent_hand_imageUrl_type: '',
                agent_hand_imageUrl_name: '',
                agent_authorize_imageUrl: '',
                agent_authorize_imageUrl_type: '',
                agent_authorize_imageUrl_name: '',
                office_head_imageUrl: '',
                office_head_imageUrl_type: '',
                office_head_imageUrl_name: '',
                office_operation_imageUrl: '',
                office_operation_imageUrl_type: '',
                office_operation_imageUrl_name: '',
                office_picture1_imageUrl: '',
                office_picture1_imageUrl_type: '',
                office_picture1_imageUrl_name: '',
                office_picture2_imageUrl: '',
                office_picture2_imageUrl_type: '',
                office_picture2_imageUrl_name: '',
                office_picture3_imageUrl: '',
                office_picture3_imageUrl_type: '',
                office_picture3_imageUrl_name: '',
                operation_picture1_imageUrl: '',
                operation_picture1_imageUrl_type: '',
                operation_picture1_imageUrl_name: '',
                operation_picture2_imageUrl: '',
                operation_picture2_imageUrl_type: '',
                operation_picture2_imageUrl_name: '',
                operation_picture3_imageUrl: '',
                operation_picture3_imageUrl_type: '',
                operation_picture3_imageUrl_name: '',
                company_credit_imageUrl: '',
                company_credit_imageUrl_type: '',
                company_credit_imageUrl_name: '',
                legal_credit_imageUrl: '',
                legal_credit_imageUrl_type: '',
                legal_credit_imageUrl_name: '',
                ruleForm: ruleForm,
                rules: {
                    name: [
                        {required: true, message: '此项不能为空', trigger: 'blur'},
                        {validator: this.common.checkCompanyName, trigger: 'blur'}
                    ],
                    creditCode: {required: true, message: '此项不能为空', trigger: 'blur'},
                    licenseName: {required: true, trigger: 'blur' ,validator: this.common.checkUserName},
                    licenseNo: {required: true, trigger: 'blur' ,validator: this.common.checkLicenseNo},
                    licenseProvId: {required: true, message: '此项不能为空', trigger: 'blur'},
                    licenseCardtime: {required: true, message: '此项不能为空', trigger: 'blur'},
                    cityId: {required: true, message: '此项不能为空', trigger: 'blur'},
                    fieldType: {required: true, message: '此项不能为空', trigger: 'blur'},
                    fieldCityId: {required: true, message: '此项不能为空', trigger: 'blur'},
                    fieldMaxVacancy: {message: '必须为数字且长度不能超过6位',max: 6, trigger: 'blur',validator: this.common.checkNumber},
                    // fieldMaxVacancy: {required: false ,type: 'number', message: '必须为数字且长度不能超过6位',max: 6, trigger: 'blur'},
                    // business_license_imageUrl:{required: true, message: '此项不能为空111', trigger: 'change'},
                    // transport_license_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},
                    // legal_id_card_front_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},
                    // // legal_id_card_back_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},
                    // // legal_hand_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},
                    // agent_id_card_front_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},
                    // // agent_id_card_back_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},
                    // // agent_hand_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},
                    // agent_authorize_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},
                    // office_picture1_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},
                    // // office_picture2_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},
                    // // office_picture3_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},
                    // operation_picture1_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'}
                    // // operation_picture2_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},
                    // // operation_picture3_imageUrl:{required: true, message: '此项不能为空', trigger: 'blur'},

                },
            }
        },
        methods: {
            //初始化城市
            initProvince: function () {
                this.common.initProvince(this, ["provinceOption", "addressProvinceOption", "fieldProvinceOption"])
            },
            //加载城市
            initCity: function (value, cityKey, clearKeys) {
                this.common.initCity(this, value, cityKey, clearKeys);
            },
            initArea: function (value, dataKey, clearKeys) {
                this.ruleForm.fieldAreaId = '';
                this.common.initArea(this, value, dataKey, clearKeys)
            },
            /********图片校验 start**********/
            requestUpload(obj) {
                obj.companyId = this.companyId;
                this.common.uploadImgFun(obj, this);
            },
            handleAvatarSuccess(response, file) {
                let data = JSON.parse(response.data);
                let imageType = data['resultData']['imageType'];
                let imageTypeValue = data['resultData']['imageTypeValue'];
                let filePath = data['resultData']['filePath'];
                let attrs = data['resultData']['attrs'];
                let imageUrl = imageType + "_imageUrl";
                let imageUrlType = imageUrl + "_type";
                let imageUrlName = imageUrl + "_name";
                // this[imageUrlName] = URL.createObjectURL(file.raw);
                this[imageUrl] = filePath;
                this[imageUrlType] = imageTypeValue;
                this[imageUrlName] = file.name;
                let authenticData = this.common.fetchData("authentic");
                authenticData = authenticData ? authenticData : {};
                let ltdCompany = {};
                if (authenticData['ltdCompany']) {
                    ltdCompany = authenticData['ltdCompany'];
                }
                let ltdCompanyLegalPerson = {}; //法人身份证识别信息
                if (authenticData['ltdCompanyLegalPerson']) {
                    ltdCompanyLegalPerson = authenticData['ltdCompanyLegalPerson'];
                }
                let ltdCompanyAgent = {}; //委托人身份证识别信息
                if (authenticData['ltdCompanyAgent']) {
                    ltdCompanyAgent = authenticData['ltdCompanyAgent'];
                }
                if ("business_license" === imageType) { //营业执照
                    if (attrs) {
                        this.ruleForm = Object.assign({}, this.ruleForm, {name:'',creditCode:''});
                        ltdCompany.name = attrs['businessName'];
                        if (!this.ruleForm.name) this.ruleForm.name = ltdCompany.name;
                        ltdCompany.creditCode = attrs['businessRegName'];
                        if (!this.ruleForm.creditCode && ltdCompany.creditCode) this.ruleForm.creditCode = ltdCompany.creditCode;
                        ltdCompany.regAddress = attrs['businessAddress'];
                        ltdCompany.businessScope = attrs['businessScope'];
                        ltdCompany.businessTerm = attrs['businessValidPeriod'];
                        ltdCompany.regCapital = attrs['businessCaptial'];
                    }
                    authenticData.ltdCompany = ltdCompany;
                } else if ("legal_id_card_front" === imageType) { //法人身份证个人信息页
                    if (attrs) {
                        ltdCompanyLegalPerson.legalPersonName = attrs['idName'];
                        ltdCompanyLegalPerson.legalPersonCard = attrs['idNumber'];
                    }
                    authenticData.ltdCompanyLegalPerson = ltdCompanyLegalPerson;
                } else if ("legal_id_card_back" === imageType) { //法人身份证国徽页
                    if (attrs) {
                        if (attrs['idValidity'])
                            ltdCompanyLegalPerson.legalPersonCardtime = attrs['idValidity'].split('-')[1].trim().replace(/\./g, '-');
                    }
                    authenticData.ltdCompanyLegalPerson = ltdCompanyLegalPerson;
                } else if ("agent_id_card_front" === imageType) { //委托人身份证个人信息页
                    if (attrs) {
                        ltdCompanyAgent.agentName = attrs['idName'];
                        ltdCompanyAgent.agentCard = attrs['idNumber'];
                    }
                    authenticData.ltdCompanyAgent = ltdCompanyAgent;
                } else if ("agent_id_card_back" === imageType) { //委托人身份证国徽页
                    if (attrs) {
                        if (attrs['idValidity'])
                            ltdCompanyAgent.agentCardtime = attrs['idValidity'].split('-')[1].trim().replace(/\./g, '-');
                    }
                    authenticData.ltdCompanyAgent = ltdCompanyAgent;
                }
                this.common.saveData("authentic", authenticData);
            },
            /********图片校验 end**********/
            /********文件校验 start**********/
            handleUploadBefore(file) {
                const isPDF = file.type === 'application/pdf';
                if (!isPDF) {
                    this.$message.error('只能上传pdf文件!');
                    return false;
                }
                const isLt10M = file.size / 1024 / 1024 < 10;
                if (!isLt10M) {
                    this.$message.error('上传文件大小不能超过 10MB!');
                    return false;
                }
                return true;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file)
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            /********文件校验 end**********/
            submitForm() {
                //此处放提交的代码
                this.$refs.ruleForm.validate((valid) => {

                    if (valid) {
                        let imageValid = true;

                        if (!this['business_license_imageUrl']) {
                            this.$message.info("营业执照不能为空");
                            imageValid = false;
                        }
                        if (!this['transport_license_imageUrl']) {
                            this.$message.info("道路运输经营许可证不能为空");
                            imageValid = false;
                        }
                        if (!this['legal_id_card_front_imageUrl'] || !this['legal_id_card_back_imageUrl'] || !this['legal_hand_imageUrl']) {
                            this.$message.info("法人身份证照片上传不全");
                            imageValid = false;
                        }
                        if (!this['agent_id_card_front_imageUrl'] || !this['agent_id_card_back_imageUrl'] || !this['agent_hand_imageUrl']) {
                            this.$message.info("委托人身份证照片上传不全");
                            imageValid = false;
                        }
                        if (!this['agent_authorize_imageUrl']) {
                            this.$message.info("委托人授权书不能为空");
                            imageValid = false;
                        }
                        if (!this['office_picture1_imageUrl'] || !this['office_picture2_imageUrl'] || !this['office_picture3_imageUrl']) {
                            this.$message.info("办公室办公照片上传不全");
                            imageValid = false;
                        }
                        if (!this['operation_picture1_imageUrl'] || !this['operation_picture2_imageUrl'] || !this['operation_picture3_imageUrl']) {
                            this.$message.info("运作场地照片上传不全");
                            imageValid = false;
                        }
                        if (!imageValid) {
                            return false;
                        }

                        this.loading = true;

                        let belongLtdType = this.belongLtdType;
                        let authenticData = this.common.fetchData("authentic");

                        //企业信息
                        if (!authenticData['ltdCompany']) authenticData['ltdCompany'] = {};
                        authenticData['ltdCompany']['name'] = this.ruleForm.name;
                        authenticData['ltdCompany']['creditCode'] = this.ruleForm.creditCode;
                        if (belongLtdType) {
                            authenticData['ltdCompany']['logisticsType'] = 2; //非物流
                            if (belongLtdType.indexOf('1') != -1) authenticData['ltdCompany']['logisticsType'] = 1;//物流
                        }
                        //道路运输经营许可证
                        if (!authenticData['ltdCompanyTransportLicense']) authenticData['ltdCompanyTransportLicense'] = {};
                        authenticData['ltdCompanyTransportLicense']['licenseName'] = this.ruleForm.licenseName;
                        authenticData['ltdCompanyTransportLicense']['licenseNo'] = this.ruleForm.licenseNo;
                        authenticData['ltdCompanyTransportLicense']['licenseProvId'] = this.ruleForm.licenseProvId;
                        authenticData['ltdCompanyTransportLicense']['licenseProvName'] = this.common.getProvinceName(this, this.ruleForm.licenseProvId, this.provinceOption);
                        authenticData['ltdCompanyTransportLicense']['licenseCardtime'] = this.ruleForm.licenseCardtime;
                        //企业办公场地信息
                        if (!authenticData['ltdCompanyOffice']) authenticData['ltdCompanyOffice'] = {};
                        authenticData['ltdCompanyOffice']['fieldType'] = this.ruleForm.fieldType;
                        authenticData['ltdCompanyOffice']['fieldMaxVacancy'] = this.ruleForm.fieldMaxVacancy;

                        //办公室地址
                        authenticData['ltdCompanyOffice']['provId'] = this.ruleForm.provId;
                        authenticData['ltdCompanyOffice']['provName'] = this.common.getProvinceName(this, this.ruleForm.provId, this.addressProvinceOption);
                        authenticData['ltdCompanyOffice']['cityId'] = this.ruleForm.cityId;
                        authenticData['ltdCompanyOffice']['cityName'] = this.common.getCityName(this, this.ruleForm.cityId, this.addressCityOption);
                        authenticData['ltdCompanyOffice']['areaId'] = this.ruleForm.areaId;
                        authenticData['ltdCompanyOffice']['areaName'] = this.common.getAreaName(this, this.ruleForm.areaId, this.addressAreaOption);
                        authenticData['ltdCompanyOffice']['address'] = this.ruleForm.address;


                        //运作场地地址
                        authenticData['ltdCompanyOffice']['fieldProvId'] = this.ruleForm.fieldProvId;
                        authenticData['ltdCompanyOffice']['fieldProvName'] = this.common.getProvinceName(this, this.ruleForm.fieldProvId, this.fieldProvinceOption);
                        authenticData['ltdCompanyOffice']['fieldCityId'] = this.ruleForm.fieldCityId;
                        authenticData['ltdCompanyOffice']['fieldCityName'] = this.common.getCityName(this, this.ruleForm.fieldCityId, this.fieldCityOption);
                        authenticData['ltdCompanyOffice']['fieldAreaId'] = this.ruleForm.fieldAreaId;
                        authenticData['ltdCompanyOffice']['fieldAreaName'] = this.common.getAreaName(this, this.ruleForm.fieldAreaId, this.fieldAreaOption);
                        authenticData['ltdCompanyOffice']['fieldAddress'] = this.ruleForm.fieldAddress;

                        //资源文件集合
                        let companyImgList = [];
                        if (this['business_license_imageUrl']) { //营业执照
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'business_license_imageUrl'),
                                    imageName: this['business_license_imageUrl_name'],
                                    imagePath: this['business_license_imageUrl'],
                                    type: this['business_license_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'business_license'
                                }
                            )
                        }
                        if (this['depart_image_imageUrl']) { //组织机构图
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'depart_image_imageUrl'),
                                    imageName: this['depart_image_imageUrl_name'],
                                    imagePath: this['depart_image_imageUrl'],
                                    type: this['depart_image_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'depart_image'
                                }
                            )
                        }
                        if (this['company_credit_imageUrl']) { //企业征信报告
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'company_credit_imageUrl'),
                                    imageName: this['company_credit_imageUrl_name'],
                                    imagePath: this['company_credit_imageUrl'],
                                    type: this['company_credit_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'company_credit'
                                }
                            )
                        }
                        if (this['transport_license_imageUrl']) { //道路运输经营许可证
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'transport_license_imageUrl'),
                                    imageName: this['transport_license_imageUrl_name'],
                                    imagePath: this['transport_license_imageUrl'],
                                    type: this['transport_license_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'transport_license'
                                }
                            )
                        }
                        if (this['legal_id_card_front_imageUrl']) { //法人身份证个人信息页
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'legal_id_card_front_imageUrl'),
                                    imageName: this['legal_id_card_front_imageUrl_name'],
                                    imagePath: this['legal_id_card_front_imageUrl'],
                                    type: this['legal_id_card_front_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'legal_id_card_front'
                                }
                            )
                        }
                        if (this['legal_id_card_back_imageUrl']) { //法人身份证国徽页
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'legal_id_card_back_imageUrl'),
                                    imageName: this['legal_id_card_back_imageUrl_name'],
                                    imagePath: this['legal_id_card_back_imageUrl'],
                                    type: this['legal_id_card_back_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'legal_id_card_back'
                                }
                            )
                        }
                        if (this['legal_hand_imageUrl']) { //法人手持身份证
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'legal_hand_imageUrl'),
                                    imageName: this['legal_hand_imageUrl_name'],
                                    imagePath: this['legal_hand_imageUrl'],
                                    type: this['legal_hand_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'legal_hand'
                                }
                            )
                        }
                        if (this['legal_credit_imageUrl']) { //法人征信报告
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'legal_credit_imageUrl'),
                                    imageName: this['legal_credit_imageUrl_name'],
                                    imagePath: this['legal_credit_imageUrl'],
                                    type: this['legal_credit_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'legal_credit'
                                }
                            )
                        }
                        if (this['agent_id_card_front_imageUrl']) { //委托人身份证个人信息页
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'agent_id_card_front_imageUrl'),
                                    imageName: this['agent_id_card_front_imageUrl_name'],
                                    imagePath: this['agent_id_card_front_imageUrl'],
                                    type: this['agent_id_card_front_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'agent_id_card_front'
                                }
                            )
                        }
                        if (this['agent_id_card_back_imageUrl']) { //委托人身份证国徽页
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'agent_id_card_back_imageUrl'),
                                    imageName: this['agent_id_card_back_imageUrl_name'],
                                    imagePath: this['agent_id_card_back_imageUrl'],
                                    type: this['agent_id_card_back_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'agent_id_card_back'
                                }
                            )
                        }
                        if (this['agent_hand_imageUrl']) { //委托人手持身份证
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'agent_hand_imageUrl'),
                                    imageName: this['agent_hand_imageUrl_name'],
                                    imagePath: this['agent_hand_imageUrl'],
                                    type: this['agent_hand_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'agent_hand'
                                }
                            )
                        }
                        if (this['agent_authorize_imageUrl']) { //委托人授权书
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'agent_authorize_imageUrl'),
                                    imageName: this['agent_authorize_imageUrl_name'],
                                    imagePath: this['agent_authorize_imageUrl'],
                                    type: this['agent_authorize_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'agent_authorize'
                                }
                            )
                        }
                        if (this['office_head_imageUrl']) { //办公室门头照
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'office_head_imageUrl'),
                                    imageName: this['office_head_imageUrl_name'],
                                    imagePath: this['office_head_imageUrl'],
                                    type: this['office_head_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'office_head'
                                }
                            )
                        }
                        if (this['office_operation_imageUrl']) { //运作场地门头照
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'office_operation_imageUrl'),
                                    imageName: this['office_operation_imageUrl_name'],
                                    imagePath: this['office_operation_imageUrl'],
                                    type: this['office_operation_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'office_operation'
                                }
                            )
                        }
                        if (this['office_picture1_imageUrl']) { //办公室办公照片1
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'office_picture1_imageUrl'),
                                    imageName: this['office_picture1_imageUrl_name'],
                                    imagePath: this['office_picture1_imageUrl'],
                                    type: this['office_picture1_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'office_picture1'
                                }
                            )
                        }
                        if (this['office_picture2_imageUrl']) { //办公室办公照片2
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'office_picture2_imageUrl'),
                                    imageName: this['office_picture2_imageUrl_name'],
                                    imagePath: this['office_picture2_imageUrl'],
                                    type: this['office_picture2_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'office_picture2'
                                }
                            )
                        }
                        if (this['office_picture3_imageUrl']) { //办公室办公照片3
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'office_picture3_imageUrl'),
                                    imageName: this['office_picture3_imageUrl_name'],
                                    imagePath: this['office_picture3_imageUrl'],
                                    type: this['office_picture3_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'office_picture3'
                                }
                            )
                        }
                        if (this['operation_picture1_imageUrl']) { //运作场地照片1
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'operation_picture1_imageUrl'),
                                    imageName: this['operation_picture1_imageUrl_name'],
                                    imagePath: this['operation_picture1_imageUrl'],
                                    type: this['operation_picture1_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'operation_picture1'
                                }
                            )
                        }
                        if (this['operation_picture2_imageUrl']) { //运作场地照片2
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'operation_picture2_imageUrl'),
                                    imageName: this['operation_picture2_imageUrl_name'],
                                    imagePath: this['operation_picture2_imageUrl'],
                                    type: this['operation_picture2_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'operation_picture2'
                                }
                            )
                        }
                        if (this['operation_picture3_imageUrl']) { //运作场地照片3
                            companyImgList.push(
                                {
                                    pkId: this.findImagePkId(authenticData, 'operation_picture3_imageUrl'),
                                    imageName: this['operation_picture3_imageUrl_name'],
                                    imagePath: this['operation_picture3_imageUrl'],
                                    type: this['operation_picture3_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'operation_picture3'
                                }
                            )
                        }
                        // console.log("this[$'_imageUrl']",this['_imageUrl$']);

                        authenticData.companyImgList = companyImgList;

                        authenticData.ltdCompanyUsers = {
                            phone: this.phone,
                            companyId: this.companyId,
                            belongLtdType: this.belongLtdType
                        };
                        authenticData['ltdCompany']['carrierType'] = this.carrierType;
                        let data = {
                            "data": JSON.stringify(authenticData),
                            "type": "2"
                        };
                        let that = this;
                        this.$post("authentic", data).then(function (response) {
                            let data = response;
                            if (data.code == 0) {
                                that.$message.error(data.msg);
                            } else {
                                that.common.saveData("authentic",data['resultData']['authentic']);
                                that.$router.push({
                                    path: '/company/verifyInfo',
                                    name: 'CompanyVerifyInfo',
                                    params: {
                                        type: 'logistics'
                                    }
                                });
                            }
                            that.loading = false;
                        }).catch(error => {
                            that.loading = false;
                            console.log("error", error)
                        });
                    }
                });
            }
            , findImagePkId(authenticData, imageUrl) {
                let pkId = '';
                let that = this;
                if (authenticData.companyImgList) {
                    let data = authenticData.companyImgList.find(t => that.common.CONSTANT.imagePrefix + t.imagePath == this[imageUrl]);
                    if (data) {
                        pkId = data.pkId;
                    }
                }
                return pkId;
            },
            /***************地图*******start*******/
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
                    let addComp = rs.addressComponents;
                    let adderssDetal = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                    that.clickAddressDetail = adderssDetal;
                });
            },
            /***************地图******end********/
            downlode(filename) {
                window.location.href = this.common.CONSTANT.UPLOADIMGPATH + "download?downType=1"
            }
        }
    }
</script>

<style scoped>
    .header img {
        float: left;
        margin-top: 20px;
    }

    .map {
        width: 100%;
        height: 300px;
    }

    /********上传图片file样式***end*********/
</style>
