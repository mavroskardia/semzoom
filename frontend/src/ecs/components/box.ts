import { Component } from "./component";
import { Dimensions } from "../types"

export class Box implements Component {
  dims: Dimensions = { w: 10, h: 10 };
}
