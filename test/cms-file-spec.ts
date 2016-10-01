import CmsFile from "../src/cms-file";
import whitespaceRemove from "../src/wr";
import { expect } from "chai";
import { minify } from "html-minifier";
import Path = require("path");

describe("CmsFile", () => {
  const FIXTURE_FILE_PATH = Path.join(__dirname,
    "fixtures",
    "test.md");
  const cmsFile = new CmsFile(FIXTURE_FILE_PATH);

  it("has a filename", () => {
    expect(cmsFile.filepath).to.eq(FIXTURE_FILE_PATH);
  });

  it("has a markdown string", () => {
    const actual = whitespaceRemove(cmsFile.markdownContent);
    const expected = "Headline\r\n------\r\n\r\n* list item 1\r\n* list item 2" +
    "\r\n\r\n# list item 1\r\n# *list item 2*\r\n";
    expect(actual).to.eq(whitespaceRemove(expected));
  });

  it("has an HTML string", () => {
    const expected = minify('<h2 id="headline">Headline</h2>\n<ul>\n' +
    '<li>list item 1</li>\n<li>list item 2</li>\n</ul>\n' +
    '<h1 id="list-item-1">list item 1</h1>\n' +
    '<h1 id="-list-item-2-"><em>list item 2</em></h1>\n',{
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      });
    const actual = cmsFile.htmlContent;
    expect(actual).to.eq(expected);
  });
});
