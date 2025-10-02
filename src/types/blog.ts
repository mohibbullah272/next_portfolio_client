import { z } from "zod";

export const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  content: z.string().min(100, "Content must be at least 100 characters").max(10000, "Content must be less than 10000 characters"),
  thumbnail: z.string().url("Please enter a valid URL").min(1, "Thumbnail URL is required"),
});

export type BlogFormData = z.infer<typeof blogFormSchema>;

export interface Blog {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}