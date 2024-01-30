import { SERVER_EVENT_TYPE } from '../models';
import { SocketDataObjectAdded } from '../types';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export function socketAddObject(
  data: any,
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  sessions: Map<any, any>,
) {
  // stock new objects on room data
  const room = sessions.get(data.roomID);
  if (!room) {
    console.log(`room ${data.roomID} does not exist`);
    return;
  }

  const roomObjects = room.objectsAdded;
  roomObjects.push(data.item);
  sessions.set(data.roomID, { ...room, objectsAdded: roomObjects });

  const send:SocketDataObjectAdded = {
    item: data.item
  };
  socket.broadcast.to(data.roomID).emit(SERVER_EVENT_TYPE.ADD, send);
}
