function Snake() {
    this.heightOfTable = 30;
    this.widthOfTable = 30;
    this.snakeBody = ["0|0", "1|0", "2|0"];
    this.directions = {
        up: [0, -1],
        right: [1, 0],
        down: [0, 1],
        left: [-1, 0]
    };
    this.currentDirection = "right";
    this.haveWalls = true;
    this.gameOver = false;
}

Snake.prototype = {
    createTable: function() {
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
        document.body.appendChild(div);
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
        var tableCell = this.findCell(position);
        tableCell.innerHTML = "";
    },
    drawSnake: function() {
        for (var i = 0; i < this.snakeBody.length; i++) {
            this.addSnakePart(this.snakeBody[i]);
        }
    },
    addEventListeners: function() {
        var self = this;
        document.onkeydown = function(e) {
            switch (e.keyCode) {
                case 37:
                    self.currentDirection = "left";
                    console.log("left")
                    break
                case 38:
                    self.currentDirection = "up";
                    console.log("up")
                    break
                case 39:
                    self.currentDirection = "right";
                    console.log("right")
                    break
                case 40:
                    self.currentDirection = "down";
                    console.log("down")
                    break
            };
        };
    },
    hitWall: function(cellID) {
        var x = this.getX(cellID);
        console.log("x=" + x)
        var y = this.getY(cellID);
        console.log("y=" + y)
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
        this.createTable();
        this.addEventListeners();
        this.drawSnake();
        this.interval = setInterval(function() {
            // Get the id of last part of the snake.
            var lastPart = self.snakeBody[0];
            // Get the id of first part of the snake.
            var firstPart = self.snakeBody[self.snakeBody.length - 1];
            // Create id for the next part of the snake.
            var nextPartX = parseInt(self.getX(firstPart)) + self.directions[self.currentDirection][0];
            var nextPartY = parseInt(self.getY(firstPart)) + self.directions[self.currentDirection][1];
            var nextPart = nextPartX + "|" + nextPartY;
            // Check if next position is outside of the field.
            if (self.hitWall(nextPart) == true) {
                console.log("wall")
                if (self.haveWalls == true) {
                    console.log("have walls")
                    self.gameOver = true;
                    console.log("gameOver = " + self.gameOver)
                };
            };
            if (self.gameOver == true) {
                clearInterval(self.interval)
                console.log("jskldjf")
                self.ending();
            } else {
                self.snakeBody.shift();
                self.removeSnakePart(lastPart);
                self.addSnakePart(nextPart);
                self.snakeBody.push(nextPart);
            }
        }, 100);
    }
};

var snake = new Snake();
snake.play()