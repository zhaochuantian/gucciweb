function isABC(charStr){
	if(charStr >= "a" && charStr <= "z" || charStr >= "A" && charStr <= "Z"){
		return true;
	}else{
		return false;
	}
}

function CAPTCHA(n){
	var arr = [];
	for(var i = 0; i < n; i++){
		var num = Math.floor(Math.random() * 100);
		if(num >= 0 && num <= 9){
			arr.push(num);
		}else if(num >= 65 && num <= 90){
			arr.push(String.fromCharCode(num));
		}else if(num >= 27 && num <= 52){
			arr.push(String.fromCharCode(num + 70));
		}else{
			i--;
		}
	}
	return arr.join("");
}

function elementsByClassName(parentNode, className){
	//<1>查找parentNode下所有的子节点
	var nodes = parentNode.getElementsByTagName("*");
	var arr = [];
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].className == className){
			arr.push(nodes[i]);
		}
	}
	return arr;
}


function $(vArg){
	switch(vArg[0]){
		case "#": //id
			return document.getElementById(vArg.substring(1));
			break;
		case ".":
			return elementsByClassName(document, vArg.substring(1));
			break;
		default:
			var subStr = vArg.substring(0, 5);
			if(subStr == "name="){
				return document.getElementsByName(vArg.substring(5));
			}else{
				return document.getElementsByTagName(vArg);
			}
			break;
	}
}


function randomColor(){
	var color = "rgba(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + ",1)";
	return color;
}

function getStyle(elem, attr){
	return elem.currentStyle ? elem.currentStyle[attr] : getComputedStyle(elem)[attr];
}

function removeSpaceNode2(parseNode){
	var nodes = parseNode.childNodes;
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)){
			//删除
			parseNode.removeChild(nodes[i]);
		}
	}
}
function removeSpaceNode(nodes){
	var res = [];
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)){
			continue;
		}else{
			res.push(nodes[i]);
		}
	}
	return res;
}

function createNodeWithText(tagName, txt){
	var node = document.createElement(tagName);
	var oTxt = document.createTextNode(txt);
	node.appendChild(oTxt);
	return node;
}	


function addEvent(obj, eventType, func){
	if(obj.addEventListener){
		obj.addEventListener(eventType, func, false);
	}else{
		obj.attachEvent("on" + eventType, func);
	}
}
function removeEvent(obj, eventType, func){
	if(obj.removeEventListener){
		obj.removeEventListener(eventType, func);
	}else{
		obj.detachEvent("on" + eventType, func);
	}
}

function drag(node){
	var offsetX = 0;
	var offsetY = 0;
	//<1>按下
	node.onmousedown = function(ev){
		//记录相对距离
		var e = ev || window.event;
		offsetX = e.clientX - node.offsetLeft;
		offsetY = e.clientY - node.offsetTop;

		//<2>移动，保持相对距离
		document.onmousemove = function(ev){
			var e = ev || window.event;
			node.style.left = e.clientX - offsetX + "px";
			node.style.top = e.clientY - offsetY + "px";

		}

		//<3>抬起，取消拖拽
		node.onmouseup = function(){
			document.onmousemove = null;
		}
	}
}

/*
	跨浏览器兼容
*/
function preDef(e){
	if(e.preventDefault){
		e.preventDefault();
	}else{
		window.event.returnValue = false;
	}
}

/*
	expires 天数
	secure  布尔值
*/
/*function setCookie(name, value, expires, path, domain, secure){
	var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	if(expires){
		cookieText += ";expires=" + numOfDate(expires);
	}
	if(path){
		cookieText += ";path=" + path;
	}
	if(domain){
		cookieText += ";domain=" + domain;
	}
	if(secure){
		cookieText += ";secure"
	}
	document.cookie = cookieText;
}*/
function setCookie(name, value, json){
	var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	if(json){
		if(json.expires){
		cookieText += ";expires=" + numOfDate(json.expires);
		}
		if(json.path){
			cookieText += ";path=" +json.path;
		}
		if(json.domain){
			cookieText += ";domain=" + json.domain;
		}
		if(json.secure){
			cookieText += ";secure"
		}
	}
	document.cookie = cookieText;
}

function numOfDate(num){
	var d = new Date();
	var day = d.getDate();
	d.setDate(day + num);
	return d;
}

function getCookie(name){
	 var cookieText = decodeURIComponent(document.cookie);
	 name += "=";
	 var start = cookieText.indexOf(name);
	 if(start == -1){
	 	return null;
	 }else{
	 	/*
			【关键】
			当当前不是一个正确的键的时候，需要跳过这个键，往后去查，
			当当前是一个正确的键的时候，终止循环。
	 	*/
	 	while(!(cookieText[start - 1] == " " || !cookieText[start - 1])){
	 		start = cookieText.indexOf(name, start + name.length);
	 	}
	 	if(start == -1){
	 		return null;
	 	}
	 	var end = cookieText.indexOf(";", start);
	 	if(end == -1){
	 		end = cookieText.length;
	 	}
	 }

	 var str = cookieText.substring(start, end);
	 // alert(str);
	 var arr = str.split("=");
	 return arr[1];
}

function removeCookie(name){
	document.cookie = encodeURIComponent(name) + "=;expires=" + new Date(0);
}


function $cookie(name, value){
	switch(arguments.length){
		case 1:
			return getCookie(name);
			break;
		case 3:
			setCookie(name, value, arguments[2]);
			break;
		default:
			if(value){
				setCookie(name, value);
			}else{
				removeCookie(name);
			}
			break;
	}
}
/*
	碰撞函数
*/

function knock(node1, node2){
	var l1 = node1.offsetLeft;
	var r1 = node1.offsetLeft + node1.offsetWidth;
	var t1 = node1.offsetTop;
	var b1 = node1.offsetTop + node1.offsetHeight;

	var l2 = node2.offsetLeft;
	var r2 = node2.offsetLeft + node2.offsetWidth;
	var t2 = node2.offsetTop;
	var b2 = node2.offsetTop + node2.offsetHeight;

	if(!(r1 < l2 || l1 > r2 || t1 > b2 || b1 < t2)){
		return true;
	}else{
		return false;
	}
}








