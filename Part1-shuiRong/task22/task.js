/*
	了解了数据结构中的二叉树是怎么一回事了。
*/

var list = [];//存储节点对象，有序。
setTime = null;  //不写这个的话，后面重置时会有setTime没有定义的问题。

window.onload = function(){
	var root = document.getElementById('root');
	var buttons = document.getElementsByTagName('button');
	buttons[0].onclick = function(){
		reset();
		preOrder(root);
		changeColor();
	}
	buttons[1].onclick = function(){
		reset();
		midOrder(root);
		changeColor();	
	}
	buttons[2].onclick = function(){
		reset();
		aftOrder(root);
		changeColor();
	}
}

//前序遍历整个二叉树，然后按照遍历顺序存到数组里； 根-左-右
function preOrder(node){
	if(node){//如果node不为null
		list.push(node);  //根
		preOrder(node.firstElementChild); //左
		preOrder(node.lastElementChild);  //右
	}
}

//中序遍历 左-根-右
function midOrder(node){
	if(node){
		midOrder(node.firstElementChild);  //左
		list.push(node); //根
		midOrder(node.lastElementChild); //右
	}
}

//后序遍历 左-右-根
function aftOrder(node){
	if(node){	
		aftOrder(node.firstElementChild);  //左
		aftOrder(node.lastElementChild); //右
		list.push(node); //根
	}
}

function changeColor(){
	var i = 0;
	list[i].style.background = 'pink';
	setTime = setInterval(function(){
		i++;
		if(i<list.length){
			list[i].style.background = 'pink';
			list[i-1].style.background = 'white';
		}else{
			clearInterval(setTime);
			list[i-1].style.background = 'white';
		}
	},700);
}

//每次遍历前重置相关数据
function reset(){
	list = [];
	clearInterval(setTime);
	var divs = document.getElementsByTagName('div');
	for(var i=0;i<divs.length; i++){
		divs[i].style.background = 'white';
	}

}