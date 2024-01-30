import { SERVER_EVENT_TYPE, SOCKET_EVENT_TYPE } from '../models';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { MESSAGES_SIZE } from '../index';
/**
 * Add message and broadcast it
 */
export function socketMessage(
  data: any,
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  sessions: Map<any, any>,
  io: Server<DefaultEventsMap, DefaultEventsMap>
) {
  const room = sessions.get(data.roomID);
  if (!room) {
    console.log(`room ${data.roomID} does not exist`);
    return;
  }

  const messages = room.messages;
  messages.push({
    type: data.type,
    id: Date.now(),
    user: data.user,
    content: data.message
  });

  sessions.set(data.roomID, { ...room, messages: messages.slice(-MESSAGES_SIZE) });
  io.to(data.roomID).emit(SERVER_EVENT_TYPE.MESSAGE, messages);
}
