"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketAddObject = void 0;
var models_1 = require("../models");
function socketAddObject(data, socket, sessions) {
    // stock new objects on room data
    var room = sessions.get(data.roomID);
    if (!room) {
        console.log("room ".concat(data.roomID, " does not exist"));
        return;
    }
    var roomObjects = room.objectsAdded;
    roomObjects.push(data.item);
    sessions.set(data.roomID, __assign(__assign({}, room), { objectsAdded: roomObjects }));
    var send = {
        item: data.item
    };
    socket.broadcast.to(data.roomID).emit(models_1.SERVER_EVENT_TYPE.ADD, send);
}
exports.socketAddObject = socketAddObject;
