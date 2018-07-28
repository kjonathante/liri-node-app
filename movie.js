// native
var querystring = require('querystring');
var os = require('os');
// npm
var request = require('request');

// can be called from console
if (process.argv[1].indexOf('movie')>-1)
  get(process.argv[2] || 'Mr. Nobody');

// search omdbapi by Title
function get(title) {
  var params = querystring.stringify({ 
    apikey: 'trilogy',
    t: title,
    type: 'movie'
  });

  var options = {
    url: 'http://www.omdbapi.com/?' + params,
  };
   
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      console.log(
        'Title: ' + info.Title + os.EOL+
        'Year: '  + info.Year + os.EOL+
        'Rated: ' + info.Rated + os.EOL+
        'Rotten Tomatoes Rating: ' + getRating(info.Ratings, 'Rotten Tomatoes') + os.EOL+
        'Country: ' + info.Country + os.EOL+
        'Language: ' + info.Language + os.EOL+
        'Plot: ' + info.Plot + os.EOL+
        'Actors: ' + info.Actors);
    }
  }
   
  request(options, callback);

  return;
}

function getRating( sources, provider ) {
  if (sources == undefined || sources.length < 1) // error protection
    return undefined; // short circuit

  var arr = sources.filter( function(val) {
    return (val.Source == provider);
  });

  return ((arr.length>0) ? arr[0].Value : '-');
}

// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.

exports.get = get;