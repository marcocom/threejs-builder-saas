"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES_SIZE = void 0;
var express_1 = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var models_1 = require("./models");
var disconnect_1 = require("./responses/disconnect");
var socketJoin_1 = require("./responses/socketJoin");
var socketPosition_1 = require("./responses/socketPosition");
var socketAddObject_1 = require("./responses/socketAddObject");
var socketRemoveObject_1 = require("./responses/socketRemoveObject");
var socketMessage_1 = require("./responses/socketMessage");
exports.MESSAGES_SIZE = 16;
var SOCKET_PORT = '4200';
var port = process.env.PORT || SOCKET_PORT;
var app = (0, express_1.default)();
var sessions = new Map();
var httpServer = (0, http_1.createServer)(app);
var io = new socket_io_1.Server({
    allowEIO3: true,
    cors: {
        origin: true,
        credentials: true
    },
}).listen(httpServer);
app.get('/', function (req, res) {
    res.send('welcome to the mappa-server!');
});
io.on('connection', function (socket) {
    console.log('new user connected');
    // @ts-ignore
    socket.on(models_1.CLIENT_EVENT_TYPE.JOIN, function (roomID) { return (0, socketJoin_1.socketJoin)(roomID, socket, sessions, io); });
    // TODO: get these data:any declarations tightened up and stricter
    // @ts-ignore
    socket.on(models_1.CLIENT_EVENT_TYPE.POSITION, function (data) { return (0, socketPosition_1.socketPosition)(data, socket); });
    /**
     * Broadcast object to add on scene
     */
    // @ts-ignore
    socket.on(models_1.CLIENT_EVENT_TYPE.ADD, function (data) { return (0, socketAddObject_1.socketAddObject)(data, socket, sessions); });
    /**
     * Broadcast object to remove
     */
    // @ts-ignore
    socket.on(models_1.CLIENT_EVENT_TYPE.REMOVE, function (data) { return (0, socketRemoveObject_1.socketRemoveObject)(data, socket, sessions); });
    /**
     * Add message and broadcast it
     */
    // @ts-ignore
    socket.on(models_1.CLIENT_EVENT_TYPE.MESSAGE, function (data) { return (0, socketMessage_1.socketMessage)(data, socket, sessions, io); });
    /*
    * disconnect user from existing document session
    * */
    socket.on(models_1.SOCKET_EVENT_TYPE.DISCONNECT, function () { return onDisconnect(socket, sessions); });
});
var onDisconnect = function (socket, sessions) { return (0, disconnect_1.disconnect)(socket, sessions); };
httpServer.listen(Number(port), function () { return console.log("Listening on port ".concat(port)); });
