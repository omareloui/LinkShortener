import { nanoid } from "nanoid";

import { Link } from "~~/server/models";
import { LinkSchema } from "~~/server/validate";
import { handlerError } from "~~/server/utils";

import type { CreateLink } from "~~/@types";
import { useSlugHelper } from "~~/composables/useSlugHelper";

export class LinkController {
  private static DEFAULT_SLUG_LENGTH = 5;

  static getAll = defineEventHandler(async () => {
    const links = await Link.find().sort("-createdAt").exec();
    return links;
  });

  // static visit = defineEventHandler(async event => {
  //   console.log(event.context.params);

  //   const { slug, source } = useQuery(event) as {
  //     slug: string;
  //     source?: string;
  //   };

  //   const link = await Link.findOne({ slug: slug.toLowerCase() });

  //   if (!link)
  //     throw createError({
  //       message: "Can't find the requested URL.",
  //       statusCode: 404,
  //     });

  //   if (source) {
  //     const slugHelper = useSlugHelper();

  //     const linkSources = { ...(link.sources || {}) };
  //     const normalizedSource = slugHelper.create(source);
  //     const currentValue = linkSources[normalizedSource];

  //     linkSources[normalizedSource] = currentValue ? currentValue + 1 : 1;
  //     link.sources = linkSources;
  //   }

  //   link.clicks += 1;

  //   await link.save();

  //   return sendRedirect(event, link.url);
  // });

  static create = defineEventHandler(async event => {
    const body: CreateLink = await useBody(event);
    const slugHelper = useSlugHelper();

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
}
