import { Component } from "../components/component";
import { Entity } from "../entity";
import { MarkdownRenderingSystem } from "./markdown";
import { System } from "./system";

export class ContextClearingSystem implements System {
  id: string = "contextclearer";
  ctx!: CanvasRenderingContext2D;
  components: Component[] = [new MarkdownRenderingSystem(this.ctx)];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  process(ticks: number, entities: Entity[]): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
