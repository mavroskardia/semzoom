import { Vec2 } from "../types";
import { Component } from "./component";

export class Animated implements Component {
  dir: Vec2 = new Vec2();

  constructor(dx = 0, dy = 0) {
    this.dir.x = dx;
    this.dir.y = dy;
  }
}
