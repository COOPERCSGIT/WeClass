Page({
  data:{
    testDate : new Date().getDate,
    correctAnswer:[],
    answerD : [
      [71.16,14.42,7.21,7.21],
      [0,0,100,0],
      [0,0,100,0]
    ],//28.84
    aa : [1,2,3],
    length : 0,
    bili : [
      [300,60,30,30],//420 300/420 71.4 
      [0,0,100,0],
      [0,0,100,0]
    ]
  },
  onLoad:function(){
  that = this
  requestData(that)
    for(var num=1;num<=3;num++){    
  var context = wx.createContext('canvas'+num.toString());
// 画饼图
//  数据源
  var array = this.data.bili[num-1];
  var colors = ["#364F6B", "#3FC1C9", "#FCE38A", "#FC5185"];
  var total = 0;
//  计算问题
  for (var index = 0; index < 3; index++) {
    total += array[index];
  }
//  定义圆心坐标
  var point = {x: 100, y: 100};
//  定义半径大小
  var radius = 60;
 
/*  循环遍历所有的pie */
  for (var i = 0; i < 3; i++) {
    context.beginPath();
//    起点弧度
    var start = 0;
    if (i > 0) {
//      计算开始弧度是前几项的总和，即从之前的基础的上继续作画
      for (var j = 0; j < i; j++) {
        start += array[j] / total * 2 * Math.PI; 
      }
    }
//   1.先做第一个pie
//    2.画一条弧，并填充成三角饼pie，前2个参数确定圆心，第3参数为半径，第4参数起始旋转弧度数，第5参数本次扫过的弧度数，第6个参数为时针方向-false为顺时针
   context.arc(point.x, point.y, radius, start, array[i] / total * 2 * Math.PI, false);
//   3.连线回圆心
   context.lineTo(point.x, point.y);
//   4.填充样式
   context.setFillStyle(colors[i]);
//   5.填充动作
   context.fill();
   context.closePath();
  }
  wx.drawCanvas({
    canvasId: 'canvas'+num.toString(),
    actions: context.getActions()
  });
 }
  },




onShow:function(){
    
},


  onReady:function(){

}

})



var that;
var answerData1=[];
var answerData2=[];
var answerData3=[];
var answer = [answerData1,answerData2,answerData3]
var rightA = [];
var dataLength = 0;


function requestData(that){
wx.request({
  url: util.BASE_URL+'test/1/result/',
  data: {},
  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  // header: {}, // 设置请求的 header
  success: function(res){
    var ex = /proportion/
    for(var item in res.data){
      dataLength++;
    }
      rightA.push(res.data.problem1.correct_answer);
      rightA.push(res.data.problem2.correct_answer)
      rightA.push(res.data.problem3.correct_answer)

      that.setData({
        correctAnswer : rightA,
        length : dataLength
      })

    for(var item in res.data.problem1){
      if(ex.test(item)){
      answerData1.push(tranNum(res.data.problem1[item]));
    }}
    for(var item in res.data.problem2){
        if(ex.test(item)){
      answerData2.push(tranNum(res.data.problem2[item]));
    }}
    for(var item in res.data.problem3){
     if(ex.test(item)){
      answerData3.push(tranNum(res.data.problem3[item]));
    }}
    // that.setData({
    //   answerD : answer
    // })
  }
})
}

function tranNum(numString){
  return parseFloat(numString.replace(/%/, ""));
}


var util = require('../../utils/util.js')
