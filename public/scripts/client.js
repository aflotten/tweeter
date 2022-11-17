/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function () {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
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
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function (tweets) {
    $("#tweetBox").empty();
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      console.log($tweet)
      $('#tweetBox').prepend($tweet);

    }

  }

  const createTweetElement = function (tweet) {
    let $tweet = (`
  <article class="tweets">
  <header class="tweetHeader">
    <div class="person">
      <img class="avatar" src="${tweet.user.avatars}"></img>
      <h5 class="username"> ${tweet.user.name} </h5>
    </div>
    <div class="handle"> ${tweet.user.handle} </div>
  </header>
  <div class="tweetContent"> ${tweet.content.text} </div>
  <footer class="tweetFooter">
    <span class="timeCreated"> ${timeago.format(tweet.created_at)}</span>
    <div class="icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>

    </div>
  
  </footer>
</article>`);

    return $tweet;
  }



  $("#tweetForm").submit(function(event) {

    event.preventDefault();
    const max = 140;
    const total = $(this).find("#tweet-text").val().length;

    if (!total) {
      alert("Tweet cannot be empty!")
    } else if (total - max > 0) {
      alert("Tweet is too long!")
    } else {
      let str = $("#tweetForm").serialize();
      $.ajax({
        url: "/tweets ", 
        type: "POST",
        data: str,
        success: function (response) { loadTweets() },
        error: function (error) { console.log(error) }
      });
    };
  });
  


  const loadTweets = function () {
    $("send-tweet").load("/tweet")
    $.ajax({
      type: "GET",
      dataType: "JSON",
      url: "/tweets"

    })
      .then(function (newTweet) {
        console.log("THIS HERE", newTweet)
        renderTweets(newTweet);
      })
  };

  loadTweets();

});
