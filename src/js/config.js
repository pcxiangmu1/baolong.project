//配置短名称
 require.config({
 	baseUrl:"/",
 	paths:{
 		"jquery":"lib/jquery/jquery-1.12.4.min",
        "footer":"js/footer",
        "bootstrap":"/lib/bootstrap/js/bootstrap",
        "template":"lib/art-template/template-web",
         "cookie":"lib/jquery.cookie"
         },


     //bootsrap是依赖jquery的需要垫片
    shim:{
    	"bootstrap":{
    		deps:["jquery"]
    	},
    }

 });