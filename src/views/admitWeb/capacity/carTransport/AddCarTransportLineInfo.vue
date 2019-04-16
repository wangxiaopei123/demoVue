<template>
    <div class="case">
        <Header></Header>
        <div class="content">
            <div class="content-in" :style="{height:((screenHeight-64-60-12-16)>704)?((screenHeight-64-60-12-16)+'px'):(704+'px')}">
                <div class="steps-box">
                    <div class="steps">
                        <el-steps :active="active" finish-status="success" process-status="finish" align-center>
                            <el-step title="车辆信息添加"></el-step>
                            <el-step title="司机信息添加"></el-step>
                            <el-step title="专线信息登记"></el-step>
                            <el-step title="运力资源认证"></el-step>
                            <el-step title="认证成功"></el-step>
                        </el-steps>
                    </div>
                </div>

                <div class="capacity-case">
                    <div class="manage-tip">
                        <i class="el-icon-question"></i>
                        <div class="manage-tip-txt">为了保证您的报价有竞争力，建议在专线报价前，先行参考行业内价格水平，以免因为报价过低或过高造成损失，感谢您的配合。</div>
                    </div>
                    <BaseTransportLineInfo :showOpera="true"></BaseTransportLineInfo>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import BaseTransportLineInfo from '../../../admitManage/lineManage/BaseTransportLineInfo'
    import Header from '../../../frame/HeaderCapacity'  //头部
    export default {
        components: {
            BaseTransportLineInfo,
            'Header':Header
        }
        , data() {
            return {
                screenHeight: document.documentElement.clientHeight, // 屏幕高度
                companyId: '',
                active: 2, //步骤栏默认
            }
        },
        mounted() {
            var _this = this;
            window.onresize = function() { // 定义窗口大小变更通知事件
                _this.screenHeight = document.documentElement.clientHeight // 窗口高度
            }
        }
        , methods: {

        }
    }

</script>

