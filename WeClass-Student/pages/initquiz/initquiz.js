

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '测试尚未开始',
    hiddenFlag : true

  },
  //事件处理函数
  bindViewTap: function() {
    if(!that.data.hiddenFlag)
    wx.navigateTo({
      url: '../quiz/quiz'
    })
  },
  onLoad: function () {
    that = this;
    requestFlag(that);
  },
    onHide:function(){
      
  },
  highlightIcon:function(){

  }
})

var that;
function requestFlag(that){
wx.request({
  url: 'https://104.194.73.140/postdata',
  method: 'GET',
  success: function(res){
    console.log(res.data)
    if(res.data!=null){
      if(res.data == '1'){
      that.setData({
        hiddenFlag : false,
        motto : '测试开始'
      })
    }}
    return;
  },
  fail: function() {
    return;
  },
  complete: function() {
    
  }
})



}

