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
      const link = await Link.create(body);
      return link;
    } catch (e) {
      if (e.code === 11000)
        throw createError({
          message: "The slug is duplicated, try another one.",
          statusCode: 409,
          statusMessage: "Conflict",
          stack: null,
        });
      throw createError({
        message: e.message,
        statusCode: 500,
        stack: null,
      });
    }
  };
}
