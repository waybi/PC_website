var idx = 0, distances = 0;

var getE=function(id,all){
	return all?document.querySelectorAll(id):document.querySelector(id);
}
var pagesbox=getE('#banner-list'),
	wrap=getE('.block-banner'),
	dotted=getE('#dotted');
	
var isTouch=('ontouchstart' in window);

var _event={
	'start':isTouch?"touchstart":"mousedown",
	'move':isTouch?"touchmove":"mousemove",
	'end':isTouch?"touchend":"mouseup"
}

var dragData={
	point:[],
	time:[],
	index:0,
	distance:0,
	_distance:0,
	_vendor:(/webkit/i).test(navigator.appVersion) ? 'webkit' :
		(/firefox/i).test(navigator.userAgent) ? 'Moz' :
		(/trident/i).test(navigator.userAgent) ? 'ms' :
		'opera' in window ? 'O' : '',
	duration:function(t){
		pagesbox.style[this._vendor+'TransitionDuration']=t+"s";
	},
	translate:function(x){
		pagesbox.style[this._vendor+'Transform']="translate3d("+x+"px,0,0)";
	},
	getRemain:function(x,t){ return (x/t)*0.13; },
	reset:function(){
		this['extent_wrap']=wrap['offsetWidth'];
		this['extent_list']=pagesbox['offsetWidth'];
	},
	setCur:function(){
		var item=dotted.querySelectorAll('i');
		if (item.length<=0) {
			var html=''
			for(var i=0,j=pagesbox.querySelectorAll('li').length;i<j;i++){
				html+='<i></i>'
			}
			dotted.innerHTML=html;
			item=dotted.querySelectorAll('i');
		};
		for (var i = 0; i < item.length; i++) {
			item[i].className=i==Math.abs(this['index'])?'current':'';
		};
	},
	starting:false
}
var initHeight=function(){
	// wrap.style['height']=pagesbox.style['height']=window.innerHeight;
	var rect=wrap.getBoundingClientRect();
	var w=rect.width;
	var pages=pagesbox.querySelectorAll('li');
	for (var i = 0; i < pages.length; i++) {
		pages[i].style['width']=+'px';
	};
	pagesbox.style.width=pages.length*w+'px';
}

pagesbox.addEventListener(_event['start'],function(e){
	dragData['starting']=true;
	var _e = isTouch ? e.touches[0] : e;
	dragData['point']=[_e["pageX"]];
	dragData['pointY']=[_e["pageY"]];
	dragData['time']=[new Date()];
	dragData['_distance']=dragData['distance'];
	dragData['reset']();
	dragData['duration'](0);
},false);

document.documentElement.addEventListener(_event['move'],function(e){
	if (dragData['starting']) {
		var _e = isTouch ? e.touches[0] : e;
			dragData['point'][dragData['point'].length]=_e["pageX"];
			dragData['pointY'][dragData['pointY'].length]=_e["pageY"];

		if (Math.abs(dragData["pointY"][1]-dragData['pointY'][0])<=Math.abs(dragData["point"][1]-dragData['point'][0])) {
			dragData['time'][dragData['time'].length]=new Date();
			dragData['distance']=dragData['_distance']+dragData['point'][dragData['point'].length-1]-dragData['point'][0];
			dragData['translate'](dragData['distance']);
			e.preventDefault();
			e.stopPropagation();
			return false;
		}else{
			dragData['starting']=false;
		};
	};
},false);

document.documentElement.addEventListener(_event['end'],function(){
	if (dragData['starting']&&dragData['point'].length>2) {
		var remain=dragData['getRemain'](dragData['point'][dragData['point'].length-1]-dragData['point'][dragData['point'].length-2],(dragData['time'][dragData['time'].length-1]-dragData['time'][dragData['time'].length-2])/1000);
		dragData['duration'](0.3);
		if (dragData['distance']+remain>0||dragData['extent_list']<=dragData['extent_wrap']) {
			dragData['index']=0;
			dragData['distance']=0;
		}else if (dragData['extent_list']+dragData['distance']+remain<dragData['extent_wrap']) {
			dragData['index']=Math.round(dragData['extent_list']/dragData['extent_wrap']) -1 ;
			dragData['distance']=dragData['extent_wrap']-dragData['extent_list'];
		}else{
			var _dis=dragData['distance']+remain;
			var index=0;
			if(Math.abs(_dis%dragData['extent_wrap'])>=dragData['extent_wrap']/2){
				index=(Math.round((_dis-_dis%dragData['extent_wrap'])/dragData['extent_wrap'])-1)
			}else{
				index=Math.round((_dis-_dis%dragData['extent_wrap'])/dragData['extent_wrap'])
			}
			dragData['index'] = index;
			dragData['distance']=index*dragData['extent_wrap'];
			
			
		}
		dragData['setCur']();
		dragData['translate'](dragData['distance']);
	}
	dragData['starting']=false;
	
	
},false);

window.addEventListener('resize',function(){
	setTimeout(function(){
		dragData['reset']();
		initHeight();
		_dis=dragData['index']*dragData['extent_wrap'];
		dragData['distance']=_dis;
		dragData['translate'](dragData['distance']);
	},300);
},false);
initHeight();
dragData['setCur']();

/*window.addEventListener('load',function(){
	setTimeout(function(){
		if(!dragData['starting']){
			setInterval(function(){
				dragData['reset']();
				initHeight();
				_dis=-(dragData['index'] + 1  )*dragData['extent_wrap'];
				dragData['distance']=_dis;
				dragData['translate'](dragData['distance']);
			},1000);
		}
	},1000);
});*/
