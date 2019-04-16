<template>
	<div class="home">
		<el-container>
			<!-- 头部布局 -->
			<el-header>
				<div class="header clear">
					<div class="logo">
						<img src="../images/home/logo.png" alt="">
					</div>
					<ul class="layout clear">
						<!--<li>消息</li>
						<li>问题反馈</li>
						<li>常见问题</li>-->
						<li>
							<el-dropdown @command="handleCommand">
								<span class="el-dropdown-link">
                                     {{companyName}}<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item command="Basic">基本资料</el-dropdown-item>
									<el-dropdown-item command="Safetyset">安全设置</el-dropdown-item>
									<el-dropdown-item command="Login">退出平台</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</li>
					</ul>
					<!-- 左右收缩图标 -->
					<!-- <i class="el-icon-d-arrow-left shrink" @click="toggleCollapse"></i> -->
				</div>
			</el-header>
			<el-container>
				<!-- 侧边栏布局 -->
				<el-aside width="239px">
					<el-menu :router="true" :collapse="isCollapse" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
					 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
						<!--<el-menu-item index="/indexPage">
							<i class="ico-home"></i>
							<span slot="title">首页</span>
						</el-menu-item>-->
						<el-menu-item index="/carManage" v-if="common.fetchData('company') && common.fetchData('company').carrierType === 1">
							<i class="ico-car"></i>
							<span slot="title">车辆管理</span>
						</el-menu-item>
						<el-menu-item index="/carWayManage" v-if="common.fetchData('company') && common.fetchData('company').carrierType === 2">
							<i class="ico-car"></i>
							<span slot="title">车辆管理</span>
						</el-menu-item>
						<el-menu-item index="/driverManage">
							<i class="ico-driver"></i>
							<span slot="title">司机管理</span>
						</el-menu-item>
						<el-menu-item index="/lineManage">
							<i class="ico-line"></i>
							<span slot="title">专线管理</span>
						</el-menu-item>
						<el-menu-item index="/cargoInsurance">
							<i class="ico-bx"></i>
							<span slot="title">物流保险</span>
						</el-menu-item>
						<el-menu-item index="/financeInfo">
							<i class="ico-cw"></i>
							<span slot="title">财务信息</span>
						</el-menu-item>
						<el-menu-item index="/officeManage">
							<i class="ico-office"></i>
							<span slot="title">办事处管理</span>
						</el-menu-item>
						<el-submenu index="1">
							<template slot="title">
								<i class="ico-account"></i>
								<span>账号管理</span>
							</template>
							<el-menu-item :class="active_menu" index="/basic">基本资料</el-menu-item>
							<el-menu-item class="menu-item-padding" :index="index_realname">实名认证</el-menu-item>
							<el-menu-item class="menu-item-padding" index="/Safetyset">安全设置</el-menu-item>
							<el-menu-item class="menu-item-padding" :index="index_page">委托人管理</el-menu-item>
							<el-menu-item class="menu-item-padding" :index="index_transportlicence">道路运输经营许可证</el-menu-item>
						</el-submenu>
						<!--<el-menu-item index="/messageManage">
							<i class="ico-news"></i>
							<span slot="title">消息管理</span>
						</el-menu-item>-->
					</el-menu>
				</el-aside>
				<!-- 中间内容区 -->
				<el-main :style="{height:((screenHeight-76)+'px')}">
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: document.documentElement.clientHeight, // 屏幕高度
				companyName:"",
				index_realname:"",
				index_transportlicence:"",
				index_safetyset:"",
				index_page:"",
				active_menu:"el-menu-item menu-item-padding",
				isCollapse: false
			}
		},
		created() {
            let register = this.common.fetchData("register");
            if (!register) {
                this.$message.info("访问异常，请重新登录");
                this.$router.push({
                    name: 'Login'
                })
            }
			this.getCompanyAgent();
			this.getTransportLicense();
			this.getCompanyDetail();
		},
		mounted() {
			var _this = this;
			window.onresize = function() { // 定义窗口大小变更通知事件
				_this.screenHeight = document.documentElement.clientHeight // 窗口高度
			}
		},
		methods: {
			getCompanyAgent() {
				let data = new FormData();
				let that = this;
				this.$get("clientManagement/getCompanyAgent", data).then(function (response) {
                    if(response.code ==1) {
                        if (response.resultData.ltdCompanyAgent != null) {
                        if (response.resultData.ltdCompanyAgent.verifyStatus == 1
                        ) {
                            that.index_page = "/clientmanagement";
                        } else {
                            that.index_page = "/clientmanagement_check";
                         }
                        }
                    }
				}).catch(error => {
					// console.log("error", error);
					// that.$message.error("获取信息失败!")
				});
			},
			getTransportLicense() {
				let data = new FormData();
				let that = this;
				this.$get("transport/getTransportLicense", data).then(function (response) {
                    if(response.code ==1) {
                        if (response.resultData.ltdCompanyTransportLicense != null) {
                            if(response.resultData.ltdCompanyTransportLicense.verifyStatus == 1){
                            that.index_transportlicence = "/transportlicence";
                            } else {
                                that.index_transportlicence = "/transportlicence_Check";
                            }
                        }
                    }
				}).catch(error => {
					// console.log("error", error);
					// that.$message.error("获取失败!")
				});
			},
			getCompanyDetail() {
				let data = new FormData();
				let that = this;
				this.$get("identification/getLtdCompanyDetail",data).then(function (response) {

					if(response.code ==1){
						if (response.resultData.ltdCompanyDetail != null) {
							that.companyName= response.resultData.ltdCompanyDetail.name;
							if (response.resultData.ltdCompanyDetail.verifyStatus == 1
									&& response.resultData.ltdCompanyDetail.status == 1
							) {
								that.index_realname = "/realname";
							} else {
								that.index_realname = "/realname_Check";

							}
						}
					}
				}).catch(error => {
					// console.log("error",error);
					// that.$message.error("获取信息失败!")
				});
			},
			handleOpen(key, keyPath) {
				// console.log(key, keyPath)
			},
			handleClose(key, keyPath) {
				// console.log(key, keyPath)
			},
			//下拉菜单指令事件
			handleCommand(command) {
// 				if(command == 'Basic'){
//
// 				},
this.active_menu = "el-menu-item menu-item-padding is-active",
				this.$router.push({
					name: command
				})
      },
			//菜单左右收起展开
// 			toggleCollapse() {
// 				this.isCollapse = !this.isCollapse
// 			},
			//退出登录
// 			logout() {
// 				//清除登录状态，即保存在localStorage中的token
// 				localStorage.removeItem('mytoken')
// 				//跳转到登录页
// 				this.$router.push({
// 					name: 'Login'
// 				})
// 			}
		}
	}
</script>

<style>
.el-dropdown-link {
    cursor: pointer;
    color: #fff;
		position: relative;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
	.el-dropdown-link::before {
		content: "";
		position: absolute;
		top: 3px;
    left: -20px;
		width: 14px;
		height: 14px;
		background: url(../images/home/ico-user.png) no-repeat;
	}
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
	.el-container {
		height: 100%;
	}
	.home {
		width: 100%;
		height: 100%;
	}
	.logo {
		float: left;
		color: #fff;
	}
	.logo img {
		vertical-align: middle;
	}
	.ico-home,.ico-account,.ico-news,.ico-car,.ico-driver,.ico-line,.ico-bx,.ico-cw,.ico-office {
		width: 14px;
		height: 14px;
		display: inline-block;
		margin-right: 10px;
		margin-top: 2px;
	}
	.ico-home {
		background: url(../images/home/ico-home.png) no-repeat;
	}
	.ico-account {
		background: url(../images/home/ico-account.png) no-repeat;
	}
	.ico-news {
		background: url(../images/home/ico-news.png) no-repeat;
	}
.ico-bx{
	background: url(../images/home/ico-bx.png) no-repeat;
}
.ico-cw{
	background: url(../images/home/ico-cw.png) no-repeat;
}
.ico-office {
	background: url(../images/home/ico-office.png) no-repeat;
}
.ico-car {
	background: url(../images/home/ico-car.png) no-repeat;
}
.ico-driver {
	background: url(../images/home/ico-driver.png) no-repeat;
}
.ico-line {
	background: url(../images/home/ico-line.png) no-repeat;
}
	.layout {
		float: right;
	}
.el-menu-item.is-active {
	background-color: #f0faff!important;
	color: #2d8cf0!important;
	border-right: 2px solid #2d8cf0;
}
/* .el-submenu>.el-submenu__title {
	background-color: #fff!important;
	color: #2d8cf0!important;
} */
.layout li {
		float: left;
		margin-left: 50px;
		cursor: pointer;
		font-size: 14px;
		color: #fff;
	}
.el-menu-item,.el-submenu__title {
	padding-left: 25px!important;
}
.el-menu-item.menu-item-padding {
	padding-left: 50px!important;
}
.el-submenu__title i {
	color: #515a6e;
}
.el-submenu__icon-arrow {
	margin-top: -5px;
}
	.shrink {
		position: absolute;
		left: 100px;
		top: 50%;
		transform: translateY(-50%);
	}

	.el-header,
	.el-footer {
		background-color: #2d8cf0;
		color: #333;
		line-height: 60px;
	}
	.el-header {
		margin-bottom: 16px;
		padding:0 25px 0 0;
	}

	.el-aside {
		background-color: #fff;
		color: #333;
		border-right: 1px solid #dcdee2;
	}
	.el-menu {
		border-right: none;
	}

	.el-main {
		background-color: #fff;
		color: #515a6e;
	}
	.el-menu,.el-menu-item,.el-submenu__title {
		background-color: #fff!important;
		color: #515a6e!important;
	}

	body>.el-container {
		margin-bottom: 40px;
	}
</style>
