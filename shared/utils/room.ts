export const stringifyRoomId = (roomId: string) =>
	roomId.trim().toLowerCase().replace(/\W/g, "-");
export const humanizeRoomId = (roomId: string) => roomId.replace("-", " ");
