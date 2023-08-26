import { nanoid } from "nanoid";

import { Link } from "~~/server/models";
import { CreateLinkDto, ZIpApi } from "~~/server/validate";
import { errorHandler } from "~~/server/utils";
import { hasToBeAuthenticated } from "~~/server/policies";

import type { LinkVisit, Link as LinkInterface } from "~~/types";
import { useSlugHelper } from "~~/composables/useSlugHelper";

const slugHelper = useSlugHelper();

class LinkController {
  private DEFAULT_SLUG_LENGTH = 5;

  getAll = eventHandler(async event => {
    const links = await Link.find().sort("-createdAt").exec();

    const { context } = event;
    if (context.isAuthed) return links;

    return links.map(x => ({ slug: x.slug, url: x.url }));
  });

  visit = eventHandler(async event => {
    const { context, node } = event;
    const { slug } = context.params!;

    const { source, s } = getQuery(event) as { source?: string; s?: string };

    const link = await Link.findOne({ slug: slug.toLowerCase() });

    if (!link)
      throw createError({
        message: "Can't find the requested URL.",
        statusCode: 404,
      });

    const ip = node.req.headers["x-forwarded-for"] as string;
    await this.saveVisit(ip, link, source || s);

    if (context.isAuthed) return link;

    return link.url;
  });

  redirect = eventHandler(async event => {
    const url = await this.visit(event);
    return sendRedirect(event, url as string);
  });

  create = eventHandler(async event => {
    hasToBeAuthenticated(event);

    const body: Partial<CreateLinkDto> = await readBody(event);

    body.slug ||= nanoid(this.DEFAULT_SLUG_LENGTH);
    body.slug = slugHelper.create(body.slug);

    try {
      const data = CreateLinkDto.parse(body);
      const shortenedLink = await Link.create(data);
      return shortenedLink;
    } catch (e) {
      if (e !== null && typeof e === "object" && "code" in e && e.code === 11000)
        throw createError({
          message: "This slug is taken, try another one.",
          statusCode: 409,
        });
      errorHandler(e);
    }
  });

  delete = eventHandler(async event => {
    hasToBeAuthenticated(event);
    const { context } = event;
    const { id } = context.params!;

    const deletedLink = await Link.findByIdAndDelete(id);

    if (!deletedLink)
      throw createError({
        message: "Can't find the requested URL to remove.",
        statusCode: 404,
      });

    return { ok: true };
  });

  // ======= utils ======= //
  private async saveVisit(ip: string, link: LinkInterface, source: string | undefined) {
    const visit: LinkVisit = {
      ip,
      at: new Date(),
    };

    const location = await this.getLocation(ip);
    if (location) {
      visit.ip = location.ip;
      visit.location = {
        type: "Point",
        coordinates: [location.longitude, location.latitude],
      };
    }
    const normalizedSource = source && slugHelper.create(source);
    if (source && normalizedSource) visit.source = normalizedSource;
    link.visits = link.visits ? [...link.visits, visit] : [visit];
    await link.save();
  }

  private async getLocation(ip: string) {
    try {
      const API_ENDPOINT = "https://ipapi.co";
      if (["::1", "127.0.0.1"].includes(ip)) ip = "";
      const res = await $fetch(`${API_ENDPOINT}/${ip}/json`);
      console.log();
      const validatedRes = ZIpApi.pick({
        ip: true,
        latitude: true,
        longitude: true,
      }).parse(res);
      return validatedRes;
    } catch (e) {
      return null;
    }
  }
}

export const linkController = new LinkController();
