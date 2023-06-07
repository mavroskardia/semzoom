import { Vec2 } from "../types";
import { Component } from "./component";

export class PositionComponent implements Component {
  pos!: Vec2;
  constructor(pos: Vec2 = new Vec2()) {
    this.pos = pos;
  }
}
