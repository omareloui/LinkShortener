export type LinkSources = Record<string, number>;
export interface Link {
  _id: string;
  url: string;
  slug: string;
  clicks: number;
  sources?: LinkSources;
  createdAt: number;
}

export interface CreateLink {
  url: string;
  slug?: string;
}
