import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'

@customElement('semzoom-canvas')
export class SemzoomCanvas extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        justify-content: center;
      }
    `
  ];

  render() {
    return html`<main>canvas</main>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'semzoom-canvas': SemzoomCanvas
  }
}

