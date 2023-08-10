function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

$(function() {
    var now = new Date();
    var date = new Date();
    var page = '', tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === 'page') page = decodeURIComponent(tmp[1]);
        });
    if(page){
      $('[id^="page-"]').hide();
      $('#page-'+page).show();
    }
    // ---- 下班倒數計時器 ---- //
    // 上班時間按鈕
    $("#off-button-start button").on('click', function(e) {
        var $clickedBtn = $(this);
        if ($clickedBtn.val() === "07:30") {
            date.setHours(16, 30, 0);
        } else if ($clickedBtn.val() === "08:00") {
            date.setHours(17, 0, 0);
        } else if ($clickedBtn.val() === "08:30") {
            date.setHours(17, 30, 0);
        } else {
            return;
        }
        var diff = (date.getTime() / 1000) - (now.getTime() / 1000);
        if (diff < 0) {
            $("#off-countdown").FlipClock(-diff);
            $("#off-after-message").text("你已經加班了");
        } else {
            $("#off-countdown").FlipClock(diff, {
                countdown: true
            });
            $("#off-after-message").text("距離下班還剩下");
        }
        $("#off-after-message").show();
        $("#off-countdown").show();
        // toggle
        $("#off-button-start button").each(function(index) {
            if ($(this).val() === $clickedBtn.val()) {
                $(this).removeClass("btn-default").addClass(".active").addClass("btn-primary");
            } else {
                $(this).addClass("btn-default").removeClass(".active").removeClass("btn-primary");
            }
        });
        //紀錄下來
        localStorage.setItem('startTime', $clickedBtn.val());
    });

    //上次的時間
    if (localStorage.getItem('startTime')) {
        $("#off-button-start button[value='" + localStorage.getItem('startTime') + "']").click();
    }

    // ---- 午餐倒數計時器 ---- //
    date.setHours(11, 30, 0);
    var diff = (date.getTime() / 1000) - (now.getTime() / 1000);
    if (diff < 0) {
        $("#lunch-countdown").FlipClock(-diff);
        $("#lunch-message").text("你已經吃飽了");
    } else {
        $("#lunch-countdown").FlipClock(diff, {
            countdown: true
        });
    }
    // ---- 退休倒數計時器 ---- //
    $("#birth-start").on("change", function(e){
      if(e.currentTarget.value && $("#retire-age").val()){
        genRetireCountdown(e.currentTarget.value, $("#retire-age").val());
      }
    });
    $("#retire-age").on("change", function(e){
      debugger;
      if($("#birth-start").val() && e.currentTarget.value){
        genRetireCountdown($("#birth-start").val(), e.currentTarget.value);
      }
    });
    function genRetireCountdown(birth, retireAge){
      var retireDate = new Date(Number(birth.substring(0, 4)) + Number(retireAge), birth.substring(5, 7), birth.substring(8, 10));
      var diffRetire = (retireDate.getTime() / 1000) - (now.getTime() / 1000);
      if(diffRetire < 0){
        $("#retire-countdown").FlipClock(-diffRetire,{
          clockFace: 'DailyCounter'
        });
        $("#retired-after-message").show();
        $("#to-retire-after-message").hide();
      } else{
        $("#retire-age-text").text(retireAge);
        $("#to-retire-after-message").show();
        $("#retired-after-message").hide();
        $("#retire-countdown").FlipClock(diffRetire, {
            clockFace: 'DailyCounter',
            countdown: true
        });
      }
      $("#retire-countdown").show();
      // 記錄下來
      localStorage.setItem('birth', birth);
      localStorage.setItem('retireAge', retireAge);
    }
    //上次的時間
    if (localStorage.getItem('birth') && localStorage.getItem('retireAge')) {
        $("#birth-start").val(localStorage.getItem('birth'));
        $("#birth-start").trigger("change");
        $("#retire-age").val(localStorage.getItem('retireAge'));
        $("#retire-age").trigger("change");
    }
});
