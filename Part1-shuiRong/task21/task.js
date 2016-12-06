


var tagText = [];//存储tag文本内容 最多存10个
var habbyText = [];//存储爱好。


//渲染技能标签；
function renderTag(datas,id){
	var div = $(id);
	var html = '';
	datas.forEach(function(ele){
		if(id==='habby'){
			var span = '<span>'+ele+'</span>';
		}else{
			var span = '<span onmouseover="mouseOver(this);" onmouseout="mouseOut(this);" onclick="deleteTag(this);" id="'+ele+'">'+ele+'</span>';	
		}
		html+=span;
	});
	div.innerHTML = html;
}

function mouseOver(which){
	$(which.id).style.color = "red";
	$(which.id).innerHTML = "Delete " +which.id;
}

function mouseOut(which){
	$(which.id).style.color = 'black';
	$(which.id).innerHTML = which.id;
}

function deleteTag(which){
	var tempArr = [];
	tagText.forEach(function(ele){
		if(which.id!==ele){
			tempArr.push(ele);
		}
	});
	tagText = tempArr;
	renderTag(tagText,'tag_div');
}

//注意那三个键盘监听事件的区别。
function keyUp(e){
	var keyCo = 0; e = e||event;   //兼容ie 和火狐及其同内核其他浏览器
	keyCo = e.which || e.keyCode;
	if(keyCo === 32 || keyCo === 188 ||keyCo === 13){
		var text = this.value;
		text = text.replace(/^[\s,]*|[\s,]*$/g,''); //消去首尾空格和逗号
		if(text&&tagText.indexOf(text)==-1){//如果text不为空且不重复
			tagText.push(text);  //如果消去后还有内容的话，存储起来
			if(tagText.length>=11){
				tagText.shift();//如果10个以上，就删去第一次。
			}
		}
		$('tag_input').value = '';		
	}
	renderTag(tagText,'tag_div');
}

//添加爱好
function addHabby(){
	var texts = $('textarea').value;
	texts = texts.replace(/^[\s,]*|[\s,]*$/g,'');//首先做一个首尾去空格或逗号的处理
	texts = texts.split(/[,，\s、]+/);//做分割处理。["what", "the", "fuck", "add", "zxc"]
	habbyText = habbyText.concat(texts);
	
	var tempArr  = [habbyText[0]];  //暂时数组，对habbyText去重时用
	habbyText.forEach(function(ele){
		if(tempArr.indexOf(ele)==-1){
			tempArr.push(ele);
		}
	});
	habbyText = tempArr;
	if(habbyText.length>=11){
		habbyText.shift();
	}
	renderTag(habbyText,'habby');
}

function $(id){
	return document.getElementById(id);
}

window.onload = function(){
	$('tag_input').onkeyup = keyUp;
	$('addButton').onclick = addHabby;
}