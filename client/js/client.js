// globals
var webSocketServerIP = "192.168.107.33",
    webSocketAddress = "ws://" + webSocketServerIP + ":8000",
    conn, li, input, messages;

// initialize connection and message display
function init(){
    connect();
    messages = document.getElementById("messages");
    li = document.createElement("li");
    li.appendChild(getTimeElement());
    messages.appendChild(li);
    input = document.getElementById("input");
    input.focus();
};
window.onload = init;

// connect to websocket
function connect(){
    if (window.WebSocket){
        conn = new WebSocket(webSocketAddress);
        conn.onmessage = receive;
    }
};

// receive data from websocket
function receive(event){
    var data = JSON.parse(event.data);
    if (data.action == "close"){
        console.log("Closing connection.");
    } else if (data.action == "message"){
        print(data.value);
    };
}

// send data through websocket
function send(event){
    var data = {
        action: "message",
        value: event.keyCode
    };
    conn.send(JSON.stringify(data));
}

// create
function getTimeElement(){
    var el = document.createElement("span");
    el.className = "date";
    el.innerHTML = (new Date).toDateString();
    return el;
}

// print character code
function print(keyCode){
    if (keyCode == "13"){
        input.value = "";
        messages.appendChild(li);
        li = document.createElement("li");
        li.appendChild(getTimeElement());
        messages.appendChild(li);
    }
    li.innerHTML += String.fromCharCode(keyCode);
}
