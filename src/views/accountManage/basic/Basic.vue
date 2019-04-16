<template>
    <div class="realname">
        <h2 class="manage-title">基本资料</h2>
        <div class="manage-tip">
            <i class="el-icon-question"></i>
            <div class="manage-tip-txt">为了更好的为您提供服务，请完善以下信息</div>
        </div>

        <el-row class="manage-info manage-com">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right" label-width="150px"
                     size="mini">
                <h2 class="info-title">基本信息</h2>
                <div class="info-item info-other clear">
                    <el-form-item label="企业身份：" >
                        <span v-if="ruleForm.companyAttribute =='1'">有限责任公司</span>
                        <span v-else-if="ruleForm.companyAttribute =='2'">股份有限公司</span>
                        <span v-else-if="ruleForm.companyAttribute =='3'">国有企业</span>
                        <span v-else-if="ruleForm.companyAttribute =='4'">个人独资企业</span>
                        <span v-else-if="ruleForm.companyAttribute =='5'">集体所有制</span>
                        <span v-else-if="ruleForm.companyAttribute =='6'">合伙企业</span>
                        <span v-else-if="ruleForm.companyAttribute =='7'">外商投资企业</span>
                        <span v-else-if="ruleForm.companyAttribute =='8'">联营企业</span>
                        <span v-else-if="ruleForm.companyAttribute =='9'">独营企业</span>
                        <span v-else>其他</span>

                    </el-form-item>
                    <el-form-item label="" class="hidden">
                        {{ruleForm.pkId}}
                    </el-form-item>
                    <el-form-item label="企业名称：">
                        {{ruleForm.companyName}}
                    </el-form-item>
                    <el-form-item label="企业简称：">
                        <el-input v-model="ruleForm.companyNameShort">{{ruleForm.companyNameShort}}</el-input>
                    </el-form-item>
                    <el-form-item label="通信电话：">
                        <el-input v-model="ruleForm.companyRegPhone">{{ruleForm.companyRegPhone}}</el-input>
                    </el-form-item>
                    <el-form-item label="通信地址：" class="address">
                        <el-select v-model="ruleForm.companyProvId" placeholder="请选择省" filterable
                                   @change="initCity(ruleForm.companyProvId,'companyCityId',['ruleForm.companyCityId','ruleForm.companyAreaId'])">
                            <el-option
                                    v-for="item in companyProvId"
                                    :key="item.regionId"
                                    :label="item.name"
                                    :value="item.regionId">
                            </el-option>
                        </el-select>
                        <el-select v-model="ruleForm.companyCityId" placeholder="请选择市" filterable
                                   @change="initArea(ruleForm.companyCityId,'companyAreaId',['ruleForm.companyAreaId'])">
                            <el-option
                                    v-for="item in companyCityId"
                                    :key="item.regionId"
                                    :label="item.name"
                                    :value="item.regionId">
                            </el-option>
                        </el-select>
                        <el-select v-model="ruleForm.companyAreaId" placeholder="请选择区/县" filterable>
                            <el-option
                                    v-for="item in companyAreaId"
                                    :key="item.regionId"
                                    :label="item.name"
                                    :value="item.regionId">
                            </el-option>
                        </el-select>
                        <el-input v-model="ruleForm.companyAddress" class="width-other">
                            <template slot="append" ><span @click="openMap($event,'companyAddress')"><i class="el-icon-location-outline"></i></span></template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="组织机构图：" prop="transport_license_imageUrl">
                        <div class="upload_box">
                        <el-upload
                                class="avatar-uploader"
                                name="depart_image"
                                :action="action"
                                :show-file-list="false"
                                :http-request="requestUpload"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"><!--图片验证 :before-upload="beforeAvatarUpload" -->
                            <img v-if="depart_image_imageUrl" :src="depart_image_imageUrl"
                                 :imageType="depart_image_imageUrl_type"
                                 :imageName="depart_image_imageUrl_name"
                                 :depart_image_id="depart_image_id"
                                 class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        </div>
                    </el-form-item>
                </div>
                <h2 class="info-title">办公场地信息</h2>
                <div class="info-item info-other clear">
                    <el-form-item label="门头照片：">
                        <div class="upload_box">
                        <el-upload
                                class="avatar-uploader"
                                name="office_head"
                                :action="action"
                                :show-file-list="false"
                                :http-request="requestUpload"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"><!--图片验证 :before-upload="beforeAvatarUpload" -->
                            <img v-if="office_head_imageUrl" :src="office_head_imageUrl"
                                 :imageType="office_head_imageUrl_type"
                                 :imageName="office_head_imageUrl_name"
                                 :office_image_id="office_head_id"
                                 class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        </div>
                        <div class="upload_box">
                        <el-upload
                                class="avatar-uploader"
                                name="office_operation"
                                :action="action"
                                :show-file-list="false"
                                :http-request="requestUpload"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"><!--图片验证 :before-upload="beforeAvatarUpload" -->
                            <img v-if="office_operation_imageUrl" :src="office_operation_imageUrl"
                                 :imageType="office_operation_imageUrl_type"
                                 :imageName="office_operation_imageUrl_name"
                                 :office_operation_image="office_operation_id"
                                 class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        </div>
                    </el-form-item>
                    <el-form-item class="required_flag" label="办公室办公照片" style="height:147px">
                        <img v-if="office_picture1_imageUrl" :src="office_picture1_imageUrl"
                             :imageType="office_picture1_imageUrl_type"
                             :imgName="office_picture1_imageUrl_name" class="cardImg">
                        <img v-if="office_picture2_imageUrl" :src="office_picture2_imageUrl"
                             :imageType="office_picture2_imageUrl_type"
                             :imgName="office_picture2_imageUrl_name" class="cardImg">
                        <img v-if="office_picture3_imageUrl" :src="office_picture3_imageUrl"
                             :imageType="office_picture3_imageUrl_type"
                             :imgName="office_picture3_imageUrl_name" class="cardImg">
                    </el-form-item>
                    <el-form-item label="办公室地址：" class="address" style="height: 101px;">
                        <el-select v-model="ruleForm.provId" placeholder="请选择省" filterable
                                   @change="initCity(ruleForm.provId,'cityId',['ruleForm.cityId','ruleForm.areaId'])">
                            <el-option
                                    v-for="item in provId"
                                    :key="item.regionId"
                                    :label="item.name"
                                    :value="item.regionId">
                            </el-option>
                        </el-select>
                        <el-select v-model="ruleForm.cityId" placeholder="请选择市" filterable
                                   @change="initArea(ruleForm.cityId,'areaId',['ruleForm.areaId'])">
                            <el-option
                                    v-for="item in cityId"
                                    :key="item.regionId"
                                    :label="item.name"
                                    :value="item.regionId">
                            </el-option>
                        </el-select>
                        <el-select v-model="ruleForm.areaId" placeholder="请选择区/县" filterable>
                            <el-option
                                    v-for="item in areaId"
                                    :key="item.regionId"
                                    :label="item.name"
                                    :value="item.regionId">
                            </el-option>
                        </el-select>

                        <el-input v-model="ruleForm.address">
                            <template slot="append"><span @click="openMap($event,'address')"><i class="el-icon-location-outline"></i></span></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="required_flag" label="运作场地照片：" style="height: 101px;">
                        <img v-if="operation_picture1_imageUrl" :src="operation_picture1_imageUrl"
                             :imageType="operation_picture1_imageUrl_type"
                             :imgName="operation_picture1_imageUrl_name" class="cardImg">
                        <img v-if="operation_picture2_imageUrl" :src="operation_picture2_imageUrl"
                             :imageType="operation_picture2_imageUrl_type"
                             :imgName="operation_picture2_imageUrl_name" class="cardImg">
                        <img v-if="operation_picture3_imageUrl" :src="operation_picture3_imageUrl"
                             :imageType="operation_picture3_imageUrl_type"
                             :imgName="operation_picture3_imageUrl_name" class="cardImg">
                    </el-form-item>
                    <el-form-item label="运作场地类型">
                        <el-radio-group v-model="ruleForm.fieldType">
                            <el-radio :label="1">自有</el-radio>
                            <el-radio :label="2">共享</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="运作场地地址：" class="address">
                        <el-select v-model="ruleForm.fieldProvId" placeholder="请选择省" filterable
                                   @change="initCity(ruleForm.fieldProvId,'fieldCityId',['ruleForm.fieldCityId','ruleForm.fieldAreaId'])">
                            <el-option
                                    v-for="item in fieldProvId"
                                    :key="item.regionId"
                                    :label="item.name"
                                    :value="item.regionId">
                            </el-option>
                        </el-select>
                        <el-select v-model="ruleForm.fieldCityId" placeholder="请选择市" filterable
                                   @change="initArea(ruleForm.fieldCityId,'fieldAreaId',['ruleForm.fieldAreaId'])">
                            <el-option
                                    v-for="item in fieldCityId"
                                    :key="item.regionId"
                                    :label="item.name"
                                    :value="item.regionId">
                            </el-option>
                        </el-select>
                        <el-select v-model="ruleForm.fieldAreaId" placeholder="请选择区/县" filterable>
                            <el-option
                                    v-for="item in fieldAreaId"
                                    :key="item.regionId"
                                    :label="item.name"
                                    :value="item.regionId">
                            </el-option>
                        </el-select>

                        <el-input v-model="ruleForm.fieldAddress">
                            <template slot="append"><span @click="openMap($event,'fieldAddress')"><i
                                    class="el-icon-location-outline"></i></span></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="最大空位数：">
                        <el-input v-model="ruleForm.fieldMaxVacancy"></el-input>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">保存</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-dialog title="选取地址" :visible.sync="dialogFormVisible">
            <baidu-map class="map" :center="center" style="height: 300px;width: 100%" :scroll-wheel-zoom="true"
                       @click="getPointAddress">
                <bm-marker :position="position" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true"
                                :autoLocation="true"></bm-geolocation>
            </baidu-map>

            <span slot="footer" class="dialog-footer">
                <span>{{clickAddressDetail}}</span>
            <el-button type="primary" @click="dialogFormVisible = false;ruleForm[MapClass] = clickAddressDetail">确 定</el-button>
          </span>

        </el-dialog>
    </div>
</template>
<script>
    import {checkMobile} from "../../../common/validate";
    import common from "../../../common/common"; //导入正则校验
    export default {
        data() {

            return {
                //地图
                dialogFormVisible: false,
                center: '北京',
                MapClass: "",
                position: "",
                clickAddressDetail:'点击选取地址',

                action: this.common.CONSTANT.UPLOADIMGPATH + "recognizeImage",
                companyImgList: [],
                companyId: "",

                //图片

                depart_image_id: "",
                depart_image_imageUrl: "",
                depart_image_imageUrl_type: "",
                depart_image_imageUrl_name:"",
                office_head_id: "",
                office_head_imageUrl: "",
                office_head_imageUrl_type: "",
                office_head_imageUrl_name:"",
                office_operation_id: "",
                office_operation_imageUrl: "",
                office_operation_imageUrl_type: "",
                office_operation_imageUrl_name:"",
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
                //图片
                companyProvId: [],
                provId: [],
                fieldProvId: [],
                companyCityId: [],
                cityId: [],
                fieldCityId: [],
                companyAreaId: [],
                areaId: [],
                fieldAreaId: [],


                imageUrl: '',   //图片地址
                dialogImageUrl: '',
                dialogVisible: false,

                value: '',
                ruleForm: {
                    pkId:"",
                    reg_phone: "",
                    agentPhone: "",
                    nameShort: "",
                    fieldType: "1",
                    companyProvId: "",
                    provId: "",
                    fieldProvId: "",
                    companyCityId: "",
                    cityId: "",
                    fieldCityId: "",
                    companyAreaId: "",
                    areaId: "",
                    fieldAreaId: "",

                },
                rules: {
                    agentPhone: [{
                        required: true,
                        message: '请输入法人手机号码',
                        trigger: 'blur'
                    }, {
                        validator: checkMobile,
                        message: '请输入正确手机号码',
                        trigger: 'blur'
                    }]
                }
            }
        },
        created() {
            this.initProvince();
            this.getCompanyOffice();
            // this.initCity(this.ruleForm.companyProvId,[this.ruleForm.companyCityId,this.ruleForm.companyAreaId])
            //initCity: function (value, cityKey, clearKeys)
        },
        methods: {
            getCompanyOffice() {
                let data = new FormData();
                let that = this;

                this.$get("transport/getCompanyOffice", data).then(function (response) {
                     that.initCity(response.resultData.ltdCompanyOfficeVO.companyProvId,'companyCityId',['ruleForm.companyCityId','ruleForm.companyCityName']);
                     that.initArea(response.resultData.ltdCompanyOfficeVO.companyCityId, 'companyAreaId', ['ruleForm.companyAreaId']);

                    that.initCity(response.resultData.ltdCompanyOfficeVO.provId,'cityId',['ruleForm.cityId','ruleForm.cityName']);
                    that.initArea(response.resultData.ltdCompanyOfficeVO.cityId, 'areaId', ['ruleForm.areaId']);

                    that.initCity(response.resultData.ltdCompanyOfficeVO.fieldProvId,'fieldCityId',['ruleForm.fieldCityId','ruleForm.fieldCityName']);
                    that.initArea(response.resultData.ltdCompanyOfficeVO.fieldCityId, 'fieldAreaId', ['ruleForm.fieldAreaId']);
                    that.ruleForm.fieldAreaId=response.resultData.ltdCompanyOfficeVO.fieldAreaId;
                    that.ruleForm = response.resultData.ltdCompanyOfficeVO;
                    that.companyId=response.resultData.ltdCompanyOfficeVO.companyId;
                    if(response.resultData.ltdCompanyOfficeVO.companyProvId ==0) {
                        that.ruleForm.companyProvId = "";
                        that.ruleForm.companyCityId = "";
                        that.ruleForm.companyAreaId = "";
                    }
                    // that.initCity()

                    // that.initArea(response.resultData.ltdCompanyOfficeVO.cityId, 'area', ['ruleForm.area']);
                    if (response.resultData.imgList != null) {
                        that.companyImgList = response.resultData.imgList;
                    }
                    if (that.companyImgList.length > 0) {
                        that.companyImgList.forEach(function (image) {
                            let imageType = image['imageMark'];
                            let imagePath = imageType + "_imageUrl";
                            let imagePkId = imageType + "_id";
                            type: image['type'];
                            that[imagePath] = that.common.CONSTANT.imagePrefix+image['imagePath'];
                            that[imagePkId]=image['pkId'];
                        })
                    }
                }).catch(error => {
                    console.log("error", error);
                    that.$message.error("获取信息失败!")
                });
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
            //初始化城市
            initProvince: function () {
                common.initProvince(this, ["companyProvId", "provId", "fieldProvId"])
            },
            //加载城市
            initCity: function (value, cityKey, clearKeys) {

                this.common.initCity(this, value, cityKey, clearKeys);
            },
            initArea: function (value, dataKey, clearKeys) {
                common.initArea(this, value, dataKey, clearKeys)
            },
            /********图片校验 start**********/
            requestUpload(obj) {
                obj.companyId = this.companyId;
                this.common.uploadImgFun(obj, this);
            },
            handleAvatarSuccess(response, file) {
                // let data = JSON.parse(res.data);
                // this[data.resultData.imageType+"_imageUrl"] = data.resultData.filePath;
                let data = JSON.parse(response.data);
                let imageType = data['resultData']['imageType'];
                let imageTypeValue = data['resultData']['imageTypeValue'];
                let filePath = data['resultData']['filePath'];
      //        let attrs = data['resultData']['attrs'];
                let imageUrl = imageType + "_imageUrl";
                let imageUrlType = imageUrl + "_type";
                let imageUrlName = imageUrl + "_name";
                // this[imageUrlName] = URL.createObjectURL(file.raw);
                this[imageUrl] = filePath;
                this[imageUrlType] = imageTypeValue;
                this[imageUrlName] = file.name;
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
            /********图片校验 end**********/
            submitForm() {
                let that = this;
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        //资源文件集合
                        let companyImgList = [];

                        if (this['depart_image_imageUrl']) { //组织机构图
                            companyImgList.push(
                                {
                                    imageName: this['depart_image_imageUrl_name'],
                                    imagePath: this['depart_image_imageUrl'],
                                    type: this['depart_image_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'depart_image',
                                    pkId: this['depart_image_id']
                                }
                            )
                        }
                        if (this['office_head_imageUrl']) { //办公室门头照
                            companyImgList.push(
                                {
                                    imageName: this['office_head_imageUrl_name'],
                                    imagePath: this['office_head_imageUrl'],
                                    type: this['office_head_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'office_head',
                                    pkId: this['office_head_id']
                                }
                            )
                        }
                        if (this['office_operation_imageUrl']) { //运作场地门头照
                            companyImgList.push(
                                {
                                    imageName: this['office_operation_imageUrl_name'],
                                    imagePath: this['office_operation_imageUrl'],
                                    type: this['office_operation_imageUrl_type'],
                                    imageStatus: 0,
                                    imageMark: 'office_operation',
                                    pkId: this['office_operation_id']
                                }
                            )
                        }


                        let companyOfficeVO = {
                            "companyProvName": that.common.getProvinceName(that, that.ruleForm.companyProvId, that.companyProvId),
                            "companyCityName": that.common.getCityName(that, that.ruleForm.companyCityId, that.companyCityId),
                            "companyAreaName": that.common.getAreaName(that, that.ruleForm.companyAreaId, that.companyAreaId),
                            "provName": that.common.getProvinceName(that, that.ruleForm.provId, that.provId),
                            "cityName": that.common.getCityName(that, that.ruleForm.cityId, that.cityId),
                            "areaName": that.common.getAreaName(that, that.ruleForm.areaId, that.areaId),
                            "fieldProvName": that.common.getProvinceName(that, that.ruleForm.fieldProvId, that.fieldProvId),
                            "fieldCityName": that.common.getCityName(that, that.ruleForm.fieldCityId, that.fieldCityId),
                            "fieldAreaName": that.common.getAreaName(that, that.ruleForm.fieldAreaId, that.fieldAreaId)

                        };
                        this.$post('transport/saveCompanyOffice', {"data": JSON.stringify(this.ruleForm),"imgData":JSON.stringify(companyImgList),"companyOfficeVO":JSON.stringify(companyOfficeVO)}).then((response) => {
                            this.$message({
                                message:response.msg,
                                type: 'success'
                            });
                        }).catch(() => {
                            this.$message.error('消息加载失败');
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }

    }
</script>

<style scoped>
    .cardImg {
        width: 90px;
        height: 90px;
    }
    .hidden {
        display: none;
    }
</style>
