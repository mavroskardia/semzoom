import { Animated } from "../components/animated";
import { Box } from "../components/box";
import { Component } from "../components/component";
import { SimpleRenderable } from "../components/renderable";
import { Entity } from "../entity";
import { Dimensions } from "../types";
import { System } from "./system";

export class AnimatorSystem implements System {
  id: string = "animator";
  components: Component[] = [new Animated(), new SimpleRenderable(), new Box()];
  bounds!: Dimensions;

  constructor(bounds: Dimensions) {
    this.bounds = bounds;
  }

  process(ticks: number, entities: Entity[]): void {
    entities.forEach((entity) => {
      const sr = entity.components.find(
        (c) => c instanceof SimpleRenderable
      ) as SimpleRenderable;
      const ani = entity.components.find(
        (c) => c instanceof Animated
      ) as Animated;
      const box = entity.components.find((c) => c instanceof Box) as Box;

      sr.position.add(ani.dir);

      const x0 = sr.position.x;
      const x1 = sr.position.x + box.dims.w;
      const y0 = sr.position.y;
      const y1 = sr.position.y + box.dims.h;

      if (x1 >= this.bounds.w || x0 <= 0) {
        ani.dir.x *= -1;
      }

      if (y1 >= this.bounds.h || y0 <= 0) {
        ani.dir.y *= -1;
      }
    });
  }
}
