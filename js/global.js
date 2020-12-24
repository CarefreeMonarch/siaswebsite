// 二级菜单
(function () {
	var timmer;
	var major = document.getElementsByClassName("major")[0];
	var child = document.getElementsByClassName("child")[0];
	major.onmousemove = function () {
		timmer = setTimeout(function () {
			child.style.display = "block";
		}, 300)
	}
	timeer = major.onmouseout = function () {
		clearInterval(timeer)
		timmmer = setTimeout(function () {
			child.style.display = "none";
		}, 300)
	}
}());
// 搜索框函数
(function () {
	var search = document.getElementsByClassName("search")[0];
	function getvalue() {
		var text = document.getElementsByClassName("text")[0].value;
		return {
			text: text,
		}
	}
	search.onclick = function () {
		var val = getvalue().text;
		switch (val) {
			case '登录':
				window.open("../login.html", '_self');
			break;
			case '校园文化':
				window.open("campusCulture.html", '_blank');
			break;
            case '商学院':
				window.open("sxy.html", '_blank');
			break;
			case '电子信息工程学院':
				window.open("eiexy.html", '_blank');
			break;
			case '首页':
				window.open("../index.html", '_self');
			break;
            case '艺术设计学院':
				window.open("artxy.html", '_self');
			break;
			case '护理学院':
				window.open("nursexy.html", '_self');
			break;
			case '音乐戏剧学院':
				window.open("musicxy.html", '_self');
			break;
			case '西亚斯留言板':
				window.open("siasmessage.html", '_self');
			break;
		}
	}
}());
