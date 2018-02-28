function Game(numOfPlayers, heightOfBoard, widthOfBoard, haveWalls) {
    this.numOfPlayers = numOfPlayers;
    this.heightOfBoard = heightOfBoard;
    this.widthOfBoard = widthOfBoard;
    this.haveWalls = haveWalls;
    this.snakes = [];
    this.stillPlaying = true;
    this.speed = 100;
};

function Board(haveWalls) {};

function Snake(name) {
    this.name = name;
    this.eating = false;
    this.gameOver = false;
    this.score = 0;
    this.startSize = 3;
    this.moved = false;
    this.directions = {
        up: [0, -1],
        right: [1, 0],
        down: [0, 1],
        left: [-1, 0]
    };
    if (this.name == 1) {
        this.snakeBody = ["0|0", "1|0", "2|0"];
        this.currentDirection = "right";
    } else {
        this.snakeBody = [
            (game.widthOfBoard - 1) + "|" + (game.heightOfBoard - 1),
            (game.widthOfBoard - 2) + "|" + (game.heightOfBoard - 1),
            (game.widthOfBoard - 3) + "|" + (game.heightOfBoard - 1)
            ];
        this.currentDirection = "left";
    };
};

function Fruit() {};

Game.prototype = {
    newGame: function() {
        var self = this;
        this.board = new Board(this.haveWalls);
        this.board.init(this.heightOfBoard, this.widthOfBoard);
        for (i = 0; i < this.numOfPlayers; i++) {
            var snake = new Snake(i + 1, this.heightOfBoard, this.widthOfBoard);
            snake.init();
            this.snakes.push(snake);
        };
        if (this.numOfPlayers == 1) {
            document.getElementById("score2").innerHTML = "";
        } else {
            document.getElementById("score2").innerHTML = 'Player 2 score: <span id="setScore2">0</span>'
        }
        this.addControls();
        var fruit = new Fruit();
        fruit.init();
        this.interval = setInterval(function() {
            for (i = 0; i < self.snakes.length; i++) {
                self.snakes[i].moved = false;
                if (self.snakes.indexOf(self.snakes[i]) - 1 >= 0) {
                    var secondSnake = self.snakes[i-1];
                } else if (self.snakes.indexOf(self.snakes[i]) + 1 >= 0) {
                    var secondSnake = self.snakes[i+1];
                };
                self.snakes[i].move(secondSnake)
                if (self.snakes[i].gameOver == true) {
                    clearInterval(self.interval);
                    if (self.snakes.length > 1) {
                        self.ending(self.snakes[i].name);
                    } else {
                        self.ending(undefined, self.snakes[0].score);
                    };
                };
            };
        }, this.speed)
    },
    ending: function(nameOfSnake, score) {
        gameOver(nameOfSnake, score)
    },
    addControls: function() {
        var self = this;
        document.onkeydown = function(e) {
            switch (e.keyCode) {
                case 37:
                    if (self.snakes[0].currentDirection != "right") {
                        if (self.snakes[0].moved == false) {
                            self.snakes[0].currentDirection = "left";
                            self.snakes[0].moved = true;
                            break
                        };
                        break
                    } else {
                        self.snakes[0].currentDirection = "right";
                        break
                    };
                case 38:
                    if (self.snakes[0].currentDirection != "down") {
                        if (self.snakes[0].moved == false) {
                            self.snakes[0].currentDirection = "up";
                            self.snakes[0].moved = true;
                            break
                        };
                        break
                    } else {
                        self.snakes[0].currentDirection = "down";
                        break
                    };
                case 39:
                    if (self.snakes[0].currentDirection != "left") {
                        if (self.snakes[0].moved == false) {
                            self.snakes[0].currentDirection = "right";
                            self.snakes[0].moved = true;
                            break
                        };
                        break
                    } else {
                        self.snakes[0].currentDirection = "left";
                        break
                    };
                case 40:
                    if (self.snakes[0].currentDirection != "up") {
                        if (self.snakes[0].moved == false) {
                            self.snakes[0].currentDirection = "down";
                            self.snakes[0].moved = true;
                            break
                        };
                        break
                    } else {
                        self.snakes[0].currentDirection = "up";
                        break
                    };
                case 65:
                    if (self.snakes[1].currentDirection != "right") {
                        if (self.snakes[1].moved == false) {
                            self.snakes[1].currentDirection = "left";
                            self.snakes[1].moved = true;
                            break
                        };
                        break
                    } else {
                        self.snakes[1].currentDirection = "right";
                        break
                    };
                case 87:
                    if (self.snakes[1].currentDirection != "down") {
                        if (self.snakes[1].moved == false) {
                            self.snakes[1].currentDirection = "up";
                            self.snakes[1].moved = true;
                            break
                        };
                        break
                    } else {
                        self.snakes[1].currentDirection = "down";
                        break
                    };
                case 68:
                    if (self.snakes[1].currentDirection != "left") {
                        if (self.snakes[1].moved == false) {
                            self.snakes[1].currentDirection = "right";
                            self.snakes[1].moved = true;
                            break
                        };
                        break
                    } else {
                        self.snakes[1].currentDirection = "left";
                        break
                    };
                case 83:
                    if (self.snakes[1].currentDirection != "up") {
                        if (self.snakes[1].moved == false) {
                            self.snakes[1].currentDirection = "down";
                            self.snakes[1].moved = true;
                            break
                        };
                        break
                    } else {
                        self.snakes[1].currentDirection = "up";
                        break
                    };
            }
        }
    }
};

Board.prototype = {
    init: function(height, width) {
        var tableElement = document.createElement("table");
        tableElement.setAttribute("id", "mainTable");
        for (var y = 0; y < height; y++) {
            var tableRow = document.createElement("tr");
            for (var x = 0; x < width; x++) {
                var tableData = document.createElement("td");
                tableData.setAttribute("id", x + "|" + y);
                tableRow.appendChild(tableData);
            };
            tableElement.appendChild(tableRow);
        };
        var boardDiv = document.getElementById("board");
        boardDiv.appendChild(tableElement);
    }
};

Snake.prototype = {
    init: function() {
        for (var i = 0; i < this.snakeBody.length; i++) {
            this.addSnakePart(this.snakeBody[i]);
        };
    },
    addSnakePart: function(id) {
        var tableCell = findCell(id);
        var snakePart = document.createElement("div");
        snakePart.setAttribute("class", "snakeBody" + this.name);
        tableCell.appendChild(snakePart);
    },
    hitWall: function(position) {
        var x = getX(position);
        var y = getY(position);
        if (x < 0 || x >= game.widthOfBoard)
            return true;
        if (y < 0 || y >= game.heightOfBoard)
            return true;
        return false;
    },
    checkForFruit: function(position) {
        var fruit = document.getElementById("fruit");
        var fruitCoord = fruit.parentNode.id;
        if (fruitCoord == position) {
            this.eating = true;
            this.eatFruit(fruit);
        };
    },
    eatFruit: function(fruit) {
        fruit.parentNode.removeChild(fruit);
        this.addScore();
        newFruit = new Fruit();
        newFruit.init();
        game.speed = game.speed - 10;
    },
    addScore: function() {
        var scoreDiv = document.getElementById("setScore" + this.name);
        this.score = this.score + 100;
        scoreDiv.innerHTML = this.score;
    },
    removeSnakePart: function(position) {
        var tableCell = findCell(position);
        tableCell.innerHTML = "";
    },
    bodyHit: function(position, secondSnake) {
        if (this.snakeBody.indexOf(position) >= 0)
            return true;
        if (secondSnake != undefined && secondSnake.snakeBody.indexOf(position) >= 0)
            return true;
        return false;
    },
    move: function(secondSnake) {
        var lastPart = this.snakeBody[0];
        var firstPart = this.snakeBody[this.snakeBody.length - 1];
        var nextPartX = parseInt(getX(firstPart)) + this.directions[this.currentDirection][0];
        var nextPartY = parseInt(getY(firstPart)) + this.directions[this.currentDirection][1];
        if (game.haveWalls == false) {
            if (nextPartX < 0) {
                nextPartX = game.widthOfBoard - 1;
            } else if (nextPartX > game.widthOfBoard - 1) {
                nextPartX = 0;
            } else if (nextPartY < 0) {
                nextPartY = game.heightOfBoard - 1;
            } else if (nextPartY > game.heightOfBoard - 1) {
                nextPartY = 0;
            };
        } else {
            if (this.hitWall(nextPartX + "|" + nextPartY) == true) {
                this.gameOver = true;
                game.stillPlaying = false;
            }
        }
        var nextPart = nextPartX + "|" + nextPartY;
        if (this.bodyHit(nextPart, secondSnake) == true) {
            this.gameOver = true;
            game.stillPlaying = false;
        };
        if (this.gameOver != true && game.stillPlaying == true) {
            this.checkForFruit(nextPart);
            if (this.eating != true) {
                this.snakeBody.shift();
                this.removeSnakePart(lastPart);
            };
            this.addSnakePart(nextPart);
            this.snakeBody.push(nextPart);
            this.eating = false;
        };
    },
};

Fruit.prototype = {
    init: function() {
        var emptyCell = findEmptyCell(game.heightOfBoard, game.widthOfBoard);
        var fruit = document.createElement("div");
        fruit.setAttribute("id", "fruit");
        emptyCell.appendChild(fruit);
    }
};
