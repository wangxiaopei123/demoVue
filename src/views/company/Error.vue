<template>
    <div class="case">
		<Header></Header>
		<!--<div class="header clear">-->
			<!--<img src="../../images/company/logo.png" alt="logo">-->
			<!--<div class="tabbar">-->
				<!--<a href="/#/Register">注册</a>-->
				<!--<a href="/#/login">登录</a>-->
				<!--<a href="https://www.iyunche.com/index?index=1">返回官网</a>-->
				<!--<a href="javascript:;">常见问题</a>-->
			<!--</div>-->
		<!--</div>-->
		<div class="content">
			<div class="content-in" :style="{height:((screenHeight-64-60-12-16)>762)?((screenHeight-64-60-12-16)+'px'):(762+'px')}">
		<div class="steps-box">
        <div class="steps steps-step">
            <el-steps :active="active" finish-status="error" process-status="finish" align-center>
                <el-step title="企业资料填写"></el-step>
                <el-step title="企业实名认证"></el-step>
                <el-step title="认证成功"></el-step>
            </el-steps>
        </div>
		</div>
        <el-row>
            <el-col :span="24">
				<div class="error-box">
					<div class="error-tip">
						<i class="el-icon-error"></i>
						<div class="tip-text">企业实名认证资料<span>审核失败</span></div>
					</div>
					<div class="error-cont">
						<div class="error clear">
							<div class="error-l">
								<img src="../../images/company/errorbg.png" alt="">
							</div>
							<div class="error-r">
								<h2>审核失败原因如下：</h2>
								<template v-if="suggestBusinesType">
									<h4>企业信息有误：</h4>
									<p v-for="busines in suggestBusinesType" >
										{{ busines }}
									</p>
								</template>
								<template v-if="suggestLinceseType">
									<h4>道路运输许可证有误：</h4>
									<p v-for="lincese in suggestLinceseType" >
										{{ lincese }}
									</p>
								</template>
								<template v-if="suggestLegalType">
									<h4>法定代表人(授权人)信息有误：</h4>
									<p v-for="legal in suggestLegalType" >
										{{ legal }}
									</p>
								</template>
								<template v-if="suggestAgentType">
									<h4>委托人(业务负责人)信息有误：</h4>
									<p v-for="agent in suggestAgentType" >
										{{ agent }}
									</p>
								</template>
								<template v-if="suggestOfficeType">
									<h4>企业办公场地有误：</h4>
									<p v-for="office in suggestOfficeType" >
										{{ office }}
									</p>
								</template>
							</div>
						</div>
						<div class="align-center">
							<el-button type="primary" @click="reAuth">重新认证</el-button>
						</div>
					</div>
				</div>

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
        data() {
            let suggest = this.common.fetchData('suggest');
            let suggestBusinesType = [];
            let suggestLinceseType = [];
            let suggestLegalType = [];
            let suggestAgentType = [];
            let suggestOfficeType = [];
            if (suggest) {
                suggest.forEach(function(t){
                    switch (t.key) {
						case 'suggestBusinesType' : suggestBusinesType.push(t.name);break;
                        case 'suggestLinceseType' : suggestLinceseType.push(t.name);break;
                        case 'suggestLegalType' : suggestLegalType.push(t.name);break;
                        case 'suggestAgentType' : suggestAgentType.push(t.name);break;
                        case 'suggestOfficeType' : suggestOfficeType.push(t.name);break;
                    }
				});
				this.suggestBusinesType = suggestBusinesType;
                this.suggestLinceseType = suggestLinceseType;
                this.suggestLegalType = suggestLegalType;
                this.suggestAgentType = suggestAgentType;
                this.suggestOfficeType = suggestOfficeType;
			}

            return {
				screenHeight: document.documentElement.clientHeight, // 屏幕高度
                active: 2,
                suggestBusinesType : suggestBusinesType.length  > 0 ? suggestBusinesType : '',
                suggestLinceseType : suggestLinceseType.length > 0 ? suggestLinceseType : '',
                suggestLegalType : suggestLegalType.length > 0 ? suggestLegalType : '',
                suggestAgentType : suggestAgentType.length > 0 ? suggestAgentType : '',
                suggestOfficeType : suggestOfficeType.length > 0 ? suggestOfficeType : ''
            };
        },
		mounted() {
			var _this = this;
			window.onresize = function() { // 定义窗口大小变更通知事件
				_this.screenHeight = document.documentElement.clientHeight // 窗口高度
			}
		},
        methods: {
            reAuth() {
                let register = this.common.fetchData("register");
                if (!register) {
                    this.$message.info("访问异常，请重新登录");
                    this.$router.push({
                        name: 'Login'
                    })
                } else {
                    let authentic = this.common.fetchData("authentic");
                    let logisticsType = authentic['ltdCompany']['logisticsType'];
                    let path = '';
                    let name = '';
                    if (logisticsType == 1) { //物流企业
                        path = '/company/Info_Logistics';
                        name = 'Info_Logistics';
                    } else {
                        path = '/company/info_other';
                        name = 'Info_Other';
                    }
                    this.$router.push({
                        path: path,
                        name: name
                    });

				}
			},
		},

    }
</script>

<style scoped>
	.error {
		width: 80%;
		margin: 80px auto;
	}
	.error-r h2 {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 6px;
	}
	.error-r h4 {
		font-weight: bold;
	}
	.error-l {
		width: 50%;
		float: left;
	}
	.error-l img {
		margin-top: 20px;
	}
	.error-r {
		width: 42%;
		line-height: 24px;
		float: right;
	}
	.error-box {
		margin: 0 auto;
		width: 80%;
		padding-bottom: 100px;
	}
	.align-center {
		text-align: center;
	}
	.error-tip {
		background-color: #fef0f0;
		border-radius: 4px;
		border: 1px solid #f56c6c;
		padding: 8px 14px 10px;
	}
	.error-tip i {
		vertical-align: middle;
		font-size: 24px;
		color: #f56c6c;
	}
	.tip-text {
		margin-left: 5px;
		display: inline-block;
		vertical-align: middle;
		font-size: 14px;
	}
	.tip-text span {
		margin-left: 20px;
		color: #f56c6c;
	}
    .header img {
    		float: left;
    		margin-top: 20px;
    	}
</style>
