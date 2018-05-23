
$(document).ready(function() {

  function getDays(createdTime){
    let todayTime = (new Date()).getTime();
    let timeDifference = todayTime - createdTime;
    let diffIncludingToday = Math.ceil(timeDifference / (1000 * 3600 * 24));
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
      $("#tweets-container").append(tweetElement);
    }
  }

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  renderTweets(data);

});