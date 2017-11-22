var Twitter = require('twitter');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");
var arg1 = process.argv[2];
var nodeArgv = process.argv;

var x = "";
//attaches multiple word arguments
for (var i = 3; i < nodeArgv.length; i++) {
    if (i > 3 && i < nodeArgv.length) {
        x = x + "+" + nodeArgv[i];
    } else {
        x = x + nodeArgv[i];
    }
}

var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});


function getTweets() {
    var params = {
        screen_name: 'halfabrickaway'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text + " Created on: " + tweets[i].created_at);
                fs.appendFile('log.txt', tweets[i].text + " Created on: " + tweets[i].created_at + "\n");
            }
            fs.appendFile('log.txt', "-----------------------");
        } else {
            console.log(error);
        }
    });
}


function omdbData(movie) {
    var omdbURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request(omdbURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);

            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);

            //adds text to log.txt
            fs.appendFile('log.txt', "Title: " + body.Title);
            fs.appendFile('log.txt', "Release Year: " + body.Year);
            fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
            fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
            fs.appendFile('log.txt', "Country: " + body.Country);
            fs.appendFile('log.txt', "Language: " + body.Language);
            fs.appendFile('log.txt', "Plot: " + body.Plot);
            fs.appendFile('log.txt', "Actors: " + body.Actors);
            fs.appendFile('log.txt', "-----------------------");



        } else {
            console.log(error)
        }
        if (movie === "Mr. Nobody") {
            console.log("-----------------------");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");

            //adds text to log.txt
            fs.appendFile('log.txt', "-----------------------");
            fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            fs.appendFile('log.txt', "It's on Netflix!");
        }
    });

}

function spotifySong(x) {
    var spotify = new Spotify({
        id: keys.spotifyKeys.id,
        secret: keys.spotifyKeys.secret
    });

    spotify.search({
        type: 'track',
        query: x
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //artist
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        //song name
        console.log("Song: " + data.tracks.items[0].name);
        //spotify preview link
        console.log("Preview URL: " + data.tracks.items[0].preview_url);
        //album name
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("-----------------------");

        //adds text to log.txt
        fs.appendFile('log.txt', data.tracks.items[0].artists[0].name);
        fs.appendFile('log.txt', data.tracks.items[0].name);
        fs.appendFile('log.txt', data.tracks.items[0].preview_url);
        fs.appendFile('log.txt', data.tracks.items[0].album.name);
        fs.appendFile('log.txt', "-----------------------");


    })
};


switch (arg1) {
    case "my-tweets":
        getTweets();
        break;
    case "spotify-this-song":
        if (x) {
            spotifySong(x);
        } else {
            spotifySong("The Sign");
        }
        break;
    case "movie-this":
        if (x) {
            omdbData(x);
        } else {
            omdbData("Mr. Nobody")
        }
        break;
    case "do-what-it-says":
        whatItSays();
        break;
}

function whatItSays() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        var txt = data.split(',');

        spotifySong(txt[1]);
    });
}