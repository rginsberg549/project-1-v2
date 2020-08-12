

var countdown = 0

$("button").click(function (e) {
    e.preventDefault()


        if (countdown == 0) {
        
        stockInput = $("#stockInput").val()
        var userInput = stockInput
        bigFunction(userInput)
        $("button").prop("disabled", true)
        $("#stockInput").prop("disabled", true)
        count()

            setTimeout(function() {
                $("button").prop("disabled", false) 
                $("#stockInput").prop("disabled", false)
            return countdown--
            }, 60000)

        return countdown++
        
        } 
     
  })
    
  function count() {
  var count = 60
  timer = setInterval(function () {
      $("#time-remaining").html("must wait: " + count).slice(-2)
      count--;
      if (count < 0) {
          clearInterval(timer);
          $("#time-remaining").text(" ")
      }
  }, 1000)
  }

function bigFunction(userInput){

console.log(userInput)
apiKey = "ZY0GHO5HP0KA7RXS"
queryUrl = `https://www.alphavantage.co/query?function=EMA&symbol=${userInput}&interval=daily&outputsize=compact&time_period=8&series_type=close&apikey=${apiKey}`
queryUrl21 = `https://www.alphavantage.co/query?function=EMA&symbol=${userInput}&interval=daily&outputsize=compact&time_period=21&series_type=close&apikey=RI8WT63FUILHT9I5`
queryUrlPrice = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${userInput}&interval=daily&outputsize=compact&time_period=30&series_type=close&apikey=PS6W6YOXT2Q339Y6`


    

        var stockLabels = []
        var stockPrices8 = []
        var stockPrices21 = []
        var stockRealPrice = []
        
            function measureMe(){
                    
                    setTimeout (function(){
                    
                    
                        checkUptrend()
                        
                            
                            function checkUptrend (){
                                console.log("test uptrend")
                                    for (i = 18; i < 31; i++) {
                                        
                                        if (stockPrices8[i] < stockPrices21[i]) {
                                            checkdownTrend()
                                            break;
                                        } else {
                                            uptrendLoaded()
                                            
                                        }
                                    }    
                            }
                            function uptrendLoaded() {
                                
                                $("#trend-text").text("Uptrend Detected")
                                $("#trend-text").css({color: "green"})
                            }

                            function checkdownTrend (){
                                    console.log("test downtrend")
                                    for (i = 18; i < 31; i++) {
                                        if (stockPrices8[i] > stockPrices21[i]) {
                                            $("#trend-text").text("None Detected")
                                            $("#trend-text").css({color: "black"})
                                            break;
                                        } else {
                                            downtrendLoaded()
                                            } 
                                    }
                            }    

                                function downtrendLoaded() {
                                    $("#trend-text").text("Downtrend Detected")
                                    $("#trend-text").css({color: "red"})
                                }

                    
                    }, 3000)
                    
             }

function otherData(){
           
            $.ajax({
                url: queryUrlPrice,
                method: "GET",
                success: function(response){
                    var convertSeriesObj = Object.entries(response["Time Series (Daily)"])
                    for (i = 0; i < 30; i++) {
                    stockRealPrice.unshift(convertSeriesObj[i][1]["1. open"])
                    }
                },
                complete: secondAjax(),
            })

            async function secondAjax(){
                await $.ajax({
                    url: queryUrl21,
                    method: "GET",
                    success: function(response){
                    var convertSeriesObj2 = Object.entries(response["Technical Analysis: EMA"])
                    for (i = 0; i < 30; i++) {
                    stockPrices21.unshift(convertSeriesObj2[i][1].EMA)
                        }
                    },
                    complete: thirdAjax(),
                })
            }


            async function thirdAjax() {
                await $.ajax({
                    url: queryUrl,
                    method: "GET",
                    success: function(response){
                    var convertSeriesObj3 = Object.entries(response["Technical Analysis: EMA"])
                        for (i = 0; i < 30; i++) {
                        stockLabels.unshift(convertSeriesObj3[i][0])
                        stockPrices8.unshift(convertSeriesObj3[i][1].EMA)
                        
                        }

                    }
                }) 
            }  
            measureMe(stockPrices8, stockPrices21)
            makeChart(stockLabels, stockPrices8, stockPrices21 , stockRealPrice)
    
    }


function makeChart(stockLabels, stockPrices8, stockPrices21, stockRealPrice) {
   

    setTimeout (function() {
       
            var ctx = document.getElementById('stock-chart').getContext('2d');    
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: stockLabels,
                    datasets: [{
                        label: "8 MA",
                        data: stockPrices8,
                        borderColor: 'blue',
                        borderWidth: 1
                    },{
                        label: "21 MA",
                        data: stockPrices21,
                        borderColor: "green",
                        borderWidth: 1,
                        
                    }, {
                        label: "Stock Price",
                        data: stockRealPrice,
                        borderColor: "yellow",
                        borderWidth: 1,
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: userInput,
                        fontSize: 32,
                    },
                    legend: {
                        position: "bottom",
                    },
                    
                    scales: {
                        yAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    }
                },
            });
          
 

}, 3000)

}



otherData();

}