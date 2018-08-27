require("dotenv").config();

// Variables 

var keys = require('./keys');
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require('fs');
var readline = require('readline');

var nodeArgs = process.argv; 
var searchType = process.argv[2];
var searchParam = "";

// Search parameter
// Currently if a search contains a special character or apostrophe it must be entered in quotes
for (var i = 3; i < nodeArgs.length; i++) {
  // if(nodeArgs[i].indexOf("'") === -1){
  //   nodeArgs[i].replace("'", "")
  // }
  if (i > 2 && i < nodeArgs.length) {
    // var tempArg = JSON.stringify(nodeArgs[i]).replace(/'/g, "\\'");
    // console.log(tempArg);
    // var tempString = JSON.parse(tempArg) + " ";
    // console.log(tempString);
    var tempString = nodeArgs[i] + " ";
    searchParam += tempString; 
    console.log(searchParam)
  }  
}

// TESTING 
// var tempTest = JSON.stringify(searchParam.trim()).replace(/'/g, "\\'");
// console.log(tempTest);
console.log(searchParam);

// encode for Bands and OMDB api request URL
var searchString = encodeURIComponent(searchParam.trim()).replace(/'/g, "%27");
console.log(searchString);

// functions 

function bandSearch() {
  request("https://rest.bandsintown.com/artists/" + searchString + "/events?app_id=codingbootcamp", function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("--------------------------------");
      console.log("Next performance for " + searchParam);
      console.log("Venue: " + JSON.parse(body)[0].venue.name);
      console.log("Location: " + JSON.parse(body)[0].venue.city);
      console.log("Date: " + JSON.parse(body)[0].datetime);
    }
  })
}

function songSearch() {
  spotify.search({ type: 'track', query: searchParam }, function(err, data) {
    if (err) {
      return console.log('Spotify error: ' + err);
    }
    console.log("Search results:");

    var results = data.tracks.items; 
    results.forEach(result => {
      console.log("--------------------------------");
      console.log("Artist: " + result.artists[0].name);
      console.log("Song: " + result.name);
      // console.log(result.preview_url);
      console.log("Album: " + result.album.name);
    })
  })
}

function movSearch() {
  request("http://www.omdbapi.com/?t=" + searchString + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("--------------------------------");
      console.log("Movie Title: " + JSON.parse(body).Title);
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
  // fs.readFile("random.txt", "utf8", function(error, data) {
  //   if (error) {
  //     return console.log('do-what-it-says error:' + error);
  //   }

  //   console.log(data);
  //   var dataArr = data.split(",");

  //   searchType = dataArr[0];
  //   searchParam = dataArr[1];

  //   if (searchType === 'concert-this') {
  //     bandSearch();
  //   }
  //   else if (searchType === 'spotify-this-song') {
  //     songSearch();
  //   }
  //   else if (searchType === 'movie-this') {
  //     movSearch();
  //   }
  // })

  var rd = readline.createInterface({
    input: fs.createReadStream('random.txt'),
    // output: process.stdout
  })

  rd.on('line', function(line) {
    // console.log('line: ' + line);
    // console.log('test: ' + process.stdout);
    // console.log(line);

    var lineArr = line.split(",");
    // console.log(lineArr);

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

// Defining actions for search types

// Bands in Town
// if (searchType === 'concert-this') {
//   request("https://rest.bandsintown.com/artists/" + searchString + "/events?app_id=codingbootcamp", function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       console.log("Next performance:")
//       console.log("Venue: " + JSON.parse(body)[0].venue.name);
//       console.log("Location: " + JSON.parse(body)[0].venue.city);
//       console.log("Date: " + JSON.parse(body)[0].datetime);
//     }
//   })
// }

// // Spotify
// else if (searchType === 'spotify-this-song') {
//   spotify.search({ type: 'track', query: searchParam }, function(err, data) {
//     if (err) {
//       return console.log('Spotify error: ' + err);
//     }
//     console.log("Search results:");

//     var results = data.tracks.items; 
//     results.forEach(result => {
//       console.log("--------------------------------");
//       console.log("Artist: " + result.artists[0].name);
//       console.log("Song: " + result.name);
//       // console.log(result.preview_url);
//       console.log("Album: " + result.album.name);
//     })
//   })
// }

// // OMDB
// else if (searchType === 'movie-this') {
//   console.log(searchString);
//   request("http://www.omdbapi.com/?t=" + searchString + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

//     if (!error && response.statusCode === 200) {
//       console.log("Title: " + JSON.parse(body).Title);
//       console.log("Year: " + JSON.parse(body).Year);
//       console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
//       console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
//       console.log("Country: " + JSON.parse(body).Country);
//       console.log("Language " + JSON.parse(body).Language);
//       console.log("Plot: " + JSON.parse(body).Plot);
//       console.log("Cast: " + JSON.parse(body).Actors);
//     }
//   })
// }

// else if (searchType === 'do-what-it-says') {
//   fs.readFile("random.txt", "utf8", function(error, data) {
//     if (error) {
//       return console.log('do-what-it-says error:' + error);
//     }
//     var dataArr = data.split(",");
//     console.log(dataArr);

//     // searchType = dataArr[0];
//     // searchParam = dataArr[1];
//   })
// }

// else {
//   return false;
// }
