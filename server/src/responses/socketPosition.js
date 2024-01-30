"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketPosition = void 0;
var models_1 = require("../models");
function socketPosition(data, socket) {
    var send = {
        userID: socket.id,
        position: data.position
    };
    console.log('>> Socket POSITION client-sent:', send);
    socket.broadcast.to(data.roomID).emit(models_1.SERVER_EVENT_TYPE.POSITION, send);
}
exports.socketPosition = socketPosition;
