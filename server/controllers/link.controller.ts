import { createError, useQuery, useBody, sendRedirect } from "h3";
import { nanoid } from "nanoid";

import { Link } from "~~/server/models";

import type { APIFunction, CreateLink } from "~~/@types";
import { useSlugHelper } from "~~/composables/useSlugHelper";

export class LinkController {
  private static DEFAULT_SLUG_LENGTH = 5;

  static getAll: APIFunction = async () => {
    const links = await Link.find().sort("-createdAt").exec();
    return links;
  };

  static visit: APIFunction = async (req, res) => {
    const { slug } = useQuery(req) as { slug: string };
    const link = await Link.findOne({ slug: slug.toLowerCase() });

    if (!link)
      throw createError({
        message: "Can't find the requested URL.",
        statusCode: 404,
      });

    link.clicks++;
    await link.save();

    return sendRedirect(res, link.url);
  };

  static create: APIFunction = async req => {
    const body = (await useBody(req)) as CreateLink;
    const slugHelper = useSlugHelper();

    body.slug ||= nanoid(this.DEFAULT_SLUG_LENGTH);
    body.slug = slugHelper.create(body.slug);

    try {
      const sameSlugLink = await Link.findOne({ slug: body.slug });

      if (sameSlugLink)
        throw {
          message: "This slug is taken, try another one.",
          statusCode: 409,
        };

      const link = new Link(body);
      await link.save();
      return link;
    } catch (e) {
      const statusCode = e.statusCode || 500;
      const message =
        statusCode === 409
          ? e.message
          : "Something went wrong, please try again later.";

      throw createError({ message, statusCode, stack: null });
    }
  };

  static delete: APIFunction = async req => {
    if (req.method !== "DELETE") return { ok: false };

    const { id } = useQuery(req);

    const link = await Link.findOne({ _id: id });

    if (!link)
      throw createError({
        message: "Can't find the requested URL to remove.",
        statusCode: 404,
      });

    await link.delete();

    return { ok: true };
  };
}
