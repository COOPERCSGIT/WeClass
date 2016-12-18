var app = getApp();

Page({
    data:{
        test : [
            'test1',
            'test2',
            'test3',
            'test4'
        ],
        testNum : 0
    },


    onLoad:function(){
        that = this;
        // requestData(that)

    },

    clickTest:function(event){
       var ex = /test/;
        if(ex.test(app.globalData.currentURL)){
            app.globalData.currentURL = app.globalData.lastURL;
        }


        switch(event.target.id)
        {
            case '0':
            app.globalData.lastURL = app.globalData.currentURL
            app.globalData.currentURL+='test/1/'
            app.globalData.hiddenFlag = true;
            break
            case "1":
            app.globalData.lastURL = app.globalData.currentURL
            app.globalData.currentURL+='test/2/'
            app.globalData.hiddenFlag = true;
            break
            case "2":
            app.globalData.lastURL = app.globalData.currentURL
            app.globalData.currentURL += 'test/3/'
            app.globalData.hiddenFlag = false;
            break
            default :
            return;
        }
    wx.navigateTo({
      url: '../initquiz/initquiz'
    })
    }


})

var that;
var pages;
var testCount;
var Test = [];

function requestData(that){
    wx.request({
      url: app.globalData.lastURL,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
          if(res!=null){
              testCount = res.data.course.testCount
              that.setData({
                  testNum : testCount
              })
              var i =1
              for(;i<=testCount;i++){
                  Test+= ('text'+ i);
              }
          }
      }
    })

}
