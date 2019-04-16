export default {
    CONSTANT : {
        // UPLOADIMGPATH: 'http://127.0.0.1:10003/admit/',	//接口服务器
        // imagePrefix: 'http://127.0.0.1:8080/imgLink/',    //图片访问前缀
        UPLOADIMGPATH: 'http://test.iyunche.com/admitWeb/',	//接口服务器
        imagePrefix: 'http://test.iyunche.com/imgLink/',    //图片访问前缀
    },
	//生成验证码
	createCode: function() {
		//验证码的长度
		var codeLength = 4;
		var code = "";
		//随机数
		var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
			'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
			'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
		for (var i = 0; i < codeLength; i++) {
			//取得随机数的索引（0~35）
			var index = Math.floor(Math.random() * 62);
			//根据索引取得随机数加到code上
			code += random[index];
		}
		return code
	},



	sendSMS: function(obj,type,tel){//type:通知类型
		 let data = new FormData();
         data.append("phone", tel);
         data.append("type", type);
         let that = this;
         alert(tel);
          obj.$post("/sendSMS", data).then(function (response) {
             let data = JSON.parse(response.data);
             if (data.code == 0) {
            	 return true;
             } else {
            	 return false;
             }
         })
		return false;
	},
	sendMail: function(obj,type,Email){//type:通知类型
        let data = new FormData();
        data.append("phone", tel);
        data.append("type", type);
        let that = this;
        that.$http.post("http://127.0.0.1:8081/password/sendCaptchaByMail", data).then(function (response) {
            let data = JSON.parse(response.data);
            if (data.code == 0) {
           	 return true;
            } else {
           	 return false;
            }
        })
		return false;
	}
	,fetchData: function(key) { //获取数据
        try {
            let localData = window.localStorage.getItem(key);
            return localData ? window.JSON.parse(localData) : null;
        } catch (e) {
            return null;
        }
    }
	,saveData: function(key,data) { //保存数据
        window.localStorage.setItem(key, window.JSON.stringify(data));
	},

    getProvince(obj,option) {
        let data = {"parentId": "1000000"};
        let that = obj;
        obj.$post("province",data).then(function (response) {
            let data = response;
            if (data.code == 0) {
                that.$message.error(data.msg);
            } else {
                that[option] = data.data;
            }
        }).catch(error => {
            console.log("error",error);
            that.$message.error("省份信息获取失败!")
        });
    },
    getCity(obj,id,option) {
        let data = {"provinceId": id};
        let that = obj;
        obj.$post("cities",data).then(function (response) {
            let data = response;
            if (data.code == 0) {
                that.$message.error(data.msg);
            } else {
                that[option] = data.data;
            }
        }).catch(error => {
            console.log("error",error);
            that.$message.error("城市信息获取失败!")
        });
    },
    getArea(obj,id,option) {
        let data = {"cityId": id};
        let that = obj;
        obj.$post("areas",data).then(function (response) {
            let data = response;
            if (data.code == 0) {
                that.$message.error(data.msg);
            } else {
                that[option] = data.data;
            }
        }).catch(error => {
            console.log("error", error);
            that.$message.error("城市信息获取失败!")
        });
    },
    getProvinceName(that, id, option) {
        let province = option.find(t => t.regionId === id);
        return province ? province.name : '';
    },
    getCityName(that, id, option) {
        let city = option.find(t => t.regionId === id);
        return city ? city.name : "";
    },
    getAreaName(that, id, option) {
        let area = option.find(t => t.regionId === id);
        return area ? area.name : "";
    },
    getNameById(id, option){
        if(!id){
            return "";
        }
        let bean = option.find(t => t.regionId === id);
        return bean ? bean.name : "";
    },
    /**
     * 获取数据
     * @param url
     * @param param 参数
     * @param value
     * @param type 提交方式
     */
    getViewHelper: function (url, param, value, type) {

    },
    uploadImgFun: function (obj, that) {
        let data = new FormData();
        data.append("file", obj.file);
        data.append("imageType", obj.filename);
        if (obj.companyId) {
            data.append("companyId", obj.companyId);
        }
        let config = {headers: {'Content-Type': 'multipart/form-data'}};
        that.$axios.post(obj.action, data, config).then(function (response) {
            if (response) obj.onSuccess(response);
        }).catch(error => {
            console.log("error", error);
            that.$message.error("上传失败!")
        });
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpg';
        const isJPEG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';
        const isLt = file.size / 1024 / 1024 < 5;

        if (!isJPG && !isJPEG && !isPNG && !isBMP) {
            this.$message.error('上传图片只能是 JPG/PNG/BMP 格式!');
            return false;
        }
        if (!isLt) {
            this.$message.error('上传图片大小不能超过 5MB!');
            return false;
        }
        return true;
    },

    /**
     * 初始化省份
     * @param obj   this
     * @param dataKeys 需要赋值的变量
     */
    initProvince(obj, dataKeys) {
        obj.$post('province', {"parentId": "1000000"}).then((response) => {
            if (response.code == 0) {
                obj.$message.error(response.msg);
            } else {
                if (dataKeys && dataKeys.length > 0) {
                    dataKeys.forEach(function (value, i) {
                        eval("obj." + value + "=response.data");
                        obj.$forceUpdate();
                    })
                }
            }
        }).catch(() => {
            this.$message.error('消息加载失败');
        });
    },
    /**
     * 初始化城市列表
     * @param obj this
     * @param provinceId    省代码
     * @param dataKey       需要赋值的变量
     * @param clearKeys     需要清空的变量
     */
    initCity(obj, provinceId, dataKey, clearKeys) {
        if (!provinceId) {
            return;
        }
        if (clearKeys && clearKeys.length > 0) {
            clearKeys.forEach(function (value, i) {
                eval("obj." + value + "=''");
            })
        }
        obj.$post('cities', {"provinceId": provinceId}).then((response) => {
            if (response.code == 0) {
                obj.$message.error(response.msg);
            } else {
                eval("obj." + dataKey + "=response.data");
                obj.$forceUpdate();
            }
        }).catch(() => {
            this.$message.error('消息加载失败');
        });
    },
    /**
     * 初始化区域
     * @param obj       this
     * @param cityId    城市代码
     * @param dataKey   需要赋值的变量
     * @param clearKeys 需要清空的变量
     */
    initArea(obj, cityId, dataKey, clearKeys) {
        if (!cityId) {
            return;
        }
        if (clearKeys && clearKeys.length > 0) {
            clearKeys.forEach(function (value, i) {
                eval("obj." + value + "=''");
            })
        }
        obj.$post('areas', {"cityId": cityId}).then((response) => {
            if (response.code == 0) {
                obj.$message.error(response.msg);
            } else {
                eval("obj." + dataKey + "=response.data");
                obj.$forceUpdate();
            }
        }).catch(() => {
            this.$message.error('消息加载失败');
        });
    }
    , dataFormat(time) {
        return `${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()} 
                ${time.getHours() >= 10 ? time.getHours() : '0' + time.getHours()}:${time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()}:${time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()}`;
    },
    getBizConstants(obj, key, option) {
        let data = {"key": key};
        let that = obj;
        obj.$post("bizConstants", data).then(function (response) {
            let data = response;
            if (data.code == 0) {
                that.$message.error(data.msg);
            } else {
                that[option] = data.data;
            }
        }).catch(error => {
            console.log("error", error);
            that.$message.error("业务信息获取失败!")
        });
    }
    ,formatterDate(row, column, time) {
        if(time == null || time ==""){
            return ""
        }
        time = new Date(time);
        let format = `${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' + 
            (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()}`;
        return format;
    }
    ,formatterDateTime(row, column, time) {
    if(time == null || time ==""){
        return "--"
    }
    time = new Date(time);
    let format = `${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()} 
                ${time.getHours() >= 10 ? time.getHours() : '0' + time.getHours()}:${time.getMinutes()>=10?time.getMinutes():'0'+time.getMinutes()}:${time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()}`;
    return format;
},
   formatTimestamp (time) {
           if(time == null || time ==""){
               return ""
           }
           time = new Date(time);
           let format = `${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' +
               (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()}`;
           return format;
    },
    //校验企业名称
    checkCompanyName(rule, value, callback){
        if(!value){
            return callback(new Error('名称不能为空'));
        }
        value = value.trim();
        if(!rules.companyNameReg.test(value)){
            return callback(new Error('请输入正确的名称'));
        }
        callback();
    },
    //企业信用代码
    checkCreditCode(rule, value, callback){
        if(!value){
            return callback(new Error('信用代码不能为空'));
        }
        value = value.trim();
        if(!rules.creditCodeReg.test(value)){
            return callback(new Error('请输入正确的信用代码'));
        }
        callback();
    },
    //注册地址
    checkRegAddress(rule, value, callback){
        if(!value){
            return callback(new Error('注册地址不能为空'));
        }
        value = value.trim();
        if(!rules.detailAddressReg.test(value)){
            return callback(new Error('请输入2-200之间详细地址'));
        }
        callback();
    },
    //经营范围
    checkBusinessScope(rule, value, callback){
        if(!value){
            return callback(new Error('经营范围不能为空'));
        }
        value = value.trim();
        if(!rules.businessScopeReg.test(value)){
            return callback(new Error('请输2-500之间经营范围'));
        }
        callback();
    },
    //详细地址
    checkDetailAddress(rule, value, callback){
        if(!value || value == undefined){
            return callback(new Error('详细地址不能为空'));
        }
        value = value.trim();
        if(!rules.detailAddressReg.test(value)){
            return callback(new Error('请输2-200之间的详细地址'));
        }
        callback();
    },
    //校验姓名
    checkUserName(rule, value, callback){
        if(!value){
            return callback(new Error('姓名不能为空'));
        }
        value = value.trim();
        if(!rules.userNameReg.test(value)){
            return callback(new Error('请输正确的姓名'));
        }
        callback();
    },
    //校验身份证号
    checkIdCard(rule, value, callback){
        if(!value){
            return callback(new Error('身份证号不能为空'));
        }
        value = value.trim();
        if(!rules.idCardReg.test(value)){
            return callback(new Error('请输正确的身份证号'));
        }
        callback();
    },
    //校验手机号
    checkPhone(rule, value, callback){
        if(!value){
            return callback(new Error('手机号不能为空'));
        }
        value = value.trim();
        if(!rules.phoneReg.test(value)){
            return callback(new Error('请输正确的手机号'));
        }
        callback();
    },
    //校验手机号 非必填
    checkPhoneNon(rule, value, callback){
        if(value){
            value = value.trim();
            if(!rules.phoneReg.test(value)){
                return callback(new Error('请输正确的手机号'));
            }
        }
        callback();
    },
    //校验邮箱
    checkEmail(rule, value, callback){
        if(!value){
            return callback(new Error('邮箱不能为空'));
        }
        value = value.trim();
        if(!rules.emailReg.test(value)){
            return callback(new Error('请输正确的邮箱'));
        }
        callback();
    }
    ,checkLicenseNo(rule, value, callback) {
        if(!value){
            return callback(new Error('许可字号不能为空'));
        }
        value = value.trim();
        if(!rules.licenseNoTeg.test(value)){
            return callback(new Error('许可字号为10到20位数字'));
        }
        callback();
    }
    ,checkNumber(rule, value, callback) {
        let min = rule.min ? rule.min : 0;
        let max = rule.max ? rule.max : 0;
        let reg = new RegExp("^\\d{"+min+","+max+"}$");
        if (!min && !max) reg = /^\\d$/;
        else if (!max) reg = new RegExp("^\\d{"+min+",}$");
        if(!value){
            return callback();
        }
        if(!reg.test(value)){
            return callback(new Error(rule.message));
        }
        callback();
    }
    ,checkDoubleNumber(rule, value, callback) {
        let r = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/;
        if (!value) return callback();
        if(!r.test(value)){
            return callback(new Error(rule.message));
        }
        callback();
    }
    ,checkBankNumber(rule, value, callback){
        if(!value){
            return callback(new Error('许可字号不能为空'));
        }
        value = value.trim();
        if(!rules.allNum.test(value)){
            return callback(new Error('银行卡号格式不正确'));
        }
        callback();
    },
    checkTelOrMobile(rule, value, callback) {
        if (!value) {
            return callback(new Error('该项不能为空'));
        }
        value = value.trim();
        if (!rules.telReg.test(value) && !rules.phoneReg.test(value)) {
            return callback(new Error('请输入正确联系方式'));
        }
        callback();
    }
}
var rules = {
    //校验企业名称
    companyNameReg : /^.{4,100}$/,
    //统一信用代码
    creditCodeReg : /[A-Z0-9]{18}$/,
    //经营范围
    businessScopeReg : /^.{2,500}$/,
    //详细地址
    detailAddressReg : /^.{2,100}$/,
    //姓名
    userNameReg : /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,
    //身份证号
    idCardReg : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    //手机号
    phoneReg : /^1[3456789]\d{9}$/,
    //邮箱
    emailReg : /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/ ,
    //许可字号
    licenseNoTeg : /^\d{10,20}$/,

    allNum: /^[0-9]{10,25}$/,

    telReg: /0\d{9,11}/


}
