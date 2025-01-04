import { z } from "zod";
import {
  RoomSession,
  type RoomSessionData,
  type RoomSessionId,
} from "@/app/Room/application/RoomSession";

export const RoomIdSchema = z.string();
export type RoomId = z.infer<typeof RoomIdSchema>;

export class Room {
  readonly id: RoomId;
  private sessions: RoomSession[];

  constructor(id: RoomId) {
    this.id = id;
    this.sessions = [];
  }

  private get isAcceptingNewSession() {
    return true;
  }

  private retrieveSession(sessionId: RoomSessionId) {
    const session = this.sessions.find((session) => session.id === sessionId);

    if (!session) {
      throw new Error(`Session "${sessionId}" not found`);
    }

    return session;
  }

  private newSession(data: RoomSessionData) {
    if (!this.isAcceptingNewSession) {
      throw new Error("Room do not accept new sessions");
    }

    const session = new RoomSession(this, crypto.randomUUID(), data);

    this.sessions.push(session);

    return session;
  }

  retrieveOrNewSession(
    sessionId: RoomSessionId | undefined,
    sessionData: RoomSessionData | undefined,
  ) {
    if (sessionId) return this.retrieveSession(sessionId);
    if (sessionData) return this.newSession(sessionData);
    throw new Error("Missing sessionId or sessionData");
  }
}
