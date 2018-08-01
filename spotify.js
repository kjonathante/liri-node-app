var os = require('os');
// node_module
var lame = require('lame');
var Speaker = require('speaker');
require('dotenv').config();
var Spotify = require('node-spotify-api');
// my module
var keys = require('./keys');

var spotify = new Spotify(keys.spotify);

function get(song) {
  return new Promise( function( resolve, reject ) {
    song = song || 'The Sign';
    var params = {
      type: 'track',
      query: `"${song}"`,
      limit: 1,
    }

    spotify.search(params)
    .then( function(data) {

      if (('tracks' in data) && (data.tracks.items.length>0)) {
        var item = data.tracks.items[0];
        var artist = item.artists.map( function(obj) { return obj.name });
        console.log(
          '=====> spotify-this-song <=====' + os.EOL +
          'Artist(s): ' + artist.join(', ') + os.EOL +
          'Name: ' + item.name + os.EOL +
          'Preview Link: ' + (item.preview_url||'N/A') + os.EOL +
          'Album: ' + item.album.name 
        );
        
        if (item.preview_url) {
          webGet(item.preview_url)
          .pipe(new lame.Decoder())
          .pipe(new Speaker())
          .on('finish', function() { 
            resolve();
          })
        } else {
          resolve();
        }
      } else {
        resolve();
      }
      
    })
    .catch( function(error) {
      console.log(error);
      reject();
    })
    // * Artist(s)
    // * The song's name 
    // * A preview link of the song from Spotify .preview_url
    // * The album that the song is from
  });
}

function webGet(url) {
  var https = require('https');
  var PassThrough = require('stream').PassThrough;

  var stream = new PassThrough;

  var req = https.get(url)
  req.on('response', response)
  req.on('error', function(error){
    console.error(error);
  })

  function response(res) {
    if (res.statusCode == 200) {
      res.pipe(stream);
    } else {
      stream.emit('error', new Error('HTTP Status Code ' + res.statusCode));
    }
  }

  return stream;
}


if (require.main === module) {
  // standalone
  var song = (process.argv.length>2) ? process.argv[2] : undefined;
  get(song);
} else {
  // module.exports = get;
  exports.get = get;
}

// (async () => {
//   await get();
//   await get();
//   console.log('async done');
// })();  
