var LYQL = require('./main.js');

var options = {
  "Stocks": ["AAPL", "JPYUSD=X"],
  "Parameters": ["h53", "g53"]
};

var test = new LYQL(options, function(data){
  console.log(data);
});

test.start();

setTimeout(function () {
  test.addStock("GOOG");
  console.log("Added");
}, 5000);

setTimeout(function () {
  test.removeStock("AAPL");
  console.log("Removed");
}, 10000);

setTimeout(function() {
  test.addParameter("l10");
  console.log("Added l10");
}, 15000);

setTimeout(function() {
  test.removeParameter("h53");
  console.log("Removed h53");
}, 20000);
