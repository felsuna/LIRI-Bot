require("dotenv").config();

const keys = require("./keys");
const axios = require("axios");
const Spotify = require("node-spotify-api")
const moment = require("moment");
const spotify = new Spotify(keys.spotify);


const programToRun = process.argv[2];
const action = process.argv[3];

if (programToRun === "concert-this") {
    concertThis(action);
} else if (programToRun === "spotify-this-song") {
    spotifyThisSong();
} else if (programToRun === "movie-this") {
    movieThis();
} else if (programToRun === "do-what-it-says") {
    doWhatItSays();
} else {
    console.log("I don't know what you're doing!")
}

function concertThis(artist = "Incubus") {
    const queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL)
        .then(function (response) {
            // Name of the venue
            console.log(response.data[0].lineup[0])
            // Venue location
            console.log(response.data[0].venue.city + ", " + response.data[0].venue.region)
            // Date of the Event (use moment to format this as "MM/DD/YYYY"
            console.log(moment(response.data[0].datetime).format('MM/DD/YYYY'))
        })
}

function spotifyThisSong() {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}

function movieThis() {
    console.log("running movie program")
}

function doWhatItSays() {
    console.log("running do-what program")
}
