var s = document.querySelector(".infosend > .send_smscode"); //获取发送短信验证码按钮DOM
var timer;
var num = 60; //倒计时时间
var flag = true;
//发送验证码
$(".infosend > .send_smscode").on("click", function() {
  var picCode = $(this)
    .parent()
    .find("input[name='piccode']")
    .val(); //获取同块内图形验证码
  var tel = $(this)
    .parent()
    .find("input[name='tel']")
    .val(); //获取同块内手机号
  var phoneReg = /^1[3|4|5|7|8][0-9]{9}$/; //手机号验证
  $.post(
    "http://www.kewo.com/index.php/Admin/Login/checkVerify",
    {
      //验证图形验证码
      verifyCode: picCode
    },
    function(res) {
      if (!phoneReg.test(tel)) {
        alert("请输入正确的手机号");
      } else if (res && flag) {
        $.ajax({
          type: "get",
          url: "/Index/Zt/sendCode?phone=" + tel,
          success: function(res) {
            clearInterval(timer);
            timer = setInterval(function() {
              flag = false;
              num--;
              s.innerHTML = num + "s"; //按钮倒计时样式
              s.classList.add("disabled"); //按钮增加 disabled 样式
              if (num === 0) {
                s.classList.remove("disabled"); //移除按钮 disabled 样式
                clearInterval(timer);
                s.innerHTML = "发送验证码"; //按钮恢复为发送验证码
                num = 60;
                flag = true;
                $(".infosend > img").attr(
                  "src",
                  verifyURL + "/" + Math.random()
                ); //图形验证码重置
              }
            }, 1000);
          }
        });
      } else {
        alert("请输入正确的图形验证码");
        $(".infosend > img").attr("src", verifyURL + "/" + Math.random()); //图形验证码重置
      }
    }
  );
});
// 点击图形验证
var verifyURL = "http://www.kewo.com/index.php/Admin/Login/verify";
$(".infosend .one-line > img").attr("src", verifyURL + "/" + Math.random());
$(".infosend .one-line > img").on("click", function() {
  $(this).attr("src", verifyURL + "/" + Math.random());
});
// 最后一次验证
$(".infosend > .button_send").click(function() {
  //提交信息
  var data = {};
  var phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
  var nameReg = /^[u4e00-u9fa5]{2,4}$/;
  data["zt_id"] = $(this)
    .parent()
    .find("input[name='zt_id']")
    .val();
  data["name"] = $(this)
    .parent()
    .find("input[name='name']")
    .val();
  data["tel"] = $(this)
    .parent()
    .find("input[name='tel']")
    .val();
  var code = $(this)
    .parent()
    .find("input[name='smscode']")
    .val();
  if (data["name"] == "") {
    alert("姓名不能为空");
    return false;
  } else if (nameReg.test(data["name"])) {
    alert("请输入合法中文名");
    return false;
  } else if (!phoneReg.test(data["tel"])) {
    alert("请输入正确的手机号");
    return false;
  } else if (!code) {
    alert("请输入手机验证码");
    return false;
  } else {
    $.ajax({
      type: "get",
      url: "/Index/Zt/checkCode?code=" + code,
      success: function(res) {
        if (res) {
          $.ajax({
            type: "post",
            url: "/Index/Zt/saveUser",
            data: data,
            success: function(res) {
              $(".infosend > input").val(""); //重置表单信息
              alert("提交成功，我们的老师将第一时间与您联系"); //成功提交弹窗
              s.classList.remove("disabled"); //移除按钮 disabled 样式
              clearInterval(timer);
              s.innerHTML = "发送验证码"; //按钮恢复为发送验证码
              num = 60;
              flag = true;
            }
          });
        } else {
          alert("验证码错误");
          $(".infosend > img").attr("src", verifyURL + "/" + Math.random()); //验证码错误，重置验证码
        }
      }
    });
  }
});
