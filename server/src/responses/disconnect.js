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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = void 0;
var models_1 = require("../models");
var index_1 = require("../index");
function disconnect(socket, sessions) {
    console.log('!!! ON DISCONNECT ', sessions);
    var allRooms = sessions.entries();
    var room = allRooms.next();
    var roomID;
    var usersInRoom;
    while (!room.done) {
        roomID = room.value[0];
        usersInRoom = room.value[1].users;
        if (Array.isArray(usersInRoom) && usersInRoom.some(function (user) { return user.id === socket.id; }))
            break;
        room = allRooms.next();
    }
    var user = usersInRoom.find(function (user) { return user.id === socket.id; });
    if (!user) {
        console.log("".concat(socket.id, " not found in ").concat(roomID), "all users = ".concat(usersInRoom));
        return;
    }
    var disconnectionSystemMessage = {
        user: user,
        type: models_1.ONLINE_MESSAGE_TYPE.DISCONNECTION,
        content: '',
        id: Date.now()
    };
    // delete user in room
    if (Array.isArray(usersInRoom) && usersInRoom.length > 0) {
        usersInRoom.splice(usersInRoom.indexOf(user), 1);
        var currentRoom = sessions.get(roomID);
        sessions.set(roomID, __assign(__assign({}, currentRoom), { messages: __spreadArray(__spreadArray([], currentRoom.messages, true), [disconnectionSystemMessage], false).slice(-index_1.MESSAGES_SIZE), users: usersInRoom }));
    }
    var send = { userID: socket.id,
        messages: sessions.get(roomID).messages
    };
    socket.broadcast.to(roomID).emit(models_1.SERVER_EVENT_TYPE.DISCONNECT, send);
    if (Array.isArray(usersInRoom) && usersInRoom.length === 0) { // TODO: fix this
        sessions.delete(roomID);
    }
}
exports.disconnect = disconnect;
