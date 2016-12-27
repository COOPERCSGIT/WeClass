var app = getApp();

Page({
    data: {
        test: [
        ],
        icon: '../../images/测.png',
        time: [
            '时间：2016.12.27',
            '时间：2016.12.26',
            '时间：2016.12.25',
            '时间：2016.12.24',
            '时间：2016.12.23',
            '时间：2016.12.22',
            '时间：2016.12.21'
        ],
        testNum: 0
    },


    onLoad: function () {
        that = this;
        requestData(that)

    },

    clickTest: function (event) {
        var ex = /test/;
        if (ex.test(app.globalData.currentURL)) {
            app.globalData.currentURL = app.globalData.lastURL;
        }
        app.globalData.lastURL = app.globalData.currentURL
      
        app.globalData.currentURL += 'test/' + (parseInt(event.currentTarget.id) + 1).toString() + '/'
        console.log(event.currentTarget);
        console.log(event.target.id + 1);
        app.globalData.hiddenFlag = true;

    }
})
var that;
var pages;
var testCount;
var Test = [];


function requestData(that) {
    wx.request({
        url: app.globalData.lastURL,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
            if (res != null) {
                testCount = res.data.test_number
                console.log(app.globalData.lastURL)
                console.log(res.data)
                var i = 1
                for (; i <= testCount; i++) {
                    Test[i - 1] = ('text' + i.toString());
                }
                that.setData({
                    test: Test,
                    testNum: testCount
                })
                console.log(that.data.test);
            }
        }
    })

}
