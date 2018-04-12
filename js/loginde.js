
$(function(){
	$("#checkit").click(function(){
	 	 $("#remberme").toggle();
	  });
	if($("#submit")){
		$("#submit").click(function(){
			let oName = document.getElementById("loginNumber").value;
			let oPassword = document.getElementById("loginPassword").value;
			$_ajax({
				method :"post",
				url:"inset323.php",	
				data: `name=${oName}&password=${oPassword}`,
				success:function(data){
					var data_str = data;
					alert(data_str)
					if(data_str.search("登录成功") == 0){
						var firstLogin = $.cookie("User") == null ? true : false;
						if(firstLogin){
							$.cookie("User" , oName, {expires : 7});
						};
						$("#loginGucci").html("欢迎您，" + oName);
						$("#loginGucci").attr("href","information.html");
						$("#loginGucci").before("<a style=' cursor: pointer;' id='removeid'>注销</a>");
						$("#removeid").click(function(){
							$.cookie('User', '', { expires: -1 });
							history.go(0);
						})
					}
				},
				error:function(e){
					alert(error)
				}
			});
		})
	}
	
	
})
