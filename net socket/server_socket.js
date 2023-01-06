var net = require("net");

var HOST = "127.0.0.1";
var PORT = 6969;

var clients = new Map();

// We have a connection - a socket object is assigned to the connection automatically
net.createServer(function (sock) {
    console.log("\nCONNECTED: " + sock.remoteAddress + ":" + sock.remotePort);

    sock.on("data", function (data) {
        clients.set(sock, data);

        console.log("DATA " + sock.remoteAddress + ": " + data);

        for (let [key, value] of clients) {
            if (sock !== key) key.write(data + " is connected\n");
        }

        sock.write('You said "' + data + '"');

        // Add a 'close' event handler to this instance of socket
        sock.on("close", function () {
            console.log(
                "\nCLOSED: " +
                    sock.remoteAddress +
                    " " +
                    sock.remotePort +
                    " " +
                    clients.get(sock)
            );

            for (let [key, value] of clients) {
                if (sock !== key)
                    key.write(clients.get(sock) + " is disconnected\n");
            }

            clients.delete(sock);

            console.log(
                "Available clients(" +
                    clients.size +
                    "): " +
                    [...clients.values()]
            );
        });

        //Print all clients connected
        console.log(
            "Available clients(" + clients.size + "): " + [...clients.values()]
        );
    });
}).listen(PORT, HOST);

console.log("Server listening on " + HOST + ":" + PORT);
