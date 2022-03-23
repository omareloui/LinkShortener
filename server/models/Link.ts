import typegoose from "@typegoose/typegoose";
const { prop, getModelForClass } = typegoose;

export class Link {
  @prop({ type: String, required: true })
  public url!: string;

  @prop({ type: String, required: true, unique: true })
  public slug!: string;

  @prop({ type: Number, default: 0 })
  public clicks!: number;
}

export default getModelForClass(Link, { schemaOptions: { timestamps: true } });
