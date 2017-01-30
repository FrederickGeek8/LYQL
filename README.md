# LYQL
**Disclaimer: I am in no way affiliated with Yahoo. This tool likely violates Yahoo Terms and Conditions. Use *only* for personal use. I am not liable for misuse of this program or any effects it may have.**

LYQL is a tool for achieving truly real-time, free stock prices direct from Yahoo.

## Basic Usage
```javascript
var LYQL = require('LYQL');

var options = {
  "Stocks": ["GOOG", "AAPL", "JPYUSD=X"],
  // Price, Change, and Volume
  "Parameters": ["l84", "p43", "v53"]
};

var test = new LYQL(options, function(data){
  console.log(data);
});

test.start();
```


## Request Parameters
* **a00:** Ask
* **a50:** Ask Size
* **b00:** Bid
* **b60:** Bid Size
* **c10:** Change
* **c63:** Change Realtime
* **c64:** *Disputed* Change Realtime After Hours
* **c85:** Change Realtime After Hours
* **c86:** Percent Change Realtime After Hours
* **g53:** Day Low
* **h53:** Day High
* **j10:** Market Cap
* **l10:** Price
* **l84:** Price Realtime
* **l86:** Price Realtime After Hours
* **p20:** Percent Change
* **p43:** Percent Change Realtime
* **p44:** Percent Change Realtime After Hours
* **t53:** *Disputed* Timestamp for Commodities
* **t54:** *Disputed* Timestamp for Stocks
* **v53:** Volume

## Installation
`npm install LYQL`

## TODO
- [ ] Write documentation / code comments.
- [x] Modularize so that it can be used within other use cases.
- [x] Add Browser support (Browserify)
