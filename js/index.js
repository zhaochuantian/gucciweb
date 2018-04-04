$.ajax({
	url: "code/indexInner.json",
    type: "GET",
    success: function(res){
    	$("#box1").append("<a href='' class = 'indexmid-right'><img src=" + (res[0].img) + "></a><div id='midgoods'><a href=''><img src=" + res[4].img + "></a></div><div class='text-intro'>Guccy印花迷你肩背包</div><div class='buyit'><a class='rectangle ' href=''>立即购买</a></div>");
    	$("#box1").after("<div class='box cl box2' id='box2'></div>");
    	$("#box2").before("<div class='line'></div>");
    	$("#box2").append("<a href='' class = 'indexmid-right'><img src=" + (res[1].img) + "></a><a href='' class = 'indexmid-left1 indexmid-left'><img src=" + (res[2].img) + "></a><a href='' class = 'indexmid-left2 indexmid-left'><img src=" + (res[3].img) + "></a><div id='midgoods2'><a href=''><img src=" + res[5].img + "></a></div><div class='text-intro'>Look No.46</div><div class='buyit'><a class='rectangle ' href=''>购买女士  LOOK</a></div>");
    	$("#box2").after("<div class='cl box3' id='box3'></div>");
    	$("#box3").before("<div class='line'></div>");
    	$("#box3").append("<img src=" + res[6].img + "><div class='indexmid-center'><p class='arter'>" + (res[7].title) + "</p><i>" + (res[7].famous) + "</i></div>");
    	$("#box3").after("<div class='cl box4 box' id='box4'></div>");
    	$("#box4").before("<div class='line'></div>");			    	
    	$("#box4").append("<a href='' class = 'indexmid-right'><img src=" + (res[0].img) + "></a><div id='midgoods4'><a href=''><img src=" + res[8].img + "></a></div><div class='text-intro'>Guccy印花皮革手拿包</div><div class='buyit'><a class='rectangle ' href=''>点击购买</a></div>");
    	$("#box4").after("<div class='cl box5 box' id='box5'></div>");
    	$("#box5").before("<div class='line'></div>");	
    }
})
$(function(){
	document.onscroll = function(ev){
		var t = document.documentElement.scrollTop||document.body.scrollTop;
		if( t > 1050 && t < 3100){						
			var oScroll = document.getElementById("midgoods2");
			oScroll.style.top = (t - 1050) / (7 / 3) + "px";
		}
	}
})