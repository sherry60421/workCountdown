!function e(t,r,a){function o(i,s){if(!r[i]){if(!t[i]){var l="function"==typeof require&&require;if(!s&&l)return l(i,!0);if(n)return n(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var u=r[i]={exports:{}};t[i][0].call(u.exports,function(e){var r=t[i][1][e];return o(r?r:e)},u,u.exports,e,t,r,a)}return r[i].exports}for(var n="function"==typeof require&&require,i=0;i<a.length;i++)o(a[i]);return o}({1:[function(e,t,r){"use strict";$(function(){function e(e,r){var a=new Date(Number(e.substring(0,4))+Number(r),e.substring(5,7),e.substring(8,10)),o=a.getTime()/1e3-t.getTime()/1e3;o<0?($("#retire-countdown").FlipClock(-o,{clockFace:"DailyCounter"}),$("#retired-after-message").show(),$("#to-retire-after-message").hide()):($("#retire-age-text").text(r),$("#to-retire-after-message").show(),$("#retired-after-message").hide(),$("#retire-countdown").FlipClock(o,{clockFace:"DailyCounter",countdown:!0})),$("#retire-countdown").show(),localStorage.setItem("birth",e),localStorage.setItem("retireAge",r)}var t=new Date,r=new Date,a="",o=[];location.search.substr(1).split("&").forEach(function(e){o=e.split("="),"page"===o[0]&&(a=decodeURIComponent(o[1]))}),a&&($('[id^="page-"]').hide(),$("#page-"+a).show()),$("#off-button-start button").on("click",function(e){var a=$(this);if("07:30"===a.val())r.setHours(16,30,0);else if("08:00"===a.val())r.setHours(17,0,0);else{if("08:30"!==a.val())return;r.setHours(17,30,0)}var o=r.getTime()/1e3-t.getTime()/1e3;o<0?($("#off-countdown").FlipClock(-o),$("#off-after-message").text("你已經加班了")):($("#off-countdown").FlipClock(o,{countdown:!0}),$("#off-after-message").text("距離下班還剩下")),$("#off-after-message").show(),$("#off-countdown").show(),$("#off-button-start button").each(function(e){$(this).val()===a.val()?$(this).removeClass("btn-default").addClass(".active").addClass("btn-primary"):$(this).addClass("btn-default").removeClass(".active").removeClass("btn-primary")}),localStorage.setItem("startTime",a.val())}),localStorage.getItem("startTime")&&$("#off-button-start button[value='"+localStorage.getItem("startTime")+"']").click(),r.setHours(11,30,0);var n=r.getTime()/1e3-t.getTime()/1e3;n<0?($("#lunch-countdown").FlipClock(-n),$("#lunch-message").text("你已經吃飽了")):$("#lunch-countdown").FlipClock(n,{countdown:!0}),$("#birth-start").on("change",function(t){t.currentTarget.value&&$("#retire-age").val()&&e(t.currentTarget.value,$("#retire-age").val())}),$("#retire-age").on("change",function(t){$("#birth-start").val()&&t.currentTarget.value&&e($("#birth-start").val(),t.currentTarget.value)}),localStorage.getItem("birth")&&localStorage.getItem("retireAge")&&($("#birth-start").val(localStorage.getItem("birth")),$("#birth-start").trigger("change"),$("#retire-age").val(localStorage.getItem("retireAge")),$("#retire-age").trigger("change"))})},{}]},{},[1]);
//# sourceMappingURL=bundle1.js.map
