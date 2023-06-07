import { Component } from "../components/component";
import { MarkdownComponent } from "../components/markdown";
import { PositionComponent } from "../components/position";
import { ColorComponent } from "../components/simplecolor";
import { Entity } from "../entity";
import { Color } from "../types";
import { System } from "./system";

export class MarkdownRenderingSystem implements System {
  static HEADER_SIZE = 30;

  id: string = "markdown";
  components: Component[] = [
    new MarkdownComponent(""),
    new PositionComponent(),
    new ColorComponent(new Color()),
  ];
  ctx: CanvasRenderingContext2D;
  fontsize: number = 14;
  fontstyle: string = "normal";
  fontname: string = "sans-serif";

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  buildfont(style: string, size: number, name: string) {
    return [style, size + "px", name].join(" ");
  }

  process(ticks: number, entities: Entity[]): void {
    entities.forEach((e) => {
      const mdc = e.get<MarkdownComponent>(MarkdownComponent.name);
      const pos = e.get<PositionComponent>(PositionComponent.name);
      const col = e.get<ColorComponent>(ColorComponent.name);

      mdc.markdown.split("\n").forEach((line) => {
        line = line.trim();
        if (!line) return; // skip blank lines?

        switch (line[0]) {
          case "#": // header
            this.fontsize = MarkdownRenderingSystem.HEADER_SIZE;
            this.ctx.font = this.buildfont(
              this.fontstyle,
              this.fontsize,
              this.fontname
            );
            this.ctx.fillStyle = col.color.tostyle();
            this.ctx.fillText(line.substring(1), pos.pos.x, pos.pos.y);
            break;
          default: // plain text
        }
      });
    });
  }
}
