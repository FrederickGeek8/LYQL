var LYQL = require('./main.js');

var options = {
  "Stocks": ["GOOG", "AAPL", "JPYUSD=X"],
  "Parameters": ["p44", "c64", "t54"]
};

var test = new LYQL(options, function(data){
  console.log(data);
});

test.start();

setTimeout(function () {
  test.stop();
}, 5000);

setTimeout(function () {
  test.start();
}, 10000);
