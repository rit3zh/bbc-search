export interface ITopics{
    title?: string;
    url?: string;
}
export interface INews {
  headline?: string;
  role?: string;
  author?: string;
  timestamp?: string;
  paragraph?: string[];
  images?: string[];
  topics?: ITopics;
}