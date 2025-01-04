import type { WebSocketServer } from "@/shared/types/socket";
import { Server as EngineServer } from "engine.io";
import { Server as SocketServer } from "socket.io";
import { RoomManager } from "@/server/domains/Room/app/RoomManager";
import { setupRoomsWebSocket } from "@/server/domains/Room/infra/webSocket/setup";

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
