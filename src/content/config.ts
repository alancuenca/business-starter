import { defineCollection, z } from 'astro:content';

// Services Collection - Individual service pages for local SEO
const servicesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    metaDescription: z.string().max(160),
    icon: z.string(),
    // CUSTOMIZE: iconColor controls the tinted background for the icon in cards
    // Valid values: "blue", "amber", "emerald", "rose", "violet"
    iconColor: z.enum(["blue", "amber", "emerald", "rose", "violet"]).default("blue"),
    excerpt: z.string(),
    featuredImage: image(),
    pricing: z.object({
      startingAt: z.number().optional(),
      unit: z.string().optional(),
    }).optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});

// Projects Collection - Before/After gallery with work details
const projectsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    metaDescription: z.string().max(160),
    beforeImage: image(),
    afterImage: image(),
    workDone: z.array(z.string()),
    // CUSTOMIZE: workBreakdown provides accordion details on project detail pages
    workBreakdown: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
    serviceType: z.string(),
    location: z.string().optional(),
    completionDate: z.coerce.date(),
    duration: z.string().optional(),          // e.g. "3 weeks"
    featured: z.boolean().default(false),
  }),
});

// Reviews Collection - Structured testimonials
const reviewsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    rating: z.number().min(1).max(5),
    review: z.string(),
    service: z.string(),
    date: z.coerce.date(),
    avatar: z.string().optional(),
    location: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  services: servicesCollection,
  projects: projectsCollection,
  reviews: reviewsCollection,
};
