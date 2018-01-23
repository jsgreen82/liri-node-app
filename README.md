# liri-node-app


Overview
I created a node.js app called LIRI.

LIRI is a Language Interpretation and Recognition Interface.

LIRI will be a command line node app that takes in parameters and gives you back data.

LIRI will do any of the below command when you enter them into the command line.

my-tweets
spotify-this-song
movie-this
do-what-it-says
Type in node liri.js to get the instructions on how to enter the commands correctly. So if you were to type the below command you'd get the last 20 tweets I created (There may not be 20 tweets for me I just created an account)

node liri.js my-tweets
Example for spotify ScreenShot
node liri.js spotify-this-song '<song name here>'
shows the following information about the song in the terminal

artist(s)
song name
preview link of the song from spotify
album that the song is a part of
Example for movie

node liri.js movie-this '<movie name here>'
this would output the following information to the terminal:

Title
Year
IMDB Rating
Country
Language
Plot
Actors
Rotten Tomatoes Rating
Rotten Tomatoes URL
Example for do what it says

node liri.js do-what-it-says
These are the npm packages I used and are needed to run the app

fs package in node
twitter
spotify
request
to install these npm packages run these commands one at a time.

npm install twitter
npm install spotify
npm install request
