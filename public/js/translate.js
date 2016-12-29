var translateStream = function(ping) {
    var keys = Object.keys(ping);
    var contents = ping[keys[0]];
    var contentkeys = Object.keys(contents);
    for (var i = 0; i<contentkeys.length; i++) {
        switch (contentkeys[i]) {
            case "c85":
                if(contents[contentkeys[i]] >= 0){
                    $("."+keys[0].replace(/\W/g, '')+".change").html('<a style="color:lime">'+contents[contentkeys[i]]+'</a>');
                }else{
                    $("."+keys[0].replace(/\W/g, '')+".change").html('<a style="color:red">'+contents[contentkeys[i]]+'</a>');
                }
                break;
            case "c10":
                if(contents[contentkeys[i]] >= 0){
                    $("."+keys[0].replace(/\W/g, '')+".change").html('<a style="color:lime">'+contents[contentkeys[i]]+'</a>');
                }else{
                    $("."+keys[0].replace(/\W/g, '')+".change").html('<a style="color:red">'+contents[contentkeys[i]]+'</a>');
                }
                break;
            /** Change Realtime - prefer non-realtime
            case "c63":
                if(contents[contentkeys[i]] >= 0){
                    $("."+keys[0].replace(/\W/g, '')+".change").html('<a style="color:lime">'+contents[contentkeys[i]]+'</a>');
                }else{
                    $("."+keys[0].replace(/\W/g, '')+".change").html('<a style="color:red">'+contents[contentkeys[i]]+'</a>');
                }
                break;
            */
            case "l84":
                $("."+keys[0].replace(/\W/g, '')+".price").text(contents[contentkeys[i]]);
                break;
            case "l86":
                $("."+keys[0].replace(/\W/g, '')+".price").text(contents[contentkeys[i]]);
                break;
            default:
                alert(ping + " is not defined.");
                break;
        }
    };
}
