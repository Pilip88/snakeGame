var startGameButton = document.getElementById("start_button");
var newGameButton = document.getElementById("new_game_button");
var playAgainYesButton = document.getElementById("yesButton");
var playAgainNoButton = document.getElementById("noButton");

var homePage = document.getElementById("home_page");
var settingsPage = document.getElementById("settings");
var gamePage = document.getElementById("game_page");
var gameOverPage = document.getElementById("game_over");

var boardDimensions = {
    "small": 25,
    "medium": 30,
    "large": 35,
};

newGameButton.onclick = function(e) {
    e.preventDefault();
    homePage.style.display = "none";
    settingsPage.style.display = "block";
}
playAgainYesButton.onclick = function(e) {
    e.preventDefault();
    document.getElementById("board").innerHTML = "";
    gameOverPage.style.display = "none";
    gamePage.style.display = "block";
    game = new Game(lastSettings[0], lastSettings[1], lastSettings[1], lastSettings[2]);
    game.newGame();
};
playAgainNoButton.onclick = function(e) {
    e.preventDefault();
    homePage.style.display = "block";
    gameOverPage.style.display = "none";
    var board = document.getElementById("board");
    board.innerHTML = "";
};

startGameButton.onclick = function(e) {
    e.preventDefault();
    var numberOfPlayers;
    var haveWalls;
    var size;
    var form = document.getElementById("settings_form");
    var numberOfPlayersOptions = form.elements["number_of_players"];
    var wallOptions = form.elements["have_walls"];
    var sizeOptions = form.elements["size"];
    for (var i = 0; i < numberOfPlayersOptions.length; i++) {
        if (numberOfPlayersOptions[i].checked == true) {
            numberOfPlayers = numberOfPlayersOptions[i].value;
        };
    };
    for (var j = 0; j < wallOptions.length; j++) {
        if (wallOptions[j].checked == true) {
            if (wallOptions[j].value == "true") {
                haveWalls = true;
            } else {
                haveWalls = false;
            };
        };
    };
    for (var k = 0; k < sizeOptions.length; k++) {
        if (sizeOptions[k].checked == true) {
            size = sizeOptions[k].value;
        };
    };
    settingsPage.style.display = "none";
    gamePage.style.display = "block";
    game = new Game(numberOfPlayers, boardDimensions[size], boardDimensions[size], haveWalls);
    game.newGame();
    lastSettings = [numberOfPlayers, boardDimensions[size], haveWalls];
};

var gameOver = function(name, score) {
    var endScore = document.getElementById("end_score");
    homePage.style.display = "none";
    settingsPage.style.display = "none";
    gamePage.style.display = "none";
    gameOverPage.style.display = "block";
    if (name != undefined) {
        endScore.innerHTML = "Player " + name + " lose!";
    } else {
        endScore.innerHTML = "Your score is " + score;
    };
};
