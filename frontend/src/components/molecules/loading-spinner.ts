import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("loading-spinner")
export class LoadingSpinner extends LitElement {
  render() {
    return html`<em>Loading...</em>`;
  }

  static styles = [
    css`
      :host {
        display: block;
        width: 50vw;
        height: 50vh;
        background-color: rgba(100, 150, 200, 0.5);
      }
      :host([hidden]) {
        display: none;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "loading-spinner": LoadingSpinner;
  }
}
