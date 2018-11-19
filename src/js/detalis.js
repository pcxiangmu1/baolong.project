
//引用依赖的配置文件夹
 require(["config"],function(){
	//引入依赖模块

 require(["jquery","template","footer","cookie"],function($,template,footer){
  

  //给div一个点击事件，弹出跳转购物车的弹框
    $(".div").on("click",function(){
      $("#cart_1").show();
    });


    function Detalis(){
    	this.renderDetalis();
    }


   Detalis.prototype={
   	constructor:Detalis,

   	//渲染数据
   	renderDetalis:function(){

   		$.ajax("http://rap2api.taobao.org/app/mock/94667/api/detalis")

   		//done表示成功是 返回的数据
   	
  .done(function(data){
        /* console.log(data);    */
         //待渲染的数据
         var data=data.data;
       /*  console.log(data)*/

  //获取id
       var searchURL=window.location.search;
            console.log(searchURL);
        searchURL = searchURL.substring(1, searchURL.length);
            console.log(searchURL);
       var _id = searchURL.split("&")[0].split("=")[1];
            console.log(_id);
           


     /*  location.search*/
         //渲染
         var html=template("detal_template",data);
        /* console.log(html);*/
           $(".container").html(html);


      //给"加入购物车"绑定点击事件
        $("#btn_3").on("click",function(e){
         //获取事件源
          var e=e.target;  

            
           var amount=1;
           //获取父节点
           var _children=e.parentNode.parentNode.parentNode.parentNode.children;

           console.log(_children[1].children[0].children[0].src);
           console.log(_children[1].children[1].children[0].children[0].innerText);
           console.log(_children[1].children[1].children[0].children[1].innerText);
           console.log(_children[1].children[1].children[0].children[2].innerText);
           console.log(_children[1].children[1].children[2].children[0].children[1].innerText);

        //获取当前商品的信息
           var currproduct={
                _id:_id,
                img: _children[1].children[0].children[0].src,
                title1: _children[1].children[1].children[0].children[0].innerText,                                     
                title2: _children[1].children[1].children[0].children[1].innerText,   
                title3: _children[1].children[1].children[0].children[2].innerText,
                price: _children[1].children[1].children[2].children[0].children[1].innerText,
                amount:1
                                                  
            }
            console.log(_id);
            console.log(amount);

          console.log(currproduct);
            //cookie中是否已存在选购商品的购物车数组
                var products=$.cookie("products"); 
              
                if(products){ //存在

                 products=JSON.parse(products);
               
                }else{  //不存在
                 
                  products=[];
             
                }
        
              //判断当前选购商品在购物车是否已存在
              //存在则修改数量，不存在则追加到购物车数组中
                
              for(var i=0, len=products.length; i<len;i++){
                if(products[i]._id == currproduct._id){
                   products[i].amount++;
                   break;
                }
             
              }
              
               console.log(i,len);
                if(i==len){  //将当前商品添加保存在数组中
                   
                   products.push(currproduct);
                   console.log(products);
                }
                
               //将数组保存在cookie中
               $.cookie("products",JSON.stringify(products),{expires:10,path:"/"})
           
             /* console.log(products)*/

           
  
        })
        
         });
   	}
   }
 	new Detalis();




  

 });
});