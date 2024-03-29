$(function() {
    var now = new Date();
    var date = new Date();
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
    // ---- 表格異動影響整理器 ---- //
    $("#list").on("click", function(e){
      // CASE
      var caseText = $("#case-src").val();
      var caseLines = caseText.split("\n");
      var caseSystemList = [];
      caseLines.forEach(function(e){
        var s = e.replace(/(\(\d+\)\s)/, '');
        s = s.replace(/(\[\s[\w\.]+\s\]\s位置：JAVA\\\w+\\)/, '');
        s = s.substring(0, s.indexOf('\\'));
        s = s.replace('case-', '');
        if(s) caseSystemList.push(s);
      });
      var caseSystemSet = new Set(caseSystemList);
      // Ezo
      var ezoText = $("#ezo-src").val();
      var ezoLines = ezoText.split("\n");
      var ezoSystemList = [];
      ezoLines.forEach(function(e){
        var s = e.replace(/(\(\d+\)\s)/, '');
        s = s.replace(/(\[\s[\w\.]+\s\]\s位置：EZO\\)/, '');
        s = s.substring(0, s.indexOf('\\'));
        if(s) ezoSystemList.push(s);
      });
      var ezoSystemSet = new Set(ezoSystemList);
      // SCM
      var scmText = $("#scm-src").val();
      var scmLines = scmText.split("\n");
      var scmSystemList = [];
      scmLines.forEach(function(e){
        var s = e.replace(/(\(\d+\)\s)/, '');
        s = s.replace(/(\[\s[\w\.]+\s\]\s位置：SCM\\)/, '');
        s = s.substring(0, s.indexOf('\\'));
        if(s) scmSystemList.push(s);
      });
      var scmSystemSet = new Set(scmSystemList);
      // ASP
      var aspText = $("#asp-src").val();
      var aspLines = aspText.split("\n");
      var aspSystemList = [];
      aspLines.forEach(function(e){
        var s = e.replace(/(\(\d+\)\s)/, '');
        s = s.replace(/(\[\s[\w\.]+\s\]\s位置：ASPNET\\)/, '');
        s = s.substring(0, s.indexOf('\\'));
        if(s) aspSystemList.push(s);
      });
      var aspSystemSet = new Set(aspSystemList);
      // 整理
      var allSet = new Set([...caseSystemSet, ...ezoSystemSet, ...scmSystemSet, ...aspSystemSet]);
      if(allSet.size > 0){
        var result = (caseSystemSet.size > 0 ? "\tCASE" : "")
        + (ezoSystemSet.size > 0 ? "\tEzo" : "")
        + (scmSystemSet.size > 0 ? "\tSCM" : "")
        + (aspSystemSet.size > 0 ? "\tASP" : "") + "\n";
        allSet.forEach(function(e){
          if(e){
            var line = e.toUpperCase() + "\t";
            line += caseSystemSet.size > 0 && caseSystemSet.has(e) ? "V\t" : "\t";
            line += ezoSystemSet.size > 0 && ezoSystemSet.has(e) ? "V\t" : "\t";
            line += scmSystemSet.size > 0 && scmSystemSet.has(e) ? "V\t" : "\t";
            line += aspSystemSet.size > 0 && aspSystemSet.has(e) ? "V\t" : "\t";
            line += "\n";
            result += line;
          }
        });
        $("#list-result").val(result);
      }
    });
    $("#copyToClipBoard").on("click", function(e){
      var content = document.getElementById('list-result');
      content.select();
      document.execCommand('copy');
      alert("複製完成！");
    });
    $("#clearAll").on("click", function(e){
      $("#case-src").val("");
      $("#ezo-src").val("");
      $("#scm-src").val("");
      $("#asp-src").val("");
      $("#list-result").val("");
      $("[id*='-filled']").hide();
    });
    $("[id*='-src']").on("change", function(e){
      var id = this.id.replace("-src", "-filled");
      if($(this).val()){
        $("#" + id).show();
      } else{
        $("#" + id).hide();
      }
    });
});
