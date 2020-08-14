// export function calValuation(stockSymbol) {

// var stockSymbol = "AAPL"
var apikey = "48e7fd131027143a2fc901de569ad2ce"

var globalDataObj = [];
var companyProfileObj = {};

var companyProfileElement = $("valuation");
var companyImageElement = $(".company-image");
var companyNameElement = $(".company-name");
var ceoNameElement = $(".ceo-name");
var industryElement = $(".industry");
var currentPriceElement = $(".current-price");

var dateElement = $(".date");
var epsElement = $(".eps");
var grossProfitRatioElement = $(".gross-profit-ratio");
var netIncomeRatioElement = $(".net-income-ratio");
var totalAssetsElement = $(".total-assets");
var totalDebtElement = $(".total-debt");

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

var incomeStatementSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://financial-modeling-prep.p.rapidapi.com/income-statement/" + stockSymbol + "?apikey=" + apikey,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "financial-modeling-prep.p.rapidapi.com",
		"x-rapidapi-key": "c23481d564msh4d48ca2d97c6375p1be85ejsna769421f074b"
	}
}

var cashFlowSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://financial-modeling-prep.p.rapidapi.com/cash-flow-statement/" + stockSymbol + "?apikey=" + apikey,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "financial-modeling-prep.p.rapidapi.com",
		"x-rapidapi-key": "c23481d564msh4d48ca2d97c6375p1be85ejsna769421f074b"
	}
}

var balanceSheetSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://financial-modeling-prep.p.rapidapi.com/balance-sheet-statement/" + stockSymbol + "?apikey=" + apikey,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "financial-modeling-prep.p.rapidapi.com",
		"x-rapidapi-key": "c23481d564msh4d48ca2d97c6375p1be85ejsna769421f074b"
	}
}

var companyProfileSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://financial-modeling-prep.p.rapidapi.com/profile/" + stockSymbol  + "?apikey=" + apikey,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "financial-modeling-prep.p.rapidapi.com",
		"x-rapidapi-key": "c23481d564msh4d48ca2d97c6375p1be85ejsna769421f074b"
	}
}

function getIncomeStatement() {
    $.ajax(incomeStatementSettings).done(function (response) {
        console.log(response)
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

function getCashFlow() {
    $.ajax(cashFlowSettings).done(function (response) {
        console.log(response)
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

function getBalanceSheet() {
    $.ajax(balanceSheetSettings).done(function (response) {
        console.log(response)
        for (let index = 0; index < response.length; index++) {

            globalDataObj[response[index].date] = {
                ...globalDataObj[response[index].date],
                "totalAssets" : response[index].totalAssets,
                "totalDebt" : response[index].totalDebt
            }
        }
    }); 
}

function getCompanyProfile() {
    $.ajax(companyProfileSettings).done(function (response) {
        console.log(response)
        for (let index = 0; index < response.length; index++) {
            companyProfileObj = {
                ...companyProfileObj[response[index]],
                "companyName" : response[index].companyName,
                "ceo" : response[index].ceo,
                "image" : response[index].image,
                "industry" : response[index].industry,
                "price" : response[index].price
            }
        }
        renderCompanyProfile();
    });
}


function renderCompanyProfile() {
    
}

function renderCompanyValuation() {
    getBalanceSheet();
    getCashFlow();
    getCompanyProfile();
    getIncomeStatement();

    setTimeout(function() {
        var tempDate = Object.keys(globalDataObj)[0];
        companyImageElement.attr("src", companyProfileObj.image);
        companyNameElement.text("Comany Name: " + companyProfileObj.companyName);
        ceoNameElement.text("CEO: " + companyProfileObj.ceo);
        industryElement.text("Industry: " + companyProfileObj.industry);
        currentPriceElement.text("Share Price (Now): " + companyProfileObj.price);
        dateElement.text("Reprted on: " + tempDate);
        epsElement.text("Earnings Per Share: " + globalDataObj[tempDate].eps);
        grossProfitRatioElement.text("Gross Profit Ratio: " + (globalDataObj[tempDate].grossProfitRatio * 100).toFixed(2) + "%")
        netIncomeRatioElement.text("Net Income Ratio: " + (globalDataObj[tempDate].netIncomeRatio *100).toFixed(2) + "%")
        totalAssetsElement.text("Total Assets: " + formatter.format(globalDataObj[tempDate].totalAssets));
        totalDebtElement.text("Total Debt: " + formatter.format(globalDataObj[tempDate].totalDebt));
    }, 3000);
}

renderCompanyValuation()

// }