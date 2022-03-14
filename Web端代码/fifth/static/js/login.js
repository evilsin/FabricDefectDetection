/*
 * @作者: Hewitt  邮箱:qiaohewei@126.com  网站:www.hwcyxk.com 
 * @日期: 2018-10-17 17:23:35 
 * @最后修改: Hewitt  邮箱:qiaohewei@126.com  网站:www.hwcyxk.com 
 * @最后修改时间: 2018-10-17 17:23:35 
 */

// 登录按钮切换

function PwdLogin() {
    var login = document.getElementsByClassName("login_con");
    login[0].classList.remove("hidden");
    login[0].classList.add("show");
    login[1].classList.remove("show");
    login[1].classList.add("hidden");
    var tags = document.getElementsByClassName("top_tag");
    tags[0].classList.add("active");
    tags[1].classList.remove("active");
    var ad = document.getElementById("AdImg");
    ad.style.height = "483.8px";
    // ad.style.backgroundImage='url(https://static.zcool.cn/v1.1.43/passport4.0/images/login-ground.jpg)';
}
function QrcodeLogin() {
    var login = document.getElementsByClassName("login_con");
    login[0].classList.remove("show");
    login[0].classList.add("hidden");
    login[1].classList.remove("hidden");
    login[1].classList.add("show");
    var tags = document.getElementsByClassName("top_tag");
    tags[1].classList.add("active");
    tags[0].classList.remove("active");
    var ad = document.getElementById("AdImg");
    ad.style.height = "371.8px";
}

// 用户输入错误提示

var inputs = document.getElementsByTagName('input');
var tips = document.getElementsByClassName('tips');

function InputNull(a){
    tips[a].classList.add('show');
    tips[a].classList.remove('hidden');
}
function InputNoNull(a){
    tips[a].classList.add('hidden');
    tips[a].classList.remove('show');
}

var UserName     = inputs[0];
var UserPwd      = inputs[1];
var AuthCode     = inputs[2];
var UserNameTips = tips[0];
var UserPwdTips  = tips[1];
var AuthCodeTips = tips[2];

UserName.oninput = function () {
    if (UserName.value == '') {
        InputNull(0);
        UserNameTips.innerHTML="请检查用户名，用户名不能为空";
    } else{
        InputNoNull(0);
    }
}
UserName.onblur = function () {
    if (UserName.value == '') {
        InputNull(0);
        UserNameTips.innerHTML="请检查用户名，用户名不能为空";

    } 
}

UserPwd.oninput = function () {
    if (UserPwd.value == '') {
        InputNull(1);
        UserPwdTips.innerHTML="请检查您的密码，密码不能为空";
    } else{
        InputNoNull(1);
    }
}
UserPwd.onblur = function () {
    if (UserPwd.value == '') {
        InputNull(1);
        UserPwdTips.innerHTML="请检查您的密码，密码不能为空";
    } 
}

AuthCode.oninput = function () {
    if (AuthCode.value == ''|| AuthCode.value !== '666666') {
        InputNull(2);
        AuthCodeTips.innerHTML="请检查验证码，验证码错误";
    } else if(AuthCode.value == '666666'){
        InputNull(2);
        AuthCodeTips.innerHTML="验证码正确";
    }else{
        InputNoNull(2);
    }
}
AuthCode.onblur = function () {
    if (AuthCode.value == '') {
        InputNull(2);
        AuthCodeTips.innerHTML="请检查验证码，验证码错误";
    } 
}




// inputs[1].onmouseout = function () {

//     if (inputs[1].value == 0) {
//         tips[1].classList.add('show');
//         tips[1].classList.remove('hidden');

//     } else {
//         tips[1].classList.add('hidden');
//         tips[1].classList.remove('show');
//     }
// }
// inputs[2].onmouseout = function () {

//     if (inputs[2].value == 0) {
//         tips[2].classList.add('show');
//         tips[2].classList.remove('hidden');

//     } else {
//         tips[2].classList.add('hidden');
//         tips[2].classList.remove('show');
//     }
// }
