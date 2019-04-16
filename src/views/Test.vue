<template>
    <div>
        fadsfasd
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
            <el-form-item label="id">
               <el-input v-model="ruleForm.id"></el-input>
            </el-form-item>
            <el-form-item label="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="所属">
                <el-input v-model="ruleForm.age" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="submit" @click="submit">保存</el-button>
            </el-form-item>
        </el-form>
        {{provinceOption.data}}

    </div>
</template>

<script>
   // import {get, post,del,put} from '../common/axios.js' ;//导入axios实例文件中方法
    export default {
        data(){

            return{
                provinceOption:"",
                ruleForm:{

                },
                rules:{

                }
            }
        },
        created () {
            /*get('province',{parentId:'1000000'}).then((response) => {
                console.info(response.toString())
                this.provinceOption= response;
            });
            .catch(()=>{
                    this.$message.error('消息加载失败');
                })*/

        },
        methods:{
            submit: function() {
                this.$post('findCity',this.ruleForm).then((response) => {

                  // this.provinceOption= response;
                }).catch(()=>{
                    this.$message.error('消息加载失败');
                });
            }
        },
        mounted () {


        }
    }
</script>

<style scoped>

</style>
