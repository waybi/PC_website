$(function() {
	
	
	var iStartWidth = 1200,iStartHeight = 680,oMain = $(".main")[0];
	//js模拟响应时
	$(window).on('load resize',function(ev){
		
		resize();
		innerHeight = $(window).innerHeight(); 
		innerWidth = $(window).innerWidth();
		if(ev.type == 'resize')resize();
	})
	
	function resize(){
		var iW=0,iL=0,iT=0,iH=0;
		if( innerHeight>iStartHeight && innerWidth>iStartWidth ){
			setCss( oMain,{width:innerWidth,height:innerHeight,$Transform:"scale(1)",left:0} );
		}else{
			if( innerWidth/iStartWidth > innerHeight/iStartHeight ){
				iS=innerHeight/iStartHeight;
		        iW=innerWidth/iS;
		        iH=iStartHeight;
			}else{
				iS=innerWidth/iStartWidth;
		        iW=iStartWidth;
		        iH=innerHeight/(innerWidth/iStartWidth);
			}
			iL=(innerWidth-iW)/2;
			setCss(oMain,{$Transform:"scale("+iS+")",width:iW,height:iH,left:iL,});
		}
	}
	

})

/*
 * 设置css
 */
function setCss( obj,json ){
	
	var arr=["Webkit","Moz","O","ms",""];
	$.each( json, function(k,v) {    
		 if( k.charAt() == "$" ){
		 	$.each(arr,function(i,e){
		 		$(obj).css(e+k.substring(1),v);
		 	})
		 	return;
		 }
		 
		 $(obj).css(k,v);
	});
}

