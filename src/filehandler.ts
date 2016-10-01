import CmsFile from "./cms-file";
import * as Fs from "fs";
import * as _ from "lodash";
import * as Path from "path";

export default class Filehandler {
  private files: { [path: string]: CmsFile; };

  constructor(private directory: string) {
    this.files = {};
  }

  /**
   * @param filepath {string}
   * @return {string} the HTML content of the provided file
   */
  public getFileContent(filepath: string): string {
    const path = this.generatePath(filepath);

    if (!this.files[path]) {
      try {
        Fs.accessSync(path);
        this.files[path] = new CmsFile(path);
      } catch (e) {
        throw e.toString();
      }
    }

    return this.files[path].htmlContent;
  }

  private generatePath(path: string) {
    const startPath = Path.join(__dirname, "..", this.directory);
    if (!_.startsWith(path, startPath)) {
      path = Path.join(startPath, path);
    }

    if (!_.endsWith(path, ".md")) {
      path += ".md";
    }

    return path;
  }
}
