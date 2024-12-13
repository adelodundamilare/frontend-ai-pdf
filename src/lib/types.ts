export interface ICaseResponse {
  count: number;
  next: string;
  previous: null;
  results: ICaseData[];
}
export interface ICaseData {
  absolute_url: string;
  attorney: string;
  caseName: string;
  caseNameFull: string;
  citeCount: number;
  cluster_id: number;
  court: string;
  court_citation_string: string;
  court_id: string;
  opinions: ICaseOpinion[];
  dateArgued: string;
  dateFiled: string;
  dateReargued: string;
  dateReargumentDenied: string;
  docketNumber: string;
  docket_id: number;
  judge: string;
  lexisCite: string;
  neutralCite: string;
  status: string;
}

export interface ICaseOpinion {
  author_id: any;
  cities: string[];
  download_url: string;
  id: number;
  meta: { timestamp: string; date_created: string };
  snippet: string;
  type: string;
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

export interface IUploads {
  id: number;
  file: string;
  file_name: string;
  created_at: string;
  user: number;
}

export interface IPlans {
  id: string;
  name: string;
  description: string;
  active: boolean;
  prices: IPrice[];
}

export interface IPrice {
  id: string;
  amount: number;
}

export interface IPdfItem {
  id: string;
  pageNumber: number;
  content: string;
}

export interface IPdfItem {
  id: string;
  pageNumber: number;
  content: string;
}

export interface IOpinion {
  id: number;
  resource_url: string;
  xml_harvard: any;
  plain_text: any;
  html: any;
  html_lawbox: any;
  html_with_citations: any;
}
