var app = getApp();
 var Util = require('../../utils/util.js')
Page({
  data: {
    user: null,
    username: '',
    password: '',
    error: null,
    hidden: false,
    motto: "点滴进步，从微课堂开始",
    userInfo: {}
  },
  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
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


    login();
    wx.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 1000});
    this.setData({
      error: null,
      hidden: true});
    // const { username, password } = this.data;
    // const user = User.current();
    // if (username) user.set({ username });
    // if (password) user.set({ password });
    // user.sign().then(() => {
    //   wx.showToast({
    //     title: '更新成功',
    //     icon: 'success',
    //   });
    // }).catch(error => {
    //   this.setData({
    //     error: error.message,
    //   });
    // });
  }
});





function login(){
  wx.request({
    url: 'https://104.194.73.140/student/accounts/login/',
    header: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
        data: Util.json2Form( { 
          username : 'admin',
          password : 'xc19970113'

         }),
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      app.globalData.UserID = res.data.session_id;
      console.log(app.globalData.UserID);

     },
    fail: function() {

      console.log('');
      // fail
    },
    complete: function() {
      // complete
    }
  })



}