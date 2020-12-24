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
(function () {//轮播函数
	var timer;//定时器变量
	var oImgLi = document.querySelectorAll('.box li');
	var oLi = document.querySelectorAll('.box li').length;
	var nowIndex = 0;//轮播计数器
	function init() {
		play();
	}
	init()
	/**
	 * 自动轮播函数
	 */
	function play() {
		clearInterval(timer);//防止多个定时器
		timer = setInterval(function () {
			nowIndex++;//运动图片
			if (nowIndex == oLi) {
				nowIndex = 0;//判断最大值
			}
			move(nowIndex);//移动函数执行
		}, 2000);
	}
	/***
	 * 移动函数
	 */
	// 动作函数   选中菜单高度变化   右侧对应图片透明度变化
	function move(i) {
		var activeImg = document.getElementsByClassName('show')[0];//获取show类名
		activeImg.className = '';//清除所有类名
		oImgLi[i].setAttribute('class', 'show');//添加show类名
	}
}());
(function () {
	window.onload = main;

	function getRgb(r, g, b) {
		return "rgb(" + r + "," + g + "," + b + ")";
	}

	function main() {
		//drop
		var dropList = [];
		var gravity = 0.5;
		//
		var linelist = [];
		var canvasEl = document.getElementById('canvas');
		var ctx = canvasEl.getContext('2d');
		var mousePos = [0, 0];
		var backgroundColor = '#000';
		canvasEl.width = canvasEl.clientWidth;
		canvasEl.height = canvasEl.clientHeight;
		var speedx = 0;
		var maxspeedx = 0;
		window.onresize = function () {
			canvasEl.width = canvasEl.clientWidth;
			canvasEl.height = canvasEl.clientHeight;
		}
		window.onmousemove = function (e) {
			mousePos[0] = e.clientX;
			mousePos[1] = e.clientY;
			maxspeedx = (e.clientX - canvasEl.clientWidth / 2) / (canvasEl.clientWidth / 2);
		}
		// window.onmousedown=function(e)
		function createLine(e) {
			var temp = 0.25 * (50 + Math.random() * 100);
			var myline = {
				speed: 5.5 * (Math.random() * 6 + 3),
				die: false,
				posx: e,
				posy: -200,
				h: temp,
				color: getRgb(Math.floor(temp * 255 / 75), Math.floor(temp * 255 / 75), Math.floor(temp * 255 / 75))
			};
			linelist.push(myline);
		}
		window.requestAnimationFrame(update);
		function createDrop(x, y) {
			var mydrop = {
				die: false,
				posx: x,
				posy: y,
				vx: (Math.random() - 0.5) * 8,
				vy: Math.random() * (-6) - 3,
				radius: Math.random() * 1.5 + 1
			};
			return mydrop;
		}

		function madedrops(x, y) {
			var maxi = Math.floor(Math.random() * 5 + 5);
			for (var i = 0; i < maxi; i++) {
				dropList.push(createDrop(x, y));
			}
		}

		function update() {
			if (dropList.length > 0) {
				dropList.forEach(function (e) {
					e.vx = e.vx + (speedx) / 2;
					e.posx = e.posx + e.vx;
					e.vy = e.vy + gravity;
					e.posy = e.posy + e.vy;
					if (e.posy > canvasEl.clientHeight) {
						e.die = true;
					}
				});
			}
			for (var i = dropList.length - 1; i >= 0; i--) {
				//delite die
				if (dropList[i].die) {
					dropList.splice(i, 1);
				}
			}

			speedx = speedx + (maxspeedx - speedx) / 50;

			if (Math.random() > 0) {
				createLine(Math.random() * 2 * canvasEl.width - (0.5 * canvasEl.width));
				createLine(Math.random() * 2 * canvasEl.width - (0.5 * canvasEl.width));
				createLine(Math.random() * 2 * canvasEl.width - (0.5 * canvasEl.width));
			}
			var mydeadline = canvasEl.clientHeight - Math.random() * canvasEl.clientHeight / 5;
			linelist.forEach(function (e) {
				var dis = Math.sqrt(((e.posx + speedx * e.h) - mousePos[0]) * ((e.posx + speedx * e.h) - mousePos[0]) + (e.posy + e.h - mousePos[1]) * (e.posy + e.h - mousePos[1]));
				if (dis < 35) {
					madedrops(e.posx + speedx * e.h, e.posy + e.h);
					e.die = true;
				}

				if ((e.posy + e.h) > mydeadline) {
					if (Math.random() > 0.85) {
						madedrops(e.posx + speedx * e.h, e.posy + e.h);
						e.die = true;
					}
				}
				if (e.posy >= canvasEl.clientHeight) {
					e.die = true;
				} else {
					e.posy = e.posy + e.speed;
					e.posx = e.posx + (e.speed * speedx);
				}
			});
			for (var i = linelist.length - 1; i >= 0; i--) {
				if (linelist[i].die) {
					linelist.splice(i, 1);
				}
			}
			render();
			window.requestAnimationFrame(update);
		}
		function render() {
			ctx.fillStyle = backgroundColor;
			ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

			linelist.forEach(
				function (line) {

					ctx.strokeStyle = line.color;
					ctx.lineWidth = 4.5;
					ctx.beginPath();
					ctx.moveTo(line.posx, line.posy);
					ctx.lineTo(line.posx + speedx * line.h, line.posy + line.h);
					ctx.stroke();
				});
			ctx.lineWidth = 1;
			ctx.strokeStyle = "#fff";
			dropList.forEach(function (e) {
				ctx.beginPath();
				ctx.arc(e.posx, e.posy, e.radius, Math.random() * Math.PI * 2, 1 * Math.PI);
				ctx.stroke();
			});
		}


	}
}());
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
				window.open("login.html", '_self');
			break;
			case '校园文化':
				window.open("about/campusCulture.html", '_self');
			break;
            case '商学院':
				window.open("about/sxy.html", '_self');
			break;
			case '电子信息工程学院':
				window.open("about/eiexy.html", '_self');
			break;
			case '首页':
				window.open("campusCulture.html", '_self');
			break;
            case '艺术设计学院':
				window.open("about/artxy.html", '_self');
			break;
			case '护理学院':
				window.open("about/nursexy.html", '_self');
			break;
			case '音乐戏剧学院':
				window.open("about/musicxy.html", '_self');
			break;
			case '西亚斯留言板':
				window.open("about/siasmessage.html", '_self');
			break;
		}
	}
}());

