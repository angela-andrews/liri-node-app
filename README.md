# Liri-Node-App

This is our week 10 assignment that uses Node.js to create a twitter bot. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.


## Why the project is useful
This project is a great way to introduce yourself to building node apps using API data. This was my first Node project and I learned a lot.

![App Screenprint]('app.png')


## How to use
1. Clone this repo
2. Get your own Twitter and Spotify Keys.
3. Create a keys.js file that will contain your Twitter and Spotify keys.

```js
console.log('this is loaded');

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
```
4. Run `npm install`

The following modules will be installed:
* [Twitter](https://www.npmjs.com/package/twitter)
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
* [Request](https://www.npmjs.com/package/request)
* [DotEnv](https://www.npmjs.com/package/dotenv)

* You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com).
* [FS](https://nodejs.org/api/fs.html) module will be used to interact with the file system.


To begin interacting with Liri, use the following commands: 
* `my-tweets`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says`

Put any arguments that have spaces in it in quotes.
