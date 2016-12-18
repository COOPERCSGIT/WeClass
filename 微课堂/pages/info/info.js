var app = getApp();
Page({
    data: {
    },
    onLoad: function (options) {
        var that = this;
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
            app.globalData.currentURL+=('course/1/'+'test/1/homework/')
            app.globalData.lastURL+='course/1/'
            break
            case "P":
            app.globalData.currentURL+=('course/2/'+'test/1/homework/')  
            app.globalData.lastURL += 'course/2/'
            break
            case "D":
            app.globalData.currentURL += ('course/3/'+'test/1/homework/')
            app.globalData.lastURL += 'course/3/'
            break
            case "A":
            app.globalData.currentURL += ('course/4/'+'test/1/homework/')
            app.globalData.lastURL += 'course/3/'
            default :
            return;
        }
        wx.navigateTo({
            url: '../info/homework/homework'
        })
    }
});

var date = new Date()
var util = require('../../utils/util.js')

