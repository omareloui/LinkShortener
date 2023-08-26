import type { HydratedDocument, Types, FlattenMaps } from "mongoose";

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
  clicks: number;
  visits: LinkVisit[];
  createdAt: Date;
  updatedAt: Date;
};

export type LinkForNotAuthed = Pick<DehydratedLink & { _id: Types.ObjectId }, "url" | "slug">;

export type Link = HydratedDocument<DehydratedLink>;

export type LinkPojo = FlattenMaps<DehydratedLink & { _id: string }>;
