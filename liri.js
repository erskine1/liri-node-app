require("dotenv").config();

// VARIABLES

var keys = require('./keys');
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require('fs');
var readline = require('readline');
var moment = require('moment');

var nodeArgs = process.argv; 
var searchType = process.argv[2];
var searchParam = "";

// Search parameter
// Currently if a search contains a special character or apostrophe it must be escaped or entered in quotes
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 2 && i < nodeArgs.length) {
    var tempString = nodeArgs[i] + " ";
    searchParam += tempString; 
  }  
}

// encode for Bands and OMDB api request URL
var searchString = encodeURIComponent(searchParam.trim()).replace(/'/g, "%27");

// FUNCTIONS

// Log function to console log AND log to text file
function log(message) {
  console.log(message);
  fs.appendFile("log.txt", message + "\n", function(err) {
    if (err) {
      console.log(err);
    }
  })
}

function bandSearch() {
  request("https://rest.bandsintown.com/artists/" + searchString + "/events?app_id=codingbootcamp", function(error, response, body) {
    if (!error && response.statusCode === 200) {
      log("--------------------------------");
      log("Next performance for " + searchParam);
      log("Venue: " + JSON.parse(body)[0].venue.name);
      log("Location: " + JSON.parse(body)[0].venue.city);
      var time = JSON.parse(body)[0].datetime;
      log("Date: " + moment(time).format('MM/DD/YYYY'));
    }
  })
}

function songSearch() {
  spotify.search({ type: 'track', query: searchParam }, function(err, data) {
    if (err) {
      return log('Spotify error: ' + err);
    }
    log("Search results:");

    var results = data.tracks.items; 
    results.forEach(result => {
      log("--------------------------------");
      log("Artist: " + result.artists[0].name);
      log("Song: " + result.name);
      log("Preview link: " + result.preview_url);
      log("Album: " + result.album.name);
    })
  })
}

function movSearch() {
  if (searchString === "") {
    searchString += encodeURIComponent("Mr. Nobody");
    console.log("search: " + searchString);
  }
  request("http://www.omdbapi.com/?t=" + searchString + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
    if (!error && response.statusCode === 200) {
      log("--------------------------------");
      log("Movie Title: " + JSON.parse(body).Title);
      log("Year: " + JSON.parse(body).Year);
      log("IMDB Rating: " + JSON.parse(body).imdbRating);
      log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
      log("Country: " + JSON.parse(body).Country);
      log("Language " + JSON.parse(body).Language);
      log("Plot: " + JSON.parse(body).Plot);
      log("Cast: " + JSON.parse(body).Actors);
    }
  })
}

// Calling functions

if (searchType === 'concert-this') {
  bandSearch();
}
else if (searchType === 'spotify-this-song') {
  songSearch();
}
else if (searchType === 'movie-this') {
  movSearch();
}
else if (searchType === 'do-what-it-says') {
  var rd = readline.createInterface({
    input: fs.createReadStream('random.txt'),
  })

  rd.on('line', function(line) {
    var lineArr = line.split(",");

    searchType = lineArr[0];
    searchParam = JSON.parse(lineArr[1]);
    searchString = encodeURIComponent(searchParam.trim());

    if (searchType === 'concert-this') {
      console.log('Executing band search ' + searchParam); // TESTING
      bandSearch();
    }
    else if (searchType === 'spotify-this-song') {
      console.log('Executing spotify search ' + searchParam); // TESTING
      songSearch();
    }
    else if (searchType === 'movie-this') {
      console.log('Executing omdb search ' + searchParam); // TESTING
      movSearch();
    }
  })
  .on('close', function() {
    // end of file
  })

}
else {
  return false;
}