var app = getApp();
Page({
    data: {
        iconG: "../../../images/概.png",
        iconW: "../../../images/物.png",
        iconX: "../../../images/信.png",
        iconSS:"../../../images/数.png",
        iconR:"../../../images/软.png"
    },
    onLoad: function (options) {
        var that = this;
        app.globalData.currentURL = util.BASE_URL
        that.setData({
            loginF: app.globalData.LoginFlag
        });
    },
    onItemClick: function (event) {
        var ex = /course/;
        if (ex.test(app.globalData.currentURL)) {
            app.globalData.currentURL = util.BASE_URL;
            app.globalData.lastURL = util.BASE_URL
        }
        switch (event.currentTarget.id) {
            case 'S':
                app.globalData.currentURL += ('course/1/' + 'homework/')
                app.globalData.lastURL += 'course/1/'
                console.log(app.globalData.currentURL);
                break
            case "SS":
                app.globalData.currentURL += ('course/2/' + 'homework/')
                app.globalData.lastURL += 'course/2/'
                console.log(app.globalData.currentURL);

                break
            case "W":
                app.globalData.currentURL += ('course/3/' + 'homework/')
                app.globalData.lastURL += 'course/3/'
                console.log(app.globalData.currentURL);

                break;
            case "P":
                app.globalData.currentURL += ('course/4/' + 'homework/')
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

var date = new Date()
var util = require('../../../utils/util.js')

