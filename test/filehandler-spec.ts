import FileHandler from "../src/filehandler";
import * as Settings from "../src/settings";
import { expect } from "chai";
import { minify } from "html-minifier";
import * as Path from "path";

describe("FileHandler", () => {
  const dir = Path.join("test", "fixtures");
  const fileHandler = new FileHandler(dir);

  describe("#getFileContent", () => {
    it("returns the HTML content of the file", () => {
      const html = minify(`<h2 id="headline">Headline</h2>
      <ul>
      <li>list item 1</li>
      <li>list item 2</li>
      </ul>
      <h1 id="list-item-1">list item 1</h1>
      <h1 id="-list-item-2-"><em>list item 2</em></h1>`,
        Settings.minifyOptions);
      expect(fileHandler.getFileContent("test")).to.eq(html);
    })
  });

  it("throws an error if the file is not accessible", () => {
    expect(() => {
      fileHandler.getFileContent("something");
    }).to.throw();
  });
});
