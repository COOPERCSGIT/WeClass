var app = getApp();

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