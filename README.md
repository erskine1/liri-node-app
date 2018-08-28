## liri-node-app
This is a command line application that takes in parameters and returns data for:

* Movies from OMDB

Ex. `node liri.js movie-this The Fifth Element` returns:
```
Movie Title: The Fifth Element  
Country: France
IMDB Rating: 7.7  
Language English, Swedish, German, Arabic, Egyptian (Ancient)  
Plot: In the colorful future, a cab driver unwittingly becomes the central
figure in the search for a legendary cosmic weapon to keep Evil and Mr. 
Zorg at bay.  
Rotten Tomatoes: 71%  
Cast: Bruce Willis, Gary Oldman, Ian Holm, Milla Jovovich  
Year: 1997  
```
* Songs from Spotify
Ex. `node liri.js spotify-this-song House of the Rising Sun` returns:
```
Artist: The Animals
Song: House Of The Rising Sun
Preview link: null
Album: The Animals
...
```

* Concerts from Bandsintown
Ex. `node liri.js concert-this Ghost` returns:
```
Next performance for Ghost 
Venue: The Royal Albert Hall
Date: 09/09/2018
Location: London
```
Please note that due to the use of the command line to run the app, any special characters will need to be escaped or the search enclosed in quotes.