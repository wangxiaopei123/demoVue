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
	<!-- 	<Header></Header>-->
		<div class="content">
			<div class="content-in" :style="{height:((screenHeight-64-60-12-16)>580)?((screenHeight-64-60-12-16)+'px'):(580+'px')}">
				<div class="steps-box">
					<div class="steps steps-step">
						<el-steps :active="active" finish-status="success" process-status="finish" align-center>
							<el-step title="企业资料填写"></el-step>
							<el-step title="企业实名认证"></el-step>
							<el-step title="认证成功"></el-step>
						</el-steps>
					</div>
					</div>
					<div class="type-box">
						<h2>选择物流公司身份</h2>
						<ul class="type-ul clear">
							<li>
								<div class="type-item">
									<i class="ico-type1"></i>
									<el-radio v-model="radio" label="1">轿运物流公司</el-radio>
								</div>
							</li>
							<li>
								<div class="type-item">
									<i class="ico-type2"></i>
									<el-radio v-model="radio" label="2">道路救援公司</el-radio>
								</div>
							</li>
						</ul>
						<el-button type="primary" @click="submit()">下一步</el-button>
					</div>
				</div>

		</div>
	</div>
</template>

<script>
	import Header from '../../frame/HeaderCapacity'  //头部
	export default {
		components:{
			'Header':Header
		},


		data() {

			return {
				screenHeight: document.documentElement.clientHeight, // 屏幕高度
				active: 0, //步骤栏默认
				radio: '1',
				rules:{},
				ruleForm:{}
			}
		},
		mounted() {
			var _this = this;
			window.onresize = function() { // 定义窗口大小变更通知事件
				_this.screenHeight = document.documentElement.clientHeight // 窗口高度
			}
		},
		methods: {
			submit(){
                let that = this;
                this.$router.push({
                    path : '/company/Info_Logistics',
                    name : 'Info_Logistics',
                    params: {
                        carrierType: that.radio
                    }
                });
			}
		}
	}
</script>

<style>
	.header img {
		float: left;
		margin-top: 20px;
	}
	.type-box {
		width: 70%;
		margin: 0 auto;
		text-align: center;
	}
	.type-item .el-radio__inner {
		width: 16px;
		height: 16px;
	}
	.type-item .el-radio__label {
		font-size: 16px;
	}
	.type-item .el-radio {
		color: #515a6e;
	}
	.type-box h2 {
		font-size: 20px;
		margin: 10% 0 8%;
	}
	.type-ul {
		margin-bottom: 40px;
	}
	.type-ul li {
		width: 50%;
		float: left;
		margin-bottom: 40px;
		cursor: pointer;
	}
	.type-item {
		width: 300px;
		height: 145px;
		border: 1px solid #e6e7eb;
		margin: 0 auto;
		border-radius: 6px;
	}
	.type-item:hover {
		border-color: #abd1f9;
	}
	.type-item i {
		display: block;
		margin: 24px auto;
		width: 54px;
		height: 54px;
	}
	.ico-type1 {
		background: url(../../../images/capacity/ico-type1.png) no-repeat;
	}
	.ico-type2 {
		background: url(../../../images/capacity/ico-type2.png) no-repeat;
	}
</style>
