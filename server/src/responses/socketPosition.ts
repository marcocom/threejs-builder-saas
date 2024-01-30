import {SocketDataPositionUpdated} from '../types';
import {SERVER_EVENT_TYPE} from '../models';
import {Server, Socket} from 'socket.io';
import {DefaultEventsMap} from 'socket.io/dist/typed-events';

export function socketPosition(
    data,
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
) {
    const send: SocketDataPositionUpdated = {
        userID: socket.id,
        position: data.position
    };
    console.log('>> Socket POSITION client-sent:', send);
    socket.broadcast.to(data.roomID).emit(SERVER_EVENT_TYPE.POSITION, send);
}
