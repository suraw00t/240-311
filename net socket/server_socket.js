var net = require("net");

var HOST = "127.0.0.1";
var PORT = 6969;

var clients = [];

// We have a connection - a socket object is assigned to the connection automatically
net.createServer(function (sock) {
    console.log("CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort);
    clients.push(sock);

    sock.on("data", function (data) {
        console.log("DATA " + sock.remoteAddress + ": " + data);

        for (var i = 0; i < clients.length; i++) {
            if (sock !== clients[i])
                clients[i].write("Connected to all --> " + data);
        }

        sock.write('You said "' + data + '"');

        // sock.on("ready", function (sock) {
        //     console.log("Hello world" + sock.remoteAddress);
        // });

        // Add a 'close' event handler to this instance of socket
        sock.on("close", function (data) {
            console.log(
                "CLOSED: " + sock.remoteAddress + " " + sock.remotePort
            );
            for (var i = 0; i < clients.length; i++) {
                if (sock !== clients[i])
                    clients[i].write("Disconnected to all ---> " + data + "\n");
            }
        });
    });
}).listen(PORT, HOST);

console.log("Server listening on " + HOST + ":" + PORT);
