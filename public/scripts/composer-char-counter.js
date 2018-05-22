$(document).ready(function() {
  var length;
  $('.new-tweet').on('keyup', 'textarea', function(event){
    length = 140 - (this.textLength);
    var spanCounter = this.parentElement.children[2];
    $(spanCounter).text(length);
    if (length < 0){
      $(spanCounter).css("color", "red");
    } else {
      $(spanCounter).css("color", "black");
    }
  });
});