var onePlayerButton = document.getElementById("one_player_button");
var twoPlayerButton = document.getElementById("two_player_button");
var startButtons = document.getElementsByName("start_button");
var playAgainYesButton = document.getElementById("yesButton");
var playAgainNoButton = document.getElementById("noButton");

var homePage = document.getElementById("home_page");
var onePlayerSettingsPage = document.getElementById("one_player_settings_page");
var twoPlayerSettingsPage = document.getElementById("two_player_settings_page");
var gamePage = document.getElementById("game_page");
var gameOverPage = document.getElementById("game_over");

var boardDimensions = {
    "small": 25,
    "medium": 30,
    "large": 35,
};

onePlayerButton.onclick = function(e) {
    e.preventDefault();
    homePage.style.display = "none";
    onePlayerSettingsPage.style.display = "block";
};
twoPlayerButton.onclick = function(e) {
    e.preventDefault();
    homePage.style.display = "none";
    twoPlayerSettingsPage.style.display = "block";
};
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
for (var k = 0; k < startButtons.length; k++) {
    startButtons[k].onclick = function(e) {
        e.preventDefault();
        var haveWalls;
        var size;
        var form = document.getElementById("form" + this.id[this.id.length - 1]);
        var wallOptions = form.elements["haveWalls"];
        var sizeOptions = form.elements["size"];
        var numberOfPlayers = this.id[this.id.length - 1];
        for (var i = 0; i < wallOptions.length; i++) {
            if (wallOptions[i].checked == true) {
                if (wallOptions[i].value == "true"){
                    haveWalls = true;
                } else {
                    haveWalls = false;
                }
            };
        };
        for (var j = 0; j < sizeOptions.length; j++) {
            if (sizeOptions[j].checked == true) {
                size = sizeOptions[j].value;
            }
        };
        onePlayerSettingsPage.style.display = "none";
        twoPlayerSettingsPage.style.display = "none";
        gamePage.style.display = "block";
        game = new Game(numberOfPlayers, boardDimensions[size], boardDimensions[size], haveWalls);
        game.newGame();
        lastSettings = [numberOfPlayers, boardDimensions[size], haveWalls];
    };
};

var gameOver = function() {
    homePage.style.display = "none";
    onePlayerSettingsPage.style.display = "none";
    twoPlayerSettingsPage.style.display = "none";
    gamePage.style.display = "none";
    gameOverPage.style.display = "block";
}
