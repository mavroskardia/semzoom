import { Converter } from "showdown";
import { SemzoomContent } from "../types/content";

export class SemzoomContenter {
  converter = new Converter();

  make_content(data: SemzoomContent) {
    // first, clean up the content by removing any leading whitespace
    let content = data.content.split('\n').map(line => line.trim()).join('\n')
    return this.converter.makeHtml(content);
  }
}
