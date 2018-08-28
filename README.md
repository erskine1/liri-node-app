## liri-node-app
This is a command line application that takes in parameters and returns data from the relevant API. Data is logged both in the console and in a log.txt file. Valid searches include the following:

* Movies from OMDB
* Songs from Spotify
* Concerts from Bandsintown

`node liri.js movie-this The Fifth Element` returns:
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

`node liri.js spotify-this-song House of the Rising Sun` returns:
```
Artist: The Animals
Song: House Of The Rising Sun
Preview link: null
Album: The Animals
... (will return multiple results)
```

`node liri.js concert-this Ghost` returns:
```
Next performance for Ghost 
Venue: The Royal Albert Hall
Date: 09/09/2018
Location: London
```
Additionally, a fourth command will read the contents of `random.txt` and call any commands listed there.

`node liri.js do-what-it-says`

Commands in `random.txt` should be written on separate lines in the following format:
```
spotify-this-song,"Human"
movie-this,"The Matrix"
concert-this,"Ozzy Osbourne"
```
Please note that when entering a search parameter in the command line, any searches containing special characters will need to be enclosed in quotes, or escape those characters in the command line:

`node liri.js movie-this "Bill & Ted's Excellent Adventure"`

`node liri.js movie-this Rosemary\'s Baby`
