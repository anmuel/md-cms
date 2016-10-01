import * as Settings from "../src/settings";
import Logger from "./logger";
import * as Fs from "fs";
import { minify } from "html-minifier";
import * as marked from "marked";

export default class CmsFile {
  private html: string;
  private markdown: string;

  constructor(private path: string,
              private encoding: string = "utf8") {
    this.parse();
  }

  public get filepath() {
    return this.path;
  }

  public get markdownContent() {
    return this.markdown;
  }

  public get htmlContent() {
    return this.html;
  }

  private parse() {
    Logger.debug(`reading ${this.path} ...`);
    this.markdown = Fs.readFileSync(this.path, this.encoding);
    if (this.markdown) {
      this.html = minify(marked(this.markdown), Settings.minifyOptions);
    }
  }
}
