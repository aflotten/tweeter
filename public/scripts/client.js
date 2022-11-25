/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function () {

  $(".errEmpty").hide();
  $(".errTooLong").hide();

  const data = []

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    $("#tweetBox").empty();
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweetBox').prepend($tweet);

    }

  }

  const createTweetElement = function(tweet) {
    let $tweet = (`
  <article class="tweets">
  <header class="tweetHeader">
    <div class="person">
      <img class="avatar" src="${tweet.user.avatars}"></img>
      <h5 class="username"> ${tweet.user.name} </h5>
    </div>
    <div class="handle"> ${tweet.user.handle} </div>
  </header>
  <div class="tweetContent"> ${escape(tweet.content.text)} </div>
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
      $(".errEmpty").slideDown();
    } else if (total - max > 0) {
      $(".errTooLong").slideDown();
    } else {
      let str = $("#tweetForm").serialize();
      $.ajax({
        url: "/tweets ", 
        type: "POST",
        data: str,
        success: function (response) { loadTweets() },
        error: function (error) { console.log(error) }
      });
      $("#tweet-text").val("");
      $(".errEmpty").hide();
      $(".errTooLong").hide();
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
        renderTweets(newTweet);
      })
  };

  loadTweets();

});
