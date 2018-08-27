require("dotenv").config();

// Variables 

var keys = require('./keys');
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var nodeArgs = process.argv; 
var searchType = process.argv[2];
var searchParam = "";

// Search parameter for Bands and OMDB api request
// Currently if a search contains a special character or apostrophe it must be entered in quotes
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 2 && i < nodeArgs.length) {
    var tempString = nodeArgs[i] + " ";
    searchParam += tempString; 
    // console.log(searchParam);
  }  
}

var searchString = encodeURIComponent(searchParam.trim());

// Defining actions for search types

if (searchType === 'concert-this') {
  request("https://rest.bandsintown.com/artists/" + searchString + "/events?app_id=codingbootcamp", function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("Next performance:")
      console.log("Venue: " + JSON.parse(body)[0].venue.name);
      console.log("Location: " + JSON.parse(body)[0].venue.city);
      console.log("Date: " + JSON.parse(body)[0].datetime);
    }
  })
}

// Works, but also returns error?
else if (searchType === 'spotify-this-song') {
  spotify.search({ type: 'track', query: searchParam, limit: 5 }, function(err, data) {
    if (err) {
      return console.log('Spotify error: ' + err);
    }
    console.log("Search results:");
    for (i = 0; i < 6; i++) {
      console.log("--------------------------------");
      console.log("Artist: " + data.tracks.items[i].artists[0].name);
      console.log("Song: " + data.tracks.items[i].name);
      // console.log(data.tracks.items[i].preview_url);
      console.log("Album: " + data.tracks.items[i].album.name);
      console.log("--------------------------------");
    }
  })
}

else if (searchType === 'movie-this') {
  console.log(searchString);
  request("http://www.omdbapi.com/?t=" + searchString + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

    if (!error && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Cast: " + JSON.parse(body).Actors);
    }
  })
}

else if (searchType === 'do-what-it-says') {

}

else {
  return false;
}
