var app = getApp();
Page({
    data: {
        iconG: "../../../images/概.png",
        iconW: "../../../images/物.png",
        iconX: "../../../images/信.png",
        iconSS: "../../../images/数.png",
        iconR: "../../../images/软.png",
        loginF: false
    },

    onLoad: function (options) {
        var that = this;
        that.setData({
            loginF: app.globalData.LoginFlag
        });
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

        addStatus(that)
        app.globalData.currentURL = util.BASE_URL
    },
    onItemClick: function (event) {
        var ex = /course/;
        if (ex.test(app.globalData.currentURL)) {
            app.globalData.currentURL = util.BASE_URL;
            app.globalData.lastURL = util.BASE_URL
        }
        switch (event.currentTarget.id) {
            case 'S':
                app.globalData.currentURL += ('course/1/' )
                app.globalData.lastURL += 'course/1/'
                console.log(app.globalData.currentURL);
                break
            case "SS":
                app.globalData.currentURL += ('course/2/')
                app.globalData.lastURL += 'course/2/'
                console.log(app.globalData.currentURL);

                break
            case "W":
                app.globalData.currentURL += ('course/3/')
                app.globalData.lastURL += 'course/3/'
                console.log(app.globalData.currentURL);

                break;
            case "P":
                app.globalData.currentURL += ('course/4/')
                app.globalData.lastURL += 'course/4/'
                console.log(app.globalData.currentURL);

                break;
            case "R":
                app.globalData.currentURL += ('course/5/' + 'homework/')
                app.globalData.lastURL += 'course/5/'
                console.log(app.globalData.currentURL);

                break;
            default:
                return;
        }
    }
});


var hidden = [];
function addStatus(that) {
    hidden[0] = courseInfo.judgeLesson(courseInfo.SAS, date.getDay())
    hidden[1] = courseInfo.judgeLesson(courseInfo.DDPP, date.getDay())
    hidden[2] = courseInfo.judgeLesson(courseInfo.Physics, date.getDay())
    hidden[3] = courseInfo.judgeLesson(courseInfo.SAS, date.getDay())
    that.setData({
        hidden: hidden
    })
}
var date = new Date()
var util = require('../../utils/util.js')
var courseInfo = require('../../utils/courseinfo.js')


// function downLoad(){
// wx.downloadFile({
//   url: util.BASE_URL+'files/d.jpg',
//   type : 'image',
//   success: function (res) {
//     console.log(res.tempFilePath)
//     var filePath = res.tempFilePath 
//     wx.openDocument({
//       filePath: filePath,
//       success: function (res) {
//         console.log('打开文档成功')
//       }
//     })
//   },
//   fail:function(res){
//       console.log(res)
//   }
// })
// }



// function postChoice(){
// wx.request({
//   url: util.BASE_URL,
//   data: {},
//   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
//   // header: {}, // 设置请求的 header
//   success: function(res){
//     // success
//   },
//   fail: function() {
//     // fail
//   },
//   complete: function() {
//     // complete
//   }
// })



// }