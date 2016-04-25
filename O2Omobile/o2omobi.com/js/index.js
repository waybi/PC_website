$(function() {
	//第一屏的幻灯片高度
	var documentHeight = $(document).height();
	var height = documentHeight - 200 -117;
	$(".slide").height(height);
	$(window).resize(function() {
		var documentHeight = $(document).height();
		var height = documentHeight - 200 - 117;
		$(".slide").height(height);
		//首页首屏切换
//		slideHover( $(".scon .dot-1 > li"),$(".scon"),$('.slide') );
	});
	
	//省略号
	$(".ellipsis_p1").dotdotdot({
		ellipsis: '... ',
		height: 60,
	});
	//省略号
	$(".ellipsis_p2").dotdotdot({
		ellipsis: '... ',
		height: 80,
	});
	
	//foot 友情链接
	$(".down").click(function(){
		var height = $('#flink-container').height();
		if( height == 20 ){
			$('#flink-container').height('auto');
			$(this).addClass('rotate180');
		}else{
			$('#flink-container').height( 20 );
			$(this).removeClass('rotate180');
		}
	});
	
	//合作伙伴 选项卡切换
	 fnTab( $(".partners"), $(".tabCon"), 'click' );
	
	//开发者
	fnTab( $(".nav-item"), $(".iacon"), 'click' );
	//广告主
	fnTab( $(".nav-item"), $(".gz"), 'click' );
	
	//新闻动态
	fnTab( $(".dn .nav-item"), $(".la"), 'click' );

	//关于我们
	fnTab( $(".nav-item-ab"), $(".ab"), 'click' );
	
	//加入我们
	fnTab( $(".joinus .list-view"), $(".joinus .item"), 'click' );
	
	
	//合作伙伴
	slideHover( $(".app .dot > li"),$(".part-wrap"),$('.app-glance') );
	slideHover( $(".customer .dot > li"),$(".part-wrap"),$('.cus-glance') );
	slideHover( $(".poster .dot > li"),$(".part-wrap"),$('.poster-glance') );
	slideHover( $(".media .dot > li"),$(".part-wrap"),$('.media-glance') );
	
	//首页首屏切换
//	slideHover( $(".scon .dot-1 > li"),$(".scon"),$('.slide') );
	
	setTimeout(function(){
		slideHover( $(".news_scroll .dot-1 > li"),$(".news_scroll"),$('.ncon') );
	},1000);
	
	//滚屏
	$(document).on('mousewheel', function(e) {
		if (e.originalEvent.wheelDelta > 0) {
			Slider.slidePrev();
		} else {
			Slider.slideNext();
		}
	});
	
	//点击滚屏
	$('.nav-list li').on('mousedown', function() {
		Slider.slideTo( $(this).index() );
	});
	//回到顶部
	$('.goto').on('mousedown', function() {
		Slider.slideTo( 0 );
	});
	
	//微信公众号
	$(".weixin").hover(function(){
		$('.dy').fadeToggle();
	});
	
	//微信客服
	$(".weixin-1").hover(function(){
		$('.dy-2').fadeToggle();
	});
	
	//微信公众号
	$(".qr-code").hover(function(){
		$('.dy-1').fadeToggle();
	});
	
	
	// 广告主 开发者 幻灯片
	imgSlide( $(".dec-slide") );
	imgSlide( $(".fa-slide") );
	imgSlide( $(".de-slide") );
	
	
	// 跳到英文版网站
	$('select[name="language"]').change(function(index){
		var checkValue = $(this).val();
		switch( checkValue ){
			case 'English': 
				window.location.href = 'http://www.o2omobi.com/en/';
				break;
		}
	});
	
	

})

/*
 * 选项卡切换
 */
function fnTab( oNav, aCon, sEvent ){
	var aElem = oNav.children('a');
	
	if( aElem.length != 0 ){
		aCon.hide().eq(0).show();
		aElem.each(function (index){
			$(this).on(sEvent,function(){
				aElem.removeClass('active');
				$(this).addClass('active');
				aCon.hide().eq(index).show();
			});
		})
	}else{
		aElem = oNav.children();
		aCon.hide().eq(0).show();
		aElem.each(function (index){
			$(this).on(sEvent,function(){
				aElem.removeClass('active');
				$(this).addClass('active');
				aCon.hide().eq(index).show();
			});
		})
	}
	
}

function slideHover( elems, target,parent ){
	var len = elems.length;
	var index = 0;
	var timer;
	
	elems.mouseover(function(){
		index = elems.index(this);
		showImg(index,elems,parent,target);
	}).eq(0).mouseover();
	
	
	//自动开始动画
	target.hover(function(){
		clearInterval( timer );
	},function(){
		timer = setInterval(function(){
			showImg(index,elems,parent,target);
			index++;
			if( index == len ){ index = 0; }
		},3000);
	}).trigger('mouseleave');
}


/*
 * 左右自动切换
 */
function showImg(index,elems,parent,target){
	var none_unit_width = target.width(); //获取框架内容的宽度,不带单位
	parent.stop(true).animate({left:-none_unit_width*index},1000);	
	elems.removeClass('active').eq(index).addClass('active');
}

/*
 * 左右点击切换
 */
function imgSlide(  parent ){
	var page = 1;
	var len = parent.children().length;
	var page_count = len;
	var width = parent.find(':first-child').outerWidth()*len;

	var none_unit_width = parent.find(':first-child').width(); //获取框架内容的宽度,不带单位
	var oLis = parent.parent().find("li");

	parent.width( Math.ceil(width) );
	var left = parent.parents().find('.gl');
	var right = parent.parents().find('.gr');
	
	//向左 按钮
    left.click(function(){ 
		if( !parent.is(":animated") ){
			if( page == 1 ){  //已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
				parent.animate({ left : '-='+none_unit_width*(page_count-1)}, 800); //通过改变left值，跳转到最后一个版面
				page = page_count;
			}else{
				parent.animate({ left : '+='+none_unit_width }, 800);  //通过改变left值，达到每次换一个版面
				page--;
			}
		}
		
		oLis.eq( page -1 ).siblings().removeClass('active');
		oLis.eq( page -1 ).addClass('active');
   });

    //向右 按钮
    right.click(function(){ 
		if( !parent.is(":animated") ){
			console.log('dddd');
			if( page == page_count ){  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
				parent.animate({ left : 0}, 800); //通过改变left值，跳转到第一个版面
				page = 1;
			}else{
				parent.animate({ left : '-='+none_unit_width}, 800);  //通过改变left值，达到每次换一个版面
				page++;
			}
			
		}
		
		oLis.eq( page -1 ).siblings().removeClass('active');
		oLis.eq( page -1 ).addClass('active');
		 
   });
   
   $(".part-wrap").hover(function(){
   		left.fadeToggle();
   		right.fadeToggle();
  	})

}


/*
 * 全屏滚屏
 */
var Slider = (function(){
	var DURATION = 400;
	var count = $('.page').length;
	var current = 0;
	var animating = false;
	
	function slideTo(index){
		if (animating || index == current) {
			return;
		}
		if (index < 0) {
			index = count - 1;
		} else if (index >= count) {
			index = 0;
		}
		
		var forward = ( index > current) || (index == current - count + 1);
		var $pages = $('.slider .page');
		var $current = $pages.eq(index);
		var $prev = $('.slider .page.visible');
		var offset = $current.height();
		animating = true;
		
		$current.show().css({
			top: forward?offset:-offset
		}).animate({
			top: 0
		}, DURATION, function() {
			$(this).addClass('visible');
			$('.nav-list li').removeClass('current').eq(index).addClass('current');
			animating = false;
			$(this).find('.wrap,.adn-center').removeClass('hidden');
			$(this).find('.wrap,.adn-center').addClass('visible');
			
			$(this).siblings().find('.wrap,.adn-center').addClass('hidden');
			$(this).siblings().find('.wrap,.adn-center').addClass('hidden');
			
			if( $current.index() == 5 ){
				var timer = null;
				var timer3 = null;
				var timer4 = null;
				ab( 0, 5, 1, $("#five"),1200 );
				ab( 0, 15, 1, $("#fifteen"),1800 );
				ab( 20, 86, 1, $("#eighty-six"),2400,timer3 );
				ab( 11940, 12000, 1, $("#twelve-thousand"),3000,timer4 );
				
			}else{
				$("#five").text(' ');
				$("#fifteen").text(' ');
				$("#eighty-six").text(' ');
				$("#twelve-thousand").text(' ');
			};
			
		});
		
		$prev.animate({
			top: forward?-offset:offset
		}, DURATION, function() {
			$(this).removeClass('visible').hide();
		});
		
		current = index;
	}
	
	function ab( gt, point, iSpeed, target, delay,timer ){
		clearInterval( timer ); 
		setTimeout(function(){
			timer = setInterval( function(){
				if(  gt >= point  ){
					clearInterval( timer );
				}else{
					gt += iSpeed; 
					target.text( gt );
				}
			},50 );
		},delay);
	}
	
	
	return {
		slideTo: slideTo,
		slidePrev: function() {
			if (current == 0){
				return;
			};
			slideTo(current - 1);
		},
		slideNext: function() {
			if (current == count - 1){
				return;
			};
			slideTo(current + 1);
		},
	}
})();
