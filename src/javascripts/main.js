

var hideEmpNo = function(empNo) {
    return empNo.substring(0, 2) + "X" + empNo.substring(3, 5) + "X";
}
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
        var birth = e.currentTarget.value;
        var retireDate = new Date(Number(birth.substring(0, 4)) + 65, birth.substring(5, 7), birth.substring(8, 10));
        var diffRetire = (retireDate.getTime() / 1000) - (now.getTime() / 1000);
        if(diffRetire < 0){
          $("#retire-countdown").FlipClock(-diffRetire,{
            clockFace: 'DailyCounter'
          });
          $("#retire-after-message").text("你已經退休了");
        } else{
          $("#retire-after-message").text("距離退休還剩下");
          $("#retire-countdown").FlipClock(diffRetire, {
              clockFace: 'DailyCounter',
              countdown: true
          });
        }
        $("#retire-after-message").show();
        $("#retire-countdown").show();
        // 記錄下來
        localStorage.setItem('birth', birth);
    });
    //上次的時間
    if (localStorage.getItem('birth')) {
        $("#birth-start").val(localStorage.getItem('birth'));
        $("#birth-start").trigger("change");
    }
    // ---- 表格異動影響整理器 ---- //
    $("#list").on("click", function(e){
      // CASE
      var caseText = $("#case-src").val();
      var caseLines = caseText.split("\n");
      var caseSystemSet = new Set(caseLines.map(function(e){
        var s = e.replace(/(\(\d+\)\s)/, '');
        s = s.replace(/(\[\s[\w\.]+\s\]\s位置：JAVA\\\w+\\)/, '');
        s = s.substring(0, s.indexOf('\\'));
        s = s.replace('case-', '');
        if(s) return s;
      }));
      // Ezo
      var ezoText = $("#ezo-src").val();
      var ezoLines = ezoText.split("\n");
      var ezoSystemSet = new Set(ezoLines.map(function(e){
        var s = e.replace(/(\(\d+\)\s)/, '');
        s = s.replace(/(\[\s[\w\.]+\s\]\s位置：EZO\\)/, '');
        s = s.substring(0, s.indexOf('\\'));
        if(s) return s;
      }));
      // SCM
      var scmText = $("#scm-src").val();
      var scmLines = scmText.split("\n");
      var scmSystemSet = new Set(scmLines.map(function(e){
        var s = e.replace(/(\(\d+\)\s)/, '');
        s = s.replace(/(\[\s[\w\.]+\s\]\s位置：SCM\\)/, '');
        s = s.substring(0, s.indexOf('\\'));
        if(s) return s;
      }));
      // ASP
      var aspText = $("#asp-src").val();
      var aspLines = aspText.split("\n");
      var aspSystemSet = new Set(aspLines.map(function(e){
        var s = e.replace(/(\(\d+\)\s)/, '');
        s = s.replace(/(\[\s[\w\.]+\s\]\s位置：ASPNET\\)/, '');
        s = s.substring(0, s.indexOf('\\'));
        if(s) return s;
      }));
      // 整理
      var allSet = new Set([...caseSystemSet, ...ezoSystemSet, ...scmSystemSet, ...aspSystemSet]);
      if(allSet.size > 0){
        var result = "\tCASE\tEzo\tSCM\tASP\n";
        allSet.forEach(function(e){
          var line = e + "\t";
          line += caseSystemSet.size > 0 && caseSystemSet.has(e) ? "V\t" : "\t";
          line += ezoSystemSet.size > 0 && ezoSystemSet.has(e) ? "V\t" : "\t";
          line += scmSystemSet.size > 0 && scmSystemSet.has(e) ? "V\t" : "\t";
          line += aspSystemSet.size > 0 && aspSystemSet.has(e) ? "V\t" : "\t";
          line += "\n";
          result += line;
        });
        $("#list-result").val(result);
      }
    });
});
