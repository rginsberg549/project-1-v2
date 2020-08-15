import { bigFunction } from "./trend-chart.js"
// import { calValuation } from "./valuation.js"

    var countdown = 0

$("button").click(function (e) {
    e.preventDefault()

        if (countdown < 4) {
        
        var stockInput = $("#stockInput").val()
        var userInput = stockInput
       
        bigFunction(userInput)
        // calValuation(userInput)
        
            setTimeout(function() {
            return countdown--
            }, 18000)

        return countdown++
        
        } else {
            $("button").prop("disabled", true)
            $("#stockInput").prop("disabled", true)
            count()
        }
     
  })
    
  function count() {
  var count = 20
  timer = setInterval(function () {
      $("#time-remaining").html("slow down... please wait: " + count).slice(-2)
      count--;
      if (count < 0) {
          clearInterval(timer);
          $("#time-remaining").text(" ")
          $("button").prop("disabled", false) 
          $("#stockInput").prop("disabled", false)
      }
  }, 1000)
  }



