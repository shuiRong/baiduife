/*
	2016年12月8日18:05:27
	
	学到了新的知识：事件冒泡、事件捕获究竟是什么玩意儿。为了实现效果的两种方法：1.阻止事件冒泡（event.stopPropagation）
	2.不阻止事件冒泡行为，而是通过event.target判断。也了解了event.currentTarget的用法，虽然没用上...
	这道题，我用的是方法2.

	感觉有点臃肿了....
*/

ids = [];
var list = []; //存储有序的节点对象
var setTime = null;
var nodeValues = [];  //存每个节点的文本节点
var curNode = null; //当前所点击的元素。

window.onload = function(){   //绑定各种监听事件
	var root = $('root');
	$('dfs').onclick = function(){
		reset();
		dfs(root);
		changeColor();
	}

	$('bfs').onclick = function(){
		reset();
		bfs(root);
		changeColor();
	}
	$('dfsSearch').onclick = function(){
		reset();
		dfs(root);//先生成节点数据，然后根据这个生成文本节点数据。
		nodeValuesBuilt();
		var searchText = $('input').value;
		if(searchText){
			changeColor(searchText);
		}else{
			alert('请输入有效的搜索信息');
		}
	}
	$('bfsSearch').onclick = function(){
		reset();
		bfs(root);  //先生成节点数据，然后根据这个生成文本节点数据。
		nodeValuesBuilt();
		var searchText = $('input').value;
		if(searchText){
			changeColor(searchText);
		}else{
			alert('请输入有效的搜索信息');
		}
	}

	root.addEventListener('click',clicked,false);  //false是指只能用冒泡方法

	$('delCurNode').onclick = function(){
		delCurNode();
	}

	$('addCurNode').onclick = function(){
		addCurNode();
	}

}

function $(id){
	return document.getElementById(id);
}

//补充ids的元素；
function resetIds(){
	list = [];
	ids= [];
	dfs($('root'));
	for(var i=0; i<list.length; i++){
		ids.push(list[i].id);
	}
}

//为每个div添加点击事件，不包括后来人为添加的div。
function clicked(event){
	resetIds();
	var target = event.target;
	switch(target.id){
		case "root":
			$('root').style.background = 'lightgreen'; resetColor('root');
			break;
		case "child1-1":
			$('child1-1').style.background = 'lightgreen'; resetColor('child1-1');
			break;
		case 'child1-2':
			$('child1-2').style.background = 'lightgreen'; resetColor('child1-2');
			break;
		case 'child1-3':
			$('child1-3').style.background = 'lightgreen'; resetColor('child1-3');
			break;
		case 'child2-1':
			$('child2-1').style.background = 'lightgreen'; resetColor('child2-1');
			break;
		case 'child2-2':
			$('child2-2').style.background = 'lightgreen'; resetColor('child2-2');
			break;
		case 'child2-3':
			$('child2-3').style.background = 'lightgreen'; resetColor('child2-3');
			break;
		case 'child2-4':
			$('child2-4').style.background = 'lightgreen'; resetColor('child2-4');
			break;
		case 'child2-5':
			$('child2-5').style.background = 'lightgreen'; resetColor('child2-5');
			break;
		case 'child2-6':
			$('child2-6').style.background = 'lightgreen'; resetColor('child2-6');
			break;
		case 'child3-1':
			$('child3-1').style.background = 'lightgreen'; resetColor('child3-1');
			break;
		case 'child3-2':
			$('child3-2').style.background = 'lightgreen'; resetColor('child3-2');
			break;
		case 'child3-3':
			$('child3-3').style.background = 'lightgreen'; resetColor('child3-3');
			break;
		case 'child3-4':
			$('child3-4').style.background = 'lightgreen'; resetColor('child3-4');
			break;
		case 'child3-5':
			$('child3-5').style.background = 'lightgreen'; resetColor('child3-5');
			break;
		case 'child3-6':
			$('child3-6').style.background = 'lightgreen'; resetColor('child3-6');
			break;
		case 'child3-7':
			$('child3-7').style.background = 'lightgreen'; resetColor('child3-7');
			break;
		case 'child3-8':
			$('child3-8').style.background = 'lightgreen'; resetColor('child3-8');
			break;
	}
}

//为后来人为添加的div做的clicked函数.
function clicked_two(e){   //e就是event
	if(e.target==e.currentTarget){
		e.target.style.background = 'lightgreen';
		resetColor(e.target.id);
	}
}

//删除当前节点。
function delCurNode(){
	if(curNode){
		curNode.parentNode.removeChild(curNode);
	}else{
		alert('请选择节点;');
	}
}

//在当点节点添加子元素,添加到最后一个
function addCurNode(){
	if(curNode){
		var info = $('addInfo').value;
		info = info.replace(/^\s+|\s+$/g,''); //trim处理
		if(info){
			var div = document.createElement('div');
			div.setAttribute('class','child3');
			div.setAttribute('id',info);
			div.addEventListener('click',clicked_two,false);
			div.innerText = info;
			curNode.appendChild(div);
		}else{
			alert('请输入要添加的信息');
		}
	}else{
		alert('请选择添加到哪一个节点');
	}
}

//深度优先遍历.前中后序遍历都是dfs，我这里就用前序吧：根-左-右
function dfs(node){
	if(node){
		list.push(node);  //根
		var childNum = node.childElementCount;
		if(childNum){    //从左向右
			for(var i=0; i<childNum; i++){
				dfs(node.children[i]);
			}
		}
	}
}


//广度优先遍历。有点像dfs的前序遍历，但其实不是一回事。 也可以说是 根-左-右。但不一样。
function bfs(node){
	var children = [node];   //孩子们
	while(children.length>0){  //如果有孩子
		for(var i=0; i<children.length; i++){
			list.push(children[i]);
		}
		var tempArr = [];  //暂时存孩子 的孩子。
		for(var i=0; i<children.length; i++){   //遍历每一个孩子，看有没有孙子。
			var childs = children[i].childElementCount;  
			if(childs>0){
				for(var h=0; h<childs; h++){
					tempArr.push(children[i].children[h]);
				}
			}
		}
		children = tempArr;  //最后赋给children数组。
	}
}

//通过list生成对应的nodeValue数组。
function nodeValuesBuilt(){
	list.forEach(function(ele){
		var nodeValue = ele.childNodes[0].nodeValue;
		nodeValue  = nodeValue.replace(/^[\s]+|[\s]+$/g,''); //做trim处理。
		nodeValues.push(nodeValue);  
	});
}


//重置各种数据至初始状态。这样就能打断某个行为，另外立刻开始一个。
function reset(){
	list = [];
	ids = [];
	curNode = null;
	nodeValues =[];
	clearInterval(setTime);
	var divs = document.getElementsByTagName('div');
	for(var i=0; i<divs.length; i++){
		divs[i].style.background = 'white';
	}
}

//把除了 id 之外其他的所有元素的背景色变为白色。
function resetColor(id){
	curNode = $(id);//  记录当前点击的元素对象的行为放到这里了。
	resetIds();
	ids.forEach(function(ele){
		if(ele!==id){
			$(ele).style.background = 'white';
		}
	})
}

//根据list中的有序数据改变颜色或者根据用户输入搜索信息改变颜色。
//给封装了下，仅遍历或者遍历搜索信息都能用这一个函数。
function changeColor(arr){
	var i = 0;
	var text = list[i].childNodes[0].nodeValue;
	text = text.replace(/^[\s]+|[\s]+$/g,''); //做trim处理。
	if(arr===text){
		list[i].style.background = 'red';
	}else{
		list[i].style.background = 'pink';	
	}
	setTime = setInterval(function(){
		i++;
		if(i<list.length){
			text = list[i].childNodes[0].nodeValue;
			text = text.replace(/^[\s]+|[\s]+$/g,''); //做trim处理。
			if(arr===text){
				list[i].style.background = 'red';
			}else{
				list[i].style.background = 'pink';
			}
			list[i-1].style.background = 'white';
		}else{
			clearInterval(setTime);
			list[i-1].style.background = 'white';
		}
	},600);
}

