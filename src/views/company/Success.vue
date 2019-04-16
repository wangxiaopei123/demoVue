<template>
    <div class="case">
		<Header></Header>
		<div class="content">
			<div class="content-in" :style="{height:((screenHeight-64-60-12-16)>774)?((screenHeight-64-60-12-16)+'px'):(774+'px')}">
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
            <el-col :span="24">
				<div class="success-box">
					<div class="success-tip clear">
						<i class="el-icon-success"></i>
						<div class="tip-text">
							<span>北京运车网网络科技有限公司</span>
							<div class="success-txt">恭喜您，您提交的企业实名认证信息已经<span>审核通过</span></div>
						</div>
					</div>
					<div class="success-cont">
						<p>为了更加真实、全面的对贵公司运力资源的评估评分，需要您完成运力资源认证，感谢您的配合！</p>
						<el-button @click="jumpToNext" type="primary">运力认证信息填写</el-button>
					</div>
					<div class="success-bottom">
						<h4>为什么要进行企业运力资源认证?</h4>
						<ul class="clear">
							<li>
								<dl>
									<dt><img src="../../images/company/rzico1.png" alt=""></dt>
									<dd>提升能力值</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt><img src="../../images/company/rzico2.png" alt=""></dt>
									<dd>增加运单量</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt><img src="../../images/company/rzico3.png" alt=""></dt>
									<dd>数字化管理</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt><img src="../../images/company/rzico4.png" alt=""></dt>
									<dd>提升企业效率</dd>
								</dl>
							</li>



						</ul>
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
		created(){
            let register = this.common.fetchData("register");
            if (!register) {
                this.$message.info("访问异常，请重新登录");
                this.$router.push({
                    name: 'Login'
                })
            } else {
                this.getCompany();
			}

		},
        data() {
            return {
				screenHeight: document.documentElement.clientHeight, // 屏幕高度
				companyName:"",
                active: 3,
            };
        },
		mounted() {
			var _this = this;
			window.onresize = function() { // 定义窗口大小变更通知事件
				_this.screenHeight = document.documentElement.clientHeight // 窗口高度
			}
		},
        methods: {
            jumpToNext() {
                let company = this.common.fetchData("company");
                let carrierType = company['carrierType'];
				if (carrierType == 1) {
					this.$router.push({
						path : '/admitWeb/capacity/carTransport/addBigCarTransportInfo',
						name : 'AddBigCarTransportInfo',
						params: {
							carrierType: carrierType
						}
					});
				} else {
					this.$router.push({
						path : '/admitWeb/capacity/wayRescue/AddWayRescueInfo',
						name : 'AddWayRescueInfo'
					});
				}
			},
			getCompany() {
				let that = this;
				this.$get("findCompanyByUserId").then(function (response) {
					if (response) {
						that.companyName=response.name;
					} else {
						that.$message.info("访问异常，请重新登录");
						that.$router.push({
							name: 'Login'
						})
					}

				})
			}
		},

    }
</script>

<style scoped>
	.header img {
			float: left;
			margin-top: 20px;
		}
	.success-tip {
		padding: 8px 14px 10px;
		background-color: #f0faff;
		border-radius: 4px;
		border: 1px solid #2d8cf0;
	}
	.success-tip i,.tip-text {
		float: left;
	}
	.tip-text {
		margin-left: 10px;
	}
	/*.success-txt {*/
		/*font-size: 18px;*/
	/*}*/
	.success-txt span {
		color: #2d8cf0;
		margin-left: 20px;
	}
	.success-tip i {
		font-size: 24px;
		margin-top: 8px;
		color: #2d8cf0;
	}
    .success-box {
		margin: 0 auto;
		width: 80%;
		padding-bottom: 100px;
	}
	.success-cont {
		text-align: center;
	}
	.success-cont p {
		margin: 70px 0 50px;
		font-size: 18px;
	}
	.success-bottom {
		width: 76%;
		margin: 14% auto 0;
		text-align: center;
	}
	.success-bottom h4 {
		font-size: 18px;
		margin-bottom: 26px;
	}
	.success-bottom ul li {
		width: 25%;
		float: left;
	}
	.success-bottom ul li dl {
		width: 120px;
		height: 120px;
		border: 1px solid #ededed;
		border-radius: 4px;
		margin: 0 auto;
		padding: 12px 6px 14px;
		box-sizing: border-box;
	}
	.success-bottom ul li dl img {
		margin: 10px 0;
	}
	.success-bottom ul li dd {
		margin: 0 ;
		background-color: #f7f7f7;
		padding: 3px 0px;
		border-radius: 20px;
	}

</style>
