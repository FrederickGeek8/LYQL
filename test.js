var LYQL = require('./main.js');

var options = {
  "Advanced": true,
  "Stocks": ["GOOG", "AAPL", "JPYUSD=X"],
  "Parameters": ["l84", "c10", "c86", "c85", "l86"]
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
