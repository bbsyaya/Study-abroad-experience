$("#login").on("click", function() {
  $("div.cover.login").removeClass("hidden");
});
$("#regist").on("click", function() {
  $("div.cover.regist").removeClass("hidden");
});
$(".cover .close").on("click", function() {
  $("div.cover").addClass("hidden");
});
$(".cover.login a.regist").on("click", function() {
  $("div.cover.login").addClass("hidden");
  $("div.cover.regist").removeClass("hidden");
});
$(".cover.login a.forget").on("click", function() {
  $("div.cover.login").addClass("hidden");
  $("div.cover.forget").removeClass("hidden");
});
$(".cover.regist a.login").on("click", function() {
  $("div.cover.regist").addClass("hidden");
  $("div.cover.login").removeClass("hidden");
});
$("ul.tab li.password").click(function() {
  $(this).removeClass("hide");
  $(this)
    .siblings()
    .addClass("hide");
  $("form.password").removeClass("hidden");
  $("form.code").addClass("hidden");
});
$("ul.tab li.code").click(function() {
  $(this).removeClass("hide");
  $(this)
    .siblings()
    .addClass("hide");
  $("form.password").addClass("hidden");
  $("form.code").removeClass("hidden");
});