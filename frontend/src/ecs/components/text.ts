import { Component } from "./component";

export class ECSText implements Component {
  text: string;
  font: string = 'normal 18px sans-serif';

  constructor(text: string) {
    this.text = text;
  }

}
