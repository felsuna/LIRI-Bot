require("dotenv").config();

const keys = require("./keys");
const axios = require("axios");
const Spotify = require("node-spotify-api")
const moment = require("moment");
const fs = require("fs");

const spotify = new Spotify(keys.spotify);
const programToRun = process.argv[2];
const action = process.argv[3];

// Commands that execute a function when you input one of the following cases in the terminal
switch (programToRun) {
    case "concert-this":
        concertThis(action);
        break;
    case "spotify-this-song":
        spotifyThisSong(action);
        break;
    case "movie-this":
        movieThis(action);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log(`Please use one of the following commands: 
        concert-this
        spotify-this-song
        movie-this
        do-what-it-says`);
        break;
}

function concertThis(artist = "Incubus") {
    const queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL)
        .then(function (response) {
            // Artist name
            console.log(`Artist: ${response.data[0].lineup[0]}`);
            // Name of the venue
            console.log(`Venue: ${response.data[0].venue.name}`);
            // Venue location
            console.log(`Location: ${response.data[0].venue.city}, ${response.data[0].venue.region} ${response.data[0].venue.country}`);
            // Date of the Event (use moment to format this as "MM/DD/YYYY")
            console.log(`Date: ${moment(response.data[0].datetime).format('MM/DD/YYYY')}`);

            fs.appendFile("log.txt", `
Artist: ${response.data[0].lineup[0]} ${"\n"}
Venue: ${response.data[0].venue.name} ${"\n"}
Location: ${response.data[0].venue.city}, ${response.data[0].venue.region} ${response.data[0].venue.country} ${"\n"}
Date: ${moment(response.data[0].datetime).format('MM/DD/YYYY')}
-----------------------------------------------------------------------                
                            ` , function(error, result){});
        })
}

function spotifyThisSong(song = "All the Small Things") {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            //Artist(s)
            console.log(`Artist(s): ${data.tracks.items[0].artists[0].name}`);
            
            //The song's name
            console.log(`Song: ${data.tracks.items[0].name}`);
            //A preview link of the song from Spotify
            console.log(`Preview song: ${data.tracks.items[0].external_urls.spotify}`);
            //The album that the song is from
            console.log(`Album: ${data.tracks.items[0].album.name}`);

            fs.appendFile("log.txt", `
Artist(s): ${data.tracks.items[0].artists[0].name} ${"\n"}
Song: ${data.tracks.items[0].name} ${"\n"}
Preview song: ${data.tracks.items[0].external_urls.spotify} ${"\n"}
Album: ${data.tracks.items[0].album.name}
-----------------------------------------------------------------------                
                ` , function(error, result){});
        }      
    });

}

function movieThis(movie) {
    const queryURL = "http://www.omdbapi.com/?t=" + movie + "/&apikey=trilogy";
    axios.get(queryURL)
        .then(function (response) {
            if (movie === undefined) {
                movieThis(movie = "Mr. Nobody");
                console.log(`If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
It's on Netflix!`) 
            } else {
                // Title of the movie.
                console.log(`Movie: ${response.data.Title}`);
                // Year the movie came out.
                console.log(`Year: ${response.data.Year}`);
                // IMDB Rating of the movie.
                console.log(`${response.data.Ratings[0].Source}: ${response.data.Ratings[0].Value}`);
                // Rotten Tomatoes Rating of the movie.
                console.log(`${response.data.Ratings[1].Source}: ${response.data.Ratings[1].Value}`);
                // Country where the movie was produced.
                console.log(`Produced: ${response.data.Country}`);
                // Language of the movie.
                console.log(`Language: ${response.data.Language}`);
                // Plot of the movie.
                console.log(`Plot: ${response.data.Plot}`);
                // Actors in the movie.
                console.log(`Actors: ${response.data.Actors}`);

                fs.appendFile("log.txt", `
Movie: ${response.data.Title} ${"\n"}
Year: ${response.data.Year} ${"\n"}
${response.data.Ratings[0].Source}: ${response.data.Ratings[0].Value} ${"\n"}
${response.data.Ratings[1].Source}: ${response.data.Ratings[1].Value} ${"\n"}
Produced: ${response.data.Country} ${"\n"}
Language: ${response.data.Language} ${"\n"}
Plot: ${response.data.Plot} ${"\n"}
Actors: ${response.data.Actors} ${"\n"}
-----------------------------------------------------------------------                
                ` , function(error, result){});
            }
        })
}

function doWhatItSays() {
    // console.log("running do-what program")
    fs.readFile("random.txt", "utf8", function(err, data){
       var dataArray = data.split(",")
       if (dataArray[0] === "spotify-this-song"){
           spotifyThisSong(dataArray[1]);
       }
    })
}