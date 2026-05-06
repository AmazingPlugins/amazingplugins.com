import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Harun Ray'),
    tags: z.array(z.string()).optional(),
    seoKeywords: z.array(z.string()).optional(),
    seoCategory: z.string().optional(),
    gscSubmitted: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
