import { Component } from "./component";

export class MarkdownComponent implements Component {
  markdown: string;

  constructor(markdown: string) {
    this.markdown = markdown;
  }
}
