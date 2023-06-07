import { LitElement, html, css } from "lit";
import { customElement, query } from "lit/decorators.js";
import { SemzoomContent } from "../types/content";
import { SemzoomContenter } from "../lib/contenter";
import { animationStyles } from "./molecules/animations";
import { EntityComponentSystem } from "../ecs/ecs";
import { Scene } from '../three/main';

@customElement("semzoom-canvas")
export class SemzoomCanvas extends LitElement {
  @query("main") canvas!: HTMLCanvasElement;

  contenter = new SemzoomContenter();
  ecs = new EntityComponentSystem();

  render() {
    return html`<main></main>`;
  }

  load(data: SemzoomContent) {
    const scene = new Scene(this.canvas);
    scene.run();
  }

  static styles = [
    animationStyles,
    css`
      :host {
        height: 100vh;
        width: 100vw;
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
