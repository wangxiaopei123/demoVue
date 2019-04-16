<template><!--小板车认证-->
    <div class="case">
        <Header></Header>
        <div class="content">
            <div class="content-in" :style="{height:((screenHeight-64-60-12-16)>800)?((screenHeight-64-60-12-16)+'px'):(800+'px')}">
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
                        <div class="manage-tip-txt">提交资料后，我们的工作人员会在三个工作日内完成审核。为保证贵司运单不受审核进度影响，请将贵司全部车辆信息一次性提交完成并仔细核对信息，以免因为反复的提交及审核造成不必要的损失，感谢您配合。</div>
                    </div>
                    <div class="car-way smallCar">
                        <div class="car-choice">
                            <el-radio v-model="radioType" label="1">大板车认证</el-radio>
                            <el-radio v-model="radioType" label="2">小板车认证</el-radio>
                        </div>
                        <div class="car-way-btn">
                            <!--<el-button @click="bulkImport = true">批量导入</el-button>-->
                            <el-button @click="addHeadstock = true" type="primary">添加车辆</el-button>
                        </div>
                        <div class="car-tabs">
                            <!--暂无车辆信息显示，默认car-way-nothing是隐藏的car-way-nothing里面的table只做显示用，有数据显示就执行下面的table-->
                            <div class="car-way-nothing">
                                <div class="car-way-no" style="top: 102px;">
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
                                            label="种类">
                                    </el-table-column>
                                    <el-table-column
                                            label="板式">
                                    </el-table-column>
                                    <el-table-column
                                            label="运输许可证号">
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
                            <div class="car-way-table">
                                <el-table
                                        :data="tableData"
                                        border
                                        style="width: 100%">
                                    <el-table-column
                                            prop="orderNumber"
                                            label="序号"
                                            width="60">
                                    </el-table-column>
                                    <el-table-column
                                            prop="owner"
                                            label="所有人"
                                            width="200">
                                    </el-table-column>
                                    <el-table-column
                                            prop="licenseNumber"
                                            label="车牌号码"
                                            width="130">
                                        <template slot-scope="scope">
                                            <span @click="carDetailsInfo = true" class="car-way-blue">{{scope.row.licenseNumber}}</span>
                                            <i class="car-yellow"></i>
                                            <i class="car-blue"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="type"
                                            label="种类"
                                            width="150">
                                    </el-table-column>
                                    <el-table-column
                                            prop="plateType"
                                            label="板式"
                                            width="150">
                                    </el-table-column>
                                    <el-table-column
                                            prop="transport"
                                            label="运输许可证号"
                                            width="160">
                                    </el-table-column>
                                    <el-table-column
                                            prop="insurance"
                                            label="保险详情"
                                            width="90">
                                        <template slot-scope="scope">
                                            <a @click="insuranceDetailsInfo = true" class="car-way-blue" href="javascript:;">{{scope.row.insurance}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="time"
                                            label="创建时间"
                                            width="170">
                                    </el-table-column>
                                    <el-table-column fixed="right" label="操作" width="180">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click="uploadPapers = true">上传证件</el-button>
                                            <el-button type="text" size="small" @click="addHeadstock = true">编辑</el-button>
                                            <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div class="car-way-page-btn">
                                <el-button type="primary">下一步</el-button>
                            </div>


                        </div>
                    </div>


                </div>

            </div>
        </div>



        <!--批量导入弹窗-->
        <el-dialog class="capacity-pop capacity-line" title="小板车批量导入" :visible.sync="bulkImport" width="40%" center>
            <div class="capacity-pop-in">
                <el-form :model="bulkImportRulesForm" :rules="bulkImportRules" ref="bulkImportRulesForm" label-width="80px" class="demo-ruleForm import-box">
                    <el-form-item label="模板下载" >
                       <!-- <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                            <el-button size="small" type="primary"><i class="import-icon el-icon-download"></i>下载批量导入模板</el-button>
                            <div slot="tip" class="el-upload__tip">导入前请先下载批量导入模板，填写数据后进行导入操作</div>
                        </el-upload>-->
                        <el-button size="small" @click="downLoadSmall" type="primary"><i class="import-icon el-icon-download"></i>下载批量导入模板</el-button>
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
                    <!--<el-form-item label="上传操作" >
                        <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                            <el-button size="small" type="primary"><i class="import-icon el-icon-upload"></i>上传</el-button>
                        </el-upload>
                    </el-form-item>-->

                        <div class="import-resul">
                            <h5>上传结果说明</h5>
                            <span>本次成功上传XX条数据；</span>
                            <span>本次数据上传失败，具体失败原因请下载错误报告查看 <a href="javascript:;">下载错误报告</a> </span>
                        </div>

                        <div class="import-bottom">
                            <el-button @click="bulkImport = false">取消保存</el-button>
                            <el-button type="primary" @click="bulkImport = false">确认保存</el-button>
                        </div>

                </el-form>
            </div>
        </el-dialog>

        <!--添加车辆弹窗-->
        <el-dialog class="capacity-pop" title="添加车辆" :visible.sync="addHeadstock" width="74%" center>
            <div class="capacity-pop-in">
                <div class="steps">
                    <el-steps :active="activePop" finish-status="success" process-status="finish" align-center>
                        <el-step title="添加车辆信息"></el-step>
                        <el-step title="核对并完善信息"></el-step>
                        <el-step title="添加成功"></el-step>
                    </el-steps>
                </div>
                <el-form :model="addHeadstockForm" :rules="addHeadstockRules" ref="addHeadstockForm" label-width="130px" class="demo-ruleForm">
                    <h2 class="info-title">基本信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="马力" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="种类" prop="">
                            <!--<el-radio-group v-model="">-->
                            <el-radio label="落地版"></el-radio>
                            <el-radio label="半落地"></el-radio>
                            <!--</el-radio-group>-->
                        </el-form-item>
                        <el-form-item label="板长度" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="度数" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="板式" prop="">
                            <el-select placeholder="请选择"></el-select>
                        </el-form-item>
                        <el-form-item label="GPS品牌" prop="">
                            <el-select placeholder="请选择"></el-select>
                        </el-form-item>
                        <el-form-item label="车辆正面45°照" prop="">
                            <div class="upload_box">
                                <el-upload
                                        class="avatar-uploader"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="img1 = true">查看示例</div>
                            </div>
                        </el-form-item>
                    </div>
                    <h2 class="info-title">行驶证信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="车牌号码" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="所有人" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="车牌类型" prop="">
                            <el-select placeholder="请选择"></el-select>
                        </el-form-item>
                        <el-form-item label="机动车登记证书">
                            <div class="upload_box">
                                <el-upload
                                        class="avatar-uploader"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="img1 = true">查看示例</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="证件照片" prop="">
                            <div class="upload_box">
                                <span class="tit_tit">行驶证首页</span>
                                <el-upload
                                        class="avatar-uploader"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="img1 = true">查看示例</div>
                            </div>
                            <div class="upload_box">
                                <span class="tit_tit">行驶证副业</span>
                                <el-upload
                                        class="avatar-uploader"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="img1 = true">查看示例</div>
                            </div>
                            <div class="upload_box">
                                <span class="tit_tit">行驶证背面</span>
                                <el-upload
                                        class="avatar-uploader"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="img1 = true">查看示例</div>
                            </div>
                        </el-form-item>

                    </div>
                    <h2 class="info-title">车辆保险信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="交强险保险品牌" prop="">
                            <el-select placeholder="请选择保险品牌"></el-select>
                        </el-form-item>
                        <el-form-item label="交强险保险单号" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item class="termOfValidity" label="交强险有效期" prop="">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                            <span>至</span>
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="商业险保险品牌" prop="">
                            <el-select placeholder="请选择保险品牌"></el-select>
                        </el-form-item>
                        <el-form-item label="商业险保险单号" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item class="termOfValidity" label="商业险有效期" prop="">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                            <span>至</span>
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="保险单照片" prop="">
                            <div class="upload_box">
                                <span class="tit_tit">交强险保险单</span>
                                <el-upload
                                        class="avatar-uploader"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="img1 = true">查看示例</div>
                            </div>
                            <div class="upload_box">
                                <span class="tit_tit">商业险保险单</span>
                                <el-upload
                                        class="avatar-uploader"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="img1 = true">查看示例</div>
                            </div>
                        </el-form-item>

                    </div>

                </el-form>
                <div class="import-bottom">
                    <el-button @click="addHeadstock = false">取 消</el-button>
                    <el-button type="primary" @click="checkNextInfo = true">下一步</el-button>
                </div>
            </div>
        </el-dialog>

        <!--添加车辆下一步核对并完善信息弹窗-->
        <el-dialog class="capacity-pop" title="核对并完善信息" :visible.sync="checkNextInfo" width="74%" center>
            <div class="capacity-pop-in">
                <div class="steps">
                    <el-steps :active="activeNextPop" finish-status="success" process-status="finish" align-center>
                        <el-step title="添加车辆信息"></el-step>
                        <el-step title="核对并完善信息"></el-step>
                        <el-step title="添加成功"></el-step>
                    </el-steps>
                </div>
                <p class="checkInfo-tip">已为您自动识别部分信息，请仔细核对并完善</p>
                <el-form :model="checkInfoForm" :rules="checkInfoRules" ref="checkInfoForm" label-width="110px" class="demo-ruleForm">
                    <div class="info-item clear">
                        <el-form-item label="车牌号码" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="车牌类型" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="所有人" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="使用性质" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="车辆类型" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="车架号" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="品牌型号" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="注册日期" prop="">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="发动机号码" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="整备质量" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="发证日期" prop="">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="准牵引质量" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="核定载质量" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="外廓尺寸" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="强制报废日期止" prop="">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="检验有效期止" prop="">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="import-bottom">
                    <el-button @click="checkNextInfo = false">上一步</el-button>
                    <el-button type="primary" @click="checkNextInfo = false">确 定</el-button>
                </div>
            </div>
        </el-dialog>

        <!--上传证件弹窗-->
        <el-dialog class="capacity-pop" title="上传车辆证件" :visible.sync="uploadPapers" width="640px" center>
            <div class="capacity-pop-in">
                <el-form :model="uploadPapersForm" :rules="uploadPapersRules" ref="uploadPapersForm" label-width="80px" class="demo-ruleForm papers-item">
                    <div class="upload_box">
                        <span class="tit_tit"><i class="not-null">*</i>行驶证首页</span>
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="check_eg" @click="sampleImg = true,sampleType = '0'">查看示例</div>
                    </div>
                    <div class="upload_box">
                        <span class="tit_tit"><i class="not-null">*</i>行驶证副页</span>
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="check_eg" @click="sampleImg = true,sampleType = '1'">查看示例</div>
                    </div>
                    <div class="upload_box">
                        <span class="tit_tit"><i class="not-null">*</i>行驶证背面</span>
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="check_eg" @click="sampleImg = true,sampleType = '2'">查看示例</div>
                    </div>
                    <div class="upload_box">
                        <span class="tit_tit">机动车登记证书</span>
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="check_eg" @click="sampleImg = true,sampleType = '5'">查看示例</div>
                    </div>
                    <div class="upload_box">
                        <span class="tit_tit">道路运输证</span>
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="check_eg" @click="sampleImg = true,sampleType = '4'">查看示例</div>
                    </div>

                    <div class="upload_box">
                        <span class="tit_tit"><i class="not-null">*</i>交强险保单</span>
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="check_eg">&nbsp;</div>
                    </div>
                    <div class="upload_box">
                        <span class="tit_tit"><i class="not-null">*</i>商业车险保单</span>
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="check_eg">&nbsp;</div>
                    </div>
                    <div class="upload_box">
                        <span class="tit_tit"><i class="not-null">*</i>车辆正面45°照片</span>
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="check_eg" style="position: relative;left: -10px;" @click="sampleImg = true,sampleType = '3'">查看示例</div>
                    </div>
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
                        <el-button @click="uploadPapers = false">取 消</el-button>
                        <el-button type="primary" @click="checkInfo = true">下一步</el-button>
                    </div>

                </el-form>
            </div>
        </el-dialog>

        <!--核对并完善信息弹窗-->
        <el-dialog class="capacity-pop" title="核对并完善信息" :visible.sync="checkInfo" width="" center>
            <div class="capacity-pop-in">
                <p class="checkInfo-tip">已为您自动识别部分信息，请仔细核对并完善</p>
                <el-form :model="checkInfoForm" :rules="checkInfoRules" ref="checkInfoForm" label-width="110px" class="demo-ruleForm">
                    <div class="info-item clear">
                        <el-form-item label="车牌号码" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="车牌类型" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="所有人" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="使用性质" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="车辆类型" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="车架号" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="品牌型号" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="注册日期" prop="">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="发动机号码" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="整备质量" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="发证日期" prop="">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="准牵引质量" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="核定载质量" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="外廓尺寸" prop="">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="强制报废日期止" prop="">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="检验有效期止" prop="">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="import-bottom">
                    <el-button @click="checkInfo = false">上一步</el-button>
                    <el-button type="primary" @click="checkInfo = false">确 定</el-button>
                </div>
            </div>
        </el-dialog>

        <!--车辆详情信息弹窗-->
        <el-dialog class="capacity-pop" title="车辆详情信息" :visible.sync="carDetailsInfo" width="54%" center>
            <div class="capacity-pop-in checkInfo">
                <p class="checkInfo-tip">已为您自动识别部分信息，请仔细核对并完善</p>
                <el-form label-width="130px" class="demo-ruleForm">
                    <h2 class="info-title">基本信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="马力：">
                            310
                        </el-form-item>
                        <el-form-item label="种类：">
                            半落地
                        </el-form-item>
                        <el-form-item label="板长度：">
                            0
                        </el-form-item>
                        <el-form-item label="度数：">
                            0
                        </el-form-item>
                        <el-form-item label="板式：">
                            开放式
                        </el-form-item>
                        <el-form-item label="GPS品牌：">
                            G7
                        </el-form-item>
                        <el-form-item label="车辆正面45°照：">
                            <img class="infoImg" src="../../../../images/register/imgTest.jpg" alt="">
                        </el-form-item>
                    </div>
                    <h2 class="info-title">行驶证信息</h2>
                    <div class="info-item clear">
                        <el-form-item label="车牌号码：">
                            黑AN1265
                        </el-form-item>
                        <el-form-item label="车牌类型：">
                            黄
                        </el-form-item>
                        <el-form-item label="所有人类型：">
                            公司所有
                        </el-form-item>
                        <el-form-item label="所有人：">
                            北京运车网网络科技有限公司
                        </el-form-item>
                        <el-form-item label="车辆类型：">
                            310
                        </el-form-item>
                        <el-form-item label="使用性质：">
                            310
                        </el-form-item>
                        <el-form-item label="品牌类型：">
                            310
                        </el-form-item>
                        <el-form-item label="车架号：">
                            310
                        </el-form-item>
                        <el-form-item label="发动机号码：">
                            310
                        </el-form-item>
                        <el-form-item label="注册日期：">
                            310
                        </el-form-item>
                        <el-form-item label="发证日期：">
                            310
                        </el-form-item>
                        <el-form-item label="整备质量：">
                            310
                        </el-form-item>
                        <el-form-item label="核定载质量：">
                            310
                        </el-form-item>
                        <el-form-item label="准牵引质量：">
                            310
                        </el-form-item>
                        <el-form-item label="外廓尺寸：">
                            310
                        </el-form-item>
                        <el-form-item label="检验有效期止：">
                            310
                        </el-form-item>
                        <el-form-item label="强制报废日期止：">
                            310
                        </el-form-item>
                    </div>
                    <el-form-item label="行驶证：">
                        <div class="upload_box">
                            <span class="tit_tit">行驶证首页</span>
                            <img class="infoImg" src="../../../../images/register/imgTest.jpg" alt="">
                        </div>
                        <div class="upload_box">
                            <span class="tit_tit">行驶证副页</span>
                            <img class="infoImg" src="../../../../images/register/imgTest.jpg" alt="">
                        </div>
                        <div class="upload_box">
                            <span class="tit_tit">行驶证背面</span>
                            <img class="infoImg" src="../../../../images/register/imgTest.jpg" alt="">
                        </div>
                    </el-form-item>
                </el-form>
                <div class="import-bottom">
                    <el-button type="primary" @click="carDetailsInfo = false">确 定</el-button>
                </div>
            </div>
        </el-dialog>

        <!--保险详情信息弹窗-->
        <el-dialog class="capacity-pop" title="保险详情信息" :visible.sync="insuranceDetailsInfo" width="55%" center>
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

            return {
                sampleImg: false,
                sampleType:'',
                imgSrc:"../../../../images/register/imgTest.jpg",
                screenHeight: document.documentElement.clientHeight, // 屏幕高度
                active: 0, //步骤栏默认
                activePop:0,
                activeNextPop:1,
                radioType: '2',
                img1: false,
                fileList: [],
                imageUrl: '',   //图片地址
                addHeadstock:false, //添加车辆弹窗
                addHeadstockForm:{},
                addHeadstockRules:{},
                bulkImportRulesForm:{},//批量导入弹窗
                bulkImportRules:{},
                bulkImport: false, //批量导入弹窗
                uploadPapers:false,//上传证件弹窗
                uploadPapersForm:{},
                uploadPapersRules:{},
                checkNextInfo:false,//添加车辆下一步核对并完善信息弹窗
                checkInfo:false,  //核对并完善信息弹窗
                checkInfoForm:{},
                checkInfoRules:{},
                carDetailsInfo:false,//车辆详情信息弹窗
                wayDetailsInfo:false, //道路运输许可证详情信息弹窗
                insuranceDetailsInfo:false, //保险详情信息弹窗
                upLoadExcel:this.common.CONSTANT.UPLOADIMGPATH +'',//上传路径
                upLoadFile:[],
                tableData: [{
                    orderNumber: '1',
                    owner: '北京共享物流服务有限公司',
                    licenseNumber: '京AJV698',
                    type: '落地板',
                    plateType: '开放式',
                    transport:'无',
                    insurance:'查看',
                    time:'2019-03-12 15:19:20'
                }, {
                    orderNumber: '1',
                    owner: '北京共享物流服务有限公司',
                    licenseNumber: '京AJV698',
                    type: '半落地',
                    plateType: '封闭式',
                    transport:'23465786543',
                    insurance:'查看',
                    time:'2019-03-12 15:19:20'
                }]

            }
        },

        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            /*************图片处理----start************/
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
            /*************图片处理----end************/
            //跳转到小板车认证
            goToSmallCerVerify(){
                console.info("adsasd")

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
            },
            downLoadSmall(){
                window.location.href = this.common.CONSTANT.UPLOADIMGPATH + "download?downType=2"
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

                    }).catch(error => {
                        console.log("error", error);
                        that.$message.error("上传失败!")
                    });
                }else {
                    that.$message.error("请选择文件!")
                }
            }
        },mounted() {
            var _this = this;
            window.onresize = function() { // 定义窗口大小变更通知事件
                _this.screenHeight = document.documentElement.clientHeight // 窗口高度
            }
        }, watch : {
            radioType:function (e) {
                if(e==1){
                    this.$router.push('/admitWeb/capacity/carTransport/addBigCarTransportInfo')
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
