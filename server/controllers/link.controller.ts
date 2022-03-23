import { createError, useQuery, useBody, sendRedirect } from "h3";
import { nanoid } from "nanoid";

import { Link } from "~~/server/models";

import type { APIFunction, APIError, CreateLink } from "~~/@types";

export class LinkController {
  private static DEFAULT_SLUG_LENGTH = 5;

  // static getAll: APIFunction = async () => {
  //   const links = await Link.find().exec();
  //   return links;
  // };

  static get: APIFunction = async req => {
    const { slug } = useQuery(req);
    const link = await Link.findOne({ slug });
    if (!link)
      throw createError({
        message: "Can't find the requested URL.",
        statusCode: 404,
      });
    return link;
  };

  static visit: APIFunction = async (req, res) => {
    const { slug } = useQuery(req);
    const link = await Link.findOne({ slug });

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
    body.slug ||= nanoid(this.DEFAULT_SLUG_LENGTH);

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
}
