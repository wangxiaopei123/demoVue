<template>
	<div class="case">
		<div class="header clear">
			<!--<img src="../../images/company/logo.png" alt="logo">-->
			<div class="tabbar">
				<a href="javascript:" @click="$router.push('/Register')">注册</a>
				<a href="javascript:" @click="$router.push('/login')">登录</a>
				<!--<a href="https://www.iyunche.com/index?index=1">返回官网</a>-->
				<!--<a href="javascript:;">常见问题</a>-->
			</div>
		</div>
<!-- 		<Header></Header> -->
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
						<el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
							<!--验证时加上（ :rules="rules" ） -->
							<h2 class="info-title">企业信息</h2>
							<div class="info-item clear">
							<el-form-item label="企业名称："  prop="name">
								<!---验证时加上（ prop="name" ） -->
								<el-input v-model="ruleForm.name"></el-input>
							</el-form-item>
							<el-form-item label="统一社会信用代码：" prop="creditCode">
								<el-input v-model="ruleForm.creditCode" maxlength="18" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
							</el-form-item>
							<el-form-item label="企业简称：">
								<el-input v-model="ruleForm.nameShort" maxlength="20" ></el-input>
							</el-form-item>
							<el-form-item label="企业类型：" prop="attribute">
								<el-select v-model="ruleForm.attribute" placeholder="请选择">
									<el-option
											v-for="item in attributeOptions"
											:key="item.value"
											:label="item.label"
											:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="注册地址：" prop="regAddress">
								<el-input type="textarea" placeholder="请输入内容" v-model="ruleForm.regAddress"></el-input>
							</el-form-item>
							<el-form-item label="经营范围：" prop="businessScope">
								<el-input type="textarea" placeholder="请输入内容" v-model="ruleForm.businessScope"></el-input>
							</el-form-item>
							<el-form-item label="营业期限：" prop="businessTerm">
								<el-date-picker :readonly="businessTermRD" class="date_width" v-model="ruleForm.businessTerm" type="date" placeholder="选择日期">
								</el-date-picker>
								<el-checkbox @change="businessTermCK">长期</el-checkbox>
							</el-form-item>
							<el-form-item label="注册资本：" prop="regCapital" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')">
								<el-input style="width: 90%;" v-model="ruleForm.regCapital" maxlength="100"></el-input>&nbsp;万元
							</el-form-item>
							<el-form-item label="注册电话：">
								<el-input v-model="ruleForm.regPhone" onkeyup="value=value.replace(/[^0-9]/g,'')" maxlength="11"></el-input>
							</el-form-item>
							</div>
							<h2 class="info-title">法定代表人信息</h2>

							<div class="info-item clear">
							<el-form-item label="法定代表人姓名：" prop="legalPersonName">
								<el-input v-model="ruleForm.legalPersonName" maxlength="50"></el-input>
							</el-form-item>
							<el-form-item label="身份证号：" prop="legalPersonCard">
								<el-input v-model="ruleForm.legalPersonCard" maxlength="18" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
							</el-form-item>
							<el-form-item label="证件有效期：" prop="legalPersonCardtime">
								<el-date-picker :readonly="legalPersonCardtimeRD" class="date_width" v-model="ruleForm.legalPersonCardtime" type="date" placeholder="选择日期">
								</el-date-picker>
								<el-checkbox @change="legalPersonCardtimeCK">长期</el-checkbox>
							</el-form-item>
							<el-form-item label="联系电话：" prop="legalPersonPhone">
								<el-input v-model="ruleForm.legalPersonPhone" maxlength="11" onkeyup="value=value.replace(/[^0-9]/g,'')"></el-input>
							</el-form-item>
							</div>
							<h2 class="info-title">委托人信息（业务负责人）</h2>
							<div class="info-item info-other clear">
							<el-form-item label="委托人姓名：" prop="agentName">
								<el-input v-model="ruleForm.agentName"></el-input>
							</el-form-item>
							<el-form-item label="身份证号：" prop="agentCard">
								<el-input v-model="ruleForm.agentCard" maxlength="18" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
							</el-form-item>
							<el-form-item label="证件有效限：" prop="agentCardtime">
								<el-date-picker :readonly="agentCardtimeRD" class="date_width" v-model="ruleForm.agentCardtime" type="date" placeholder="选择日期">
								</el-date-picker>
								<el-checkbox @change="agentCardtimeCK">长期</el-checkbox>
							</el-form-item>
							<el-form-item label="联系电话：" prop="agentPhone">
								<el-input v-model="ruleForm.agentPhone" onkeyup="value=value.replace(/[^0-9]/g,'')" maxlength="11"></el-input>
							</el-form-item>
							<el-form-item label="联系邮箱：" prop="agentEmail">
								<el-input v-model="ruleForm.agentEmail"></el-input>
							</el-form-item>
							<el-form-item label="通信地址" class="address">
								<el-select v-model="ruleForm.agentProvId" placeholder="请选择省" @change="initCity(ruleForm.agentProvId,'cityOption',['ruleForm.agentCityId','ruleForm.agentAreaId'])">
									<el-option v-for="item in provinceOption" :key="item.regionId" :label="item.name" :value="item.regionId">
									</el-option>
								</el-select>
								<el-select v-model="ruleForm.agentCityId" placeholder="请选择市" @change="initArea(ruleForm.agentCityId,'areaOption',['ruleForm.agentAreaId'])">
									<el-option v-for="item in cityOption" :key="item.regionId" :label="item.name" :value="item.regionId">
									</el-option>
								</el-select>
								<el-select v-model="ruleForm.agentAreaId" placeholder="请选择区">
									<el-option v-for="item in areaOption" :key="item.regionId" :label="item.name" :value="item.regionId">
									</el-option>
								</el-select>

								<el-input v-model="ruleForm.agentAddress" class="width-other"  >
									<template slot="append"><span @click="openMap($event,'agentAddress')"><i class="el-icon-location-outline"></i></span></template>
								</el-input>
							</el-form-item>
							</div>
							<el-form-item>
								<el-button @click="retreat" :disabled="retreatDisable">上一步</el-button>
								<el-button type="primary" @click="submitForm" v-loading="loading">确定</el-button>
							</el-form-item>


							<el-dialog title="选取地址" :visible.sync="dialogFormVisible">
								<baidu-map class="map" :center="center"  style="height: 300px;width: 100%"
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
	</div>
</template>

<script>
	import Header from '../frame/Header'  //头部
    export default {
		components:{
			'Header':Header
		},
        created() {
			window.scrollTo(0,0);
            let register = this.common.fetchData("register");
            if (!register) {
                this.$message.info("访问异常，请重新登录");
                this.$router.push({
                    name: 'Login'
                })
            } else {
                this.phone = register['phone'];
                let authentic = this.common.fetchData("authentic");
                this.common.getProvince(this,'provinceOption');
                if (authentic) {
                    if (authentic.ltdCompanyAgent['agentProvId']) {
                        this.common.getCity(this,authentic.ltdCompanyAgent['agentProvId'],'cityOption');
                    }
                    if (authentic.ltdCompanyAgent['agentCityId']) {
                        this.common.getArea(this,authentic.ltdCompanyAgent['agentCityId'],'areaOption');
                    }
                    this.creditCode = authentic['ltdCompany']['creditCode'];
                }
			}
        }
        ,data() {
            let validCreditCode = (rule, value, callback) => {
				if (this.creditCode != this.ruleForm.creditCode) {
                    this.$get("validCreditCode", {"creditCode": this.ruleForm.creditCode}).then(function (response) {
                        if (response.code) {
                            callback(new Error('该企业已经完成实名认证'));
                        } else {
                            callback();
                        }
                    });
				} else {
				    callback();
				}
            };
            let authentic = this.common.fetchData("authentic");
            let ruleForm = {};
            let ltdCompany = authentic.ltdCompany;
            ruleForm.name = ltdCompany.name;
            ruleForm.nameShort = ltdCompany.nameShort;
            ruleForm.attribute = ltdCompany.attribute ? ltdCompany.attribute : null;
            ruleForm.creditCode = ltdCompany.creditCode;
            ruleForm.regAddress = ltdCompany.regAddress;
            ruleForm.businessScope = ltdCompany.businessScope;
            ruleForm.businessTerm = ltdCompany.businessTerm ? ltdCompany.businessTerm : null;
            ruleForm.regCapital = ltdCompany.regCapital;
            ruleForm.regPhone = ltdCompany.regPhone;
            let ltdCompanyLegalPerson = authentic.ltdCompanyLegalPerson;
            ruleForm.legalPersonName = ltdCompanyLegalPerson.legalPersonName;
            ruleForm.legalPersonCard = ltdCompanyLegalPerson.legalPersonCard;
            ruleForm.legalPersonCardtime = ltdCompanyLegalPerson.legalPersonCardtime;
            ruleForm.legalPersonPhone = ltdCompanyLegalPerson.legalPersonPhone;
            let ltdCompanyAgent = authentic.ltdCompanyAgent;
            ruleForm.agentName = ltdCompanyAgent.agentName;
            ruleForm.agentCard = ltdCompanyAgent.agentCard;
            ruleForm.agentCardtime = ltdCompanyAgent.agentCardtime;
            ruleForm.agentPhone = ltdCompanyAgent.agentPhone;
            ruleForm.agentEmail = ltdCompanyAgent.agentEmail;
            ruleForm.agentProvId = ltdCompanyAgent.agentProvId ? ltdCompanyAgent.agentProvId : null;
            ruleForm.agentCityId = ltdCompanyAgent.agentCityId ? ltdCompanyAgent.agentCityId : null;
            ruleForm.agentAreaId = ltdCompanyAgent.agentAreaId ? ltdCompanyAgent.agentAreaId : null;
            ruleForm.agentAddress = ltdCompanyAgent.agentAddress;

            return {
                businessTermRD: false,
                legalPersonCardtimeRD: false,
                agentCardtimeRD: false,
                dialogFormVisible: false,
                center: '北京',
				centerMap: '',
                MapClass: "",
                position: "",
                clickAddressDetail:'点击选取地址',
                retreatDisable: false,
                loading: false,
                creditCode: '',
                phone: '',
                active: 1, //步骤栏默认
                imageUrl: '',   //图片地址
                fileList: [],
                provinceOption: [],
                cityOption: [],
                areaOption: [],
                attributeOptions: [{
                    value: 1,
                    label: '有限责任公司'
                }, {
                    value: 2,
                    label: '股份有限公司'
                }, {
                    value: 3,
                    label: '国有企业'
                }, {
                    value: 4,
                    label: '个人独资企业'
                }, {
                    value: 5,
                    label: '集体所有制'
                }, {
                    value: 6,
                    label: '合伙企业'
                }, {
                    value: 7,
                    label: '外商投资企业'
                }, {
                    value: 8,
                    label: '联营企业'
                }, {
                    value: 9,
                    label: '独营企业'
                }],
                value: '',
                ruleForm: ruleForm,
                rules:{
                    name : {required: true, trigger: 'blur',validator: this.common.checkCompanyName},
                    creditCode :[
									{
										required: true, trigger: 'blur',validator: this.common.checkCreditCode},
									{
										validator: validCreditCode,trigger: 'blur'
									}
								],
                    attribute :{required: true, message: '此项不能为空', trigger: 'blur'},
                    regAddress :{required: true,trigger: 'blur',validator : this.common.checkRegAddress},
                    businessScope :{required: true, trigger: 'blur',validator : this.common.checkBusinessScope},
                    businessTerm :{required: true, message: '此项不能为空', trigger: 'blur'},
                    regCapital :{required: true, message: '此项不能为空', trigger: 'blur'},
                    legalPersonName :{required: true, trigger: 'blur',validator : this.common.checkUserName},
                    legalPersonCard :{required: true, trigger: 'blur', validator : this.common.checkIdCard},
                    legalPersonCardtimeq :{required: true, message: '此项不能为空', trigger: 'blur'},
                    legalPersonPhone :{required: true,  trigger: 'blur',validator : this.common.checkPhone},
                    agentName :{required: true, trigger: 'blur',validator : this.common.checkUserName},
                    agentCard :{required: true, trigger: 'blur', validator : this.common.checkIdCard},
                    agentCardtime :{required: true, message: '此项不能为空', trigger: 'blur'},
                    agentPhone :{required: true, trigger: 'blur',validator : this.common.checkPhone},
                    agentEmail :{required: true,trigger: 'blur',validator : this.common.checkEmail},
                    legalPersonCardtime :{required: true,message: '此项不能为空',trigger: 'blur'},
                }
            }
        },
        methods: {
            initCity: function (value, cityKey, clearKeys) {
                this.common.initCity(this,value,cityKey,clearKeys);
            },
            initArea : function(value, dataKey,clearKeys){
                this.common.initArea(this,value,dataKey,clearKeys)
            },
            getCity(id) {
                this.common.getCity(this,id,'cityOption');
            },
            getArea(id) {
                this.common.getArea(this,id,'areaOption');
            },
            retreat() {
                let authentic = this.buildData();
                this.common.saveData("authentic",authentic);
                let type = authentic['ltdCompany']['logisticsType'];
                let path = '';
                let name = '';
                if (type == 2) {
					path = '/company/info_other';
					name = 'Info_Other';
				} else {
                    path = '/company/Info_Logistics';
                    name = 'Info_Logistics';
				}
                this.$router.push({
                    path: path,
                    name: name
                });
            },
            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        let authenticData = this.buildData();
                        let data = {
                            "data": JSON.stringify(authenticData),
                            "type": "3"
                        };
                        let that = this;
                        that.loading = true;
                        that.retreatDisable = true;
                        this.$post("authentic", data).then(function (response) {
                            let data = response;
                            that.retreatDisable = false;
                            if (data.code == 0) {
                                that.$message.error(data.msg);
                            } else {
                                that.common.saveData("authentic",authenticData);
                                that.validCompany(authenticData);
                                that.legalPersonAuth(authenticData);
                                that.agentPersonAuth(authenticData);
                                that.$router.push({
                                    path: '/company/result',
                                    name: 'CompanyResult'
                                });
                            }
                            that.loading = false;
                        }).catch(error => {
                            that.retreatDisable = false;
                            that.loading = false;
                            console.log("error",error)
                        });
                    }
                });
            }
            ,validCompany(authenticData) {
                let ltdCompany = authenticData.ltdCompany;
                let companyId = ltdCompany['pkId'];
                let enterpriseName = ltdCompany['name'];
                let enterpriseRegistrationNumber = ltdCompany['creditCode'];
                let ltdCompanyTransportLicense = authenticData.ltdCompanyTransportLicense;
                if (!ltdCompanyTransportLicense) {
                    return false;
				}
                let provinceCode = ltdCompanyTransportLicense['licenseProvId'];
                let permitNumber = ltdCompanyTransportLicense['licenseNo'];

                let data = {
                    "companyId":companyId,
                    "enterpriseName":enterpriseName,
                    "enterpriseRegistrationNumber":enterpriseRegistrationNumber,
                    "provinceCode":provinceCode,
                    "legalRepresentative":'',
                    "permitNumber":permitNumber
				};
                this.$post("validCompany", data).then(function (response) {
                    // console.log("validCompany response",response);
                }).catch(error => console.log("error",error));
			}
			,legalPersonAuth(authenticData) {
                let ltdCompanyLegalPerson = authenticData.ltdCompanyLegalPerson;
                let companyId = ltdCompanyLegalPerson['companyId'];
                let name = ltdCompanyLegalPerson['legalPersonName'];
                let idCard = ltdCompanyLegalPerson['legalPersonCard'];
                let data = {
                    "companyId": companyId,
                    "type": "1",
                    "name": name,
                    "idCard": idCard
				};
                this.$post("personalAuth", data).then(function (response) {
                    // console.log("legalPersonAuth response",response);
                }).catch(error => console.log("error",error));
            }
            ,agentPersonAuth(authenticData) {
                let ltdCompanyAgent = authenticData.ltdCompanyAgent;
                let companyId = ltdCompanyAgent['companyId'];
                let name = ltdCompanyAgent['agentName'];
                let idCard = ltdCompanyAgent['agentCard'];
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
            ,buildData() {
                let authentic = this.common.fetchData("authentic");
                let ltdCompany = authentic.ltdCompany;
                ltdCompany.name = this.ruleForm.name;
                ltdCompany.nameShort = this.ruleForm.nameShort;
                ltdCompany.attribute = this.ruleForm.attribute;
                ltdCompany.creditCode = this.ruleForm.creditCode;
                ltdCompany.regAddress = this.ruleForm.regAddress;
                ltdCompany.businessScope = this.ruleForm.businessScope;
                ltdCompany.businessTerm = this.ruleForm.businessTerm;
                ltdCompany.regCapital = this.ruleForm.regCapital;
                ltdCompany.regPhone = this.ruleForm.regPhone;
                let ltdCompanyLegalPerson = authentic.ltdCompanyLegalPerson;
                ltdCompanyLegalPerson.legalPersonName = this.ruleForm.legalPersonName;
                ltdCompanyLegalPerson.legalPersonCard = this.ruleForm.legalPersonCard;
                ltdCompanyLegalPerson.legalPersonCardtime = this.ruleForm.legalPersonCardtime;
                ltdCompanyLegalPerson.legalPersonPhone = this.ruleForm.legalPersonPhone;
                let ltdCompanyAgent = authentic.ltdCompanyAgent;
                ltdCompanyAgent.agentName = this.ruleForm.agentName;
                ltdCompanyAgent.agentCard = this.ruleForm.agentCard;
                ltdCompanyAgent.agentCardtime = this.ruleForm.agentCardtime;
                ltdCompanyAgent.agentPhone = this.ruleForm.agentPhone;
                ltdCompanyAgent.agentEmail = this.ruleForm.agentEmail;

                ltdCompanyAgent.agentProvId = this.ruleForm.agentProvId;
                ltdCompanyAgent.agentProvName = this.common.getProvinceName(this,this.ruleForm.agentProvId,this.provinceOption);
                ltdCompanyAgent.agentCityId = this.ruleForm.agentCityId;
                ltdCompanyAgent.agentCityName = this.common.getCityName(this,this.ruleForm.agentCityId,this.cityOption);
                ltdCompanyAgent.agentAreaId = this.ruleForm.agentAreaId;
                ltdCompanyAgent.agentAreaName = this.common.getAreaName(this,this.ruleForm.agentAreaId,this.areaOption);
                ltdCompanyAgent.agentAddress = this.ruleForm.agentAddress;
                return authentic;
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
                this.position = {lng: e.point.lng, lat: e.point.lat};
                let myGeocoder = new BMap.Geocoder();
                let that = this;
                myGeocoder.getLocation(point, function (rs) {
                    let addComp = rs.addressComponents;
                    let adderssDetal = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                    that.clickAddressDetail = adderssDetal;
                });
            }
            ,businessTermCK(ck) {
                if (ck) {
                    this.businessTermRD = true;
                    this.ruleForm.businessTerm = '2119-01-01 00:00:00';
				} else {
                    this.businessTermRD = false;
                    this.ruleForm.businessTerm = '';
				}
			}
			,legalPersonCardtimeCK(ck) {
                if (ck) {
                    this.legalPersonCardtimeRD = true;
                    this.ruleForm.legalPersonCardtime = '2119-01-01 00:00:00';
                } else {
                    this.legalPersonCardtimeRD = false;
                    this.ruleForm.legalPersonCardtime = '';
                }
			}
			,agentCardtimeCK(ck) {
                if (ck) {
                    this.agentCardtimeRD = true;
                    this.ruleForm.agentCardtime = '2119-01-01 00:00:00';
                } else {
                    this.agentCardtimeRD = false;
                    this.ruleForm.agentCardtime = '';
                }
			}
        }
    }
</script>

<style scoped>
.header img {
    		float: left;
    		margin-top: 20px;
    	}
</style>
