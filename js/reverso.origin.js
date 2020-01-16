$(function() {
    var squareSize = 65;
    var mode = "black";
    var n = 8;
    var width = n * squareSize + 50, height = 1000;
    var svg = d3.select("#canvas").append("svg").attr("width", width).attr("height", height);

    svg.append("rect").attr("x", 13)
        .attr("y", 13)
        .attr("width", 534)
        .attr("height", 534)
        .attr('fill', 'white')
        .attr("stroke-width", 10)
        .attr("stroke", "black");

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            var x = j * squareSize + 20;
            var y = i * squareSize + 20;
            svg.append("rect").attr("x", x)
                .attr("y", y)
                .attr("width", squareSize)
                .attr("height", squareSize)
                .attr('fill', '#2aa133')
                .attr("stroke-width", 3)
                .attr("stroke", "black")
                .attr("posn", i + "_" + j)
                .attr("id", i + "_" + j)
                .attr("class", "cell");

            svg.append("circle")
                .attr("cx", x + squareSize / 2)
                .attr("cy", y + squareSize / 2)
                .attr("r", 22)
                .attr("id", "circle_" + i + "_" + j)
                .attr("posn", i + "_" + j)
                .style("fill", "red")
                .attr("opacity", 0);
        }
    }

    d3.select("#circle_3_3").attr("class", "white").style("fill", "white").attr("opacity", 1);
    d3.select("#circle_3_4").attr("class", "black").style("fill", "black").attr("opacity", 1);
    d3.select("#circle_4_3").attr("class", "black").style("fill", "black").attr("opacity", 1);
    d3.select("#circle_4_4").attr("class", "white").style("fill", "white").attr("opacity", 1);
    svg.append("circle").attr("cx", squareSize * 2 + 20)
        .attr("cy", squareSize * 2 + 20)
        .attr("r", 5);
    svg.append("circle").attr("cx", squareSize * 6 + 20)
        .attr("cy", squareSize * 2 + 20)
        .attr("r", 5);
    svg.append("circle").attr("cx", squareSize * 2 + 20)
        .attr("cy", squareSize * 6 + 20)
        .attr("r", 5);
    svg.append("circle").attr("cx", squareSize * 6 + 20)
        .attr("cy", squareSize * 6 + 20)
        .attr("r", 5);

    var modeBtnSize = 60;
    var modeSwitchBtnSpace = 50;
    var blacky = n * squareSize + 80;
    var blackx = n * squareSize / 2 - modeBtnSize - 120;

    svg.append("rect").attr("x", blackx)
                      .attr("y", blacky)
                      .attr("rx", 3)
                      .attr("ry", 3)
                      .attr("width", modeBtnSize)
                      .attr("height", modeBtnSize)
                      .attr('fill', '#2aa133')
                      .attr("stroke-width", 4)
                      .attr("id", "black_btn_boader")
                      .attr("stroke", "gray");
    svg.append("circle")
        .attr("cx", blackx + modeBtnSize / 2)
        .attr("cy", blacky + modeBtnSize / 2)
        .attr("r", 20)
        .attr("id", "black_circle");

    svg.append("text").attr("x", blackx + modeBtnSize + 40).attr("y", blacky + 50).text("2").attr("id", "black_num").style("font-size", "64px");


    var whitey = n * squareSize + 80;
    var whitex = n * squareSize / 2 + modeSwitchBtnSpace / 2 + 90;

    svg.append("rect").attr("x", whitex)
                      .attr("y", whitey)
                      .attr("rx", 3)
                      .attr("ry", 3)
                      .attr("width", modeBtnSize)
                      .attr("height", modeBtnSize)
                      .attr('fill', '#2aa133')
                      .attr("stroke-width", 4)
                      .attr("id", "white_btn_boader")
                      .attr("stroke", "gray");

    svg.append("circle")
        .attr("cx", whitex + modeBtnSize / 2)
        .attr("cy", whitey + modeBtnSize / 2)
        .attr("r", 20)
        .attr("id", "white_circle")
        .style("fill", "white");


    svg.append("text").attr("x", whitex + modeBtnSize + 40).attr("y", blacky + 50).text("2").attr("id", "white_num").style("font-size", "64px");

    var selectedBorderColor = "#eb4034";

    var selectBlack = function() {
        d3.select("rect[id='black_btn_boader']").attr("stroke-width", 8).attr("stroke", selectedBorderColor);
        d3.select("rect[id='white_btn_boader']").attr("stroke-width", 4).attr("stroke", 'gray');
        mode = "black";
    };
    var selectWhite = function() {
        d3.select("rect[id='black_btn_boader']").attr("stroke-width", 4).attr("stroke", 'gray');
        d3.select("rect[id='white_btn_boader']").attr("stroke-width", 8).attr("stroke", selectedBorderColor);
        mode = "white";
    };
    d3.selectAll("#black_btn_boader, #black_circle").on('click', function() {
        selectBlack();
    });
    d3.selectAll("#white_btn_boader, #white_circle").on('click', function() {
        selectWhite();
    });
    d3.select("#black_circle").on("click")();

    // at (clickedRow, clickedCol) put mode, see if anything can get reversed.
    var getReverso = function(clickedRow, clickedCol, mode) {
        var reverso = [];
        var upExpand = [];
        for (var i = clickedRow - 1; i >= 0; i--) {
            var circle = d3.select("#circle_" + i + "_" + clickedCol);
            if ((mode === "black" && circle.style("fill") == "rgb(0, 0, 0)") || (mode === "white" && circle.style("fill") == "rgb(255, 255, 255)")) { // black
                break;
            }

            if (circle.attr("opacity") === "0" || i === 0) {
                upExpand = [];
                break;
            }
            if ((mode === "black" && circle.style("fill") == "rgb(255, 255, 255)") || (mode === "white" && circle.style("fill") == "rgb(0, 0, 0)")) { // white
                upExpand.push("#circle_" + i + "_" + clickedCol);
            }
        }

        var downExpand = [];
        for (var i = clickedRow + 1; i < n; i++) {
            var circle = d3.select("#circle_" + i + "_" + clickedCol);
            if ((mode === "black" && circle.style("fill") == "rgb(0, 0, 0)") || (mode === "white" && circle.style("fill") == "rgb(255, 255, 255)")) { // black
                break;
            }

            if (circle.attr("opacity") === "0" || i === n - 1 ) {
                downExpand = [];
                break;
            }

            if ((mode === "black" && circle.style("fill") == "rgb(255, 255, 255)") || (mode === "white" && circle.style("fill") == "rgb(0, 0, 0)")) { // white
                downExpand.push("#circle_" + i + "_" + clickedCol);
            }
        }

        var leftExpand = [];
        for (var i = clickedCol - 1; i >= 0; i--) {
            var circle = d3.select("#circle_" + clickedRow + "_" + i);

            if ((mode === "black" && circle.style("fill") == "rgb(0, 0, 0)") || (mode === "white" && circle.style("fill") == "rgb(255, 255, 255)")) { // black
                break;
            }
            if (circle.attr("opacity") === "0" || i === 0) {
                leftExpand = [];
                break;
            }

            if ((mode === "black" && circle.style("fill") == "rgb(255, 255, 255)") || (mode === "white" && circle.style("fill") == "rgb(0, 0, 0)")) { // white
                leftExpand.push("#circle_" + clickedRow + "_" + i);
            }
        }

        var rightExpand = [];
        for (var i = clickedCol + 1; i < n; i++) {
            var circle = d3.select("#circle_" + clickedRow + "_" + i);
            if ((mode === "black" && circle.style("fill") == "rgb(0, 0, 0)") || (mode === "white" && circle.style("fill") == "rgb(255, 255, 255)")) { // black
                break;
            }
            if (circle.attr("opacity") === "0" || i === n - 1) {
                rightExpand = [];
                break;
            }

            if ((mode === "black" && circle.style("fill") == "rgb(255, 255, 255)") || (mode === "white" && circle.style("fill") == "rgb(0, 0, 0)")) { // white
                rightExpand.push("#circle_" + clickedRow + "_" + i);
            }
        }

        var topLeftExpand = [];
        var i = clickedRow - 1, j = clickedCol - 1;
        while (i >= 0 && j >= 0) {
            var circle = d3.select("#circle_" + i + "_" + j);
            if ((mode === "black" && circle.style("fill") == "rgb(0, 0, 0)") || (mode === "white" && circle.style("fill") == "rgb(255, 255, 255)")) { // black
                break;
            }
            if (circle.attr("opacity") === "0" || (i === 0 || j === 0)) {
                topLeftExpand = [];
                break;
            }
            if ((mode === "black" && circle.style("fill") == "rgb(255, 255, 255)") || (mode === "white" && circle.style("fill") == "rgb(0, 0, 0)")) { // white
                topLeftExpand.push("#circle_" + i + "_" + j);
            }
            i -= 1;
            j -= 1;
        }

        var topRightExpand = [];
        i = clickedRow - 1;
        j = clickedCol + 1;
        while (i >= 0 && j < n) {
            var circle = d3.select("#circle_" + i + "_" + j);
            if ((mode === "black" && circle.style("fill") == "rgb(0, 0, 0)") || (mode === "white" && circle.style("fill") == "rgb(255, 255, 255)")) { // black
                break;
            }
            if (circle.attr("opacity") === "0" || (i === 0 || j === n - 1)) {
                topRightExpand = [];
                break;
            }
            if ((mode === "black" && circle.style("fill") == "rgb(255, 255, 255)") || (mode === "white" && circle.style("fill") == "rgb(0, 0, 0)")) { // white
                topRightExpand.push("#circle_" + i + "_" + j);
            }

            i -= 1;
            j += 1;
        }

        var bottomLeftExpand = [];
        i = clickedRow + 1;
        j = clickedCol - 1;
        while (j >= 0 && i < n) {
            var circle = d3.select("#circle_" + i + "_" + j);
            if ((mode === "black" && circle.style("fill") == "rgb(0, 0, 0)") || (mode === "white" && circle.style("fill") == "rgb(255, 255, 255)")) { // black
                break;
            }
            if (circle.attr("opacity") === "0" || (i === n - 1 || j === 0)) {
                bottomLeftExpand = [];
                break;
            }

            if ((mode === "black" && circle.style("fill") == "rgb(255, 255, 255)") || (mode === "white" && circle.style("fill") == "rgb(0, 0, 0)")) { // white
                bottomLeftExpand.push("#circle_" + i + "_" + j);
            }
            i += 1;
            j -= 1;
        }

        var bottomRightExpand = [];
        i = clickedRow + 1;
        j = clickedCol + 1;
        while (i < n && j < n) {
            var circle = d3.select("#circle_" + i + "_" + j);
            if ((mode === "black" && circle.style("fill") == "rgb(0, 0, 0)") || (mode === "white" && circle.style("fill") == "rgb(255, 255, 255)")) { // black
                break;
            }
            if (circle.attr("opacity") === "0" || (i === n - 1 || j === n - 1)) {
                bottomRightExpand = [];
                break;
            }
            if ((mode === "black" && circle.style("fill") == "rgb(255, 255, 255)") || (mode === "white" && circle.style("fill") == "rgb(0, 0, 0)")) { // white
                bottomRightExpand.push("#circle_" + i + "_" + j);
            }
            i += 1;
            j += 1;
        }
        reverso = [].concat(upExpand, downExpand, leftExpand, rightExpand, topLeftExpand, topRightExpand, bottomLeftExpand, bottomRightExpand);
        return reverso;
    };

    var checkGo = function(mode) {
        for (var i = 0; i < n; i ++) {
            for (var j = 0; j < n; j ++) {
                if (d3.select("#circle_" + i + "_" + j).attr("opacity") === "1") {
                    break;
                }
                var reverso = getReverso(i, j, mode);
                if (reverso.length > 0) {
                    return true;
                }
            }
        }
        return false;
    }

    d3.selectAll("rect[class='cell'], circle").on('click', function() {
        var cellPosn = d3.select(this).attr("posn");
        if (d3.select("#circle_" + cellPosn).attr("opacity") === "1") {
            return;
        }
        var posn = cellPosn.split("_");
        var clickedRow = parseInt(posn[0]), clickedCol = parseInt(posn[1]);

        var reverso = getReverso(clickedRow, clickedCol, mode);

        if (reverso.length === 0) {
            if (mode === "black") {
                alert("不可以走这里, 你需要翻掉至少一颗白棋");
            } else {
                alert("不可以走这里, 你需要翻掉至少一颗黑棋");
            }
            return;
        }
        d3.select("#circle_" + cellPosn).style("fill", mode).attr("opacity", 1).attr("class", mode);
        d3.selectAll(reverso.join(",")).style("fill", mode).attr("class", mode);
        var blackNum = d3.selectAll("circle[class='black']").size();
        var whiteNum = d3.selectAll("circle[class='white']").size();
        d3.select("#black_num").text(blackNum);
        d3.select("#white_num").text(whiteNum);

        if (whiteNum + blackNum === 64) {
            setTimeout(function() {
                var message = "";
                if (whiteNum > blackNum) {
                    message = "White Wins，白棋胜利！恭喜！🎉"
                } else if (whiteNum < blackNum) {
                    message = "Black Wins，黑棋胜利！恭喜！🎉"
                } else {
                    message = "Tie Game，平局！"
                }
                alert(message);
            }, 50);
        }

        if (mode === "black") {
            if (checkGo("white")) {
                selectWhite();
            } else if (checkGo("black")) {
                alert("白棋无处可走，棋权依然归黑色。")
                selectBlack();
            }
        } else {
            if (checkGo("black")) {
                selectBlack();
            } else if (checkGo("white")) {
                alert("黑棋无处可走，棋权依然归白色。")
                selectWhite();
            }
        }
    });
});
