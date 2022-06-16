import type { Document } from "mongoose";

export interface Visit {
  ip: number;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  at: Date;
}

export type LinkSources = Record<string, number>;

export interface DehydratedLink {
  url: string;
  slug: string;
  clicks: number;
  visits?: Visit[];
  sources?: LinkSources;
  createdAt: Date;
  updatedAt: Date;
}

export interface Link extends Document, DehydratedLink {}

export interface CreateLink {
  url: string;
  slug?: string;
}
