import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { animationStyles } from "../animations";
import "./semzoom-testing";

@customElement("semzoom-nav")
export class SemzoomNav extends LitElement {
  @query("nav") nav!: HTMLElement;

  static styles = [
    animationStyles,
    css`
      :host {
        display: block;
      }

      button {
        position: absolute;
        top: 1rem;
        left: 0.5rem;
        cursor: pointer;
        border: none;
        background: none;
        z-index: 1;
      }

      svg path {
        stroke: rgba(255, 255, 255, 0.5);
        stroke-width: 2px;
        stroke-linecap: round;
      }

      svg:hover path {
        stroke: rgba(255, 255, 255, 0.75);
      }

      nav {
        position: absolute;
        height: 100vh;
        width: var(--menu-width, 200px);
        border-right: solid 1px #444;
        z-index: 0;
        top: 0;
        background-color: rgba(255, 255, 255, 0.1);
        animation: slide-left 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      }

      .opened {
        animation: slide-right 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      }
    `,
  ];

  render() {
    return html`
      <nav class="closed">
        <semzoom-testing></semzoom-testing>
      </nav>
      <button @click="${this.toggle}">
        <svg viewBox="0 0 10 8" width="30">
          <path d="M1 1h8M1 4h 8M1 7h8" />
        </svg>
      </button>
    `;
  }

  toggle() {
    this.nav.classList.toggle("opened");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "semzoom-nav": SemzoomNav;
  }
}
