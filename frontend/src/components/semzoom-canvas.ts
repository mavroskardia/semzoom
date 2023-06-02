import { LitElement, html, css } from "lit";
import { customElement, query } from "lit/decorators.js";
import { SemzoomContent } from "../types/content";
import { SemzoomContenter } from "../lib/contenter";

@customElement("semzoom-canvas")
export class SemzoomCanvas extends LitElement {
  @query("main") main!: HTMLElement;
  @query('aside.buffer') buffer!: HTMLElement;

  contenter = new SemzoomContenter();

  static styles = [
    css`
      :host {
        display: flex;
        justify-content: center;
      }
      .buffer {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(255,255,255,0.25);
      }
    `,
  ];

  connectedCallback(): void {
    this.buffer.hidden = true;
  }

  render() {
    return html`<aside class="buffer"></aside><main></main>`;
  }

  load(data: SemzoomContent) {
    this.buffer.innerHTML = this.main.innerHTML;
    this.main.hidden = true;
    this.main.innerHTML = this.contenter.make_content(data);
    this.buffer.hidden = false;
    this.animate_swap();
  }

  animate_swap() {
    // where this gets interesting. need to animate one element to the
    // other in a meaningful way, but I have no idea how to do it (yet).
  }

}

declare global {
  interface HTMLElementTagNameMap {
    "semzoom-canvas": SemzoomCanvas;
  }
}
