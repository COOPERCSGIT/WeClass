var app = getApp();
var util = require('../../utils/util.js')

Page({
    data: {
        test: [
        ],
        icon: '../../image/测.png',
        testTime: [
            '16.11.10',
            '16.12.16',
            '17.01.01',
            '17.01.05'
        ],
        testNum: 0
    },
    onLoad: function () {
        that = this;
        requestData(that)
    },

    clickTest: function (event) {
        console.log(event);
        var temp = parseInt(event.currentTarget.id) + 1
        app.globalData.currentURL = util.BASE_URL + 'test/' + temp + '/'
        console.log(app.globalData.currentURL);
    }
})



var that;
var pages;
var testCount;
var Test = [];



function requestData(that) {
    wx.request({
        url: app.globalData.currentURL,
        success: function (res) {
            console.log(res)
            if (res != null) {
                console.log(res.data.test_number)
                testCount = res.data.test_number
                var i = 1
                for (i = 0; i < testCount; i++) {
                    Test[i] = '测试' + (i + 1);
                }
                console.log(Test)
                that.setData({
                    testNum: res.data.test_num,
                    test: Test
                })
                console.log(that.data.test)
            }
        }
    })

}
