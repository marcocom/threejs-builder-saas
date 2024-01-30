import { CLIENT_EVENT_TYPE, ONLINE_MESSAGE_TYPE, SERVER_EVENT_TYPE } from '../models';
import { OnlineMessage, OnlineUser, Session, SocketDataRoomJoined } from '../types';
import { uniqueNamesGenerator } from 'unique-names-generator';
import { MESSAGES_SIZE } from '../index';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import colorValues from '../colors/colorValues';
/**
 * Broadcast position
 */
export function socketJoin(
  roomID: string,
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  sessions: Map<any, any>,
  io: Server<DefaultEventsMap, DefaultEventsMap>
) {
  const COLOR_PRESETS = colorValues;
  const createRandomColor = () => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  socket.join(roomID);
  console.log(`>>> Socket ${CLIENT_EVENT_TYPE.JOIN} :`, roomID);

  const me: OnlineUser = {
    id: socket.id,
    name: uniqueNamesGenerator('-', true),
    color: !sessions.has(roomID)
      ? COLOR_PRESETS[0]
      : COLOR_PRESETS[sessions.get(roomID).colorIndex] || createRandomColor()
  };

  const connectionSystemMessage: OnlineMessage = {
    type: ONLINE_MESSAGE_TYPE.CONNECTION,
    user: me,
    content: '',
    id: Date.now()
  };

  // init room on map if not present
  if (!sessions.has(roomID)) {
    const setRoomVals: Session = {
      users: [me],
      objectsAdded: [],
      objectsRemoved: [],
      messages: [connectionSystemMessage],
      startTime: Date.now(),
      colorIndex: 1
    };
    sessions.set(roomID, setRoomVals);
  } else {
    // update users list
    const room = sessions.get(roomID);
    const setRoomVals: Session = {
      ...room,
      colorIndex: room.colorIndex + 1,
      messages: [...room.messages, connectionSystemMessage].slice(-MESSAGES_SIZE),
      users: [...room.users, me],
    };
    sessions.set(roomID, setRoomVals);
  }

  // send socket id and all user id;
  const room = sessions.get(roomID);
  const send: SocketDataRoomJoined = {
    me,
    startTime: room.startTime,
    usersConnected: room.users,
    objectsAdded: room.objectsAdded,
    objectsRemoved: room.objectsRemoved,
    messages: room.messages
  };

  io.to(roomID).emit(SERVER_EVENT_TYPE.JOIN, send);
  console.log(`room connected : id:${roomID} sessions:`, sessions);
}
