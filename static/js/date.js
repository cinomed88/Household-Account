$(document).ready(function(){

var d = new Date();

var week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');

var month = new Array('January', 'February', 'March' , 'April', 'May', 
    'June', 'July', 'August', 'September', 'October', 'November', 'December');

$("#heading2").text( month[d.getMonth()] + ", " + d.getDate()
    + " (" + week[d.getDay()] + ")" );
$("#time_input").text( d.getHours()+ ":" + d.getMinutes());

{/* document.write('현재 년: ' + d.getFullYear() + '<br />');
document.write('현재 월: ' + (d.getMonth() + 1) + '<br />');
document.write('현재 일: ' + d.getDate() + '<br />');

document.write('<br />'); // 줄바꿈

document.write('현재 시: ' + d.getHours() + '<br />');
document.write('현재 분: ' + d.getMinutes() + '<br />');
document.write('현재 초: ' + d.getSeconds() + '<br />');

document.write('<br />');

document.write('오늘 요일: ' + d.getDay() + '<br />'); // 일요일 = 0 */}
});