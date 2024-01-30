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
exports.socketMessage = void 0;
var models_1 = require("../models");
var index_1 = require("../index");
/**
 * Add message and broadcast it
 */
function socketMessage(data, socket, sessions, io) {
    var room = sessions.get(data.roomID);
    if (!room) {
        console.log("room ".concat(data.roomID, " does not exist"));
        return;
    }
    var messages = room.messages;
    messages.push({
        type: data.type,
        id: Date.now(),
        user: data.user,
        content: data.message
    });
    sessions.set(data.roomID, __assign(__assign({}, room), { messages: messages.slice(-index_1.MESSAGES_SIZE) }));
    io.to(data.roomID).emit(models_1.SERVER_EVENT_TYPE.MESSAGE, messages);
}
exports.socketMessage = socketMessage;
