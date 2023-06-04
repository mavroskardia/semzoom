import { LitElement, html, css } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { SemzoomCanvas } from "./components/semzoom-canvas";
import { SemzoomNav } from "./components/semzoom-nav";
import { SemzoomContent, missingSemzoomContent } from "./types/content";
import { utilityClasses } from "./components/atoms/utilityclasses";

import { router } from "./index";

import "./components/semzoom-nav";
import "./components/semzoom-canvas";
import "./components/semzoom-footer";
import "./components/molecules/loading-spinner";

/** The SemZoom application element */
@customElement("sem-zoom")
export class SemZoom extends LitElement {
  @query("semzoom-nav") thenav!: SemzoomNav;
  @query("semzoom-canvas") thecanvas!: SemzoomCanvas;

  @state()
  loading = true;
  @state()
  current_parentid = -1;

  content!: SemzoomContent;
  current_topic!: SemzoomContent;
  router = router;

  connectedCallback(): void {
    super.connectedCallback();
    // pull up the relevant top-level content and navigate into the topic specified
    const contentid = router.location.params.contentid;
    this.load_content(contentid.toString());
  }

  async load_content(contentid: string) {
    this.loading = true;
    const url = new URL(`http://localhost:5000/${contentid}`);
    this.content = await (await fetch(url)).json();

    const topicid = router.location.params.topicid
      ? parseInt(router.location.params.topicid.toString())
      : this.content.id;

    this.set_topic_id(topicid);

    this.loading = false;
  }

  render() {
    return html`
      <semzoom-nav></semzoom-nav>
      <button @click="${this.up}" ?hidden="${this.current_parentid == -1}">
        <span class="mirror-h rotate-right">&#10149;</span> UP
      </button>
      <semzoom-canvas @semzoomup="${this.up}">
        <div id="content" slot="content"></div>
      </semzoom-canvas>
      <semzoom-footer></semzoom-footer>
      <loading-spinner ?hidden="${!this.loading}"></loading-spinner>
    `;
  }

  up() {
    this.set_topic_id(this.current_topic.parentid);
  }

  set_topic_id(topicid: number) {
    this.current_topic = this.find_topic_by_id(this.content, topicid);
    this.thecanvas.load(this.current_topic, true);

    const newurl =
      this.content.id == topicid
        ? `/${this.content.contentid}`
        : `/${this.content.contentid}/${topicid}`;

    this.current_parentid = this.current_topic.parentid;

    history.pushState({}, "", newurl);
  }

  find_topic_by_id(root: SemzoomContent, topicid: number): SemzoomContent {
    if (root.id == topicid) return root;

    for (let i = 0; i < root.children.length; i++) {
      const found = this.find_topic_by_id(root.children[i], topicid);
      if (found != missingSemzoomContent) return found;
    }

    return missingSemzoomContent;
  }

  static styles = [
    utilityClasses,
    css`
      :host {
        display: block;
      }

      button {
        position: absolute;
        top: 1rem;
        left: 4rem;
        margin: 0;
        padding: 0.25rem 0.5rem;
        line-height: 1.5rem;
        vertical-align: bottom;
        font-weight: 600;
      }

      loading-spinner {
        position: absolute;
        top: 25vh;
        left: 25vw;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "sem-zoom": SemZoom;
  }
}
