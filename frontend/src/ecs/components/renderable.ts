import { Color, Vec2 } from "../types";
import { Component } from "./component";

class Renderable implements Component {}

export class SimpleRenderable extends Renderable {
  color: Color = new Color();
  position: Vec2 = new Vec2();

  constructor(
    pos: Vec2 = new Vec2(0, 0),
    color: Color = new Color(255, 255, 255, 255)
  ) {
    super();
    this.position = pos;
    this.color = color;
  }
}
