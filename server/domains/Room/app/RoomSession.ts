import { z } from "zod";
import type { Room } from "@/server/domains/Room/app/Room";

export const RoomSessionDataSchema = z.object({
	username: z.string(),
});
export type RoomSessionData = z.infer<typeof RoomSessionDataSchema>;

export const RoomSessionIdSchema = z.string();
export type RoomSessionId = z.infer<typeof RoomSessionIdSchema>;

export class RoomSession {
	readonly id: RoomSessionId;
	readonly data: RoomSessionData;
	private readonly room: Room;

	constructor(room: Room, id: RoomSessionId, data: RoomSessionData) {
		this.room = room;
		this.id = id;
		this.data = data;
	}

	get roomId() {
		return this.room.id;
	}
}
