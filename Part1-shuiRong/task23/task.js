var list = []; //存储有序的节点对象
var setTime = null;
var nodeValues = [];  //存每个节点的文本节点
var curNode = null; //当前所点击的节点。

window.onload = function(){
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
}

function $(id){
	return document.getElementById(id);
}

function clicked(which){
	which.style.background = 'green';
	curNode = which;
	console.log(which);
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
	nodeValues =[];
	clearInterval(setTime);
	var divs = document.getElementsByTagName('div');
	for(var i=0; i<divs.length; i++){
		divs[i].style.background = 'white';
	}
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

