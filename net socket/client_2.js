var net = require("net");
var HOST = "localhost";
var PORT = 6969;
var clientName = "Client 2";
var client = new net.Socket();
client.connect(PORT, HOST, function () {
    console.log("CONNECTED TO: " + HOST + ":" + PORT);
    console.log("(Crtl C to exit)");

    client.write(clientName);
});

client.on("data", function (data) {
    console.log("DATA: " + data);
    //    client.destroy();
});

client.on(error, (err) => {
    console.log();
});
