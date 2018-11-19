//引用依赖的配置文件
  require(["config"],function(){
  	//引入依赖模块

  	require(["jquery","footer"],function($,footer){
  		

     function Register(){
      this.addListener();
     }
    


    $("#btn1").on("click",function(){
      $(".motai").show();
    })


     $.extend(Register.prototype,{
        //注册事件监听
         addListener:function(){
         
          $("#form_1").on("submit",this.registerHandler);
           return false;
         },


         //注册处理
         registerHandler:function(e){
             e.preventDefault();
             //获取表单中提交的数据，序列化 
             var data=$("#form_1").serialize();   
             console.log(data);
            

             //ajax提交注册数据
        var url="http://localhost/api/register.php";

        $.post(url,data,function(res){

             if(res.res_code  == 1){  //请求成功 
              location.href="http://localhost:8080/html/login.html";
             console.log(1)
         }else{  // 请求失败
             console.log(0)
         }

        },"json")

               return false;  



         }



         })

      //点击确认按钮弹框消失
      $(".btn-register").on("click",function(){
        $(".motai").hide();

     })

      

    new Register()
});
});