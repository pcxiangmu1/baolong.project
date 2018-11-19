//引用依赖的配置文件夹
 require(["config"],function(){
	//引入依赖模块

 require(["jquery","footer"],function($,footer){
   
   /* $(".div").on("click",function(){
      $("#cart_1").show();
      })*/


 	//  当表单内容条件不满足显示此弹框  手机号和密码为空显示弹框
         $(".motai").hide();
    $("#btn").on("click",function(e){
       
      if($("#phone").val()===""  &&  $("#psw").val()===""){
          $(".motai").show();
       }else{
        $(".motai").hide();
       }
      /* e.preventDefault();*/
     
      //获取表单中的数据
      var data=$("#form_2").serialize();
           console.log(data);
           
     //ajax获取登录数据
     var url="http://localhost/api/login.php";

     $.post(url,data,function(res){
        if(res.res_code ==1){  //登录成功
          
          alert("登录成功");
       location.href="http://localhost:8080";
          console.log(1);
        }else{  //登录失败
          console.log(0);
        }
     },"json")
        e.preventDefault();
        return false;

     })


   //点击确认按钮消失模态框
  $(".bottom").on("click",function(){
    	$(".motai").hide();

 
    })
 });
});