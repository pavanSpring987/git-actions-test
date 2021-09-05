const csvFilePath='india_2021-09-05.csv'
const csv=require('csvtojson')
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{

  //console.log(Array.isArray(jsonObj))
  let i = 0;
  jsonObj.forEach((val, ind) => {

    let lastTradedVal = +val['Last'];
    let fiftyTwoWeekLow = +val['52 Week Low'];
    let tickerVal = val['Ticker'];
    let exchange = val['Exchange'];
    let sma200 = +val['Simple Moving Average (200)']
    let percentageVal = ((30/100)*fiftyTwoWeekLow)+fiftyTwoWeekLow;
    let smaPercentageVal = ((30/100)*sma200)+sma200;
    let marketCaptilization = +val['Market Capitalization']
    let dividendYield = +val['Dividends Yield (FY)'];
    let debtToEquity = +val['Debt to Equity Ratio (MRQ)'];
    let sector = val['Sector'];
    let crore = 10000000;
    let largeCap = marketCaptilization >= 20000*crore;
    let midCap = (marketCaptilization >= (5000*crore)) &&  (marketCaptilization <= (20000*crore));
    let smallCap = marketCaptilization <= (5000*crore);
    let nse = (exchange === 'NSE');
    let bse = (exchange === 'BSE');
    let dividend = (dividendYield > 6);
    let debt = (debtToEquity <= 2.30);
    let low52week = (lastTradedVal <= percentageVal);
    let sma200week = (lastTradedVal <= smaPercentageVal);
    let peratio = val['Price to Earnings Ratio (TTM)']
    
    const expr = 'week52low-largecap';
    switch (expr) {
      case 'dividend-largecap': { 
        if(nse && largeCap && debt && dividend)
        console.log(i++, { company: tickerVal, 
          exchange: exchange, lastTradedVal: lastTradedVal,
          percentageVal: percentageVal,
          marketCaptilization: marketCaptilization,
          debt: debtToEquity,
          dividend: dividendYield,
          peratio: peratio,
          sector:sector
         })
          }
        break;
      case 'week52low-largecap':
        { 
          if(nse && largeCap && debt && low52week)
          console.log(i++, { company: tickerVal, 
            exchange: exchange, lastTradedVal: lastTradedVal,
            percentageVal: percentageVal,
            marketCaptilization: marketCaptilization,
            debt: debtToEquity,
            dividend: dividendYield,
            peratio: peratio,
            sector:sector
           })
        }
       break;
      case 'week52low-midcap':
        { 
          if(nse && midCap && debt && low52week)
          console.log(i++, { company: tickerVal, 
            exchange: exchange, lastTradedVal: lastTradedVal,
            percentageVal: percentageVal,
            marketCaptilization: marketCaptilization,
            debt: debtToEquity,
            dividend: dividendYield,
            peratio: peratio,
            sector:sector
           })
        }
       break;
      case 'sma200low-largecap':
        { 
          if(nse && largeCap && debt && sma200week)
          console.log(i++, { company: tickerVal, 
            exchange: exchange, lastTradedVal: lastTradedVal,
            percentageVal: percentageVal,
            marketCaptilization: marketCaptilization,
            debt: debtToEquity,
            dividend: dividendYield,
            peratio: peratio,
            sector:sector
           })
        }
       break;
      case 'sma200low-midcap':
        { 
          if(nse && midCap && debt && sma200week)
          console.log(i++, { company: tickerVal, 
            exchange: exchange, lastTradedVal: lastTradedVal,
            percentageVal: percentageVal,
            marketCaptilization: marketCaptilization,
            debt: debtToEquity,
            dividend: dividendYield,
            peratio: peratio,
            sector:sector
           })
        }
       break;
      case 'sma200low':
      default:
        console.log(`Sorry, we are out of ${expr}.`);
    }
 
  })
   
})




