import { LitElement, html, css } from "lit";
import { customElement, query } from "lit/decorators.js";

import { SemzoomContent } from "../types/content";
import { SemzoomContenter } from "../lib/contenter";
import { animationStyles } from "./molecules/animations";

@customElement("semzoom-canvas")
export class SemzoomCanvas extends LitElement {
  @query("main") main!: HTMLElement;
  @query("aside") buffer!: HTMLElement;

  contenter = new SemzoomContenter();

  render() {
    return html`
      <main><slot name="content"></slot></main>
      <aside hidden></aside>
    `;
  }

  firstUpdated() {
    this.main.addEventListener("animationend", () => {});
    this.buffer.addEventListener("animationend", () => {});
  }

  load(data: SemzoomContent, animate: boolean = false) {
    if (animate) {
    }
    this.main.innerHTML = this.contenter.make_content(data);
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

      aside {
        position: absolute;
        z-index: 2;
        pointer-events: none;
      }

      main {
        z-index: 1;
        display: block;
        border: solid 1px #f90;
      }

      button {
        position: absolute;
        top: 1rem;
        left: 4rem;
        height: 26px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "semzoom-canvas": SemzoomCanvas;
  }
}
