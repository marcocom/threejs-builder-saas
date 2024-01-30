import { SERVER_EVENT_TYPE } from '../models';
import {Session, SocketDataObjectAdded, SocketDataObjectRemoved} from '../types';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export function socketRemoveObject(
  data: any,
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  sessions: Map<any, any>,
) {
  const room = sessions.get(data.roomID);
  if (!room) {
    console.log(`room ${data.roomID} does not exist`);
    return;
  }
  const removed: SocketDataObjectRemoved[] = [
    ...room.objectsRemoved,
    { ...data.object }
  ];
  const send: Session = {
    ...room,
    objectsRemoved: removed
  };

  sessions.set(data.roomID, send);
  socket.broadcast.to(data.roomID).emit(SERVER_EVENT_TYPE.REMOVE, { object: data.object });
}
