// 登录模块
var text = '';
var btn = document.getElementsByClassName("btn")[0];
var show = document.getElementsByClassName("show")[0];
function getvalue() {
    var text = document.getElementsByClassName("user")[0].value.toLowerCase();
    var ps = document.getElementsByClassName("password")[0].value;
    return {
        text: text,
        ps: ps,
    }
}
function myTrim(str) {
    return str.replace(/^\s+|\s+$/gm, '');
}
function check() {
    var val = myTrim(getvalue().text);
    var ps = myTrim(getvalue().ps);
    if (val == 'admin'&& ps == '123') {
        window.open("index.html", '_self');
    } else {
        if(val == null || val == '' && ps == null || ps == ''){
            if(val == null || val == ''){
                text += '用户名为空'+'</br>'
            }
            if(ps == null || ps == ''){
                text += '密码为空'+'</br>'
            }
        }
        else{
            if(val !== 'admin'){
                text += '用户名错误'+'</br>'
            }
            if(ps !== '123'){
                text += '密码错误'+'</br>'
            }
        }
        
    }
    show.innerHTML = text;
}
btn.onclick = function () {
    text = '';
    check();
}


