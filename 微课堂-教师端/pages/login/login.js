// admin
//xc19970113

var app = getApp();
var Util = require('../../utils/util.js')
var that;
Page({
  data: {
    user: null,
    username: '',
    password: '',
    error: null,
    hidden: false,
    motto: "耕耘不辍，助力课堂",
    userInfo: {},
    icon:'../../image/icon.jpg'
  },
  onLoad: function () {
    that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
      })
    })
  },
  updateUsername: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      username: value
    });
  },
  updatePassword: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      password: value
    });
  },
  sign: function () {
    login(this);

    if(app.globalData.LoginFlag){
    wx.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 1000
    });
    this.setData({
      error: null,
      hidden: true
    });
    setTimeout(this.to,2500);
    }
  },
  to:function(){
     wx.redirectTo({
       url: '../testpage/testpage'
     }) 
  },
  submitValue:function(e){
    console.log(e.detail.value)
    this.setData({
      username : e.detail.value.username,
      password : e.detail.value.password
    })
    console.log(this.data.password)
  },

  changeReset:function(){
      console.log(e.detail.value)
  }

});


function login(that) {
  wx.request({
    url: 'https://104.194.73.140/student/accounts/login/',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: Util.json2Form({
      username: that.data.username,
      password: that.data.password
    }),
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      console.log(that.data.username)
      console.log(that.data.password)
      console.log(res.data)
    if(res.data.error_message=="invalid user"){
      console.log("invalid user");
      wx.showModal({
      showCancel:false,
      title: '提示',
      content: '用户名或密码错误',
      success: function(res) 
      {
          if (res.confirm) 
          {
          console.log('用户点击确定')
          }
      }
})
      return;
    }
      app.globalData.LoginFlag = true;
      console.log(that.data.username);
      app.globalData.UserID = res.data.session_id;
      console.log(app.globalData.UserID);
    },
    fail: function () {

      console.log('');
      // fail
    },
    complete: function () {
      // complete
    }
  })



}