import { LitElement, html, css } from "lit";
import { customElement, query } from "lit/decorators.js";

import { SemzoomContent } from "../types/content";
import { SemzoomContenter } from "../lib/contenter";
import { animationStyles } from "./molecules/animations";
import { EntityComponentSystem } from "../ecs/ecs";

@customElement("semzoom-canvas")
export class SemzoomCanvas extends LitElement {
  @query("canvas") canvas!: HTMLCanvasElement;
  @query("aside") buffer!: HTMLElement;

  contenter = new SemzoomContenter();
  ecs = new EntityComponentSystem();

  render() {
    return html`<canvas></canvas>`;
  }

  load(data: SemzoomContent) {
    this.ecs.init(this.canvas, data);
    this.ecs.temp_init();
    requestAnimationFrame(this.ecs.loop.bind(this.ecs));
  }

  static styles = [
    animationStyles,
    css`
      :host {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "semzoom-canvas": SemzoomCanvas;
  }
}
