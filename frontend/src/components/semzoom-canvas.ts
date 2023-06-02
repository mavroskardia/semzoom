import { LitElement, html, css } from "lit";
import { customElement, query } from "lit/decorators.js";
import { SemzoomContent } from "../types/content";
import { SemzoomContenter } from "../lib/contenter";
import { animationStyles } from "../animations";

@customElement("semzoom-canvas")
export class SemzoomCanvas extends LitElement {
  @query("main") main!: HTMLElement;
  @query("aside.buffer") buffer!: HTMLElement;

  contenter = new SemzoomContenter();

  render() {
    return html`
      <button hidden="${history.length==0}">&larr; BACK</button>
      <main><slot name="content"></slot></main>
      <aside class="buffer" hidden></aside>
    `;
  }

  firstUpdated() {
    this.main.addEventListener("animationend", () => {});
    this.buffer.addEventListener("animationend", () => {});
  }

  load(data: SemzoomContent, animate: boolean = false) {
    if (animate) {}
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

      .buffer {
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
