/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function getDays(createdTime){
  var todayTime = (new Date()).getTime();
  var timeDifference = todayTime - createdTime;
  var diffIncludingToday = Math.ceil(timeDifference / (1000 * 3600 * 24));
  return (diffIncludingToday - 1);
}

$(document).ready(function() {
  function createTweetElement(tweetObject){
    var $tweet = $('article');
    $tweet.addClass('tweet');

    // Header
    $tweet.append('<header>');
    var imageLink = tweetObject.user.avatars.regular;
    var username = tweetObject.user.name;
    var tweeterId = tweetObject.user.handle;
    $('header').append('<img src=' + imageLink + '>' + "<h3 class='username'>" + username + '</h3>' + "<h6 class='tweeterId'>" + tweeterId + '</h6>');

    // Main Body
    var contentText = tweetObject.content.text;
    $tweet.append("<div class='content'>" + contentText + "</div>" );

    // Footer
    var retrievedTime = tweetObject.created_at;
    var days = getDays(retrievedTime);
    $tweet.append("<footer> <div class='days'>" + days + " days ago" + '</div>');
    var flagIcon = "<i class='fas fa-flag'></i>";
    var reTweetIcon = "<i class='fas fa-retweet'></i>";
    var heartIcon = "<i class='fas fa-heart'></i>";
    $('footer').append("<div class='icons'>" + flagIcon + reTweetIcon + heartIcon + "</div></footer>");
    return $tweet;
  }

  const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

createTweetElement(tweetData);
});