var socket = null;

function init() {
    status(0);
    if (user === "") {
        $("#connect").hide();
    } else {
        $("#signin").html("Salir");
        $("#send").click(send);
        $("#changeStatus").click(changeStatus);
        $("#msg").keypress(onkey).focus();
    }
}

function connect() {
    var host = "ws://localhost:8080";
    if (user === 'Nombre')
        user = prompt("Ingrese su nombre:", user);
    try {
        socket = new WebSocket(host);
        status(this.readyState);
        socket.onopen = function(msg) {
            status(this.readyState);
            sendUser(user);
        };
        socket.onmessage = function(msg) {
            process(JSON.parse(msg.data));
        };
        socket.onclose = function(msg) {
            status(this.readyState);
        };
    }
    catch (ex) {
        errorLog(ex);
    }
}

function disconnect() {
    sendDisconnect(user);
    removeUser(user);
    socket.close();
    socket = null;
}

function onkey(event) {
    if (event.keyCode === 13) {
        send();
    }
}

function send() {
    var txt, data;
    txt = $("#msg");
    if (!txt.val())
        return;
    sendMsg(user, txt.val());
    txt.val("");
    txt.focus();
}

function sendMsg(user, msg) {
    data = new Object();
    data.cmd = 'message';
    data.msg = msg;
    data.user = user;
    sendJSON(data);
}

function sendUser(user) {
    data = new Object();
    data.cmd = 'user';
    data.user = user;
    sendJSON(data);
}

function sendDisconnect(user) {
    data = new Object();
    data.cmd = 'disconnect';
    data.user = user;
    sendJSON(data);
}

function sendJSON(data) {
    try {
        socket.send(JSON.stringify(data));
    } catch (ex) {
        errorLog(ex);
    }
}

function changeStatus() {
    if (socket !== null) {
        disconnect();
    } else {
        connect();
    }
}

function newUser(user) {
    return $("<tr id= '" + user.replace(" ", "") + "'><td>" + user + "</td></tr>");
}

function removeUser(user) {
            $("#" + user.replace(" ", "")).remove();
}

function process(data) {
    switch (data.cmd) {
        case "message":
            $("#messages").append(data.user + ": " + data.msg + "<br>");
            break;
        case "user":
            $("#users").append(newUser(data.user));
            break;
        case "disconnect":
            removeUser(data.user);
            break;
        default:
            errorLog(data.cmd);
    }

}

function errorLog(msg) {
    $("#errors").html("<div class='alert alert-danger alert-dismissable'>" + 
        "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
        msg+
    "</div>");
}

function status(status) {
    switch (status) {
        case 0:
            $("#status").addClass("glyphicon-log-in").removeClass("glyphicon-log-out");
            $("#changeStatus").html("Conectarse");
            $("#send").attr("disabled", true);
            break;
        case 1:
            $("#status").addClass("glyphicon-log-out").removeClass("glyphicon-log-in");
            $("#changeStatus").html("Desconectarse");
            $("#send").attr("disabled", false);
            break;
        default:
            $("#status").addClass("glyphicon-log-in").removeClass("glyphicon-log-out");
            $("#changeStatus").html("Conectarse");
            $("#send").attr("disabled", true);
    }
}  

