// native
var os = require('os');
// node_module
require('dotenv').config();
var Twitter = require('twitter');
// my module
var keys = require('./keys');

var twitter = new Twitter(keys.twitter);

function get() {
  var params = {
    screen_name: 'KitJte',
    count: 21,
    exclude_replies: true,
  };
  twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (error) {
      console.log(error);
      return false;
    }

    var data='=====> my-tweets <=====' + os.EOL
    var i = 1;
    for (var tweet of tweets) {
      data += '#' + (i++) + ' -- ' + tweet.created_at + os.EOL + tweet.text + os.EOL;
    }
    data = data.slice( 0, data.length -1 );
    console.log(data);
  });
}

if (require.main === module) {
  // standalone
  get();
} else {
  // module.exports = get;
  exports.get = get;
}
