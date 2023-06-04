interface SemzoomContentMetadata {

}

export interface SemzoomContent {
  id: number;
  parentid: number;
  contentid: string;
  version: number;
  metadata: SemzoomContentMetadata;
  content: string;
  children: Array<SemzoomContent>;
}

class MissingSemzoomContent implements SemzoomContent {
  id=-1;
  parentid=-1;
  contentid='nocontentid';
  version=1;
  metadata={};
  content=`<em class="error">Failed to retrieve content with id ${this.id}</em>`;
  children: SemzoomContent[] = [];
}

export const missingSemzoomContent = new MissingSemzoomContent()
