import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'

@customElement('semzoom-footer')
export class SemzoomFooter extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
        color: rgba(255,255,255,0.25);
      }
    `
  ];

  render() {
    return html`<footer>footer</footer>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'semzoom-footer': SemzoomFooter
  }
}

