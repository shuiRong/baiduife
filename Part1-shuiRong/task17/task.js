/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
//上面的那个数据作为元数据保留。后面程序所需数据从这里获取。
var copy_aqiSourceData = {
    "北京": aqiSourceData['北京'],
    "上海": aqiSourceData['上海'],
     "广州": aqiSourceData['广州'],
     "深圳": aqiSourceData['深圳'],
     "成都": aqiSourceData['成都'],
     "西安": aqiSourceData['西安'],
     "福州": aqiSourceData['福州'],
    "厦门": aqiSourceData['厦门'],
    "沈阳": aqiSourceData['沈阳']
}
// 用于渲染图表的数据
var chartData = {
    'width':'0.5%',
    'leftDistance':0.5   // 0.5是 0.5%的意思
};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity:'北京',
  nowGraTime: "day"
}
/**
 * 渲染图表
 */
function renderChart(leftNum) {
    var cityObj = copy_aqiSourceData[pageState.nowSelectCity]; // { "2016-01-01": 10, "2016-01-02": 10}
    var timeList = Object.keys(cityObj);
    var aqi_chart_wrap = document.getElementsByClassName('aqi-chart-wrap')[0];
    var tempArr = []; //暂存子元素的html
    //console.log(timeList);
    var left = chartData.leftDistance;
    timeList.forEach(function(ele){
        left += leftNum; //左右两个柱子的间隔，int型。周和日和月的这个参数不一样
        var span = '<span onmouseover="showTitle(this)" onmouseout="hiddeTitle(this)" class="aqi-span" style="left:'+left+'%;display:inline-block;'+
        'width:'+chartData.width+';height:'+cityObj[ele]+'px;background-color:'+randomColor()+';"><div class="title" >' +getTitle(cityObj[ele],ele)+'</div></span>';
        tempArr.push(span);
    });
    var temp = tempArr.join('');
    aqi_chart_wrap.innerHTML = temp; 
}

function getTitle(AQI,ele){
    var text;
    if(ele.match(/[2016]/g)){
        text = ele;
    }else{
        text ='2016年：' + ele;
    }
    var para = '<span style="display:inline-block;line-height:1.5rem;">'+text+'[AQI]：'+AQI+'</span>';
    return para;
}
//这两个函数，实现了类似css hover的功能。因为我用css不知道怎么实现。嘻嘻
function showTitle(which){
    var title = which.firstChild;
    title.style.display = 'inline-block';
}
function hiddeTitle(which){
    var title = which.firstChild;
    title.style.display = 'none';   
}

//给柱状体增色
function randomColor(){
    var colors = ['#99b4ce','#c1b9c2','#4e4a67','#393f65','#edae9e','#5a4563','#16324a','#24385e','#bec3cb'];
    return colors[Math.floor(Math.random()*9)];
}

//监听下拉菜单的城市状态
function initCity(city){
    pageState.nowSelectCity = city;
    // console.log(copy_aqiSourceData[pageState.nowSelectCity]);
    if(pageState.nowGraTime==='day'){
        changeData('day');
        renderChart(1);
    }else if(pageState.nowGraTime==='week'){
        changeData('week');
        renderChart(6);
    }else {
        changeData('month');
        renderChart(20);
    }
}

//根据日期信息，把copy_aqiSourceData里的数据换成对应的，方便renderChart直接调用。
function changeData(arrguments){
    var cityObj = aqiSourceData[pageState.nowSelectCity];  
    var cityObjKeys = Object.keys(cityObj);
    var temp_cityObj = {};
    if(arrguments === 'week'){
        var weeks = Math.floor(Object.keys(cityObj).length/7);

        for(var i=0; i<weeks; i++){
            var leftIndex = i*7 ;
            var rightIndex = (i+1)*7-1;
            var average =0;//存每周的平均数
            for(leftIndex;leftIndex<=rightIndex;leftIndex++){
                if(cityObjKeys[leftIndex]){
                    average+=cityObj[cityObjKeys[leftIndex]];    
                }else {
                    average+=0;
                }
            }
            average = average/7;
            var temp = '第'+(i+1)+'周';
            temp_cityObj[temp] = Math.floor(average);
        }
        copy_aqiSourceData[pageState.nowSelectCity] = temp_cityObj;
        // console.log(copy_aqiSourceData[pageState.nowSelectCity]);
    }else if(arrguments ==='month'){
        temp_cityObj={};
        
            var leftIndex = 0;
            var rightIndex = 30;
            var average = 0;
            for(leftIndex;leftIndex<=rightIndex;leftIndex++){
                average +=cityObj[cityObjKeys[leftIndex]];
            }
            average = Math.floor(average/31);
            var temp = '第1月';
            temp_cityObj[temp] = Math.floor(average);

            leftIndex = 31;
            rightIndex = 59;
            for(leftIndex;leftIndex<=rightIndex;leftIndex++){
                average +=cityObj[cityObjKeys[leftIndex]];
            }
            average = Math.floor(average/29);
            var temp = '第2月';
            temp_cityObj[temp] = Math.floor(average);

            leftIndex = 60;
            rightIndex = 90;
            for(leftIndex;leftIndex<=rightIndex;leftIndex++){
                average +=cityObj[cityObjKeys[leftIndex]];
            }
            average = Math.floor(average/30);
            var temp = '第3月';
            temp_cityObj[temp] = Math.floor(average);
            copy_aqiSourceData[pageState.nowSelectCity] = temp_cityObj;
        // console.log(copy_aqiSourceData[pageState.nowSelectCity]);
    }else if(arrguments ==='day'){
        copy_aqiSourceData = {
            "北京": aqiSourceData['北京'],
            "上海": aqiSourceData['上海'],
            "广州": aqiSourceData['广州'],
            "深圳": aqiSourceData['深圳'],
            "成都": aqiSourceData['成都'],
            "西安": aqiSourceData['西安'],
            "福州": aqiSourceData['福州'],
            "厦门": aqiSourceData['厦门'],
            "沈阳": aqiSourceData['沈阳']
        }
    }else{
        console.log('changeData 出错，参数问题');
    }
}


//监听单选框的时期按钮变化
function initTime(time){
    if(time==='week'){
        pageState.nowGraTime = 'week';
        chartData.width = '3%';
        chartData.leftDistance = 5;

        changeData('week');
        renderChart(6);
    }else if(time === 'month'){
        pageState.nowGraTime = 'month';
        chartData.width = '15%';
        chartData.leftDistance = 0;
      
        changeData('month');
        renderChart(20);
    }else if(time ==='day'){
        pageState.nowGraTime = 'day';
        chartData.width = '0.5%';
        chartData.leftDistance = 0.5;
       
        changeData('day');
        renderChart(1);
    }
    else{
        console.log('日期变换时出错');
    }
    // console.log(pageState.nowGraTime);
}
/**
 * 初始化函数
 */
function init(time) {
    renderChart(1);
}

init();
