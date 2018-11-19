/**
 * 根据选择器查找元素
 * @param selector <String> 选择器，可取 #id   .class   element
 * @param context <DOM> 查询上下文，即在该DOM元素后代查找满足选择器条件的元素，默认在 document 中查找
 * @return 返回查找到的元素（根据id查找时返回的是查找到的DOM对象，根据类名或元素名查找时，返回的是 HTMLCollection）
 */
function $(selector, context) {
	// 如果未传递 context 参数，则默认取 document 值
	context = context || document;

	if (selector.indexOf("#") === 0) // id
		return document.getElementById(selector.slice(1));
	if (selector.indexOf(".") === 0) // className
		return byClassName(selector.slice(1), context);
	// element
	return context.getElementsByTagName(selector);
}

/**
 * 解决根据类名查找元素浏览器兼容
 * @param className <String> 待查找的类名
 * @param context <DOM> 查询上下文，即在该DOM元素后代查找满足选择器条件的元素，默认在 document 中查找
 * @return 返回查找到的元素
 */
function byClassName(className, context) {
	// 默认在 document 文档中查找
	context = context || document;

	/* 支持使用 getElementsByClassName 方法，则直接使用 */
	if (context.getElementsByClassName)
		return context.getElementsByClassName(className);

	/* 不支持使用 getElementsByClassName 方法 */
	// 保存所有查找到元素的数组
	var _result = []; 
	// 将查询上下文后代中所有元素查找出来
	var _tags = context.getElementsByTagName("*");
	// 遍历迭代所有元素
	for (var i = 0, len = _tags.length; i < len; i++) {
		// 获取当前遍历到元素的所有类名
		var _classNames = _tags[i].className.split(" ");
		// 遍历所有类名
		for (var j = 0, l = _classNames.length; j < l; j++) {
			if (_classNames[j] === className) { // 当前元素的某个类名与待查找的类名一致
				// 说明当前遍历到的元素是需要查找的元素之一
				_result.push(_tags[i]);
				break;
			}
		}
	}

	// 返回所有查找到的结果
	return _result;
}

/**
 * 获取 CSS 属性值
 * @param element DOM元素
 * @param attrName CSS属性名
 */
function css(element, attrName) {
	if (window.getComputedStyle) // 支持使用 getComputedStyle()
		return window.getComputedStyle(element)[attrName]

	// 不支持使用 getComputedStyle()
	return element.currentStyle[attrName];
}

/**
 * 添加事件监听：事件冒泡
 * @param element 待添加事件监听的元素
 * @param type 事件类型字符串
 * @param callback 事件处理程序回调函数
 */
function on(element, type, callback) {
	if (element.addEventListener) { // 支持使用 addEventListener()
		// 判断 type 是否以 "on" 开头
		if (type.slice(0,2) === "on") // 以 "on" 开头，不需要，则去掉
			type = type.slice(2);
		element.addEventListener(type, callback);
	} else { // 不支持使用 addEventListener()
		// 判断 type 是否以 "on" 开头
		if (type.slice(0, 2) !== "on") // 没有以 "on" 开头，需要，则加上
			type = "on" + type;
		element.attachEvent(type, callback);
	}
}

/**
 * 获取/保存 cookie
 * @param key cookie名
 * @param value cookie值，可选，当不传递时，表示根据 cookie 名查找 cookie 值
 * @param options 可配置选项参数，如：{expires:3, path:"/", domain:".baidu.com", secure:true}
 */
function cookie(key, value, options) {
	// 未传递 value 参数，则表示读取 cookie
	if (typeof value === "undefined") {
		// 将域下所有 cookie 读取出来，以 "; " 分割保存到数组中
		var cookies = document.cookie.split("; ");
		// 遍历迭代所有的 cookie ，查找指定 key 对应的 cookie 值
		for (var i = 0, len = cookies.length; i < len; i++) {
			// 将当前遍历到的 cookie 使用 "=" 分割
			var parts = cookies[i].split("=");
			// 数组中第一个元素为 cookie 名，将 cookie 名解码
			var name = decodeURIComponent(parts.shift());
			// 判断当前 cookie 名与待查找 cookie 的名称是否一致
			if (name === key) // 找到 cookie，则返回对应 cookie 值
				return decodeURIComponent(parts.join("="));
		}

		// 如果循环迭代完毕所有 cookie 都不存在要查找的 cookie 信息，则说明未保存过
		return undefined;
	}

	// 传递了 value 参数，表示保存 cookie
	// "key=value"，将 key 和 value 编码
	var _cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	// 判断可配置选项
	options = options || {};
	if (options.expires) { // 有失效时间的配置
		var date = new Date();
		date.setDate(date.getDate() + options.expires);
		_cookie += ";expires=" + date.toUTCString();
	}
	if (options.path) // 有配置路径
		_cookie += ";path=" + options.path;
	if (options.domain) // 域
		_cookie += ";domain=" + options.domain;
	if (options.secure) // 安全链接
		_cookie += ";secure";
	// 保存 cookie
	document.cookie = _cookie;
}

/**
 * 删除 cookie
 * @param key cookie名
 * @param options 可配置选项参数，如：{expires:3, path:"/", domain:".baidu.com", secure:true}
 */
function removeCookie(key, options) {
	options = options || {};
	options.expires = -1; // 要删除 cookie ，则失效时间为当前时间之前的某一刻
	cookie(key, "", options);
}

/**
 * 运动
 * @param element 待添加运动动画效果的 DOM 元素对象
 * @param options 多属性目标终值选项
 * @param speed 限定运动的总时间
 * @param fn 在运动结束后需要继续执行的函数 
 */
function animate(element, options, speed, fn) {
	// 清除元素上已有的运动动画计时器
	clearInterval(element.timer);

	// 多属性初值、范围值
	var start = {}, range = {};
	for (var attrName in options) {
		start[attrName] = parseFloat(css(element, attrName));
		range[attrName] = options[attrName] - start[attrName];
	}

	// 记录开始运动的时间
	var startTime = +new Date();

	// 启动计时器，实现运动动画效果：将计时器 id 缓存
	element.timer = setInterval(function() {			
		// 计算已经运动的时间
		var elapsed = Math.min(+new Date() - startTime, speed);

		// 多属性按公式运算：线性运动
		for (var attrName in options) {
			// 公式：结果 = 运动时间 * 总范围 / 总时间 + 起始
			var result = elapsed * range[attrName] / speed + start[attrName];
			// 设置CSS
			element.style[attrName] = result + ("opacity" === attrName ? "" : "px");
		}

		// 判断是否停止计时器
		if (elapsed === speed) {
			clearInterval(element.timer);
			// 如果有运动结束后需要继续执行的函数，则调用函数执行
			fn && fn();
		}
	}, 1000/60);
}

/**
 * 淡入
 * @param element 待添加淡入动画效果的 DOM 元素对象
 * @param speed 限定运动的总时间
 * @param fn 在运动结束后需要继续执行的函数 
 */
function fadeIn(element, speed, fn) {
	element.style.display = "block";
	element.style.opacity = 0;
	animate(element, {opacity: 1}, speed, fn);
}

/**
 * 淡出
 * @param element 待添加淡出动画效果的 DOM 元素对象
 * @param speed 限定运动的总时间
 * @param fn 在运动结束后需要继续执行的函数 
 */
function fadeOut(element, speed, fn) {
	element.style.display = "block";
	element.style.opacity = 1;
	animate(element, {opacity: 0}, speed, function() {
		element.style.display = "none";
		fn && fn();
	});
}

/**
 * ajax
 * @param options 选项参数
 */
/*
options = {
	type : "get", // 请求方式，默认为 "get"
	url : "xxxx", // 请求资源的URL
	data : {username:"abc", password:"xxx", address: "xxxxx"}, // 向服务器传递的参数数据
	dataType : "json", // 预期从服务器返回的数据格式
	success : function(data){}, // 请求成功时执行的函数，传递获取到的数据
	error : function(err) {}, // 请求失败时执行的函数
}
*/
function ajax(options) {
	options = options || {}; // 默认 options 为 {}
	var url = options.url; // 请求的资源URL
	if (!url)
		return;
	// 请求方式
	var method = (options.type || "get").toUpperCase();
	// 查询字符串
	var queryString = null;
	if (options.data) { // 存在向服务器传递的参数，则将对象转换为查询字符串结构
		queryString = [];
		for (var attr in options.data) {
			queryString.push(attr + "=" + options.data[attr]);
		}
		queryString = queryString.join("&");
	}
	// 判断，如果是 get 请求，则将查询字符串串联在URL后
	if (method === "GET" && queryString) {
		url += "?" + queryString;
		queryString = null;
	}

	// ajax步骤
	// 创建核心对象
	var xhr = new XMLHttpRequest();
	// 准备建立连接
	xhr.open(method, url, true);
	// 如果需要像表单一样POST提交数据，则需要设置请求头
	if (method === "POST")
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	// 发送请求
	xhr.send(queryString);
	// 处理响应
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) { // 请求处理完毕
			if (xhr.status === 200) { // 请求成功
				// 获取响应文本
				var data = xhr.responseText;
				// 判断，如果是JSON格式的文本，则转换
				if (options.dataType === "json")
					data = JSON.parse(data);
				// 请求成功时执行的函数
				options.success && options.success(data);
			} else { // 请求失败
				// 请求失败时执行的函数
				options.error && options.error(xhr.status);
			}
		}
	}
}

