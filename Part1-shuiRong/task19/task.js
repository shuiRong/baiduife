/*
	可视化不咋地，先这样吧。以后回头再做。
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
	if(num<10 ||num>100){
		alert('请输入10-100之间的数字。');
		return;
	}
	if(whichButton==0){
		if(datas.length>=60){
			alert('最多只能添加60个数字。');
			return;
		}
		var newDatas = [num];
		datas = newDatas.concat(datas);
	}else if(whichButton==1){
		if(datas.length>=60){
			alert('最多只能添加60个数字。');
			return;
		}
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

var queueDiv = $('queue');
//从data里获取数据，然后渲染出来。
function renderNum(){
	var html = [];
	queueDiv.innerHTML = '';
	queueDiv.style.display = 'none';
	datas.forEach(function(ele,index){
		/*var span = document.createElement('span');
		span.setAttribute('id',index);
		span.setAttribute('style','width:1rem;height:'+ele+'px;left:'+index*1.3+'rem;');
		queueDiv.appendChild(span);*/
		var span = '<span id="'+index +'" style="display:inline-block;width:1rem; height:'+ele+'px;left:'+(index*1.3)+'rem;"></span>'
		html.push(span);
	});
	queueDiv.innerHTML = html.join('');
	queueDiv.style.display='';

}

//给队列中的每个数字添加上 点击使之删除 的监听时间
function addListener(){
	datas.forEach(function(ele,index){
		$(index).onclick = function(){
			changeData(4,index);
		}
	})

}

//冒泡排序并 实现可视化
function maopao(){

	setTime = setInterval(run,1000);
	function run(){
			if(N!==0){	
			for(var i=0; i<N; i++){
				if(datas[i]>datas[i+1]){
					var temp = datas[i];
					datas[i] = datas[i+1];
					datas[i+1] = temp;
					$(i).style.height = datas[i] + 'px';
					$(i+1).style.height = datas[i+1] + 'px';	
				}
			}
			N--;
			maopao();
		}else{
			clearInterval(setTime);
		}
	}
}

//给4个按钮添加监听事件。
function clickListener(){
	$("left_in").onclick = function(){changeData(0)};  //0 代表左侧入。依次
	$('right_in').onclick = function(){changeData(1)};
	$('left_out').onclick = function(){changeData(2)};
	$('right_out').onclick = function(){changeData(3)};
	$('randomData').onclick = function(){
		for(var i=0; i<60;i++){
			datas[i]=Math.floor(Math.random()*101);
		}
		renderNum();
	}
	$('maopao').onclick = function(){
		N = datas.length-1;
		maopao();
	}
}

window.onload = function(){
	clickListener();
}
