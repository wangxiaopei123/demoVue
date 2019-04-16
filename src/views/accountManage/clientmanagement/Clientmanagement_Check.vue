<template>
    <div class="transportlicence">
        <h2 class="manage-title">委托人管理</h2>
        <div class="manage-tip" v-if="page === 3">
            <i class="el-icon-question"></i>
            <div class="manage-tip-txt">
                <!--     {{checkAdvice}}-->
                <span>您已成功提交认证信息，请您耐心等待审核结果。</span>
                <br>
                我们的审核时间为三个工作日，遇法定节假日顺延，审核结果我们会以系统消息的方式告知您。 客户服务电话：4006 556 756
            </div>
        </div>
        <div class="manage-tip manage-error" v-if="page === 4">
            <i class="el-icon-warning"></i>
            <div class="manage-tip-txt">
                认证失败！<span><b></b>您提交的认证资料有误，请核对后<a href="javascript:;" @click="editCompanyInfo">重新认证</a>！</span>
                <br>
                失败原因如下：
                <br>
                <p v-for="lincese in suggestAgentType" >
                    {{ lincese }}
                </p>
                <!--     <span>{{causeFailure}}   </span> -->
            </div>
        </div>
        <div class="steps-box marginTopBottom0" >
            <div class="steps steps-step">
                <el-steps :active="nexPage" finish-status="success" process-status="finish" align-center>
                    <el-step title="1.变更认证信息"></el-step>
                    <el-step title="2.认证信息审核"></el-step>
                    <el-step title="3.认证成功"></el-step>
                </el-steps>
            </div>
        </div>

        <el-row class="manage-com">
            <el-col :span="24">
                <div v-if="page === 1">
                    <el-form :model="ruleForm" :rules="agentRules" ref="ruleForm" label-position="right" label-width="150px"
                             size="mini">
                        <h2 class="info-title">委托人信息</h2>
                        <div class="info-item info-other clear">
                            <el-form-item label="" class="hidden">
                                {{ruleForm.pkId}}
                            </el-form-item>
                            <el-form-item label="委托人身份证" class="required_flag">
                                <div class="upload_box">
                                    <span class="tit_tit">个人信息页</span>
                                    <el-upload
                                            class="avatar-uploader"
                                            name="agent_id_card_front"
                                            :action="action"
                                            :show-file-list="false"
                                            :http-request="requestUpload"
                                            :before-upload="common.beforeAvatarUpload"
                                            :on-success="handleAvatarSuccess">
                                        <img v-if="agent_id_card_front_imageUrl" :src="agent_id_card_front_imageUrl"
                                             :imageType="agent_id_card_front_imageUrl_type"
                                             :imageName="agent_id_card_front_imageUrl_name"
                                             :imageId="agent_id_card_front_imageUrl_id"
                                             class="avatar">
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
                                            :before-upload="common.beforeAvatarUpload"
                                            :on-success="handleAvatarSuccess">
                                        <img v-if="agent_id_card_back_imageUrl" :src="agent_id_card_back_imageUrl"
                                             :imageType="agent_id_card_back_imageUrl_type"
                                             :imageName="agent_id_card_back_imageUrl_name"
                                             :imageId="agent_id_card_back_imageUrl_id"
                                             class="avatar">
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
                                            :before-upload="common.beforeAvatarUpload"
                                            :on-success="handleAvatarSuccess">
                                        <img v-if="agent_hand_imageUrl" :src="agent_hand_imageUrl"
                                             :imageType="agent_hand_imageUrl_type" :imageName="agent_hand_imageUrl_type"
                                             :imageId="agent_hand_imageUrl_id"
                                             class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                    <div class="check_eg" @click="sampleImg = true,sampleType = '8'">查看示例</div>
                                </div>
                            </el-form-item>
                            <el-form-item label="委托人授权书" class="required_flag">
                                <div class="upload_box sqs_box" style="margin-top: 6px;">
                                    <span class="tit_tit tit_tip">授权书必须盖有单位公章或财务专用章<a href="javascript:" @click="downlode('委托书.docx')">下载委托人授权书模板</a></span>
                                    <el-upload
                                            class="avatar-uploader"
                                            name="agent_authorize"
                                            :action="action"
                                            :show-file-list="false"
                                            :http-request="requestUpload"
                                            :before-upload="common.beforeAvatarUpload"
                                            :on-success="handleAvatarSuccess">
                                        <img v-if="agent_authorize_imageUrl" :src="agent_authorize_imageUrl"
                                             :imageType="agent_authorize_imageUrl_type"
                                             :imgName="agent_authorize_imageUrl_name"
                                             :imageId="agent_authorize_imageUrl_id"
                                             class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                    <div class="check_eg" @click="sampleImg = true,sampleType = '25'">查看示例</div>
                                </div>

                            </el-form-item>
                        </div>
                        <h2 class="info-title">联系信息</h2>
                        <div class="info-item clear">
                            <el-form-item label="联系电话：" prop="agentPhone">
                                <el-input v-model="ruleForm.agentPhone"></el-input>
                            </el-form-item>
                            <el-form-item label="联系邮箱：" prop="agentEmail">
                                <el-input v-model="ruleForm.agentEmail"></el-input>
                            </el-form-item>
                            <el-form-item label="通信地址：" class="address">
                                <el-select v-model="ruleForm.province" placeholder="请选择省" style="width: 32.4%"
                                           filterable
                                           @change="initCity(ruleForm.province,'city',['ruleForm.city','ruleForm.area'])">
                                    <el-option
                                            v-for="item in province"
                                            :key="item.regionId"
                                            :label="item.name"
                                            :value="item.regionId">
                                    </el-option>
                                </el-select>
                                <el-select v-model="ruleForm.city" placeholder="请选择市" style="width: 32.4%" filterable
                                           @change="initArea(ruleForm.city,'area',['ruleForm.area'])">
                                    <el-option
                                            v-for="item in city"
                                            :key="item.regionId"
                                            :label="item.name"
                                            :value="item.regionId">
                                    </el-option>
                                </el-select>
                                <el-select v-model="ruleForm.area" placeholder="请选择区/县" style="width: 32.4%" filterable>
                                    <el-option
                                            v-for="item in area"
                                            :key="item.regionId"
                                            :label="item.name"
                                            :value="item.regionId">
                                    </el-option>
                                </el-select>
                                <el-input v-model="ruleForm.agentAddress">
                                    <template slot="append"><span @click="openMap($event,'agentAddress')"><i
                                            class="el-icon-location-outline"></i></span></template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <el-form-item>
                            <el-button @click="$router.back(-1)">返回</el-button>
                            <el-button type="primary" @click="submitCompanyCardForm('ruleForm')">下一步</el-button>
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
                </div>
                <div v-if="page === 2">
                    <el-form :model="ruleInfoForm" :rules="rulesInfo" ref="ruleInfoForm" label-position="right"
                             label-width="150px" size="mini">
                        <h2 class="info-title">委托人信息</h2>
                        <el-form-item label="委托人姓名：">
                            <el-input v-model="ruleForm.agentName"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号：">
                            <el-input v-model="ruleForm.agentCard"></el-input>
                        </el-form-item>
                        <el-form-item label="证件有效限：">
                            <el-date-picker :readonly="businessTermRD" v-model="ruleForm.agentCardtime" type="date" placeholder="选择日期">
                            </el-date-picker>
                            <el-checkbox @change="businessTermCK">长期</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="page = 1,nexPage = 1">上一步</el-button>
                            <el-button type="primary" @click="submitcompanyInfoForm('ruleInfoForm')">提交
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-if="page === 3 || page === 4">
                    <el-form :model="ruleViewForm" :rules="rulesView" ref="ruleViewForm" label-position="right"
                             label-width="200px" size="mini">
                        <h2 class="info-title">委托人信息</h2>
                        <el-form-item label="委托人姓名：" class="required_flag">
                            {{ruleForm.agentName}}
                        </el-form-item>
                        <el-form-item label="证件号码：" class="required_flag">
                            {{ruleForm.agentCard}}
                        </el-form-item>
                        <el-form-item label="联系电话：" class="required_flag">
                            {{ruleForm.agentPhone}}
                        </el-form-item>
                        <el-form-item label="联系邮箱：" class="required_flag">
                            {{ruleForm.agentEmail}}
                        </el-form-item>
                        <el-form-item  v-if="checkStatus === 'error'">
                            <el-button type="primary" @click="editCompanyInfo">重新认证
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <SampleGraph :visible.sync="sampleImg" :sampleType="sampleType"></SampleGraph>
    </div>
</template>

<script>
    import common from "../../../common/common"; //导入正则校验
    import SampleGraph from '../../admitWeb/SampleGraph'
    export default {
        components: {
            'SampleGraph':SampleGraph
        },
        data() {
            let suggestAgentType = [];
            let suggest = [];
            return {
                sampleImg: false,
                sampleType:'',
                nexPage: 1,
                flag:"",
                agentCardtime:"",
                checkStatus:"",
                companyId: "",
                //地图
                dialogFormVisible: false,
                center: '北京',
                MapClass: "",
                position: "",
                clickAddressDetail: '点击选取地址',
                checkAdvice: "",
                causeFailure: "",
                action: this.common.CONSTANT.UPLOADIMGPATH + "recognizeImage",
                companyImgList: [],
                business_license_imageUrl: '',
                business_license_imageUrl_type: '',
                business_license_imageUrl_name: '',
                agent_id_card_back_imageUrl_id:'',
                agent_hand_imageUrl_id:'',
                agent_id_card_front_imageUrl_id:'',
                agent_authorize_imageUrl_id:'',
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
                province: [],
                city: [],
                area: [],

                value: '',
                page: 1,
                ruleForm: {
                    province: "",
                    city: "",
                    area: "",
                },
                agentRules:{
                    agentEmail:{
                        required: true,
                        message: '此项不能为空',
                        trigger: 'blur'
                    },
                    agentPhone:{
                        required: true,
                        message: '此项不能为空',
                        trigger: 'blur'
                    }
                },
                rules: {

                },
                ruleInfoForm: {},
                rulesInfo: {},
                ruleViewForm: {},
                rulesView: {}
            }
        },
        created() {
            this.initProvince();
            this.getCompanyAgent();
        },
        methods: {
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
            businessTermCK(ck) {
                if (ck) {
                    this.businessTermRD = true;
                    this.ruleForm.agentCardtime = '2119-01-01 00:00:00';
                } else {
                    this.businessTermRD = false;
                    this.ruleForm.agentCardtime = '';
                }
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
            //初始化城市
            initProvince: function () {
                common.initProvince(this, ["province"])
            },
            //加载城市
            initCity: function (value, cityKey, clearKeys) {
               // this.center= this.common.getProvinceName(this, this.ruleForm.province, this.province);
               // if(this.center == null || this.center==""){
               //     this.center="北京"
               // }
                common.initCity(this, value, cityKey, clearKeys);
            },
            initArea: function (value, dataKey, clearKeys) {
                common.initArea(this, value, dataKey, clearKeys)
            },
            requestUpload(obj) {
                //	alert(this.companyId);
                obj.companyId = this.companyId;
                this.common.uploadImgFun(obj, this);
            },
            downloadFile() {
                let data = new FormData();
                let that = this;
                data = {
                    filename: "123.docx"
                }
                this.$get("clientManagement/download", data).then(function (response) {
                    if (response.code == 1) {
                        that.$message.info("文件下载成功!")
                    } else {
                        that.$message.error("文件下载失败!")
                    }


                }).catch(error => {
                    console.log("error", error);
                    that.$message.error("获取信息失败!")
                });
            },
            getCompanyAgent() {
                let data = new FormData();
                let that = this;
                this.$get("clientManagement/getCompanyAgent", data).then(function (response) {
                    that.companyImgList = response.data;
                    that.ruleForm = response.resultData.ltdCompanyAgent;
                    that.initCity(response.resultData.ltdCompanyAgent.agentProvId, 'city', ['ruleForm.city', 'ruleForm.area']);
                    that.initArea(response.resultData.ltdCompanyAgent.agentCityId, 'area', ['ruleForm.area']);
                    that.ruleForm.city = response.resultData.ltdCompanyAgent.agentCityId;
                    that.ruleForm.province = response.resultData.ltdCompanyAgent.agentProvId;
                    that.ruleForm.area = response.resultData.ltdCompanyAgent.agentAreaId;
                    that.companyId = response.resultData.ltdCompanyAgent.companyId;
                    that.agentCardtime= that.dataFormat(new Date(response.resultData.ltdCompanyAgent.agentCardtime));
                    that.suggest =response.resultData.bizList;
                    that.flag = that.$route.params['flag']
                    if(that.flag != 1) {
                        if(response.resultData.ltdCompanyAgent.verifyStatus == 1){
                            that.$router.push('/clientmanagement');
                        }else if (response.resultData.ltdCompanyAgent.verifyStatus == 3) {
                            that.page = 3;
                            this.nexPage = 2;
                            //                       document.getElementById("check").style.display = "none";
                            that.checkAdvice = "审核中"
                            this.checkStatus = 'success'
                        } else if (response.resultData.ltdCompanyAgent.verifyStatus == 0) {
                            that.page = 3;
                            that.nexPage = 2;
//                        document.getElementById("check").style.display = "none";
                            that.checkAdvice = "待审核"
                            that.checkStatus = 'success'
                        } else {
                            that.page = 4;
                            this.nexPage = 2;
//                        that.causeFailure = response.resultData.causeFailure
                            that.checkStatus = 'error'
                            that.checkAdvice = "审核没有通过"
                            let bp = [];
                            if (that.suggest) {
                                that.suggest.forEach(function (t) {
                                    bp.push(t.name);

                                });
                                that.suggestAgentType = bp;

                            }
                        }
                    }
                    if (that.companyImgList.length > 0) {
                        that.companyImgList.forEach(function (image) {
                            let imageType = image['imageMark'];
                            let imagePath = imageType + "_imageUrl";
                            let imageId = imageType + "_imageUrl"+"_id"
                            that[imagePath] = that.common.CONSTANT.imagePrefix + image['imagePath'];
                            that[imageId]=image['pkId'];

                        })
                    }
                }).catch(error => {
                    console.log("error", error);
                    that.$message.error("获取信息失败!")
                });
            },
            dataFormat(time){
                return `${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()}`;
            },

            handleAvatarSuccess(response, file) {
                let data = JSON.parse(response.data);
                let imageType = data['resultData']['imageType'];
                let imageTypeValue = data['resultData']['imageTypeValue'];
                let filePath = data['resultData']['filePath'];
                let imageUrl = imageType + "_imageUrl";
                let imageUrlType = imageUrl + "_type";
                let imageUrlName = imageUrl + "_name";
                this[imageUrl] = filePath;
                this[imageUrlType] = imageTypeValue;
                this[imageUrlName] = file.name;
//				this.imageUrl = URL.createObjectURL(file.raw);
                let attrs = data['resultData']['attrs'];
                let ltdCompanyAgent = {}; //委托人身份证识别信息
                if ("agent_id_card_front" === imageType) { //委托人身份证个人信息页
                    if (attrs) {
                        this.ruleForm.agentName = attrs['idName'];
                        this.ruleForm.agentCard = attrs['idNumber'];
                    }
                } else if ("agent_id_card_back" === imageType) { //委托人身份证国徽页
                    if (attrs) {
                        if (attrs['idValidity'])
                            this.ruleForm.agentCardtime = attrs['idValidity'].split('-')[1].trim().replace(/\./g, '-');
                    }

                }
                //            this.common.saveData(phone,authenticData);
            },
            /*******上传图片方法**end******/
            editCompanyInfo() {
                this.nexPage = 1;
                this.page=1;
            },
            downlode(filename) {
                window.location.href = this.common.CONSTANT.UPLOADIMGPATH + "download?downType=1"
            },
            submitCompanyCardForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.page = 2;
                        this.nexPage = 2;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },   submitForm() {
                let that = this;
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        let ltdCompanyAgent = {
                            "pkId": that.ruleForm.pkId,
                            "agentProvId": that.ruleForm.province,
                            "agentCityId": that.ruleForm.city,
                            "agentAreaId": that.ruleForm.area,
                            "agentAddress": that.ruleForm.agentAddress,
                            "agentProvName": that.common.getProvinceName(that, that.ruleForm.province, that.province),
                            "agentCityName": that.common.getCityName(that, that.ruleForm.city, that.city),
                            "agentAreaName": that.common.getAreaName(that, that.ruleForm.area, that.area)

                        };
                        that.$post('clientManagement/saveLtdCompanyAgent', ltdCompanyAgent).then((response) => {
                            if (response.code == 1) {
                                that.$message.info("保存数据成功!")
                            } else {
                                that.$message.error("保存信息失败!")
                            }
                        }).catch(() => {
                            that.$message.error('消息加载失败');
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            submitcompanyInfoForm(formName) {
                let that = this;
                let imageValid = true;
                if (!this['agent_id_card_front_imageUrl'] || !this['agent_id_card_back_imageUrl'] || !this['agent_hand_imageUrl']) {
                    this.$message.info("委托人身份证照片上传不全");
                    imageValid = false;
                }
                if (!this['agent_authorize_imageUrl']) {
                    this.$message.info("委托人授权书不能为空");
                    imageValid = false;
                }
                if (!imageValid) {
                    return false;
                }
                let companyImgList = [];
                if (this['agent_id_card_front_imageUrl']) { //委托人身份证个人信息页
                    companyImgList.push(
                        {
                            imageName: this['agent_id_card_front_imageUrl_name'],
                            imagePath: this['agent_id_card_front_imageUrl'],
                            type: this['agent_id_card_front_imageUrl_type'],
                            pkId: this['agent_id_card_front_imageUrl_id'],
                            imageStatus: 0,
                            imageMark: 'agent_id_card_front'
                        }
                    )
                }
                if (this['agent_id_card_back_imageUrl']) { //委托人身份证国徽页
                    companyImgList.push(
                        {

                            imageName: this['agent_id_card_back_imageUrl_name'],
                            imagePath: this['agent_id_card_back_imageUrl'],
                            type: this['agent_id_card_back_imageUrl_type'],
                            pkId: this['agent_id_card_back_imageUrl_id'],
                            imageStatus: 0,
                            imageMark: 'agent_id_card_back'
                        }
                    )
                }
                if (this['agent_hand_imageUrl']) { //委托人手持身份证
                    companyImgList.push(
                        {

                            imageName: this['agent_hand_imageUrl_name'],
                            imagePath: this['agent_hand_imageUrl'],
                            type: this['agent_hand_imageUrl_type'],
                            pkId: this['agent_hand_imageUrl_id'],
                            imageStatus: 0,
                            imageMark: 'agent_hand'
                        }
                    )
                }
                if (this['agent_authorize_imageUrl']) { //委托人授权书
                    companyImgList.push(
                        {

                            imageName: this['agent_authorize_imageUrl_name'],
                            imagePath: this['agent_authorize_imageUrl'],
                            type: this['agent_authorize_imageUrl_type'],
                            pkId: this['agent_authorize_imageUrl_id'],
                            imageStatus: 0,
                            imageMark: 'agent_authorize'
                        }
                    )
                }

                let ltdCompanyAgent = {
                    "pkId": that.ruleForm.pkId,
                    "agentProvId": that.ruleForm.province,
                    "agentCityId": that.ruleForm.city,
                    "agentAreaId": that.ruleForm.area,
                    "agentAddress": that.ruleForm.agentAddress,
                    "agentProvName": that.common.getProvinceName(that, that.ruleForm.province, that.province),
                    "agentCityName": that.common.getCityName(that, that.ruleForm.city, that.city),
                    "agentAreaName": that.common.getAreaName(that, that.ruleForm.area, that.area),
                    "agentName": that.ruleForm.agentName,
                    "agentCard": that.ruleForm.agentCard,
                    "agentPhone": that.ruleForm.agentPhone,
                    "agentName": that.ruleForm.agentName,
                    "agentEmail": that.ruleForm.agentEmail,
                    "agentCardtime": that.ruleForm.agentCardtime,
                    "companyImgList": companyImgList


                };
                let data = {
                    "data": JSON.stringify(ltdCompanyAgent),

                };
                that.$post('clientManagement/updateLtdCompanyAgent', data).then((response) => {
                    if (response.code == 1) {
                        this.agentPersonAuth(ltdCompanyAgent);
                        this.page = 3;
                        this.nexPage = 2;
                        that.$message.info("保存数据成功!")
                    } else {
                        that.$message.error("保存信息失败!")
                    }
                }).catch(() => {
                    that.$message.error('消息加载失败');
                });

            },
            agentPersonAuth(ltdCompanyAgent) {
                let companyId = this.companyId;
                let name = ltdCompanyAgent['agentName'];
                let idCard = this.ruleForm.agentCard;
                let data = {
                    "companyId": companyId,
                    "type": "2",
                    "name": name,
                    "idCard": idCard
                };
                this.$post("personalAuth", data).then(function (response) {
                    // console.log("agentPersonAuth response",response);
                }).catch(error => console.log("error",error));
            }


        }
    }
</script>

<style scoped>
    .info-other .el-upload__tip {
        top: -7px;
    }

    .hidden {
        display: none;
    }
</style>
