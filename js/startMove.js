//完整的运动框架
function startMove(obj, json, func){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){

		var isclose = true;

		for(var attr in json){
			var iCur = 0;
			if(attr == "opacity"){
				iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
			}else{
				iCur = parseInt(getStyle(obj, attr))
			}
			var speed = (json[attr] - iCur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			iCur += speed;
			if(attr == "opacity"){
				obj.style.filter = `alpha(opacity=${iCur});`;
				obj.style.opacity = iCur / 100;
			}else{
				obj.style[attr] = iCur + "px";
			}

			if(iCur != json[attr]){
				isclose = false;
			}
		}

		if(isclose){
			clearInterval(obj.timer);
			if(func){
				func.call(obj);
			}
		}
	}, 30);
}

function getStyle(elem, attr){
	return elem.currentStyle ? elem.currentStyle[attr] : getComputedStyle(elem)[attr];
}