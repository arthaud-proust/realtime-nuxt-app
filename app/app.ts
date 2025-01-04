import type { WebSocketServer } from "@/app/Room/infrastructure/webSocket/types";
import { Server as EngineServer } from "engine.io";
import { Server as SocketServer } from "socket.io";
import { RoomManager } from "@/app/Room/application/RoomManager";
import { setupRoomsWebSocket } from "@/app/Room/infrastructure/webSocket/setup";

const engineServer = new EngineServer();
const webSocketServer: WebSocketServer = new SocketServer();
webSocketServer.bind(engineServer);

const roomManager = new RoomManager();

setupRoomsWebSocket(webSocketServer, roomManager);

export const app = {
	engineServer,
	socketServer: webSocketServer,
	roomManager,
};
