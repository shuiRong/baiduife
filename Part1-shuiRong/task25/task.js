/*
	刚看的时候没思路，干别的事了，回来又想了想。有了：
	用JSON格式对象存节点数据。然后每次渲染就从这里取数据。之所以想到JSON数据，是因为对象及其属性本身就好像一个节点树。
	至于展开和关闭，在CSS里写好类，然后添加删除类名就好了。
	图标什么的简单就不说了。
*/

// 添加节点功能没有实现 有些坑，不要参考我的代码了。


var datas = {
			'爱好':{
					'听歌':{'Lana Del Rey':null,'Taylor Swift':null,'Lorde':null,'Rachael Taylor':null,'双笙':null},
					'玩游戏':{'骑马与砍杀':null,'真三国无双6':null,'上古卷轴5':null,'饥荒':null,'问道':null},
					'写代码':{'JavaScript':null,'HTML':null,'CSS':null,'Python':null,'Java':null,'React Native':null},
					'看书':{
							'技术类':{'算法':null,'JavaScript 高级程序设计':null},
							'文学类':{'卫斯理系列':null,'眼睛':null,'支离人':null}
							},
					'诗':{'苟利国家生死以':null},
					}
			};

window.onload = function(){
	//搜索功能实现了一半，也不想实现了。 思维有些混乱。这个先跳过
	/*$('searchInfo').onclick = function(){
		var searchInfo = $('inputInfo').value;
		if(searchInfo){
			dfs(searchInfo);
			//....something else
		}else{
			alert('请输入有效搜索信息');
			return;
		}
	}*/
	renderJSON();
	
	// nodeAdded();

}

//照例先来这个。
function $(id){
	return document.getElementById(id);
}

//根据datas里的内容渲染，所以所有的动作只需要改变datas的内容就够了。
function renderJSON(){
	var container = $('container');
	container.innerHTML = ''; //每次调用时重置下
	var rootObj = datas['爱好'];  //获取根对象
	
	//生成根节点div
	var rootNode = document.createElement('div');
	rootNode.setAttribute('class','child show');
	rootNode.setAttribute('status','unfold');
	rootNode.setAttribute('id','爱好');
	var arrow = '<span class="arrow-down"></span>';
	var addBut = '<span class="addBut" style="visibility:hidden"></span>';
	rootNode.innerHTML = arrow + Object.keys(datas)[0] +addBut;    //arrow + '爱好' + addBut;
	container.appendChild(rootNode);

	$(Object.keys(datas)[0]).addEventListener('click',clicked,false); 
	var childrenKey = Object.keys(rootObj);
	
	if(childrenKey){
		bianLi(rootObj,$(Object.keys(datas)[0]),childrenKey);
	}
}	

//遍历datas['爱好'],然后渲染
function bianLi(rootObj,father,childrenKey){
	if(childrenKey){
		childrenKey.forEach(function(ele){
			var child = document.createElement('div');
			child.setAttribute('class','child show');
			child.setAttribute('status','unfold');    //用这个类记录 展开折叠
			child.setAttribute('id',ele);   //这么设置的话，有个bug就是如果有重复内容的话会出问题
			var arrow = '<span class="arrow-down" ></span>';
			var addBut = '<span class="addBut"></span>';
			var delBut = '<span class="delBut" onclick="delNode(datas.'+'爱好'+',this.parentNode.id);"></span>';
			child.innerHTML = arrow + ele + addBut +delBut;
			father.appendChild(child);

			if(rootObj[ele]){  //如果不是null
				var childrenKey = Object.keys(rootObj[ele]);
			}
			if(childrenKey){
				bianLi(rootObj[ele],$(ele),childrenKey);
			}
		})
	}
}

//监听每个箭头的点击事件，折叠/展开
function clicked(event){
	var target = event.target;
	var id;  //div 的id
	Boolean(target.id) ?  id = target.id :  id = target.parentNode.id;
	if($(id)){
		var children =  $(id).children;  //子元素数组，第一个是箭头，不用。
		var N  = $(id).childElementCount;
	}
	if($(id).getAttribute('status') === 'unfold'){
		//子元素全部隐藏，本身status改变
		for(var i=3;i<=N-1; i++){
			children[i].setAttribute('class','child hidden');
		}
		//然后把箭头图片换一下；
		children[0].setAttribute('class','arrow-right');
		$(id).setAttribute('status','fold');
		

	}else if($(id).getAttribute('status') === 'fold'){
		//孩子一代元素展开，本身status改变
		for(var i=3;i<=N-1; i++){
		 	children[i].setAttribute('class','child show');
		}
		children[0].setAttribute('class','arrow-down');
		$(id).setAttribute('status','unfold');
	}
}

//从datas里删除当前节点  递归查询datas
function delNode(obj,id,text){     //如果text不为null,那么这就是添加节点。反之为删除节点。
	if(obj){
		var keys = Object.keys(obj);
		
		if(keys.indexOf(id)>=0){
			if(text){ //说明是添加节点的操作
				if(obj[id]==null){
					console.log(obj[id]);
					obj[id] = {text:null};   //直接对象赋值
					console.log(obj[id]);
				}else{
					console.log(obj[id]);
					obj[id][text] = null;   //把属性添加进去，而不是对象
					console.log(obj[id]);
				}
				renderJSON();
				return; 
			}
			delete obj[id];
			renderJSON();
		}else{
			keys.forEach(function(ele){
				delNode(obj[ele],id,text);
			});
		}
	}	
}

//遍历节点树然后匹配到的信息高亮显示出来。
/*function dfs(text){
	$(text).style.background = 'green';
	var children = $(text).children;
	if(children.length>3){
		for(var i=3; i<children.length; i++){
			children[i].style.background = 'white';
		}
	}
	console.log(children);
}

*/


//添加节点的代码 有bug没解决。 所以这个功能先不实现了。
/*function nodeAdded(){
	var root = $('爱好');
	root.addEventListener('click',addNode,false);
}

function addNode(event){
	var text = prompt('请输入要搜索的信息');
	if(!text){
		alert('请输入有效信息');
		return;
	}
	// text = {text:null};
	var target = event.target;
	var divId = target.parentNode.id;
	console.log(divId);
	delNode(datas['爱好'],divId,text);
}*/