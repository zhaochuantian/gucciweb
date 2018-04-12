$.ajax({
	type:"get",
	url:"../code/banner.json",
	async:true,
	success:function(res){
		var html = "";
        html += "<img src=" + res[0].img + " >";
        $(".banner-title").before(html);
	}
});