var searchElementBtn = $("#submit");
var inputElement = $("#stockInput");
var searchHistoryElement = $(".search-history");
var searchHistoryId = 0;
var searchHistoryArray = [];


function getInputValue() {
    var searchValue = inputElement.val();
    return searchValue;
}

function createSearchHistoryButton() {
    var btnValue = getInputValue();
    if (searchHistoryArray.includes(btnValue)) {
        return;
    }

    searchHistoryArray.push(btnValue);
    localStorage.setItem("search-history", searchHistoryArray);

    var btn = $("<button>");
    btn.attr("class", "search-history-button");
    btn.attr("id", "search-history-btn-" + searchHistoryId);
    btn.addClass("uk-button uk-button-default")
    btn.attr("value", btnValue);
    btn.text(btnValue);

    var metaSpan = $("<span>");
    metaSpan.attr("data-date", "");
    metaSpan.text("");

    var span = $("<span>");
    span.attr("class", "clear-search-history");
    span.attr("id", searchHistoryId);
    searchHistoryId += 1;
    span.html("&times;");
    span.on("click", removeSearchHistoryButton)

    btn.append(metaSpan, span);
    btn.on("click", getSearchHistoryButtonValue);

    searchHistoryElement.append(btn);
}

function createSearchHistoryButtonFromStorage(data) {

    var btnValue = data;
    if (searchHistoryArray.includes(btnValue)) {
        return;
    }

    searchHistoryArray.push(btnValue);
    localStorage.setItem("search-history", searchHistoryArray);

    var li = $("<li>");

    var btn = $("<button>");
    btn.attr("class", "search-history-button");
    btn.attr("id", "search-history-btn-" + searchHistoryId);
    btn.addClass("uk-button uk-button-default")
    btn.attr("value", btnValue);
    btn.attr("data-value", btnValue);
    btn.text(btnValue);

    var metaSpan = $("<span>");
    metaSpan.attr("data-date", "test");
    metaSpan.text("");

    var span = $("<span>");
    span.attr("class", "clear-search-history");
    span.attr("id", searchHistoryId);
    searchHistoryId += 1;
    span.html("&times;");
    span.on("click", removeSearchHistoryButton)

    btn.append(metaSpan, span);
    btn.on("click", getSearchHistoryButtonValue);

    searchHistoryElement.append(btn);
}


function getSearchHistoryButtonValue() {
    console.log($(this));

    var historyButtonValue = $(this).val();
    inputElement.val(historyButtonValue);
    renderCompanyValuation()
}

function removeSearchHistoryButton() {
    console.log("Hello")
    var btnId = $("#search-history-btn-" + $(this).attr("id"));

    var idx = searchHistoryArray.indexOf(btnId.val());

    if (idx > -1) {
        searchHistoryArray = searchHistoryArray.splice(idx, 1);
    }

    searchHistoryArray.splice(idx, 1)
    btnId.remove();
    localStorage.setItem("search-history", searchHistoryArray);
}

function renderSearchHistory() {
    var searchHistoryFromStorage = localStorage.getItem("search-history");
    if (searchHistoryFromStorage == "") {
        return
    }

    searchHistoryArrayFromStorage = searchHistoryFromStorage.split(",")
    for (let index = 0; index < searchHistoryArrayFromStorage.length; index++) {
        createSearchHistoryButtonFromStorage(searchHistoryArrayFromStorage[index]);
    }
}

searchElementBtn.on("click", createSearchHistoryButton);
renderSearchHistory()

