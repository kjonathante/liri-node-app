// node_native
var os = require('os');
var fs = require('fs');
//my modules
var tweets = require('./tweets');
var spotify = require('./spotify');
var movie = require('./movie');


var arguments = process.argv.slice(2)
var command = (arguments.length>0) ? arguments[0] : null;
var option = (arguments.length>1) ? arguments[1] : undefined;

main(command, option);

function main( command, option ) {
  switch( command ) {
    case 'my-tweets':
      tweets.get();
      break;
    case 'spotify-this-song':
      spotify.get( option );
      break;
    case 'movie-this':
      movie.get( option || 'Mr. Nobody');
      //console.log( 'movie-this', option );
      break;
    case 'do-what-it-says':
      console.log( 'do-what-it-says', option );
      var data = fs.readFileSync('./random.txt', {encoding: 'utf8'});
      var lines = data.split(os.EOL).filter( val => val.length>0 );
      console.log(lines);
      for ( var val of lines ) {
        var arr = val.split(',');
        var cmd = (arr.length>0) ? arr[0] : null;
        var opt = (arr.length>1) ? arr[1] : null;
        main(cmd, opt);
      }
      break;
    default:
      console.log('i do not know what to do');
      break;
  }
}
