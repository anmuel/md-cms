import { Server } from "./index";
import Logger from "./logger";

Logger.debug("Starting server ... ");

const server = new Server(3000);
server.connect();
