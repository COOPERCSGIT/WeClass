// pages/answerPage/answerPage.js
var app = getApp();
Page({
  data:{
    question:[],
    answer:[],
    desc:[]
  },
  onLoad:function(options){
    requestData(this);
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})

var time;
var that;
var currentQuestionNo = 1;
var Ques=[];
var Answ=[];
var des=[];

function requestData(that) {
  wx.request({
    url: app.globalData.currentURL + 'problem/' + currentQuestionNo + '/',
    header: {
      "Content-Type": "application/json"
    },
   data:{
    session_id : app.globalData.UserID
     },
    success: function (res) {
      requestDesc(that);
      console.log(currentQuestionNo);
      if (res.statusCode == 404) {
        console.log('404 not found')
        that.setData({
          question:Ques,
          answer:Answ
        })
        return;
      }
      else {
        console.log(res.data)
        console.log(app.globalData.currentURL + 'problem/' + currentQuestionNo + '/')
        currentQuestionNo++;
        Ques.push(res.data.problem.problem_text)
        Answ.push(res.data.problem.answer)
        requestData(that);
      } 
    },
    fail: function () {
    }
  });
}

function requestDesc(that){
    wx.request({
    url: app.globalData.currentURL+'answer/',
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      that.setData({
        desc : res.data
      })
      console.log(res.data);
    },
    fail: function () {
    }
  });

}
