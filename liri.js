require('dotenv').config();
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);




////////////////////// functions //////////////////////
//Show last 20 tweets and when they were created
function showTweets(){};


//Show information about a song 
function spotifySong(){};

