
$(function(){
  // ---- 下班倒數計時器 ---- //
  // 上班時間按鈕
  $("#off-button-start button").on('click', function(e){
    var date = new Date();
    var now = new Date();
    var $clickedBtn = $(this);
    if($clickedBtn.val() === "07:30"){
      date.setHours(16, 30, 0);
    } else if($clickedBtn.val() === "08:00"){
      date.setHours(17, 0, 0);
    } else if($clickedBtn.val() === "08:30"){
      date.setHours(17, 30, 0);
    } else{
      return;
    }
    var diff = (date.getTime()/1000) - (now.getTime()/1000);
    if(diff < 0){
      $("#off-countdown").FlipClock(-diff);
      $("#off-after-message").text("你已經加班了");
    } else{
      $("#coff-countdown").FlipClock(diff, {
        countdown: true
      });
      $("#off-after-message").text("距離下班還剩下");
    }
    $("#off-after-message").show();
    $("#off-countdown").show();
    // toggle
    $("#off-button-start button").each(function(index){
      if($(this).val() === $clickedBtn.val()){
        $(this).removeClass("btn-default").addClass(".active").addClass("btn-primary");
      } else{
        $(this).addClass("btn-default").removeClass(".active").removeClass("btn-primary");
      }
    });
    //紀錄下來
    localStorage.setItem('startTime', $clickedBtn.val());
  });

  //上次的時間
  if(localStorage.getItem('startTime')){
    $("#off-button-start button[value='" + localStorage.getItem('startTime') + "']").click();
  }

  // ---- 午餐倒數計時器 ---- //
  var now = new Date();
  var date = new Date();
  date.setHours(11, 30, 0);
  var diff = (date.getTime()/1000) - (now.getTime()/1000);
  if(diff < 0){
    $("#lunch-countdown").FlipClock(-diff);
    $("#lunch-message").text("你已經吃飽了");
  } else{
    $("#lunch-countdown").FlipClock(diff, {
      countdown: true
    });
  }

});
