var net = require("net");

var HOST = "127.0.0.1";
var PORT = 6969;

//var clients = [];
var clients = new Map();

// We have a connection - a socket object is assigned to the connection automatically
net.createServer(function (sock) {
    console.log("CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort);
    //clients.push(sock);

    sock.on("data", function (data) {
        clients.set(sock, data);
        console.log("DATA " + sock.remoteAddress + ": " + data);

        for (let [key, value] of clients) {
            if (sock !== key) key.write("Connected to all --> " + data);
            console.log(key + " = " + value);
        }

        sock.write('You said "' + data + '"');

        // Add a 'close' event handler to this instance of socket
        sock.on("close", function () {
            console.log(
                "CLOSED: " + sock.remoteAddress + " " + sock.remotePort
            );
            for (let [key, value] of clients) {
                if (sock !== key)
                    key.write(
                        "Disconnected to all ---> " + clients.get(sock) + "\n"
                    );
            }
            clients.delete(sock);
        });

        for (let [key, value] of clients) {
            if (sock !== key) key.write("Connected to all --> " + data);
            console.log(key + " = " + value);
        }
    });
}).listen(PORT, HOST);

console.log("Server listening on " + HOST + ":" + PORT);
