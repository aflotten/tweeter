$(document).ready(function() {
$(".new-tweet form textarea").on("input", function() {
  let counter = 140 - this.value.length;

$(this).parent().find(".counter").text(counter);

if (counter < 0) {
  $(this).parent().find(".counter").addClass("red-text");
} else {
  $(this).parent().find(".counter").removeClass("red-text");
}
  
})
});