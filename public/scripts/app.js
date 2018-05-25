
$(document).ready(function() {

  function getDays(createdTime){
    let todayTime = (new Date()).getTime();
    let timeDifference = todayTime - createdTime;
    let miliSecPerDay = 1000 * 3600 * 24;
    let diffIncludingToday = Math.ceil(timeDifference / miliSecPerDay);
    return (diffIncludingToday - 1);
  }

  function createTweetElement(tweetObject){
    let $tweet = $('<article>').addClass('tweet');

    // Header
    let imageLink = tweetObject.user.avatars.regular;
    let username = tweetObject.user.name;
    let tweeterId = tweetObject.user.handle;

    let $header = $('<header>');
    let $imgLink = "<img src=" + imageLink + ">";
    let $userName = "<h3 class='username'>" + username + '</h3>';
    let $tweeterId = "<h6 class='tweeterId'>" + tweeterId + "</h6>";
    $header.append($imgLink + $userName + $tweeterId);
    $tweet.append($header);

    // Main Body
    let contentText = tweetObject.content.text;
    let content = $('<div>').addClass('content').text(contentText);
    $tweet.append(content);

    // Footer
    let days = getDays(tweetObject.created_at);
    let $footer = $('<footer>');
    let $days = $('<div>').addClass('days').text(days + " days ago");

    let flagIcon = "<i class='fas fa-flag'></i>";
    let reTweetIcon = "<i class='fas fa-retweet'></i>";
    let heartIcon = "<i class='fas fa-heart'></i>";

    let $icons = $('<div>').addClass('icons');
    $icons.append(flagIcon + reTweetIcon + heartIcon);
    $footer.append($days, $icons);
    $tweet.append($footer);

    return $tweet;
  }

  function renderTweets(tweets) {
    for (let singleTweet of tweets){
      let tweetElement = createTweetElement(singleTweet);
      $("#tweets-container").prepend(tweetElement);
    }
  }


  function loadTweets(){
    $.get('/tweets', function(data){
      renderTweets(data);
    });
  }

  function validateForm(form) {
    let textArea = form.find('textArea');
    let value = textArea.val();
    if (!value){
      alert('Please enter a valid tweet');
      return true;
    } else if (value.length > 140){
      alert('Please enter a tweet less than 140 characters');
      return false;
    } else{
      return true;
    }
  }

  $('.compose').on('click', function(){
    $('.new-tweet').slideToggle();
    $(this).toggleClass('clicked');
    $('textArea').focus();
  });

  $('input').on('click', function(event){
    event.preventDefault();
    let form = $('form');
    if (validateForm(form)){
      let serialized = form.serialize();
      $.post("/tweets", serialized).done(function(response){
        $('textArea').val('');
        $("#tweets-container").prepend(createTweetElement(response));
      });
    }
  });

  // Initial rendering
  loadTweets();
  $('.new-tweet').hide();
});