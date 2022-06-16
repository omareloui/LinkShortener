import type { Document } from "mongoose";

export interface LinkVisit {
  ip: string;
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
  source?: string;
  at: Date;
}

export interface DehydratedLink {
  url: string;
  slug: string;
  clicks: number;
  visits?: LinkVisit[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Link extends Document, DehydratedLink {}

export interface CreateLink {
  url: string;
  slug?: string;
}
