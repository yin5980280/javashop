var SITE_URL = window.location.toString().split('/index.php')[0];
SITE_URL = SITE_URL.replace(/(\/+)$/g, '');
jQuery.extend({
  getCookie : function(sName) {
  	sName = COOKIE_PRE + sName;
    var aCookie = document.cookie.split("; ");
    for (var i=0; i < aCookie.length; i++){
      var aCrumb = aCookie[i].split("=");
      if (sName == aCrumb[0]) return decodeURIComponent(aCrumb[1]);
    }
    return '';
  },
  setCookie : function(sName, sValue, sExpires) {
  	sName = COOKIE_PRE + sName;
    var sCookie = sName + "=" + encodeURIComponent(sValue);
    if (sExpires != null) sCookie += "; expires=" + sExpires;
    document.cookie = sCookie;
  },
  removeCookie : function(sName) {
  	sName = COOKIE_PRE + sName;
    document.cookie = sName + "=; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
  }
});
function drop_confirm(msg, url){
    if(confirm(msg)){
        window.location = url;
    }
}


function go(url){
    window.location = url;
}
/* 格式化金额 */
function price_format(price){
    if(typeof(PRICE_FORMAT) == 'undefined'){
        PRICE_FORMAT = '￥%s';
    }
    price = number_format(price, 2);

    return PRICE_FORMAT.replace('%s', price);
}

function number_format(num, ext){
    if(ext < 0){
        return num;
    }
    num = Number(num);
    if(isNaN(num)){
        num = 0;
    }
    var _str = num.toString();
    var _arr = _str.split('.');
    var _int = _arr[0];
    var _flt = _arr[1];
    if(_str.indexOf('.') == -1){
        /* 找不到小数点，则添加 */
        if(ext == 0){
            return _str;
        }
        var _tmp = '';
        for(var i = 0; i < ext; i++){
            _tmp += '0';
        }
        _str = _str + '.' + _tmp;
    }else{
        if(_flt.length == ext){
            return _str;
        }
        /* 找得到小数点，则截取 */
        if(_flt.length > ext){
            _str = _str.substr(0, _str.length - (_flt.length - ext));
            if(ext == 0){
                _str = _int;
            }
        }else{
            for(var i = 0; i < ext - _flt.length; i++){
                _str += '0';
            }
        }
    }

    return _str;
}
/* 火狐下取本地全路径 */
function getFullPath(obj) {
	if (obj) {
		// ie
		if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
			obj.select();
			if (window.navigator.userAgent.indexOf("MSIE") == 25) {
				obj.blur();
			}
			return document.selection.createRange().text;
		}
		// firefox
		else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
			if (obj.files) {
				// return obj.files.item(0).getAsDataURL();
				return window.URL.createObjectURL(obj.files.item(0));
			}
			return obj.value;
		}
		return obj.value;
	}
}

/* 转化JS跳转中的 ＆ */
function transform_char(str) {
	if (str.indexOf('&')) {
		str = str.replace(/&/g, "%26");
	}
	return str;
}


// 图片比例缩放控制
function DrawImage(ImgD,FitWidth,FitHeight){
	var image=new Image();
	image.src=ImgD.src;
	if(image.width>0 && image.height>0)
    {
		if(image.width/image.height>= FitWidth/FitHeight)
        {
            if(image.width>FitWidth)
            {
                ImgD.width=FitWidth;
                ImgD.height=(image.height*FitWidth)/image.width;
            }
            else
            {
                ImgD.width=image.width;  
                ImgD.height=image.height;  
            }
		}
        else
        {
	       if(image.height>FitHeight)
           {
                ImgD.height=FitHeight;
                ImgD.width=(image.width*FitHeight)/image.height;
	       }
           else
           {
                ImgD.width=image.width;
                ImgD.height=image.height;
            }
		}  
	}
}

/**
* 浮动DIV定时显示提示信息,如操作成功, 失败等
* @param string tips (提示的内容)
* @param int height 显示的信息距离浏览器顶部的高度
* @param int time 显示的时间(按秒算), time > 0
* @sample <a href="javascript:void(0);" onclick="showTips( '操作成功', 100, 3 );">点击</a>
* @sample 上面代码表示点击后显示操作成功3秒钟, 距离顶部100px
* @copyright ZhouHr 2010-08-27
*/
function showTips( tips, height, time ){
	var windowWidth = document.documentElement.clientWidth;
	var tipsDiv = '<div class="tipsClass">' + tips + '</div>';
	
	$( 'body' ).append( tipsDiv );
	$( 'div.tipsClass' ).css({
		'top' : 200 + 'px',
		'left' : ( windowWidth / 2 ) - ( tips.length * 13 / 2 ) + 'px',
		'position' : 'fixed',
		'padding' : '20px 50px',
		'background': '#EAF2FB',
		'font-size' : 14 + 'px',
		'margin' : '0 auto',
		'text-align': 'center',
		'width' : 'auto',
		'color' : '#333',
		'border' : 'solid 1px #A8CAED',
		'opacity' : '0.90',
		'z-index' : '9999'
	}).show();
	setTimeout( function(){$( 'div.tipsClass' ).fadeOut().remove();}, ( time * 1000 ) );
}

function trim(str) {
	return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
}

//弹出框登录
function login_dialog(forword){
	loginDialog = $.dialog({
		title : "用户登陆",
		width : 400,
		height : 170,
		lock : true,
		min : false,
		max : false
	});

	$.ajax({
		url : ctx+"/login_dialog.html",
		success : function(html){
			loginDialog.content(html);
			$(".regis_ent").click(function(){
				  if($("#username").val()==""){
						alert("请输入用户名！");
						return false;
					}
					if($("#password").val()==""){
						alert("请输入密码！");
						return false;
					}
					if($("#validcode").val()==""){
						alert("请输入验证码！");
						return false;
					}
					var options = {
							url : "/api/shop/member!login.do",
							type : "POST",
							dataType : 'json',
							success : function(data) {
								if(data.result==1){
									if(forword==null){
										forward='${ctx}/index.html'; //默认是会员中心
									}
									location.href = forword+"";
								}
								else{
									alert(data.message);
								}
							},
							error : function(e) {
								alert("出现错误 ，请重试");
							}
					};
				$('#login_form').ajaxSubmit(options);	
			});
		},
		
		error : function() {
			$.alert("出现错误,请重试！");
		},
		cache : false
	});
}




/* 显示Ajax表单 */
function ajax_form(id, title, url, width, model){
    if (!width)	width = 480;
    if (!model) model = 1;
    var d = DialogManager.create(id);
    d.setTitle(title);
    d.setContents('ajax', url);
    d.setWidth(width);
    d.show('center',model);
    return d;
}

function ajax_notice(id, title, url, width, model) {
    if (!width)	width = 480;
    if (!model) model = 0;
    var d = DialogManager.create(id);
    d.setTitle(title);
    d.setContents('ajax_notice', url);
    d.setWidth(width);
    d.show('center',model);
    return d;
}
//显示一个正在等待的消息
function loading_form(id, title, _text, width, model) {
    if (!width)	width = 480;
    if (!model) model = 0;
    var d = DialogManager.create(id);
    d.setTitle(title);
    d.setContents('loading', { text: _text });
    d.setWidth(width);
    d.show('center',model);
    return d;
}
//显示一个提示消息
function message_notice(id, title, _text, width, model) {
    if (!width)	width = 480;
    if (!model) model = 0;
    var d = DialogManager.create(id);
    d.setTitle(title);
    d.setContents('message', { type: 'notice', text: _text });
    d.setWidth(width);
    d.show('center',model);
    return d;
}
//显示一个带确定、取消按钮的消息
function message_confirm(id, title, _text, width, model) {
    if (!width)	width = 480;
    if (!model) model = 0;
    var d = DialogManager.create(id);
    d.setTitle(title);
    d.setContents('message', { type: 'confirm', text: _text });
    d.setWidth(width);
    d.show('center',model);
    return d;
}
//显示一个内容为自定义HTML内容的消息
function html_form(id, title, _html, width, model) {
    if (!width)	width = 480;
    if (!model) model = 0;
    var d = DialogManager.create(id);
    d.setTitle(title);
    d.setContents(_html);
    d.setWidth(width);
    d.show('center',0);
    return d;
}
//显示一个消息 消息的内容为IFRAME方式
function iframe_form(id, title, _url, width, height,fresh) {
    if (!width)	width = 480;
    var rnd=Math.random();
    rnd=Math.floor(rnd*10000);

    var d = DialogManager.create(id);
    d.setTitle(title);
    var _html = "<iframe id='iframe_"+rnd+"' src='" + _url + "' width='" + width + "' height='" + height + "' frameborder='0'></iframe>";
    d.setContents(_html);
    d.setWidth(width + 20);
    d.setHeight(height + 60);
    d.show('center');

    $("#iframe_"+rnd).attr("src",_url);
    return d;
}

//收藏店铺js
function collect_store(store_id,obj,jsobj){
	
	var collect = $(obj).parent().parent().find(".store_collect").text();
	if(member==null||member==''){
		login_dialog(window.location.href);
	}else{
		var url = ctx+"/api/b2b2c/storeCollect!addCollect.do";
        $.getJSON(url, {'store_id':store_id}, function(data){
        	if(data.result==1){
        		_prompt(1,data.message);
        		$(obj).parent().parent().find(".store_collect").text(Number(collect)+1);
        	}else if(data.result==0){
        		_prompt(0,data.message);
        	}
        });
	}
}

function _prompt(type,message){
	var img_name="";
	if(type==1){img_name="success.gif";}
	else{img_name="info.gif";}
	
	var timer;
	$.dialog({
		width: 350,
	    height: 100,
	    content: '<img src="/themes/b2b2c/images/'+img_name+'" width="34" height="34" />'+message,
	    init: function () {
	        var that = this, i = 2;
	        var fn = function () {
	            that.title(i + '秒后关闭');
	            !i && that.close();
	            i--;
	        };
	        timer = setInterval(fn, 1000);
	        fn();
	    },
	    close: function () {
	        clearInterval(timer);
	    },
	    button: [{
            name: '确定',
            focus: true
	    }]

	});
}


//收藏商品js
function collect_goods(fav_id,jstype,jsobj){
	$.get('#', function(result){
	    if(result=='0'){
	    	login_dialog();
	    }else{
	    	var url = '#';
	    	$.getJSON(url, {'fid':fav_id}, function(data){
	            if (data.done){
	                showDialog(data.msg, 'succ','','','','','','','','',2);
	                if(jstype == 'count'){
	                	$('[nctype="'+jsobj+'"]').each(function(){
	                		$(this).html(parseInt($(this).text())+1);
	                	});
	                }
	                if(jstype == 'succ'){
	                	$('[nctype="'+jsobj+'"]').each(function(){
	                		$(this).html("收藏成功");
	                	});
	                }
	            }else{
	            	showDialog(data.msg, 'notice');
	            }
	        });
	    }
	});
}

//取得COOKIE值
//function getcookie(name){
//	return $.cookie(COOKIE_PRE+name);
//}

//动态加载js，css
//$.include(['http://www.yzvlife.com/script/a.js','/css/css.css']);
$.extend({
    include: function(file)
    {
        var files = typeof file == "string" ? [file] : file;
        
        for (var i = 0; i < files.length; i++)
        {
            var name = files[i].replace(/^\s|\s$/g, "");
            var att = name.split('.');
            var ext = att[att.length - 1].toLowerCase();
            var isCSS = ext == "css";
            var tag = isCSS ? "link" : "script";
            var attr = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' ";
            var link = (isCSS ? "href" : "src") + "='" + SITEURL+'/' + name + "'";
            if ($(tag + "[" + link + "]").length == 0) $('body').append("<" + tag + attr + link + "></" + tag + ">");
        }
    }
});

    var tms = [];
    var day = [];
    var hour = [];
    var minute = [];
    var second = [];
    function takeCount() {
        setTimeout("takeCount()", 1000);
        for (var i = 0, j = tms.length; i < j; i++) {
            tms[i] -= 1;
            //计算天、时、分、秒、
            var days = Math.floor(tms[i] / (1 * 60 * 60 * 24));
            var hours = Math.floor(tms[i] / (1 * 60 * 60)) % 24;
            var minutes = Math.floor(tms[i] / (1 * 60)) % 60;
            var seconds = Math.floor(tms[i] / 1) % 60;
            if (days < 0) days = 0;
            if (hours < 0) hours = 0;
            if (minutes < 0) minutes = 0;
            if (seconds < 0) seconds = 0;
            //将天、时、分、秒插入到html中
            document.getElementById(day[i]).innerHTML = days;
            document.getElementById(hour[i]).innerHTML = hours;
            document.getElementById(minute[i]).innerHTML = minutes;
            document.getElementById(second[i]).innerHTML = seconds;
        }
    }
    setTimeout("takeCount()", 1000);