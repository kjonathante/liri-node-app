// native
var querystring = require('querystring');
var os = require('os');
// node_module
var request = require('request');

// search omdbapi by Title
function get(title) {
  title = title || 'Mr. Nobody';
  var params = querystring.stringify({ 
    apikey: 'trilogy',
    t: title,
    type: 'movie'
  });

  var options = {
    url: 'http://www.omdbapi.com/?' + params,
  };
   
  function callback(error, response, body) {
    if (error) {
      console.log(error);
      return false;
    }

    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      console.log(
        '=====> movie-this <=====' + os.EOL +
        'Title: ' + info.Title + os.EOL+
        'Year: '  + info.Year + os.EOL+
        'Rated: ' + info.Rated + os.EOL+
        'Rotten Tomatoes Rating: ' + getRating(info.Ratings, 'Rotten Tomatoes') + os.EOL+
        'Country: ' + info.Country + os.EOL+
        'Language: ' + info.Language + os.EOL+
        'Plot: ' + info.Plot + os.EOL+
        'Actors: ' + info.Actors
      );
    }
  }
   
  request(options, callback);
}

function getRating( sources, provider ) {
  if (sources == undefined || sources.length < 1) // error protection
    return undefined; // short circuit

  var arr = sources.filter( function(val) {
    return (val.Source == provider);
  });

  return ((arr.length>0) ? arr[0].Value : 'N/A');
}

// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.


if (require.main === module) {
  // standalone
  var title = (process.argv.length>2) ? process.argv[2] : undefined;
  get(title);
} else {
  // module.exports = get;
  exports.get = get;
}
