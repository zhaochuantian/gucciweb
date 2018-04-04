function $_ajax({method = "get", url, data, success, error}){
	var xhr = null;
	try{
		xhr = new XMLHttpRequest();
	}catch(error){
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	if(method == "get" && data){
		url += "?" + data + "&" + new Date().getTime();
	}

	xhr.open(method, url, true);

	if(method == "post"){
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xhr.send(data);
	}else{
		xhr.send();
	}

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			//【注】在这里的代码，是处理下载到的数据的代码，这部分代码是不确定的。直接将这部分代码编写的权利交给别人
			if(xhr.status == 200 && success){
				success(xhr.responseText);
				
			}else{
				error("Error：" + xhr.status);
			}
		}
	}
}