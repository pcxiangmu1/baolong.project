require(["config"],function(){

require(["jquery","template","cookie","footer"],function($, tempalte,cookie,footer){



//页面内容加载完毕，触发onload事件的执行


    	/*读取cookie中保存的购物车，渲染显示*/
    	//读取,如果有则返回读取到的cookie字符串，如果没有则返回undefined
    	var products=$.cookie("products");

    	if(products){ //存在
    		products=JSON.parse(products);
      

    	}
      /*console.log(products);*/
    	//判断购物车是否为空
    	var html="";
   	if(products.length === 0){
    		
        $("#main2").innerText=html;
        return;
    	}
     

    /*console.log(products);*/
    	//购物车不为空，则渲染显示出所有选购的商品信息
       	products.forEach(function(prod){
    		html +=`<div class="prod">
                <div style="display:none">${prod._id}</div>
		            <div class="img"><img src="${prod.img}"/></div>
            <div class="text">
		           	  <h4 class="h3">${prod.title1}</h4>
		           	  <P class="ng">${prod.title2}</P>
		           	  <p class="ng">${prod.title3}</p>
		           	  <span class="del">删除</span>
		           </div>
		           <div class="shu">
		           	  <span>数量</span>                                                                                                                                                                         	
		           	  <div class="zj_prod">
		           	  	 <span class="jian" >-</span>
		           	  	 <input type="text" id="num"  value="${prod.amount}"/>
		           	  	 <span class="jia" >+</span>
		           	  </div>


		           </div>
		           <div class="dj_price">
		           	  <span class="span1">单价</span></br>
		           	  <span >RNB&nbsp;<span class="span2">${prod.price}</span></span>
		           </div>
		           <div class="zj_price">
		              <span class="span3">总价</span></br>
		           	  <span>RNB&nbsp;<span class="span3">${(prod.price*prod.amount).toFixed(2)}</span></span>
		           </div>

		           <div class="d_check">
		    			    <span class="i_span"><input type="checkbox"/></span>
		   	     </div>
             </div>`;
 
    	});
     /*  console.log(html);*/

       $("#main2").html(html);
      
 


  

//  *****************************************  删除商品  ***************************************************

       /*  删除单行选购的商品  */
       //事件委派
       $(".prod").on("click",function(e){
       	var src=e.target;
        if(src.className ==="del"){ //删除
             //删除链接所在行
             var _prod=src.parentNode.parentNode;
            /*console.log(_prod);*/
             var _id=_prod.children[0].innerText;
            /* console.log(_id);*/
             //查找当前商品行元素在数组中的下标
             for(var i=0, len=products.length; i<len; i++){
              if(products[i].id ==_id){
                //从products数组中删除当前行商品对应的数组元素

                products.splice(i,1);
              /* console.log(products);*/
                break;
                
             }
             }
         
          /* console.log(3)*/
          //从cookie中将当前商品行的数据移除：将products数组内容覆盖保存回 cookie 中
          $.cookie("products",JSON.stringify(products),{expires:10, path:"/"});
         //从DOM树中删除行节点
         _prod.parentNode.removeChild(_prod);
     
       }

       });
  


// ****************************************  修改商品数量  *******************************************************

       /*  修改商品数量  */
       $(".prod").on("click",function(e){
         	 //获取事件源元素
         	var src=e.target;
           //判断是否为 "+"/"-"
         if(src.className ==="jia" || src.className ==="jian"){
          //获取事件源所在行
         	var _prod=src.parentNode.parentNode.parentNode;
          /*console.log(_prod);*/
          //商品id
          var _id=_prod.children[0].innerText;

              /*console.log(_id);*/
         //获取修改数量的商品对象
         var currprod=null;
         /*console.log(currprod);*/

           for(let i = 0, len = products.length; i < len; i++){
                 
            if(products[i]._id ==_id){
                /*  console.log(products[i]._id);*/
              currprod=products[i];
              /*  console.log(currprod);*/
              break;
            }
           }
        
          /*  console.log(currprod.amount);*/
            //修改商品对象的数量
            if(src.className ==="jia"){
               currprod.amount++;
            /* $("#num").val(currprod.amount);*/
            }else{
              if(currprod.amount <= 1){
                return;
             
            
              }
              currprod.amount--;
            }
         
         /* console.log(currprod.amount);*/
         	//把cookie中的商品数量修改
         	$.cookie("products",JSON.stringify(products),{expries:10, path:"/"});
         	//显示商品数量与小计修改
           console.log(currprod.price);
           console.log(currprod.amount);
         	_prod.children[3].children[1].children[1].value=currprod.amount;
         	_prod.children[5].children[2].children[0].innerText=(currprod.price*currprod.amount).toFixed(2);
         
           }
       });
    

       /*  修改商品数量：文本框中输入修改后的数量  */
    //   var _inputAmount=$(".amount");
    //   on(_inputAmount,"blur",function(){
       
       	//获取事件源所在行
    //   var _inputAmount=this.parentNode.parentNode.parentNode;

       //判断输入的数量是否格式正确
    //   var reg=/^[1-9]\d*$/
   //    if(!reg.test(this.value)){
    //   	this.value=currprod.amount;
    //   	return;
   //    }
       //将输入的数量保存到当前修改商品对象的amount属性中
    //   currprod.amount=this.value;
       //把cookie中商品数量修改
     //   $.cookie("products",JSON.stringify(products),{expires:10, path:"/"});
       //显示修改数量后的小计金额
    //    _prod.children[2].children[1].children[1].innerText=(currprod.amount*currprod,price).toFixed(2);
     //  });
       
    

});

});