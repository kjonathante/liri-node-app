// node_module
require('dotenv').config();
var Spotify = require('node-spotify-api');
// my module
var keys = require('./keys');

var spotify = new Spotify(keys.spotify);

 // standalone
if (process.argv[1].indexOf('spotify')>-1) {
  var song = (process.argv.length>2) ? process.argv[2] : undefined;
  get(song);
}

function get(song) {
  song = song || 'The Sign';
  var params = {
    type: 'track',
    query: `"${song}"`,
    limit: 1,
  }
  spotify.search(params, function(error, data){
    if (error) {
      console.log(error);
      return false;
    }

    //console.log(data.tracks);

    if (('tracks' in data ) && (data.tracks.items.length>0)) {
      var item = data.tracks.items[0];
      var artist = item.artists.map( obj => obj.name );
      console.log( "Artist(s): " + artist.join(', ') );
      console.log( "Name: " + item.name);
      console.log( "Preview Link: "  + (item.preview_url||'N/A'));
      console.log( "Album: " + item.album.name);    
      
      if (item.preview_url) {
        var Player = require('player');
        var player = new Player()
        player.add(item.preview_url);  
        player.play();
        player.on('error', function(err){
          // when error occurs
          //console.log(err);
        });
      }
    }
    
    // * Artist(s)
    // * The song's name 
    // * A preview link of the song from Spotify .preview_url
    // * The album that the song is from
  });
}

exports.get = get;