var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var es = require('event-stream');
var trumpet = require('trumpet');
var keys = Object.keys || require('object-keys');
var request = require('request');
var events = require('events');
var _ = require('underscore');
var eventEmitter = new events.EventEmitter();
var curr = null;
var blacklist = ["unixtime"];
var params = ["l84", "c10", "c86", "c85", "l86"]; // removed c63

var port = 8000;
app.listen(port);
console.log("Starting server on: http://localhost:" + port);

function handler (req, res) {
    // console.log(req.url);
    if(req.url == '/'){
        fs.readdir(__dirname + "/public/", function(err, files) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            var stringdata = "<h1>Files</h1><ul>";
            files.forEach(function(f) {
                stringdata = stringdata + "<li><a href='http://localhost:" + port + "/" + f + "'>" + f + "</a></li>";
            });
            stringdata = stringdata + "</ul>";

            res.writeHead(200);
            res.end(stringdata);
        });
    }else{
        fs.readFile(__dirname + '/public' + req.url,
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
    }

}

var subscribers = [];
io.sockets.on('connection', function (socket) {

    var subscriptions = [];

    socket.emit("welcome");
    console.log("User connected");

    socket.on('subscribed', function (data) {
        for(var i=0;i<data.list.length;i++) {
            subscriptions.push(data.list[i]);
        }
        console.log("Subscriptions:", subscriptions);
        addUser(subscriptions, socket.id);

        if(curr != null){
            console.log(curr);
            curr.abort();
        }

        start_request();
    });

    socket.on('disconnect', function () {
        console.log("User disconnected");
        removeUser(subscriptions, socket.id);

        if(curr != null){
            curr.abort();
        }

        if(subscribers.length > 0) {
          start_request();
        }
    });

});

var start_request = function () {

    var querystring = keys(subscribers).join(",");
    // console.log(querystring);

    var tr = trumpet();
    tr.selectAll('script', function (span) {
        var chunked = "";
        var stream = span.createReadStream();
        stream.on('data', function(chunk) {
            chunked += chunk;
        });
        stream.on('end', function() {
            console.log(chunked);
            if(chunked != " document.domain='finance.yahoo.com'; " && chunked != " document.domain='finance.yahoo.com'; </script>") {
                var mined = data_mining(chunked);
                mined = mined.replace(/([a-z][0-9][0-9])(?=:)+/g, "\"$&\"");
                // console.log(mined + "\n");
                node_dist(JSON.parse(mined));
            }
        });
    });

//  Tis nobler to get everything
    var url = "https://streamerapi.finance.yahoo.com/streamer/1.0?s=" + querystring + "&k=" + params.join(",") + "&r=0&callback=parent.yfs_u1f&mktmcb=parent.yfs_mktmcb&gencallback=parent.yfs_gencb&region=US&lang=en-US&localize=0&mu=1&ts=1427741124050&dp=1"
    curr = request(url);
    curr.on('error', function handleError(err) { /* ... */ });
    curr.pipe(tr);
}

var node_dist = function (arr) {
    var keys = Object.keys(arr);
    if(keys.length == 1 && blacklist.indexOf(keys[0]) == -1) {
        // stocksss
        console.log("uhh", subscribers, keys);
        for(var i=0;i<subscribers[keys[0]].length;i++) {
            io.to(subscribers[keys[0]][i]).emit('update', arr);
        }
    }
    // console.log(Object.keys(arr));
}

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
}

var addUser = function (channels, id) {
    for(var i=0;i<channels.length;i++) {
        if((channels[i] in subscribers)) {
            subscribers[channels[i]].push(id);
        }else{
            var arr = [];
            arr.push(id);
            subscribers[channels[i]] = arr;
        }

    }
    console.log(subscribers);
}

var removeUser = function (subscriptions, id) {
    for(var i=0;i<subscriptions.length;i++) {
        var index = subscribers[subscriptions[i]].indexOf(id);
        if (index > -1) {
            subscribers[subscriptions[i]].splice(index, 1);
        }
        if(subscribers[subscriptions[i]].length == 0) {
            subscribers.splice(subscriptions[i], 1);
        }
    }
}
