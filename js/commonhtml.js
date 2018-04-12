$.ajax({
     url: "../code/htmlnav.json",
     type: "GET",
     success: function(res){
        for(let i = 0 ; i < res.length ; i++){
            //在这里 我们通过第一次循环 创造的每个fixd中可见的a标签，然后 下一步在每次循环中间找到各自的subTitle，当我找到subTitle的时候  subtitle的内容包括  女士  男士  官网专享 还有各自下面的子标题   所以接下来通过第一次针对dd的循环 来把女士 男士 官网专享来加上
            $(".header-nav").append("<li class='navlis'>" + res[i].title + "</li>");
            $(".header-nav li").eq(i).append("<div class='header-subnav cl'><div class='header-sub-mid cl'></div></div>");
            for(var j = 0 ; j < res[i].subTitle.length ; j++){
                $(".header-sub-mid").eq(i).append("<dl><dt></dt></dl>");
                var strDt = res[i].subTitle[j].title;
                $(".header-sub-mid").eq(i).find("dl").find("dt").eq(j).append("<a href='stories.html'>" + strDt + "</a>");
                for(var k = 0 ; k < res[i].subTitle[j].child.length ; k++){
                    $(".header-sub-mid").eq(i).find("dl").eq(j).append("<dd><a href='stories.html'>" + res[i].subTitle[j].child[k].title + "</a></dd>");
                }
            }
            $(".navlis").eq(0).click(function(){
	        	window.location.href="runway.html";
	        });
            $(".navlis").eq(1).click(function(){
	        	window.location.href="women.html";
	        })
	        $(".navlis").eq(2).click(function(){
	        	window.location.href="men.html";
	        })
	        $(".navlis").eq(3).click(function(){
	        	window.location.href="watches.html";
	        })
	        $(".navlis").eq(4).click(function(){
	        	window.location.href="decor.html";
	        })
	        $(".navlis").eq(5).click(function(){
	        	window.location.href="gifts.html";
	        })
	        $(".navlis").eq(6).click(function(){
	        	window.location.href="stories.html";
	        })
        }
         $(".header-sub-mid").eq(0).append("<div id='navBanner0'></div>");
         $(".header-sub-mid").eq(1).append("<div id='navBanner1'></div>");
         $(".header-sub-mid").eq(2).append("<div id='navBanner2'></div>");
         $(".header-sub-mid").eq(4).append("<div id='navBanner4'><img src='../images/15174751227506362_718X266.png'></div>");
         $(".header-sub-mid").eq(6).append("<div id='navBanner5'><img src='../images/15198115058906657_718X266.png'></div>");

         $("#navBanner0").css("float","left").append("<a href = ''><img  id='navBannerImg' src=" + res[0].img + "> </a>");
         $("#navBanner1").append("<ul id='looper' class='cl'></ul><ol id='btns'></ol>");
         $.ajax({
            url:"../code/htmlooper.json",
            type:"GET",
            success:function(lop){
                for(var m = 0 ; m < lop.length ; m++){
                    $("#looper").append("<li class='loopli'><a href=''><img src=" + lop[m].img + "></a></li>");
                    $("#btns").append("<li class='smallbutton'></li>")
                }
                $("#navBanner1").find("ol").find("li").eq(lop.length - 1).remove();
                $("#navBanner1").find("ol").find("li").eq(0).attr("class","smallbutton active")
            }
         });
        $("#navBanner2").append("<ul id='looper2' class='cl'></ul><ol id='btns2'></ol>");
        $.ajax({
            url:"../code/htmlooper1.json",
            type:"GET",
            success:function(lop){
                for(var n = 0 ; n < lop.length ; n++){
                    $("#looper2").append("<li class='loopli'><a href=''><img src=" + lop[n].img + "></a></li>");
                    $("#btns2").append("<li class='smallbutton'></li>")
                }
                $("#navBanner2").find("ol").find("li").eq(lop.length - 1).remove();
                $("#navBanner2").find("ol").find("li").eq(0).attr("class","smallbutton active")
            }
         });
 }
 })
window.onload = function(){
	function sc_car(){
		var sc_str = $.cookie("goods");
		if(sc_str){
			var sc_arr = eval(sc_str);
			var sc_num = 0;
			for(var i in sc_arr){
				sc_num = Number(sc_arr[i].num) + sc_num;
			}
			$("#shoppingBag").html("购物袋(" + sc_num + ")")
		}
	}
	sc_car();
	
    var aBtns = $("#navBanner1").find("ol").find("li");
    var oLoop = $("#navBanner1").find("ul");
    var aLoopLi = oLoop.find("li");
    var iNow = 0 ;//当前是第几张图片索引
    var timer = null;
    aBtns.click(function(){
        iNow = $(this).index();
        tab();
    })
    function tab(){
        aBtns.attr("class","smallbutton");
        aBtns.eq(iNow).attr("class","active smallbutton");
        if(iNow == 8){
            aBtns.eq(0).addClass("active");
        }
        oLoop.animate({
            left: -165 * iNow
        },function(){
            if(iNow == aBtns.size()){
                oLoop.css("left",0);
                iNow = 0;
            }
        })
    }
     document.onscroll = function(ev){
		var x = document.documentElement.scrollTop||document.body.scrollTop;
		var oBanner = document.getElementById("bannerimage");
		oBanner.style.top = x + "px";
	}
   
    
    
    
    
    
    function timerInner(){
        iNow++;
        iNow2++
        tab();
        tab2();
        if(iNow == aBtns.size()){
            aBtns.eq(0).attr("class","active smallbutton")
        };
        if(iNow2 == aBtns2.size()){
            aBtns2.eq(0).attr("class","active smallbutton")
        }
    }
    timer = setInterval(timerInner, 2200);
    $("#navBanner1").hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(timerInner,2200);
    });
    $("#navBanner2").hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(timerInner,2200);
    })

    var aBtns2 = $("#navBanner2").find("ol").find("li");
    var oLoop2 = $("#navBanner2").find("ul");
    var aLoopLi2 = oLoop2.find("li");
    var iNow2 = 0 ;//当前是第几张图片索引2
    aBtns2.click(function(){
        iNow2 = $(this).index();
        tab2();
    })
    function tab2(){
        aBtns2.attr("class","smallbutton");
        aBtns2.eq(iNow2).attr("class","active smallbutton");
        if(iNow2 == 8){
            aBtns2.eq(0).addClass("active");
        }
        oLoop2.animate({
            left: -165 * iNow2
        },function(){
            if(iNow2 == aBtns2.size()){
                oLoop2.css("left",0);
                iNow2 = 0;
            }
        })
    }
    
    
    var oUl = document.getElementById("ul1");
    var aLis = oUl.getElementsByClassName("navlis");
    var oHeader = document.getElementById("header")
    var l = 0;
    for(var l = 0; l < aLis.length; l++){
        /*
            获取对应菜单项的高
        */
        var node = aLis[l].getElementsByClassName("header-subnav")[0];
        node.style.height = "auto";
        node.iHeight = node.offsetHeight;
        node.style.height = "0px";
        
//      var el = window.document.body;//声明一个变量，默认值为body
//		window.document.body.onmouseover = function(event){
//		 	el = event.target;
////		  console.log('当前鼠标在', el, '元素上');//在控制台中打印该变量
//			if(el == oUl || el == aLis){
//				ulicon++;
//		  	}
//			
//		}
		var isDown = false;
		$("#ul1").mouseenter(function(ev){
			var e = ev ||window.ev
			isDown = true;
			e.stopPropagation()
		}).mouseleave(function(ev){
			var e = ev || window.ev
			isDown = false;
			e.stopPropagation()
		})
		aLis[l].onmouseover = function(ev){
			var e = ev || window.ev;
			if(isDown == false){
				var oDiv = this.getElementsByClassName("header-subnav")[0];					
	        	startMove(oDiv, {
	                height: oDiv.iHeight,
	                opacity: 95
	           })
	        	
	      }else if(isDown == true){
				var oDiv = this.getElementsByClassName("header-subnav")[0];
				oDiv.style.height = oDiv.iHeight + "px";
				oDiv.style.opacity = 95
			}
	      e.stopPropagation();
		}
		
		$(".navlis").eq(l).mouseleave(function(){
			var oDiv = this.getElementsByClassName("header-subnav")[0];
            startMove(oDiv, {
                height: 0,
                opacity: 0
            })
		})
    }
    $("#footer").append("<div class='footer-cent cl' id='footerCenter'></div>");
    $.ajax({
    	url:"../code/foot.json",
    	type:"GET",
    	success:function(res){
    		for(var o = 0 ; o < 5 ; o++){
    			$("#footerCenter").append("<ul class = 'footnav'></ul>");
    			for(var p = 0 ; p < res[o].title.length; p++){
    				$(".footnav").eq(o).append("<li class='footli'><a href=''>" + res[o].title[p] + "</a></li>");
    			}    			
    		}
    		for(var r = 5 ; r < 6; r++){
    			$("#footerCenter").append("<ul class = 'footnav'></ul>");
    			for(var p = 0 ; p < res[r].title.length; p++){
    				$(".footnav").eq(r).append("<li class='footli'>" + res[r].title[p] + "</li>");
    			}    			
    		}
    		var oFooterCenter = document.getElementById("footerCenter");
    		var footerleft = document.body.clientWidth - oFooterCenter.offsetWidth;
    		oFooterCenter.style.left = footerleft / 2 + "px";
    		
    		var banntimer = null;
	    	banntimer = setTimeout(function(){
	    		$(".box").animate({top:"0px"},3500);
	    	},1200);
    	}
    })
    
}
$(function(){
	$("#shoppingBag").mouseenter(function(){
		$("#shopthing").css("display","block");
		sc_msg();
	});
	$("#shoppingBag").mouseleave(function(){
		$("#shopthing").css("display","none");
	});
	function sc_msg(){
		$.ajax({
			type:"get",
			url:"../code/maingoods.json",
			async:true,
			success:function(res){
				var sc_arr = eval($.cookie("goods"));
				var html = '';
				for(var i in sc_arr){
					html += "<li><img src=" + res[sc_arr[i].id].img1 + "><p class='goods_alt1'>" + res[sc_arr[i].id].title + "</p><p class='goods_alt2'>" + res[sc_arr[i].id].price + "</p><p style='font-size:12px;'>数量：" + sc_arr[i].num + "</p></li>";
				}
				$("#shopthing ul").html(html);
			}
		})
	}
	if($.cookie("User")){
		var sc_name = $.cookie("User");
		$("#loginGucci").html("欢迎您，" + sc_name);
		$("#loginGucci").attr("href","information.html");
		$("#loginGucci").before("<a style=' cursor: pointer;' id='removeid'>注销</a>");
		$("#removeid").click(function(){
			$.cookie('User', '', { expires: -1 });
			history.go(0) 
		})
	}
})
