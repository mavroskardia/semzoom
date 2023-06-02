import { SemzoomContent } from "../types/content";

export class SemzoomContenter {

  back_link = `<a href="#0">&laquo; Back</a>`;

  make_content(data: SemzoomContent) {
    const elt = document.createElement("div");
    elt.innerHTML = `${this.back_link}${data.content}`;
    // [].map.call(elt.querySelectorAll("a"), this.hijack_anchor);
    return elt.innerHTML;
  }

}
