var app = getApp();
Page({
    data: {
        homework: [
        ],
        homeworkNum: 0,
        time: [],
        iconZ : '../../../images/测.png'
    },
    onLoad: function () {
        that = this;
        requestData(that)
    },
})


var that;
var testCount;
var Homework = [];
var Time = [];

function requestData(that) {
    wx.request({
        url: app.globalData.currentURL,
        method: 'GET',
        success: function (res) {
            if (res != null) {
                console.log('作业信息'+res.data)
                Homework = [];
                var i = 0;
                for (var item in res.data){
                    Homework.push(res.data[i].homework)
                    Time.push(res.data[i].the_time)
                    console.log(res.data[i].homework)
                    i++;
                }
                console.log(Homework)
                console.log(Time)
                that.setData({
                    time : Time,
                    homework: Homework,
                    homeworkNum: Homework.length,
                })
                return;
            }
        }
    })
}