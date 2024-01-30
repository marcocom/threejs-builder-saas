import { ONLINE_MESSAGE_TYPE, SERVER_EVENT_TYPE } from '../models';
import { SocketDataDisconnection } from '../types';
import { MESSAGES_SIZE } from '../index';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export function disconnect(socket: Socket<DefaultEventsMap, DefaultEventsMap>, sessions: Map<any, any>) {
  console.log('!!! ON DISCONNECT ', sessions);
  const allRooms = sessions.entries();
  let room = allRooms.next();
  let roomID: any;
  let usersInRoom: any[];

  while (!room.done) {
    roomID = room.value[0];
    usersInRoom = room.value[1].users;
    if (Array.isArray(usersInRoom) && usersInRoom.some(user => user.id === socket.id)) break;
    room = allRooms.next();
  }

  const user = usersInRoom.find(user => user.id === socket.id);

  if (!user) {
    console.log(`${socket.id} not found in ${roomID}`, `all users = ${usersInRoom}`);
    return;
  }

  const disconnectionSystemMessage = {
    user,
    type: ONLINE_MESSAGE_TYPE.DISCONNECTION,
    content: '',
    id: Date.now()
  };

  // delete user in room
  if (Array.isArray(usersInRoom) && usersInRoom.length > 0) {
    usersInRoom.splice(usersInRoom.indexOf(user), 1);
    const currentRoom = sessions.get(roomID);
    sessions.set(roomID, {
      ...currentRoom,
      messages: [...currentRoom.messages, disconnectionSystemMessage].slice(-MESSAGES_SIZE),
      users: usersInRoom
    });
  }

  const send: SocketDataDisconnection = { userID: socket.id,
    messages: sessions.get(roomID).messages
  };
  socket.broadcast.to(roomID).emit(
    SERVER_EVENT_TYPE.DISCONNECT, send
  );

  if (Array.isArray(usersInRoom) && usersInRoom.length === 0) { // TODO: fix this
    sessions.delete(roomID);
  }
}
