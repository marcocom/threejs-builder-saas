import express from 'express';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Server, Socket } from 'socket.io';
import { createClient } from 'redis';

import {
    CLIENT_EVENT_TYPE, SERVER_EVENT_TYPE,
    SOCKET_EVENT_TYPE
} from './models';
import {
  Session,
} from './types';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { disconnect } from './responses/disconnect';
import { socketJoin } from './responses/socketJoin';
import { socketPosition } from './responses/socketPosition';
import { socketAddObject } from './responses/socketAddObject';
import { socketRemoveObject } from './responses/socketRemoveObject';
import { socketMessage } from './responses/socketMessage';

export const MESSAGES_SIZE = 16;
const SOCKET_PORT: string = '4200';

const CONCURRENCY = process.env.WEB_CONCURRENCY || 1; // https://devcenter.heroku.com/articles/node-concurrency
const port = process.env.PORT || SOCKET_PORT;

const app = express();

const sessions:Map<string, Session> = new Map();
const httpServer = createServer(app);

const io: Server<typeof IncomingMessage, typeof ServerResponse> = new Server({
  allowEIO3: true,
  cors: {
    origin: true,
    credentials: true
  },
}).listen(httpServer);

app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('welcome to the mappa-server!');
});

io.on('connection', (socket) => {

  console.log('new user connected');

  // @ts-ignore
  socket.on(CLIENT_EVENT_TYPE.JOIN,
      (roomID: string) => socketJoin(roomID, socket, sessions, io)
  );
  // TODO: get these data:any declarations tightened up and stricter

  // @ts-ignore
  socket.on(CLIENT_EVENT_TYPE.POSITION,
      (data: any) => socketPosition(data, socket)
  );

  /**
   * Broadcast object to add on scene
   */
  // @ts-ignore
  socket.on(CLIENT_EVENT_TYPE.ADD,
      (data: any) => socketAddObject(data, socket, sessions)
  );

  /**
   * Broadcast object to remove
   */
  // @ts-ignore
  socket.on(CLIENT_EVENT_TYPE.REMOVE,
      (data: any) => socketRemoveObject(data, socket, sessions)
  );

  /**
   * Add message and broadcast it
   */
  // @ts-ignore
  socket.on(CLIENT_EVENT_TYPE.MESSAGE,
      (data: any) => socketMessage(data, socket, sessions, io)
  );

  /*
  * disconnect user from existing document session
  * */
  socket.on(SOCKET_EVENT_TYPE.DISCONNECT,
      () => onDisconnect(socket, sessions)
  );
}
);

const onDisconnect = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  sessions: Map<any, any>) => disconnect(socket, sessions);

httpServer.listen(Number(port), () => console.log(`Listening on port ${port}`));

const nodeRedisExample = async () => {
  try {
    const client = createClient();
    await client.connect();

    await client.set('mykey', 'TEST from node redis');

    const myKeyValue = await client.get('mykey');
    console.log(myKeyValue);

    const numAdded = await client.zAdd('vehicles', [
      {
        score: 4,
        value: 'car',
      },
      {
        score: 2,
        value: 'bike',
      },
    ]);
    console.log(`Added ${numAdded} items.`);

    for await (const { score, value } of client.zScanIterator('vehicles')) {
      console.log(`${value} -> ${score}`);
    }

    await client.quit();
  } catch (e) {
    console.error(e);
  }
};
