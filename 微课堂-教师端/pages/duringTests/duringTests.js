var questionData;
var app = getApp()
Page({
  data:{
    showSecond : show,
    second : 300,
    questionData:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    that = this;
  },

clickTimer:function(e){
      wx.showModal({
      title: '提示',
      content: '发布试题',
      success: function(res) 
      {
          if (res.confirm) 
          {
            time = setTimeout(function(){
              that.setData({
              second: that.data.second - 1
              });
              countdown(that);
              }
            ,1000);
            requestData(that)
          }
      }
})
},



quizOver:function(){
    wx.showModal({
      title: '提示',
      content: '答题结束',
      success: function(res) 
      {
          if (res.confirm) 
          {
            wx.navigateTo({
              url: '../overview/overview'
            })
          }
      }
})
}
})


var time;
var that;
var show='5:00';
var currentQuestionNo = 1;


function countdown(that) {
 var currentPage = getCurrentPages();
 var second = that.data.second
 if (second == 0) {
  console.log("Time Out...");
  that.setData({
   second: "Over"
  });
  if(currentPage.length==2){
        that.quizOver();
  }else
    {
        clearTimeout(time)
    }    
    return;
 }
 time = setTimeout(function(){ 
  that.setData({
   second: second - 1,
   showSecond : show
  });
  show = FormatTime(that.data.second)
  countdown(that);
 }
 ,1000)
}


function requestData(that) {
    wx.request({
        url: app.globalData.currentURL+'problem/'+currentQuestionNo+'/',
        header: {
            "Content-Type": "application/json"
        },

        success: function (res) {
        if (res.statusCode == 404) 
            {   
                return;
            }
            else{
        console.log(res.data)
        console.log(app.globalData.currentURL+'problem/'+currentQuestionNo+'/')
              requestData(that);
              currentQuestionNo++;
            }
        },
        fail:function(){
        }
    });
}

function FormatTime(second){
  var min = parseInt(second/60); 
  var sec = parseInt(second%60);
  if(sec<10){
    return min+':'+'0'+sec
  }else{
  return min+':'+sec
  }
}