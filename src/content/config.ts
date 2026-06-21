import { defineCollection, z } from 'astro:content';

const works = defineCollection({
  type: 'content',
  schema: z.object({
    layout: z.string().optional(),
    title: z.string(),
    link: z.string().optional(),
    client: z.string().optional(),
    client_link: z.string().optional(),
    role: z.string().optional(),
    when: z.string().optional(),
    where: z.string().optional(),
    team: z.string().optional(),
    partners: z.string().optional(),
    categories: z.union([z.string(), z.array(z.string())])
      .optional()
      .transform((v) => (Array.isArray(v) ? v[0] : v)),
    tags: z.union([z.array(z.string()), z.string()])
      .optional()
      .transform((v) => (v === undefined ? [] : Array.isArray(v) ? v : [v])),
    thumbnail: z.string().optional(),
    images: z.array(z.object({ image: z.string() })).optional().default([]),
    date: z.coerce.date().optional(),
    published: z.boolean().optional().default(true),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    layout: z.string().optional(),
    title: z.string(),
    permalink: z.string().optional(),
  }),
});

export const collections = { works, pages };
