import { nanoid } from "nanoid";

import { Link } from "~~/server/models";
import { LinkSchema, IpApiSchema } from "~~/server/validate";
import { handlerError } from "~~/server/utils";

import type { CreateLink, LinkVisit, Link as LinkInterface } from "~~/@types";
import { useSlugHelper } from "~~/composables/useSlugHelper";

const slugHelper = useSlugHelper();

export class LinkController {
  private static DEFAULT_SLUG_LENGTH = 5;

  static getAll = defineEventHandler(async () => {
    const links = await Link.find().sort("-createdAt").exec();
    return links;
  });

  static visit = defineEventHandler(async event => {
    const { req, context } = event;
    const {
      params: { slug },
    } = context;

    const { source, s } = useQuery(event) as { source?: string; s?: string };

    const link = await Link.findOne({ slug: slug.toLowerCase() });

    if (!link)
      throw createError({
        message: "Can't find the requested URL.",
        statusCode: 404,
      });

    const ip = req.headers["x-forwarded-for"] as string;
    this.saveVisit(ip, link, source || s);

    return link.url;
  });

  static redirect = defineEventHandler(async event => {
    const url = await this.visit(event);
    return sendRedirect(event, url);
  });

  static create = defineEventHandler(async event => {
    const body: CreateLink = await useBody(event);

    body.slug ||= nanoid(this.DEFAULT_SLUG_LENGTH);
    body.slug = slugHelper.create(body.slug);

    try {
      const data = LinkSchema.parse(body);

      const sameSlugLink = await Link.findOne({ slug: data.slug });
      if (sameSlugLink) {
        throw createError({
          message: "This slug is taken, try another one.",
          statusCode: 409,
        });
      }
      const link = new Link(data);
      await link.save();
      return link;
    } catch (e) {
      return handlerError(e);
    }
  });

  static delete = defineEventHandler(async event => {
    const { context } = event;
    const { id } = context.params;

    const link = await Link.findOne({ _id: id });

    if (!link)
      throw createError({
        message: "Can't find the requested URL to remove.",
        statusCode: 404,
      });

    await link.delete();

    return { ok: true };
  });

  // ======= utils ======= //
  private static async getLocation(ip: string) {
    try {
      const res = await $fetch(`https://ipapi.co/${ip}/json`);
      const validatedRes = IpApiSchema.pick({
        latitude: true,
        longitude: true,
      }).parse(res);
      return validatedRes;
    } catch (e) {
      return null;
    }
  }

  private static async saveVisit(
    ip: string,
    link: LinkInterface,
    source: string | undefined
  ) {
    const visit: LinkVisit = {
      ip,
      at: new Date(),
    };

    const location = await this.getLocation(ip);
    if (location)
      visit.location = {
        type: "Point",
        coordinates: [location.longitude, location.latitude],
      };
    const normalizedSource = source && slugHelper.create(source);
    if (source && normalizedSource) visit.source = normalizedSource;
    // eslint-disable-next-line no-param-reassign
    link.visits = link.visits ? [...link.visits, visit] : [visit];
    link.save();
  }
}
