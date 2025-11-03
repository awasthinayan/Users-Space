import { z } from "zod";

const ZodPostSchema = z.object({
  title: z.string({message:"title is required"}).min(1).max(100),
  content: z.string({message:"content is required"}).min(1).max(1000),
});

export default ZodPostSchema;