$(function() {
	var urlParams = new URLSearchParams(window.location.search);
	var size = urlParams.get('s') || 5;
    var starSize = 2000;
	var n = parseInt(size);
	var boardSize = 750;
	var width = 1000, height = 1000;
	var emptyColor = "#282c2d";
	var stepSize = 100;
	var svg = d3.select("#canvas").append("svg").attr("width", width).attr("height", height);

    var colorDef = {
        red: {
            starColor: "#fe515a",
            bgColor: "#ff9090",
            lineColor: "#fea5bb"
        },
        yellow: {
            starColor: "#fedc3f",
            bgColor: "#ffc60c",
            lineColor: "#fffac0"
        },
        green: {
            starColor: "#5efee4",
            bgColor: "#34d5c0",
            lineColor: "#90fff0"
        },
        purple: {
            starColor: "#ab2aff",
            bgColor: "#c153ff",
            lineColor: "#c380ff"
        },
        gray: {
            starColor: "#e2e2e2",
            bgColor: "#d3d3d3",
            lineColor: "#ffffff" 
        },
        orange: {
            starColor: "#E4652D",
            bgColor: "#F2A050",
            lineColor: "#F9D6B0"   
        }
    }

    var starPosn = [
        [1, 1, "red"],
        [5, 3, "red"],
        [1, 2, "yellow"],
        [1, 5, "yellow"],
        [2, 2, "green"],
        [2, 4, "green"],
        [2, 5, "purple"],
        [5, 4, "purple"],
        [3, 4, "gray"],
        [4, 2, "gray"]
    ];

    if (n === 6) {
        starPosn = [
            [1, 1, "red"],
            [1, 6, "yellow"],
            [2, 3, "gray"],
            [2, 4, "green"],
            [3, 2, "yellow"],
            [3, 4, "purple"],
            [5, 5, "purple"],
            [6, 2, "red"],
            [6, 5, "gray"],
            [6, 6, "green"]
        ];
    }

    if (n === 8) {
        starPosn = [
            [1, 8, "purple"],
            [3, 3, "green"],
            [3, 5, "yellow"],
            [3, 6, "red"],
            [3, 7, "gray"],
            [5, 5, "green"],
            [6, 7, "orange"],
            [7, 2, "red"],
            [7, 3, "gray"],
            [7, 4, "orange"],
            [8, 4, "purple"],
            [8, 5, "yellow"]
        ];
        starSize = 1200;
    }

	var gameBoardStroke = 10;
	svg.append("rect").attr("x", (width - boardSize) / 2)
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
            var x = j * boardSize/n + (width - boardSize) / 2;
            var y = i * boardSize/n + gameBoardStroke / 2;
            data.push({
                x: x,
                y: y,
                width: boardSize/n,
                height: boardSize/n,
                fill: emptyColor,
                stroke: "#9c6017",
                posn: i + "_" + j,
                id: "r_" + i + "_" + j,
                class: "cell"
            });
        }
    }

    svg.selectAll("rect[class='cell']")
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
        .attr("class", "cell")
        .attr("id", function(d) { return "r_" + d.posn; })
        .attr("hasStar", "no")
        .attr("covered", "no")
        .attr("starColor", null)
        .attr("lineColor", null)
        .attr("bgColor", null);

    var starData = [];
    for (var i = 0; i < starPosn.length; i ++) {
        var x = parseInt(d3.select("#r_" + (starPosn[i][0] - 1) + "_" + (starPosn[i][1] - 1)).attr("x"));
        var y = parseInt(d3.select("#r_" + (starPosn[i][0] - 1) + "_" + (starPosn[i][1] - 1)).attr("y"));
        starData.push({
            transform: "translate(" + (x + boardSize/n/2) + "," + (y + boardSize/n/2) + ")",
            id: "s_" + (starPosn[i][0] - 1) + "_" + (starPosn[i][1] - 1),
            class: "star",
            size: starSize,
            fill: colorDef[starPosn[i][2]].starColor,
            posn: (starPosn[i][0] - 1) + "_" + (starPosn[i][1] - 1),
            bgColor: colorDef[starPosn[i][2]].bgColor,
            lineColor: colorDef[starPosn[i][2]].lineColor,
        });
        d3.select("#r_" + (starPosn[i][0] - 1) + "_" + (starPosn[i][1] - 1)).attr("hasStar", "yes");
    }

    var starGenerator = d3.symbol().type(d3.symbolStar);
    var renderStar = function(starData) {
        svg.selectAll("path[class='star']")
            .data(starData)
            .enter()
            .append('path')
            .attr("transform", function(d) { return d.transform ;})
            .attr("posn", function(d) { return d.posn; })
            .attr("id", function(d) { return d.id ;})
            .attr("d", function(d) {
                starGenerator.size(d.size);

                return starGenerator();
            })
            .attr("class", "star")
            .attr("fill", function(d) { return d.fill ;})
            .on("mousedown", (d) => {
                d3.select("#r_" + d.posn).dispatch("mousedown");
            })
            .on("mouseup", (d) => {
                d3.select("#r_" + d.posn).dispatch("mouseup");
            });
    }

    renderStar(starData);

    var trace = [];
    var traceMap = {}
    var startingNode = null, endingNode = null;

    var isAdjacent = function(posn1, posn2) {
        var posn1i = parseInt(posn1.split("_")[0]);
        var posn1j = parseInt(posn1.split("_")[1]);
        var posn2i = parseInt(posn2.split("_")[0]);
        var posn2j = parseInt(posn2.split("_")[1]);
        return Math.abs(posn1i - posn2i) + Math.abs(posn1j - posn2j) <= 1;
    }

    var reconstuctTrace = function(i, j) {
        var bgColor = d3.select("#r_" + i + "_" + j).attr("fill");
        var lineColor = d3.select("#r_" + i + "_" + j).attr("lineColor");

        var startingStarPosn = d3.select("rect[hasStar='yes'][bgColor='" + bgColor+ "']").attr("posn");
        var newI = parseInt(startingStarPosn.split("_")[0]);
        var newJ = parseInt(startingStarPosn.split("_")[1]);

        var trace = [];
        var traceMap = {};
        var toExpand = [[newI, newJ]];
        var visited = {};
        while (toExpand.length > 0) {
            var curr = toExpand.pop();
            var posnStr = curr[0] + "_" + curr[1];
            visited[posnStr] = 1;
            // up
            if (curr[0] - 1 >= 0 && 
                d3.select("#r_" + (curr[0] - 1) + "_" + curr[1]).attr("fill") === bgColor &&
                !(((curr[0] - 1) + "_" + curr[1]) in visited)) {
                toExpand.push([curr[0] - 1, curr[1]]);
            }

            // down
            if (curr[0] + 1 < n && 
                d3.select("#r_" + (curr[0] + 1) + "_" + curr[1]).attr("fill") === bgColor &&
                !(((curr[0] + 1) + "_" + curr[1]) in visited)) {
                toExpand.push([curr[0] + 1, curr[1]]);
            }

            // left
            if (curr[1] - 1 >= 0 && 
                d3.select("#r_" + curr[0] + "_" + (curr[1] - 1)).attr("fill") === bgColor && 
                !((curr[0] + "_" + (curr[1] - 1)) in visited)) {
                toExpand.push([curr[0], curr[1] - 1]);
            }

            // right
            if (curr[1] + 1 < n && 
                d3.select("#r_" + curr[0] + "_" + (curr[1] + 1)).attr("fill") === bgColor &&
                !((curr[0] + "_" + (curr[1] + 1)) in visited)) {
                toExpand.push([curr[0], curr[1] + 1]);
            }

            if ((d3.select("#r_" + posnStr).attr("covered") === "yes" || d3.select("#r_" + posnStr).attr("hasStar") === "yes") && 
                d3.select("#r_" + posnStr).attr("fill") === bgColor) {
                traceMap[posnStr] = d3.select("#r_" + posnStr).data()[0];
                trace.push(d3.select("#r_" + posnStr).data()[0]);
            }
        }

        var orderPosn = [startingStarPosn]
        var allLineConnections = d3.selectAll("line[lineColor='" + lineColor+ "']").nodes().map(function(d) { return d3.select(d).attr("connection").split("_to_"); });
        var alreadySort = {[startingStarPosn]: 1};

        while (orderPosn.length <= allLineConnections.length) {
            for (var i = 0; i < allLineConnections.length; i++) {
                if (allLineConnections[i][0] === orderPosn[orderPosn.length - 1] && !(allLineConnections[i][1] in alreadySort)) {
                    orderPosn.push(allLineConnections[i][1]);
                    alreadySort[allLineConnections[i][1]] = 1
                } 

                if (allLineConnections[i][1] === orderPosn[orderPosn.length - 1] && !(allLineConnections[i][0] in alreadySort)) {
                    orderPosn.push(allLineConnections[i][0]);
                    alreadySort[allLineConnections[i][0]] = 1
                } 
            }
        }

        var orderTrace = [];
        for (var i = 0; i < orderPosn.length; i++) {
            for (var j = 0; j < trace.length; j++) {
                if (trace[j].posn === orderPosn[i]) {
                    orderTrace.push(trace[j]);
                    break;
                }
            }
        }

        return [orderTrace, traceMap];
    }

    var clearSpotAfterPosn = function(trace, traceMap, posn) {
        var idx = -1;
        for (var i = 0; i < trace.length; i ++) {
            if (posn === trace[i].posn) {
                idx = i;
                break;
            }
        }

        for (var i = idx; i <= trace.length - 2; i ++) {
            var startPosn = trace[i].posn;
            var endPosn = trace[i+1].posn;
            var connectionArr = [startPosn, endPosn];
            connectionArr.sort();
            d3.select("line[connection='" + connectionArr.join("_to_") + "']").remove();
            d3.select("#r_" + trace[i+1].posn).attr("fill", emptyColor).attr("covered", "no");
            delete traceMap[trace[i+1].posn];
        }
        return [trace.slice(0, idx + 1), traceMap];
    }

    var checkComplete = function() {
        return d3.selectAll("rect[covered='yes']").size() + d3.selectAll("rect[hasStar='yes']").size() === n * n;
    }

    var getRowColFromLine = function(startNode, endNode, mouseX, mouseY) {
        var x1 = startNode.x + boardSize/n/2;
        var y1 = startNode.y + boardSize/n/2;
        var x2 = endNode.x + boardSize/n/2;
        var y2 = endNode.y + boardSize/n/2;
        var i, j;
        if (endNode.x === startNode.x) { // Same col
            j = parseInt(startNode.posn.split("_")[1]);
            var yArr = [y1, y2];
            yArr.sort();
            if (mouseY <= Math.min(y1, y2) + boardSize/n/2) {
                if (y1 < y2) {
                    i = parseInt(startNode.posn.split("_")[0]);
                } else {
                    i = parseInt(endNode.posn.split("_")[0]);
                }
            } else {
                if (y1 < y2) {
                    i = parseInt(endNode.posn.split("_")[0]);
                } else {
                    i = parseInt(startNode.posn.split("_")[0]);
                }
            }
        } else { // Same row
            i = parseInt(startNode.posn.split("_")[0]);
            if (mouseX <= Math.min(x1, x2) + boardSize/n/2) {
                if (x1 < x2) {
                    j = parseInt(startNode.posn.split("_")[1]);
                } else {
                    j = parseInt(endNode.posn.split("_")[1]);
                }
            } else {
                if (x1 < x2) {
                    j = parseInt(endNode.posn.split("_")[1]);
                } else {
                    j = parseInt(startNode.posn.split("_")[1]);
                }
            }
        }
        return [i, j];
    }

    d3.selectAll("rect[class='cell']")
        .on("mousedown", (d)=>{
            var starEle = d3.select("#s_" + d.posn);
            var rectEle = d3.select("#r_" + d.posn);

            if (rectEle.attr("hasStar") === "no" && rectEle.attr("covered") === "no") {
                console.log("Can NOT start from here");
                return;
            }

            this.trace = [];
            this.traceMap = {};
            this.startingRectNodeData = rectEle.data()[0];
            this.endingRectNodeData = null;
            this.bgColor = rectEle.attr("bgColor");
            this.lineColor = rectEle.attr("lineColor");
            this.starColor = rectEle.attr("starColor");

            // Clear existing rect color and line if restart a star.
            if (rectEle.attr("hasStar") === "yes") {
                d3.selectAll("rect[fill='" + this.bgColor + "']").attr("fill", emptyColor).attr("bgColor", null).attr("lineColor", null).attr("covered", "no");
                d3.selectAll("line[lineColor='" + this.lineColor + "']").remove();
            }
            this.trace.push(this.startingRectNodeData);
            this.traceMap[d.posn] = this.startingRectNodeData;

            if (rectEle.attr("hasStar") === "no" && rectEle.attr("covered") === "yes") {
                var constructedTrace = reconstuctTrace(parseInt(d.posn.split("_")[0]), parseInt(d.posn.split("_")[1]));
                var wholeTrace = constructedTrace[0];
                var wholeTraceMap = constructedTrace[1];
                this.startingRectNodeData = wholeTrace[0];
                starEle = d3.select("#s_" + wholeTrace[0].posn);
                rectEle = d3.select("#r_" + wholeTrace[0].posn);
                var newTraceInfo = clearSpotAfterPosn(wholeTrace, wholeTraceMap, d.posn);
                this.trace = newTraceInfo[0];
                this.traceMap = newTraceInfo[1];
            }

            if (starEle) {
                this.bgColor = starEle.data()[0].bgColor;
                this.lineColor = starEle.data()[0].lineColor;
                this.starColor = starEle.data()[0].fill;
            }

            rectEle.attr("fill", this.bgColor);
            rectEle.attr("bgColor", this.bgColor);
            rectEle.attr("lineColor", this.lineColor);
            rectEle.attr("starColor", this.starColor);
        })
        .on("mouseover", (d) => {
            if (this.startingRectNodeData && !isAdjacent(d.posn, this.trace[this.trace.length - 1].posn)) {
                console.log("You can NOT jump a spot.");
                return;
            }

            if (this.startingRectNodeData && this.trace.length >= 3 && this.startingRectNodeData.posn === d.posn) {
                // a circle, if a circle is formed, it will at least has 3 element in trace.
                return;
            }
            var rectEle = d3.select("#r_" + d.posn);
            var starEle = d3.select("#s_" + d.posn);
            if (this.startingRectNodeData && rectEle.attr("hasStar") === "yes" && starEle.attr("fill") !== this.starColor) {
                console.log("This star has a different color, can NOT be connected.");
                return;
            }

            if (this.startingRectNodeData && 
                d3.select("#r_" + d.posn).attr("covered") === "yes" && 
                d3.select("#r_" + d.posn).attr("bgColor") !== this.bgColor) {
                console.log("Two colors can NOT cross.");
                return;
            }

            if (this.startingRectNodeData && this.trace.length >= 2) {
                var lastElePosn = this.trace[this.trace.length - 1].posn;
                // if two star with the same color is already connected.
                if (d3.select("#r_" + lastElePosn).attr("hasStar") === "yes" &&
                    d3.select("#s_" + lastElePosn).attr("fill") === this.starColor) {

                    // Trying to continue a new empty spot should do nothing;
                    if (! (d.posn in this.traceMap)) {
                        console.log("You have complete a connection, invalid move.");
                        return;
                    } 
                }
            }

            if (this.startingRectNodeData && !this.endingRectNodeData) {
                var nodeData = d;
                if (d.class === "star") {
                    nodeData = d3.select("#r_" + d.posn).data()[0];
                }

                if (!(d.posn in this.traceMap)) {
                    this.trace.push(rectEle.data()[0]);
                    this.traceMap[d.posn] = rectEle.data()[0];
                    var fill = d3.select("#s_" + this.startingRectNodeData.posn).data()[0].bgColor;
                    d3.select("#r_" + d.posn).attr("fill", fill).attr("bgColor", this.bgColor).attr("lineColor", this.lineColor);
                    if (d3.select("#r_" + d.posn).attr("hasStar") === "no") {
                        d3.select("#r_" + d.posn).attr("covered", "yes")
                    }

                    if (this.trace.length > 1) {
                        var startNode = this.trace[this.trace.length - 2];
                        var endNode = this.trace[this.trace.length - 1];
                        var connectionArr = [startNode.posn, endNode.posn];
                        connectionArr.sort();
                        svg.append("line")
                            .style("stroke", this.lineColor)
                            .style("stroke-width", 10)
                            .attr("x1", startNode.x + boardSize/n/2)
                            .attr("y1", startNode.y + boardSize/n/2)
                            .attr("x2", endNode.x + boardSize/n/2)
                            .attr("y2", endNode.y + boardSize/n/2)
                            .attr("lineColor", this.lineColor)
                            .attr("class", "line")
                            .attr("connection", connectionArr.join("_to_"))
                            .on("mousedown", function(d) {
                                var index = getRowColFromLine(startNode, endNode, d3.mouse(this)[0], d3.mouse(this)[1]);
                                d3.select("#r_" + index[0] + "_" + index[1]).dispatch("mousedown");
                            })
                            .on("mouseup", function(d) {
                                var index = getRowColFromLine(startNode, endNode, d3.mouse(this)[0], d3.mouse(this)[1]);
                                d3.select("#r_" + index[0] + "_" + index[1]).dispatch("mouseup");
                            });

                        d3.selectAll("path[class='star']").remove();
                        renderStar(starData);
                    }
                } else if (d.posn in this.traceMap && d.posn !== this.trace[this.trace.length-1].posn) {
                    // if turn around
                    if (this.trace.length >= 2 && d.posn != this.trace[this.trace.length - 2].posn) {
                        console.log("You can NOT go back by Jumping.");
                        return;
                    }
                    console.log("====== test");
                    var connectionArr = [d.posn, this.trace[this.trace.length - 1].posn];
                    connectionArr.sort();

                    d3.select("line[connection='" + connectionArr.join("_to_") + "']").remove();
                    d3.select("#r_" + this.trace[this.trace.length - 1].posn).attr("fill", emptyColor).attr("covered", "no");
                    delete this.traceMap[this.trace[this.trace.length-1].posn]
                    this.trace.pop();
                }
            }
        })
        .on("mouseup", (d) => {
            this.startingRectNodeData = null;
            this.endingRectNodeData = d;
            this.trace = [];
            this.traceMap = {};
            if (checkComplete()) {
                alert("恭喜，你胜利了！");
            }
        })
});