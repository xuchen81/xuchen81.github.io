$(function() {
    var stocks = [
        {
            "ticker": "AAPL",
            "qty": 748
        },
        {
            "ticker": "TWLO",
            "qty": 127
        },
        {
            "ticker": "FB",
            "qty": 48
        },
        {
            "ticker": "TSLA",
            "qty": 250
        },
        {
            "ticker": "AMD",
            "qty": 235
        },
        {
            "ticker": "NVDA",
            "qty": 328
        },
        {
            "ticker": "BABA",
            "qty": 43
        },
        {
            "ticker": "NFLX",
            "qty": 39
        },
        {
            "ticker": "HOOD",
            "qty": 83
        }
    ];
    var soldStocks = [
        {
            "ticker": "AAPL",
            "qty": 748
        },
        {
            "ticker": "TSLA",
            "qty": 250
        },
        {
            "ticker": "AMD",
            "qty": 235
        },
        {
            "ticker": "NVDA",
            "qty": 328
        },
        {
            "ticker": "NFLX",
            "qty": 39
        }
    ]
    var stockQtyMapping = {"AAPL": 748, "TWLO": 127, "FB": 48, "TSLA": 250, "AMD":235, "NVDA":328, "BABA":43, "NFLX":39, "HOOD":83};
    var k = "3FBPZWSCYKH9";

    var getTotalPrice = function(stock) {
        return $.get(`https://api.gugudata.com/stock/us/realtime?appkey=${k}&symbol=${stock.ticker}`);
    }

    function getAllHaHa() {
        var sum = 0;
        var count = 0;

        // update soldStocks
        targetStocks = soldStocks;
        for (var i = 0; i < targetStocks.length; i++) {
            var haha = i;
            getTotalPrice(targetStocks[i]).then(function(data) {
                // console.log(data);
                $("#hypothetical_price_table").last().append(`<tr><td>${data.Data[0].Symbol}</td><td>${stockQtyMapping[data.Data[0].Symbol]}</td> <td>${data.Data[0].Latest.toFixed(2)}</td></tr>`)
                console.log(data);

                count += 1
                sum += data.Data[0].Latest * stockQtyMapping[data.Data[0].Symbol]

                if (count === targetStocks.length) {
                    console.log(sum);
                    $("#hypothetical_price").text(sum.toFixed(2));                    
                }
            });
        }
        console.log(sum);
        return sum.toFixed(2);
    }

    getAllHaHa();
});
