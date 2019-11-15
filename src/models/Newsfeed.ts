export interface Source {
  id?: string;
  name: string;
}

export interface Newsfeed {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publisedAt: string;
  content: string;
}

export default Newsfeed;
