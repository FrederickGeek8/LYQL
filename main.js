/*
  I have designed this as a singleton class. If you believe that this should not
  be the case, submit a issue or pull request on Github and I will add this
  feature.
*/
var trumpet = require('trumpet');
var request = require('request');
var blacklist = ["unixtime", "m_open_close"];

function LYQL(options, callback) {
  if (typeof(options.Advanced) == "boolean") {
    this.advanced = options.Advanced;
  } else {
    this.advanced = false;
  }

  if (typeof(options.Stocks) == "object") {
    this.stocks = options.Stocks;
  } else {
    throw "options.Stocks must be a non-empty array";
  }

  if (typeof(options.Parameters) == "object") {
    this.parameters = options.Parameters;
  } else {
    throw "options.Parameters must be a non-empty array";
  }

  if (typeof callback == "function") {
    this.callback = callback;
  } else {
    throw "A callback function must be defined";
  }
  this.curr = null;
}

LYQL.prototype.start = function() {
  var querystring = this.stocks.join(",");
  var callback = this.callback;
  // console.log(querystring);

  var tr = trumpet();
  tr.selectAll('script', function(span) {
    var chunked = "";
    var stream = span.createReadStream();
    stream.on('data', function(chunk) {
      chunked += chunk;
    });
    stream.on('end', function() {
      // console.log(chunked);
      if (chunked != " document.domain='finance.yahoo.com'; " && chunked != " document.domain='finance.yahoo.com'; </script>") {
        var mined = data_mining(chunked);
        mined = JSON.parse(mined.replace(/([a-z][0-9][0-9])(?=:)+/g, "\"$&\""));
        if(!blacklist.includes(Object.keys(mined)[0])) {
          callback.call(this, mined);
        }
      }
    });
  });

  //  Tis nobler to get everything
  var url = "https://streamerapi.finance.yahoo.com/streamer/1.0?s=" + querystring + "&k=" + this.parameters.join(",") + "&callback=parent.yfs_u1f&mktmcb=parent.yfs_mktmcb&gencallback=parent.yfs_gencb";
  this.curr = request(url);
  this.curr.on('error', function handleError(err) { /* ... */ });
  this.curr.pipe(tr);
};

var data_mining = function (data) {
    data = data.slice(19);
    if(data.charAt(0) == 'c') {
        data = data.slice(3);
    }
    if(data.charAt(data.length-1) == '>') {
        data = data.slice(0, data.length-9);
    }
    data = data.slice(0, data.length-13);
    return data;
};

LYQL.prototype.stop = function() {
  this.curr.abort();
};

LYQL.prototype.restart = function() {
  if (this.curr !== null) {
    this.stop();
    this.start();
  }
};

LYQL.prototype.addStock = function(ticker) {
  if(this.stocks.indexOf(ticker) == -1) {
    this.stocks.push(ticker);
    this.restart();
  }
};

LYQL.prototype.removeStock = function(ticker) {
  var index = this.stocks.indexOf(ticker);

  if (index > -1) {
    this.stocks.splice(index, 1);
    this.restart();
  }
};

LYQL.prototype.addParameter = function(parameter) {
  if(this.parameters.indexOf(parameter) == -1) {
    this.parameters.push(parameter);
    this.restart();
  }
};

LYQL.prototype.removeParameter = function(parameter) {
  var index = this.parameters.indexOf(parameter);

  if (index > -1) {
    this.parameters.splice(index, 1);
    this.restart();
  }
};

module.exports = LYQL;
