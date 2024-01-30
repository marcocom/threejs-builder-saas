export enum CLIENT_EVENT_TYPE {
    JOIN = `CL_SEND_JOIN_ROOM`,
    POSITION = `CL_SEND_PLAYER_POSITION`,
    ADD = `CL_SEND_ADD_OBJECT`,
    REMOVE = `CL_SEND_REMOVE_OBJECT`,
    MESSAGE = `CL_SEND_MESSAGE`,
}
export enum SERVER_EVENT_TYPE {
  JOIN = `SV_SEND_JOIN_ROOM`,
  POSITION = `SV_SEND_PLAYER_POSITION`,
  ADD = `SV_SEND_ADD_OBJECT`,
  REMOVE = `SV_SEND_REMOVE_OBJECT`,
  MESSAGE = `SV_SEND_MESSAGES`,
  DISCONNECT = `SV_SEND_DISCONNECTION`,
}
export enum SOCKET_EVENT_TYPE {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect'
}

export enum ONLINE_MESSAGE_TYPE {
  USER = 'user',
  CONNECTION = 'connection',
  DISCONNECTION = 'disconnection'
}

export enum ONLINE_INTERACTION {
  ADD,
  REMOVE
}