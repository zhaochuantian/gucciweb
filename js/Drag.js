function Drag(id){
	this.oDiv = document.getElementById(id);

	var _this = this;
	//<1>按下
	this.oDiv.onmousedown = function(ev){
		_this.funcDown(ev);
	};
}

Drag.prototype.funcDown = function(ev){
	//记录相对距离
	var e = ev || window.event;
	this.offsetX = e.clientX - this.oDiv.offsetLeft;
	this.offsetY = e.clientY - this.oDiv.offsetTop;

	var _this = this;
	//<2>移动，保持相对距离
	document.onmousemove = function(ev){
		_this.funcMove(ev);
	};

	//<3>抬起，取消拖拽
	document.onmouseup = function(){
		_this.funcUp();
	};
}

Drag.prototype.funcUp = function(){
	document.onmousemove = null;
}

Drag.prototype.funcMove = function(ev){
	var e = ev || window.event;
	this.oDiv.style.left = e.clientX - this.offsetX + "px";
	this.oDiv.style.top = e.clientY - this.offsetY + "px";

}


