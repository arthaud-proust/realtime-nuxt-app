import { useSocket } from "@/composables/useSocket";
import { useSavedSessions } from "@/composables/useSavedSessions";

export type UseRoomProps = {
	roomId: string;
	username: string;
};

export const useRoom = ({ roomId, username }: UseRoomProps) => {
	const savedSessions = useSavedSessions();

	const query: { [p: string]: any } = {
		roomId,
		username,
	};

	if (savedSessions.get(roomId)) {
		query.sessionId = savedSessions.get(roomId)?.id;
	}

	const { socket, transport, isConnected } = useSocket("/rooms", {
		query,
	});

	socket.on("connect", () => {});

	socket.on("session.update", (session) => {
		savedSessions.save(session);
	});

	return {
		transport: readonly(transport),
		isConnected: readonly(isConnected),
	};
};
