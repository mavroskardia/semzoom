import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("sem-zoom-new")
export class SemZoomNew extends LitElement {
  render() {
    return html`<h1>Welcome to SemZoom!</h1>`;
  }

  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "sem-zoom-new": SemZoomNew;
  }
}
