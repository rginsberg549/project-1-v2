var nytAPIKey = "&api-key=iabwIkv6ykHl3BTclLtwozsw8QZXDrxl";
var companyArticlesElement = $(".company-articles");


function getArticleSearchSettings(q) {
    console.log("1: " + q);
    var query = "&q=" + q
    console.log("query value: " + query);
    
    var articleSearchSettings = {
        "url": "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + query + nytAPIKey,
        "method": "GET",
    }

    console.log("Article Search Settings: " + articleSearchSettings);
    return articleSearchSettings
}

function clearCompanyArticles() {
    companyArticlesElement.empty();
}

function getCompanyArticles(q) {
    $.ajax(getArticleSearchSettings(q)).done(function(response) {
        var articleData = (response.response.docs)
        setTimeout(function() {
            companyArticlesElement.empty();
;            for (let index = 0; index < articleData.length -1; index++) {
                var articleDiv = $("<div>");
                
                var cardImgDiv = $("<div>");
                cardImgDiv.attr("class", "card-image");
                articleDiv.addClass("uk-card uk-card-body uk-width-medium uk-height-medium uk-background-muted uk-overflow-hidden uk-card-hover")

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
                articleDiv.append([cardImgDiv, articleLink]);
                companyArticlesElement.append(articleDiv);
            }
        }, 3000)
    });
}












