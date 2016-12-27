 
const defaultLogName = {
  work: '工作',
  rest: '休息'
}
const actionName = {
  stop: '停止',
  start: '开始'
}

const initDeg = {
  left: 45,
  right: -45,
}
 var app = getApp()　
 var constant = require('../../utils/constant.js')
 var Util = require('../../utils/util.js')
Page({
  data:{
    initFlag :false,
    question :  '',
    currentQuestion : 0,
    items : {},
    stopCount : false,
    second :  1,
    workTime: '',
    remainTimeText: '',
    timerType: 'work',
    log: {},
    completed: false,
    isRuning: false,
    leftDeg: initDeg.left,
    rightDeg: initDeg.right
},

  onLoad:function(){
    var that = this;
    requestFlag(that);
    setTimeout(this.startTimer,2000);
    let workTime = Util.formatTime(this.data.second, 'HH')
    this.setData({
      workTime: workTime,
      remainTimeText: workTime + ':00'
    })
   //postID()
    requestData(that)
  },

 
      onShow:function() {
    if (this.data.isRuning) return

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
  showCancel:false,
  success: function(res) {
    if (res.confirm) {
      console.log('用户点击确定')
      wx.redirectTo({
        url: '../answerPage/answerPage',
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
  }
})
},




  startTimer: function(e) {
    let startTime = Date.now()
    let isRuning = this.data.isRuning
    let showTime = this.data['workTime']
    let keepTime = showTime * 60 * 1000
    let logName = this.logName || defaultLogName['work']

    if (!isRuning) {
      this.timer = setInterval((function() {
        this.updateTimer()
        this.startNameAnimation()
      }).bind(this), 1000)
    } else {
      this.stopTimer()
    }

    this.setData({
      isRuning: !isRuning,
      completed: false,
      timerType: 'work',
      remainTimeText: showTime + ':00',
      taskName: logName
    })

    this.data.log = {
      name: logName,
      startTime: Date.now(),
      keepTime: keepTime,
      endTime: keepTime + startTime,
      action: actionName[isRuning ? 'stop' : 'start'],
      type: 'work'
    }
    this.saveLog(this.data.log)
  },

  startNameAnimation: function() {
    let animation = wx.createAnimation({
      duration: 450
    })
    animation.opacity(0.2).step()
    animation.opacity(1).step()
    this.setData({
      nameAnimation: animation.export()
    })
  },

  stopTimer: function() {
    // reset circle progress
    this.setData({
      leftDeg: initDeg.left,
      rightDeg: initDeg.right
    })
    // clear timer
    this.timer && clearInterval(this.timer)
    this.quizOver();
  },

  stopTime: function() {
    // reset circle progress
    this.setData({
      leftDeg: initDeg.left,
      rightDeg: initDeg.right
    })
    // clear timer
    this.timer && clearInterval(this.timer)
  },

  updateTimer: function() {
    let log = this.data.log
    let now = Date.now()
    let remainingTime = Math.round((log.endTime - now) / 1000)
    let H = Util.formatTime(Math.floor(remainingTime / (60 * 60)) % 24, 'HH')
    let M = Util.formatTime(Math.floor(remainingTime / (60)) % 60, 'MM')
    let S = Util.formatTime(Math.floor(remainingTime) % 60, 'SS')
    let halfTime

    // update text
    if (remainingTime > 0) {
      let remainTimeText = (H === "00" ? "" : (H + ":")) + M + ":" + S
      this.setData({
        remainTimeText: remainTimeText
      })
    } else if (remainingTime == 0) {
      this.setData({
        completed: true
      })
      this.stopTimer()
      return
    }

    // update circle progress
    halfTime = log.keepTime / 2
    if ((remainingTime * 1000) > halfTime) {
      this.setData({
        leftDeg: initDeg.left - (180 * (now - log.startTime) / halfTime)
      })
    } else {
      this.setData({
        leftDeg: -135
      })
      this.setData({
        rightDeg: initDeg.right - (180 * (now - (log.startTime + halfTime)) / halfTime)
      })
    }
  },

  changeLogName: function(e) {
    this.logName = e.detail.value
  },

  saveLog: function(log) {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(log)
    wx.setStorageSync('logs', logs)
  }
})


function setNextQuestion(that){
  requestData(that);
}


var currentChoice;
var currentQuestionNo = 1;
var currentQuestion;
var currentAnswer = {};
var rightAnswer;
var leftTime;
var time;





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
        data:{
          session_id : app.globalData.UserID
        },
        success: function (res) {
        if (res.statusCode == 404) 
        {
            that.quizOver()
            return;
        }
        console.log(app.globalData.currentURL+'problem/'+currentQuestionNo+'/');
        console.log(res.data)
        bindData(res.data.problem);
        console.log(currentAnswer)
        that.setData({
            question : currentQuestion,
            items : currentAnswer,
        });
        console.log(that.data.second)
        },
        fail:function(){
          console.log(app.globalData.currentURL)
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
   postID();
    wx.request({
        url: app.globalData.currentURL+'problem/'+currentQuestionNo+'/' ,
        // header: {
        //   "Content-Type": "application/x-www-form-urlencoded"  
        // },
        // data: Util.json2Form({
        //    session_id : app.globalData.UserID,
        //    choice : 2          
        //  }),
            data: {
      session_id : app.globalData.UserID,
      choice : 2 
    },
        method: "GET",
        success:function(res){
           
            console.log('当前选择 '+currentChoice)
            console.log('返回成功' +res)
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



function postID(){
  wx.request({
    url: app.globalData.currentURL+'problem/'+currentQuestionNo+'/',
    
    data: {
      session_id : app.globalData.UserID
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      console.log(res.data)
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })


}


function requestFlag(that){
wx.request({
  url: app.globalData.lastURL+'/postdata',
  method: 'GET',
  success: function(res){
    console.log('aaaaaaaaa   '+res.data)
    if(res.data==0){
   wx.showModal({
     title: '提示',
     content: '测试尚未开始哦',
     showCancel:false,
     success: function(res) {
      that.stopTime();
      if (res.confirm) {
        console.log('用户点击确定')
        wx.redirectTo({
          url: '../testPage/testPage',
          complete: function() {
          }
        })
    }
  }
})
}
    that.setData({
      initFlag : true
    })
  },
  fail: function() {
    return;
  },
  complete: function() {
    
  }
})
}