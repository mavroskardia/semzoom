import { Box } from "../components/box";
import { Component } from "../components/component";
import { SimpleRenderable } from "../components/renderable";
import { Entity } from "../entity";
import { System } from "./system";

export class CanvasRenderingSystem implements System {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  id: string;
  components: Component[] = [new SimpleRenderable(), new Box()];

  constructor(id: string, canvas: HTMLCanvasElement) {
    this.id = id;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  process(ticks: number, entities: Entity[]): void {
    // we only have entities with the matching components now, so this is
    // easy peasy
    this.ctx.fillStyle = 'rgb(0,0,0)';
    this.ctx.strokeStyle = 'rgb(0,0,0)';
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    entities.forEach((entity) => {
      const box = entity.components.find((c) => c instanceof Box) as Box;
      const sr = entity.components.find((c) => c instanceof SimpleRenderable) as SimpleRenderable;

      this.ctx.strokeStyle = sr.color.tostyle();
      this.ctx.moveTo(sr.position.x, sr.position.y);
      this.ctx.strokeRect(sr.position.x, sr.position.y, box.dims.w, box.dims.h);
    });
  }
}
