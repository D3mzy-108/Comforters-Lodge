export type DailyPost = {
  id: number;
  series_title: string;
  personal_question: string;
  theme: string;
  opening_hook: string;
  biblical_qa: string;
  reflection: string;
  story: string;
  prayer: string;
  activity_guide: string;
  date_posted: string;
};

export type DailyDevotion = {
  id: number;
  //   cover_image_url: string;
  citation: string;
  verse_content: string;
  date_posted: string; // ISO date
};
