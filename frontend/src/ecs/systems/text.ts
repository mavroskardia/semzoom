import { Component } from "../components/component";
import { SimpleRenderable } from "../components/renderable";
import { ECSText } from "../components/text";
import { Entity } from "../entity";
import { System } from "./system";

export class TextRendererSystem implements System {
  id: string = "textrenderer";
  components: Component[] = [new ECSText("")];
  context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  process(ticks: number, entities: Entity[]): void {
    entities.forEach((entity) => {
      const sr = entity.components.find(
        (c) => c instanceof SimpleRenderable
      ) as SimpleRenderable;
      const text = entity.components.find(
        (c) => c instanceof ECSText
      ) as ECSText;

      this.context.fillStyle = sr.color.tostyle();
      this.context.font = text.font;
      this.context.fillText(text.text, sr.position.x, sr.position.y);
    });
  }
}
