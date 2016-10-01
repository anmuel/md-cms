import { Server } from "../src/server";
import { expect } from "chai";
import * as Request from "request";

describe("Server", () => {
  const PORT = 3000;
  let server = new Server(PORT);;

  before(() => {
    server.connect();
  });

  after(() => {
    server.stop();
  });

  xit(`connects successfully to port ${PORT}`, () => {
    expect(server.connected).to.be.true;
  });

  it("successfully serves available files", () => {
    Request(`http://localhost:${PORT}/something`, (error, response, body) => {
      expect(response.statusCode).to.eq(200);
      expect(body.length).to.be.gt(1);
      expect(error).to.not.be;
    });
  });

  it("parses a given markdown file and renders it to html");
  it("renders an error if no matching file was found", () => {
    Request(`http://localhost:${PORT}/something`, (error, response, body) => {
      expect(response.statusCode).to.eq(404);
    });
  });
});
