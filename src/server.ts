import FileHandler from "./filehandler";
import Logger from "./logger";
import * as Boom from "boom";
import * as Hapi from "hapi";

const TIMEOUT = 60 * 1000;

export class Server {
  private server: Hapi.Server;
  private isConnected: boolean;
  private fileHandler: FileHandler;

  constructor(private port: number,
              private autoConnect = false,
              private mdFileDir = "./markdown") {
    this.server = new Hapi.Server();
    this.fileHandler = new FileHandler(this.mdFileDir);
    this.server.connection({ port: this.port });
    this.isConnected = false;

    this.addRoutes();

    if (autoConnect) {
      this.connect();
    }
  }

  public connect() {
    this.server.start((err: any) => {
      if (err) {
        this.isConnected = false;
        throw err;
      }

      this.isConnected = true;
      Logger.debug(`Server running at ${this.port}`);
    });
  }

  public stop() {
    this.server.stop({ timeout: TIMEOUT }, () => {
      Logger.debug("Server stopped");
      this.isConnected = false;
    });
  }

  public get connected(): boolean {
    return this.isConnected;
  }

  private addRoutes() {
    this.server.route({
      handler: (request: Hapi.Request, reply: Hapi.IReply) => {
        const file = request.params["file"];
        try {
          const content = this.fileHandler.getFileContent(file);
          reply(content);
        } catch (e) {
          Logger.debug(e.toString());
          reply(Boom.notFound("Unavailable file " + file));
        }
      },
      method: "GET",
      path: "/{file}",
    });
  }
}
