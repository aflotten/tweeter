/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    console.log($tweet)
    $('#tweetBox').append($tweet);

  }
  
}

const createTweetElement = function(tweet) {
  let $tweet = (`
  <article class="tweets">
  <header class="tweetHeader">
    <div class="person">
      <img class="avatar" src="https://i.imgur.com/73hZDYK.png"></img>
      <h5 class="username">Newton</h5>
    </div>
    <div class="handle"> @SirIssac </div>
  </header>
  <div class="tweetContent">Hello World!</div>
  <footer class="tweetFooter">
    <span class="timeCreated">Time Created</span>
    <div class="icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>

    </div>
  
  </footer>
</article>`);

return $tweet;
}

renderTweets(data);

//const $tweet = createTweetElement(tweetData);

//$('#tweetBox').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

// Test / driver code (temporary)
//console.log($tweet); // to see what it looks like

});
