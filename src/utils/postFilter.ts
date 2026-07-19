import type { CollectionEntry } from "astro:content";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import config from "@/config";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Determines whether a post is eligible to be listed/rendered.
 *
 * - Excludes drafts always
 * - In production, excludes scheduled posts until the date arrives in the
 *   configured timezone (default Asia/Shanghai). A `scheduledPostMargin`
 *   can be set to show posts a few minutes early.
 * - In dev, always shows non-draft posts to make authoring easier.
 *
 * The pubDatetime frontmatter value is treated as a date in the configured
 * timezone, not UTC. This means writing `pubDatetime: 2026-07-19` will
 * make the post visible at midnight China Standard Time (UTC+8).
 */
export function postFilter({ data }: CollectionEntry<"posts">) {
  // Re-interpret the date-only value in the configured timezone
  // pubDatetime is stored as midnight UTC, so we extract the date portion
  // from UTC and re-parse it as midnight in the configured timezone
  const dateStr = dayjs.utc(data.pubDatetime).format("YYYY-MM-DD");
  const tz = config.site.timezone || "UTC";
  const adjustedPubTime = dayjs.tz(dateStr, tz).valueOf();

  const isPublishTimePassed =
    Date.now() > adjustedPubTime - config.posts.scheduledPostMargin;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
}
