/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var aqi_city_input = document.getElementById('aqi-city-input').value;
	var aqi_value_input = document.getElementById('aqi-value-input').value;

	if(aqi_city_input.match(/[^\u4e 00-\u9fa5A-Za-z]/g)){
		alert('请输入汉字或字母');
	}
	if(aqi_value_input.match(/\D/g)){
		alert('请输入整数');
	}
	aqiData[aqi_city_input] = aqi_value_input;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	displayTitle();

	var aqi_table = document.getElementById('aqi-table');
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	var keys = Object.keys(aqiData);
	//每次添加城市完，就把table的所有子节点删除，然后重新把aqiData里的数据展示出来。
	while(aqi_table.hasChildNodes()){  
		aqi_table.removeChild(aqi_table.firstChild);
	}

	keys.forEach(function(element){
		td.innerHTML = element;
		tr.appendChild(td);
		td = td.cloneNode();
		td.innerHTML = aqiData[element];
		tr.appendChild(td);
		td = td.cloneNode();

		var del_btn = '<button onclick="delBtnHandle(this)" id="' + element+ '">删除</buton>';
		td.innerHTML = del_btn;
		tr.appendChild(td);
		aqi_table.appendChild(tr);
		td = td.cloneNode();
		tr = tr.cloneNode();
	});
}

function displayTitle(){     // 展示最上面的那三个：城市 空气质量 操作
	var aqi_table = document.getElementById('aqi-table');
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.innerHTML = '城市';
	tr.appendChild(td);
	td = td.cloneNode(true);
	td.innerHTML = '空气质量';
	tr.appendChild(td);
	td = td.cloneNode(true);
	td.innerHTML = '操作';
	tr.appendChild(td);

	aqi_table.appendChild(tr);
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	console.log(Object.keys(aqiData));
	if(Object.keys(aqiData).length!==0){
		renderAqiList();	
	}
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(which) {
 	 // do sth.
 	var id = which.getAttribute('id');
 	delete aqiData[id];
  	renderAqiList();
}

function init() {
	var add_btn = document.getElementById('add-btn');
	add_btn.onclick = addBtnHandle;
}

init();
