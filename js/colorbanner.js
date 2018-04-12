$(function(){

	var decBtns = $("#decorbtn").find("li");
	var decUl = $("#decorloop");
	var decLi = decUl.find("li");
	var decNow = 0; //记录当前图片的下标；
	var iTimer = null;
	var itIndex = 14
	decBtns.click(function(){
		decNow = $(this).index();
		TebBanner();
	})
	function TebBanner(){
		itIndex++;
		//当点击的时候取消所有的按钮的样式 然后设置点击按钮的样式
		decBtns.attr("class","");
		decBtns.eq(decNow).attr("class","decoractive");
		//然后显示第这个li
		decLi.eq(decNow).css("z-index",itIndex);
		decLi.eq(decNow).css("opacity", "0");
		startMove(decLi.get(decNow),{
			opacity:100
		},function(){
			if(decNow == decBtns.size()){
				itIndex++;
				decLi.eq(0).zIndex = itIndex;
				decNow = 0;				
			}
		});
	}
	function timerI(){
		decNow++;
		TebBanner();
//		console.log(decNow)
		if(decNow == decBtns.size()){
			decBtns.eq(0).attr("class","active");
		}
	}
	iTimer = setInterval(timerI,2500)
	$("#decorPartRight").hover(function(){
        clearInterval(iTimer);
    },function(){
        iTimer = setInterval(timerI,2500);
    });
})