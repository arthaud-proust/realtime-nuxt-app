import type { WebSocketServerSocket } from "@/shared/types/socket";
import type { RoomSession } from "@/server/domains/Room/app/RoomSession";

export const registerEvents = (
	socket: WebSocketServerSocket,
	session: RoomSession,
) => {
	socket.emit("session.update", {
		id: session.id,
		data: session.data,
		roomId: session.roomId,
	});
};
