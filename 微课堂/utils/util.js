
function formatTime(time, format) {
  let temp = '0000000000' + time
  let len = format.length
  return temp.substr(-len)
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

 
function json2Form(json) {  
    var str = [];  
    for(var p in json){  
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));  
    }  
    return str.join("&");  
}  

var BASE_URL = 'https://104.194.73.140/'; 
module.exports = {
  formatTime: formatTime,
  BASE_URL : BASE_URL,
  json2Form : json2Form
}
