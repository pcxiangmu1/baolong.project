/*复用头部*/
define(["jquery"],function(){
	//ajax读取文件加载
$.ajax({
	type:"get", //methde
	url:"/html/include/header.html",
	success:function(data){
		$("header").html(data);
		
	}
});
});