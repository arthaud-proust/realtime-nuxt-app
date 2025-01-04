import { describe, expect, it } from "vitest";
import { RoomManager } from "~/server/domains/Room/app/RoomManager";

describe("clean", () => {
	it("delete all rooms with no session", () => {
		const roomManager = new RoomManager();
		roomManager.firstOrCreate("test");

		roomManager.clean();

		expect(roomManager.roomsArray).toHaveLength(0);
	});

	it("delete all rooms with no online session", () => {
		const roomManager = new RoomManager();
		const roomA = roomManager.firstOrCreate("A");
		const sessionA = roomA.retrieveOrNewSession(undefined, {
			username: "Alice",
		});

		const roomB = roomManager.firstOrCreate("B");
		const sessionB = roomB.retrieveOrNewSession(undefined, {
			username: "Bob",
		});
		sessionB.isOnline = false;

		roomManager.clean();

		expect(roomManager.roomsArray).toHaveLength(1);
		expect(roomManager.roomsArray[0].id).toBe(roomA.id);
	});
});
