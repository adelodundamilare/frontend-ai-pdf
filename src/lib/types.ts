interface Citation {
  type: string;
  cite: string;
}

interface Volume {
  url: string;
  volume_number: string;
  barcode: string;
}

interface Reporter {
  url: string;
  full_name: string;
  id: number;
}

interface Court {
  url: string;
  name_abbreviation: string;
  slug: string;
  id: number;
  name: string;
}

interface Jurisdiction {
  id: number;
  name_long: string;
  url: string;
  slug: string;
  whitelisted: boolean;
  name: string;
}

interface CitesTo {
  cite: string;
  category: string;
  reporter: string;
  case_ids: number[];
  weight: number;
  opinion_id: number;
}

interface Analysis {
  word_count: number;
  random_bucket: number;
  sha256: string;
  ocr_confidence: number;
  char_count: number;
  random_id: number;
  pagerank: {
    percentile: number;
    raw: number;
  };
  cardinality: number;
  simhash: string;
}

interface Provenance {
  date_added: string;
  batch: string;
  source: string;
}

export interface ICaseData {
  id: number;
  url: string;
  name: string;
  name_abbreviation: string;
  decision_date: string;
  docket_number: string;
  first_page: string;
  last_page: string;
  citations: Citation[];
  volume: Volume;
  reporter: Reporter;
  court: Court;
  jurisdiction: Jurisdiction;
  cites_to: CitesTo[];
  frontend_url: string;
  frontend_pdf_url: string;
  preview: string[];
  analysis: Analysis;
  last_updated: string;
  provenance: Provenance;
}

export interface IProfile {
  id: number;
  name: string;
  avatar: string;
  email: string;
}

export enum EnumAiChat {
  default,
  summarizer,
  note_summarizer,
}

export interface IHistory {
  id: number;
  title: string;
  description: string;
  created_at: string;
  user: number;
}
