var stockSymbol = "AAPL"
var companyName = "Apple Inc."

var companyArticlesElement = $(".company-articles");


var endpointURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"
var nytAPIKey = "&api-key=iabwIkv6ykHl3BTclLtwozsw8QZXDrxl";
var query = "&q=" + companyName
var beginDate = "begin_date=20200801"
var endDate = "&end_date=20200813"

console.log(endpointURL + beginDate + endDate + query + nytAPIKey);

var articleSearchSettings = {
	"url": (endpointURL + beginDate + endDate + query + nytAPIKey),
	"method": "GET",
}

function getCompanyArticles() {
    $.ajax(articleSearchSettings).done(function(response) {
        var articleData = (response.response.docs)
        console.log(articleData);
        setTimeout(function() {
            for (let index = 0; index < articleData.length; index++) {
                var articleDiv = $("<div>");
                
                var cardImgDiv = $("<div>");
                cardImgDiv.attr("class", "card-image");

                articleDiv.attr("class", "card");

                var articleLink = $("<a>");

                var articleImage = $("<img>");


                articleLink.attr("href", articleData[index].web_url);
                articleLink.text(articleData[index].abstract);

                if (articleData[index].multimedia[17] != null) {
                    articleImage.attr("src", "https://www.nytimes.com/" + articleData[index].multimedia[17].url);
                    cardImgDiv.append(articleImage);
                } else {
                    articleImage.attr("src", "");
                    cardImgDiv.append(articleImage);
            }
                console.log(articleData[index].multimedia)

                articleDiv.append([cardImgDiv, articleLink]);
                companyArticlesElement.append(articleDiv);
            }
        }, 2000)
    });
}

getCompanyArticles()








