export interface SearchResult {
  total?: number;
  items: SearchItems[];
}
export interface SearchItems {
  title?: string;
  description?: string;
  live?: boolean;
  metadata?: ISearchMetaData;
  image?: string;
  related?: any[];
  href?: string;
}

export interface ISearchMetaData {
  published?: string;
  lastUpdated?: string;
  type?: string;
  subtype?: string;
}
