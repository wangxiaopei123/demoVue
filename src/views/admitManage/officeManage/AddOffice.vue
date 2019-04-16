<template>
    <div>
        <el-dialog class="capacity-pop capacity-pop-big capacity-line" :visible.sync="visible" :addOfficePkId="pkId" :before-close="closeModal" :title="titleName" center>
            <div class="capacity-pop-in">
                <el-form :model="addOfficeForm" :rules="addOfficeRules" ref="addOfficeForm" label-width="122px" class="demo-ruleForm">
                    <h2 class="info-title">基本信息</h2>
                    <div class="info-item info-case clear" style="padding: 0;">
                        <el-form-item label="办事处名称" prop="name">
                            <el-input v-model="addOfficeForm.name" maxlength="15" placeholder="请输入办事处名称"></el-input>
                        </el-form-item>
                        <el-form-item label="办事处简称" prop="shortName">
                            <el-input v-model="addOfficeForm.shortName" maxlength="10" placeholder="请输入办事处简称"></el-input>
                        </el-form-item>
                        <el-form-item label="办公室地址" class="address" prop="cityId">
                            <el-select v-model="addOfficeForm.provId" placeholder="请选择省"
                                       @change="initCity(addOfficeForm.provId,'cityOption',['addOfficeForm.cityId','addOfficeForm.areaId'])">
                                <el-option
                                        v-for="item in provinceOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="addOfficeForm.cityId" placeholder="请选择市" filterable
                                       @change="initArea(addOfficeForm.cityId,'areaOption',['addOfficeForm.areaId'])">
                                <el-option
                                        v-for="item in cityOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>
                            <el-select v-model="addOfficeForm.areaId" placeholder="请选择区" filterable>
                                <el-option
                                        v-for="item in areaOption"
                                        :key="item.regionId"
                                        :label="item.name"
                                        :value="item.regionId">
                                </el-option>
                            </el-select>

                            <el-input v-model="addOfficeForm.address" class="width-other">
                                <template slot="append"><span @click="openMap($event,'address')"><i
                                        class="el-icon-location-outline"></i></span></template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="phone" style="min-height: 80px;">
                            <el-input v-model="addOfficeForm.phone" maxlength="13" placeholder="请输入联系电话"></el-input>
                        </el-form-item>
                        <el-form-item class="required_flag" label="办公场地照片" prop="">
                            <div class="upload_box">
                                <el-upload
                                        class="avatar-uploader"
                                        name="agency_pic"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <!--图片验证 :before-upload="beforeAvatarUpload" -->
                                    <img v-if="agency_pic_imageUrl"
                                         :src="agency_pic_imageUrl"
                                         :imageType="agency_pic_imageUrl_type"
                                         :imgName="agency_pic_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '22'">查看示例</div>
                            </div>
                        </el-form-item>
                    </div>
                    <h2 class="info-title">办事处联系人</h2>
                    <div class="info-item clear">
                        <el-form-item label="联系人" prop="contactName">
                            <el-input v-model="addOfficeForm.contactName" placeholder="请输入联系人"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号码" prop="contactCard">
                            <el-input v-model="addOfficeForm.contactCard" placeholder="请输入联系人身份证号"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="contactPhone">
                            <el-input v-model="addOfficeForm.contactPhone" maxlength="11" placeholder="请输入联系人电话"></el-input>
                        </el-form-item>
                        <el-form-item label="联系邮箱" prop="contactMail">
                            <el-input v-model="addOfficeForm.contactMail" maxlength="20" placeholder="请输入联系人邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人身份证" prop="agency_id_card_front_imageUrl" class="required_flag">
                            <div class="upload_box">
                                <span class="tit_tit">个人信息页</span>
                                <el-upload
                                        class="avatar-uploader"
                                        name="agency_id_card_front"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <!--图片验证 :before-upload="beforeAvatarUpload" -->
                                    <img v-if="agency_id_card_front_imageUrl"
                                         :src="agency_id_card_front_imageUrl"
                                         :imageType="agency_id_card_front_imageUrl_type"
                                         :imgName="agency_id_card_front_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '6'">查看示例</div>
                            </div>
                            <div class="upload_box">
                                <span class="tit_tit">国徽页</span>
                                <el-upload
                                        class="avatar-uploader"
                                        name="agency_id_card_back"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <!--图片验证 :before-upload="beforeAvatarUpload" -->
                                    <img v-if="agency_id_card_back_imageUrl"
                                         :src="agency_id_card_back_imageUrl"
                                         :imageType="agency_id_card_back_imageUrl_type"
                                         :imgName="agency_id_card_back_imageUrl_name" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '7'">查看示例</div>
                            </div>
                            <div class="upload_box">
                                <span class="tit_tit">手持身份证</span>
                                <el-upload
                                        class="avatar-uploader"
                                        name="agency_hand"
                                        :action="action"
                                        :show-file-list="false"
                                        :http-request="requestUpload"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <!--图片验证 :before-upload="beforeAvatarUpload" -->
                                    <img v-if="agency_hand_imageUrl" :src="agency_hand_imageUrl"
                                         :imageType="agency_hand_imageUrl_type"
                                         :imgName="agency_hand_imageUrl_name"
                                         class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="check_eg" @click="sampleImg = true,sampleType = '8'">查看示例</div>
                            </div>
                        </el-form-item>

                    </div>
                </el-form>
                <div class="import-bottom">
                    <el-button @click="closeModal">返回列表</el-button>
                    <el-button type="primary" @click="submitInfo">保 存</el-button>
                </div>
            </div>
        </el-dialog>
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
                                           @click="dialogFormVisible = false,addOfficeForm[MapClass] = clickAddressDetail">确 定</el-button>
                              </span>
        </el-dialog>
         <SampleGraph :visible.sync="sampleImg" :sampleType="sampleType"></SampleGraph>
    </div>
</template>

<script>
    import SampleGraph from '../../admitWeb/SampleGraph'  //示例图
    export default {
		components: {
		    'SampleGraph':SampleGraph,
		},
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            pkId: {
                type: String,
                default: ""
            }

        },
        data() {
            var validIdCard = (rule, value, callback) => {//
                this.$get("/agency/validCheck", {chValue: this.addOfficeForm.contactCard,chName:"contactCard",pkId:this.AgencyPkId}).then(function (response) {
                    if (response.code) {
                        callback(new Error('身份证号已存在'));
                    } else {
                        callback();
                    }
                });
            };
            var validName = (rule, value, callback) => {
                this.$get("/agency/validCheck", {chValue: this.addOfficeForm.name,chName:"name",pkId:this.AgencyPkId}).then(function (response) {
                    if (response.code) {
                        callback(new Error('办事处名称重复'));
                    } else {
                        callback();
                    }
                });
            };
            var validPhone = (rule, value, callback) => {
                this.$get("/agency/validCheck", {chValue: this.addOfficeForm.phone,chName:"phone",pkId:this.AgencyPkId}).then(function (response) {
                    if (response.code) {
                        callback(new Error('手机号已存在'));
                    } else {
                        callback();
                    }
                });
            };
            return{
                action: this.common.CONSTANT.UPLOADIMGPATH + 'recognizeImage',
                sampleImg: false,
                sampleType:'',
                addOfficeRules: {
                    name: [{required: true, message: '此项不能为空', trigger: 'blur'},{
                        validator: validName,
                        trigger: 'blur'
                    }],
                    shortName: {required: true, message: '此项不能为空', trigger: 'blur'},
                    cityId: {required: true, message: '此项不能为空', trigger: 'blur'},
                    phone: [{required: true, message: '此项不能为空', trigger: 'blur'},,
                        {
                            validator: this.common.checkTelOrMobile,
                            trigger: 'blur'
                        },
                        {
                        validator: validPhone,
                        trigger: 'blur'
                    }],
                    contactName: {required: true, message: '此项不能为空', trigger: 'blur'},
                    contactCard: [{required: true, message: '此项不能为空', trigger: 'blur'},
                        {
                            validator:this.common.checkIdCard,
                            trigger: 'blur'
                        },
                        {
                        validator: validIdCard,
                        trigger: 'blur'
                    }],
                    contactPhone:[{required: true, message: '此项不能为空', trigger: 'blur'},{
                        validator: this.common.checkPhone,
                        trigger: 'blur'
                    }],
                    contactMail: [{required: true, message: '此项不能为空', trigger: 'blur'},{
                        validator:this.common.checkEmail,
                        trigger: 'blur'
                    }]
                },
                imageUrl: '',
                provinceOption: [],
                cityOption:[],
                areaOption:[],
                address: '',
                dialogFormVisible: false,
                MapClass: "",
                position:'',
                clickAddressDetail: '点击选取地址',
                center: '北京',
                addOfficeForm:{areaId:''},
                agency_hand_imageUrl_name:'',
                agency_hand_imageUrl_type:'',
                agency_hand_imageUrl:'',
                agency_id_card_back_imageUrl_name:'',
                agency_id_card_back_imageUrl_type:'',
                agency_id_card_back_imageUrl:'',
                agency_id_card_front_imageUrl_name:'',
                agency_id_card_front_imageUrl_type:'',
                agency_id_card_front_imageUrl:'',
                agency_pic_imageUrl_name:'',
                agency_pic_imageUrl_type:'',
                agency_pic_imageUrl:'',
                disUserName:'',
                disIdCard:'',
                disCardEnd:'',
                AgencyPkId:'',
                name:'',
                shortName:'',
                provName:'',
                cityName:'',
                areaName:'',
                contactName:'',
                contactCard:'',
                contactMail:'',
                phone:'',
                contactPhone:'',
                titleName:'',

            }
        },
        created: function () {
            this.initProvince(this);
        },
        methods:{
            initProvince: function () {
                this.common.initProvince(this, ["provinceOption"])
            },
            initCity: function (value, cityKey, clearKeys) {
                this.common.initCity(this, value, cityKey, clearKeys);
            },
            initArea: function (value, dataKey, clearKeys) {
                this.common.initArea(this, value, dataKey, clearKeys)
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
                that[imageUrl] = filePath;
                that[imageUrlType] = imageTypeValue;
                that[imageUrlName] = file.name;
/*
                that.driverForm = Object.assign({}, that.driverForm, driverForm);
*/
                if("agency_id_card_front" === imageType) {
                    if (attrs) {
                        this.disIdCard = attrs['idNumber'];
                        this.disUserName = attrs['idName'];
                    }
                }
                if("agency_id_card_back" === imageType) {
                    if (attrs) {
                        if (attrs['idValidity']) {
                            this.disCardEnd = attrs['idValidity'].split('-')[1].trim().replace(/\./g, '-');
                        }
                    }
                }



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
                    let addComp = rs.addressComponents;
                    let adderssDetal = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                    that.clickAddressDetail = adderssDetal;
                });
            },
            /*handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },*/

            closeModal: function () {
                this.clearData(this);
                this.$emit('update:pkId', '');
                this.$emit('update:visible', false)
            },
            submitInfo(){
                this.$refs.addOfficeForm.validate((valid) => {
                    if(valid) {
                        let imageValid = true;
                        let address = this.addOfficeForm.address;
                        if(!address){
                            this.$message.error("请输入详细地址！");
                            imageValid = false;
                        }
                        if(!this['agency_pic_imageUrl']){
                            this.$message.error("请上传办公场地照片！");
                            imageValid = false;
                        }
                        if (!this['agency_id_card_front_imageUrl'] || !this['agency_id_card_back_imageUrl'] || !this['agency_hand_imageUrl']) {
                            this.$message.error("联系人证件照片不全");
                            imageValid = false;
                        }
                        if(!imageValid){
                            return false;
                        }

                        let that = this;
                        let data = {};
                        data.pkId = this.AgencyPkId;
                        data.name = this.addOfficeForm.name;
                        data.shortName = this.addOfficeForm.shortName;
                        data.provId = this.addOfficeForm.provId;
                        data.provName = this.common.getProvinceName(this, this.addOfficeForm.provId, this.provinceOption);
                        data.cityId = this.addOfficeForm.cityId;
                        data.cityName = this.common.getCityName(this, this.addOfficeForm.cityId, this.cityOption);
                        data.areaId = this.addOfficeForm.areaId;
                        data.areaName = this.common.getAreaName(this, this.addOfficeForm.areaId, this.areaOption);
                        data.address = this.addOfficeForm.address;
                        data.contactName = this.addOfficeForm.contactName;
                        data.contactCard = this.addOfficeForm.contactCard;
                        data.contactMail = this.addOfficeForm.contactMail;
                        data.phone = this.addOfficeForm.phone;
                        data.contactPhone = this.addOfficeForm.contactPhone;
                        data.agencyImg = this.agency_pic_imageUrl.substring(that.common.CONSTANT.imagePrefix.length);
                        data.cardFrontImg = this.agency_id_card_front_imageUrl.substring(that.common.CONSTANT.imagePrefix.length);
                        data.cardBackImg = this.agency_id_card_back_imageUrl.substring(that.common.CONSTANT.imagePrefix.length);
                        data.cardHandImg = this.agency_hand_imageUrl.substring(that.common.CONSTANT.imagePrefix.length);
                        let dataInfo = {
                            "data": JSON.stringify(data)
                        };


                        that.$post("agency/personalAuth", {name:this.addOfficeForm.contactName,idCard:this.addOfficeForm.contactCard}).then(function (data) {
                            if (data.code == 0) {
                                that.$message.error("请核对联系人身份证号及姓名");
                            } else {
                                that.$post("agency/addOrUpdateAgency", dataInfo).then(function (data) {
                                    if (data.code == 0) {
                                        that.$message.error(data.msg);
                                    } else {
                                        that.AgencyPkId = ''
                                        that.$emit('update:visible', false);
                                        that.clearData(that);
                                        that.$router.go(0)
                                    }
                                }).catch(res => {
                                    console.log(res)
                                })
                            }
                        }).catch(res => {
                            console.log(res)
                        })

                    }
                });
            },
            clearData(that){
                that.AgencyPkId = ''
                that.addOfficeForm={areaId:''};
                that.agency_id_card_front_imageUrl='';
                that.agency_pic_imageUrl='';
                that.agency_id_card_back_imageUrl='';
                that.agency_hand_imageUrl='';
            }


        },
        watch: {
            visible: function () {
                if(this.visible && this.pkId !='') {
                    this.titleName='编辑办事处';
                    let that = this;
                    this.AgencyPkId = that.pkId;
                    that.$get("agency/getAgencyById", {"pkId": that.pkId}).then(function (response) {
                        if (response.resultData.agency != null) {
                            that.initCity(response.resultData.agency.provId, 'cityOption', ['addOfficeForm.cityId', 'addOfficeForm.areaId']);
                            that.initArea(response.resultData.agency.cityId, 'areaOption', ['addOfficeForm.areaId']);
                            that.addOfficeForm = response.resultData.agency;
                            that["agency_hand_imageUrl"] = that.common.CONSTANT.imagePrefix + response.resultData.agency.cardHandImg;
                            that["agency_id_card_back_imageUrl"] = that.common.CONSTANT.imagePrefix + response.resultData.agency.cardBackImg;
                            that["agency_id_card_front_imageUrl"] = that.common.CONSTANT.imagePrefix + response.resultData.agency.cardFrontImg;
                            that["agency_pic_imageUrl"] = that.common.CONSTANT.imagePrefix + response.resultData.agency.agencyImg;
                            // console.error(that.common.CONSTANT.imagePrefix+image.imagePath+"-----")

                        }

                    })
                }else{
                    this.titleName='新增办事处';
                }
            }
        }
    }
</script>

<style scoped>

</style>
