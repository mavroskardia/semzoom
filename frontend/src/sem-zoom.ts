import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js'

import './components/semzoom-nav';
import './components/semzoom-canvas';
import './components/semzoom-footer';

@customElement('sem-zoom')
export class SemZoom extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <semzoom-nav></semzoom-nav>
      <semzoom-canvas></semzoom-canvas>
      <semzoom-footer></semzoom-footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sem-zoom': SemZoom
  }
}

