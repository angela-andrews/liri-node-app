require('dotenv').config()
var keys = require('./keys');

var fs = require('fs');
var request = require('request');
var twitter = require('twitter');
var Spotify = require('node-spotify-api');



var command = process.argv[2];
var nodeArgs = process.argv;
var separator = '---------------------------------------------';





////////////////////// functions //////////////////////
///same old error call back
// function gotData(err, data,response){
//     console.log(data)
// };

//Show last 20 tweets and when they were created
function showTweets(){
    
var client = new twitter(keys.twitter);
    console.log(`tweet function.`)
    var params = {
        screen_name: 'scoutypouty1',
        count: 2
    }

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        
        if (!error) {
         // console.log(tweets);
        //   console.log(tweets.text);
        var tweetCreated='';
        var tweet='';
        for(var i =0; i < tweets.length; i++) {
           tweetCreated=tweets[i].created_at;
           tweet = tweets[i].text;
           var logText = `${tweetCreated}\n${tweet}\n${separator}`;

            console.log(logText);
           
            fs.appendFile('log.txt', logText+'\n', function(err){
                if (err) {
                    console.log(err);
                } 
    
            });
        }
         
        }
      });
};


//Show information about a song  Pass on in
function spotifySong(){
    //console.log("Song Info here");
    var spotify = new Spotify(keys.spotify);
       
    var myQuery = process.argv[3];

    spotify.search({ type: 'track', query: myQuery, limit: 1 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
    //console.log(data); 
    //var trackInfo = JSON.stringify(data.tracks.items[0].external_urls.spotify);
    var artistName  = JSON.stringify(data.tracks.items[0].artists[0].name);
    var songName = JSON.stringify(data.tracks.items[0].name);
    var albumName  = JSON.stringify(data.tracks.items[0].album.name);
    var trackUrl = JSON.stringify(data.tracks.items[0].external_urls.spotify);
    
    console.log(`Artist(s) Name: ${artistName}\nSong Title: ${songName}\nListen Here: ${trackUrl}\nAlbum Name: ${albumName}`)
    
    
    });
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
