var app = getApp()　
 var constant = require('../../utils/constant.js')
 var Util = require('../../utils/util.js')
Page({
  data:{
    question :  '',
    currentQuestion : 0,
    items : {},
    stopCount : false,
    second :  300
},

  onLoad:function(){
    var that = this;
    requestData(that)
  },

  onShow:function(){
    var that = this;
    countdown(that)      
  },

  checkboxChange: function(e) {
    var that = this;
    currentChoice = e.detail.value
    console.log(currentChoice)
  },

  //点击后setdata
  next_question:function(e){
    var that = this;
    //在这里判断题目是否答完
    console.log(e);
    wx.showModal({
      title: '提示',
      content: '进入下一个问题',
      success: function(res) 
      {
          if (res.confirm) 
          {
          console.log('用户点击确定')
          post(currentChoice);
          currentQuestionNo++;
          
          setNextQuestion(that);
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
                url: '../homepage/homepage'
              })

          }
      }
})

}
})




var currentChoice;
var currentQuestionNo = 1;
var currentQuestion;
var currentAnswer = {};
var rightAnswer;
var leftTime;
var time;





function countdown(that) {
 var currentPage = getCurrentPages();
 var second = that.data.second
 if (second == 0) {
  console.log("Time Out...");
  that.setData({
   second: "Over"
  });
  if(currentPage.length==4){
        that.quizOver();
  }else
    {
        clearTimeout(time)
    }    
    return;
 }

 time = setTimeout(function(){
  that.setData({
   second: second - 1
  });
  countdown(that);
 }
 ,1000)
}



function setNextQuestion(that){
  requestData(that);
}


/**
 * 请求数据
 * @param that Page的对象，用其进行数据的更新
 * @param targetPage 请求的目标页码
 */
function requestData(that) {
    wx.request({
        url: app.globalData.currentURL+'problem/'+currentQuestionNo+'/',
        header: {
            "Content-Type": "application/json"
        },

        success: function (res) {
        if (res.statusCode == 404) 
            {
            that.quizOver()
            return;
            }
        bindData(res.data.problem);
        console.log(currentAnswer)
        that.setData({
            question : currentQuestion,
            items : currentAnswer,
        });
        console.log(that.data.second)
        }
    });
}

function bindData(itemData) {
    currentQuestion = itemData.problem_text
    currentAnswer = itemData.answer
    rightAnswer = itemData.correct_answer
    leftTime = itemData.test_time

}


function post(currentChoice) {
    wx.request({
        url: app.globalData.currentURL+'problem/'+currentQuestionNo+'/' ,
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: Util.json2Form( { choice : currentChoice+1 }),
        success:function(res){
            console.log('当前选择 '+currentChoice)
            console.log('返回成功' +res.data)
        },
        fail:function(){
            console.log('没有POST成功')
        },
        complete: function (res) {
            if (res == null || res.data == null || res.data.msg == null) {
                // console.error(Constant.ERROR_DATA_IS_NULL);
                return;
            }
        }
    });

}
