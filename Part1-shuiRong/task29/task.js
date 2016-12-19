window.onload=function(){
	$('btnInfo').onclick = judge;
}

function judge(){
	var str = $('inputInfo').value;
	var strLength = countLength(str);
	var info = $('info');
	if(strLength>=4 && strLength<=16){
		info.setAttribute('class','correct');
		$('inputInfo').setAttribute('style','border-color:lightgreen');
		info.innerText = '验证正确';
	}else{
		info.setAttribute('class','wrong');
		$('inputInfo').setAttribute('style','border-color:red');
		info.innerText = '验证失败';
	}
}
function $(id){
	return document.getElementById(id);
}

function countLength(str){
	var strArr = str.split('');
	var length = 0;
	strArr.forEach(function(i){
		var charCode = i.charCodeAt(0);
		if(charCode>=0 && charCode<=128){
			length += 1;
		}else{
			length += 2;
		}
	});
	return length;
}