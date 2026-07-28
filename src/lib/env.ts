import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_CONTACT_FORM_URL: z.url().default("https://forms.gle/example"),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_CONTACT_FORM_URL: process.env.NEXT_PUBLIC_CONTACT_FORM_URL,
});
