import { Color } from "../types";
import { Component } from "./component";

export class ColorComponent implements Component {
  color: Color;
  constructor(color: Color) {
    this.color = color;
  }
}
