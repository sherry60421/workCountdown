
$(function(){
  // 上班時間按鈕
  $("#button-start").on('click', function(e){
    var date = new Date();
    var now = new Date();
    if(e.target.value === "07:30"){
      date.setHours(16, 30, 0);
    } else if(e.target.value === "08:00"){
      date.setHours(17, 0, 0);
    } else if(e.target.value === "08:30"){
      date.setHours(17, 30, 0);
    } else{
      return;
    }
    var diff = (date.getTime()/1000) - (now.getTime()/1000);
    if(diff < 0){
      $("#countdown-clock").FlipClock(-diff);
      $("#after-message").text("你已經加班了");
    } else{
      $("#countdown-clock").FlipClock(diff, {
        countdown: true
      });
      $("#after-message").text("距離下班還剩下");
    }
    $("#after-message").show();
    $("#clock-content").show();
    $("#countdown-clock").show();
  });



});
