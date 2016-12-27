var app = getApp();
Page({
    data: {
        loginF: false,
        grids: [0, 1, 2, 3],
        paths: [
            "../../images/04.png",
            "../../images/01.png",
            "../../images/07.png",
            // "../../images/03.png",
            // "../../images/09.png",
            // "../../images/02.png",
            // "../../images/06.png",
            "../../images/08.png"],
        names: [
            "作业信息",
            "课件下载",
            "课堂文件",
            // "课外资料",
            // "同学交流",
            // "历史数据",
            // "OPTIONS",
            "添加更多"
        ],
        pagePath: [
            "selectCourse/selectCourse"
        ]
    },
    onLoad: function (options) {
        var that = this;
        app.globalData.currentURL = util.BASE_URL
        that.setData({
            loginF: app.globalData.LoginFlag
        });
        console.log(that.data.loginF)
        if (!that.data.loginF) {
            console.log('该弹窗啦')
            wx.showModal({
                title: '提示',
                content: '尚未登录，请前往登录页面',
                showCancel: false,
                url: 'String',
                success: function (res) {
                    // success
                    if (res.confirm) {
                        console.log('用户点击确定')
                        wx.switchTab({
                            url: '../login/login',
                            success: function (res) {
                                console.log(res)
                            },
                            fail: function (err) {
                                console.log(err)
                            }

                        })
                    }
                },
                fail: function () {
                    // fail
                },
                complete: function () {
                    // complete
                }
            })
        }
    },
    click: function (e) {

        if (e.currentTarget.id != 0) {
            wx.showModal({
                title: '提示',
                content: '无APPID，开发者快申一个啊',
                showCancel: false,
                success: function (res) {
                    // success
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                },
                fail: function () {
                    // fail
                },
                complete: function () {
                    // complete
                }
            })
        } else {
            wx.navigateTo({
                url: 'selectCourse/selectCourse'
            })
        }
        console.log(e)

    }
});

var date = new Date()
var util = require('../../utils/util.js')

