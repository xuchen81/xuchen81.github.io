$(function() {
	var urlParams = new URLSearchParams(window.location.search);
	var size = urlParams.get('s') || 4;
	var squareSize = 35;
	var n = parseInt(size);
	var boardSize = 750;
	var width = 1000, height = 1000;
	var emptyColor = "#361d00";
	var stepSize = 100;
	var svg = d3.select("#canvas").append("svg").attr("width", width).attr("height", height);

	var generateRandomSeries = function(n) {
		var order = [];
		for (var i = 1; i <= n * n; i++) {
			order.push(i)
		}
		var random = [];
		while (order.length != 0) {
			var pickIdx = Math.floor((Math.random() * order.length));
			random.push(order[pickIdx]);
			order.splice(pickIdx, 1);
		}
		return random;
	};

	var getReversedOrderSum = function(randomArr) {
		var sum = 0;
		for (var i = 0; i < randomArr.length; i++) {
			for (var j = i + 1; j < randomArr.length; j++) {
				if (randomArr[i] > randomArr[j]) {
					sum += 1;
				}
			}
		}
		return sum;
	}

	var isValid = function(randomArr, n) {
		var reverseOrderSum = getReversedOrderSum(randomArr);
		var emptyIdx = randomArr.indexOf(randomArr.length);
		var i = Math.floor(emptyIdx / n);
		var j = emptyIdx % n;
		var emptyDistance = (n - (i + 1)) + (n - (j + 1));

		if ((reverseOrderSum + emptyDistance) % 2 === 0) {
			return true;
		}
		return false;
	}

	var generateValidSeries = function(n) {
		var s = generateRandomSeries(n);
		while (!isValid(s, n)) {
			s = generateRandomSeries(n);
		}
		return s;
	}

	var nums = generateValidSeries(n);
	var gameBoardStroke = 10;
	svg.append("rect").attr("x", (width - boardSize) / 2 - 100)
		.attr("y", gameBoardStroke/2)
		.attr("rx", 10)
		.attr("ry", 10)
		.attr("width", boardSize)
		.attr("height", boardSize)
		.attr('fill', '#9c6017')
		.attr("stroke-width", gameBoardStroke)
		.attr("stroke", "#9c6017");

    var idx = 0;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            var x = j * boardSize/n + (width - boardSize) / 2 - 100;
            var y = i * boardSize/n + gameBoardStroke/2;
            svg.append("rect").attr("x", x)
                .attr("y", y)
                .attr("rx", 10)
    			.attr("ry", 10)
                .attr("width", boardSize/n)
                .attr("height", boardSize/n)
                .attr('fill', '#ffb963')
                .attr("stroke-width", 3)
                .attr("stroke", "#9c6017")
                .attr("posn", i + "_" + j)
                .attr("id", "r_" + i + "_" + j)
                .attr("class", "cell");

            if (nums[idx] === n * n) {
            	d3.select("#r_" + i + "_" + j).style("fill", emptyColor).attr("class", "empty");
            	idx += 1;
            	continue;
            }

            svg.append("text").attr("x", x).attr("y", y)
            	.text(nums[idx])
            	.attr("id", "t_" + i + "_" + j)
            	.attr("posn", i + "_" + j)
            	.attr("class", "cell_num")
            	.style('fill', '#734103')
            	.style("font-size", "84px");

        	var textW = d3.select("#t_" + i + "_" + j).node().getBoundingClientRect().width;
        	var textH = d3.select("#t_" + i + "_" + j).node().getBoundingClientRect().height;
        	d3.select("#t_" + i + "_" + j)
        		.attr("x", x + boardSize/n/2 - textW/2)
        		.attr("y", y + boardSize/n/2 + textH/2 - 20);
        	idx += 1;
        }
    }

    svg.append("rect").attr("x", boardSize + 100)
    	.attr("y", boardSize/2 - stepSize/2)
    	.attr("rx", 10)
    	.attr("ry", 10)
    	.attr("width", 100)
    	.attr("height", 100)
    	.attr('fill', '#d99055')
    	.attr("stroke-width", 3)
    	.attr("stroke", "#9c6017")
    	.attr("id", "step_box");

    svg.append("text").attr("x", boardSize + 100).attr("y", boardSize/2 - stepSize/2)
    	.text(0)
    	.attr("id", "step_counter")
    	.style('fill', 'white')
    	.style("font-size", "44px");
    
    var textW = d3.select("#step_counter").node().getBoundingClientRect().width;
    var textH = d3.select("#step_counter").node().getBoundingClientRect().height;
    d3.select("#step_counter")
    	.attr("x", boardSize + 100 + stepSize/2 - textW/2)
    	.attr("y", boardSize/2 + textH/2 - 10);

    svg.append("text").text("步数").attr("x", boardSize + 100 + 18).attr("y", boardSize/2 - stepSize/2 - 20)
    	.style('fill', '#6e523b')
    	.style("font-size", "30px");


	var updateStep = function() {
    	var num = parseInt(d3.select("#step_counter").text());
    	d3.select("#step_counter").text(num + 1);
    	var textW = d3.select("#step_counter").node().getBoundingClientRect().width;
    	d3.select("#step_counter").attr("x", boardSize + 100 + stepSize/2 - textW/2);
    }

    var moveToEmpty = function(i, j) {
    	var emptyPosn = d3.select('.empty').attr("posn");
    	var emptyRow = parseInt(emptyPosn.split("_")[0]);
    	var emptyCol = parseInt(emptyPosn.split("_")[1]);
    	var emptyX = parseInt(d3.select('.empty').attr("x"));
    	var emptyY = parseInt(d3.select('.empty').attr("y"));

    	var ijX = parseInt(d3.select('#r_' + i + "_" + j).attr("x"));
    	var ijY = parseInt(d3.select('#r_' + i + "_" + j).attr("y"));

    	// Move [i, j] to empty
    	d3.select("#r_" + i + "_" + j)
    		.attr("x", emptyX)
    		.attr("y", emptyY)
    		.attr("id", "r_" + emptyRow + "_" + emptyCol)
    		.attr("posn", emptyRow + "_" + emptyCol);

    	// Move [i, j] number to empty
    	d3.select("#t_" + i + "_" + j)
    		.attr("x", emptyX)
    		.attr("y", emptyY)
    		.attr("id", "t_" + emptyRow + "_" + emptyCol)
    		.attr("posn", emptyRow + "_" + emptyCol);

    	var textW = d3.select("#t_" + emptyRow + "_" + emptyCol).node().getBoundingClientRect().width;
        var textH = d3.select("#t_" + emptyRow + "_" + emptyCol).node().getBoundingClientRect().height;
        d3.select("#t_" + emptyRow + "_" + emptyCol)
        	.attr("x", emptyX + boardSize/n/2 - textW/2)
        	.attr("y", emptyY + boardSize/n/2 + textH/2 - 20);

    	// Move empty to [i, j]
    	d3.select(".empty").style("fill", emptyColor)
    		.attr("x", ijX)
    		.attr("y", ijY)
    		.attr("id", "r_" + i + "_" + j)
    		.attr("posn", i + "_" + j)
    		.style("fill", emptyColor);

    	updateStep();
    }

    var checkComplete = function() {
    	var lastIdx = n - 1;
    	if (d3.select(".empty").attr("posn") !== lastIdx + "_" + lastIdx) {
    		return false;
    	}
    	for (var i = 0; i < n; i++) {
    		for (var j = 0; j < n; j++) {
    			if (i === n - 1 && j === n - 1) {
    				break;
    			}
    			var tx = parseInt(d3.select('#t_' + i + "_" + j).text());
    			if (tx !== i * n + j + 1) {
    				return false;
    			}
    		}
    	}
    	return true;
    }

    d3.selectAll("rect[class='cell'], text[class='cell_num']").on('click', function() {
    	var posn = d3.select(this).attr("posn");
    	var i = parseInt(posn.split("_")[0]), j = parseInt(posn.split("_")[1]);

    	if (i - 1 >= 0 && d3.select(".empty").attr("posn") === (i - 1) + "_" + j) {
    		moveToEmpty(i, j);
    	} else if (i + 1 < n && d3.select(".empty").attr("posn") === (i + 1) + "_" + j) {
    		moveToEmpty(i, j);
    	} else if (j - 1 >= 0 && d3.select(".empty").attr("posn") === i + "_" + (j - 1)) {
    		moveToEmpty(i, j);
    	} else if (j + 1 < n && d3.select(".empty").attr("posn") === i + "_" + (j + 1)) {
    		moveToEmpty(i, j);
    	}

    	if (checkComplete()) {
    		setTimeout(function(){
    			alert("你成功的还原了拼图，恭喜！🎉");
    		}, 100);
    	};
    });

    $(document).keydown(function(e) {
        switch(e.which) {
    		case 37: // left
	        	var emptyPosn = d3.select('.empty').attr("posn").split("_");
	        	var i = parseInt(emptyPosn[0]);
	        	var j = parseInt(emptyPosn[1]) + 1;
	        	if (j < n) {
	        		moveToEmpty(i, j);
	        		if (checkComplete()) {
	        			setTimeout(function(){
	        				alert("你成功的还原了拼图，恭喜！🎉");
	        			}, 100);
	        		};
	        	}
	        	break;

	        case 38: // up
		        var emptyPosn = d3.select('.empty').attr("posn").split("_");
	        	var i = parseInt(emptyPosn[0]) + 1;
	        	var j = parseInt(emptyPosn[1]);
	        	if (i < n) {
	        		moveToEmpty(i, j);
	        		if (checkComplete()) {
	        			setTimeout(function(){
	        				alert("你成功的还原了拼图，恭喜！🎉");
	        			}, 100);
	        		};
	        	}
		        break;
	        case 39: // right
		        var emptyPosn = d3.select('.empty').attr("posn").split("_");
	        	var i = parseInt(emptyPosn[0]);
	        	var j = parseInt(emptyPosn[1]) - 1;
	        	if (j >= 0 ) {
	        		moveToEmpty(i, j);
	        		if (checkComplete()) {
	        			setTimeout(function(){
	        				alert("你成功的还原了拼图，恭喜！🎉");
	        			}, 100);
	        		};
	        	}
		        break;
	        case 40: // down
	        	var emptyPosn = d3.select('.empty').attr("posn").split("_");
	        	var i = parseInt(emptyPosn[0]) - 1;
	        	var j = parseInt(emptyPosn[1]);
	        	if (i >= 0 ) {
	        		moveToEmpty(i, j);
	        		if (checkComplete()) {
	        			setTimeout(function(){
	        				alert("你成功的还原了拼图，恭喜！🎉");
	        			}, 100);
	        		};
	        	}
	        	break;

	        default: return; // exit this handler for other keys
	    }
	    e.preventDefault(); // prevent the default action (scroll / move caret)
	});
});