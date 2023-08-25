import mongoose, { Schema } from "mongoose";

import type { DehydratedLink } from "~~/types";

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

    clicks: { type: Number, default: 0 },
  },
  { timestamps: true },
);

LinkSchema.pre("save", function () {
  this.clicks = this.visits?.length || 0;
});

export const Link = mongoose.model("Link", LinkSchema);
