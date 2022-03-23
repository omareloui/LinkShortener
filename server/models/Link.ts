import mongoose from "mongoose";
import typegoose from "@typegoose/typegoose";
const { prop, getModelForClass, modelOptions, Severity } = typegoose;

import type { LinkSources } from "~~/@types";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Link {
  @prop({ type: String, required: true })
  public url!: string;

  @prop({ type: String, required: true, unique: true, lowercase: true })
  public slug!: string;

  @prop({ type: Number, default: 0 })
  public clicks!: number;

  @prop({ type: mongoose.Schema.Types.Mixed, default: {} })
  public sources: LinkSources;
}

export default getModelForClass(Link, { schemaOptions: { timestamps: true } });
