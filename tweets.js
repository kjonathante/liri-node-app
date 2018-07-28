var os = require('os');

require('dotenv').config();
var Twitter = require('twitter');
// my module
var keys = require('./keys');

var twitter = new Twitter(keys.twitter);

if (process.argv[1].indexOf('tweets')>-1)
  get();

function get() {
  var params = {
    screen_name: 'KitJTe',
    count: 20,
    exclude_replies: true,
  };
  twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      var data=""
      for (var tweet of tweets) {
        data += tweet.created_at + ' - ' + tweet.text + os.EOL;
      }
      data = data.slice( 0, data.length -1 );
      console.log(data);
    }
  });
}

exports.get = get;