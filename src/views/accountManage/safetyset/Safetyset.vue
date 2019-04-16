<template>
	<div class="safetyset">
		<h2 class="manage-title">安全设置</h2>
		<div class="safety-tip clear">
			<span class="atnow">当前安全账号级别</span>
			<span class="chunk chunk-deep"></span>
			<span class="chunk chunk-deep"></span>
			<span class="chunk"></span>
			<span class="chunk"></span>
			<span class="rank">中</span>	
		</div>
		<div class="manage-tip">
			<div class="manage-tip-txt">为了更好的保护您的交易安全，建议您通过以下方式提高安全级别</div>
		</div>
		<div class="manage-info">
			<ul class="safety-ul">
				<li class="clear">
					<div class="safety-l">
						<h5>登录密码</h5>
						<span>建议您定期更换密码以保护账户安全</span>
					</div>
					<div class="safety-r">
						<a class="set-yet" href="javascript:;"><i class="el-icon-success"></i> 已设置</a>
						<a class="amend" href="javascript:" @click="$router.push('editpass')">修改</a>
					</div>
				</li>
				<li class="clear">
					<div class="safety-l">
						<h5>手机绑定</h5>
						<span>您已绑定手机<b>{{phone}}</b>若手机号已丢失或停用，请立即更换，避免账户被盗，手机号可以用来找回密码、登录账号</span>
					</div>
					<div class="safety-r">
						<a class="set-yet" href="javascript:;"><i class="el-icon-success"></i> 已设置</a>
						<a class="amend"  href="javascript:" @click="$router.push('editmobile')">修改</a>
					</div>
				</li>
				<li class="clear" id="realMail">
					<div class="safety-l">
						<h5>邮箱绑定</h5>
						<span>您已绑定邮箱<b>{{mail}}</b>绑定后可以提高账号安全级别，用来找回密码、登录账号</span>
					</div>
					<div class="safety-r">
						<a class="set-yet" href="javascript:;"><i class="el-icon-success"></i> 已设置</a>
						<a class="amend"  href="javascript:" @click="$router.push('editmail')">修改</a>
					</div>
				</li>
				<li class="clear" id="bindMail">
					<div class="safety-l">
						<h5>邮箱绑定</h5>
						<span><a href="javascript:;">您还未绑定邮箱</a>绑定后可以提高账号安全级别，用来找回密码、登录账号</span>
					</div>
					<div class="safety-r">
						<a class="set-not" href="javascript:;"><i class="el-icon-warning"></i> 未设置</a>
						<a class="set-go"  href="javascript:" @click="$router.push('setmail')">去设置</a>
					</div>
				</li>
			</ul>
			
		</div>
		
		
		

	</div>
</template>

<script>
</script>

<style scoped>
	.amend,.set-go,.amend:visited,.set-go:visited {
		color: #2d8cf0;
	}
	.set-not,.set-not:visited {
		color: #ed4014;
	}
	.set-yet,.set-yet:visited {
		color: #67c23a;
	}
	.safety-r a {
		margin-left: 20px;
	}
	.set-yet,.set-not {
		position: relative;
	}
	.set-yet::after,.set-not::after {
		content: "";
		position: absolute;
		top: 4px;
		right: -14px;
		width: 1px;
		height: 12px;
		background-color: #909399;
	}
	
	.safety-ul li {
		margin-bottom: 40px;
	}
	.safety-l {
		width: 84%;
		float: left;
	}
	.safety-l h5 {
		display: inline-block;
		color: #515a6e;
		font-size: 18px;
		margin-right: 15px;
	}
	.safety-l span {
		color: #909399;
	}
	.safety-l span b,.safety-l span a {
		margin-right: 20px;
	}
	.safety-l span b {
		color: #515a6e;
	}
	.safety-l span a {
		color: #ed4014;
	}
	.safety-r {
		width:14%;
		float: right;
	}
	.safety-tip {
		margin-bottom: 26px;
	}
	.safety-tip span {
		display: inline-block;
		vertical-align: middle;
	}
	.atnow {
		margin-right: 10px;
	}
	.chunk {
		margin-left: 8px;
		background-color: #a0cfff;
		width: 40px;
		height: 16px;
	}
	.chunk.chunk-deep {
		background-color: #2d8cf0;
	}
	.rank {
		color: #2d8cf0;
		margin-left: 10px;
	}
</style>
<script>
    export default {
     created() {
                  this.getsafeDate();

            },
       data(){
     	return {
         	phone:"",
             mail:""
              			}

       },
        methods:{
            getsafeDate(){

                let that = this;

                      let data = new FormData();

				    this.$post('user/getUserInformation',data).then(function (response) {
                    let data = response;
                     if (data.code == 1) {
                         let reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})");
                         let mobileTel = data.phone.toString();
                         let tel = mobileTel.replace(reg, "$1****$3");
                         that.phone=tel;
                          that.mail= data.mail
                          if(data.mail ==null || ""===data.mail){
                            document.getElementById("realMail").style.display="none";
                          }else{
                             document.getElementById("bindMail").style.display="none";
                          }
                		} else {
                            that.$message.error(data.msg);
                				}
                             }).catch(error => console.log("error",error));

            }
        }
    }
</script>