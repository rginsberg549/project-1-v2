var nytAPIKey = "&api-key=iabwIkv6ykHl3BTclLtwozsw8QZXDrxl";
var companyArticlesElement = $("#company-article-list");
var newsfeedSectionElement = $("#newsfeed");


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
    companyArticlesElement.empty();
    var sectionTitle = $(".newsfeed-section-title")
    sectionTitle.text("Recent News");
    $.ajax(getArticleSearchSettings(q)).done(function(response) {
        var articleData = (response.response.docs)
        console.log(articleData);
        setTimeout(function() {
            for (let index = 0; index < articleData.length -1; index++) {
                var articleListItem = $("<li>");

                var articleListImage = $("<img>");
                
                var articleListAbstract = $("<a>");
                articleListAbstract.text(articleData[index].abstract);

                if (articleData[index].multimedia[7] != null) {
                    articleListImage.attr("src", "https://www.nytimes.com/" + articleData[index].multimedia[7].url);
                    articleListImage.attr("class", "article-image");
                    articleListItem.append(articleListImage);
                    articleListItem.append([articleListImage, articleListAbstract]);
                    companyArticlesElement.append(articleListItem)
                } else {
                    continue
                }
            }
        }, 3000)
    });
}
















