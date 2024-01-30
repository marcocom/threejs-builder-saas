import { ONLINE_INTERACTION, ONLINE_MESSAGE_TYPE } from './models';

export type PositionSend = {
  userID: string,
  position: string,
};

export type OnlineUser = {
  id: string;
  name: string;
  color: string;
};

export type Session = {
  users: OnlineUser[],
  objectsAdded: any[],
  objectsRemoved: SocketDataObjectRemoved[],
  messages: OnlineMessage[],
  startTime: number,
  colorIndex: number,
};

// from src/app/online/models/**.model.ts
// TODO: marry these two for tight binding
export type OnlineObject = {
  item?: object;
  object?: object;
  animate: boolean;
  type: ONLINE_INTERACTION;
};
export type OnlineStatus = {
  online: number;
  alive: boolean;
};

export type OnlineMessage = {
  type: ONLINE_MESSAGE_TYPE;
  id: number;
  user: OnlineUser;
  content: string;
};

export type SocketDataRoomJoined = {
  me: OnlineUser;
  usersConnected: OnlineUser[];
  objectsAdded: object[];
  objectsRemoved: object[];
  startTime: number;
  messages: OnlineMessage[];
};
export type SocketDataPositionUpdated = {
  userID: string;
  position: object; // THREE.Vector3
};

export type SocketDataObjectAdded = {
  item: object; // IPick
};

export type SocketDataObjectRemoved = {
  object: object; // THREE.Object3D,
  roomID?: string;
};

export type SocketDataDisconnection = {
  userID: string;
  messages: OnlineMessage[];
};
