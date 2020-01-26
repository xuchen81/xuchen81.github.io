$(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var size = urlParams.get('s') || 6;
    var n = parseInt(size);
    var boardSize = 750;
    var svgWidth = 1000, svgHight = 1000;
    var emptyColor = "#282c2d";
    var stepSize = 100;
    var svg = d3.select("#canvas").append("svg").attr("width", svgWidth).attr("height", svgHight);

    var existRow = 3;
    var blockGap = 10;
    var targetBlockColor = "red";
    var targetBlock = {
        sx: 1,
        sy: 3,
        width: 2,
        height: 1,
        fill: targetBlockColor
    };
    var blocks = [
        {
            sx: 1,
            sy: 1,
            width: 1,
            height: 2
        },
        {
            sx: 2,
            sy: 1,
            width: 2,
            height: 1
        },
        {
            sx: 3,
            sy: 2,
            width: 2,
            height: 1
        },
        {
            sx: 5,
            sy: 2,
            width: 1,
            height: 2
        },

        {
            sx: 3,
            sy: 3,
            width: 1,
            height: 2
        },
        {
            sx: 4,
            sy: 3,
            width: 1,
            height: 3
        },
        {
            sx: 1,
            sy: 4,
            width: 2,
            height: 1
        },
        {
            sx: 5,
            sy: 4,
            width: 2,
            height: 1
        },
        {
            sx: 1,
            sy: 5,
            width: 3,
            height: 1
        },
        {
            sx: 1,
            sy: 6,
            width: 3,
            height: 1
        },
        targetBlock
    ]

    var blockData = blocks.map(function(e) {
        e.direction = e.width > e.height? "x": "y";
        return e;
    });

    var gameBoardStroke = 10;
    svg.append("rect").attr("x", (svgWidth - boardSize) / 2)
        .attr("y", gameBoardStroke / 2)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("width", boardSize)
        .attr("height", boardSize)
        .attr('fill', '#9c6017')
        .attr("stroke-width", gameBoardStroke)
        .attr("stroke", "#9c6017");

    var data = [];
    var idx = 0;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            var x = j * boardSize/n + (svgWidth - boardSize) / 2;
            var y = i * boardSize/n + gameBoardStroke / 2;
            data.push({
                x: x,
                y: y,
                width: boardSize/n,
                height: boardSize/n,
                fill: emptyColor,
                stroke: "#9c6017",
                posn: i + "_" + j,
                id: "s_" + i + "_" + j,
                class: "spot"
            });
        }
    }

    svg.selectAll("rect[class='spot']")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return d.x;})
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("y", function(d) { return d.y;})
        .attr("width", function(d) { return d.width;})
        .attr("height", function(d) { return d.height;})
        .attr("fill", function(d) { return d.fill;})
        .attr("posn", function(d) { return d.posn;})
        .attr("stroke", "#9c6017")
        .attr("stroke-width", 3)
        .attr("id", function(d) { return "s_" + d.posn; })
        .attr("covered", "no");

    var exitX = n * boardSize/n + (svgWidth - boardSize) / 2;
    var exitY = (existRow - 1) * boardSize/n + gameBoardStroke / 2;

    svg.append("rect")
        .attr("x", exitX)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("y", exitY)
        .attr("width", 100)
        .attr("height", boardSize/n)
        .attr("fill", emptyColor);


    svg.selectAll("rect[class='block']")
        .data(blockData)
        .enter()
        .append("rect")
        .attr("x", function(d) { return (d.sx - 1) * boardSize/n + (svgWidth - boardSize) / 2 + blockGap;})
        .attr("y", function(d) { return (d.sy - 1) * boardSize/n + gameBoardStroke / 2 + blockGap;})
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("width", function(d) { return d.width * boardSize/n - 2 * blockGap;})
        .attr("height", function(d) { return d.height * boardSize/n - 2 * blockGap;})
        .attr("block-width", function(d) { return d.width;})
        .attr("block-height", function(d) { return d.height;})
        .attr("fill",  function(d) { return d.fill || "orange";})
        .attr("curry", function(d) { return d.sy - 1;})
        .attr("currx", function(d) { return d.sx - 1;})
        .attr("posn", function(d) { return (d.sy - 1) + "_" + (d.sx - 1);})
        .attr("stroke", "#9c6017")
        .attr("stroke-width", 3)
        .attr("class", "block")
        .attr("id", function(d) { return d.fill? "target" : ""; });

    var targetBlockWidth = d3.select("#target").attr("block-width");
    var targetI = existRow - 1;
    var targetJ = n - targetBlockWidth;

    for (var i = 0; i < blockData.length; i++) {
        if (blockData[i].width > 1) {
            for (var j = 0; j < blockData[i].width; j++) {
                d3.select("#s_" + (blockData[i].sy - 1) + "_" + (blockData[i].sx - 1 + j))
                    .attr("covered", "yes");
            }
        }
        if (blockData[i].height > 1) {
            for (var j = 0; j < blockData[i].height; j++) {
                d3.select("#s_" + (blockData[i].sy - 1 + j) + "_" + (blockData[i].sx - 1))
                    .attr("covered", "yes");
            }
        }
    }

    var checkComplete = function() {
        return d3.select("#target").attr("posn") === targetI + "_" + targetJ;
    }

    var move = function(i, j, width, height, dir) {
        var targetI, targetJ;
        var toUncover = [];
        var toCover = [];
        if (dir === "left") {
            targetI = i;
            var x = j - 2;
            while (x >= 0 && d3.select("#s_" + i + "_" + x).attr("covered") === "no") {
                x -= 1;
            }
            targetJ = x + 1;
        }

        if (dir === "right") {
            targetI = i;
            var endX = j + width - 1 + 2;
            // var x = j + 2;
            while (endX < n && d3.select("#s_" + i + "_" + endX).attr("covered") === "no") {
                endX += 1;
            }
            targetJ = endX - width;
        }

        if (dir === "up") {
            targetJ = j;
            var y = i - 2;
            while (y >= 0 && d3.select("#s_" + y + "_" + j).attr("covered") === "no") {
                y -= 1;
            }
            targetI = y + 1;
        }

        if (dir === "down") {
            targetJ = j;
            var endY = i + height - 1 + 2;
            while (endY < n && d3.select("#s_" + endY + "_" + j).attr("covered") === "no") {
                endY += 1;
            }
            targetI = endY - height;
        }

        if (dir === "left" || dir === "right") {
            for (var w = 0; w < width; w++) {
                toUncover.push([i, j + w]);
                toCover.push([targetI, targetJ + w]);
            }
        }

        if (dir === "up" || dir === "down") {
            for (var h = 0; h < height; h++) {
                toUncover.push([i + h, j]);
                toCover.push([targetI + h, targetJ]);
            }
        }

        toUncover.forEach(function(e) {
            d3.select("#s_" + e[0] + "_" + e[1]).attr("covered", "no");
        });
        toCover.forEach(function(e) {
            d3.select("#s_" + e[0] + "_" + e[1]).attr("covered", "yes");
        });

        d3.select("rect[class=block][posn='" + i + "_" + j +  "']")
            .transition()
            .duration(200)
            .attr("x", targetJ * boardSize/n + (svgWidth - boardSize) / 2 + blockGap)
            .attr("y", targetI * boardSize/n + gameBoardStroke / 2 + blockGap)
            .attr("posn", targetI + "_" + targetJ)
            .attr("currx", targetJ)
            .attr("curry", targetI);

        setTimeout(function() {
            if (checkComplete()) {
                var currX = parseInt(d3.select("#target").attr("x"));
                d3.select("#target").transition().duration(100).attr("x", currX + 50);
                setTimeout(function() {
                    alert("Congrats! You win! 🎉");
                }, 100);
            }
        }, 500)

        return [targetI, targetJ];
    }

    d3.selectAll("rect[class='block']").on("click", function(d) {
        if (checkComplete()) {
            alert("You have complete this game! Congrats! 🎉")
            return;
        }
        var i = parseInt(d3.select(this).attr("curry")), j = parseInt(d3.select(this).attr("currx"));

        if (d.direction === "x") {
            var endJ = j + d.width - 1;
            if ((j === 0 || d3.select("#s_" + i + "_" + (j - 1)).attr("covered") === "yes") &&
                (endJ === n - 1 || d3.select("#s_" + i + "_" + (endJ + 1)).attr("covered") === "yes")) {
                return;
            }
            var canLeft, canRight;
            if (j > 0 && d3.select("#s_" + i + "_" + (j - 1)).attr("covered") === "no") {
                canLeft = true;
            }
            if (endJ < n - 1 && d3.select("#s_" + i + "_" + (endJ + 1)).attr("covered") === "no") {
                canRight = true;
            }
            if (canLeft && canRight) {
                var clickedX = d3.mouse(this)[0];
                if (clickedX > parseInt(d3.select(this).attr("x")) + parseInt(d3.select(this).attr("width")) / 2) {
                    move(i, j, d.width, d.height, "right");
                } else {
                    move(i, j, d.width, d.height, "left");
                }
            } else if (canLeft) {
                move(i, j, d.width, d.height, "left");
            } else if (canRight) {
                move(i, j, d.width, d.height, "right");
            }
        } else {
            var endI = i + d.height - 1;
            if ((i === 0 || d3.select("#s_" + (i-1) + "_" + j).attr("covered") === "yes") &&
                (endI === n - 1 || d3.select("#s_" + (endI + 1) + "_" + j).attr("covered") === "yes")) {
                return;
            }
            var canUp, canDown;
            if (i > 0 && d3.select("#s_" + (i-1) + "_" + j).attr("covered") === "no") {
                canUp = true;
            }
            if (endI < n - 1 && d3.select("#s_" + (endI+1) + "_" + j).attr("covered") === "no") {
                canDown = true;
            }
            if (canUp && canDown) {
                var clickedY = d3.mouse(this)[1];
                if (clickedY > parseInt(d3.select(this).attr("y")) + parseInt(d3.select(this).attr("height")) / 2) {
                    move(i, j, d.width, d.height, "down");
                } else {
                    move(i, j, d.width, d.height, "up");
                }
            } else if (canUp) {
                move(i, j, d.width, d.height, "up");
            } else if (canDown) {
                move(i, j, d.width, d.height, "down");
            }
        }
    })
});