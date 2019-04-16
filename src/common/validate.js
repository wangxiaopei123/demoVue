//用户名校验
export function checkLoginname(rule, value, callback) {
    var MobileRegex = /^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/; //手机校验
    var MailRegex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; //邮箱校验
    if (MobileRegex.test(value) || MailRegex.test(value)) {
        callback();
    } else {
        callback(new Error('请输入正确格式的用户名'));
    }
}

//密码校验
export function checkLoginPassword(rule, value, callback) {
    //var PasswordRegex = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{6,}$/; //密码校验
    var reg1 = /[!@.#$%^&*()_?<>{}]/;
    var reg2 = /[a-z]+/;
    var reg3 = /[A-Z]+/;
    var reg4 = /[0-9]+/;
    if (reg1.test(value) && reg2.test(value) ||
        reg1.test(value) && reg3.test(value) ||
        reg1.test(value) && reg4.test(value) ||
        reg2.test(value) && reg3.test(value) ||
        reg2.test(value) && reg4.test(value) ||
        reg3.test(value) && reg4.test(value)) {
        callback()
    } else {
        callback(new Error('密码格式错误'));
    }
};

//手机号校验
export function checkMobile(rule, value, callback) {
    var MobileRegex = /^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/; //手机校验
    if (MobileRegex.test(value)) {
        callback();
    } else {
        callback(new Error('请输入正确的手机号码'));
    }
}

//Email校验
export function checkEmail(rule, value, callback) {
    var MailRegex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; //邮箱校验
    if (MailRegex.test(value)) {
        callback();
    } else {
        callback(new Error('请输入正确格式的邮箱地址'));
    }
}


