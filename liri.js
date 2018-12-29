require("dotenv").config();

const keys = require("./keys");
const axios = require("axios");
const Spotify = require("node-spotify-api")
const moment = require("moment");

const spotify = new Spotify(keys.spotify);
const programToRun = process.argv[2];
const action = process.argv[3];

// Commands that execute a function when you input one of the following cases in the terminal
switch (programToRun) {
    case "concert-this":
        concertThis(action);
        break;
    case "spotify-this-song":
        spotifyThisSong();
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
        })
}

function spotifyThisSong() {
    Spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            //Artist(s)
            console.log(`Artist(s): `);
            //The song's name
            console.log(`Song: `);
            //A preview link of the song from Spotify
            console.log(`Preview song: `);
            //The album that the song is from
            console.log(`Album: `);
        }

        console.log(data);
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
            }
        })
}

function doWhatItSays() {
    console.log("running do-what program")
}

//### BONUS

//* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

//* Make sure you append each command you run to the `log.txt` file. 

//* Do not overwrite your file each time you run a command.






























// concert-this command
// if (programToRun === "concert-this") {
//     concertThis(action);
//     // spotify-this command
// } else if (programToRun === "spotify-this-song") {
//     spotifyThisSong();
//     // movie-this command
// } else if (programToRun === "movie-this") {
//     movieThis();
//     // do-what-it-says command
// } else if (programToRun === "do-what-it-says") {
//     doWhatItSays();
// } else {
//     console.log("I don't know what you're doing!")
// }