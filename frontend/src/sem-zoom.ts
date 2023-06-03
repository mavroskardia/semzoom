import { LitElement, html, css } from "lit";
import { customElement, query } from "lit/decorators.js";
import { SemzoomCanvas } from "./components/semzoom-canvas";
import { SemzoomNav } from "./components/semzoom-nav";
import { SemzoomContent, missingSemzoomContent } from "./types/content";

import { router } from "./index";

import "./components/semzoom-nav";
import "./components/semzoom-canvas";
import "./components/semzoom-footer";

/** The SemZoom application element */
@customElement("sem-zoom")
export class SemZoom extends LitElement {
  @query("semzoom-nav") thenav!: SemzoomNav;
  @query("semzoom-canvas") thecanvas!: SemzoomCanvas;

  content!: SemzoomContent;
  current_topic!: SemzoomContent;
  router = router;

  connectedCallback(): void {
    super.connectedCallback();
    // pull up the relevant top-level content and navigate into the topic specified
    const contentid = router.location.params.contentid;
    this.load_content(contentid.toString());
  }

  async load_content(contentid:string) {
    console.log(`loading content with id ${contentid}`);
    const url = new URL(`http://localhost:5000/${contentid}`);
    this.content = await (await fetch(url)).json();
    this.thecanvas.load(this.content);
  }

  render() {
    return html`
      <semzoom-nav></semzoom-nav>
      <semzoom-canvas>
        <div id="content" slot="content"></div>
      </semzoom-canvas>
      <semzoom-footer></semzoom-footer>
    `;
  }

  set_topic_id(topicid: number) {
    this.current_topic = this.find_topic_by_id(this.content, topicid);
    this.thecanvas.load(this.current_topic, true);
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
    css`
      :host {
        display: block;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "sem-zoom": SemZoom;
  }
}
