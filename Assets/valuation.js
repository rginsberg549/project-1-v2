var rapidAPIkey = "c08946528f1aa8ab38e951cb961b2d08";
var globalDataObj = [];
var companyProfileObj = {};

var input = $("#stockInput");
var submit = $("#submit");

var companyProfileElement = $("valuation");
var companyImageElement = $(".company-image");
var companyNameElement = $(".company-name");
var ceoNameElement = $(".ceo-name");
var industryElement = $(".industry");
var currentPriceElement = $(".current-price");

var dateElement = $(".date");
var epsElement = $(".eps");
var dividentElement = $(".dividends");
var grossProfitRatioElement = $(".gross-profit-ratio");
var netIncomeRatioElement = $(".net-income-ratio");
var totalAssetsElement = $(".total-assets");
var totalDebtElement = $(".total-debt");

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

function getIncomeStatementSettings() {
    var incomeStatementSettings = {
        "async": true,
        "crossDomain": true,
        "url": "https://financial-modeling-prep.p.rapidapi.com/income-statement/" + getStockSymbol() + "?apikey=" + rapidAPIkey,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "financial-modeling-prep.p.rapidapi.com",
            "x-rapidapi-key": "c23481d564msh4d48ca2d97c6375p1be85ejsna769421f074b"
        }
    }
    return incomeStatementSettings
}

function getIncomeStatement() {
    $.ajax(getIncomeStatementSettings()).done(function (response) {
        for (let index = 0; index < response.length; index++) {
            globalDataObj[response[index].date] = {
                ...globalDataObj[response[index].date],
                "eps" : response[index].eps,
                "grossProfitRatio" : response[index].grossProfitRatio,
                "netIncomeRatio" : response[index].netIncomeRatio
            }
        }
    });
}

function getCashFlowSettings() {
    var cashFlowSettings = {
        "async": true,
        "crossDomain": true,
        "url": "https://financial-modeling-prep.p.rapidapi.com/cash-flow-statement/" + getStockSymbol() + "?apikey=" + rapidAPIkey,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "financial-modeling-prep.p.rapidapi.com",
            "x-rapidapi-key": "c23481d564msh4d48ca2d97c6375p1be85ejsna769421f074b"
        }
    }
    return cashFlowSettings;
}

function getCashFlow() {
    $.ajax(getCashFlowSettings()).done(function (response) {
        for (let index = 0; index < response.length; index++) {
            globalDataObj[response[index].date] = {
                ...globalDataObj[response[index].date],
                "netCashProvidedByOperatingActivities" : response[index].netCashProvidedByOperatingActivities,
                "operatingCashFlow" : response[index].operatingCashFlow,
                "freeCashFlow" : response[index].freeCashFlow
            }
        }
    });
}

function getBalanceSheetSettings() {
    var balanceSheetSettings = {
        "async": true,
        "crossDomain": true,
        "url": "https://financial-modeling-prep.p.rapidapi.com/balance-sheet-statement/" + getStockSymbol() + "?apikey=" + rapidAPIkey,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "financial-modeling-prep.p.rapidapi.com",
            "x-rapidapi-key": "c23481d564msh4d48ca2d97c6375p1be85ejsna769421f074b"
        }
    }
    return balanceSheetSettings
}

function getBalanceSheet() {
    $.ajax(getBalanceSheetSettings()).done(function (response) {
        for (let index = 0; index < response.length; index++) {

            globalDataObj[response[index].date] = {
                ...globalDataObj[response[index].date],
                "totalAssets" : response[index].totalAssets,
                "totalDebt" : response[index].totalDebt
            }
        }
    }); 
}

function getCompanyProfileSettings() {
    var companyProfileSettings = {
        "async": true,
        "crossDomain": true,
        "url": "https://financial-modeling-prep.p.rapidapi.com/profile/" + getStockSymbol()  + "?apikey=" + rapidAPIkey,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "financial-modeling-prep.p.rapidapi.com",
            "x-rapidapi-key": "c23481d564msh4d48ca2d97c6375p1be85ejsna769421f074b"
        }
    }
    return companyProfileSettings
}

function getCompanyProfile() {
    $.ajax(getCompanyProfileSettings()).done(function (response) {

        for (let index = 0; index < response.length; index++) {
            companyProfileObj = {
                ...companyProfileObj[response[index]],
                "companyName" : response[index].companyName,
                "ceo" : response[index].ceo,
                "image" : response[index].image,
                "industry" : response[index].industry,
                "price" : response[index].price,
                "dividend" : response[index].lastDiv
            }
        }
    });
}


function renderCompanyValuation() {
    getIncomeStatement();
    getBalanceSheet();
    getCashFlow();
    getCompanyProfile();
    


    setTimeout(function() { 
        $("#headline-text").text("Headline News")
        var tempDate = Object.keys(globalDataObj)[0];
        companyImageElement.attr("src", companyProfileObj.image);
        companyNameElement.text(companyProfileObj.companyName);
        getCompanyArticles(companyProfileObj.companyName);
        ceoNameElement.text(companyProfileObj.ceo);
        industryElement.text(companyProfileObj.industry);
        currentPriceElement.text(companyProfileObj.price);
        dateElement.text(tempDate);
        epsElement.text((globalDataObj[tempDate].eps).toFixed(2));
        dividentElement.text((companyProfileObj.dividend).toFixed(2));
        grossProfitRatioElement.text((globalDataObj[tempDate].grossProfitRatio * 100).toFixed(2) + "%")
        netIncomeRatioElement.text((globalDataObj[tempDate].netIncomeRatio *100).toFixed(2) + "%")
        totalAssetsElement.text(formatter.format(globalDataObj[tempDate].totalAssets));
        totalDebtElement.text(formatter.format(globalDataObj[tempDate].totalDebt));
    }, 2000);
}

function getStockSymbol() {
    var input = $("#stockInput").val();
    return input;
}

submit.on("click", renderCompanyValuation);

