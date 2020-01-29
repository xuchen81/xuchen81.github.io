$(function function_name() {
    var urlParams = new URLSearchParams(window.location.search);
    var level = parseInt(urlParams.get('l')) || 1;
    var svgWidth = 1000, svgHeight = 1000;
    var cellSize = 50;
    var emptyColor = "#486762";
    var wallColor = "#b7b7bd";
    var targetColor = "#f05454";
    var boxGap = 2;
    var boxColor = "#9c6017";
    var boxOuterColor = "#693f0c";
    var boxMatchColor = "#26bd3c";
    var boxMatchOuterColor = "#185221";
    var playerColor = "#32acd1";
    var playerOuterColor = "#0b6e8c";
    var boxMoveDuration = 150;


    var gameBoardStroke = 10;
    var boardXCell = 12;
    var boardYCell = 15;
    var boardWidth = boardXCell * cellSize;
    var boardHeight = boardYCell * cellSize;
    var sixBySixWall = [
        {x: 4, y: 5},
        {x: 4, y: 6},
        {x: 4, y: 7},
        {x: 4, y: 8},
        {x: 4, y: 9},
        {x: 4, y: 10},
        {x: 5, y: 10},
        {x: 6, y: 10},
        {x: 7, y: 10},
        {x: 8, y: 10},
        {x: 9, y: 10},
        {x: 9, y: 9},
        {x: 9, y: 8},
        {x: 9, y: 7},
        {x: 9, y: 6},
        {x: 9, y: 5},
        {x: 5, y: 5},
        {x: 6, y: 5},
        {x: 7, y: 5},
        {x: 8, y: 5}
    ];
    var wallData = [
        sixBySixWall.concat([{x: 6, y: 8}]),
        sixBySixWall.concat([{x: 6, y: 8}]),
        sixBySixWall.concat([{x: 7, y: 8}]),
        sixBySixWall.concat([{x: 7, y: 8}]),
        [
            {x: 3, y: 4},
            {x: 4, y: 4},
            {x: 5, y: 4},
            {x: 6, y: 4},
            {x: 7, y: 4},
            {x: 3, y: 5},
            {x: 3, y: 6},
            {x: 3, y: 7},
            {x: 4, y: 7},
            {x: 4, y: 8},
            {x: 4, y: 9},
            {x: 4, y: 10},
            {x: 4, y: 11},
            {x: 5, y: 11},
            {x: 6, y: 11},
            {x: 7, y: 11},
            {x: 8, y: 11},
            {x: 8, y: 10},
            {x: 8, y: 9},
            {x: 9, y: 9},
            {x: 10, y: 9},
            {x: 10, y: 8},
            {x: 10, y: 7},
            {x: 10, y: 6},
            {x: 9, y: 6},
            {x: 8, y: 6},
            {x: 8, y: 5},
            {x: 7, y: 5},
        ],
        [
            {x: 2, y: 4},
            {x: 3, y: 4},
            {x: 4, y: 4},
            {x: 5, y: 4},
            {x: 6, y: 4},
            {x: 2, y: 5},
            {x: 2, y: 6},
            {x: 2, y: 7},
            {x: 2, y: 8},
            {x: 3, y: 8},
            {x: 4, y: 8},
            {x: 3, y: 9},
            {x: 4, y: 9},
            {x: 3, y: 10},
            {x: 3, y: 11},
            {x: 3, y: 12},
            {x: 4, y: 12},
            {x: 5, y: 12},
            {x: 6, y: 12},
            {x: 7, y: 12},
            {x: 7, y: 11},
            {x: 7, y: 10},
            {x: 8, y: 11},
            {x: 9, y: 11},
            {x: 10, y: 11},
            {x: 10, y: 10},
            {x: 10, y: 9},
            {x: 10, y: 8},
            {x: 10, y: 7},
            {x: 10, y: 6},
            {x: 9, y: 6},
            {x: 8, y: 6},
            {x: 8, y: 7},
            {x: 8, y: 8},
            {x: 7, y: 8},
            {x: 6, y: 8},
            {x: 6, y: 7},
            {x: 6, y: 6},
            {x: 6, y: 5}
        ],
        [
            {x: 3, y: 5},
            {x: 3, y: 6},
            {x: 3, y: 7},
            {x: 2, y: 7},
            {x: 2, y: 8},
            {x: 2, y: 9},
            {x: 2, y: 10},
            {x: 3, y: 10},
            {x: 3, y: 11},
            {x: 4, y: 11},
            {x: 5, y: 11},
            {x: 6, y: 11},
            {x: 7, y: 11},
            {x: 8, y: 11},
            {x: 9, y: 11},
            {x: 10, y: 11},
            {x: 10, y: 10},
            {x: 10, y: 9},
            {x: 11, y: 9},
            {x: 11, y: 8},
            {x: 11, y: 7},
            {x: 11, y: 6},
            {x: 10, y: 6},
            {x: 9, y: 6},
            {x: 9, y: 5},
            {x: 8, y: 5},
            {x: 7, y: 5},
            {x: 6, y: 5},
            {x: 5, y: 5},
            {x: 4, y: 5},
            {x: 5, y: 7},
            {x: 6, y: 7},
            {x: 7, y: 7},
            {x: 6, y: 9},
            {x: 6, y: 10},
        ],
        [
            {x: 5, y: 4},
            {x: 5, y: 5},
            {x: 4, y: 5},
            {x: 4, y: 6},
            {x: 4, y: 7},
            {x: 4, y: 8},
            {x: 4, y: 9},
            {x: 4, y: 10},
            {x: 4, y: 11},
            {x: 5, y: 11},
            {x: 6, y: 11},
            {x: 7, y: 11},
            {x: 8, y: 11},
            {x: 9, y: 11},
            {x: 9, y: 10},
            {x: 9, y: 9},
            {x: 9, y: 8},
            {x: 9, y: 7},
            {x: 8, y: 7},
            {x: 8, y: 6},
            {x: 8, y: 5},
            {x: 8, y: 4},
            {x: 7, y: 4},
            {x: 6, y: 4},
            {x: 5, y: 7},
            {x: 5, y: 8}
        ],
        [
            {x: 4, y: 4},
            {x: 4, y: 5},
            {x: 4, y: 6},
            {x: 4, y: 7},
            {x: 3, y: 7},
            {x: 3, y: 8},
            {x: 3, y: 9},
            {x: 3, y: 10},
            {x: 3, y: 11},
            {x: 4, y: 11},
            {x: 5, y: 11},
            {x: 6, y: 11},
            {x: 7, y: 11},
            {x: 8, y: 11},
            {x: 9, y: 11},
            {x: 10, y: 11},
            {x: 10, y: 10},
            {x: 10, y: 9},
            {x: 10, y: 8},
            {x: 10, y: 7},
            {x: 9, y: 7},
            {x: 9, y: 6},
            {x: 9, y: 5},
            {x: 8, y: 5},
            {x: 7, y: 5},
            {x: 7, y: 4},
            {x: 6, y: 4},
            {x: 5, y: 4},
            {x: 5, y: 7},
            {x: 5, y: 8},
            {x: 7, y: 7},
            {x: 7, y: 8},
            {x: 8, y: 9}
        ],
        [
            {x: 5, y: 4},
            {x: 5, y: 5},
            {x: 4, y: 5},
            {x: 4, y: 6},
            {x: 4, y: 7},
            {x: 4, y: 8},
            {x: 4, y: 9},
            {x: 3, y: 9},
            {x: 2, y: 9},
            {x: 2, y: 10},
            {x: 2, y: 11},
            {x: 3, y: 11},
            {x: 4, y: 11},
            {x: 5, y: 11},
            {x: 6, y: 11},
            {x: 7, y: 11},
            {x: 8, y: 11},
            {x: 9, y: 11},
            {x: 10, y: 11},
            {x: 10, y: 10},
            {x: 10, y: 9},
            {x: 11, y: 9},
            {x: 11, y: 8},
            {x: 11, y: 7},
            {x: 11, y: 6},
            {x: 11, y: 5},
            {x: 11, y: 4},
            {x: 10, y: 4},
            {x: 9, y: 4},
            {x: 8, y: 4},
            {x: 7, y: 4},
            {x: 6, y: 4},
            {x: 8, y: 5},
            {x: 8, y: 6},
            {x: 8, y: 8},
            {x: 8, y: 9},
            {x: 7, y: 8}
        ]
    ];

    var targetSpots = [
        [
            {x: 6, y: 6},
            {x: 8, y: 8}
        ],
        [
            {x: 7, y: 6},
            {x: 8, y: 6},
            {x: 5, y: 7},
            {x: 5, y: 9}
        ],
        [
            {x: 6, y: 6},
            {x: 8, y: 6},
            {x: 5, y: 9}
        ],
        [
            {x: 6, y: 6},
            {x: 7, y: 9},
            {x: 8, y: 9}
        ],
        [
            {x: 6, y: 6},
            {x: 6, y: 7},
            {x: 6, y: 8},
            {x: 6, y: 9},
            {x: 6, y: 10}
        ],
        [
            {x: 9, y: 7},
            {x: 9, y: 8},
            {x: 9, y: 9}
        ],
        [
            {x: 4, y: 9},
            {x: 5, y: 9},
            {x: 4, y: 10},
            {x: 5, y: 10}
        ],
        [
            {x: 5, y: 9},
            {x: 5, y: 10},
            {x: 6, y: 10},
            {x: 7, y: 10},
            {x: 8, y: 10},
        ],
        [
            {x: 4, y: 8},
            {x: 4, y: 9},
            {x: 4, y: 10}
        ],
        [
            {x: 3, y: 10},
            {x: 4, y: 10},
            {x: 5, y: 10},
            {x: 6, y: 10},
            {x: 7, y: 10}
        ]
    ];

    var boxData = [
        [
            {x: 6,y: 7},
            {x: 7,y: 8},
        ],
        [
            {x: 6,y: 7},
            {x: 7,y: 8},
            {x: 6,y: 9},
            {x: 8,y: 8}
        ],
        [
            {x: 6,y: 7},
            {x: 7,y: 7},
            {x: 8,y: 7}
        ],
        [
            {x: 6, y: 6},
            {x: 6, y: 7},
            {x: 7, y: 7}
        ],
        [
            {x: 6, y: 6},
            {x: 6, y: 7},
            {x: 6, y: 8},
            {x: 5, y: 9},
            {x: 7, y: 9}
        ],
        [
            {x: 4, y: 6},
            {x: 4, y: 7},
            {x: 5, y: 6}
        ],
        [
            {x: 4, y: 7},
            {x: 6, y: 8},
            {x: 9, y: 8},
            {x: 8, y: 9},
        ],
        [
            {x: 6, y: 6},
            {x: 6, y: 7},
            {x: 6, y: 9},
            {x: 7, y: 8},
            {x: 7, y: 10}
        ],
        [
            {x: 6, y: 6},
            {x: 5, y: 9},
            {x: 8, y: 10}
        ],
        [
            {x: 5, y: 7},
            {x: 7, y: 7},
            {x: 9, y: 7},
            {x: 6, y: 8},
            {x: 6, y: 9},
        ]
    ];
    var playerData = [
        {x: 7, y: 7},
        {x: 8, y: 9},
        {x: 6, y: 8},
        {x: 8, y: 8},
        {x: 8, y: 7},
        {x: 3, y: 5},
        {x: 4, y: 8},
        {x: 5, y: 6},
        {x: 5, y: 6},
        {x: 10, y: 5}
    ];

    var svg = d3.select("#canvas").append("svg").attr("width", svgWidth).attr("height", svgHeight);
    var data = [];
    svg.append("rect").attr("x", (svgWidth - boardWidth) / 2)
        .attr("y", gameBoardStroke / 2)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("width", boardWidth)
        .attr("height", boardHeight)
        .attr('fill', '#5d8679')
        .attr("stroke-width", gameBoardStroke)
        .attr("stroke", "#9c6017");

    for (var i = 0; i < boardYCell; i++) {
        for (var j = 0; j < boardXCell; j++) {
            var x = j * cellSize + (svgWidth - boardWidth) / 2;
            var y = i * cellSize + gameBoardStroke / 2;
            data.push({
                x: x,
                y: y,
                width: cellSize,
                height: cellSize,
                fill: emptyColor,
                stroke: "white",
                posn: i + "_" + j,
                id: "s_" + i + "_" + j,
                class: "cell"
            });
        }
    }

    svg.selectAll("rect[class='cell']")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return d.x;})
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("y", function(d) { return d.y;})
        .attr("width", function(d) { return d.width;})
        .attr("height", function(d) { return d.height;})
        .attr("fill", function(d) { return d.fill;})
        .attr("posn", function(d) { return d.posn;})
        .attr("stroke", "#5d8679")
        .attr("stroke-width", 1)
        .attr("id", function(d) { return "s_" + d.posn; })
        .attr("class", "cell")
        .attr("covered", "no");

    var wall = wallData[level-1];
    svg.selectAll("rect[class='wall']")
        .data(wall)
        .enter()
        .append("rect")
        .attr("x", function(d) { return (d.x - 1) * cellSize + (svgWidth - boardWidth) / 2 ;})
        .attr("y", function(d) { return (d.y - 1) * cellSize + gameBoardStroke / 2; })
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("fill", wallColor)
        .attr("posn", function(d) { return (d.y-1) + "_" + (d.x-1);})
        .attr("stroke", "#5d8679")
        .attr("stroke-width", 1)
        .attr("id", function(d) { return "w_" + (d.y-1) + "_" + (d.x-1); })
        .attr("class", "wall")
        .attr("covered", "no");

    var targets = targetSpots[level-1];
    svg.selectAll("circle[class='target']")
        .data(targets)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return (d.x - 1) * cellSize + (svgWidth - boardWidth) / 2 + cellSize / 2; })
        .attr("cy", function(d) { return (d.y - 1) * cellSize + gameBoardStroke / 2 + cellSize / 2; })
        .attr("r", 10)
        .style("fill", targetColor)
        .attr("id", function(d) { return "t_" + (d.y - 1) + "_" + (d.x - 1);})
        .attr("class", "target");
    var boxes = boxData[level-1];
    svg.selectAll("rect[class='box']")
        .data(boxes)
        .enter()
        .append("rect")
        .attr("x", function(d) { return (d.x - 1) * cellSize + (svgWidth - boardWidth) / 2 + boxGap; })
        .attr("y", function(d) { return (d.y - 1) * cellSize + gameBoardStroke / 2 + boxGap; })
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("width", cellSize - 2 * boxGap)
        .attr("height", cellSize - 2 * boxGap)
        .style("fill", boxColor)
        .attr("posn", function(d) { return (d.y-1) + "_" + (d.x-1);})
        .attr("id", function(d) { return "b_" + (d.y-1) + "_" + (d.x-1);})
        .attr("stroke-width", 2)
        .attr("stroke", boxOuterColor)
        .attr("class", "box");

    var playerLocation = playerData[level-1];
    svg.append("rect")
        .attr("x", (playerLocation.x - 1) * cellSize + (svgWidth - boardWidth) / 2 + boxGap)
        .attr("y", (playerLocation.y - 1) * cellSize + gameBoardStroke / 2 + boxGap)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("width", cellSize - 2 * boxGap)
        .attr("height", cellSize - 2 * boxGap)
        .style("fill", playerColor)
        .attr("posn", (playerLocation.y-1) + "_" + (playerLocation.x-1))
        .attr("id", "player")
        .attr("stroke-width", 2)
        .attr("stroke", playerOuterColor);

    var match = function(i, j) {
        d3.select("#b_" + i+ "_" + j).attr("stroke", boxMatchOuterColor).style("fill", boxMatchColor);
    };

    var unmatch = function(i, j) {
        d3.select("#b_" + i+ "_"+j).attr("stroke", boxOuterColor).style("fill", boxColor);  
    }
    for (var i = 0; i < targets.length; i++) {
        if (d3.select("#b_" + (targets[i].y - 1) + "_" + (targets[i].x - 1)).size() === 1) {
            match(targets[i].y - 1, targets[i].x - 1);
        }
    }
    var disableDirectionKeydown = function(e) {
        switch(e.which) {
            case 37:
                break;
            case 38:
                break;
            case 39:
                break;
            case 40:
                break;
            default: return;
        }
        e.preventDefault();
    }

    var keydownHandler = function(e) {
        switch(e.which) {
            case 37: // left
                var playPosn = d3.select("#player").attr("posn").split("_");
                var i = parseInt(playPosn[0]);
                var j = parseInt(playPosn[1]) - 1;
                if ((d3.select("#b_"+i+"_"+j).size()===1 && (d3.select("#w_"+i+"_"+(j-1)).size()===1 || d3.select("#b_"+i+"_"+(j-1)).size()===1)) ||
                    d3.select("#w_"+i+"_"+j).size() === 1) {
                    break;
                }
                moveTo(i, j, "left");
                break;

            case 38: // up
                var playPosn = d3.select("#player").attr("posn").split("_");
                var i = parseInt(playPosn[0]) - 1;
                var j = parseInt(playPosn[1]);
                if ((d3.select("#b_"+i+"_"+j).size()===1 && (d3.select("#w_"+(i-1)+"_"+j).size()===1 || d3.select("#b_"+(i-1)+"_"+j).size()===1)) ||
                    d3.select("#w_"+i+"_"+j).size() === 1) {
                    break;
                }
                moveTo(i, j, "up");
                break;
            case 39: // right
                var playPosn = d3.select("#player").attr("posn").split("_");
                var i = parseInt(playPosn[0]);
                var j = parseInt(playPosn[1]) + 1;
                if ((d3.select("#b_"+i+"_"+j).size()===1 && (d3.select("#w_"+i+"_"+(j+1)).size()===1 || d3.select("#b_"+i+"_"+(j+1)).size()===1)) ||
                    d3.select("#w_"+i+"_"+j).size() === 1) {
                    break;
                }
                moveTo(i, j, "right");
                
                break;
            case 40: // down
                var playPosn = d3.select("#player").attr("posn").split("_");
                var i = parseInt(playPosn[0]) + 1;
                var j = parseInt(playPosn[1]);
                if ((d3.select("#b_"+i+"_"+j).size()===1 && (d3.select("#w_"+(i+1)+"_"+j).size()===1 || d3.select("#b_"+(i+1)+"_"+j).size()===1)) ||
                    d3.select("#w_"+i+"_"+j).size() === 1) {
                    break;
                }
                moveTo(i, j, "down");
                break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault();
    }

    var isComplete = function() {
        for (var i = 0; i < targets.length; i++) {
            if (d3.select("#b_" + (targets[i].y - 1) + "_" + (targets[i].x - 1)).size() === 0) {
                return false;
            }
        }
        return true;
    }


    var moveTo = function(toI, toJ, mode) {
        d3.select("#player")
            .transition()
            .duration(boxMoveDuration)
            .on("start", function(){
                $(document).off("keydown");
                $(document).keydown(disableDirectionKeydown);
            })
            .attr("x", toJ * cellSize + (svgWidth - boardWidth) / 2 + boxGap)
            .attr("y", toI * cellSize + gameBoardStroke / 2 + boxGap)
            .attr("posn", toI + "_" + toJ)
            .on("end", function() {
                if (d3.select("#b_" + toI + "_" + toJ).size() === 0) {
                    $(document).off("keydown");
                    $(document).keydown(keydownHandler);
                }
            });

        if (d3.select("#b_" + toI + "_" + toJ).size() === 1) {
            var boxToI = toI, boxToJ = toJ;
            switch(mode) {
                case "down":
                    boxToI += 1;
                    break
                case "up":
                    boxToI -= 1;
                    break
                case "left":
                    boxToJ -= 1;
                    break
                case "right":
                    boxToJ += 1;
                    break

            }
            d3.select("#b_" + toI + "_" + toJ)
                .transition()
                .duration(boxMoveDuration)
                .attr("x", boxToJ * cellSize + (svgWidth - boardWidth) / 2 + boxGap)
                .attr("y", boxToI * cellSize + gameBoardStroke / 2 + boxGap)
                .attr("id", "b_" + boxToI + "_" + boxToJ)
                .attr("posn", boxToI + "_" + boxToJ)
                .on("end", function(){
                    $(document).off("keydown");
                    $(document).keydown(keydownHandler);
                    if (isComplete()) {
                        alert("Congrate, you have completed the game!")
                    }
                });
            if (d3.select("#t_" + boxToI + "_" + boxToJ).size() === 1) {
                match(toI, toJ);
            } else {
                unmatch(toI, toJ);
            }
        }
    }
    $(document).keydown(keydownHandler);
});