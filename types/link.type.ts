import type { HydratedDocument } from "mongoose";

export type LinkVisit = {
  ip: string;
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
  source?: string;
  at: Date;
};

export type DehydratedLink = {
  url: string;
  slug: string;
  clicks?: number;
  visits?: LinkVisit[];
  createdAt: Date;
  updatedAt: Date;
};

export type Link = HydratedDocument<DehydratedLink>;
