var net = require("net");
var HOST = "127.0.0.1";
var PORT = 6969;
var clientName = "Client 2";
var client = new net.Socket();
client.connect(PORT, HOST, function () {
    console.log("CONNECTED TO: " + HOST + ":" + PORT);

    client.write(clientName);
});

client.on("data", function (data) {
    console.log("DATA: " + data);
    //    client.destroy();
});

//client.on("close", function () {
//    console.log("Connection closed");
//});
