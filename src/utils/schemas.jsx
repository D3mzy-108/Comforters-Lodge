// export type DailyPost = {
//   id: number;
//   series_title: string;
//   personal_question: string;
//   theme: string;
//   opening_hook: string;
//   biblical_qa: string;
//   reflection: string;
//   story: string;
//   prayer: string;
//   activity_guide: string;
//   date_posted: string;
// };

// export type DailyDevotion = {
//   id: number;
//   //   cover_image_url: string;
//   citation: string;
//   verse_content: string;
//   date_posted: string; // ISO date
// };

export class Hymn {
  id;
  hymn_number;
  hymn_title;
  classification;
  tune_ref;
  cross_ref;
  scripture;
  chorus_title;
  chorus;
  verses;

  fromJson(json) {
    this.id = json.id;
    this.hymn_number = json.hymn_number;
    this.hymn_title = json.hymn_title;
    this.classification = json.classification;
    this.tune_ref = json.tune_ref;
    this.cross_ref = json.cross_ref;
    this.scripture = json.scripture;
    this.chorus_title = json.chorus_title;
    this.chorus = json.chorus;
    this.verses = json.verses;
    return this;
  }
}

export class HymnGroup {
  group;
  hymns;

  fromJson(json) {
    this.group = json.group;
    this.hymns = json.hymns.map((hymnJson) => new Hymn().fromJson(hymnJson));
    return this;
  }
}
