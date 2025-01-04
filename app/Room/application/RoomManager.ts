import { Room, type RoomId } from "@/app/Room/application/Room";

export class RoomManager {
	private rooms = new Map<RoomId, Room>();

	firstOrCreate(roomId: RoomId) {
		return this.rooms.get(roomId) ?? this.create(roomId);
	}

	create(roomId: RoomId) {
		const room = new Room(roomId);

		this.rooms.set(roomId, room);

		return room;
	}

	delete(roomId: RoomId) {
		this.rooms.delete(roomId);
	}
}
