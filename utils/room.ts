import type { RoomId } from "@/app/Room/application/Room";

export const stringifyRoomId = (roomId: string) =>
  roomId.trim().toLowerCase().replace(/\W/g, "-");
export const humanizeRoomId = (roomId: RoomId) => roomId.replace("-", " ");
