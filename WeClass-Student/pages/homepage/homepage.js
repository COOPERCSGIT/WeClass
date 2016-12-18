var app = getApp();
Page({
    data: {
        
        hidden : [

            ]
    },
    onLoad: function (options) {
        var that = this;
        addStatus(that)
        app.globalData.currentURL = util.BASE_URL
    },
    onItemClick: function (event) {
        var ex = /course/;
        if(ex.test(app.globalData.currentURL)){
            app.globalData.currentURL = util.BASE_URL;
            app.globalData.lastURL = util.BASE_URL
        }
        switch(event.currentTarget.id)
        {
            case 'S':
            app.globalData.currentURL+='course/1/'
            app.globalData.lastURL+='course/1/'
            break
            case "P":
            app.globalData.currentURL+='course/2/'      
            app.globalData.lastURL += 'course/2/'
            break
            case "D":
            app.globalData.currentURL += 'course/3/'
            app.globalData.lastURL += 'course/3/'
            break
            case "A":
            app.globalData.currentURL += 'course/3/'
            app.globalData.lastURL += 'course/3/'
            default :
            return;
        }
        wx.navigateTo({
            url: '../testPage/testPage'
        })
    }
});


var hidden = [];
function addStatus(that){
          hidden[0] = courseInfo.judgeLesson(courseInfo.SAS,date.getDay())
          hidden[1] = courseInfo.judgeLesson(courseInfo.DDPP,date.getDay())
          hidden[2] = courseInfo.judgeLesson(courseInfo.Physics,date.getDay())
          hidden[3] = courseInfo.judgeLesson(courseInfo.SAS,date.getDay())
          that.setData({
              hidden : hidden
          })
}
var date = new Date()
var util = require('../../utils/util.js')
var courseInfo = require('../../utils/courseinfo.js')
