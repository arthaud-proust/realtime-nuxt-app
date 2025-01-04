import type { NitroApp } from "nitropack";
import { defineEventHandler } from "h3";
import { app } from "@/app/app";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  nitroApp.router.use(
    "/socket.io",
    defineEventHandler({
      handler(event) {
        app.engineServer.handleRequest(event.node.req, event.node.res);
        event._handled = true;
      },
      websocket: {
        open(peer) {
          const nodeContext = peer.ctx.node;
          const req = nodeContext.req;

          // @ts-expect-error private method
          app.engineServer.prepare(req);

          const rawSocket = nodeContext.req.socket;
          const websocket = nodeContext.ws;

          // @ts-expect-error private method
          app.engineServer.onWebSocket(req, rawSocket, websocket);
        },
      },
    }),
  );
});
