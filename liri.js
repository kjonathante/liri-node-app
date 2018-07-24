require('dotenv').config();
var os = require('os');
var fs = require('fs');
var keys = require('./keys');

//console.log(process.env);
//console.log('keys.spotify ->', keys.spotify);
//console.log('keys.twitter ->', keys.twitter);

var arguments = process.argv.slice(2)

var command = (arguments.length>0) ? arguments[0] : null;
var option = (arguments.length>1) ? arguments[1] : null;

main(command, option);
//console.log(process.argv, arguments);

function main( command, option ) {
  switch( command ) {
    case 'my-tweets':
      console.log( 'my-tweets', option );
      break;
    case 'spotify-this-song':
      console.log( 'spotify-this-song', option );
      break;
    case 'movie-this':
      console.log( 'movie-this', option );
      break;
    case 'do-what-it-says':
      console.log( 'do-what-it-says', option );
      var data = fs.readFileSync('./random.txt', {encoding: 'utf8'});
      var lines = clean( data.split(os.EOL), '');
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

function clean(arr, val) {
  for( var i = 0; i < arr.length; i++ ) {
    if (arr[i] == val) {
      arr.splice(i, 1);
      i--
    }
  }
  return arr;
}