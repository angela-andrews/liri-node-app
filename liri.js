require('dotenv').config();
var fs = require('fs');
var request = require('request');
var twitter = require('twitter');
//var spotify = require('node-spotify-api');
var keys = require('./keys');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var nodeArgs = process.argv;





////////////////////// functions //////////////////////
///same old error call back
// function gotData(err, data,response){
//     console.log(data)
// };

//Show last 20 tweets and when they were created
function showTweets(){
    console.log(`tweet function.`)
    var params = {
        screen_name: 'scoutypouty1',
        count: 5
    }

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
          console.log(tweets);
        }
      });
};


//Show information about a song  Pass on in
function spotifySong(){
    console.log("Song Info here");
};

function movieInfo(){
    console.log("Movie info here");
};

function doThis(){
    console.log(`Do this.`)
};


///////switch statement to set the command/////////

switch (command){

    case 'my-tweets':
        showTweets();
        break;

    case 'spotify-this-song':
        spotifySong()
        break;

    case 'movie-this':
        movieInfo()
        break;
    
    case 'do-what-it-says':
        doThis()
        break;
    
    default:
        
        console.log(`Please enter a command: \n• my-tweets \n• spotify-this-song \n• movie-this \n• do-what-it-says`);
        
}
