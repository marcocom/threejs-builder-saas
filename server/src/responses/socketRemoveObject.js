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
exports.socketRemoveObject = void 0;
var models_1 = require("../models");
function socketRemoveObject(data, socket, sessions) {
    var room = sessions.get(data.roomID);
    if (!room) {
        console.log("room ".concat(data.roomID, " does not exist"));
        return;
    }
    var removed = __spreadArray(__spreadArray([], room.objectsRemoved, true), [
        __assign({}, data.object)
    ], false);
    var send = __assign(__assign({}, room), { objectsRemoved: removed });
    sessions.set(data.roomID, send);
    socket.broadcast.to(data.roomID).emit(models_1.SERVER_EVENT_TYPE.REMOVE, { object: data.object });
}
exports.socketRemoveObject = socketRemoveObject;
