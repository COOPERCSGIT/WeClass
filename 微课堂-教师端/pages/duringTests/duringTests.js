var questionData;
var app = getApp();
var util = require('../../utils/util.js')

Page({
  data: {
    showSecond: show,
    second: 92,
    num: 0,
    question: [],
    answer: [],
    desc: [
    '先建立正方向 如取A-->B的垂线为正方向用高斯定理 容易求出每个平面的电场Ea=σ/ε ,Eb=σ/2ε板间电场E=Ea-Eb=σ/2ε电场力做功W=qE·a=qaσ/2ε',
    'E=kq/r (^2代表平方,^9代表9次方, ^-9代表-9次方)EA=9.0×(10 ^ 9)×(10^-9)/0.1^2=900,VEB=9.0×(10 ^ 9)×(10^-9)/0.2^2=225,VEC=9.0×(10 ^ 9)×(10^-9)/0.3^2=100,VUA=EA×dA-EB×dB=90-45=45,VUC=EC×dC-EB×dB=30-45=-15V',
    '电流流经铁环时分流，从左边大半圈的电流为I/3，右边的为2I/3（可以看成这分成的两段为并联关系），再根据闭合环路定理可知答案：∮B·dl=μ0I/3'
 ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    that = this;
  },

  clickTimer: function (e) {
    wx.showModal({
      title: '提示',
      content: '发布试题',
      success: function (res) {
        if (res.confirm) {
          time = setTimeout(function () {
            that.setData({
              second: that.data.second - 1
            });
            countdown(that);
          }
            , 1000);
          postData();
          requestData(that);
        }
      }
    })
  },



  quizOver: function () {
    wx.showModal({
      title: '提示',
      content: '答题结束',
      success: function (res) {
          reset();
          if (res.confirm) {
          wx.redirectTo({
            url: '../overview/overview'
          })
        }
      }
    })
  }
})


var time;
var that;
var show = '';
var currentQuestionNo = 1;
var Ques=[];
var Answ=[];
var des=[];

function countdown(that) {
  var currentPage = getCurrentPages();
  var second = that.data.second
  if (second == 0) {
    console.log("Time Out...");
    that.setData({
      second: "Over"
    });
    if (currentPage.length == 2) {
      that.quizOver();
    } else {
      clearTimeout(time)
    }
    return;
  }


  time = setTimeout(function () {
    that.setData({
      second: second - 1,
      showSecond: show
    });
    show = FormatTime(that.data.second)
    countdown(that);
  }
    , 1000)
}

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

function postData() {
  wx.request({
    url: util.BASE_URL + 'postdata',
    data:{
      'the_flag_number' : 1
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      // success
      console.log(res.data)
    }
  })
}

function reset(){
  wx.request({
    url: util.BASE_URL+'resetflag',
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      console.log('改变为'+res.data);
      // success
    },
    fail: function() {
      console.log('失败了啊')
      // fail
    },
    complete: function() {
      // complete
    }
  })
}



function FormatTime(second) {
  var min = parseInt(second / 60);
  var sec = parseInt(second % 60);
  if (sec < 10) {
    return min + ':' + '0' + sec
  } else {
    return min + ':' + sec
  }
}