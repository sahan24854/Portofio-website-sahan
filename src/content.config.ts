import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
  }),
});

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  // Numbers are coerced and most fields defaulted so a project created from the
  // CMS — which writes frontmatter as strings and may omit optional fields —
  // still builds instead of failing validation.
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.coerce.number().int().default(999),
    bg: z.string().default('bg-[#f4f4f4]'),
    cover: z.string().optional(),
    icon: z.string().optional(),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    year: z.coerce.number().int().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, works };
