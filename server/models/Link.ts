import mongoose from "mongoose";

import type { Link as LinkInterface, DehydratedLink } from "~~/@types";

const { Schema } = mongoose;

const LinkSchema = new Schema<DehydratedLink>(
  {
    url: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    visits: [
      {
        _id: false,
        source: { type: String },
        ip: { type: String, required: true },
        location: {
          type: { type: String, enum: ["Point"], default: "Point" },
          coordinates: { type: [Number] },
        },
        at: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
);

LinkSchema.virtual("clicks").get(function (this: LinkInterface) {
  return this.visits?.length || 0;
});

export const Link = mongoose.model("Link", LinkSchema);
