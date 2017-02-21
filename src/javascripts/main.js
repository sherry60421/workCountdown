
$(function(){

  // 上班時間按鈕
  $("#button-start button").on('click', function(e){
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
    // toggle
    $("#button-start button").each(function(index){
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
    $("#button-start button[value='" + localStorage.getItem('startTime') + "']").click();
  }



});
