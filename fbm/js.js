$(function(){
	var browser={
		versions:function(){
			var u = navigator.userAgent, app = navigator.appVersion;
			return {         //移动终端浏览器版本信息
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
				iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			};
		}(),
		language:(navigator.browserLanguage || navigator.language).toLowerCase()
	}
	var bv=browser.versions;
	var PageID=window.PageID||'';
	if(bv.mobile||bv.android||bv.iPhone||bv.iPad) {
		location.href="/html5/"+PageID;
	}

	$('#gototop').on('click',function(){
		$(document.body).animate({scrollTop:0},400)
	});

	if ($('#block-banner').length) {

		var Max=0;
		function getMax(val){
			typeof(val)=='number'&&(val=val.toString())
			var length=val.length;
			var first=val.substring(0,1)-0;
			if(val.substring(1,2)>=5){
				val=(first+1)*10;//比如前2位是25那就变成30
			}else{
				val=first*10+5;//比如前2位是23那就变成25
			}
			var r=val*Math.pow(10,length-2);
			return r;
		}

		$('#banner2-lines li').each(function(i){
			var val=parseInt($(this).find('span').text());
			$(this).find('i').attr('numbers',val);
			Max=val>Max?val:Max;
		});
		function banner2LinesSet(isReset){
			$('#banner2-lines li p i').each(function(i){
				var that=$(this);
				clearTimeout(that.TOut)
				var percent=0;
				if (!isReset) {
					percent=parseInt(that.attr('numbers'))/getMax(Max)*100+'%';
				};
				that.TOut=setTimeout(function(){that.css({width:percent});},400);
			});
		}
		var tabIndex=0;
		var tabLi=$('#banner-tab li');
		var hasTransition=true
		if($.browser.msie){
			hasTransition=false;
		}
		tabLi.on('click',function(i){
			var t=$(this).attr('t');
			// $('#'+t).show().siblings('.banner').hide();
			if (hasTransition) {
				$('#block-banner')[t=='banner1'?'removeClass':'addClass']('show1');
			}else{
				if (t=='banner1') {
					$('#banner1').animate({left:'0px'},200)
					$('#banner2').animate({left:'1920px'},200)
				}else{
					$('#banner1').animate({left:'-1920px'},200)
					$('#banner2').animate({left:'0px'},200)
				};
			};
			$(this).addClass('cur').siblings('li').removeClass('cur');
			t=='banner2'&&banner2LinesSet(/*t=='banner1'*/);
			setTabInterval();
		}).eq(tabIndex).click();

		var tabInterval;
		function setTabInterval(){
			clearInterval(tabInterval);
			tabInterval=setInterval(function(){
				tabIndex=tabIndex==0?1:0
				tabLi.eq(tabIndex).click();

			},6000);
		}



		/*function setNumberInterval(obj,number){
			var text=parseInt(obj.text())
			if (text<number) {
				obj.text(text+Math.floor(number/100)+1);
				setTimeout(function(){setNumberInterval(obj,number)},40);
			}else{
				obj.text(number);
			};
		}
		var isShow=0;
		$(window).scroll(function(){
			var scrollT=window.scrollY||document.body.scrollTop||document.documentElement.scrollTop;
			if (isShow>=3) {return};
			$('.index-body-block').each(function(){
				var that=$(this);
				if (!that[0].isShow&&scrollT>=that.offset().top-$(window).height()/3*2) {
					that[0].isShow=true;
					isShow++;
					var txt=that.find('.big-text');
					setNumberInterval(txt,Math.floor(txt.attr('number')))
				};
			});
			
		});
		$(document.body).on('scroll',function(){
			var scrollT=window.scrollY||document.body.scrollTop;
			if (isShow>=3) {return};
			$('.index-body-block').each(function(){
				var that=$(this);
				if (!that[0].isShow&&scrollT>=that.offset().top-$(window).height()/3*2) {
					that[0].isShow=true;
					isShow++;
					var txt=that.find('.big-text');
					setNumberInterval(txt,Math.floor(txt.attr('number')))
				};
			});
			
		});*/

	};



})