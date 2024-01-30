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
exports.socketJoin = void 0;
var models_1 = require("../models");
var unique_names_generator_1 = require("unique-names-generator");
var index_1 = require("../index");
var colorValues_1 = require("../colors/colorValues");
/**
 * Broadcast position
 */
function socketJoin(roomID, socket, sessions, io) {
    var COLOR_PRESETS = colorValues_1.default;
    var createRandomColor = function () { return "rgb(".concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ")"); };
    socket.join(roomID);
    console.log(">>> Socket ".concat(models_1.CLIENT_EVENT_TYPE.JOIN, " :"), roomID);
    var me = {
        id: socket.id,
        name: (0, unique_names_generator_1.uniqueNamesGenerator)('-', true),
        color: !sessions.has(roomID)
            ? COLOR_PRESETS[0]
            : COLOR_PRESETS[sessions.get(roomID).colorIndex] || createRandomColor()
    };
    var connectionSystemMessage = {
        type: models_1.ONLINE_MESSAGE_TYPE.CONNECTION,
        user: me,
        content: '',
        id: Date.now()
    };
    // init room on map if not present
    if (!sessions.has(roomID)) {
        var setRoomVals = {
            users: [me],
            objectsAdded: [],
            objectsRemoved: [],
            messages: [connectionSystemMessage],
            startTime: Date.now(),
            colorIndex: 1
        };
        sessions.set(roomID, setRoomVals);
    }
    else {
        // update users list
        var room_1 = sessions.get(roomID);
        var setRoomVals = __assign(__assign({}, room_1), { colorIndex: room_1.colorIndex + 1, messages: __spreadArray(__spreadArray([], room_1.messages, true), [connectionSystemMessage], false).slice(-index_1.MESSAGES_SIZE), users: __spreadArray(__spreadArray([], room_1.users, true), [me], false) });
        sessions.set(roomID, setRoomVals);
    }
    // send socket id and all user id;
    var room = sessions.get(roomID);
    var send = {
        me: me,
        startTime: room.startTime,
        usersConnected: room.users,
        objectsAdded: room.objectsAdded,
        objectsRemoved: room.objectsRemoved,
        messages: room.messages
    };
    io.to(roomID).emit(models_1.SERVER_EVENT_TYPE.JOIN, send);
    console.log("room connected : id:".concat(roomID, " sessions:"), sessions);
}
exports.socketJoin = socketJoin;
