;(function(){
	var QS=function(id,obj){return (obj||document).querySelector(id);}
	var QSAll=function(id,obj){return (obj||document).querySelectorAll(id);}
	var addEvent=function(obj,type,fn){
		obj.addEventListener(type,fn,false);
	}


	var header=QS('.block-header');
	var menu=QS('#main-menu');
	var menu=QS('#main-menu');

	addEvent(window,'scroll',function(){
		if(window.scrollY>=header.getBoundingClientRect().height){
			menu.classList.add('fixed');
		}else{
			menu.classList.remove('fixed');
		}
	});

	if(QS('#block-banner')){
		var Max=0;
		function getMax(val){
			typeof(val)=='number'&&(val=val.toString());
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

		var list=[],alllist=QSAll('#banner2-lines li');
		for(var i=0;i<alllist.length;i++){
			list.push(alllist[i]);
		}

		list.forEach(function(item,i){
			var val=parseInt(QS('p i',item).getAttribute('number'));
			item._number=val;
			Max=val>Max?val:Max;
		});
		function banner2LinesSet(isReset){
			var _max=getMax(Max)/100;
			list.forEach(function(item,i){

				var percent=0;
				if (!isReset) {
					percent=(item._number/_max)+'%';
				};
				QS('p i',item).style.width=percent;
			});
		}

		// tab
		var tabIndex=0,tabList=QSAll('#banner-tab li');
		for(var i=0;i<tabList.length;i++){
			addEvent(tabList[i],'click',function(){
				if (this.className.indexOf('cur')<0) {
					var t=this.getAttribute('t');
					QS('#block-banner').classList[t=='banner1'?'remove':'add']('show1');
					this.classList.add('cur');
					tabIndex=tabIndex==0?1:0;
					tabList[tabIndex].classList.remove('cur')
					t=='banner2'&&banner2LinesSet(/*t=='banner1'*/);
				};
				setTabInterval();
			})
		}
		tabList[0].click();

		var tabInterval;
		function setTabInterval(){
			clearInterval(tabInterval);
			tabInterval=setInterval(function(){
				tabList[tabIndex].click();
				// tabIndex=tabIndex==0?1:0;

			},6000);
		}
		setTabInterval();
		window.setTabInterval=setTabInterval;
	}
})();