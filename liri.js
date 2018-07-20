require('dotenv').config()
var keys = require('./keys');

var fs = require('fs');
var request = require('request');
var twitter = require('twitter');
var Spotify = require('node-spotify-api');



var command = process.argv[2];
var nodeArgs = process.argv;
var myQuery="";
var doThisSong= "";
var separator = '---------------------------------------------';





////////////////////// functions //////////////////////
//write to file function

var appendToFile = function(data){

    fs.appendFile('log.txt', data+'\n', function(err){
        if (err) {
            console.log(err);
        } 
    });
};

/////////////////////////////// Tweets Function ///////////////////////

function showTweets(){
    
var client = new twitter(keys.twitter);
    console.log(`tweet function.`)
    var params = {
        screen_name: 'scoutypouty1',
        count: 20
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
           
          appendToFile(logText);
        }
         
        }
      });
};

/////////////////////End tweet Function ///////////////////////

////////////////////////  spotify Function ////////////////////////////
/// This function querires spotify for a song by title
function spotifySong(x){
    // console.log(`param is ${x}`);
    myQuery = process.argv[3];
    
    if(x ===doThisSong){
        myQuery = x;
        // console.log(`now myQuery: ${myQuery}`);
       
    } else if (myQuery === undefined ) {
        myQuery = 'apeshit';
        
        }
        
    var spotify = new Spotify(keys.spotify);  
    // var myQuery = process.argv[3];
    spotify.search({ type: 'track', query: myQuery, }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
        //console.log(data); 
        var info = data.tracks.items[0];
        var artistName  = JSON.stringify(info.artists[0].name);
        var songName = JSON.stringify(info.name);
        var albumName  = JSON.stringify(info.album.name);
        var trackUrl = JSON.stringify(info.external_urls.spotify);
        var logTextSpotify = `Artist(s) Name: ${artistName}\nSong Title: ${songName}\nListen Here: ${trackUrl}\nAlbum Name: ${albumName}\n${separator}`;

        console.log(logTextSpotify);
        
        appendToFile(logTextSpotify);
        
    });
 
};
///////////////////// spotify  Function ends///////////////////////

/////////////////////////////// Movie Function ///////////////////////
// This function queries OMBD and returns details about a movie
function movieInfo(){
    var title = process.argv[3];
    if(title ===undefined){
        title="Malcolm X";
        console.log(`Default Title Query:`);
        console.log(`***********************************************`);
    };
    var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";


    request(queryURL, function (error, response, body) {

        if (error) {
            return console.log('Error occurred: ' + error);
        }
        
    //console.log('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the 
    //console.log('body:', body); // Print the HTML for the Google homepage.
    
    var output = JSON.parse(body);
    var title =output.Title;
    var year = output.Year;
    var imbdRating=output.Ratings[0].Value;
    var rottenRating=output.Ratings[1].Value;
    var country= output.Country;
    var lang= output.Language;
    var plot= output.Plot;
    var actors = output.Actors;

    var movieData= (`Movie: ${title}\nMovie Year: ${year}\nIMDB Rating: ${imbdRating}\nRotten Tomatoes Rating: ${rottenRating}\nCountry where produced: ${country}\nLanguages: ${lang}\nPlot: ${plot}\nActors: ${actors}\n${separator}` );
        
    console.log(movieData);
    appendToFile(movieData);

    });
};

function doThis(){
    //read from file to get song title
    fs.readFile('./random.txt', 'utf8', function(err, data){
        if (err) throw err;
        // console.log(data);
        var randomFile = data.split(",");
        doThisSong = randomFile[1];
        //console.log(`Random Song: ${doThisSong}`);
        doThisSong =JSON.parse(doThisSong);
        //call the spotify function and pass this song in
        spotifySong(doThisSong);
        
    });
    
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
