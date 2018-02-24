function Board(height, width, numOfPlayers, haveWalls) {
    this.heightOfTable = height;
    this.widthOfTable = width;
    this.numOfPlayers = numOfPlayers;
    this.haveWalls = haveWalls;
    this.score = 0;
    this.snakeBody = ["0|0", "1|0", "2|0"];
    this.directions = {
        up: [0, -1],
        right: [1, 0],
        down: [0, 1],
        left: [-1, 0]
    };
    this.currentDirection = "right";
    this.gameOver = false;
    this.eating = false;
    this.speed = 100;
};

Board.prototype = {
    create: function() {
        var div = document.createElement("div");
        div.setAttribute("id", "mainTableDiv");
        var tableElement = document.createElement("table");
        tableElement.setAttribute("id", "mainTable");
        for (var y = 0; y < this.heightOfTable; y++) {
            var tableRow = document.createElement("tr");
            for (var x = 0; x < this.widthOfTable; x++) {
                var tableData = document.createElement("td");
                tableData.setAttribute("id", x + "|" + y);
                tableRow.appendChild(tableData);
            };
            tableElement.appendChild(tableRow);
        };
        div.appendChild(tableElement);
        var boardDiv = document.getElementById("board");
        boardDiv.appendChild(div);
    },
    getX: function(id) {
        return id.substring(0, id.indexOf("|"));
    },
    getY: function(id) {
        return id.substring(id.indexOf("|") + 1, id.length);
    },
    findCell: function(position) {
        var x = this.getX(position);
        var y = this.getY(position);
        var tableCell = document.getElementById(x + "|" + y);
        return tableCell;
    },
    addSnakePart: function(position) {
        var tableCell = this.findCell(position);
        var snakePart = document.createElement("div");
        snakePart.setAttribute("class", "snakeBody");
        tableCell.appendChild(snakePart);
    },
    removeSnakePart: function(position) {
        var positionX = this.getX(position);
        var positionY = this.getY(position);
        var tableCell = this.findCell(position);
        tableCell.innerHTML = "";
    },
    drawSnake: function() {
        for (var i = 0; i < this.snakeBody.length; i++) {
            this.addSnakePart(this.snakeBody[i]);
        }
    },
    findEmptyCell: function() {
        var randomCell = undefined;
        while (randomCell == undefined) {
            var randomX = Math.floor(Math.random() * (this.widthOfTable));
            var randomY = Math.floor(Math.random() * (this.heightOfTable));
            var randomCoord = randomX + "|" + randomY;
            var testCell = this.findCell(randomCoord);
            if (testCell.hasChildNodes() == false) {
                randomCell = testCell;
            };
        };
        return randomCell;
    },
    addFruit: function() {
        var emptyCell = this.findEmptyCell();
        var fruit = document.createElement("div");
        fruit.setAttribute("id", "fruit");
        emptyCell.appendChild(fruit);
    },
    addScore: function() {
        var scoreDiv = document.getElementById("setScore");
        this.score = this.score + 100;
        scoreDiv.innerHTML = this.score;
    },
    eatFruit: function() {
        var fruit = document.getElementById("fruit");
        fruit.parentNode.removeChild(fruit);
        this.addScore();
        this.addFruit();
    },
    checkForFruit: function(position) {
        var fruit = document.getElementById("fruit");
        var fruitCoord = fruit.parentNode.id;
        if (fruitCoord == position) {
            this.eating = true;
            this.eatFruit();
        };
    },
    bodyHit: function(position) {
        if (this.snakeBody.indexOf(position) >= 0)
            return true;
    },
    addEventListeners: function() {
        var self = this;
        document.onkeydown = function(e) {
            switch (e.keyCode) {
                case 37:
                    if (self.currentDirection != "right") {
                        self.currentDirection = "left";
                        break
                    } else {
                        self.currentDirection = "right";
                        break
                    };
                case 38:
                    if (self.currentDirection != "down") {
                        self.currentDirection = "up";
                        break
                    } else {
                        self.currentDirection = "down";
                        break
                    };
                case 39:
                    if (self.currentDirection != "left") {
                        self.currentDirection = "right";
                        break
                    } else {
                        self.currentDirection = "left";
                        break
                    };
                case 40:
                    if (self.currentDirection != "up") {
                        self.currentDirection = "down";
                        break
                    } else {
                        self.currentDirection = "up";
                        break
                    };
            };
        };
    },
    hitWall: function(cellID) {
        var x = this.getX(cellID);
        var y = this.getY(cellID);
        if (x < 0 || x >= this.widthOfTable) {
            return true;
        };
        if (y < 0 || y >= this.heightOfTable) {
            return true;
        };
        return false
    },
    ending: function() {
        document.body.innerHTML = "Game Over";
    },
    play: function() {
        var self = this;
        this.create();
        this.addEventListeners();
        this.drawSnake();
        this.addFruit();
        this.interval = setInterval(function() {
            var lastPart = self.snakeBody[0];
            var firstPart = self.snakeBody[self.snakeBody.length - 1];
            var nextPartX = parseInt(self.getX(firstPart)) + self.directions[self.currentDirection][0];
            var nextPartY = parseInt(self.getY(firstPart)) + self.directions[self.currentDirection][1];
            if (self.haveWalls == false) {
                if (nextPartX < 0) {
                    nextPartX = self.widthOfTable - 1;
                } else if (nextPartX > self.widthOfTable - 1) {
                    nextPartX = 0;
                } else if (nextPartY < 0) {
                    nextPartY = self.heightOfTable - 1;
                } else if (nextPartY > self.heightOfTable - 1) {
                    nextPartY = 0;
                };
            };
            var nextPart = nextPartX + "|" + nextPartY;
            if (self.hitWall(nextPart) == true) {
                if (self.haveWalls == true) {
                    self.gameOver = true;
                };
            };
            if (self.bodyHit(nextPart) == true) {
                self.gameOver = true;
            }
            if (self.gameOver == true) {
                clearInterval(self.interval)
                self.ending();
            } else {
                self.checkForFruit(nextPart);
                if (self.eating != true) {
                    self.snakeBody.shift();
                    self.removeSnakePart(lastPart);
                };
                self.addSnakePart(nextPart);
                self.snakeBody.push(nextPart);
                self.eating = false;
            };
        }, this.speed);
    }
};

var board = new Board(30, 30, 1, false);
board.play();
