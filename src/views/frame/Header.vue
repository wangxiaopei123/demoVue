<template>
	<div>
		<div class="header com_header clear">
            <img src="../../images/company/logo.png" alt="logo">
            <div class="tabbar">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{companyName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="Login">退 出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
		</div>
	</div>
</template>

<script>
    export default {

        data() {
            return {
                companyName:""
            };
        },
        mounted() {
            this.getCompany();
        },

        methods: {
            //下拉菜单指令事件
            handleCommand(command) {
                this.$router.push({
                    name: command
                })
            },
            getCompany() {
                let that = this;
                this.$get("findCompanyByUserId").then(function (response) {
                    if (response) {
                        that.companyName=response.name;
                    }
                })

            }
        },


    }
</script>

<style>
    .el-dropdown-menu {
        /*width: 86px;*/
        text-align: center;
        border-radius: 0;
    }
    .com_header img {
        margin-top: 20px;
    }
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
        background: url(../../images/home/ico-user.png) no-repeat;
    }
    .el-popper[x-placement^=bottom] {
        margin-top: 0;
    }
    .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
        background-color: #fff;
    }
</style>
