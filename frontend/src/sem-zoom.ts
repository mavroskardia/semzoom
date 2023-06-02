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
  current_content!: SemzoomContent;
  router = router;

  constructor() {
    super();
    this.attachEvents();
  }

  connectedCallback(): void {
    // pull up the relevant top-level content and navigate into the topic specified
    const contentid = router.location.params.contentid;
    console.log(`would load content with id ${contentid}`);

    const topicid = router.location.params.topicid;
    console.log(`...and would navigate to subtopic ${topicid}`);
  }

  render() {
    return html`
      <semzoom-nav @test="${this.test}"></semzoom-nav>
      <semzoom-canvas>
        <div id="content" slot="content"></div>
      </semzoom-canvas>
      <semzoom-footer></semzoom-footer>
    `;
  }

  attachEvents() {
    window.addEventListener("hashchange", (evt: HashChangeEvent) => {
      const url = new URL(evt.newURL);
      const id = url.hash ? parseInt(url.hash.substring(1)) : 0;
      this.set_content_id(id);
    });
  }

  set_content_id(content_id: number) {
    this.current_content = this.find_content_by_id(this.content, content_id);
    this.thecanvas.load(this.current_content, content_id != 0);
  }

  find_content_by_id(root: SemzoomContent, content_id: number): SemzoomContent {
    if (root.id == content_id) return root;

    for (let i = 0; i < root.children.length; i++) {
      const found = this.find_content_by_id(root.children[i], content_id);
      if (found != missingSemzoomContent) return found;
    }

    return missingSemzoomContent;
  }

  test(test_event: CustomEvent) {
    this.content = test_event.detail;
    this.set_content_id(0); // set to root
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
