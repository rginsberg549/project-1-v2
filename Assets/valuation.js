var stockSymbol = "AAPL";

var incomeStatementArray = [];
var balanceSheetArray = [];
var cashFlowArray = [];
var companyProfileArray = [];

var incomeStatementSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://financial-modeling-prep.p.rapidapi.com/income-statement/" + stockSymbol + "?apikey=demo",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "financial-modeling-prep.p.rapidapi.com",
		"x-rapidapi-key": "c23481d564msh4d48ca2d97c6375p1be85ejsna769421f074b"
	}
}

var cashFlowSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://financial-modeling-prep.p.rapidapi.com/cash-flow-statement/" + stockSymbol + "?apikey=demo",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "financial-modeling-prep.p.rapidapi.com",
		"x-rapidapi-key": "c23481d564msh4d48ca2d97c6375p1be85ejsna769421f074b"
	}
}

var balanceSheetSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://financial-modeling-prep.p.rapidapi.com/balance-sheet-statement/" + stockSymbol + "?apikey=demo",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "financial-modeling-prep.p.rapidapi.com",
		"x-rapidapi-key": "c23481d564msh4d48ca2d97c6375p1be85ejsna769421f074b"
	}
}

var companyProfileSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://financial-modeling-prep.p.rapidapi.com/profile/" + stockSymbol  + "?apikey=demo",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "financial-modeling-prep.p.rapidapi.com",
		"x-rapidapi-key": "c23481d564msh4d48ca2d97c6375p1be85ejsna769421f074b"
	}
}

function getIncomeStatement() {
    $.ajax(incomeStatementSettings).done(function (response) {
        for (let index = 0; index < response.length; index++) {
            data = {
                "date" : response[index].date,
                "eps" : response[index].eps,
                "gross profit ratio" : response[index].grossProfitRatio,
                "net income ratio" : response[index].netIncomeRatio
            }
            incomeStatementArray.push(data);
        }
        console.log(incomeStatementArray.slice(0,5))
    });
}

function getCashFlow() {
    $.ajax(cashFlowSettings).done(function (response) {
        for (let index = 0; index < response.length; index++) {
            data = {
                "date" : response[index].date,
                "netCashProvidedByOperatingActivities" : response[index].netCashProvidedByOperatingActivities,
                "operatingCashFlow" : response[index].operatingCashFlow,
                "freeCashFlow" : response[index].freeCashFlow
            }
            cashFlowArray.push(data)  
        }
        console.log(cashFlowArray.slice(0,5))
    });
}

function getBalanceSheet() {
    $.ajax(balanceSheetSettings).done(function (response) {
        for (let index = 0; index < response.length; index++) {
            data = {
                "date" : response[index].date,
                "totalAssets" : response[index].totalAssets,
                "totalDebt" : response[index].totalDebt
            }

            balanceSheetArray.push(data);
        }

        console.log(balanceSheetArray.slice(0,5));
    }); 
}

function getCompanyProfile() {
    $.ajax(companyProfileSettings).done(function (response) {
        for (let index = 0; index < response.length; index++) {
            data = {
                "companyName" : response[index].companyName,
                "ceo" : response[index].ceo,
                "image" : response[index].image,
                "industry" : response[index].industry,
                "price" : response[index].price
            }
            companyProfileArray.push(data);
        }
        console.log(companyProfileArray.slice(0,5));
    });
}

getBalanceSheet();
getCashFlow();
getCompanyProfile();
getIncomeStatement();