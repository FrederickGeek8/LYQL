# LYQL
**Disclaimer: I am in no way affiliated with Yahoo. This tool likely violates Yahoo Terms and Conditions by using non-public API's. Use *only* for personal use. I am not liable for misuse of this program or any effects it may have.**

## Super simple to use
LYQL is a tool for achieving truly real-time, free stock prices direct from Yahoo. LYQL is designed to be a simple, intuitive library solution that can be used both in the browser and on a server.
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

## Commands
```javascript
new LYQL(options, function(data) {
  // ...
});
```
Creates an instance of LYQL that calls a given function whenever new data has been streamed from Yahoo.

`options` should be an object in the format
```javascript
var options = {
  "Stocks": ["GOOG", "AAPL", "JPYUSD=X"],
  // Price, Change, and Volume
  "Parameters": ["l84", "p43", "v53"]
};
```
In order to start, stop, and restart LYQL instances, one of the following commands can be executed on an LYQL instance.
```javascript
LYQL.start();
LYQL.stop();
LYQL.restart();
```
In order to add or remove a stock from a LYQL instance, one of the following commands can be executed.
```javascript
LYQL.addStock(ticker);
LYQL.removeStock(ticker);
```
In order to add or remove a request parameter from a LYQL instance, one of the following can be run.
```javascript
LYQL.addParameter(parameter);
LYQL.removeParameter(parameter);
```


## TODO
- [ ] Write documentation / code comments.
- [x] Modularize so that it can be used within other use cases.
- [x] Add Browser support (Browserify)
