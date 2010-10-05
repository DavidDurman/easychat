var ws = require("../lib/node-websocket-server/lib/ws"),
    server = ws.createServer();

server.on("connection", function(conn){
    conn.on("message", function(message){
        message = JSON.parse(message);
        message.id = conn.id;
        console.log(message);
        conn.broadcast(JSON.stringify(message)); // broadcast to others
        conn.send(JSON.stringify(message));      // send it to me as well
    });
});

server.on("close", function(conn){
    conn.broadcast(JSON.stringify({ id: conn.id, action: "close"}));
});

server.listen(8000);
