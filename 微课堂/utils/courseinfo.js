var SAS = {
    teacher : "Oppenheim",
    schedule : {
        'Mon' : 14,
        'Wed' : 8,
        'Fri' : 8,
    },
};

var DDPP = {
    teacher : 'Shannon',
    schedule : {
        'Tue' : 10,
        'Thu' : 8,
    }
};

var Physics = {
    teacher : 'Issac',
    schedule : {
        'Mon' : 16,
        'Wed' : 8,
    }
};

function judgeLesson(lesson,date,hour){
    var iWeek = date ;
    var weekList = ['Tue','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Mon'];
    for (var weekDay in lesson.schedule){
        if (weekDay == weekList[iWeek]) return true;
    }
    return false;
}


module.exports = {
    SAS : SAS,
    DDPP : DDPP,
    Physics : Physics,
    judgeLesson : judgeLesson,
}