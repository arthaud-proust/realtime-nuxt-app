import type { WebSocketServerSocket } from "@/app/Room/infrastructure/webSocket/types";
import type { RoomSession } from "@/app/Room/application/RoomSession";

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
