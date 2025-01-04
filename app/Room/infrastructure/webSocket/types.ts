import { Namespace, Server, Socket as ServerSocket } from "socket.io";
import { Socket } from "socket.io-client";
import type { RoomSessionDto } from "@/app/Room/application/RoomSession";

export type ClientToServerEvents = {
  //
};

export type ServerToClientEvents = {
  "session.update": (session: RoomSessionDto) => void;
};

export type InterServerEvents = {
  //
};

export type SocketData = {
  //
};

export type WebSocketClient = Socket<
  ServerToClientEvents,
  ClientToServerEvents
>;

export type WebSocketServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type WebSocketNamespace = Namespace<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type WebSocketServerSocket = ServerSocket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
