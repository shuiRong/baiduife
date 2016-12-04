
//存数据
var datas = [];
var highLightDatas = [];

//模拟jQuery
function $(id){
	return document.getElementById(id);
}

//渲染文本内容.  这里用了个参数判断需要渲染的是原始的文本数据还是处理过的高亮的文本数据。 不懂看search();
function renderText(num){
	var dt = datas;
	if(num==1){
		dt = highLightDatas;
	}
	var wrap_div = $('wrap_div');
	var html = '';
	dt.forEach(function(ele){
		var span = '<span>'+ele+'</span>';
		html += span;
	});
	wrap_div.innerHTML = html;
}

//把文本添加进数据
function getIn() {
	var texts = $('textarea').value;
	var textArr = texts.split(/[\s,，、]+/);  //好好学正则，利剑。

	datas = datas.concat(textArr);
	renderText();
}

//查询函数。 对查询到的进行高亮处理，也就是在数据里用带style的em替换掉原来的文本。然后渲染处理后的数据。
function search(){
	if(highLightDatas.length>0){
		highLightDatas =[];
	}
	var searchText = $('text').value;
	var re = new RegExp(searchText);
	datas.forEach(function(ele){
		if(re.test(ele)){
			ele = ele.replace(re,'<em style="background:red;">'+searchText+'</em>');
		}
		highLightDatas.push(ele);
	})
	renderText(1);
}

//设置监听事件
window.onload = function(){
	$('in').onclick = getIn;
	$('search').onclick = search;
}