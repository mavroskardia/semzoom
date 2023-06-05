import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("semzoom-testing")
export class SemzoomTesting extends LitElement {
  @property({ type: Object }) data: any;

  render() {
    return html` <button @click="${this.load_example}">Load Example</button> `;
  }

  async load_example() {
    const url = new URL("http://localhost:5000/example");
    const example_data = await (await fetch(url)).json();
    const event = new CustomEvent("test", {
      bubbles: true,
      composed: true,
      detail: example_data,
    });
    this.dispatchEvent(event);
  }

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        justify-content: center;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "semzoom-testing": SemzoomTesting;
  }
}
