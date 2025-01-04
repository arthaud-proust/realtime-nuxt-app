import { Room, type RoomId } from "@/server/domains/Room/app/Room";

export class RoomManager {
	private rooms = new Map<RoomId, Room>();

	firstOrCreate(roomId: RoomId) {
		return this.rooms.get(roomId) ?? this.create(roomId);
	}

	private create(roomId: RoomId) {
		const room = new Room(roomId);

		this.rooms.set(roomId, room);

		return room;
	}

	delete(roomId: RoomId) {
		this.rooms.delete(roomId);
	}

	get roomsArray() {
		return [...this.rooms.values()];
	}

	clean() {
		this.roomsArray.map(
			(room) => room.canBeDeleted && this.delete(room.id),
		);
	}
}
