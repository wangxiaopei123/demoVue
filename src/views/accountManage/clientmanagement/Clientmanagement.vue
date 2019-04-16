<template>
    <div class="realname manage-com">
        <h2 class="manage-title">委托人管理</h2>
        <div class="manage-tip">
            <i class="el-icon-question"></i>
            <div class="manage-tip-txt"><span>委托人信息已通过运车管家认证审核。</span>如需变更委托人认证信息，您可以通过 <a
                    href="javascript:;" @click="editCompanyInfo">修改认证信息</a>重新提交委托人认证信息进行变更审核
            </div>
        </div>

        <el-row class="manage-info">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                     label-position="right" label-width="150px"
                     size="mini">
                <h2 class="info-title">基本信息</h2>
                <div class="info-item clear">
                    <el-form-item label="" class="hidden">
                        {{ruleForm.pkId}}
                    </el-form-item>
                    <el-form-item label="委托人姓名：" class="required_flag">
                        {{ruleForm.agentName}}
                    </el-form-item>
                    <el-form-item label="身份证号：" class="required_flag">
                        {{ruleForm.agentCard}}
                    </el-form-item>
                    <el-form-item label="证件有效期限：" class="required_flag">
                        {{ruleForm.agentCardtime}}
                    </el-form-item>
                </div>
                <h2 class="info-title">联系信息</h2>

                <div class="info-item clear">
                    <el-form-item label="联系电话：" class="required_flag">
                        {{ruleForm.agentPhone}}
                    </el-form-item>
                    <el-form-item label="联系邮箱：" class="required_flag">
                        {{ruleForm.agentEmail}}
                    </el-form-item>
                    <el-form-item label="通信地址" class="adress">
                        <el-select v-model="ruleForm.province" placeholder="请选择省" style="width: 32.4%" filterable
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

                        <el-input v-model="ruleForm.agentAddress" style="margin-top: 8px;">
                            <template slot="append"><span @click="openMap($event,'agentAddress')"><i
                                    class="el-icon-location-outline"></i></span></template>
                        </el-input>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">保存</el-button>
                </el-form-item>

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
                        <el-button type="primary"
                                   @click="dialogFormVisible = false;ruleForm[MapClass] = clickAddressDetail">确 定</el-button>
                    </span>
                </el-dialog>
            </el-form>
        </el-row>
    </div>
</template>

<script>
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
                checkAdvice: "",
                province: [],
                city: [],
                area: [],
                value: '',
                ruleForm: {
                    agentName: "",
                    agentCard: "",
                    agentCardtime: "",
                    agentPhone: "",
                    agentEmail: "",
                    province: "",
                    city: "",
                    area: "",
                    agentAddress: ""
                },
                rules: {}
            }
        },
        created() {
            this.initProvince();

            this.getCompanyAgent();

            //  this.test();

        },
        methods: {

            getCompanyAgent() {
                let data = new FormData();
                let that = this;
                this.$get("clientManagement/getCompanyAgent", data).then(function (response) {
                    that.ruleForm = response.resultData.ltdCompanyAgent;

                    that.initCity(response.resultData.ltdCompanyAgent.agentProvId, 'city', ['ruleForm.city', 'ruleForm.area']);
                    that.initArea(response.resultData.ltdCompanyAgent.agentCityId, 'area', ['ruleForm.area']);
                    that.ruleForm.city = response.resultData.ltdCompanyAgent.agentCityId;
                    that.ruleForm.province = response.resultData.ltdCompanyAgent.agentProvId;
                    that.ruleForm.area = response.resultData.ltdCompanyAgent.agentAreaId;
                    if (response.resultData.ltdCompanyAgent.verifyStatus == 1
                    ) {
                        that.checkAdvice = "审核通过"
                    } else if (response.resultData.ltdCompanyAgent.verifyStatus == 0) {
                        that.checkAdvice = "审核中"
                    } else {
                        that.checkAdvice = "审核没有通过"
                    }
                }).catch(error => {
                    console.log("error", error);
                    that.$message.error("获取信息失败!")
                });
            },
            //初始话城市
            /*    initProvince : function(){
                    var that = this;
                    this.$post('province',{"parentId":"1000000"}).then((response) => {
                        if (response.code == 0) {
                            that.$message.error(response.msg);
                        } else {
                            that["province"] = response.data;
                        }
                    }).catch(()=>{
                        this.$message.error('消息加载失败');
                    });
     */
            test() {
                var provId = 520000;
                var cityId = 522700;
                var area = 522722;
                this.initCity(provId, 'city', ['ruleForm.city', 'ruleForm.area']);
                this.initArea(cityId, 'area', ['ruleForm.area']);
                this.ruleForm.province = provId;
                this.ruleForm.city = cityId;
                this.ruleForm.area = area;

            },
            //初始化城市
            initProvince: function () {
                common.initProvince(this, ["province"])
            },
            //加载城市
            initCity: function (value, cityKey, clearKeys) {
                common.initCity(this, value, cityKey, clearKeys);
            },
            initArea: function (value, dataKey, clearKeys) {
                common.initArea(this, value, dataKey, clearKeys)
            },

            editCompanyInfo() {
                this.$router.push({
                    path: '/clientmanagement_check',
                    name: 'Clientmanagement_Check',
                    params: {
                        "flag": 1
                    }
                });
                //this.$router.push('/clientmanagement_check/');
            },
            submitForm() {
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

        }

    }
</script>

<style scoped>
    .hidden {
        display: none;
    }
</style>
