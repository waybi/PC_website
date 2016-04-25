;(function(){
	
	// 返回顶部
	$("#global-arrow").click(function(){  
        $('body,html').animate({scrollTop:0},400);  
        return false;  
    }); 
    
    // 滚动隐藏
    var beforeScrollTop = $(window).scrollTop();
	$(window).scroll(function() {
		var afterScrollTop = $(window).scrollTop();
		delta = afterScrollTop - beforeScrollTop;
		if (delta === 0) return false;
		if (delta > 0) {
			$(".navbar").addClass('scroll-hide');
		} else {
			$(".navbar").removeClass('scroll-hide');
		}
		beforeScrollTop = afterScrollTop;
	});
})()
