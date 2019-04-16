<template>
    <div class="case">

        <Header></Header>

		<div class="content" >
			<div class="content-in" :style="{height:((screenHeight-64-60-12-16)>880)?((screenHeight-64-60-12-16)+'px'):(880+'px')}">
		<div class="steps-box">
        <div class="steps steps-step">
            <el-steps :active="active" finish-status="success" process-status="finish" align-center>
                <el-step title="企业资料填写"></el-step>
                <el-step title="企业实名认证"></el-step>
                <el-step title="认证成功"></el-step>
            </el-steps>
        </div>
		</div>
		<div style="padding: 0 4%;">
		<div class="result-tip" >
			<i class="el-icon-time"></i>
			<div class="tip-text">企业实名认证资料
                <span v-if="final_status===0">待审核</span>
                <span v-else-if="final_status===1">待审核</span>
                <span v-else>审核中</span>
            </div>
		</div>
		</div>
        <el-row class="result-case">
            <el-col :span="12">
                <div class="result-box">
                    <p class="result-sh"> 审核结果将在24小时内通过手机短信的方式通知到您</p>
                    <img src="../../images/company/resultbg.png" alt="">
                            <p class="sh-txt" v-if="final_status===0">待审核</p>
                            <p class="sh-txt" v-else-if="final_status===1">待审核</p>
                            <p class="sh-txt" v-else>审核中</p>
                        </div>

                    </el-col>
                    <el-col :span="12">
                        <div style="float: right;padding-right:10%;width:68%;">
                            <el-card class="box-card"
                                     style="min-height: 366px;background-color: #f6f6f6;box-shadow: none;border: none;border-radius: 0;margin-top: 0;">
                                <div slot="header" class="clearfix">
                                    <span style="font-weight: bold;font-size: 18px;">运力资源认证需要准备哪些资料？</span>
                                </div>
                                <p style="margin-bottom: 6px;"><span style="font-weight: bold;font-size: 16px;">车辆认证需提前准备：</span>
                                </p>
                                <p>
                                    <span>车辆 </span>
                                    <a href="javascript:" @click="sampleImg = true,sampleType = '12'">行驶证彩色证件照</a>
                                </p>
                                <p><span>车辆 </span><a href="javascript:" @click="sampleImg = true,sampleType = '4'">道路运输证彩色照片</a></p>
                                <p><span>车辆 </span><a href="javascript:" @click="sampleImg = true,sampleType = '16'">正面彩色照片</a></p>

                                <p><span>车辆 </span><a href="javascript:"> 交强险 商业车险保险单彩色照片</a></p>

                                <!--<p><span>外协车辆，必须上传盖有公司公章或财务专用章的外协协议彩色照&nbsp;&nbsp; </span><a download=""-->
                                                                                             <!--href="../images/register/test.xlsx">下载模板</a>-->
                                <!--</p>-->

                                <p style="margin: 12px 0px 6px;"><span style="font-weight: bold;font-size: 16px;">司机认证需提前准备：</span>
                                </p>
                                <p>
                                    <span>司机 </span>
                                    <a href="javascript:" @click="sampleImg = true,sampleType = '6'">身份证正面、</a>
                                    <a href="javascript:" @click="sampleImg = true,sampleType = '7'">身份证反面、</a>
                                    <a href="javascript:" @click="sampleImg = true,sampleType = '8'">手持身份证彩色照片、</a>
                                    <a href="javascript:" @click="sampleImg = true,sampleType = '25'">授权协议彩色照片</a>
                                </p>
                                <p>
                                    <span>司机 </span>
                                    <a href="javascript:" @click="sampleImg = true,sampleType = '9'">驾驶证彩色证件照</a>
                                </p>
                                <p>
                                    <span>司机 </span>
                                    <a href="javascript:" @click="sampleImg = true,sampleType = '11'">从业资格证彩色照片</a>
                                </p>

                                <!--<p><span>挂靠司机，必须上传盖有公司公章或财务专用章的挂靠协议彩色照&nbsp;&nbsp; </span><a download=""-->
                                                                                             <!--href="../images/register/test.xlsx">下载模板</a>-->
                                <!--</p>-->
                            </el-card>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <SampleGraph :visible.sync="sampleImg" :sampleType="sampleType"></SampleGraph>
    </div>
</template>

<script>
    import Header from '../frame/Header'  //头部
    import SampleGraph from '../admitWeb/SampleGraph'  //示例图

    export default {
        components:{
            'Header':Header,
            'SampleGraph':SampleGraph
        },

        data() {

            return {
                sampleImg: false,
                sampleType:'',
				screenHeight: document.documentElement.clientHeight, // 屏幕高度
                active: 1,
                final_status: 0,
            };
        },
		mounted() {
			var _this = this;
			window.onresize = function() { // 定义窗口大小变更通知事件
				_this.screenHeight = document.documentElement.clientHeight // 窗口高度
			}
		},
        created() {
            this.getVerifyStatus()
        },

        methods: {
            getVerifyStatus() {
                let that = this;
                this.$get("findCompanyByUserId").then(function (response) {
                    if (response) {
                        that.final_status=response.finalStatus;
                    }
                })

            },
        },
    }
</script>

<style scoped>
    .result-tip {
        margin-bottom: 60px;
        background-color: #fdf6ec;
        border-radius: 4px;
        border: 1px solid #e6a23c;
        padding: 8px 14px 10px;
    }

    .result-tip i {
        vertical-align: middle;
        font-size: 24px;
        color: #e6a23c;
    }

    .tip-text {
        margin-left: 5px;
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
    }

    .tip-text span {
        margin-left: 20px;
        color: #e6a23c;
    }

    .result-case {
        padding-bottom: 60px;
    }

    .result-box {
        padding-left: 10%;
        text-align: center;
    }

    .result-box img {
        margin: 60px 0 20px;
    }

    .sh-txt {
        font-size: 26px;
        color: #e6a23c;
    }

    .header img {
    		float: left;
    		margin-top: 20px;
    	}
    .register {
        display: none;
    }
.el-card__header {
	padding: 13px 20px;
	color: #515a6e;
}
.el-card__body {
	padding: 10px 20px 40px;
}
.el-card__body p {
		line-height: 22px;
		color: #515a6e;
	}
	.el-card__body p a {
		color: #2d8cf0;
	}

    a {
        text-decoration: none;
    }

    .cardImg {
        display: inline-block;
        height: auto;
        max-width: 80%;
    }


    .verification {
        border-radius: 12px;
        width: 100px;
        letter-spacing: 5px;
        margin-left: 50px;
        height: 40px;
        transform: translate(-15px, 0);
    }

    .captcha {
        height: 50px;
        text-align: justify;
    }
</style>
