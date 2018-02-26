function getX(id) {
    // Return x coordinate from the id ("3|4")
    return id.substring(0, id.indexOf("|"));
};

function getY(id) {
    // Return y coordinate from the id ("3|4")
    return id.substring(id.indexOf("|") + 1, id.length);
};

function findCell(id) {
    // Find and return table cell with the given id
    return document.getElementById(id);
};

function findEmptyCell(width, height) {
    // Find empty cell in the table
    var randomCell = undefined;
    while (randomCell == undefined) {
        var randomX = Math.floor(Math.random() * width);
        var randomY = Math.floor(Math.random() * height);
        var randomCoord = randomX + "|" + randomY;
        var testCell = findCell(randomCoord);
        if (testCell.hasChildNodes() == false)
            randomCell = testCell;
    };
    return randomCell;
};