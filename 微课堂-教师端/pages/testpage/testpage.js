var app = getApp();

Page({
    data:{
        test : [
        ],
        testTime : [
            '16.11.10',
            '16.12.16',
            '17.01.01',
            '17.01.05'
        ],
        testNum : 0
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
            app.globalData.currentURL+='test/1/'
            break
            case "1":
            app.globalData.currentURL+='test/2/'
            break
            case "2":
            app.globalData.currentURL += 'test/3/'
            break
            case "3":
            app.globalData.currentURL += 'test/3/'
            default :
            return;
        }
    wx.navigateTo({
      url: '../duringTests/duringTests'
    })
    }


})

var that;
var pages;
var testCount;
var Test = [];




function requestData(that){
    wx.request({
      url: app.globalData.currentURL,
      success: function(res){
          if(res!=null){
              console.log(res.data.test_number)
              testCount = res.data.test_number
              that.setData({
                  testNum : res.data.test_num
              })
              var i =1
              for(i=1;i<testCount;i++){
                  Test[i-1] = 'TEST'+ i;
              }
                            console.log(Test)

              that.setData({
                  test:Test 
              })
              console.log(that.data.test)
          }
      }
    })

}
