/*
	模拟队列，一般我们首先想到的用数组实现数据结构。很容易想到，很容易实现。
	链表，另一种数据结构。我用它来实现队列。正好前段时间书上看到了。
	嘿嘿

	整了好久，发现自己对JS的面向对象具体实现还是不熟悉，毕竟是JS本来就没有面向对象这一特性。Java大法好。
*/


/*var queue = {
	item :null,
	first : null,
	last :null,
	num : 0,
	createNew: function(){
		var que = {};
		que.size = function(){
			console.log(num);
		}
		que.enqueue = function(){

		}
	}
}
*/

//存储数据。
var datas = [];

//模仿jQuery
function $(argu){
	return document.getElementById(argu);
}

//改变数组中的值。
function changeData(whichButton,id){
	var num = $('input_num').value;
	if(!num.match(/[0-9]/g)){
		alert('请输入合法数字！');
		return;
	}
	num = parseInt(num); //使 065 变成 65
	if(whichButton==0){
		var newDatas = [num];
		datas = newDatas.concat(datas);
	}else if(whichButton==1){
		datas.push(num);
	}else if(whichButton==2){
		datas.shift();
	}else if(whichButton==3){
		datas.pop();
	}else if(whichButton==4){
		var tempData = [];
		datas.forEach(function(ele,index){
			if(index!==id){
				tempData.push(ele);
			}else{
				alert('将 '+ele+' 从队列中删除');
			}
		})
		datas = tempData;
	}else{
		console.log("数据存入数组里时出错");
	}
	renderNum(num);
	addListener();
}

//从data里获取数据，然后渲染出来。
function renderNum(){
	var queueDiv = $('queue');
	var html = [];
	datas.forEach(function(ele,index){
		var span = '<span id="'+index +'" class="temp">'+ele+'</span>'
		html.push(span);
	});
	queueDiv.innerHTML = html.join('');
}

//给队列中的每个数字添加上 点击使之删除 的监听时间
function addListener(){
	datas.forEach(function(ele,index){
		$(index).onclick = function(){
			changeData(4,index);
		}
	})

}

//给4个按钮添加监听事件。
function clickListener(){
	$("left_in").onclick = function(){changeData(0)};  //0 代表左侧入。依次
	$('right_in').onclick = function(){changeData(1)};
	$('left_out').onclick = function(){changeData(2)};
	$('right_out').onclick = function(){changeData(3)};
}

window.onload = function(){
	clickListener();
}
