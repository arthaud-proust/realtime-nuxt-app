import type {
	WebSocketServer,
	WebSocketServerSocket,
} from "@/app/Room/infrastructure/webSocket/types";
import { RoomManager } from "@/app/Room/application/RoomManager";
import { RoomIdSchema } from "@/app/Room/application/Room";
import {
	RoomSessionDataSchema,
	RoomSessionIdSchema,
} from "@/app/Room/application/RoomSession";
import { registerEvents } from "@/app/Room/infrastructure/webSocket/events";

export const setupRoomsWebSocket = (
	webSocketServer: WebSocketServer,
	roomManager: RoomManager,
) => {
	const roomsNamespace = webSocketServer.of("/rooms");

	const onConnection = (socket: WebSocketServerSocket) => {
		const roomId = RoomIdSchema.parse(socket.handshake.query.roomId).trim();

		const openSessionData = RoomSessionDataSchema.optional().parse({
			username: socket.handshake.query.username,
		});

		const sessionId = RoomSessionIdSchema.optional()
			.parse(socket.handshake.query.sessionId)
			?.trim();

		socket.join(roomId);

		console.log(roomId, sessionId, openSessionData);
		const room = roomManager.firstOrCreate(roomId);
		const session = room.retrieveOrNewSession(sessionId, openSessionData);

		registerEvents(socket, session);
	};

	roomsNamespace.on("connection", (socket: WebSocketServerSocket) => {
		try {
			onConnection(socket);
		} catch (e) {
			console.error(e);
			socket.disconnect();
		}
	});
};
