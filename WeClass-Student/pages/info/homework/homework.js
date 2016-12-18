var app = getApp();

Page({
    data:{
        test : [
        ],
        testNum : 0,
        hiddeFlag :app.globalData.hiddenFlag
    },


    onLoad:function(){
        that = this;
        requestData(that)

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
            break
            case "1":
            app.globalData.lastURL = app.globalData.currentURL
            app.globalData.currentURL+='test/2/'
            break
            case "2":
            app.globalData.lastURL = app.globalData.currentURL
            app.globalData.currentURL += 'test/3/'
            break
            default :
            return;
        }

    }


})

var that;
var pages;
var testCount;
var Test = [];

function requestData(that){
    wx.request({
      url: app.globalData.currentURL,
      method: 'GET',
      success: function(res){
          if(res!=null){
              console.log(res.data)
              if(res.data.homework!=null){
                Test = res.data.homework
                that.setData({
                  test : Test,
                  testNum :Test.length ,
                  hiddenFlag : false
              })
                  return;
              }

          }
          }

      })
    }

