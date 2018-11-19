//引入依赖的配置文件模块
require(["config"],function(){
//引入依赖模块

require(["jquery","template","footer"],function($,template,footer){  
    function List(){
       this.renderList();
     
    }
   
    List.prototype={
    //	constructor:List,
    	//渲染列表数据
    	renderList:function(){
    		$.ajax("http://rap2api.taobao.org/app/mock/94667/api/list")
    		//done表示成功是 返回的数据
    		.done(function(data){ 
    	      //待渲染的数据
           console.log(data)
              var data={list:data.list};
             console.log(data)
              //渲染
            var html=template("list_template",data);
             $(".xbox").html(html);
    		});


    	}
    }
    


    new List();
});
});